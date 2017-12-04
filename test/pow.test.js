const assert = require('assert');

const Graph = require('../index');
const graph = new Graph();

describe('test to graph', () => {
    it('should add the node with setNode', () => {
        const node = {};
        const id2 = graph.setNode(node);
        const id1 = graph.setNode(node);
        graph.setEdge(id1, id2, {});
        const array = graph._pow();
        console.log(array);
        console.log(graph.nodes);
        assert(array.length === graph.nodes * graph.nodes);
    });
});
