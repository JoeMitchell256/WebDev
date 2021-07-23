<?php
  pre_r($_GET);
  if (isset($_GET['submit'])){
    if ( (!isset($_GET['pulsefunction'])) || (!isset($_GET['n'])) ){
      $error = "*" . "Please fill all required fields";
    }
    else{
      $pulsefunction = $_GET['pulsefunction'];
      $n = $_GET['n'];
      echo"<h1>INPUT RECIEVED</h1><br>";
    }
  }

?>
