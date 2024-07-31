import useBasketStore from '../lib/basket-store';

const Basket = () => {
  const { count, products, total, removeFromBasket, descrease, increase } = useBasketStore();

  return (
    <ul>
      <li>Number of products in basket: {count}</li>
      <li>Total: {total} USD</li>
      <li>
        {count > 0 ? (
          <>
            Your basket:
            <table border={1} style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <td>title</td>
                  <td>quantity</td>
                  <td>price</td>
                  <td>subtotal</td>
                  <td>remove from basket</td>
                </tr>
              </thead>

              <tbody>
                {products?.map((product) => {
                  const subtotal = Math.round((product.quantity * product.price + Number.EPSILON) * 100) / 100;
                  return (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>
                        <button onClick={() => descrease({ id: product.id })}>-</button>
                        {product.quantity}
                        <button onClick={() => increase({ id: product.id })}>+</button>
                      </td>
                      <td>{product.price}</td>
                      <td>{subtotal}</td>
                      <td>
                        <button onClick={() => removeFromBasket({ id: product.id })}>remove from basket</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          'Your basket is empty'
        )}
      </li>
    </ul>
  );
};
export default Basket;
