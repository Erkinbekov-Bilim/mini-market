import type IProductMutation from './productMutation';

interface IProductApi {
  [key: string]: IProductMutation;
}

export default IProductApi;
