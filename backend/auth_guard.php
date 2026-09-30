<?php
// 1. Evitar que el navegador restaure páginas protegidas desde la caché
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

// 2. Iniciar sesión si no está iniciada
session_start();

// 3. Verificar si no existe rol o no coincide con el rol requerido por la página
//ISSET: función de PHP que sirve para verificar si una variable está declarada

if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== ($rolRequerido ?? '')) {
    header('Location: ../login.html?session=expired');
    exit();
}