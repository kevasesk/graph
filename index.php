<!DOCTYPE html>
<html>
<head>
	<title>Graph</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css">
	<meta charset="UTF-8">
</head>
<body>
<div class="popup-background">
</div>
<div class="popup-form">
	<table>
		<tr>
			<td>From:</td>
			<td><select id="popup-from">
				</select></td>
		</tr>
		<tr>
			<td>To:</td>
			<td><select id="popup-to">
				</select></td>
		</tr>
		<tr>
			<td>Weight:</td>
			<td><input type="number" id="popup-weight"/></td>
		</tr>
		<tr>
			<td>Vector:</td>
			<td><input type="checkbox" id="popup-vector" checked/></td>
		</tr>
		<tr>
			<td><input type="button" value="Ok" id="popup-ok"/></td>
			<td><input type="button" value="Cancel" id="popup-cancel"/></td>
		</tr>
	</table>

</div>


<div class="controlls container">
	<button type="button" class="btn btn-primary" id="create_node">Create Node</button>
	<button type="button" class="btn btn-primary" id="move_node"  >Move Node</button>
	<button type="button" class="btn btn-danger"  id="del_node"   >Delete Node</button>

	<button type="button" class="btn btn-primary" id="create_line">Create Line</button>
	<button type="button" class="btn btn-danger"  id="del_line"   >Delete Line</button>
	<button type="button" class="btn btn-danger"  id="clear"   >Clear All</button>

	<button type="button" class="btn btn-primary"  id="show"   >Show</button>


</div>




<div class="container">
	<canvas id="canvas" width="1000" height="500">
	</canvas>

</div>
















	<script src="https://code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
	<script src="javascript.js" type="text/javascript" ></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</body>
</html>