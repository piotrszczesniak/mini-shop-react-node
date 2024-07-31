import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormEventHandler, useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>('');

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // const { error, paymentIntent } = await stripe.confirmPayment({
    const data = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`, // /completion reoute required
      },
      redirect: 'if_required',
    });

    console.log('data', data);

    if (data.error) {
      console.log(data.error);
      setMessage(data.error.message);
    } else if (
      data.paymentIntent &&
      data.paymentIntent.status === 'succeeded'
    ) {
      setMessage('Payment status:' + data.paymentIntent.status + '🥳');
    } else {
      setMessage('Unexpected state 🐍');
    }

    setIsProcessing(false);
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement />
      <button>{isProcessing ? 'Processing ...' : 'Pay now'}</button>
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
