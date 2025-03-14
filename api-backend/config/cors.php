<?php

return [
    'paths' => [
        'api/*',
        'payment/*',
        'login',
        'logout',
        'contact',
        'sanctum/csrf-cookie'
    ],

    'allowed_methods' => ['*'],
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3001')],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];