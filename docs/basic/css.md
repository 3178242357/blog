---
title: css
titleTemplate: basic
# head:
#   - - link
#     - rel: icon
#       type: image/svg+xml
#       href: /logo.svg
---

## CSS 基础

### CSS 选择器

CSS 选择器是用来选择 HTML 元素的。CSS 选择器有以下几种：

- 标签选择器：例如：`div` 或 `p`。
- 类选择器：匹配具有指定类名的元素。例如：`.my-class`
- ID 选择器：匹配具有唯一 ID 的元素。例如：`#unique-id`
- 属性选择器：匹配具有指定属性或属性值的元素。例如：[title]、`[type="text"]`、`[href^="http"]`、`[title~="hello"]`、`[lang|=en]`
- 伪类选择器：匹配处于特定状态的元素。例如：`:hover`、`:first-child`、`:nth-child(2)`
- 伪元素选择器：允许对元素的特定部分应用样式。 例如：`::before`、`::after`
- 通用选择器：匹配任何元素。 例如：`*`
- 子代选择器：匹配特定父元素的直接子元素。 例如：`ul > li`
- 相邻兄弟选择器：匹配紧接在另一个元素之后的元素。 例如：`h1 + p`
- 一般同胞选择器：匹配前面有另一个特定元素的元素。 例如：`h1 ~ p`
- 组合选择器：结合多个选择器来匹配元素。 例如：`div, p, ul`

**优先级规则：** CSS 选择器的优先级决定了当多个规则应用于同一元素时，哪个规则将被采用。<br>

优先级由高到低如下：

- !important 规则：具有 `!important` 规则的样式将优先级高于下述所有情况。

- 内联样式（优先级最高）：直接写在 HTML 元素的 style 属性中。示例：`<p style="color: red;">Hello World!</p>` 

- ID 选择器（优先级次之）：使用 #id 匹配具有特定 ID 的元素。示例：`#my-id`

- 类选择器、属性选择器、伪类选择器（优先级再次之）：这些选择器的优先级相同。示例：`.my-class`，`[type="text"]`，`:hover`

- 类型选择器 和 伪元素选择器（优先级较低）：这些选择器的优先级相同。示例：`p`，`::before`

- 通配符选择器（优先级最低）：匹配任何元素。示例：`*`

- 继承：如果一个样式是从父元素继承下来的，则其优先级低于上述所有情况。示例：body { color: blue; } 作用于 `<p>` 元素

**优先级计算:** 优先级也可以通过计算选择器的组成部分来确定。<br>
每个组成部分的权重如下：

- 内联样式：1000
- ID 选择器：100
- 类选择器、属性选择器、伪类选择器：10
- 类型选择器、伪元素选择器：1
- 通用选择器：0

例如：`.my-class .inner-class#unique-id` 的优先级计算为：120

> .my-class (类选择器): 10 <br>
> .inner-class (类选择器): 10 <br>
> #unique-id (ID 选择器): 100 


### CSS 背景
简写语法: `background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;`
- `background`	简写属性，作用是将背景属性设置在一个声明中。
- `background-color`	设置元素的背景颜色。
- `background-image`	把图像设置为背景。
- `background-position`	设置背景图像的起始位置。
- `background-size`	设置背景图像的尺寸。
- `background-repeat`	设置背景图像是否及如何重复。
- `background-origin`	设置背景图片的定位区域。
- `background-clip`	设置背景的绘制区域。
- `background-attachment`	背景图像是否固定或者随着页面的其余部分滚动。

### CSS 文本

- `color`	设置文本颜色
- `direction`	设置文本方向。
- `letter-spacing`	设置字符间距
- `line-height`	设置行高
- `text-align`	对齐元素中的文本
- `text-decoration`	向文本添加修饰
- `text-indent`	缩进元素中文本的首行
- `text-shadow`	设置文本阴影
- `text-transform`	控制元素中的字母
- `unicode-bidi`	设置或返回文本是否被重写 
- `vertical-align`	设置元素的垂直对齐
- `white-space`	设置元素中空白的处理方式
- `word-spacing`	设置字间距

### CSS 字体
简写语法: `font: font-style font-variant font-weight font-size/line-height font-family;`
- `font`	设置字体系列、大小和样式
- `font-style`	设置字体风格
- `font-variant`	设置小型大写字母的字体
- `font-weight`	设置字体粗细
- `font-size`	设置字体大小
- `line-height`	设置行高
- `font-family`	设置字体系列

