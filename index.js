function addStyle (css) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

function line({
  data,
  d3,
  d3node,
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Line Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  width: _width = 960,
  height: _height = 500,
  margin: _margin = { top: 20, right: 20, bottom: 60, left: 30 },
  lineWidth: _lineWidth = 1.5,
  lineColor: _lineColor = 'steelblue',
  isCurve: _isCurve = true,
  tickSize: _tickSize = 5,
  tickPadding: _tickPadding = 5,
  export: _export = false,
} = {}) {
  let _d3;
  let d3n;
  let svg;
  let _div;

  if (d3node) {
    d3n = new d3node({
      selector: _selector,
      styles: _style,
      container: _container
    });
    _d3 = d3n.d3;
    svg = d3n.createSVG();
  } else {
    _div = document.createElement('div');
    _div.innerHTML = _container;
    _d3 = d3;
    svg = _d3.select(_div).select('#chart').append('svg');
    addStyle(_style);
  }

  const width = _width - _margin.left - _margin.right;
  const height = _height - _margin.top - _margin.bottom;

  svg.attr('width', _width)
    .attr('height', _height)
    .append('g')
    .attr('transform', `translate(${_margin.left}, ${_margin.top})`);

  const g = svg.append('g');

  const xScale = _d3.scaleLinear()
        .rangeRound([0, width]);
  const yScale = _d3.scaleLinear()
        .rangeRound([height, 0]);
  const xAxis = _d3.axisBottom(xScale)
        .tickSize(_tickSize)
        .tickPadding(_tickPadding);
  const yAxis = _d3.axisLeft(yScale)
        .tickSize(_tickSize)
        .tickPadding(_tickPadding);

  const lineChart = _d3.line()
        .x(d => xScale(d.key))
        .y(d => yScale(d.value));

  if (_isCurve) lineChart.curve(_d3.curveBasis);

  xScale.domain(_d3.extent(data, d => d.key));
  yScale.domain(_d3.extent(data, d => d.value));

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  g.append('g').call(yAxis);

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', _lineColor)
    .attr('stroke-width', _lineWidth)
    .attr('d', lineChart);

  let result;
  if (d3node) {
    if (_export) result = d3n;
    else result = d3n.chartHTML();
  } else result = _div.querySelector('#container').innerHTML;

  return result;
}

module.exports = line;
