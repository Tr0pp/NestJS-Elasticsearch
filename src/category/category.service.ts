import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { matchQuery } from 'elastic-builder';

@Injectable()
export class CategoryService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /* Estrutura para busca */
  private structure(query: object){
    return {
      index: 'my_index',
      body: {
        size: 10000,
        query: query
      }
    }
  }

  /* Mapeamento */
  private async mapping(indice: string){
    await this.elasticsearchService.indices.create({
      index: indice,
      body: {
        mappings: {
          properties: {
            name: { type: 'text' }
          }
        }
      }
    }, { ignore: [400] });
  }

  /* Cria o índice e faz o mapeamento */
  public async createIndex(indice: string){
    await this.elasticsearchService.indices.exists({ index: indice })
        .then(existsIndice => {
          (existsIndice.body) ? this.elasticsearchService.indices.delete({ index: indice })
              .then(deleted => { if(deleted.body.acknowledged){ this.mapping(indice) } }) : this.mapping(indice)})
        .catch(err => console.log(err));
  }

  /* Faltando ajustar o insert */
  public insertData(data: any, indice){
    return this.elasticsearchService.bulk({index: { _index: indice }}, data)
  }

  public async matchQuery(search: string) {
    let results = [];
    const query = this.structure(matchQuery('name', search))

    const { body } = await this.elasticsearchService.search(query);

    const hits = body.hits.hits;
    hits.map(item => { results.push(item._source)});

    return { results, total: body.hits.total.value }
  }
}
