# BarChart

## Usage
---------
* __Include the Library file__ in your html document by 
`<script type="text/javascript" src="path-to-barChart/barChart.js"></script>`
* __Instantiate the barChart__ by 
	```
	var chart = new BarChart(dataset, xGet, yGet)
	```
	where dataset is collection of objects. xGet is a function which when called on each element of dataset, returns the value on x-Axis. yGet is a function which when called on each element of dataset, returns the value on y Axis
	+ **e.g.** 
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
	chart.createSvg(<width>, <height>) 
	```
	everything related to the barChart will be drawn inside this svg
* __Populate Bars__: create bars nside the svg created by one of the following methods: 
	1. define the bounding area for bars inside SVG container by setting margins of all 4 sides
	```javascript
	chart.createBars("bar", leftMargin, righMargin, topMargin,bottomMargin);
	```
	2. set all margins to 0. (possibly) filling the whole area with bars
	```javascript
	chart.createBars("bar", leftMargin, righMargin, topMargin,bottomMargin);
	```
	"bar" in the both the methods is name of the CSS class to be applied to the bars. Supply some junk if you don't want to apply a class to bars
* __Create Axes__ [optional]: to use this, leave some margin while creating bars i.e. use method 1 to create bars.
	* Default location: 
		```javascript
		chart.createXAxis();
		chart.createXAxis();
		```
		 this creates the axes starting from the bottom left corner of the first bar
	* Custom Location: 
		```javascript 
		chart.createXAxis(lMargin, bMargin);
		chart.createYAxis(lMargin, bMargin);
		```
		creates the axes at specific margins. Mind you that these margins are measured from bottom left corner of the surround svg </br>
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
these can be retrieved by 
```
chart.getSelection('svg');
chart.getSelection('bars');
chart.getSelection('xAxis');
chart.getSelection('yAxis');
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
