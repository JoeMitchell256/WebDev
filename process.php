<?php
  pre_r($_GET);
  if (isset($_GET['submit'])){
    echo "The form is using GET method! <br />";
    echo "Pulsefunction:".$_GET['pulsefunction'].'<br />';
    echo "N:".$_GET['n'].'<br />';
  }
?>
