# Canvas 

## 描述
HTML5 `<canvas>` 标签用于绘制图像（通过脚本，通常是 JavaScript）。<br>
不过，`<canvas>` 元素本身并没有绘制能力（它仅仅是图形的容器） - 您必须使用脚本来完成实际的绘图任务。<br>
getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。

## 语法

1. 创建 canvas 元素

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

2. 获取 canvas 元素的上下文

```javascript
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
```

3. 绘制图形

```javascript
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 150, 80);
```

## 示例

```html
<!DOCTYPE html>
<html>
<head>
	<title>Canvas Example</title>
	<style>
		canvas {
			border: 1px solid black;
		}
	</style>
</head>
<body>
	<canvas id="myCanvas" width="200" height="100"></canvas>
	<script>
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");

		ctx.fillStyle = "red";
		ctx.fillRect(10, 10, 150, 80);

		ctx.fillStyle = "blue";
		ctx.fillRect(30, 30, 100, 50);

		ctx.fillStyle = "green";
		ctx.fillRect(50, 50, 50, 50);
	</script>
</body>
</html>
```

## 其他属性 & 方法
- `ctx.createLinearGradient()`	创建线性渐变（用在画布内容上）。
- `ctx.createPattern()`	在指定的方向上重复指定的元素。
- `ctx.createRadialGradient()`	创建放射状/环形的渐变（用在画布内容上）。
- `ctx.addColorStop()`	规定渐变对象中的颜色和停止位置。

::: details 颜色或渐变
`ctx.fillStyle: color | gradient | pattern = "#000000";`

- color: 颜色值，例如 "red" 或 "rgba(255, 0, 0, 0.5)"。
- gradient: 一个 CanvasGradient 对象，用于创建线性或放射性渐变。
- pattern: 一个 CanvasPattern 对象，用于重复使用图像。

```javascript
// 颜色
ctx.fillStyle = "red";

// 渐变
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red"); // 起点颜色
grd.addColorStop(0.5, "yellow");
grd.addColorStop(1, "blue"); // 终点颜色
ctx.fillStyle = grd;

// 图像
var img = new Image();
img.src = "image.png";
ctx.fillStyle = ctx.createPattern(img, "repeat"); // 重复使用图像
```
:::

::: details 边框的颜色或渐变
`ctx.strokeStyle: color | gradient | pattern = "#000000";`

- color: 颜色值，例如 "red" 或 "rgba(255, 0, 0, 0.5)"。
- gradient: 一个 CanvasGradient 对象，用于创建线性或放射性渐变。
- pattern: 一个 CanvasPattern 对象，用于重复使用图像。


```javascript
// 颜色
ctx.strokeStyle = "red";

// 渐变
var grd = ctx.createLinearGradient(0, 0, 200, 0); // 线性渐变（左 -> 右）
// var grd = ctx.createLinearGradient(0, 0, 0, 200); // 线性渐变（上 -> 下）
grd.addColorStop(0, "red");
grd.addColorStop(0.5, "yellow");
grd.addColorStop(1, "blue");
ctx.strokeStyle = grd;


// 图像
var img = new Image();
img.src = "image.png";
ctx.strokeStyle = ctx.createPattern(img, "repeat");
```
:::


::: details 阴影
`ctx.shadowBlur: number = 0;`<br>
`ctx.shadowColor: color = "	#000000";` <br>
`ctx.shadowOffsetX: number = 0;`<br>
`ctx.shadowOffsetY: number = 0;`<br>

```javascript
ctx.shadowBlur = 4; // 模糊度
ctx.shadowColor = "black"; // 颜色
ctx.shadowOffsetX = 20; // X 轴偏移量
ctx.shadowOffsetY = 10; // Y 轴偏移量
```
:::

::: details 线条样式
`ctx.lineCap: "butt" | "round" | "square" = "butt";`<br>
`ctx.lineJoin: "round" | "bevel" | "miter" = "miter";`<br>
`ctx.lineWidth: number = 1;`<br>
`ctx.miterLimit: number = 10;`<br>

```javascript
ctx.lineCap = "round"; // 线端点样式
ctx.lineJoin = "round"; // 线连接样式
ctx.lineWidth = 10; // 线宽
ctx.miterLimit = 5; // 最大斜接长度
```
:::

::: details 矩形
`ctx.rect();` 方法用于创建矩形路径。
`ctx.clearRect(x, y, width, height);` 清除指定矩形区域内的像素。<br>
`ctx.fillRect(x, y, width, height);` 绘制已填充的矩形<br>
`ctx.strokeRect(x, y, width, height);` 绘制矩形的边框。<br>

