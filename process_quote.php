<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "empowering_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$name = $_POST['name'];
$phone = $_POST['number'];
$email = $_POST['email'];
$address = $_POST['address'];

// Convert selected courses into a string
$courses = "";
if (!empty($_POST['courses'])) {
    $courses = implode(", ", $_POST['courses']);
}

// Insert into database
$sql = "INSERT INTO quotations (name, phone, email, address, courses)
        VALUES ('$name', '$phone', '$email', '$address', '$courses')";

if ($conn->query($sql) === TRUE) {
    echo "Quotation saved successfully!";

    // OPTIONAL: send a welcome message/email
    // You can later integrate PHPMailer here
    echo "<br>Welcome $name, we’ll be in touch at $email!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
