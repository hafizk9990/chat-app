$(document).ready( () => {
    $("#welcome").fadeIn(1500);
    
    $('#welcome').on('click', ( () => {
        $('#welcome').fadeOut(900);
        $('#non-welcome').fadeIn(900);
    }));

    $('#msg-box').focus( () => {
        $('#msg-box').css('background-color', 'pink')
    });
    
    $('#msg-box').blur( () => {
        $('#msg-box').css('background-color', 'white')
    });

    $.ajax({
        type: 'GET',
        url: 'server.php',
        success: (serverResponse) => {
            console.log("AJAX GET (initial) is successful");
            console.log("Server's Response (initial):", serverResponse);
            $('#my-spinner').hide();
            if (serverResponse !== " ")
            {
                var serverParsedResponse = JSON.parse(serverResponse);
                $('#my-div').empty();
                $.each(serverParsedResponse, (index, value) => {
                    let dt = new Date();
                    let time = dt.getHours() + ": " + dt.getMinutes();
                    if (value !== "You Deleted This Message")
                    {
                        if (index % 2 === 0)
                        {
                            $('#my-div').append (
                                `<span class = user-1 id =  "${index}Text"> <strong> ${value} </strong> </span> <br> 
                                <span class = "time-1" id =  "${index}Received"> Received: ${time} &nbsp;
                                    <i id = "${index}Trash" class = "fa fa-trash del-for-everyone" style = "font-size: 25px;"></i> &nbsp;
                                    <i id = "${index}Update" class = "fa fa-pencil alter-message" style = "font-size: 25px;"></i>
                                    <br> <br> <br>
                                </span>`
                            );
                        }
                        else 
                        {
                            $('#my-div').append (
                                `<span class = user-2 id =  "${index}Text"> <strong> ${value} </strong> </span> <br> 
                                <span class = "time-2"  id = "${index}Received"> Received: ${time} &nbsp;
                                    <i id = "${index}Trash" class = "fa fa-trash del-for-everyone" style = "font-size: 25px;"></i> &nbsp;
                                    <i id = "${index}Update" class = "fa fa-pencil alter-message" style = "font-size: 25px;"></i>                                    
                                    <br> <br> <br>
                                </span>`
                            );
                        }
                    }
                    else if (value === "You Deleted This Message")
                    {
                        if (index % 2 === 0)
                        {
                            $('#my-div').append (
                                `<span class = user-1 id =  "${index}Text"> <strong> ${value} </strong> </span> <br>
                                <span class = "time-1"  id = "${index}Received"> Received: ${time} <br> <br> <br> </span>`
                            );
                        }
                        else 
                        {
                            $('#my-div').append (
                                `<span class = user-2 id =  "${index}Text"> <strong> ${value} </strong> </span> <br>
                                <span class = "time-2"  id = "${index}Received"> Received: ${time} <br> <br> <br> </span>`
                            );
                        }
                    }
                });
            }
        },
        error: () => {
            console.log("AJAX GET (initial) encountered a failure");
        }
    });
    
    $('#my-btn').on('click', ( () => {
        $('#my-spinner').show();
        let textMsg = $('#msg-box').val();
        let object = {
            msg: textMsg
        };
        $.ajax({
            type: 'POST',
            url: 'server.php',
            data: object,
            success: (serverResponse) => {
                console.log("AJAX Post (Message) is successful");
                console.log("Server's Response (Message):", serverResponse);
                let serverParsedResponse = JSON.parse(serverResponse);
                $('#my-div').empty();
                $('#my-spinner').hide();
                document.getElementById('msg-box').value = "";
                $.each(serverParsedResponse, (index, value) => {
                    let dt = new Date();
                    let time = dt.getHours() + ": " + dt.getMinutes();
                    if (value !== "You Deleted This Message")
                    {
                        if (index % 2 === 0)
                        {
                            $('#my-div').append (
                                `<span class = user-1 id =  "${index}Text"> <strong> ${value} </strong> </span> <br> 
                                <span class = "time-1" id =  "${index}Received"> Received: ${time} &nbsp;
                                    <i id = "${index}Trash" class = "fa fa-trash del-for-everyone" style = "font-size: 25px;"></i> &nbsp;
                                    <i id = "${index}Update" class = "fa fa-pencil alter-message" style = "font-size: 25px;"></i>
                                    <br> <br> <br>
                                </span>`
                            );
                        }
                        else 
                        {
                            $('#my-div').append (
                                `<span class = user-2 id =  "${index}Text"> <strong> ${value} </strong> </span> <br> 
                                <span class = "time-2"  id = "${index}Received"> Received: ${time} &nbsp;
                                    <i id = "${index}Trash" class = "fa fa-trash del-for-everyone" style = "font-size: 25px;"></i> &nbsp;
                                    <i id = "${index}Update" class = "fa fa-pencil alter-message" style = "font-size: 25px;"></i>                                    
                                    <br> <br> <br>
                                </span>`
                            );
                        }
                    }
                    else if (value === "You Deleted This Message")
                    {
                        if (index % 2 === 0)
                        {
                            $('#my-div').append (
                                `<span class = user-1 id =  "${index}Text"> <strong> ${value} </strong> </span> <br>
                                <span class = "time-1"  id = "${index}Received"> Received: ${time} <br> <br> <br> </span>`
                            );
                        }
                        else 
                        {
                            $('#my-div').append (
                                `<span class = user-2 id =  "${index}Text"> <strong> ${value} </strong> </span> <br>
                                <span class = "time-2"  id = "${index}Received"> Received: ${time} <br> <br> <br> </span>`
                            );
                        }
                    }
                });
            },
            error: () => {
                console.log("AJAX Post (Message) encountered a failure");
            }
        });
    }));
    
    $('#clear-chat').on('click', () => {
        $('#my-spinner').show();
        $.ajax({
            type: 'POST',
            url: 'server.php',
            data: {clear: 1},
            success: (serverResponse) => {
                console.log("AJAX Post (Clear) is successful");
                console.log("Server's Response (Clear):", serverResponse);
                let serverParsedResponse = JSON.parse(serverResponse);
                $('#my-spinner').hide();
                $('#my-div').empty();
                $('#msg-box').empty();
                document.getElementById('msg-box').value = "";
                $.each(serverParsedResponse, (index, value) => {
                    $('#my-div').append(value, "<br>");
                });
            },
            error: () => {
                console.log("AJAX Post (Clear) encountered a failure");
            }
        });
    });
});

