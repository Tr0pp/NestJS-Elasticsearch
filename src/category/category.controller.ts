import { Body, Controller, Get, Param, Post, Render, Req, Request } from "@nestjs/common";
import { CategoryService } from "./category.service";
// import { CategoryRepository } from './category.repository';

@Controller('categories')
export class CategoryController {
  constructor(private categoryRepo: CategoryService) {}

  // @Get()
  // index() {
  //   return this.categoryRepo.find();
  // }
  //
  // @Get('_search/:search')
  // search(@Param('search') search: string) {
  //   return this.categoryRepo.find({
  //     where: {
  //       name: search,
  //     },
  //   });
  // }
  //
  // @Get('create')
  // category_create() {
  //   return this.categoryRepo.create({ name: 'teste create category' });
  // }

  @Post('es')
  insertData(@Body() data: any){
    return this.categoryRepo.insertData(data);
  }

  @Get('es/create-indice/:indice')
  createIndex(@Param('indice') indice: string){
    return this.categoryRepo.createIndex(indice)
  }

  @Get('es/:search')
  async search(@Param('search') search: string) {
    return (search !== undefined && search.length > 0) ?? await this.categoryRepo.matchQuery(search);
  }
}
