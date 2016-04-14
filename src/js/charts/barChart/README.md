# BarChart

## Usage
---------
* include this file in your html document by 
`<script type="text/javascript" src="path-to-barChart/barChart.js"></script>`
* instantiate the barChart 
`var chart = new BarChart(dataset, xGet, yGet)`
where dataset is collection of objects. xGet is a function which when called on each element of dataset, returns the value on x-Axis. yGet is a function which when called on each element of dataset, returns the value on y Axis
	+ **e.g.** 
	if your data is declared like this
	```
	var dataset = [
		{name: 'babu bhaiya', age: 55, salary: 1000},
		{name: 'Raju', age: 33, salary: 100},
		{name: 'Shyam', age:30, salary: 500}
	]
	```
	and you want to draw a barChart with ```name``` on xAxis and ```age``` on yAxis, </br>
	your ```xGet``` should be declared as: 
	``` 
	var xGet = function(d){return d.name} ;
	```
	</br>
	and ```yGet``` should be declared as:
	``` 
	var yGet = function(d){return d.age};
	```
* create the svg element by 
``` 
	chart.createSvg(<width>, <height>) 
```
	everything related to the barChart will be drawn inside this svg
* Populate Bars: create bars nside the svg created by one of the following methods: 
	1. define the bounding area for bars inside SVG container by setting margins of all 4 sides
	```
	chart.createBars("bar", leftMargin, righMargin, topMargin,bottomMargin);
	```
	2. set all margins to 0. (possibly) filling the whole area with bars
	```
	chart.createBars("bar", leftMargin, righMargin, topMargin,bottomMargin);
	```
	"bar" in the both the methods is name of the CSS class to be applied to the bars. Supply some junk if you don't want to apply a class to bars
* Create Axes [optional]: to use this, leave some margin while creating bars i.e. use method 1 to create bars.
	* Default location: 
		```
			chart.createXAxis();
			chart.createXAxis();
		```
		 this creates the axes starting from the bottom left corner of the first bar
	* Custom Location: 
		``` 
		chart.createXAxis(lMargin, bMargin);
		chart.createYAxis(lMargin, bMargin);
		```
		creates the axes at specific margins. Mind you that these margins are measured from bottom left corner of the surround svg </br>
And... its there.

## Customizations:
----------------
components of a BarChart can be modified in several ways. Though they need to be first created and then customized.
### Color Bars Randomly
	you can colour the bars randomly (10 prefdefined colors) by calling: 
	```
		chart.colorBarsRandom();
	```
### Change Axes Attributes
	you can retrieve the axes by calling 
	```
	chart.getXAxis();
	chart.getYAxis();
	```
	and you can change d3 axis attributes such as __orientation__ etc.

### Applying SVG attributes
Each BarChart has 4 components (each of which is a d3.js selection):
	* svg: The container for whole barchart
	* bars: collections of bars (svg rectangles)
	* xAxis: group of axis line, tickMarks, tick labels(text) and axis labels (text)
	* yAxis: 
these can be retrieved by 
```
chart.getSelection('svg');
chart.getSelection('bars');
chart.getSelection('xAxis');
chart.getSelection('yAxis');
```
you can apply any SVG attribute to these selections the d3 way</br>
e.g. 
	to apply __fill__ attribute to all the bars you can call
```
	chart.getSelection('bars').attr("fill", "blue");
```
	to apply a CSS class 'xAxisClass' (that you've already defined) to xAxis, you may call
```
	chart.getSelection('xAxis').attr("class", "xAxisClass");
```
In fact, you can do any d3 modification to these components as they are d3 selections.
