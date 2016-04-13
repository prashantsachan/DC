var BarChart  = function(dataSet, keyGetter, valGetter){
	var dataset = dataSet ; // elements of format: key:<name>, value:<val>
	var keyGet = keyGetter ;
	var valGet = valGetter;
	// exposed elements
	var xScale ;//= getXScale(width);
	var yScale ;//= getYScale(height);
	var xAxis;
	var yAxis;
	var selections = {};// 'svg', 'bars', 'xAxis', 'yAxis'

	this.getXScale = function(){return xScale;};
	this.getYScale = function(){return yScale;};
	this.getXAxis = function(){return xAxis;};
	this.getYAxis = function(){return yAxis;};

	this.getSelection = function (name){return selections[name]};

	this.createSvg = function (width, height, xStart, yStart){
		// var svg =  document.createElementNS(d3.ns.prefix.svg, 'svg');

		// svg.setAttribute("width", width);
		// svg.setAttribute("height", height);
		// svg.setAttribute("transform","translate("+xStart+","+yStart+")");
		// return svg;
		selections['svg'] = d3.select("body").append("svg")
			.remove()
			.attr("width", width)
			.attr("height", height)
			.attr("transform", "translate("+xStart+","+yStart+")");
		
	}// 'svg', 'bars', xAxis, 

	function getXScale( maxWidth){
		return  d3.scale.ordinal()
				.domain(dataset.map(keyGet))
				.rangeRoundBands([0,maxWidth], 0.1);
	}
	function getYScale( maxHeight){
		var maxY = d3.max(dataset, function(d){return valGet(d);});
		return d3.scale.linear()
				.domain([0,maxY])
				.range([maxHeight,0]);
	}
	
	this.createBars = function (barClass, lMargin, rMargin, tMargin,bMargin){
		var maxHeight = parseInt(selections['svg'].style("height").replace("px", "")) - tMargin -bMargin;
		var maxWidth = parseInt(selections['svg'].style("width").replace("px", "")) - lMargin - rMargin;
		xScale = getXScale(maxWidth);
		yScale = getYScale(maxHeight);
		selections['bars'] = selections['svg']
				.selectAll(barClass)
				.data(dataset)
				.enter().append("rect");
		selections['bars']
			.attr("x", function(d){return lMargin+ xScale(keyGet(d));})
			.attr("y", function(d){return tMargin + yScale(valGet(d));})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d){return maxHeight- yScale(valGet(d));});
		// bars rects;
	}
	this.colorBarsRandom = function(){
		var color = d3.scale.category10()
			.domain(dataset, function(d){return keyGet(d);});
		selections['bars'].attr("fill",  function(d){return color(keyGet(d));});
	}
	this.createXAxis = function (lMargin, tMargin){
		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		selections['xAxis'] =selections['svg'].append("g").remove()
		.attr("transform","translate("+lMargin+","+tMargin+")"); 
	}
	this.createYAxis = function (lMargin, tMargin){
		yAxis =  d3.svg.axis()
		.scale(yScale)
		.orient("right");
		selections['yAxis'] = selections['svg'].append("g").remove()
		.attr("transform","translate("+lMargin+","+tMargin+")");
	}
	this.draw= function(){
		document.body.appendChild(selections['svg'].node());
		console.log("yAxis orientation is: "+ yAxis.orient());
		document.querySelector('svg').appendChild(selections['xAxis'].call(xAxis).node());
		document.querySelector('svg').appendChild(selections['yAxis'].call(yAxis).node());
	}

}