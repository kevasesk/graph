var Num=0;
var activeNode=null;
var Graph={

	objects:[],
	field:document.getElementById('canvas'),
	action:'',


	activateButton:function(button_id,action){


		if($(button_id).hasClass('active'))
		{
			$(button_id).removeClass('active');
			Graph.action='none';
		}
		else
		{
			$('.controlls > button').removeClass('active');
			$(button_id).addClass('active');
			Graph.action=action;
		}
		console.log("action:"+Graph.action);


	},
	getDrawingObject:function(){
		//var canvas = document.getElementById('canvas');
		if (Graph.field.getContext) {
			return Graph.field.getContext('2d');
		}
	},


	drawLine:function(x1,y1,x2,y2){
		var ctx=Graph.getDrawingObject();

		ctx.beginPath();
		ctx.fillStyle ="#000";
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();

	},
	drawCircle:function(x,y,radius,color='orange'){
		var ctx=Graph.getDrawingObject();

		ctx.beginPath();
		ctx.fillStyle = color;
		(color=='white') ?
			ctx.arc(x,y,radius+2,0,Math.PI*2,true) :
			ctx.arc(x,y,radius,0,Math.PI*2,true);
		ctx.fill();
	},
	drawText:function(x,y,text){
		var ctx=Graph.getDrawingObject();

		ctx.fillStyle = "#6869FF";
		ctx.strokeStyle = "#6869FF";
		ctx.font = "italic 20px Arial";
		ctx.fillText(text, x, y);
		//ctx.font = 'bold 30px sans-serif';
		//ctx.strokeText("Stroke text", 20, 100);
	},

	reDrawAll:function(){
		for(i=0;i<Graph.objects.length;i++){
			Graph.reDrawNode(Graph.objects[i].x,
							 Graph.objects[i].y,
							 Graph.objects[i].number);

		}

	},
	reDrawNode:function(x,y,number){
		Graph.drawCircle(x,y,15);
		(number.length>1 || number>=10) ? Graph.drawText(x-15/2-5,y+15/2,number) : Graph.drawText(x-15/2,y+15/2,number);
	},

	clearAll:function(){
		ctx=Graph.getDrawingObject();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Num=0;
		Graph.objects=[];
		Graph.action='none';
		$('.controlls > button').removeClass('active');
	},
	clearNode:function(x,y){
		var ctx=Graph.getDrawingObject();

		/* draw circle with radius 15 */
		Graph.drawCircle(x,y,15,'white');
	},

	drawNode:function(x,y){
		//var ctx=Graph.getDrawingObject();

		/* draw circle with radius 15 */
		Graph.drawCircle(x,y,15);
		/* add to array */

		Graph.objects.push({
			number:Num,
			x:x,
			y:y,
			type:'node'
		});
		/* draw text in circle 1 or more symbol so draw a bit lefter */
		(Graph.objects[Graph.objects.length-1].number.length>=10) ?
			Graph.drawText(x-15/2-5,y+15/2,Graph.objects[Graph.objects.length-1].number) :
			Graph.drawText(x-15/2,y+15/2,Graph.objects[Graph.objects.length-1].number);
		Num++;


	},

	getNode:function(x,y){


		for(i=0;i<Graph.objects.length;i++)
		{
			if(	Graph.objects[i].x-15<=x &&
				Graph.objects[i].x+15>=x &&
				Graph.objects[i].y-15<=y &&
				Graph.objects[i].y+15>=y   )
			{
				return Graph.objects[i].number;
			}

		}
		return -1;
	},
	findNodeByNumber:function(number) {
		for(i=0;i<Graph.objects.length;i++)
		{
			if(Graph.objects[i].number==number) {
				return i;
			}
		}

	},


	deleteNode:function(idNode){

		var index=Graph.findNodeByNumber(idNode);

		Graph.clearNode(Graph.objects[index].x,Graph.objects[index].y);
		Graph.objects.splice(index,1);

	},
	moveNode:function(idNode,toX,toY){


		var index=Graph.findNodeByNumber(idNode);
		Graph.clearNode(Graph.objects[index].x,Graph.objects[index].y);

		Graph.objects[index].x=toX;
		Graph.objects[index].y=toY;

		Graph.reDrawAll();


	},

/* --------------------  */
	showSelf:function(){

		var newWin = window.open("about:blank", "hello", "width=200,height=200");

		newWin.document.write("<style>th, td, table {border:1px black solid;}</style>");
		newWin.document.write("<table>");

		var tableSize=Graph.objects.length;

		// for(i=0;i<tableSize;i++)
		// {
		// 	for(j=0;j<tableSize;j++)
		// 	{
        //
		// 	}
		// }

			newWin.document.write("<tr><th>№</th>");
			for(i=0;i<Graph.objects.length;i++){
				newWin.document.write("<th>"+Graph.objects[i].number+"</th>");
			}
			newWin.document.write("</tr>");
			for(i=0;i<Graph.objects.length;i++){
				newWin.document.write("<tr>");
					newWin.document.write("<td>"+Graph.objects[i].number+"</td>");
				newWin.document.write("</tr>");
			}



		newWin.document.write("</table>");



	},


};


