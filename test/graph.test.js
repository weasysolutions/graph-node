const assert = require('assert');

const Graph = require('../index');
const graph = new Graph();

describe('test to graph', () => {
    it('should add the node with setNode', () => {
        const node = {};
        const id = graph.setNode(node);
        assert.deepStrictEqual(node, graph.getNode(id));
    });

    it('should add the node with setNode', () => {
        const edge = {};
        const id = graph.setEdge(edge);
        const edgeSaved = graph.getEdge(id);
        assert.deepStrictEqual(edge, edgeSaved.edge);
    });

    it('should add the node with setNode', () => {
        const node1 = {};
        const node2 = {};
        const fromId = graph.setNode(node1);
        const toId = graph.setNode(node2);
        const edge = {};
        const id = graph.setEdge(fromId, toId, edge);
        const edgeSaved = graph.getEdge(id);
        assert.deepStrictEqual(edge, edgeSaved.edge);
        assert.deepStrictEqual(fromId, edgeSaved.fromNode);
        assert.deepStrictEqual(toId, edgeSaved.toNode);
        const fromNode = graph.getNode(edgeSaved.fromNode);
        const toNode = graph.getNode(edgeSaved.toNode);
        assert.deepStrictEqual(fromNode, node1);
        assert.deepStrictEqual(toNode, node2);
    });
});
