import { ProductType } from '../types';
import ProductItem from './ProductItem';
import useBasketStore from '../lib/basket-store';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../utils/getProducts';

const ProductsList = () => {
  const { addToBasket } = useBasketStore();

  const { data: products, isLoading } = useQuery<ProductType[]>({ queryKey: ['products'], queryFn: getProducts });

  if (isLoading) {
    return 'Loading';
  }

  return (
    <ol>
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} onAddToBasket={addToBasket} />
      ))}
    </ol>
  );
};
export default ProductsList;
