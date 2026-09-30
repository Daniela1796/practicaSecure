<?php
//Especifica que la respuesta del servidor es JSON
header('Content-Type: application/json; charset=utf-8');
// carga la conexión a la base de datos establecida en db.php
require_once __DIR__ . '/database/db.php';

//Función que verifica que la petición al servidor sea exclusivamente con POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    //405: código de respuesta HTTP Method Not Allowed
    http_response_code(405);
    //Mensaje de error que  devuelve antes de finalizar el script
    echo json_encode(["status" => "error", "mensaje" => "Método no permitido"]);
    exit();
}

//Validaciones de los campos obligatorios y roles permitidos 
$nombre = trim($_POST['nombre'] ?? '');
$correo = trim($_POST['correo'] ?? '');
$clave  = $_POST['clave'] ?? '';   
$rol    = trim($_POST['rol'] ?? '');

if ($nombre === '' || $correo === '' || $clave === '' || $rol === '') {
    echo json_encode(["status" => "error", "mensaje" => "Todos los campos son obligatorios"]);
    exit();
}

$rolesValidos = ['admin', 'vendedor', 'cliente'];
if (!in_array($rol, $rolesValidos, true)) {
    echo json_encode(["status" => "error", "mensaje" => "Rol no válido"]);
    exit();
}

//Verifica que el correo registrado no estpe guardado en la BD
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE correo = ?");
$stmt->execute([$correo]);
if ($stmt->fetch()) {
    echo json_encode(["status" => "error", "mensaje" => "El usuario ya está registrado."]);
    exit();
}

//---- Encriptación de la contraseña---- //

// Hash con bcrypt 
//$passwordHash = password_hash($clave, PASSWORD_BCRYPT);
//Hash con argon2
$passwordHash = password_hash($clave, PASSWORD_ARGON2ID);

//Inserción del nuevo usuario

//Se utiliza la función prepare: garantiza que el query esté parametrizado para coincidir con la BD
$insert = $pdo->prepare("INSERT INTO usuarios (nombre_completo, correo, password_hash, rol) VALUES (?, ?, ?, ?)");
//Ejecuta el query INSERT  
$exito  = $insert->execute([$nombre, $correo, $passwordHash, $rol]);

//Envío la respuesta del servidor después de ejecutar el Query
if ($exito) {
    echo json_encode(["status" => "ok", "mensaje" => "Usuario registrado exitosamente."]);
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error al registrar en la base de datos."]);
}