### CSS 链接（伪类选择器）
- a:link - 正常，未访问过的链接
- a:visited - 用户已访问过的链接
- a:hover - 当用户鼠标放在链接上时
- a:active - 链接被点击的那一刻

### CSS 列表
简写语法: `list-style: list-style-type list-style-image list-style-position;`
- `list-style`	简写属性，用于把所有列表项标记属性设置在一个声明中。
- `list-style-type`	设置列表项标记的类型。
- `list-style-image`	设置列表项标记为一张图片。
- `list-style-position`	设置列表项标记的位置。

### CSS 盒模型
所有HTML元素可以看作盒子，盒模型这一术语是用来设计和布局时使用。封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。
- `box-sizing`	设置盒模型的尺寸。可选值：`border-box`、`content-box`。 默认值是 `content-box`。
  - `border-box`	使得 width 和 height 包含内边距和边框，而不是内容。
  - `content-box`	使得 width 和 height 只包含内容，不包含内边距和边框。
![盒模型](/box-model.png)
说明：
- Margin(外边距) - 清除边框外的区域，外边距是透明的。
- Border(边框) - 围绕在内边距和内容外的边框。
- Padding(内边距) - 清除内容周围的区域，内边距是透明的。
- Content(内容) - 盒子的内容，显示文本和图像。

### CSS 轮廓
简写语法: `outline: outline-width outline-style outline-color;`
- `outline`	简写属性，用于把所有轮廓属性设置在一个声明中。
- `outline-width`	设置轮廓的宽度。
- `outline-style`	设置轮廓的样式。
- `outline-color`	设置轮廓的颜色。

### CSS 边框
简写语法: `border: border-width border-style border-color;`
- `border`	简写属性，用于把所有边框属性设置在一个声明中。
- `border-width`	设置边框的宽度。
- `border-style`	设置边框的样式。
- `border-color`	设置边框的颜色。
- `border-top`	设置元素的上边框。
- `border-right`	设置元素的右边框。
- `border-bottom`	设置元素的下边框。
- `border-left`	设置元素的左边框。
- `border-top-width`	设置元素的上边框的宽度。
- `border-right-width`	设置元素的右边框的宽度。
- `border-bottom-width`	设置元素的下边框的宽度。
- `border-left-width`	设置元素的左边框的宽度。
- `border-top-style`	设置元素的上边框的样式。
- `border-right-style`	设置元素的右边框的样式。
- `border-bottom-style`	设置元素的下边框的样式。
- `border-left-style`	设置元素的左边框的样式。
- `border-top-color`	设置元素的上边框的颜色。
- `border-right-color`	设置元素的右边框的颜色。
- `border-bottom-color`	设置元素的下边框的颜色。
- `border-left-color`	设置元素的左边框的颜色。

### CSS 圆角
简写语法: `border-radius: border-top-left-radius border-top-right-radius border-bottom-right-radius border-bottom-left-radius;`
- `border-radius`	设置元素的圆角半径。
- `border-top-left-radius`	设置元素的左上角的圆角半径。
- `border-top-right-radius`	设置元素的右上角的圆角半径。
- `border-bottom-right-radius`	设置元素的右下角的圆角半径。
- `border-bottom-left-radius`	设置元素的左下角的圆角半径。

### CSS 外边距
简写语法: `margin: margin-top margin-right margin-bottom margin-left;`
- `margin`	简写属性，用于把所有外边距属性设置在一个声明中。
- `margin-top`	设置元素的上外边距。
- `margin-right`	设置元素的右外边距。
- `margin-bottom`	设置元素的下外边距。
- `margin-left`	设置元素的左外边距。


### CSS 内边距
简写语法: `padding: padding-top padding-right padding-bottom padding-left;`
- `padding`	简写属性，用于把所有内边距属性设置在一个声明中。
- `padding-top`	设置元素的上内边距。
- `padding-right`	设置元素的右内边距。
- `padding-bottom`	设置元素的下内边距。
- `padding-left`	设置元素的左内边距。

### CSS 宽度与高度
- `width`	设置元素的宽度。
- `min-width`	设置元素的最小宽度。
- `max-width`	设置元素的最大宽度。
- `height`	设置元素的高度。
- `min-height`	设置元素的最小高度。
- `max-height`	设置元素的最大高度。
- `line-height`	设置行高。

### CSS 显示、可见性、透明度和溢出
- `display`	设置元素的显示类型。
- `visibility`	设置元素的可见性。
- `opacity`	设置元素的透明度。
- `overflow`	设置元素溢出内容的处理方式。
- `overflow-x`	设置元素溢出内容的处理方式（水平方向）。
- `overflow-y`	设置元素溢出内容的处理方式（垂直方向）。


