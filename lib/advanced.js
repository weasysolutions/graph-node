const dijkstra = require('dijkstra-algorithm');

module.exports = (_graph) => class {
    VertexDegree(index = 0) {
        const graph = this[_graph];
        let sum = 0;
        for (let i = 0; i < this.nodes; i++) sum = sum +
            graph[i * (this.nodes + 1) + index] +
            graph[index * (this.nodes + 1) + i];
        return sum;
    }

    VertexInDegree(index = 0) {
        const graph = this[_graph];
        let sum = 0;
        for (let i = 0; i < this.nodes; i++) sum = sum + graph[i * (this.nodes + 1) + index];
        return sum;
    }

    VertexOutDegree(index = 0) {
        const graph = this[_graph];
        let sum = 0;
        for (let i = 0; i < this.nodes; i++) sum = sum + graph[index * (this.nodes + 1) + i];
        return sum;
    }

    static GraphDistance(graph, index) {
        return dijkstra(graph, index);
    }

    static GraphDistanceMatrix(graph) {
        const nodes = Math.ceil(Math.sqrt(graph.length));
        const matrix = [];
        for(let i = 0; i < nodes; i++) matrix.push(...dijkstra(graph, i));
        return matrix;
    }
};
