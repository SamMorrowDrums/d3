var graphs = graphs || {};
graphs = (function (d3, graphs, document) {

  var defaults = {
    margin: {top: 10, right: 20, bottom: 10, left: 40},
    width: 900,
    height: 500,
    ticks: 10,
    color: d3.scale.category20c(),
    yLab: "Y Axis",
    x: function ( width ) {
      width = width || this.width;
      return d3.scale.ordinal()
        .rangePoints([0, width], 0.1);
    },
    y: function ( height ) {
      height = height || this.height;
      return d3.scale.linear()
        .range([height, 0]);
    },
    dataX: function(d, i) { return this.period[i]; },
    dataY: function(d) { return d.values; },
    maxY: function (d) {return d3.max(d.values);},
    minY: function (d) {return d3.min(d.values);},
    period: null,
    interpolate: null
  };

  function Line ( data, attrs )  {
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

  Line.prototype.addValues = function (label, values) {
    this.data.push({label: label, values: values});
  };

  Line.prototype.setMargin = function ( margin ) {
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

  Line.prototype.setAxis = function (x, y) {
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

  Line.prototype.renderTo = function ( selector ) {
      var calc = this.setMargin,
          that = this,
          x = this.x(),
          y = this.y();

      var chart = this.chart = d3.select( selector ).append('svg')
            .attr("width", calc.width)
            .attr("height", calc.height)
          .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

     x.domain(that.period.map(this.dataX  ));
     y.domain([d3.min(this.data, this.minY), d3.max(this.data, this.maxY)]);

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
    var line = d3.svg.line()
      .x(function(d,i) {return x(that.period[i]); })
      .y(function(d) { return y(d); });

    if (this.interpolate) {
      line = line.interpolate(this.interpolate);
    }

    
    chart.selectAll('.linePath')
        .data(this.data)
      .enter().append('path')
      .attr('d', function (d) {
          return line(d.values);
        })
        .attr('class', 'linePath')
        .attr('stroke', function(d, i) {return that.color(i); } );

  };

  //export

  graphs.types.line = Line;

  
  return graphs;
})(d3, graphs, document);