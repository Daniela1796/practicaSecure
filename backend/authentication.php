<?php

session_start();

// Incluir la dependencia de la BD
require_once __DIR__ . '/database/db.php';

// Permite mostrar las respuestas del servidor en formato JSON
header('Content-Type: application/json; charset=utf-8');

// Permite controlar el método que solicita al servidor
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "mensaje" => "Método no permitido"]);
    exit();
}

// Validación de los datos recibidos
$correo = trim($_POST['correo'] ?? '');
$clave  = $_POST['clave'] ?? '';   

if ($correo === '' || $clave === '') {
    echo json_encode(["status" => "error", "mensaje" => "Por favor ingrese todos los datos"]);
    exit();
}

// Preparar la consulta de búsqueda con el parámetro que se requiere
$stmt = $pdo->prepare("SELECT id, nombre_completo, correo, password_hash, rol FROM usuarios WHERE correo = ?");
$stmt->execute([$correo]);
$user = $stmt->fetch();

// Validar autenticación:
// 1. Verificar que el usuario exista
// 2. Comprobar la contraseña hash con password_verify()
        //Función de PHP que 
if ($user && password_verify($clave, $user['password_hash'])) {

    // Genera un nuevo ID de sesión por seguridad 
    session_regenerate_id(true);  

    //session: variable global
    // Guardar los datos en la sesión activa
    $_SESSION['id_usuario'] = $user['id'];
    $_SESSION['nombre']     = $user['nombre_completo'];
    $_SESSION['correo']     = $user['correo'];
    $_SESSION['rol']        = $user['rol'];

    // Construir la ruta de redirección según el rol registrado en la BD
    $redirectUrl = match ($user['rol']) {
        'admin'    => '../frontend/panel/admin.php',
        'vendedor' => '../frontend/panel/sales.php',
        'cliente'  => '../frontend/panel/client.php',
        default    => '../login.html'
    };

    // Responder con JSON de éxito y la ruta a donde redirigir en JS
    echo json_encode([
        "status"   => "ok",
        "redirect" => $redirectUrl,
    ]);
    exit();
}

// Si la autenticación falla
echo json_encode(["status" => "error", "mensaje" => "Correo o contraseña incorrectos"]);