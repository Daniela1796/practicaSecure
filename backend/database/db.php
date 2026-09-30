<?php
function cargarEnv($ruta) {
    if (!is_readable($ruta)) {
        throw new RuntimeException("No se pudo leer el archivo .env en: " . $ruta);
    }

    $lineas = file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lineas as $linea) {
        $linea = trim($linea);

        if ($linea === '' || str_starts_with($linea, '#')) {
            continue;
        }

        [$nombre, $valor] = explode('=', $linea, 2);
        $nombre = trim($nombre);
        $valor = trim(trim($valor), "\"'");

        putenv($nombre . "=" . $valor);
        $_ENV[$nombre] = $valor;
        $_SERVER[$nombre] = $valor;
    }
}

cargarEnv(dirname(__DIR__, 2) . '/.env');

$host = $_ENV['DB_HOST'] ?? 'localhost';
$port = $_ENV['DB_PORT'] ?? '3306';
$db   = $_ENV['DB_NAME'] ?? 'securelinkDB';
$user = $_ENV['DB_USER'] ?? 'root';
$pass = $_ENV['DB_PASS'] ?? '';

try {
    // 3. Conexión directa a la base de datos que ya creaste
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    error_log("SecureLink - fallo de conexión a la BD: " . $e->getMessage());  // el detalle queda en el log del servidor
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        "status"  => "error",
        "mensaje" => "No se pudo conectar a la base de datos."
    ]);
    exit();
}
?>