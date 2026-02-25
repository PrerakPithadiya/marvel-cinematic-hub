-- Finalized Marvel Studio Database Setup
CREATE DATABASE IF NOT EXISTS marvel_studio;
USE marvel_studio;

-- Update table to match the new form structure
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    hero_class VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- If table exists but columns are missing, this will add them
-- (Safe to run multiple times)
ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(100) AFTER password_hash;
ALTER TABLE users ADD COLUMN IF NOT EXISTS hero_class VARCHAR(50) AFTER full_name;
