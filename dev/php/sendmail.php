<?php

require_once('class.phpmailer.php');
 
$nome = $_POST['nome'];
$email = $_POST['email'];
$assunto = $_POST['assunto'];
$msg = $_POST['msg'];
 
try {
	$mail = new PHPMailer(true);
 
	$body .= "<h2>Contato site #VaiseSereia</h2>";
	$body .= "Nome: $nome <br>";
	$body .= "E-mail: $email <br>";
	$body .= "Assunto: $assunto <br>";
	$body .= "Mensagem:<br>";
	$body .= $msg;
	$body .= "<br>";
	$body .= "----------------------------";
	$body .= "<br>";
	$body .= "Enviado em <strong>".date("h:m:i d/m/Y")." por ".$_SERVER['REMOTE_ADDR']."</strong>";
	$body .= "<br>";
	$body .= "----------------------------";
	 
	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->Port = 587;
	$mail->Host = "smtp.vaisereia.com.br";
	$mail->Username = "contato@vaisereia.com.br";
	$mail->Password = "bernardxf88";
	 
	$mail->IsSendmail();  
	 
	$mail->AddReplyTo($email, $nome);
	$mail->From = $email;
	$mail->FromName = $nome;
	 
	$to = "contato@vaisereia.com.br";
	$mail->AddAddress($to); 
	$mail->Subject  = $assunto;
	// $mail->WordWrap   = 80;
	 
	$mail->MsgHTML($body);
	 
	$mail->IsHTML(true);
	 
	$mail->Send();
	echo 'Mensagem enviada com sucesso.';

} catch (phpmailerException $e) {

	echo $e->errorMessage();

}

?>