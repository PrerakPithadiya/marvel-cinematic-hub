<?php
// Include config file
require_once "db_config.php";

// Initialize variables
$username = $email = $password = $hero_class = $full_name = "";
$response = ["success" => false, "message" => ""];

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Get JSON data from request body
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        if (!$data) {
            throw new Exception("Invalid JSON data received.");
        }

        if (isset($data['username']) && isset($data['email']) && isset($data['password'])) {
            $username = trim($data['username']);
            $email = trim($data['email']);
            $password = $data['password'];
            $full_name = isset($data['full_name']) ? trim($data['full_name']) : "";
            $hero_class = isset($data['hero_class']) ? $data['hero_class'] : "Soldier";

            // Check if username or email already exists
            $sql = "SELECT id FROM users WHERE username = :username OR email = :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $response["message"] = "Username or Email already taken.";
            } else {
                // Prepare an insert statement
                // Note: We use try-catch to catch database errors like missing columns
                $sql = "INSERT INTO users (username, email, password_hash, full_name, hero_class) VALUES (:username, :email, :password, :full_name, :hero_class)";
                
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(":username", $username, PDO::PARAM_STR);
                $stmt->bindParam(":email", $email, PDO::PARAM_STR);
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $stmt->bindParam(":password", $hashed_password, PDO::PARAM_STR);
                $stmt->bindParam(":full_name", $full_name, PDO::PARAM_STR);
                $stmt->bindParam(":hero_class", $hero_class, PDO::PARAM_STR);
                
                if ($stmt->execute()) {
                    $response["success"] = true;
                    $response["message"] = "Registration successful!";
                    
                    // Start session and log in the user
                    if (session_status() === PHP_SESSION_NONE) {
                        session_start();
                    }
                    $_SESSION["loggedin"] = true;
                    $_SESSION["username"] = $username;
                    $_SESSION["hero_class"] = $hero_class;
                } else {
                    $response["message"] = "Oops! Something went wrong. Please try again later.";
                }
            }
            unset($stmt);
        } else {
            $response["message"] = "Missing required fields: username, email, or password.";
        }
    } catch (PDOException $e) {
        $response["message"] = "Database Error: " . $e->getMessage();
        // Check if it's a missing column error
        if (strpos($e->getMessage(), "Unknown column 'full_name'") !== false) {
            $response["message"] .= ". Please run database/setup.sql to update your table structure.";
        }
    } catch (Exception $e) {
        $response["message"] = "Error: " . $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($response);
unset($pdo);
?>
