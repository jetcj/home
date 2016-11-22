window.onload=function(){
	var dom=document.getElementById('clock');
	var ctx=dom.getContext('2d');
	var wid=dom.width;
	var hei=dom.height;
	var r=wid/2;
	var rem=wid/200;

	function drawBackground(){
		ctx.save();
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.strokeStyle='black';
		ctx.lineWidth=10*rem;
		ctx.arc(0,0,r - ctx.lineWidth/2,0,2*Math.PI,false);
		ctx.stroke();

		var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
		ctx.fillStyle='gray';
		ctx.font=18*rem+'px Arial';
		ctx.textAlign='center';
		ctx.textBaseline='middle';
		hourNumbers.forEach(function(number,i){
			var rad=2*Math.PI/12*i;
			var x=Math.cos(rad)*(r-30*rem);
			var y=Math.sin(rad)*(r-30*rem);
			ctx.fillText(number,x,y);
		})
        for (var i = 0; i < 60; i++) {
        	var rad=2*Math.PI/60*i;
			var x=Math.cos(rad)*(r-18*rem);
			var y=Math.sin(rad)*(r-18*rem);
			ctx.beginPath();
			if (i % 5===0) {
				ctx.fillStyle='#000';
				ctx.arc(x,y,2*rem,0,2*Math.PI,false);
			} else {
				ctx.fillStyle='#ccc';
				ctx.arc(x,y,2*rem,0,2*Math.PI,false);
			}
			ctx.fill();
        }
	}
	 function drawHour(hour,minute){
			ctx.save();
        	ctx.beginPath();
        	var rad=2*Math.PI/12*hour;
        	var mrad=2*Math.PI/12/60*minute;
        	ctx.rotate(rad+mrad);
            ctx.lineWidth=6*rem;
            ctx.lineCap='round';
            ctx.moveTo(0,10*rem);
            ctx.lineTo(0,-r/2);
            ctx.stroke();
            ctx.restore();
        }
     function drawMinute(minute){
	     	ctx.save();
        	ctx.beginPath();
        	var rad=2*Math.PI/60*minute;
        	ctx.rotate(rad);
            ctx.lineWidth=3*rem;
            ctx.lineCap='round';
            ctx.moveTo(0,10);
            ctx.lineTo(0,-r+30*rem);
            ctx.stroke();
            ctx.restore();
        }
    function drawSecond(second){
	     	ctx.save();
        	ctx.beginPath();
        	ctx.fillStyle='#c14543';
        	var rad=2*Math.PI/60*second;
        	ctx.rotate(rad);
            ctx.moveTo(-2*rem,20*rem);
            ctx.lineTo(2*rem,20*rem);
            ctx.lineTo(1,-r+18*rem)
            ctx.lineTo(-1,-r+18*rem)
            ctx.fill();
            ctx.restore();
        }
    function drawDot(){
    	ctx.beginPath();
    	ctx.fillStyle='#fff';
    	ctx.arc(0,0,3,0,2*Math.PI,false);
    	ctx.fill();
    }
    function draw(){
    	ctx.clearRect(0,0,wid,hei);
    	var now=new Date();
    	var hour=now.getHours();
    	var minute=now.getMinutes();
    	var second=now.getSeconds();
	    drawBackground();
		drawHour(hour,minute);
		drawMinute(minute);
		drawSecond(second);
		drawDot();
		ctx.restore();
    }
    function showPlan(){
        var oPlan=document.getElementById('plan');
        var oLi=oPlan.getElementsByTagName('li');
        var oTxt=document.getElementById('list');
        var index=0;
        var now=new Date();
        var m=now.getMonth();
        var arr=['一','二','三','四','五','六','七','八','九','十','十一','十二']
        var str=['脚踏祥云','迅如疾风','火眼金睛','明察秋毫','长生不老','始终如一','身如玄铁','百毒不侵','七十二变','随心所欲','身经百战','不下火线']
        oLi[m].className='active';
        oTxt.innerHTML='<h4>'+arr[m]+'月'+'</h4>'+'<p>'+str[m]+'</p>';
        for (var i = 0; i < oLi.length; i++) {
          oLi[i].index=i;
          oLi[i].onmouseover=function(){
                for (var i = 0; i < oLi.length; i++) {
                    oLi[i].className='';
                }
                this.className='active';
                oTxt.innerHTML='<h4>'+arr[this.index]+'月'+'</h4>'+'<p>'+str[this.index]+'</p>';
              }
          oLi[i].onmouseout=function(){
             for (var i = 0; i < oLi.length; i++) {
                oLi[i].className=''; }
                oLi[m].className='active';
                oTxt.innerHTML='<h4>'+arr[m]+'月'+'</h4>'+'<p>'+str[m]+'</p>';
          }
        } //for结束
    } //showPlan结束
        draw();
        setInterval(draw,1000);
        showPlan();

}