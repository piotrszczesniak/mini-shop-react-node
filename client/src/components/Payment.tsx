import { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import useBasketStore from '../lib/basket-store';

const Payment = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const { products, total, count } = useBasketStore();

  const productsList = products.map((product) => ({
    name: product.title,
    quantity: product.quantity,
    image: product.image,
  }));

  async function fetchData() {
    try {
      const response = await fetch(
        'http://localhost:5252/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            amount: total * 100,
            products: productsList,
            count,
          }),
        }
      );
      const { clientSecret } = await response.json();

      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  }

  const handleOpenCheckout = () => {
    fetchData();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5252/config');
        const { publishableKey } = await response.json();

        setStripePromise(await loadStripe(publishableKey));
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(
  //         'http://localhost:5252/create-payment-intent',
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             total,
  //             products,
  //             count,
  //           }),
  //         }
  //       );
  //       const { clientSecret } = await response.json();

  //       setClientSecret(clientSecret);
  //     } catch (error) {
  //       console.error('Error fetching config:', error);
  //     }
  //   }

  //   fetchData();
  // }, [products, total, count]);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>

      <button onClick={handleOpenCheckout}>open checkout</button>

      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
