<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize inputs
    $name     = htmlspecialchars(trim($_POST["name"] ?? ''));
    $surname  = htmlspecialchars(trim($_POST["surname"] ?? ''));
    $email    = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone    = htmlspecialchars(trim($_POST["phone"] ?? ''));
    $service  = htmlspecialchars(trim($_POST["service"] ?? ''));
    $message  = nl2br(htmlspecialchars(trim($_POST["message"] ?? '')));

    // Validate required fields
    if (empty($name) || empty($surname) || empty($email) || empty($phone) || empty($message) || empty($service)) {
        http_response_code(400);
        echo "Ju lutem plotësoni të gjitha fushat.";
        exit;
    }

    $subject = "CESARD - Kontakt i ri nga $name $surname";
    $mail = new PHPMailer(true);

    try {
        if (!ob_get_level()) ob_start();

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'presslogic36@gmail.com';
        $mail->Password   = 'qsoz cpnl dvwd ibfs'; // Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->SMTPDebug  = in_array($_SERVER['SERVER_NAME'], ['localhost', '127.0.0.1']) ? 2 : 0;

        $mail->setFrom('no-reply@cesard.org', 'CESARD Website');
        $mail->addAddress('cesard_te@hotmail.com');
        $mail->addAddress('arbenhalili82@hotmail.com');

        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = $subject;
        $mail->Body = "
            <h3 style='color:#2e7d32;'>Kontakt i ri nga CESARD Website</h3>
            <p><strong>Emri:</strong> $name $surname</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Telefoni:</strong> $phone</p>
            <p><strong>Shërbimi i zgjedhur:</strong> $service</p>
            <p><strong>Mesazhi:</strong><br>$message</p>
            <hr>
            <p style='font-size:12px;color:#888;'>Kjo është një mesazh nga formulari në <a href='https://cesard.org'>cesard.org</a>.</p>
        ";
        $mail->AltBody = "Kontakt i ri nga $name $surname:\nEmail: $email\nTelefoni: $phone\nSherbimi: $service\nMesazhi:\n$message";

        $mail->send();

        if (ob_get_length()) ob_end_clean();
        header("Location: thank-you.html");
        exit();

    } catch (Exception $e) {
        error_log("Mail Error: " . $mail->ErrorInfo);
        if (in_array($_SERVER['SERVER_NAME'], ['localhost', '127.0.0.1'])) {
            echo "Mailer Error: {$mail->ErrorInfo}";
        } else {
            header("Location: error.html");
            exit();
        }
    }

} else {
    header("Location: error.html");
    exit();
}
