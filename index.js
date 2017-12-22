const graph = Symbol('graph');
const nodes = Symbol('nodes');
const edges = Symbol('edges');
const core = require('./lib/core');
const Graph = class extends core(nodes, edges, graph) {
    constructor() {
        super();
        this[graph] = [];
        this.nodes = -1;
        this.edges = -1;
        this[nodes] = new Map();
        this[edges] = new Map();
    }
};


module.exports = Graph;

