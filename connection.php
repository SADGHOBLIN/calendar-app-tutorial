<?php

// 1. Connect to local MySQL Sever using XAMPP
$username = "root";
$conn = new mysqli("localhost", $username, "", "calendar");
$conn-> set_charset("utf8mb4");