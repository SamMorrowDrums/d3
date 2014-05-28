var data = [20, 15, 17, 19, 4, 8, 15, 16, 23, 42];
graphs.barchart(data, {selector: '.graph'});

/*

// We want to make a stacked bar graph
var graph = d3.makeGraph('stacked');
// Set the x axis labels
graph.setPeriod(['Jan', 'Feb', 'Mar', 'Apr', 'May']);
// Add a set of values for each stacked bar (set the label and values)
graph.addValues('Pump 1', [125, 124, 126, 122, 126]);
graph.addValues('Pump 2', [124, 124, 123, 122, 121]);
graph.addValues('Pump 3', [124, 125, 124, 123, 125]);
graph.addValues('Pump 4', [125, 126, 124, 125, 123]);
graph.addValues('Pump 5', [123, 123, 122, 123, 124]);
graph.addValues('Pump 6', [126, 125, 125, 126, 127]);
// Set the colours of each of the bar types
graph.setColours(['red','green','blue','yellow','magenta','cyan']);
// Actually create the graphs
graph.renderTo(body);

*/