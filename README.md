# M-CAN
这是一个canvas的功能库，预计将会实现功能有基本的运动，碰撞检测<br/>
#目前实现
对于canvas的链式生成，同时添加id属性，便于后期图层的对象化<br/>
# 例子:
```javascript
var canvas = document.getElementById('canvas');
Mcan(canvas).addId('arc').strokeRect(10,0,200,200);
```
对canvas进行快速重绘
------- 
# 例子
```javascript
Mcan(canvas).rest();
```
绑定canvas上下文绘制的api
------- 
# ALL
```javascript
['arc', 'arcTo', 'beginPath', 'bezierCurveTo', 'clearRect', 'clip',
    'closePath', 'drawImage', 'fill', 'fillRect', 'fillText', 'lineTo', 'moveTo',
    'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save', 'scale', 'setTransform',
    'stroke', 'strokeRect', 'strokeText', 'transform', 'translate'];
['createPattern', 'drawFocusRing', 'isPointInPath', 'measureText',
    'createImageData', 'createLinearGradient',
    'createRadialGradient', 'getImageData', 'putImageData'
  ];
[ 'fillStyle', 'font', 'globalAlpha', 'globalCompositeOperation',
    'lineCap', 'lineJoin', 'lineWidth', 'miterLimit', 'shadowOffsetX', 'shadowOffsetY',
    'shadowBlur', 'shadowColor', 'strokeStyle', 'textAlign', 'textBaseline'];
```
# 目前进度，图层事件机制
