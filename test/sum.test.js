const assert = require('assert');

const Graph = require('../index');
const graph = new Graph();

describe('test to graph', () => {
    it('should multiply the matrices', () => {
        const node = {};
        const id1 = graph.setNode(node);
        const id2 = graph.setNode(node);
        graph.setEdge(id1, id2, {});
        const array = graph._sum();
        assert(array.length === 4);
        assert.deepEqual(array.map(({ edge }) => edge), [ 0, 1, 0, 0 ]);
    });

    it('should multiply the matrices', () => {
        const localGraph = new Graph();
        const node = {};
        const id2 = localGraph.setNode(node);
        const id1 = localGraph.setNode(node);
        localGraph.setEdge(id1, id2, {});
        localGraph.setEdge(id2, id1, {});
        const array = localGraph._sum();
        assert(array.length === 4);
        assert.deepEqual(array.map(({ edge }) => edge), [ 0, 1, 1, 0 ]);
    });
});
