<?php
// Include config file
require_once "db_config.php";

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Reset password step - user enters email and new password
    if (isset($data['email']) && isset($data['new_password']) && isset($data['confirm_password'])) {
        $email = trim($data['email']);
        $new_password = $data['new_password'];
        $confirm_password = $data['confirm_password'];
        
        // Validate inputs
        if (empty($email)) {
            $response["message"] = "Email is required.";
        } elseif (empty($new_password)) {
            $response["message"] = "New password is required.";
        } elseif (strlen($new_password) < 6) {
            $response["message"] = "Password must be at least 6 characters long.";
        } elseif ($new_password !== $confirm_password) {
            $response["message"] = "Passwords do not match.";
        } else {
            // Check if user exists
            $sql = "SELECT id FROM users WHERE email = :email";
            
            if ($stmt = $pdo->prepare($sql)) {
                $stmt->bindParam(":email", $email, PDO::PARAM_STR);
                
                if ($stmt->execute()) {
                    if ($stmt->rowCount() == 1) {
                        // User exists, update password
                        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
                        $update_sql = "UPDATE users SET password_hash = :password_hash WHERE email = :email";
                        
                        if ($update_stmt = $pdo->prepare($update_sql)) {
                            $update_stmt->bindParam(":password_hash", $hashed_password, PDO::PARAM_STR);
                            $update_stmt->bindParam(":email", $email, PDO::PARAM_STR);
                            
                            if ($update_stmt->execute()) {
                                $response["success"] = true;
                                $response["message"] = "Password reset successful! You can now login with your new password.";
                            } else {
                                $response["message"] = "Failed to update password. Please try again.";
                            }
                            unset($update_stmt);
                        }
                    } else {
                        $response["message"] = "No account found with that email address.";
                    }
                } else {
                    $response["message"] = "Database error occurred.";
                }
                unset($stmt);
            }
        }
    } else {
        $response["message"] = "Missing required fields.";
    }
}

header('Content-Type: application/json');
echo json_encode($response);
unset($pdo);
?>