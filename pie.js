var graphs = graphs || {};
graphs = (function (d3, graphs, document) {

  var defaults = {
    width: 300,
    height: 300,
    color: d3.scale.category20c()
  };

  function Pie ( data, attrs )  {
    //Constructor, setup defaults

    this.data = data;     // Shallow copy of data, if required, a deep copy can be made (for safe mutation of original data)
    for (var k in defaults) {
      if (attrs && attrs[k] !== undefined) {
        this[k] = attrs[k];
      } else {
        this[k] = defaults[k];
      }
    }
    this.radius = d3.min([this.width, this.height]) / 2;
  }

  Pie.prototype.addValue = function (label, value) {
    this.data.push({label: label, value: value});
  };

  Pie.prototype.renderTo = function ( selector ) {
    var that = this;
    var chart = this.chart = d3.select( selector ).append('svg')
            .data([this.data])
            .attr("width", this.width)
            .attr("height", this.height)
          .append("g")
            .attr("transform", "translate(" + this.radius + "," + this.radius + ")");


    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(this.radius);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });


    var arcs = chart.selectAll('g.slice')    //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append('g')                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr('class', 'slice');    //allow us to style things in the slices (like text)

        arcs.append('path')
                .attr('fill', function(d, i) {return that.color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr('d', arc)                                   //this creates the actual SVG path using the associated data (pie) with the arc drawing function
                .attr('class');

        arcs.append('text')                                     //add a label to each slice
                .attr('class', 'label')
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = this.radius;
                return 'translate(' + arc.centroid(d) + ')';        //this gives us a pair of coordinates like [50, 50]
            })
            .attr('text-anchor', 'middle')                          //center the text on it's origin
            .text(function(d, i) { return d.data.label; });
  };

  //export

  graphs.types.pie = Pie;

  
  return graphs;
})(d3, graphs, document);
        
