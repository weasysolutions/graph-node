const assert = require('assert');

const Graph = require('../index');

describe('test to graph', () => {
    it('should add the node with GraphDistance', () => {
        const array = Graph.GraphDistance([ 1, 2, 3, 4 ], 1);
        assert.deepEqual(array, [ 2, 0 ]);
    });
    it('should add the node with GraphDistance', () => {
        const array = Graph.GraphDistanceMatrix([ 1, 2, 3, 4 ], 1);
        assert.deepEqual(array, [ 0, 2, 2, 0 ]);
    });
});