$('#my-div').delegate('.del-for-everyone', 'click', (event) => {
    console.log("Deleting ...", event.target.id);
    let trashID = event.target.id;
    let banID = trashID.substring(0, 1) + 'Hide';
    let updateID = trashID.substring(0, 1) + 'Update';
    let textID = trashID.substring(0, 1) + 'Text';
    let arrayIndex = trashID.substring(0, 1);
    document.getElementById(textID).innerHTML = "<strong> You Deleted This Message </strong>";
    $('#' + trashID).remove();
    $('#' + banID).remove();
    $('#' + updateID).remove();


    $.ajax ({
        type: 'DELETE',
        url: "server.php?del_id="+arrayIndex,
        success: (serverResponse) => {
            
        },
        error: () => {
            console.log("Delete for everyone failed!");
        }
    });
});

$('#my-div').delegate('.alter-message', 'click', (event) => {
    $('#update-div').show();
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    });
    let updateID = event.target.id;
    let textID = updateID.substring(0, 1) + 'Text';
    let textContent = document.getElementById(textID).innerHTML;
    textContent = textContent.replace('<strong>', '');
    textContent = textContent.replace('</strong>', '');
    let arrayIndex = updateID.substring(0, 1);
    console.log(textContent);
    document.getElementById('update-box').value = textContent;

    $('#update-btn').on('click', () => {
        let updatedText = document.getElementById('update-box').value;
        updatedText = `<strong>${updatedText}</strong>`;
        $('#update-div').hide();
        $('#my-spinner').show();

        $.ajax({
            type: 'POST',
            url: 'server.php?update_id='+arrayIndex,
            data: {newText: updatedText},
            success: () => {
                $('#my-spinner').hide();
                document.getElementById(textID).innerHTML = updatedText;
            },
            error: () => {
                console.log("Message Updation Failed");
            }
        });
    });
});
