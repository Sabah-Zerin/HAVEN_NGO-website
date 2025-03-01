import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentStatus.css';

const PaymentStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const statusConfig = {
        success: {
            title: "Payment Successful! 🎉",
            message: "Thank you for your donation.",
            button: null
        },
        fail: {
            title: "Payment Failed! ❌",
            message: "Please try again.",
            button: () => navigate('/donation')
        },
        cancel: {
            title: "Payment Cancelled ⚠️",
            message: "Transaction was cancelled.",
            button: () => navigate('/donation')
        }
    };

    const statusType = location.pathname.split('-')[1]; // success/fail/cancel

    return (
        <div className="payment-status-container">
            <div className={`status-card ${statusType}`}>
                <h2>{statusConfig[statusType].title}</h2>
                <p>{statusConfig[statusType].message}</p>

                <div className="transaction-details">
                    <p>Amount: {params.get('amount')} BDT</p>
                    <p>Transaction ID: {params.get('tran_id')}</p>
                </div>

                {statusConfig[statusType].button && (
                    <button
                        className="action-button"
                        onClick={statusConfig[statusType].button}
                    >
                        {statusType === 'fail' ? 'Retry Payment' : 'Try Again'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PaymentStatus;