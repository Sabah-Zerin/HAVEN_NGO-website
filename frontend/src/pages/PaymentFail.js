import React from 'react';
import { Navigate } from 'react-router-dom';

const PaymentFail = () => {
  return <Navigate to="/payment-status?type=fail" replace />;
};

export default PaymentFail;