const assert = require('assert');

const Graph = require('../index');
const graph = new Graph();

describe('test to graph', () => {
    it('should add the node with setNode', () => {
        const node = {};
        const id2 = graph.setNode(node);
        const id1 = graph.setNode(node);
        const id3 = graph.setNode(node);
        graph.setEdge(id1, id2, {});
        graph.setEdge(id2, id3, {});
        graph.setEdge(id3, id2, {});
        const array = graph.allPath();
        assert.equal(array.length, 9);
        assert.deepEqual(array.map(({ edge }) => edge), [ 0, 0, 1, 1, 0, 0, 1, 0, 0 ]);
    });
});
