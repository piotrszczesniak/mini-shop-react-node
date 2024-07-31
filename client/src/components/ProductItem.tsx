import { useState } from 'react';
import { ProductType, ProductInBasketType } from '../types';

type ProductProps = {
  product: ProductType;
  onAddToBasket: (product: ProductInBasketType) => void;
};

const ProductItem = ({ product, onAddToBasket }: ProductProps) => {
  const [quantity, setQuantity] = useState(1);
  const { id, title, category, price } = product;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  const productInBasket = {
    ...product,
    quantity,
  };

  return (
    <li key={id}>
      <h3>{title}</h3>
      <h4>{price}</h4>
      <h5>{category}</h5>
      <input type='number' min={1} max={99} value={quantity} name='' id='' onChange={handleValueChange} />
      <button onClick={() => onAddToBasket(productInBasket)}>add to basket</button>
    </li>
  );
};

export default ProductItem;
