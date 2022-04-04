import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { matchQuery } from 'elastic-builder';

@Injectable()
export class CategoryService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  match_query(search: string) {
    const query = matchQuery('name', search);
    return this.elasticsearchService.search({
      query: query.toJSON(),
    });
    // return query.toJSON();
  }
}
