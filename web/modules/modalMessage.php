<?php

    $type = $_POST['type'];
    $icon = $_POST['icon'];
    $message = $_POST['message'];

    $modalBody = '';

    switch($type){
        case 0:
            $modalBody .= 'Icon: '.$icon.' Message: '.$message;
            break;
    }

    echo json_encode($modalBody);

?>