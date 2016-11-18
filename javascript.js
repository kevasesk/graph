var Num=0;
var activeNode=null;
var Graph={

	nodes:[],
	lines:[],
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

	clearAll:function(){
		ctx=Graph.getDrawingObject();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Num=0;
		Graph.nodes=[];
		Graph.lines=[];
		Graph.action='none';
		$('.controlls > button').removeClass('active');
	},
    createNode:function(x,y){
		//var ctx=Graph.getDrawingObject();

		/* draw circle with radius 15 */
        Draw.circle(x,y,15);
		/* add to array */

		Graph.nodes.push({
			number:Num,
			x:x,
			y:y
		});
		/* draw text in circle 1 or more symbol so draw a bit lefter */
		(Graph.nodes[Graph.nodes.length-1].number.length>=10) ?
            Draw.text(x-15/2-5,y+15/2,Graph.nodes[Graph.nodes.length-1].number) :
            Draw.text(x-15/2,y+15/2,Graph.nodes[Graph.nodes.length-1].number);
		Num++;


	},

	/*-------------Filter Node methods------------------------*/
	getNode:function(x,y){


		for(i=0; i<Graph.nodes.length; i++)
		{
			if(	Graph.nodes[i].x-15<=x &&
				Graph.nodes[i].x+15>=x &&
				Graph.nodes[i].y-15<=y &&
				Graph.nodes[i].y+15>=y   )
			{
				return Graph.nodes[i].number;
			}

		}
		return -1;
	},
	findNodeByNumber:function(number) {
		for(i=0; i<Graph.nodes.length; i++)
		{
			if(Graph.nodes[i].number==number) {
				return i;
			}
		}

	},


	deleteNode:function(idNode){

		var index=Graph.findNodeByNumber(idNode);

        Draw.clearNode(Graph.nodes[index].x,Graph.nodes[index].y);
		Graph.nodes.splice(index,1);

	},
	moveNode:function(idNode,toX,toY){


		var index=Graph.findNodeByNumber(idNode);
        Draw.clearNode(Graph.nodes[index].x,Graph.nodes[index].y);

		Graph.nodes[index].x=toX;
		Graph.nodes[index].y=toY;

        Draw.reDrawAll();


	},

/* -----------------GUI methods----------  */
	showSelf:function(){

		var newWin = window.open("about:blank", "hello", "width=200,height=200");

		newWin.document.write("<style>th, td, table {border:1px black solid;}</style>");
		newWin.document.write("<table>");

		var tableSize=Graph.nodes.length;

		// for(i=0;i<tableSize;i++)
		// {
		// 	for(j=0;j<tableSize;j++)
		// 	{
        //
		// 	}
		// }

			newWin.document.write("<tr><th>№</th>");
			for(i=0; i<Graph.nodes.length; i++){
				newWin.document.write("<th>"+Graph.nodes[i].number+"</th>");
			}
			newWin.document.write("</tr>");
			for(i=0; i<Graph.nodes.length; i++){
				newWin.document.write("<tr>");
					newWin.document.write("<td>"+Graph.nodes[i].number+"</td>");
				newWin.document.write("</tr>");
			}



		newWin.document.write("</table>");



	},


};
/*============================Lines Object=====================================*/
var FormLines={

	update:function(){
		//$('#popup-from > option, #popup-to > option').remove();
		$('#popup-from, #popup-to').find('option').remove();
		//$(to).find('option').remove();

		for(i=0; i<Graph.nodes.length; i++){

				$('#popup-from, #popup-to').append("<option>"+Graph.nodes[i].number+"</option>");

		}

	},
	isLineInObjects:function(from,to){

		for(i=0; i<Graph.lines.length; i++){
			if(Graph.lines[i].from==from && Graph.lines[i].to==to)
			{
				return i;
			}
		}
		return false;
	},
};


