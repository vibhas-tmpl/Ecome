export type TypeCartProduct = {
  productId: number;
  quantity: number;
};

export type TypeCart = {
  id: number;
  userId: number;
  date: string;
  products: TypeCartProduct[];
};