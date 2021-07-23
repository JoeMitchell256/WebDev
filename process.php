<?php
  pre_r($_GET);
  if (isset($_GET['submit'])){
    $pulsefunction = $_GET['pulsefunction'];
    exec("python test.py .$pulsefunction");
  }
?>
