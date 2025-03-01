<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception)
    {
        $response = parent::render($request, $exception);
    
    $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3001');
    $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return $response;
    
        error_log($exception);
        $message = $exception->getMessage();

        return response()->json([
            'success' => false,
            'message' => $message,
            'exception' => (string) $exception
        ], 200);
    }

}