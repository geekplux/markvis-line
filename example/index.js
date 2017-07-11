/**
 * @fileOverview A example performed how to use markvis-line
 * @name index.js<markvis-line/example>
 * @author GeekPlux
 * @license MIT
 */
const d3node = require('d3-node')
const output = require('d3node-output')
const markvisLine = require('../')

/**
 * Generate random data to a array
 * @param {number} n array length
 */
const gen = n => {
  const data = []

  for (let i = 0; i < n; ++i) {
    data.push({
      key: i,
      value: Math.max(10, Math.floor(Math.random() * 100))
    })
  }

  return data
}

// Create output files
output('./example/output', markvisLine({ data: gen(20), d3node, export: true }))
