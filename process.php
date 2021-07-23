<?php
if (isset($_POST['submit']))
{
  if(  (!isset($_POST['pulsefunction']))     ||     (!isset($_POST['n']))   )
  {
    $error = "*" . "Please fill all the required fields"; 
  }else{
    $pulsefunction = $_POST['pulsefunction'];
    $n = $_POST['n'];
  }
  if (!isset($error))
  {
    echo"<h1>INPUT RECIEVED</h1>";
  }
}
?>
