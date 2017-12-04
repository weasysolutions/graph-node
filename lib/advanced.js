const uid = require('node-uid');

module.exports = (nodes, edges, graph) => class {
    setNode(node = {}) {
        const id = Symbol(uid());
        this[nodes].set(id, {
            index: this.nodes++,
            node
        });

        return id;
    }

    getNode(id) {
        return (this[nodes].get(id) || {}).node;
    }

    getEdge(id) {
        return this[edges].get(id);
    }

    setEdge(fromNodeId, toNodeId, edge) {
        if (!edge) {
            edge = toNodeId;
            toNodeId = {};
        }

        if (!edge) {
            edge = fromNodeId;
            fromNodeId = {};
        }

        if (!edge) throw new Error('Undefined edge is not supported');
        const id = Symbol(uid());
        let { index: fromNodeIndex } = this[nodes].get(fromNodeId) || {};
        let { index: toNodeIndex } = this[nodes].get(toNodeId) || {};

        if (!fromNodeIndex) {
            fromNodeId = this.setNode(fromNodeId);
            ({ index: fromNodeIndex } = this[nodes].get(fromNodeId));
        }
        if (!toNodeIndex) {
            toNodeId = this.setNode(fromNodeId);
            ({ index: toNodeIndex } = this[nodes].get(toNodeId));
        }

        this[graph][fromNodeIndex * this.nodes + toNodeIndex] = { id, edge };
        this[edges].set(id, {
            fromNode: fromNodeId,
            toNode: toNodeId,
            index: this.edges++,
            edge
        });
        return id;
    }

    setGraph() {
        return this[graph];
    }

    _pow(graphToMultiply) {
        const _graph = this[graph] || graphToMultiply;
        const result = [];
        for (let i = 0; i < this.nodes; i++) {
            for (let j = 0; j < this.nodes; j++) {
                let sum = 0;
                for (let k = 0; k < this.nodes; k++) {
                    const edge1 = _graph[i * this.nodes + k] && _graph[i * this.nodes + k] ? 1 : 0;
                    const edge2 = _graph[i * this.nodes + k] && _graph[i * this.nodes + k] ? 1 : 0;
                    sum = sum + edge1 * edge2;
                }
                result[i * this.nodes + j] = {
                    fromNode: i,
                    toNode: j,
                    index: i * this.nodes + j,
                    edge: sum ? 1 : 0
                };
            }
        }
        return result;
    }
};
