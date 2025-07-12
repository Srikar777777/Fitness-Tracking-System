import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe('your_stripe_publishable_key'); // Replace with your Stripe public key

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error) {
      try {
        // Call the backend to create a payment intent
        const { data: clientSecret } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
          amount: 100, // Example amount
        });

        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (paymentIntent.status === 'succeeded') {
          setSuccess(true);
          generateInvoice(paymentIntent);
        }
      } catch (error) {
        console.error('Payment failed:', error);
      }
    } else {
      console.error(error);
    }
  };

  const generateInvoice = (paymentIntent) => {
    // You can send this paymentIntent data to the backend to generate an invoice
    axios.post('http://localhost:5000/api/invoice/generate', {
      paymentIntent,
    }).then(() => {
      alert('Invoice generated successfully!');
    }).catch((error) => {
      console.error('Error generating invoice:', error);
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Complete your Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
      {success && <p>Payment successful! Invoice generated.</p>}
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentPage; // Ensure you're exporting this component as default
