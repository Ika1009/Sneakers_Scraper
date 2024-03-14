CREATE TABLE SneakerOrders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    extensionId VARCHAR(255),
    style VARCHAR(255),
    size VARCHAR(50),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
<?php
// Include the database connection file
require_once 'db_conn.php';

// Check if style, size, and extensionId parameters are set
if (isset($_GET['style']) && isset($_GET['size']) && isset($_GET['extensionId'])) {
    $extensionId = $_GET['extensionId'];
    $style = $_GET['style'];
    $size = $_GET['size'];
    
    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO SneakerOrders (extensionId, style, size) VALUES (:extensionId, :style, :size)");
    
    // Bind parameters
    $stmt->bindParam(':extensionId', $extensionId);
    $stmt->bindParam(':style', $style);
    $stmt->bindParam(':size', $size);
    
    try {
        // Execute SQL statement
        $stmt->execute();
        
        echo "Sneaker order added successfully";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: Style, size, and extensionId parameters are required";
}

// Close connection
$conn = null;
?>

