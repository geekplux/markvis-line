/**
 * @fileOverview Generate line chart for markvis
 * @name index.js<src>
 * @author GeekPlux
 * @license MIT
 */
const { addStyle } = require('./utils')

/**
 * Line chart generator
 * @param {array} data
 * @param {object} d3 d3 will get in browser environment
 * @param {function} D3Node D3Node will get in node environment
 * @param {string} selector DOM selector in container
 * @param {string} container DOM contained the visualization result
 * @param {string} style Line chart style
 * @param {number} width
 * @param {number} height
 * @param {object} margin
 * @param {number} lineWidth
 * @param {string} lineColor
 * @param {boolean} isCurve Whether the line chart is curve
 * @param {boolean} export Whether to export to a PNG image
 * @returns {}
 */
function line ({
  data,
  d3,
  d3node: D3Node,
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
  margin: _margin = { top: 20, right: 20, bottom: 20, left: 30 },
  lineWidth: _lineWidth = 1.5,
  lineColor: _lineColor = 'steelblue',
  isCurve: _isCurve = true,
  export: _export = false
} = {}) {
  let _d3 // Instance of d3
  let d3n // Instance of D3Node
  let svg // SVG element held the line chart
  let _div // Temporary DOM element used to operate

  const isNodeEnv = () => D3Node // To check node environment

  if (isNodeEnv()) {
    // Node environment
    d3n = new D3Node({
      selector: _selector,
      styles: _style,
      container: _container
    })
    _d3 = d3n.d3
    svg = d3n.createSVG()
  } else {
    // Browser environment
    _div = document.createElement('div')
    _div.innerHTML = _container
    _d3 = d3
    svg = _d3.select(_div).select('#chart').append('svg')
    addStyle(_style) // Add style for line chart in browser
  }

  const width = _width - _margin.left - _margin.right
  const height = _height - _margin.top - _margin.bottom

  const gWrap = svg.attr('width', _width)
    .attr('height', _height)
    .append('g')
    .attr('transform', `translate(${_margin.left}, ${_margin.top})`)

  const g = gWrap.append('g')

  const xScale = _d3.scaleLinear()
        .rangeRound([0, width])
  const yScale = _d3.scaleLinear()
        .rangeRound([height, 0])

  const lineChart = _d3.line()
        .x(d => xScale(d.key))
        .y(d => yScale(d.value))

  if (_isCurve) lineChart.curve(_d3.curveBasis)

  xScale.domain(_d3.extent(data, d => d.key))
  yScale.domain(_d3.extent(data, d => d.value))

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(_d3.axisBottom(xScale))

  g.append('g').call(_d3.axisLeft(yScale))

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', _lineColor)
    .attr('stroke-width', _lineWidth)
    .attr('d', lineChart)

  let result
  if (isNodeEnv()) {
    if (_export) result = d3n
    else result = d3n.chartHTML()
  } else result = _div.querySelector('#container').innerHTML

  return result
}

module.exports = line
