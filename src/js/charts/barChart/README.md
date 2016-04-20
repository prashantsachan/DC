# BarChart
An easy to use barchart library. Follows a quick guide to its usage and functionality offered. to try it, see [barChart Demo](../../../../../test/js/charts/barChart/barChartDemo.html)
## Usage
---------
* __Include the Library file__ in your html document by 
`<script type="text/javascript" src="path-to-barChart/barChart.js"></script>`
* __Instantiate the barChart__ by 
	```
	var chart = new BarChart(dataset, xGet, yGet)
	```
	* _dataset_: Collection of objects. 
	* _xGet_: A function which when called on each element of dataset, returns a value on x-Axis. 
	* _yGet_: A function which when called on each element of dataset, returns the value on y-Axis.
	
	__e.g.__ 
	if your data is declared like this
	```javascript
	var dataset = [
		{name: 'babu bhaiya', age: 55, salary: 1000},
		{name: 'Raju', age: 33, salary: 100},
		{name: 'Shyam', age:30, salary: 500}
	]
	```
	and you want to draw a barChart with _name_ on xAxis and _age_ on yAxis, </br>
	your _xGet_ should be declared as: 
	```javascript
	var xGet = function(d){return d.name} ;
	```
	and _yGet_ should be declared as:
	```javascript
	var yGet = function(d){return d.age};
	```
* __Create the svg element__ by 
	```javascript
	chart.createSvg(width, height);
	```
	* _width_: width of the svg container
	* _height_: height of the svg container

	everything related to the barChart will be drawn inside this container. In a sense, it is our playground.
* __Populate Bars__: create bars inside the svg created. it takes five parameters (in order): 
	
	```javascript
	chart.createBars(spacing, leftMargin, righMargin, topMargin,bottomMargin);
	```
	* _spacing_: fraction of bar width, that will be used as space between bars (range: 0.0-1.0, default =0.1)
	* _leftMargin_: margin from left wall of the container (range: 0-svgWidth, default =0)
	* _rightMargin_: right Margin from right wall of container ( range: 0-svgWidth, default=0)
	* _topMargin_: margin from top wall of the container (range: 0-svgHeight, default =0)
	* _bottomMargin_: right Margin from bottom wall of container ( range: 0-svgHeight, default=0)

	
* __Create Axes__ [optional]: to use this, leave some margin while creating bars i.e. use method 1 to create bars.
	```javascript 
	chart.createXAxis(lMargin, bMargin);
	chart.createYAxis(lMargin, bMargin);
	```
	* _lMargin_: margin measured from left wall of the svg container (range: 0-svgWidth, default =left margin for bars)
	* _bMargin_: argin measured from bottom wall of the svg container (range: 0-svgHeight, default= bottom margin for bars)

	Thus calling 
	```javascript
	chart.createXAxis();
	chart.createYAxis();
	```
	will create the axes starting from the bottom left corner of the first bar
* __Create barTips__ [optional]: you can add a circle at the top edge of each bar by calling 
	```javascript
	chart.createBarTips(diameterFraction, positionFraction);
	```
	* _diameterFraction_: diameter of the circle in a fraction of BarWidth (range: 0.0-1.0, default: 0.2)
	* _positionFraction_: position of circle's center from left edge of Bar, in fraction of barWidth (range: 0.0-1.0, default: 0.2)
	
	Thus calling
	```javascript
	chart.createBarTips();
	```
	will create barTips of diameter= 20% of bar width, at the vertical middle line of the bar.
* __Create Line__ [optional]: you can add a line chart connecting the top edges of the bars. Optionally, shading the area below it.
	* 
* __Draw it__ :
	Add it to the body of the document by calling 
	```javascript
	chart.draw();
	```
	And... its there.

## Customizations
----------------
components of a BarChart can be modified in several ways. Though they need to be first created and then customized.
#### Color Bars Randomly
you can colour the bars randomly (10 prefdefined colors) by calling: 
```javascript
chart.colorBarsRandom();
```
#### Change Axes Attributes
you can retrieve the axes by calling 
```javascript
chart.getXAxis();
chart.getYAxis();
```
You can change d3 axis attributes such as __orientation__ etc. by
```javascript
chart.getXAxis().orient("top");
```
Since these changes modify the underlying d3 elements, chart needs to be re-drawn by calling
```javascript
chart.draw();
```

#### Applying SVG attributes
Each BarChart has 4 components (each of which is a d3.js selection):
  * _svg_: The container for whole barchart
  * _bars_: collections of bars (svg rectangles)
  * _xAxis_: group of axis line, tickMarks, tick labels(text) and axis labels (text)
  * _yAxis_: 
  * _barTips_: points (svg circle) drawn on the top edge of each bar
  * _line_: line (svg path) connecting top edge of each bar
  * _area_: (svg path) connecting top edge of each bar
If you have created a component using _create..._ command, it can be retrieved by 
```
chart.getSelection('svg');
chart.getSelection('bars');
chart.getSelection('xAxis');
chart.getSelection('yAxis');
chart.getSelection('barTips');
chart.getSelection('line');
chart.getSelection('area');
```
you can apply any SVG attribute to these selections the d3 way</br>
e.g. 
	to apply _fill_ attribute to all the bars you can call
```
chart.getSelection('bars').attr("fill", "blue");
```
to apply a CSS class 'xAxisClass' (that you've already defined) to xAxis, you may call
```
chart.getSelection('xAxis').attr("class", "xAxisClass");
```
In fact, you can do any d3 modification to these components as they are d3 selections.
