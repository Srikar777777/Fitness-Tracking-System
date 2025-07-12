import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/invoice/${invoiceId}`);
        setInvoice(response.data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setError('Failed to fetch the invoice. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (loading) {
    return <p>Loading invoice...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Invoice Details</h1>
      {invoice ? (
        <div>
          <p><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
          <p><strong>Amount:</strong> ${invoice.amount}</p>
          <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {invoice.status}</p>
        </div>
      ) : (
        <p>No invoice found.</p>
      )}
    </div>
  );
};

export default Invoice;