Graph.field.onclick=function(e){

	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;


};
Graph.field.onmousedown=function(e){

	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;

	if(Graph.action=='create')
	{
		Graph.drawNode(x,y);

	}
	if(Graph.action=='move')
	{
		if(Graph.getNode(x,y)!=-1)
		{
			console.log('is node '+Graph.getNode(x,y));
			activeNode=Graph.getNode(x,y);

		}
		else
		{
			console.log('NOTnode');
		}
	}
	if(Graph.action=='delete') {

		if(Graph.getNode(x,y)!=-1) {
				Graph.deleteNode(Graph.getNode(x,y));
		}

	}

};
Graph.field.onmouseup=function(e){

	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;

	activeNode=null;
	//console.log('up '+x+' '+y);
};
Graph.field.onmousemove=function(e){

	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;
	//console.log(Graph.action+" "+activeNode);

	if(Graph.action=='move' && activeNode!=null)
	{
		//Graph.clearAll();
		//Graph.drawNode(x,y);

		//console.log('moved!');
		Graph.moveNode(activeNode,x,y);

	}
};



$('#create_node').click(function(){
	Graph.activateButton(this,'create');
});
$('#move_node').click(function(){
	Graph.activateButton(this,'move');
});
$('#clear').click(function(){Graph.clearAll();});
$('#del_node').click(function(){
	Graph.activateButton(this,'delete');
});
$('#show').click(function(){
	Graph.showSelf();
});
$('#create_line').click(function(){
	$('.popup-background').show();
	$('.popup-form').show();

});
/*============================popup=====================================*/
$('.popup-background').hide();
$('.popup-form').hide();


$('#popup-cancel').click(function(){

	$('.popup-background').hide();
	$('.popup-form').hide();

});
$('#popup-ok').click(function(){

	var from=$('#popup-from').val();
	var to=$('#popup-to').val();
	var weight=$('#popup-weight').val();
	var vektor=$('#popup-vektor').is(':checked');//true fasle



	var indexFrom=Graph.findNodeByNumber(from);
	var indexTo=Graph.findNodeByNumber(to);
	console.log(Graph.objects);
	Graph.drawLine( Graph.objects[indexFrom].x,
					Graph.objects[indexFrom].y,
					Graph.objects[indexTo].x,
					Graph.objects[indexTo].y   );




	//$('.popup-background').hide();
	//$('.popup-form').hide();
});























/*var canvas = document.getElementById('canvas');
// var img=document.getElementsByClassName('image_parts')[0];

if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	//кружочек вершины
	ctx.beginPath();
	ctx.arc(x,y,15,0,2*Math.PI);
	ctx.fillStyle = "#A63CD4";
	ctx.fill();

	//контур вершины
	ctx.beginPath();
	ctx.arc(x,y,15,0,2*Math.PI);
	ctx.stroke();

	//текст внутри вершины
	ctx.font="20px Georgia";
	ctx.fillStyle = "black";
	ctx.fillText(index,x-5,y+5);


	console.log("arc");

}
	*/