import { Entity, model, property } from '@loopback/repository';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}
