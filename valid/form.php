<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Form</title>
</head>
<body>
<?php print_r($_GET);?>


<form action="form.php" method="get" id="validatedForm">
    login:<input type="text" name="login" /><br>
    email:<input type="email" name="email" /><br>


    <input type="submit" value="submit" name="submit"/>
   <a href="#" id="click">CLICK</a>
</form>
<div id="messageBox">

</div>
<div id="messageBox2">

</div>

<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="jquery.validate.js"></script>
<script>

    $.validator.addMethod('invite_code', function(value, element,param) {
        return value==param;
    });
$('#validatedForm').validate({

//    invalidHandler: function(event, validator) {
//        var err_messages='';
//        for(i=0;i<validator.errorList.length;i++){
//            err_messages+=validator.errorList[i].message+"\n";
//        }
//        alert(err_messages);
//
//    },
    submitHandler: function() { alert("Valid!") },

    onkeyup: function(element)
    {
        $(element).valid() ?
            $(element).css({'border-color':'blue'}) :
            $(element).css({'border-color':'red'});

    },

    errorClass: "invalid",
    rules: {

        login: "required",
        // compound rule
        email: {
            required: true,
            invite_code:'222',
            email: false,
        }
    },messages:{
        email:{
            invite_code:'Code must be 222!',
        }
    },
});

</script>
</body>
</html>