<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Jquery UI</title>
    <link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css" >

    <style type="text/css">
        .sortableLists,.sortableLists ul
        {
            list-style: none;
        }
        .sortableLists li
       {
           min-height:30px;
            background-color: orange;
            border-radius: 3px;
            border:1px solid grey;
            margin-bottom: 20px;

       }
    </style>
</head>
<body>

<input type="text" name="title">
<input type="text" name="url">
<button id="add">add</button>

<ul class="sortableLists">
    <li id="0">
        Whatever you want here
        <ul>
            <li id="1">Nested list item</li>
            <li id="2">Another item</li>
        </ul>
    </li>
    <li id="7">
        Whatever you want here
        <ul>
            <li id="3">Nested list item</li>
            <li id="4">Another item</li>
        </ul>
    </li>

</ul>
<button id="toArrBtn">CLICK</button>

<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="jquery-ui-1.12.1/jquery-ui.js"></script>
<script src="jquery-sortable-lists.min.js"></script>
<script>
    $(function(){


        $('.sortableLists').sortableLists(  );
        $('#toArrBtn').on('click', function(){
            var list=$('.sortableLists').sortableListsToArray();
            for(i=0;i<list.length;i++){
                if(list[i].order!==undefined)
                {
                    $('#'+list[i].id).prepend(list[i].order);
                }
                else
                {
                    $('#'+list[i].id).prepend('order?');
                }

            }
            console.log(list);
        });
        $('#add').click(function(){

            var id=Date.now();
            var url=$('[name="url"]').val();
            var title=$('[name="title"]').val();
            var edit='<button name="edit-item">edit</button>';

            $('.sortableLists').append('<li id="'+id+'" date-url="'+url+'">'+title+' '+edit+'</li>');

        });
        $(document).on('click','[name="edit-item"]',function(e){

            console.log('click edit');
            var item=$(this).closest('li');
            item.html('<input type="text" name="item-text-change"/><input type="text" name="item-url-change"/><button  name="save-change" data-id="'+$(item).attr('id')+'">save</button>');
            e.preventDefault();
        });
        $(document).on('click','[name="save-change"]',function(){
            var item=$(this).closest('li');
            var edit='<button  name="edit-item">edit</button>';
            var newtext=$(item).find('[name="item-text-change"]').val();
            var newurl=$(item).find('[name="item-url-change"]').val();
            $(item).data('url',newurl);
            $(item).html(newtext+' '+edit);

        });
    });
</script>
</body>
</html>