<?php
/**
 * Contact form endpoint used by the React site.
 * Accepts a JSON POST body and emails the enquiry via PHPMailer/SMTP.
 * Responds with JSON: { "success": true } or { "success": false, "error": "..." }
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

$config = require __DIR__ . '/config.php';

// --- CORS: only allow the configured origins ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

function respond(bool $success, string $message, int $code = 200): void {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// Accept either JSON body or classic form-encoded POST
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name          = trim(htmlspecialchars($data['name'] ?? ''));
$email         = trim(htmlspecialchars($data['email'] ?? ''));
$phone         = trim(htmlspecialchars($data['phone'] ?? ''));
$property_type = trim(htmlspecialchars($data['property_type'] ?? ''));
$message       = trim(htmlspecialchars($data['message'] ?? ''));

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    respond(false, 'Please fill in all required fields.', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

// Basic rate-limit-free spam guard: reject if a honeypot field was filled
if (!empty($data['website'] ?? '')) {
    respond(true, 'Thanks — we will be in touch shortly.'); // silently accept, don't send
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_username'];
    $mail->Password   = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $config['smtp_port'];

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "New property inquiry from $name";
    $mail->Body = "
        <h3>New inquiry from the website</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Property type:</strong> $property_type</p>
        <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
    ";
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nProperty type: $property_type\nMessage: $message";

    $mail->send();

    respond(true, 'Thanks — your inquiry has been sent. We will contact you shortly.');
} catch (Exception $e) {
    error_log('Contact form mail error: ' . $mail->ErrorInfo);
    respond(false, 'Sorry, the message could not be sent. Please try WhatsApp or call us directly.', 500);
}
