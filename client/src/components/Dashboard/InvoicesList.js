import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch the list of invoices from the backend
    axios.get('http://localhost:5000/api/payments/invoices')
      .then(response => setInvoices(response.data))
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Invoices List</h1>
      {invoices.length > 0 ? (
        <ul>
          {invoices.map(invoice => (
            <li key={invoice.invoiceId}>
              <Link to={`/invoice/${invoice.invoiceId}`}>
                Invoice {invoice.invoiceId} - ${invoice.amount}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
};

export default InvoicesList;
