<?php

$emailData = json_decode($_POST);

$toEmail = 'example@mail.com';
$from = trim($emailData['name']).' '.trim($emailData['email']);
$subject = 'Subject';
$message = trim($emailData['message']);

$headers = 'From: '.$from."\r\n" .
    'Reply-To: '.trim($emailData['email']);

echo (mail($toEmail, $subject, $message, $headers)) ? 'success' : 'fail';