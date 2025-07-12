const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key from .env

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
    });

    res.json(paymentIntent.client_secret);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

