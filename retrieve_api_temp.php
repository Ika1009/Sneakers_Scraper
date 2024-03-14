<?php
// Include the database connection file
require_once 'db_conn.php';

// Check if extensionId parameter is set
if (isset($_GET['extensionId'])) {
    // Fetch extensionId from the GET parameters
    $extensionId = $_GET['extensionId'];

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT * FROM SneakerOrders WHERE extensionId = :extensionId");
    
    // Bind the parameter
    $stmt->bindParam(':extensionId', $extensionId);
    
    try {
        // Execute SQL statement
        $stmt->execute();

        // Fetch all rows as an associative array
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if any results were found
        if (count($results) > 0) {
            // Output the results as JSON
            header('Content-Type: application/json');
            echo json_encode($results);
        } else {
            echo "No shoes found for extensionId: $extensionId";
        }
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: extensionId parameter is required";
}

// Close connection
$conn = null;
?>
