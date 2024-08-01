const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

app.use(express.static(process.env.STATIC_DIR));

app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.post('/test', async (req, res) => {
  const { name, age } = req.body;
  console.log(req.body);
  res.send(`Received data - Name: ${name}, Age: ${age}`);
});

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post('/create-payment-intent', async (req, res) => {
  const { products, count, amount } = req.body;

  try {
    const productsString = JSON.stringify(products);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'PLN',
      amount,
      automatic_payment_methods: { enabled: true },
      metadata: {
        totalAmount: amount,
        numberOfProducts: count,
        products: productsString,
      },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
