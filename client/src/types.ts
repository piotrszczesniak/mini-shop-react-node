export type ProductType = {
  id: number;
  title: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  rating?: {
    rata: number;
    count: number;
  };
};

export type ProductInBasketType = ProductType & { quantity: number };

export type BasketType = {
  count: number;
  total: number;
  products: ProductInBasketType[];
};
