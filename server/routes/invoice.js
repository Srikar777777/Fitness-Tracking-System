const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Generate invoice after payment
router.post('/invoice/generate', async (req, res) => {
  const { paymentIntent } = req.body;

  try {
    // Here you can create an invoice with the Stripe API
    const invoice = await stripe.invoices.create({
      customer: paymentIntent.customer,  // Ensure the customer ID is part of paymentIntent
      collection_method: 'send_invoice',
      days_until_due: 30,
    });

    // Finalize the invoice
    await stripe.invoices.finalizeInvoice(invoice.id);

    res.status(200).send({ message: 'Invoice generated successfully!', invoice });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).send({ message: 'Error generating invoice', error });
  }
});

module.exports = router;
