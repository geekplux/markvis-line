## LineChart

LineChart generator for [markvis](https://github.com/geekplux/markvis) in browser and node.js.

## Install

```bash
npm install markvis-line --save

or use yarn

yarn add markvis-line --save
```

## Usage

```js
const markvisLine = require('markvis-line');
const line = markvisLine({ data, d3, d3node })
```

Check out the [example](./example) for usage.

##### Output the visualization result to a image

```
npm start
```

## Output Preview (png):

![chart](./example/output.png)


## API

### markvisLine({ data, d3, d3node[, selector, container, style] })

#### options

##### data

- Type: `Array`

Data from file or web processed by d3 library.

##### d3

- Type: `Object`

d3 library which used in **browser** environment.

##### d3node

- Type: `Object`

d3-node library which used in **node** environment.

##### selector

- Type: `String`
- Default: `'#chart'`

DOM selector in container.

##### container

- Type: `String`
- Default: `<div id="container"><h2>Line Chart</h2><div id="chart"></div></div>`

DOM contain the visualization result.

##### style

- Type: `String`<br>
- Default: `''`

Linechart style.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


### LICENSE

**markvis-line** © [geekplux](https://github.com/geekplux), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by geekplux with help from contributors ([list](https://github.com/geekplux/markvis/contributors)).

> [github.com/geekplux](https://github.com/geekplux) · GitHub [@geekplux](https://github.com/geekplux) · Twitter [@geekplux](https://twitter.com/geekplux)
