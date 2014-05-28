var graphs = (function (d3, document) {
  graphs = {};

  var defaults = {
    scale: 'linear',
    width: 1000,
    height: 500,
  };

  function size (chart, w, h) {
    w = w || defaults.width;
    h = h || defaults.height;
    chart
      .attr("width", w)
      .attr("height", h);
  }

  function bars (chart, data, barWidth, y, h) {
    h = h || defaults.height;
    chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; }  )
    .append("rect")
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return h - y(d); })
      .attr("width", barWidth - 1)
    .append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d; });
  }

  function scale (d, h, s) {
    h = h || defaults.height;
    s = s || defaults.scale;

    return d3.scale[s]()
      .range([h, 0])
      .domain([0, d3.max(d)]);
  }

  graphs.barchart  = function (data, attrs) {
    var chart = d3.select(attrs.selector).append('svg'),
        width = attrs.width || defaults.width,
        barWidth = width/data.length,
        y = scale(data, attrs.height, attrs.scale);

    chart.attr('class', 'chart');

    size(chart, attrs.width, attrs.height);
    bars (chart, data, barWidth, y, attrs.height);

    return chart;
  };
  
  return graphs;
})(d3, document);