import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { EsDataSourceService } from './es-data-source/es-data-source.service';
import { CategoryRepository } from './category/category.repository';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CategoryService } from './category/category.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService, EsDataSourceService, CategoryRepository, CategoryService],
})
export class AppModule {}
