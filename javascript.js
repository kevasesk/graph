var Num=0;
var activeNode=null;

var Graph={

	nodes:[],
	//lines:[],
	action:'',

	isLineIn:function(indexToLine,indexNode){

			if(indexToLine in Graph.nodes[indexNode].lines)
			{
				return true;
			}

		return false;

	},
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

	findTo:function(indexNode,lineTo){
		for(var i=0;i<Graph.nodes[indexNode].lines;i++)
		{
			if(Graph.nodes[indexNode].lines[i].to==lineTo)
			{
				return i;
			}
		}
		return false;

	},
	resetAll:function(){
		ctx=Draw.getDrawingObject();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Num=0;
		Graph.nodes=[];
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
			y:y,
			weight:0,
			vector:true,
			lines: [
				// {
				// 	to: '',
				// 	weight: '',
				// 	vector: '',
				// }
			]
		});

		/* draw text in circle 1 or more symbol so draw a bit lefter */
		(Graph.nodes[Graph.nodes.length-1].number.length>=10) ?
            Draw.text(x-15/2-5,y+15/2,Graph.nodes[Graph.nodes.length-1].number) :
            Draw.text(x-15/2,y+15/2,Graph.nodes[Graph.nodes.length-1].number);
		Num++;


	},

	/*-------------Filter Node methods------------------------*/
	getNode:function(x,y){


		for(var i=0; i<Graph.nodes.length; i++)
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
	pointOnLine:function(pointX,pointY){

		for(var i=0;i<Graph.nodes.length;i++)
		{
			for(var j=0;j<Graph.nodes[i].lines.length;j++)
			{
				var x1=Graph.nodes[i].x;
				var y1=Graph.nodes[i].y;

				var x2=Graph.nodes[Graph.findNodeByNumber(Graph.nodes[i].lines[j].to)].x;
				var y2=Graph.nodes[Graph.findNodeByNumber(Graph.nodes[i].lines[j].to)].y;

				var p=(pointX-x2)/(x1-x2);
				var result=p*y1+(1-p)*y2-pointY;
				if(result>=-10 && result<=10)
				{
					//console.log('line: from:'+Graph.nodes[i].number+' to:'+Graph.nodes[i].lines[j].to);
					return {
							'from':Graph.nodes[i].number,
							'to':Graph.nodes[i].lines[j].to
					};
				}

			}
		}
		return false;
	},
	getLine:function(x,y)
	{
		// var ctx=Draw.getDrawingObject();
		// imgData=ctx.getImageData(x-5,y-5,1,1);
		// red=imgData.data[0];
		// green=imgData.data[1];
		// blue=imgData.data[2];
		// alpha=imgData.data[3];
		//py1+(1-p)y2=y
		//var p=(x-Graph.nodes[1].x)/(Graph.nodes[0].x-Graph.nodes[1].x);
		//var result=p*Graph.nodes[0].y+(1-p)*Graph.nodes[1].y-y;
		//var sum=red+green+blue+alpha;
		//console.log(Graph.nodes[0].x+' '+Graph.nodes[0].y+' '+Graph.nodes[1].x+' '+Graph.nodes[1].y+ ' '+x+' '+y);
		//console.log("result:"+result);
		if(Graph.pointOnLine(x,y)!==false)
		{
			console.log(Graph.pointOnLine(x,y));
			var point=Graph.pointOnLine(x,y);
			Graph.deleteLine(point.from,point.to);
			//Draw.circle(x,y,5,'red');
		}


			//


	},
	findNodeByNumber:function(index) {
		for(var i=0; i<Graph.nodes.length; i++)
		{
			if(Graph.nodes[i].number==index) {
				return i;
			}
		}
		return false;

	},
	deleteNode:function(numberNode){


        Draw.clearAll();
		Graph.nodes.splice(Graph.findNodeByNumber(numberNode),1);

		Draw.reDrawAll();


	},
	deleteLine:function(from,to){
		Draw.clearAll();
		for(var i=0;i<Graph.nodes[Graph.findNodeByNumber(from)].lines.length;i++)
		{
			if(Graph.nodes[Graph.findNodeByNumber(from)].lines[i].to==to)
			{
				Graph.nodes[Graph.findNodeByNumber(from)].lines.splice(i,1);
			}
		}


		Draw.reDrawAll();

	},
	moveNode:function(idNode,toX,toY){


		var index=Graph.findNodeByNumber(idNode);
		Draw.clearAll();

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
			for(var i=0; i<Graph.nodes.length; i++){
				newWin.document.write("<th>"+Graph.nodes[i].number+"</th>");
			}
			newWin.document.write("</tr>");
			for(var i=0; i<Graph.nodes.length; i++){
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

		for(var i=0; i<Graph.nodes.length; i++){

				$('#popup-from, #popup-to').append("<option>"+Graph.nodes[i].number+"</option>");

		}

	},
	isLineInObjects:function(from,to){
		for(var i=0; i<Graph.nodes.length; i++){

			if(Graph.nodes[i].number==from && Graph.isLineIn(to,i))
			{
				return i;
			}
		}
		return false;
	},
};
/*============================Draw Object=====================================*/
var Draw={
    field:document.getElementById('canvas'),
    getDrawingObject:function(){
        //var canvas = document.getElementById('canvas');
        if (Draw.field.getContext) {
            return Draw.field.getContext('2d');
        }
    },
    /*------ figures-----*/
    line:function(x1,y1,x2,y2,weight,vector,color='#000'){
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
        ctx.strokeStyle =color;
        ctx.lineWidth = (color=='#000') ? 4 : 6;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();

        /*------weight----*/
        Draw.text(Math.abs(x2+x1)/2,Math.abs(y2+y1)/2,weight,color);

        /*------vector----*/
        if(vector)
        {

            var angle = Math.atan2(y2-y1,x2-x1);
            ctx.beginPath();
            ctx.strokeStyle =color;
            ctx.lineWidth = (color=='#000') ? 2 : 5;
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
    text:function(x,y,text,color='#000'){
        var ctx=Draw.getDrawingObject();

        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.font =(color == '#000') ? "italic 20px Arial" : "italic 21px Arial";
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
    reDrawLinesOf:function(numberNode){

		var ctx=Draw.getDrawingObject();

		var nodeFromIndex= Graph.findNodeByNumber(numberNode);

			for(var i=0; i<Graph.nodes[nodeFromIndex].lines.length; i++){

				var nodeToIndex=Graph.findNodeByNumber(Graph.nodes[nodeFromIndex].lines[i].to);
				if(nodeToIndex!==false)
				{
					Draw.line(	Graph.nodes[nodeFromIndex].x,
						Graph.nodes[nodeFromIndex].y,
						Graph.nodes[nodeToIndex].x,
						Graph.nodes[nodeToIndex].y,
						Graph.nodes[nodeFromIndex].lines[i].weight,
						Graph.nodes[nodeFromIndex].lines[i].vector         );
				}
			}

    },
    reDrawAll:function(){
        for(var i=0; i<Graph.nodes.length; i++){

			Draw.reDrawNode(Graph.nodes[i].x,
				Graph.nodes[i].y,
				Graph.nodes[i].number);
			Draw.reDrawLinesOf(Graph.nodes[i].number);
		}


    },

	clearAll:function(){
		ctx=Draw.getDrawingObject();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},

};
/*============================Canvas click handlers=====================================*/
Draw.field.onclick=function(e){

	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;


};
Draw.field.onmousedown=function(e){

	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;

	if(Graph.action=='create')
	{
		Graph.createNode(x,y);

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
	if(Graph.action=='delete_line') {


		Graph.getLine(x,y);

	}

};
Draw.field.onmouseup=function(e){

	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;

	activeNode=null;
	//console.log('up '+x+' '+y);
};
Draw.field.onmousemove=function(e){

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
$('#create_node').click(function(){      Graph.activateButton(this,'create');     });
$('#move_node').click(function(){        Graph.activateButton(this,'move');       });
$('#clear').click(function(){            Graph.resetAll();                        });
$('#del_node').click(function(){         Graph.activateButton(this,'delete');     });
$('#del_line').click(function(){         Graph.activateButton(this,'delete_line');});
$('#show').click(function(){             Graph.showSelf();                        });
$('#System_log').click(function(){       console.log(Graph.nodes);                });

$('#create_line').click(function(){
	Graph.activateButton(this,'line');
    FormLines.update();

	$( "#dialog" ).dialog( "open" );




});
/*============================popup=====================================*/

$('.popup-background').hide();
$('.popup-form').hide();

$('#popup-ok').click(function(){


	var from=$('#popup-from').val();
	var to=$('#popup-to').val();
	var weight=$('#popup-weight').val();
	var vector=$('#popup-vector').is(':checked');

	var nodeIndexFrom=Graph.findNodeByNumber(from);
	var nodeIndexTo=Graph.findNodeByNumber(to);

	weight='['+from+','+to+']';
	if(from != to)
	{
		if(FormLines.isLineInObjects(nodeIndexFrom,nodeIndexTo)===false)
		{

			Graph.nodes[nodeIndexFrom].lines.push({
				to:to,
				weight:weight,
				vector:vector,
			});
		}
		else
		{
			var indexLine=FormLines.isLineInObjects(nodeIndexFrom,nodeIndexTo);
			var indexLineTo=Graph.findTo(nodeIndexFrom,nodeIndexTo);
			if(indexLineTo!==false)
			{
				Graph.nodes[indexLine].lines[indexLineTo].weight=weight;
				Graph.nodes[indexLine].lines[indexLineTo].vector=vector;
			}

		}

		Draw.line( Graph.nodes[nodeIndexFrom].x,
					Graph.nodes[nodeIndexFrom].y,
					Graph.nodes[nodeIndexTo].x,
					Graph.nodes[nodeIndexTo].y,
					weight,
					vector                       );
	}







	//$('.popup-background').hide();
	//$('.popup-form').hide();
});

