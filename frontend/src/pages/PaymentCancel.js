import React from 'react';
import { Navigate } from 'react-router-dom';

const PaymentCancel = () => {
  return <Navigate to="/payment-status?type=cancel" replace />;
};

export default PaymentCancel;