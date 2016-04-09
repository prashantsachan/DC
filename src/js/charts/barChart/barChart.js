var BarChart  = function(dataSet, keyGetter, valGetter){
	this.dataset = dataSet ; // elements of format: key:<name>, value:<val>
	var keyGet = keyGetter ;
	var valGet = valGetter;
	this.barClass;
	

	this.setBarClass = function(barCssClass){
		this.barClass = barCssClass;
	}
	this.draw = function (xStart,yStart,width, height){
		this.drawBars(xStart,yStart,width, height);
	}

	this.drawBars = function (xStart,yStart,width, height){
		var x  = d3.scale.ordinal()
				.domain(this.dataset.map(keyGet))
				.rangeRoundBands([0,width], 0.1);
		var maxY = d3.max(this.dataset, function(d){return valGet(d);});
		var y = d3.scale.linear()
				.domain([0,maxY])
				.range([height,0]);
		var svg = d3.select("body").append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("transform","translate("+xStart+","+yStart+")");
		svg.selectAll(this.barClass)
		.data(this.dataset)
		.enter().append("rect")
		.attr("class", this.barClass)
		.attr("x", function(d){return x(keyGet(d));})
		.attr("y", function(d){return y(valGet(d));})
		.attr("width", x.rangeBand())
		.attr("height", function(d){return height-y(valGet(d));});
	}
}
