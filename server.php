<?php 
    session_start();
    
    // If user wants to clear things up, wait for one second and do that
    
    if (isset($_POST["clear"]))
    {
        sleep(1);
        unset($_SESSION["session_msgs"]);
        session_destroy();
    }

    // For initial data (when the page is just loaded)
    // We wait for 1 second and then return the initial data
    
    if (isset($_SESSION["session_msgs"]) && empty($_POST["msg"]))
    {
        sleep(1);
        echo (json_encode($_SESSION["session_msgs"]));
    }
    else if (!isset($_SESSION["session_msgs"]) && empty($_POST["msg"]))
    {
        sleep(1);
        echo " ";
    }
    
    if (!empty($_POST["msg"]))
    {
        sleep(1);
        $data = $_POST["msg"];
        if (!isset($_SESSION["session_msgs"]))
        {
            $_SESSION["session_msgs"] = array();
        }
        array_push($_SESSION["session_msgs"], $data);
        // $_SESSION["session_msgs"] = array($data); // an array of message and date inside associative array

        echo (json_encode($_SESSION["session_msgs"]));
    }

    // If user wants to permanently delete data for both the persons
    
    if (isset($_GET["del_id"]))
    {
        $array_index = $_GET["del_id"];
        $_SESSION["session_msgs"][$array_index] = "You Deleted This Message";

        echo("AJAX deletion (for both) Successful");
    }

    // In case user wants to permanently delete just for himself / herself
    
    if (isset($_GET["del_me_id"]))
    {
        $array_index = $_GET["del_me_id"];
        unset($_SESSION["session_msgs"][$array_index]);

        echo (json_encode($_SESSION["session_msgs"]));

    }

    // In case user wants to update msg

    if (isset($_GET["update_id"]))
    {
        if (isset($_POST["newText"]))
        {
            $array_index = $_GET["update_id"];
            $_SESSION["session_msgs"][$array_index] = $_POST["newText"];
        }
    }
?>
