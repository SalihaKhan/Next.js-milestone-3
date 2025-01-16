import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { allProduct } from "./allproduct";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,allProduct],
}
