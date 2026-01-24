import React, { useState } from 'react';
import { Button } from './Button';
import { UserData } from '../types';
import { PAYMENT_MODE, OPAY_PUBLIC_KEY, OPAY_MERCHANT_ID, BANK_DETAILS } from '../config';

interface PaymentPageProps {
  userData: UserData;
  onSuccess: (reference: string) => void;
  onBack: () => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ userData, onSuccess, onBack }) => {
  const AMOUNT_NAIRA = 12000;
  const AMOUNT_KOBO = AMOUNT_NAIRA * 100;
  const LIVE_KEY = "pk_live_21ad8f84a4b6a5d34c6d57dd516aafcc95f90e8c"; 
  
  // Determine initial tab based on PAYMENT_MODE
  const [activeTab, setActiveTab] = useState<'CARD' | 'TRANSFER' | 'OPAY'>(
    PAYMENT_MODE === 'TRUE' ? 'CARD' : 'TRANSFER'
  );
  
  const [copied, setCopied] = useState<string | null>(null);
  const [loadingOpay, setLoadingOpay] = useState(false);

  const reference = "STREAM-" + Math.floor((Math.random() * 1000000000) + 1);

  const handlePaystack = () => {
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: LIVE_KEY,
        email: userData.email,
        amount: AMOUNT_KOBO,
        currency: 'NGN',
        ref: reference, 
        metadata: {
          custom_fields: [
            { display_name: "Mobile Number", variable_name: "mobile_number", value: userData.phone },
            { display_name: "Username", variable_name: "username", value: userData.username }
          ]
        },
        callback: function(response: any) {
          onSuccess(response.reference || reference);
        },
      });
      handler.openIframe();
    } else {
      alert("Paystack SDK not loaded. Please refresh.");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleOpayCheckout = async () => {
      setLoadingOpay(true);
      try {
        const payload = {
          country: "NG",
          reference: reference,
          amount: {
            total: AMOUNT_KOBO.toString(),
            currency: "NGN"
          },
          returnUrl: window.location.origin, // Simple redirect back to app, state handling will check session/ref if implemented
          callbackUrl: "https://your-site.com/api/opay-webhook",
          userInfo: {
            userEmail: userData.email,
            userName: userData.name
          },
          product: {
            name: "Stream Africa Activation",
            description: "Lifetime Access Activation Fee"
          }
        };

        const response = await fetch("https://api.opaycheckout.com/api/v1/international/cashier/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPAY_PUBLIC_KEY}`,
            "MerchantId": OPAY_MERCHANT_ID
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (data.code === "00000" && data.data && data.data.cashierUrl) {
           // Redirect user to OPay Cashier
           window.location.href = data.data.cashierUrl;
        } else {
           console.error("OPay Error:", data);
           alert(`OPay Error: ${data.message || 'Unknown error occurred'}`);
        }
      } catch (error) {
        console.error("OPay Request Failed:", error);
        alert("Failed to connect to OPay. Please check your internet connection or try another method.");
      } finally {
        setLoadingOpay(false);
      }
  };

  const handleTransferDone = () => {
      onSuccess(reference);
  };

  // Determine allowed methods based on config
  const showPaystack = PAYMENT_MODE === 'TRUE';
  const showTransfer = PAYMENT_MODE === 'FALSE' || PAYMENT_MODE === 'NEUTRAL';
  const showOpay = PAYMENT_MODE === 'NEUTRAL';

  return (
    <div className="min-h-screen bg-stream-dark flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-emerald-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Complete Activation</h2>
            <p className="text-emerald-100">Unlock Lifetime Access</p>
        </div>
        
        <div className="p-6">
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-500 font-medium">Amount to Pay</span>
                <span className="text-2xl font-extrabold text-emerald-600">₦{AMOUNT_NAIRA.toLocaleString()}</span>
            </div>

            {/* Method Toggles */}
            <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                {showPaystack && (
                    <button 
                        onClick={() => setActiveTab('CARD')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'CARD' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Card / Paystack
                    </button>
                )}
                {showTransfer && (
                    <button 
                        onClick={() => setActiveTab('TRANSFER')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'TRANSFER' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Bank Transfer
                    </button>
                )}
                {showOpay && (
                    <button 
                        onClick={() => setActiveTab('OPAY')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'OPAY' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Opay
                    </button>
                )}
            </div>

            {/* PAYSTACK VIEW */}
            {activeTab === 'CARD' && showPaystack && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-sm text-center text-gray-500">
                        Secure instant payment via Debit Card, USSD, or Bank Transfer via Paystack.
                    </p>
                    <Button onClick={handlePaystack} fullWidth className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg">
                        Pay ₦{AMOUNT_NAIRA.toLocaleString()} Now
                    </Button>
                </div>
            )}

            {/* TRANSFER VIEW */}
            {activeTab === 'TRANSFER' && showTransfer && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-sm text-center text-gray-500 mb-4">
                        Make a transfer to the account below.
                    </p>
                    {BANK_DETAILS.map((bank, index) => (
                        <div key={index} className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl relative">
                            <div className="mb-3">
                                <p className="text-xs text-gray-500 uppercase">Bank Name</p>
                                <p className="font-bold text-gray-800">{bank.bankName}</p>
                            </div>
                            <div className="mb-3">
                                <p className="text-xs text-gray-500 uppercase">Account Number</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-mono text-xl font-bold text-emerald-700 tracking-wider">{bank.accountNumber}</p>
                                    <button 
                                        onClick={() => copyToClipboard(bank.accountNumber, `acc-${index}`)}
                                        className="p-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        {copied === `acc-${index}` ? (
                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Account Name</p>
                                <p className="font-medium text-gray-800">{bank.accountName}</p>
                            </div>
                        </div>
                    ))}
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                         <p className="text-xs text-yellow-800">
                             <strong>Important:</strong> After transfer, click the button below to generate your reference ID and proceed to verification.
                         </p>
                    </div>

                    <Button onClick={handleTransferDone} fullWidth className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg">
                        I Have Made The Transfer
                    </Button>
                </div>
            )}

            {/* OPAY VIEW */}
            {activeTab === 'OPAY' && showOpay && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
                         <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-blue-500/30">
                             OPay
                         </div>
                         <h3 className="text-gray-800 font-bold mb-2">Pay with Opay Wallet</h3>
                         <p className="text-sm text-gray-500 mb-4">
                             Seamless Opay-to-Opay checkout. Click below to authorize securely.
                         </p>
                     </div>
                     <Button 
                        onClick={handleOpayCheckout} 
                        fullWidth 
                        disabled={loadingOpay}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {loadingOpay ? 'Initializing...' : 'Pay with Opay'}
                    </Button>
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
                <button 
                    onClick={onBack}
                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <span>Cancel and Go Back</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};