//TODO: lean up the class by pulling methods out of it
// svg translate transform doesn't work
// auto compute size of text in axes
// axes label
//on hover behaviour

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
	var margins = {}
	//svg: left, top => relative to the document
	//bars: right left, top, bottom => relative to svg
	// axes: left, bottom => relative to svg's left bottom corner

	this.getXScale = function(){return xScale;};
	this.getYScale = function(){return yScale;};
	this.getXAxis = function(){return xAxis;};
	this.getYAxis = function(){return yAxis;};

	this.getSelection = function (name){return selections[name]};

	this.createSvg = function (width, height, xStart, yStart){
		selections['svg'] = d3.select("body").append("svg")
			.remove()
			.attr("width", width)
			.attr("height", height)
		lMargin = (xStart)? xStart: 0;
		tMargin = (yStart)? yStart: 0;
		margins['svg'] = {'left': lMargin, 'top':tMargin};	
		selections['svg'].attr("transform", "translate("+lMargin+","+tMargin+")");
	} 

	function getXScale( spacingFraction, maxWidth){
		return  d3.scale.ordinal()
				.domain(dataset.map(keyGet))
				.rangeRoundBands([0,maxWidth], spacingFraction);
	}
	function getYScale( maxHeight){
		var maxY = d3.max(dataset, function(d){return valGet(d);});
		return d3.scale.linear()
				.domain([0,maxY])
				.range([maxHeight,0]);
	}
	
	this.createBars = function (barSpacing, left,right,top,bottom){
		
		var lMargin = (left || 0) ;
		var rMargin = (right || 0);
		var tMargin = (top || 0);
		var bMargin = (bottom || 0);
		var spacing = (barSpacing || 0.1);
		margins['bars'] = {
			'left':lMargin,
			'right':rMargin,
			'top':tMargin,
			'bottom':bMargin
		}
		var maxHeight = parseInt(selections['svg'].style("height").replace("px", "")) - tMargin -bMargin;
		var maxWidth = parseInt(selections['svg'].style("width").replace("px", "")) - lMargin - rMargin;

		xScale = getXScale(spacing, maxWidth);
		yScale = getYScale(maxHeight);

		
		selections['bars'] = selections['svg']
				.selectAll("rect")
				.data(dataset)
				.enter().append("rect");
		selections['bars']
			.attr("x", function(d){return margins['svg']['left']+lMargin+ xScale(keyGet(d));})
			.attr("y", function(d){return margins['svg']['top']+tMargin + yScale(valGet(d));})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d){return maxHeight- yScale(valGet(d));});
	}
	this.colorBarsRandom = function(){
		var color = d3.scale.category10()
			.domain(dataset, function(d){return keyGet(d);});
		selections['bars'].attr("fill",  function(d){return color(keyGet(d));});
	}
	this.createXAxis = function (left, bottom){ // default: left= margins['bars']['left'], bottom
		var svgHeight = parseInt(selections['svg'].style("height").replace("px", ""));
		var lMargin = left ? left:margins['bars']['left'];
		var bMargin = bottom? bottom: margins['bars']['bottom'];
		margins['xAxis']={
			'left': lMargin,
			'bottom':bMargin
		}

		xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		
		selections['xAxis'] =selections['svg'].append("g").remove()
		.attr("transform","translate("+(margins['svg']['left']+lMargin)+","+
			(margins['svg']['top']+svgHeight-bMargin)+")"); 
	}
	this.createYAxis = function (left, bottom){
		var lMargin = left ? left:margins['bars']['left'];
		var bMargin = bottom? bottom: margins['bars']['bottom'];
		var svgHeight = parseInt(selections['svg'].style("height").replace("px", ""));
		margins['yAxis']={
			'left': lMargin,
			'bottom':bMargin
		}

		yAxis =  d3.svg.axis()
		.scale(yScale)
		.orient("left");
		
		selections['yAxis'] = selections['svg'].append("g").remove()
		.attr("transform","translate("+(margins['svg']['left']+lMargin)+","+
			(margins['bars']['top']- (bMargin- margins['bars']['bottom']))+")");
	
	}	
	this.draw= function(elementId){
		var root ;
		if(elementId)
			root = document.getElementById(elementId);
		else
			root = document.body;
		root.appendChild(selections['svg'].node());
		document.querySelector('svg').appendChild(selections['xAxis'].call(xAxis).node());
		document.querySelector('svg').appendChild(selections['yAxis'].call(yAxis).node());
	}

}