```javascript
// 创建矩形路径
ctx.rect(10, 10, 150, 80);
ctx.stroke(); // 绘制边框

// 绘制已填充的矩形
ctx.fillRect(10, 10, 150, 80); // 默认填充颜色为黑色


// 绘制矩形边框
ctx.strokeRect(30, 30, 100, 50); // 默认矩形边框为黑色


// 清除矩形区域
ctx.clearRect(50, 50, 50, 50);
```
:::

::: details 路径
`ctx.fill();` 方法用于填充路径。<br>
`ctx.stroke();` 方法用于绘制路径的边框。<br>
`ctx.beginPath();` 方法用于创建路径。<br>
`ctx.closePath();` 方法用于关闭当前路径。<br>
`ctx.moveTo(x, y);` 方法用于移动到指定坐标。<br>
`ctx.lineTo(x, y);` 方法用于从当前点到指定坐标画一条直线。<br>
`ctx.clip();` 方法用于裁剪当前路径。<br>
`ctx.quadraticCurveTo(cpx, cpy, x, y);` 方法用于绘制二次贝塞尔曲线。<br>
`ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);` 方法用于绘制三次贝塞尔曲线。<br>
`ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);` 方法用于创建圆弧路径。<br>
`ctx.arcTo(x1, y1, x2, y2, radius);` 方法用于创建圆弧路径。<br>


```javascript
// 创建路径
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(150, 10);
ctx.lineTo(150, 80);
ctx.lineTo(10, 80);
ctx.closePath();


// 绘制路径
ctx.stroke(); // 绘制边框
ctx.fill(); // 填充路径


// 绘制圆弧
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2, true); // 绘制圆弧
ctx.stroke(); // 绘制边框
ctx.fill(); // 填充路径


// 绘制二次贝塞尔曲线
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.quadraticCurveTo(100, 10, 150, 80);
ctx.stroke(); // 绘制边框
ctx.fill(); // 填充路径


// 绘制三次贝塞尔曲线
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.bezierCurveTo(50, 10, 50, 50, 150, 80);
ctx.stroke(); // 绘制边框
ctx.fill(); // 填充路径
```
:::

::: details 转换
`ctx.scale(x, y);` 方法用于缩放当前坐标系。<br>
`ctx.rotate(angle);` 方法用于旋转当前坐标系。<br>
`ctx.translate(x, y);` 方法用于平移当前坐标系。<br>
`ctx.transform(a, b, c, d, e, f);` 方法用于设置当前变换矩阵。<br>
`ctx.setTransform(a, b, c, d, e, f);` 方法用于重置当前变换矩阵。<br>


```javascript 
// 缩放
ctx.scale(2, 2);

// 旋转
ctx.rotate(Math.PI / 4);

// 平移
ctx.translate(100, 100);

// 设置变换矩阵
ctx.transform(1, 0.5, -0.5, 1, 0, 0);

// 重置变换矩阵
ctx.setTransform(1, 0, 0, 1, 0, 0);
```
:::


::: details 文本
`ctx.font: string = "10px sans-serif";` 设置或返回画布上文本的字体。<br>
`ctx.textAlign: "start" | "end" | "left" | "right" | "center" = "start";` 设置或返回文本内容的对齐方式。<br>
`ctx.textBaseline: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom" = "alphabetic";` 设置或返回在绘制文本时使用的垂直对齐方式。<br>
`ctx.fillText(text, x, y, maxWidth);` 方法用于在画布上绘制填充的文本。<br>
`ctx.strokeText(text, x, y, maxWidth);` 方法用于在画布上绘制空心的文本。<br>
`ctx.measureText(text);` 方法用于返回一个 TextMetrics 对象，包含指定文本的宽度和高度。<br>

```javascript
// 设置字体
ctx.font = "30px Arial";

// 设置对齐方式
ctx.textAlign = "center";


// 绘制填充的文本
ctx.fillText("Hello World", 100, 100);

// 绘制空心的文本
ctx.strokeText("Hello World", 100, 150);

// 获取文本宽度
var text = "Hello World";
var metrics = ctx.measureText(text);
var width = metrics.width;
```
:::


::: details 图片
`ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);` 方法用于在画布上绘制图像。<br>


```javascript
// 绘制图像
var img = new Image();
img.src = "image.png";
ctx.drawImage(img, 10, 10, 150, 80, 30, 30, 100, 50);
```
::: 

::: details 其他
`ctx.save();` 方法用于保存当前的绘图上下文。<br>
`ctx.restore();` 方法用于恢复之前保存的绘图上下文。<br>

```javascript
// 保存当前的绘图上下文
ctx.save(); 

// 恢复之前保存的绘图上下文
ctx.restore();
```
:::





