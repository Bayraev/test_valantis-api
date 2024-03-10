export interface IIds {
  result: string[];
}

export interface IProduct {
  brand?: string;
  id: string;
  price: number;
  product: string;
}

export interface IProducts {
  result: IProduct[];
}
export interface IFields {
  product: string[];
  brand: string[];
  price: string[];
}
export interface IModel {
  products: IProducts;
  fields: IFields;
  pending: boolean;
  errors: any;
}
