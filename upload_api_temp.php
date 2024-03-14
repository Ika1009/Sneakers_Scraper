CREATE TABLE SneakerOrders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    style VARCHAR(255),
    size VARCHAR(50),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

<?php
// Include the database connection file
require_once 'db_conn.php';

// Check if style and size parameters are set
if (isset($_GET['style']) && isset($_GET['size'])) {
    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO SneakerOrders (style, size) VALUES (:style, :size)");
    
    // Bind parameters
    $stmt->bindParam(':style', $_GET['style']);
    $stmt->bindParam(':size', $_GET['size']);
    
    try {
        // Execute SQL statement
        $stmt->execute();
        
        echo "Sneaker order added successfully";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: Style and size parameters are required";
}

// Close connection
$conn = null;
?>
