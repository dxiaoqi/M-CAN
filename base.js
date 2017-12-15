const GameObject=[];    //存储
const GameId=[];              //
var canBuffer;
var canvas;
var bitPol=[];
function Canvas2DContext(canvas) {
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }
  if (!(this instanceof Canvas2DContext)) {
    return new Canvas2DContext(canvas);
  }
  this.ele=canvas;
  this.init();
  this.context = this.ctx = canvas.getContext('2d');
  if (!Canvas2DContext.prototype.arc) {
    Canvas2DContext.setup.call(this, this.ctx);
  }
}
Canvas2DContext.prototype.init=function(){
	canvas=this.ele;
}
Canvas2DContext.prototype.addId = function(id) {
  this.id=id;
  GameId.push(id);
  GameObject[this.id]=[];
  return this;
};
Canvas2DContext.setup = function() {
  var methods = ['arc', 'arcTo', 'beginPath', 'bezierCurveTo', 'clearRect', 'clip',
    'closePath', 'drawImage', 'fill', 'fillRect', 'fillText', 'lineTo', 'moveTo',
    'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save', 'scale', 'setTransform',
    'stroke', 'strokeRect', 'strokeText', 'transform', 'translate'];

  var getterMethods = ['createPattern', 'drawFocusRing', 'isPointInPath', 'measureText', // drawFocusRing not currently supported
    // The following might instead be wrapped to be able to chain their child objects
    'createImageData', 'createLinearGradient',
    'createRadialGradient', 'getImageData', 'putImageData'
  ];

  var props = [ 'fillStyle', 'font', 'globalAlpha', 'globalCompositeOperation',
    'lineCap', 'lineJoin', 'lineWidth', 'miterLimit', 'shadowOffsetX', 'shadowOffsetY',
    'shadowBlur', 'shadowColor', 'strokeStyle', 'textAlign', 'textBaseline'];

  for (let m of methods) {
    let method = m;
    Canvas2DContext.prototype[method] = function() {
      this.ctx[method].apply(this.ctx, arguments);
      if(this.id!='undefined'&& arguments!='undefined'){
        GameObject[this.id].push(method);
        GameObject[this.id][method]={'type':"arg",'value':arguments};
       // GameObject[this.id][method].push({'type':"arg",'value':arguments});
      }else{}
      return this;
    };
  }

  for (let m of getterMethods) {
    let method = m;
    Canvas2DContext.prototype[method] = function() {
      if(this.id!='undefined'&&arguments!='undefined'){
        GameObject[this.id].push(method);
        GameObject[this.id][method]={'type':"arg",'value':arguments};
      }else{}
      return this.ctx[method].apply(this.ctx, arguments);
    };
  }

  for (let p of props) {
    let prop = p;
    Canvas2DContext.prototype[prop] = function(value) {
      if (value === undefined)
        return this.ctx[prop];
      this.ctx[prop] = value;
      if(this.id!='undefined'&&arguments!='undefined'){
        GameObject[this.id].push(prop);
        GameObject[this.id][prop]={'type':"value",'value':value};
      }else{}
      return this;
    };
  }
};


//画布重绘
Canvas2DContext.prototype.rest=function(){
	//画布clear
	this.ctx.clearRect(0,0,this.ele.width,this.ele.height);
	//遍历行为数据，执行链式命令
  for(let id of GameId){
    for(let fun of GameObject[id]){
      console.log(GameObject[id][fun].type);
      switch(GameObject[id][fun].type){
      	//根据类型会知道缓冲画布上
          case 'arg'://this.ctx[fun].apply(this.ctx,GameObject[id][fun].value);
          						Canvas2DContext(canBuffer).ctx[fun].apply(Canvas2DContext(canBuffer).ctx,GameObject[id][fun].value);	
          						break;
          case'value'://this.ctx[fun]=GameObject[id][fun].value;
          						Canvas2DContext(canBuffer).ctx[fun]=GameObject[id][fun].value;
          						break;
       }
    }
    getBit(Canvas2DContext(canBuffer).ctx,Canvas2DContext(canBuffer).ele,id);
    //将数据绘制到主画布
    this.ctx.drawImage(canBuffer,0,0,canBuffer.width,canBuffer.height);
    //清空缓冲画布
    Canvas2DContext(canBuffer).ctx.clearRect(0,0,canBuffer.width,canBuffer.height);
  }
}
//用于创建离屏画布,以及对与start,update等函数的回调执行
window.onload=function(){
	(function(){
	var canvas=document.getElementsByTagName('canvas')[0];
	Buffer(canvas.offsetLeft,canvas.offsetTop,canvas.width,canvas.height);
	if(typeof start =='function'){
		start();
	}
	if(typeof canvas=='object'){
		Canvas2DContext(canvas).rest();
	}
})();
}
function Buffer(x,y,w,h){
	let can=document.createElement('canvas');
	can.width=w;
	can.height=h;
	can.style.position='absolute';
	can.style.zIndex='999';
	can.style.left=w;
	can.style.top=y;
	//document.body.appendChild(can);
	canBuffer= can;
}

	//获取图片的像素，并填充到像素池中
function getBit(ctx,image,id){
	console.log(1)
	var pixelMap = [];
    for( var y = 0; y < image.width; y++ ) {
        for( var x = 0; x < image.height; x++ ) {
            // 获取当前位置的元素
            var pixel = ctx.getImageData( x, y, 1, 1 );
            // 判断透明度不为0
            if( pixel.data[3] != 0 ) {
                pixelMap.push( { x:x, y:y } );
            }
        }
    }
    bitPol[id]=pixelMap;
}
//vector
var Vector=function(x,y){
	return {x:x,y:y};
}
//用作碰撞检测
function hit(){
	for(let i in bitPol){
		for(let site in bitPol[i]){
			if(target===site){
				return true
			}
		}
	}
}