### CSS 定位
- `position`	设置元素的定位类型。
- `top`	设置元素的顶部边距。
- `right`	设置元素的右侧边距。
- `bottom`	设置元素的底部边距。
- `left`	设置元素的左侧边距。
- `clip`	设置元素的裁剪区域。
- `z-index`	设置元素的堆叠顺序。
- `cursor`  设置鼠标光标的形状。


### CSS 浮动
- `float`	设置元素的浮动类型。
- `clear`	设置元素的清除类型。


### CSS 对齐
在CSS中，有多种方法可以实现元素的对齐。以下是几种常见的对齐方式及其实现方法，这些都是面试中可能会问到的知识点：

1. 水平居中（水平对齐）
```css
/* 单行文本 */
.text-center {
  text-align: center;
}

/* 块级元素 */
.block-center {
  margin-left: auto;
  margin-right: auto;
}

/* Flex布局 */
.flex-container {
  display: flex;
  justify-content: center;
}

/* Grid布局 */
.grid-container {
  display: grid;
  justify-items: center;
}
```
2. 垂直居中（垂直对齐）
```css
/* 单行文本 */
.vertical-middle {
  line-height: 2em; /* 与容器高度相同 */
  height: 2em; /* 容器高度 */
}

/* Flex布局 */
.flex-container {
  display: flex;
  align-items: center;
}

/* Grid布局 */
.grid-container {
  display: grid;
  align-items: center;
}

/* 绝对定位 */
.abs-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

3. 水平和垂直居中
```css
/* Flex布局 */
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid布局 */
.grid-container {
  display: grid;
  place-items: center;
}
```

4. 两端对齐
```css
/* Flex布局 */
.flex-container {
  display: flex;
  justify-content: space-between;
}

/* Grid布局 */
.grid-container {
  display: grid;
  justify-items: start end;
}
```

5. 伸展对齐
```css
/* Flex布局 */
.flex-container {
  display: flex;
  align-items: stretch;
}

/* Grid布局 */
.grid-container {
  display: grid;
  align-items: stretch;
}
```

### CSS 媒体查询 `@media`
媒体查询是一种针对不同的屏幕尺寸和设备类型定义样式的技术。它允许你根据不同的设备特征来定义不同的样式，从而使你的网页在不同的设备上有不同的外观和行为。

媒体类型:
- `all`	用于所有的媒体设备。
- `screen`	用于电脑显示器。
- `aural`	用于语音和音频合成器。
- `braille`	用于盲人用点字法触觉回馈设备。
- `embossed`	用于分页的盲人用点字法打印机。
- `handheld`	用于小的手持的设备。
- `print`	用于打印机。
- `projection`	用于方案展示，比如幻灯片。
- `tty`	用于使用固定密度字母栅格的媒体，比如电传打字机和终端。
- `tv`	用于电视机类型的设备。

媒体特征:
- width：指定设备的宽度。
- height：指定设备的高度。
- device-width：指定设备的宽度（不包括方向键）。
- device-height：指定设备的高度（不包括方向键）。
- orientation：指定设备的方向。
- aspect-ratio：指定设备的纵横比。
- color：指定设备的颜色。
- color-index：指定设备的颜色索引。
- grid：指定设备是否使用网格。
- scan：指定设备的扫描方式。
- resolution：指定设备的分辨率。

以下是一些常见的媒体查询示例：

```css
@media screen and (max-width: 600px) {
  /* 针对屏幕宽度小于600px的设备 */
  body {
    font-size: 14px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  /* 针对屏幕宽度大于600px小于1024px的设备 */
  body {
    font-size: 16px;
  }
}

@media screen and (min-width: 1024px) {
  /* 针对屏幕宽度大于1024px的设备 */
  body {
    font-size: 18px;
  }
}
```

## CSS3 

### CSS3 文本效果
- `hanging-punctuation`	规定标点字符是否位于线框之外。
- `punctuation-trim`	规定是否对标点字符进行修剪。
- `text-align-last`	设置如何对齐最后一行或紧挨着强制换行符之前的行。
- `text-emphasis`	向元素的文本应用重点标记以及重点标记的前景色。
- `text-justify`	规定当 text-align 设置为 "justify" 时所使用的对齐方法。
- `text-outline`	规定文本的轮廓。
- `text-overflow`	规定当文本溢出包含元素时发生的事情。
- `text-shadow`	向文本添加阴影。
- `text-wrap`	规定文本的换行规则。
- `word-break`	规定非中日韩文本的换行规则。
- `word-wrap`	允许对长的不可分割的单词进行分割并换行到下一行。

### CSS3 边框图像和阴影
1. 边框图像简写语法：`border-image: source slice width outset repeat|initial|inherit;`
  - `border-image-source`：设置边框图像的来源。
  - `border-image-slice`：设置边框图像的切片。
  - `border-image-width`：设置边框图像的宽度。
  - `border-image-outset`：设置边框图像的外边距。
  - `border-image-repeat`：设置边框图像的重复方式。

2. 阴影简写语法：`box-shadow: h-shadow v-shadow blur spread color|inset|initial|inherit;`
  - `h-shadow`：设置水平阴影的位置。
  - `v-shadow`：设置垂直阴影的位置。
  - `blur`：设置阴影的模糊程度。
  - `spread`：设置阴影的尺寸。
  - `color`：设置阴影的颜色。
  - `inset`：设置阴影是否是内阴影。


### CSS3 渐变
1. 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
语法：`background-image: linear-gradient(direction, color-stop1, color-stop2, ...);`
  - `direction`：设置渐变的方向。
  - `color-stop`：设置渐变的颜色和位置。
::: info 示例
```css
  /* 从上到下的线性渐变： */
  #grad {
    background-image: linear-gradient(#e66465, #9198e5);
  }

  /* 从左到右的线性渐变： */
  #grad {
    background-image: linear-gradient(to right, #e66465, #9198e5);
  }

  /* 从左上到右下角的线性渐变： */
  #grad {
    background-image: linear-gradient(to bottom right, #e66465, #9198e5);
  }

  /* 指定的角度的线性渐变： */
  #grad {
    background-image: linear-gradient(-90deg, red, yellow);
  }
