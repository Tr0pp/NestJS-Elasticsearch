import { Controller, Get, Param, Post, Render, Req, Request } from "@nestjs/common";
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

  @Get('test/:search')
  test(@Param('search') search: string) {
    return this.categoryRepo.match_query(search);
  }
}
