import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import httpError from "http-errors";
import routes from "./routes";
import errorHandler from "./middleware/ErrorHandler";
import config from "./config/app";

global.__basedir = __dirname;

const app = express();

// Stripe integration
const {resolve} = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({path: '../.env'});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
	appInfo: { // For sample support and debugging, not required for production:
	  name: "stripe-samples/accept-a-payment/payment-element",
	  version: "0.0.2",
	  url: "https://github.com/stripe-samples"
	}
});

  app.use(
	express.json({
	  // We need the raw body to verify webhook signatures.
	  // Let's compute it only when hitting the Stripe webhook endpoint.
	  verify: function (req, res, buf) {
		if (req.originalUrl.startsWith('/webhook')) {
		  req.rawBody = buf.toString();
		}
	  },
	})
  );
//   app.get('/api/config', (req, res) => {
// 	res.send({
// 	  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
// 	});
//   });

//   app.get('/api/create-payment-intent', async (req, res) => {
// 	// Create a PaymentIntent with the amount, currency, and a payment method type.
// 	//
// 	// See the documentation [0] for the full list of supported parameters.
// 	//
// 	// [0] https://stripe.com/docs/api/payment_intents/create
// 	try {
// 	  const paymentIntent = await stripe.paymentIntents.create({
// 		currency: 'EUR',
// 		amount: 35054,
// 		automatic_payment_methods: { enabled: true }
// 	  });
  
// 	  // Send publishable key and PaymentIntent details to client
// 	  res.send({
// 		clientSecret: paymentIntent.client_secret,
// 	  });
// 	} catch (e) {
// 	  return res.status(400).send({
// 		error: {
// 		  message: e.message,
// 		},
// 	  });
// 	}
//   });
  
  // Expose a endpoint as a webhook handler for asynchronous events.
  // Configure your webhook in the stripe developer dashboard
  // https://dashboard.stripe.com/test/webhooks
  
  app.post('/webhook', async (req, res) => {
	let data;
	let eventType;
  
	// Check if webhook signing is configured.
	if (process.env.STRIPE_WEBHOOK_SECRET) {
	  // Retrieve the event by verifying the signature using the raw body and secret.
	  let event;
	  const signature = req.headers['stripe-signature'];
	  try {
		event = stripe.webhooks.constructEvent(
		  req.rawBody,
		  signature,
		  process.env.STRIPE_WEBHOOK_SECRET
		);
	  } catch (err) {
		console.log(`⚠️  Webhook signature verification failed.`);
		return res.sendStatus(400);
	  }
	  data = event.data;
	  eventType = event.type;
	} else {
	  // Webhook signing is recommended, but if the secret is not configured in `config.js`,
	  // we can retrieve the event data directly from the request body.
	  data = req.body.data;
	  eventType = req.body.type;
	}
  
	if (eventType === 'payment_intent.succeeded') {
	  // Funds have been captured
	  // Fulfill any orders, e-mail receipts, etc
	  // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
	  console.log('💰 Payment captured!');
	} else if (eventType === 'payment_intent.payment_failed') {
	  console.log('❌ Payment failed.');
	}
	res.sendStatus(200);
  });
  // Stripe integration
  
const morganFormat = config.isDev ? "dev" : "combined";
app.use(morgan(morganFormat));

mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", ...routes);




var imgs=__dirname+'\\resources\\static\\assets\\uploads';

app.use('/job/logos', express.static(imgs));

app.use((req, res, next) => {
  next(httpError(404));
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server started ${config.host}:${config.port}`);
});
