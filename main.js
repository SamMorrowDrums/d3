var data = [{value: 20, label: 'Pump 1'}, {value: 10, label: 'Pump 2'},{value: 25, label: 'Pump 3'},{value: 30, label: 'Pump 4'}];
var bar = graphs.create('bar', data);
bar.setColours(['steelblue']);

bar.addValue('Pump 5', 18);
bar.renderTo('.graph');

//Pie

var pie = graphs.create('pie', data, {width: 600, height: 600});
pie.setColours(['aqua', 'chartreuse', 'gold', 'orange', 'green', 'blue', 'yellow']);
pie.addValue('Pump 6', 27);

pie.renderTo('.pie');

// Line

var lineData = [{label: 'Pump 1', values: [125, 124, 126, 122, 126]}, {label: 'Pump 2', values: [124, 124, 123, 122, 121]}];
var period = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
var line = graphs.create('line', lineData, {period: period, colour: d3.scale.category20c()});
line.addValues('Pump 3', [124, 125, 124, 123, 125]);
line.addValues('Pump 4', [125, 126, 124, 125, 123]);
line.addValues('Pump 5', [123, 123, 122, 123, 124]);
line.addValues('Pump 6', [126, 125, 125, 126, 127]);

line.renderTo('.line');