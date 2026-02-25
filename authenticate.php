<?php
// Include config file
require_once "db_config.php";

$response = ["success" => false, "message" => ""];

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['username']) && isset($data['password'])) {
        $username = trim($data['username']);
        $password = $data['password'];
        
        $sql = "SELECT id, username, password_hash, hero_class FROM users WHERE username = :username";
        
        if ($stmt = $pdo->prepare($sql)) {
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            
            if ($stmt->execute()) {
                if ($stmt->rowCount() == 1) {
                    if ($row = $stmt->fetch()) {
                        $id = $row["id"];
                        $username = $row["username"];
                        $hashed_password = $row["password_hash"];
                        $hero_class = $row["hero_class"];
                        
                        if (password_verify($password, $hashed_password)) {
                            // Password is correct, start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;
                            $_SESSION["hero_class"] = $hero_class;
                            
                            $response["success"] = true;
                            $response["message"] = "Login successful!";
                            $response["username"] = $username;
                        } else {
                            $response["message"] = "Invalid username or password.";
                        }
                    }
                } else {
                    $response["message"] = "Invalid username or password.";
                }
            } else {
                $response["message"] = "Database query failed.";
            }
            unset($stmt);
        } else {
            $response["message"] = "Database preparation failed.";
        }
    } else {
        $response["message"] = "Missing username or password.";
    }
} else {
    $response["message"] = "Invalid request method.";
}

header('Content-Type: application/json');
echo json_encode($response);
unset($pdo);
?>