```
:::
2. 径向渐变（Radial Gradients）- 由它们的中心定义
语法：`background-image: radial-gradient(shape size at position, start-color, ..., last-color);`
  - `shape`：设置渐变的形状。
  - `size`：设置渐变的大小。
  - `at`：设置渐变的中心位置。
  - `start-color`：设置渐变的开始颜色。
  - `last-color`：设置渐变的结束颜色。
::: info 示例
```css
  /* 径向渐变： */
  #grad {
    background-image: radial-gradient(circle, #e66465, #9198e5);
  }

  /* 放射状径向渐变： */
  #grad {
    background-image: radial-gradient(ellipse, #e66465, #9198e5);
  }

  /* 放射状径向渐变，指定中心位置： */
  #grad {
    background-image: radial-gradient(circle at 50% 50%, #e66465, #9198e5);
  }
```
:::

[渐变工具](https://www.jyshare.com/more/gradients/#Newspaper)


### CSS3 转换
- `transform`	用于对元素进行2D或3D转换。
- `transform-origin`	设置被转换元素的位置。
- `perspective`	设置3D转换元素的透视视图。
- `perspective-origin`	设置3D转换元素的底部位置。
- `backface-visibility`	设置元素在不面对屏幕时是否可见。


### CSS3 过渡
简写语法：`transition: property duration timing-function delay;`
- `transition`	用于设置元素的过渡效果。
- `transition-property`	设置过渡作用的属性。
- `transition-duration`	设置过渡效果的时长。
- `transition-timing-function`	设置过渡效果的时间曲线。
- `transition-delay`	设置过渡效果的延迟时间。



### CSS 动画 `@keyframes`
CSS动画是指通过某种方式逐渐改变元素的属性，从而使其逼真、生动、有趣。CSS动画通过 `@keyframes` 规则来实现，它定义动画的名称、持续时间、动画效果，以及动画的各个阶段的样式。

简写语法: `animation: name duration timing-function delay iteration-count direction fill-mode play-state;`

- `@keyframes`	规定动画。	
- `animation`	所有动画属性的简写属性。	
- `animation-name`	规定 @keyframes 动画的名称。	
- `animation-duration`	规定动画完成一个周期所花费的秒或毫秒。默认是 0。	
- `animation-timing-function`	规定动画的速度曲线。默认是 "ease"。	
- `animation-delay`	规定动画何时开始。默认是 0。	
- `animation-iteration-count`	规定动画被播放的次数。默认是 1。	
- `animation-direction`	规定动画是否在下一周期逆向地播放。默认是 "normal"。	
- `animation-fill-mode`	规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。	
- `animation-play-state`	规定动画是否正在运行或暂停。默认是 "running"。

```css
/* 定义动画名称 */
@keyframes my-animation {
  /* 定义动画效果 */
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}

/* 应用动画 */
.my-element {
  animation-name: my-animation;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```







