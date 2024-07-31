import { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const Payment = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState('');

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'http://localhost:5252/create-payment-intent',
          {
            method: 'POST',
            body: JSON.stringify({}),
          }
        );
        const { clientSecret } = await response.json();

        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>

      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
