var graphs = (function (d3, document) {
  graphs = {};

  function bar () {
    var b = document.createElement('g');
    var rec = document.createElement('rect');
    var txt = document.createElement('text');
    b.appendChild(rec);
    b.appendChild(txt);
    return b;
  }

  function Barchart (attrs, data) {
    if (this instanceof Barchart === false) {
      return new Barchart();
    }

    this.svg = document.createElement('svg');
    this.svg.setAttribute('class', 'chart');
  }

  Barchart.prototype.data = function (data) {

  };

  Barchart.prototype.render = function (data) {
    this.svg = this.svg.cloneNode();
    this.svg.appendChild(bar());
    return this.svg;
  };

  graphs.Barchart = Barchart;

  
  return graphs;
})(d3, document);