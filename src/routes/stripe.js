import { Router } from "express";
const env = require('dotenv').config({path: '../../.env'});

const router = Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
	appInfo: { // For sample support and debugging, not required for production:
	  name: "stripe-samples/accept-a-payment/payment-element",
	  version: "0.0.2",
	  url: "https://github.com/stripe-samples"
	}
});

  router.get('/config', (req, res) => {
	res.send({
	  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
  });

  router.get('/create-payment-intent', async (req, res) => {
	// Create a PaymentIntent with the amount, currency, and a payment method type.
	//
	// See the documentation [0] for the full list of supported parameters.
	//
	// [0] https://stripe.com/docs/api/payment_intents/create
	try {
	  const paymentIntent = await stripe.paymentIntents.create({
		currency: 'EUR',
		amount: 35054,
		automatic_payment_methods: { enabled: true }
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
  
  // Stripe integration

export default router;
