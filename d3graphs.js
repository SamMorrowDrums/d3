var graphs = (function (d3, document) {
  var graphs = {};

  var defaults = {
    margin: {top: 20, right: 20, bottom: 30, left: 40},
    width: 900,
    height: 500,
    ticks: 10,
    yLab: "Y Axis",
    x: function ( width ) {
      width = width || this.width;
      return d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1);
    },
    y: function ( height ) {
      height = height || this.height;
      return d3.scale.linear()
        .range([height, 0]);
    },
    dataX: function(d) { return d.label; },
    dataY: function(d) { return d.value; }
  };

  function Barchart ( data, attrs )  {
    //Constructor, setup defaults

    this.data = data;     // Shallow copy of data, if required, a deep copy can be made (for safe mutation of original data)

    for (var k in defaults) {
      if (attrs && attrs[k] !== undefined) {
        this[k] = attrs[k];
      } else {
        this[k] = defaults[k];
      }
    }
  }

  Barchart.prototype.addValue = function (label, value) {
    this.data.push({label: label, value: value});
  };

  Barchart.prototype.setMargin = function ( margin ) {
    // Optionally pass new margin, calculates graph size
    if (margin) {
      this.margin = {
        top: margin.top || 0,
        right: margin.right || 0,
        bottom: margin.bottom || 0,
        left: margin.left || 0,
      };
    }

    // Return calulated dimensions

    return {
      width: this.width - this.margin.left - this.margin.right,
      height: this.height - this.margin.top - this.margin.bottom
    };
  };

  Barchart.prototype.setAxis = function (x, y) {
    // Set axis functions based on scale functions
    x = x || this.x();
    y = y || this.y();
    var ticks = this.ticks;
    return {
      xAxis: d3.svg.axis()
      .scale(x)
      .orient("bottom"),

      yAxis: d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(this.ticks)
    };
  };

  Barchart.prototype.renderTo = function ( selector ) {
      var calc = this.setMargin,
          that = this,
          x = this.x(),
          y = this.y();

      var chart = this.chart = d3.select( selector ).append('svg')
            .attr("width", calc.width)
            .attr("height", calc.height)
          .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

     x.domain(that.data.map(this.dataX));
     y.domain([0, d3.max(this.data, this.dataY)]);

     var axis = this.setAxis(x, y);
     var yLab = this.yLab;

     chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(axis.xAxis);
      chart.append("g")
        .attr("class", "y axis")
        .call(axis.yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6  )
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yLab);

      var height = this.height;
      chart.selectAll(".bar")
          .data(this.data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("width", 0)
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("x", function(d) { return x(d.label); })
          .transition()
          .delay(function (d, i) {
              return 250 + 50 * i;
          })
          .duration(500)
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); });
  };

  // Registry of names to call them

  var types = {
    bar: Barchart,
    stacked: ''
  };

  // Exports

  graphs.create = function ( type, data, attrs ) {
    data = data || [];
    return new types[type](data, attrs);
  };
  
  return graphs;
})(d3, document);