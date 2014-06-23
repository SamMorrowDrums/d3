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

// Bar

var data = [{value: 20, label: 'Pump 1'}, {value: 10, label: 'Pump 2'},{value: 25, label: 'Pump 3'},{value: 30, label: 'Pump 4'}];
var bar = graphs.create('bar', data);

bar.addValue('Pump 5', 18);

bar.renderTo('.graph');

//Pie

var pie = graphs.create('pie', data, {width: 600, height: 600});

pie.addValue('Pump 6', 27);

pie.renderTo('.pie');

// Line

var lineData = [{label: 'Pump 1', values: [125, 124, 126, 122, 126]}, {label: 'Pump 2', values: [124, 124, 123, 122, 121]}];
var period = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
var line = graphs.create('line', lineData, {period: period});
line.addValues('Pump 3', [124, 125, 124, 123, 125]);
line.addValues('Pump 4', [125, 126, 124, 125, 123]);
line.addValues('Pump 5', [123, 123, 122, 123, 124]);
line.addValues('Pump 6', [126, 125, 125, 126, 127]);

line.renderTo('.line');