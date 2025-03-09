<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class PaymentController extends Controller
{
    public function initiatePayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:15',
            'address' => 'nullable|string'
        ]);

        $base_url = env('SSLCOMMERZ_SANDBOX') 
            ? 'https://sandbox.sslcommerz.com' 
            : 'https://securepay.sslcommerz.com';

        $tran_id = uniqid();

        $post_data = [
            'store_id' => env('SSLCOMMERZ_STORE_ID'),
            'store_passwd' => env('SSLCOMMERZ_STORE_PASSWORD'),
            'total_amount' => $request->amount,
            'currency' => "BDT",
            'tran_id' => $tran_id,
            'success_url' => env('APP_URL').'/api/payment/success/'.$tran_id,
            'fail_url' => env('APP_URL').'/api/payment/fail/'.$tran_id,
            'cancel_url' => env('APP_URL').'/api/payment/cancel/'.$tran_id,
            'cus_name' => $request->name,
            'cus_email' => $request->email,
            'cus_add1' => $request->address ?? 'N/A',
            'cus_city' => 'Dhaka',
            'cus_country' => 'Bangladesh',
            'cus_phone' => $request->phone,
            'shipping_method' => 'NO',
            'product_category' => 'Donation',
            'product_name' => 'General Donation',
            'product_profile' => 'non-physical-goods'
        ];

        try {
            $client = new Client();
            $response = $client->post("$base_url/gwprocess/v4/api.php", [
                'form_params' => $post_data,
                'verify' => false
            ]);

            $response_data = json_decode($response->getBody(), true);
            
            return response()->json([
                'payment_url' => $response_data['GatewayPageURL']
            ]);

        } catch (\Exception $e) {
            Log::error('SSLCOMMERZ ERROR: '.$e->getMessage());
            return response()->json(['error' => 'Payment processing failed'], 500);
        }
    }

    public function paymentSuccess(Request $request, $tran_id)
    {
        if($this->validateIPN($request->all())) {
            $amount = $request->input('amount');
            return redirect()->away(
                env('FRONTEND_URL')."/payment-success?tran_id=$tran_id&amount=$amount"
            );
        }
        return redirect()->away(env('FRONTEND_URL').'/payment-fail');
    }

    private function validateIPN($data)
    {
        $store_id = env('SSLCOMMERZ_STORE_ID');
        $store_passwd = env('SSLCOMMERZ_STORE_PASSWORD');
        $val_id = $data['val_id'];
        
        try {
            $client = new Client();
            $response = $client->get("https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php", [
                'query' => [
                    'val_id' => $val_id,
                    'store_id' => $store_id,
                    'store_passwd' => $store_passwd,
                    'format' => 'json'
                ],
                'verify' => false
            ]);

            $result = json_decode($response->getBody(), true);
            return $result['status'] === 'VALID' || $result['status'] === 'VALIDATED';

        } catch (\Exception $e) {
            Log::error('IPN Validation Error: '.$e->getMessage());
            return false;
        }
    }
}