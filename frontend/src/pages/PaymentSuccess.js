import React from 'react';
import { Navigate } from 'react-router-dom';

const PaymentSuccess = () => {
  return <Navigate to="/payment-status?type=success" replace />;
};

export default PaymentSuccess;