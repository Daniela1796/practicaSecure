<?php
// 1. Iniciar sesión si no está iniciada
    session_start();

// 2. Prevenir la caché del navegador
//header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

// 3. Verificar si no existe rol o no coincide con el rol requerido por la página
//ISSET: función de PHP que sirve para verificar si una variable está declarada

if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== ($rolRequerido ?? '')) {
    header('Location: ../login.html');
    exit();
}