const uid = require('node-uid');
const advanced = require('./advanced');
module.exports = (nodes, edges, graph) => class extends advanced(graph) {
    setNode(node = {}) {
        this.nodes++;
        const id = Symbol(uid());
        this[nodes].set(id, {
            index: this.nodes,
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

        this.edges++;
        const id = Symbol(uid());
        let { index: fromNodeIndex } = this[nodes].get(fromNodeId) || {};
        let { index: toNodeIndex } = this[nodes].get(toNodeId) || {};
        if (typeof fromNodeIndex === 'undefined') {
            fromNodeId = this.setNode(fromNodeId);
            ({ index: fromNodeIndex } = this[nodes].get(fromNodeId));
        }
        if (typeof toNodeIndex === 'undefined') {
            toNodeId = this.setNode(fromNodeId);
            ({ index: toNodeIndex } = this[nodes].get(toNodeId));
        }
        this[graph][fromNodeIndex * (this.nodes + 1) + toNodeIndex] = { id, edge };
        this[edges].set(id, {
            fromNode: fromNodeId,
            toNode: toNodeId,
            index: this.edges,
            edge
        });
        return id;
    }

    getGraph() {
        return this[graph];
    }

    _pow(graphToMultiply1, graphToMultiply2) {
        const _graph1 = this[graph] || graphToMultiply1;
        const _graph2 = this[graph] || graphToMultiply2;

        const result = [];
        for (let i = 0; i <= this.nodes; i++) {
            for (let j = 0; j <= this.nodes; j++) {
                let sum = 0;
                for (let k = 0; k <= this.nodes; k++) {
                    const edge1 = _graph1[i * (this.nodes + 1) + k] && _graph1[i * (this.nodes + 1) + k].edge ? 1 : 0;
                    const edge2 = _graph2[k * (this.nodes + 1) + j] && _graph2[k * (this.nodes + 1) + j].edge ? 1 : 0;
                    sum = sum + edge1 * edge2;
                }
                result[i * (this.nodes + 1) + j] = {
                    fromNode: i,
                    toNode: j,
                    index: i * (this.nodes + 1) + j,
                    edge: sum ? 1 : 0
                };
            }
        }
        return result;
    }

    _sum(graph1, graph2) {
        const _graph1 = this[graph] || graph1;
        const _graph2 = this[graph] || graph2;
        const result = [];
        for (let i = 0; i <= this.nodes; i++) {
            for (let j = 0; j <= this.nodes; j++) {
                let sum = 0;
                const edge1 = _graph1[i * (this.nodes + 1) + j] && _graph1[i * (this.nodes + 1) + j].edge ? 1 : 0;
                const edge2 = _graph2[i * (this.nodes + 1) + j] && _graph2[i * (this.nodes + 1) + j].edge ? 1 : 0;
                sum = edge1 + edge2;
                result[i * (this.nodes + 1) + j] = {
                    fromNode: i,
                    toNode: j,
                    index: i * (this.nodes + 1) + j,
                    edge: sum ? 1 : 0
                };
            }
        }
        return result;
    }

    pathWhateverDistance() {
        let path = this.getGraph();
        for (let i = 0; i < this.nodes; i++) path = this._sum(path, this._pow(path));
        return path;
    }

    path() {
        let path = this.getGraph();
        for (let i = 0; i < this.nodes; i++) {
            path = this._sum(path, this._pow(path));
        }
        return path;
    }
};
