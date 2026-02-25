<?php
// Handle both GET and POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Initialize the session
    session_start();
     
    // Unset all of the session variables
    $_SESSION = array();
     
    // Destroy the session.
    session_destroy();
     
    // Return JSON response for frontend handling
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
    exit;
} else {
    // Handle GET request (redirect to login)
    session_start();
    $_SESSION = array();
    session_destroy();
    header("location: login.html");
    exit;
}
?>