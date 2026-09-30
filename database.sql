CREATE DATABASE IF NOT EXISTS securelinkDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE securelinkDB;

CREATE TABLE IF NOT EXISTS usuarios (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  nombre_completo VARCHAR(100) NOT NULL,
  correo          VARCHAR(120) NOT NULL UNIQUE,
  password_hash   VARCHAR(255) NOT NULL,          
  rol             ENUM('admin','vendedor','cliente') NOT NULL DEFAULT 'cliente',
  creado_en       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
