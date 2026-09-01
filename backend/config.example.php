<?php
// Copy this file to config.php and fill in your real values.
// config.php is git-ignored — never commit real credentials.

return [
    // Gmail SMTP — use an App Password, not your normal Gmail password.
    // Generate one at https://myaccount.google.com/apppasswords
    'smtp_host'     => 'smtp.gmail.com',
    'smtp_port'     => 587,
    'smtp_username' => 'youraddress@gmail.com',
    'smtp_password' => 'xxxx xxxx xxxx xxxx', // 16-character App Password
    'from_email'    => 'youraddress@gmail.com',
    'from_name'     => 'Hussnain Estate Advisor',

    // Where enquiries get delivered
    'to_email'      => 'Tippualijee777@gmail.com',
    'to_name'       => 'Hussnain Estate Advisor',

    // Only requests from these origins are allowed to POST to this endpoint.
    // Add your live domain(s) here once deployed.
    'allowed_origins' => [
        'http://localhost:5173',
        'https://hussnainestateadvisor.com',
        'https://www.hussnainestateadvisor.com',
    ],
];