var Draw={
    field:document.getElementById('canvas'),
    getDrawingObject:function(){
        //var canvas = document.getElementById('canvas');
        if (Draw.field.getContext) {
            return Draw.field.getContext('2d');
        }
    },
    /*------ figures-----*/
    line:function(x1,y1,x2,y2,weight,vector){
        var ctx=Draw.getDrawingObject();

        /* -------change start and end positions of vector RADIUS=RADIUS of node */
        var radius=15;
        var changeX=((x2-x1)/
            Math.pow(
                Math.pow(x2-x1,2)+
                Math.pow(y2-y1,2),1/2
            ))*radius;
        var changeY=((y2-y1)/
            Math.pow(
                Math.pow(x2-x1,2)+
                Math.pow(y2-y1,2),1/2
            ))*radius;

        x2=x2-changeX;
        y2=y2-changeY;

        x1=x1+changeX;
        y1=y1+changeY;

        /*------line----*/
        ctx.beginPath();
        ctx.strokeStyle ='#000';
        ctx.lineWidth = 2;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();

        /*------weight----*/
        Draw.text(Math.abs(x2+x1)/2,Math.abs(y2+y1)/2,weight);

        /*------vector----*/
        if(vector)
        {

            var angle = Math.atan2(y2-y1,x2-x1);
            ctx.beginPath();
            ctx.strokeStyle ='#000';
            ctx.lineWidth = 2;
            ctx.moveTo(x2-10*Math.cos(angle-Math.PI/6),y2-10*Math.sin(angle-Math.PI/6));
            ctx.lineTo(x2, y2);
            ctx.lineTo(x2-10*Math.cos(angle+Math.PI/6),y2-10*Math.sin(angle+Math.PI/6));
            ctx.stroke();

        }
        //Graph.reDrawAll();
    },
    circle:function(x,y,radius, color = 'orange' ){
        var ctx=Draw.getDrawingObject();

        ctx.beginPath();
        ctx.fillStyle = color;
        (color=='white') ?
            ctx.arc(x,y,radius+2,0,Math.PI*2,true) :
            ctx.arc(x,y,radius,0,Math.PI*2,true);
        ctx.fill();
    },
    text:function(x,y,text){
        var ctx=Draw.getDrawingObject();

        ctx.fillStyle = "#6869FF";
        ctx.strokeStyle = "#6869FF";
        ctx.font = "italic 20px Arial";
        ctx.fillText(text, x, y);
        //ctx.font = 'bold 30px sans-serif';
        //ctx.strokeText("Stroke text", 20, 100);
    },
    circle:function(x,y,radius, color = 'orange' ){
        var ctx=Draw.getDrawingObject();

        ctx.beginPath();
        ctx.fillStyle = color;
        (color=='white') ?
            ctx.arc(x,y,radius+2,0,Math.PI*2,true) :
            ctx.arc(x,y,radius,0,Math.PI*2,true);
        ctx.fill();
    },

    reDrawNode:function(x,y,number){
        Draw.circle(x,y,15);
        (number.length>1 || number>=10) ?
            Draw.text(x-15/2-5,y+15/2,number) :
            Draw.text(x-15/2,y+15/2,number);
    },
    reDrawLines:function(indexNode){
        /*
        for(i=0; i<Graph.lines.length; i++){

            if(Graph.lines[i].from==indexNode || Graph.nodes[i].to==indexNode)
            {

            }

        }*/
    },
    reDrawAll:function(){
        for(i=0; i<Graph.nodes.length; i++){

            Draw.reDrawNode(Graph.nodes[i].x,
                Graph.nodes[i].y,
                Graph.nodes[i].number);
            //Graph.reDrawLines(i);
        }
    },

    clearNode:function(x,y){
        var ctx=Draw.getDrawingObject();

        /* draw white circle with radius 15 */
        Draw.circle(x,y,15,'white');
    },

};

/*============================Canvas click handlers=====================================*/
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


/*============================Controlls handlers=====================================*/
$('#create_node').click(function(){      Graph.activateButton(this,'create');  });
$('#move_node').click(function(){        Graph.activateButton(this,'move');    });
$('#clear').click(function(){            Graph.clearAll();                     });
$('#del_node').click(function(){         Graph.activateButton(this,'delete');  });
$('#show').click(function(){             Graph.showSelf();                     });

$('#create_line').click(function(){
	Graph.activateButton(this,'line');
    FormLines.update();

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
	var vector=$('#popup-vector').is(':checked');

	var nodeIndexFrom=Graph.findNodeByNumber(from);
	var nodeIndexTo=Graph.findNodeByNumber(to);

	console.log("System===nodes==================================================");
	console.log(Graph.nodes);
	console.log("System===lines==================================================");
	console.log(Graph.lines);
	if(FormLines.isLineInObjects(nodeIndexFrom,nodeIndexTo)===false)
	{

		Graph.lines.push({
			from:nodeIndexFrom,
			to:nodeIndexTo,
			weight:weight,
			vector:vector,
		});
	}
	else
	{
		var indexLine=FormLines.isLineInObjects(nodeIndexFrom,nodeIndexTo);
		Graph.lines[indexLine].weight=weight;
		Graph.lines[indexLine].vector=vector;

	}
	Draw.line( Graph.nodes[nodeIndexFrom].x,
		Graph.nodes[nodeIndexFrom].y,
		Graph.nodes[nodeIndexTo].x,
		Graph.nodes[nodeIndexTo].y,
		weight,
		vector                         );






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