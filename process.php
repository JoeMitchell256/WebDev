<?php
  pre_r($_POST);
  if (isset($_POST['submit'])){
    if ( (!isset($_POST['pulsefunction'])) || (!isset($_POST['n'])) ){
      $error = "*" . "Please fill all required fields";
    }
    else{
      $pulsefunction = $_POST['pulsefunction'];
      $n = $_POST['n'];
      echo"<h1>INPUT RECIEVED</h1><br>";
    }
  }

?>
