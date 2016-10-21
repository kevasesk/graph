var Num=0;
var Node={
	create:function(x,y) {
		if (x <= 360 && x >= 0 && y >= 0 && y <= 1135) {
			/*create img tag*/
			var img = document.createElement('img');
			/*------attributes-----*/
			img.src = "circle.png";
			img.height = 30;
			$(img).addClass('node');
			$(img).attr('id', Num);
			$(img).css('position', 'absolute');
			$(img).css({
				top: '+=' + x + 'px',
				left: '+=' + y + 'px',
			});
			/*------insert to field-----*/
			$('.container.block').append(img);
			Num++;
		}
	},
	moveTo:function(num,x,y){
		console.log(num+' '+x+' '+y);
		$('#'+num).css({
			top: x + 'px',
			left: y + 'px',
		});

	}





};
$('#create_node').click(function(){

		Node.create(0,0);

});
$('#move_node').click(function(){

	Node.moveTo(1,100,100);

});
$('body').on('click','.node',function(){
	console.log($(this));
})
















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