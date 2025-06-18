// Graphs - Connected Data Structure (Quick Overview)

// ===== GRAPH REPRESENTATIONS =====

// Adjacency List Implementation
class Graph {
    constructor(directed = false) {
        this.adjacencyList = new Map();
        this.directed = directed;
    }
    
    // Add vertex - O(1)
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }
    
    // Add edge - O(1)
    addEdge(v1, v2, weight = 1) {
        // Ensure vertices exist
        this.addVertex(v1);
        this.addVertex(v2);
        
        // Add edge
        this.adjacencyList.get(v1).push({ vertex: v2, weight });
        
        // If undirected, add reverse edge
        if (!this.directed) {
            this.adjacencyList.get(v2).push({ vertex: v1, weight });
        }
    }
    
    // Remove edge - O(V)
    removeEdge(v1, v2) {
        if (this.adjacencyList.has(v1)) {
            this.adjacencyList.set(v1, 
                this.adjacencyList.get(v1).filter(edge => edge.vertex !== v2)
            );
        }
        
        if (!this.directed && this.adjacencyList.has(v2)) {
            this.adjacencyList.set(v2, 
                this.adjacencyList.get(v2).filter(edge => edge.vertex !== v1)
            );
        }
    }
    
    // Remove vertex - O(V + E)
    removeVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) return;
        
        // Remove all edges to this vertex
        for (let v of this.adjacencyList.keys()) {
            this.removeEdge(v, vertex);
        }
        
        // Remove the vertex itself
        this.adjacencyList.delete(vertex);
    }
    
    // Get neighbors - O(1)
    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || [];
    }
    
    // Check if edge exists - O(V)
    hasEdge(v1, v2) {
        const neighbors = this.getNeighbors(v1);
        return neighbors.some(edge => edge.vertex === v2);
    }
    
    // Get all vertices - O(1)
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }
    
    // Print graph
    print() {
        for (let [vertex, edges] of this.adjacencyList) {
            const edgeStr = edges.map(edge => 
                edge.weight === 1 ? edge.vertex : `${edge.vertex}(${edge.weight})`
            ).join(', ');
            console.log(`${vertex} -> [${edgeStr}]`);
        }
    }
}

// ===== GRAPH TRAVERSAL ALGORITHMS =====

// Depth-First Search (DFS) - O(V + E)
function dfs(graph, startVertex) {
    const visited = new Set();
    const result = [];
    
    function traverse(vertex) {
        visited.add(vertex);
        result.push(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            if (!visited.has(edge.vertex)) {
                traverse(edge.vertex);
            }
        }
    }
    
    traverse(startVertex);
    return result;
}

// Breadth-First Search (BFS) - O(V + E)
function bfs(graph, startVertex) {
    const visited = new Set();
    const result = [];
    const queue = [startVertex];
    
    visited.add(startVertex);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            if (!visited.has(edge.vertex)) {
                visited.add(edge.vertex);
                queue.push(edge.vertex);
            }
        }
    }
    
    return result;
}

// ===== SHORTEST PATH ALGORITHMS =====

// Dijkstra's Algorithm (Single Source Shortest Path) - O((V + E) log V)
function dijkstra(graph, startVertex) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();
    
    // Initialize distances
    for (let vertex of graph.getVertices()) {
        distances.set(vertex, vertex === startVertex ? 0 : Infinity);
        previous.set(vertex, null);
        unvisited.add(vertex);
    }
    
    while (unvisited.size > 0) {
        // Find vertex with minimum distance
        let current = null;
        let minDistance = Infinity;
        
        for (let vertex of unvisited) {
            if (distances.get(vertex) < minDistance) {
                minDistance = distances.get(vertex);
                current = vertex;
            }
        }
        
        if (current === null || minDistance === Infinity) break;
        
        unvisited.delete(current);
        
        // Update distances to neighbors
        const neighbors = graph.getNeighbors(current);
        for (let edge of neighbors) {
            const neighbor = edge.vertex;
            const weight = edge.weight;
            
            if (unvisited.has(neighbor)) {
                const newDistance = distances.get(current) + weight;
                
                if (newDistance < distances.get(neighbor)) {
                    distances.set(neighbor, newDistance);
                    previous.set(neighbor, current);
                }
            }
        }
    }
    
    return { distances, previous };
}

// Reconstruct shortest path
function getShortestPath(previous, startVertex, endVertex) {
    const path = [];
    let current = endVertex;
    
    while (current !== null) {
        path.unshift(current);
        current = previous.get(current);
    }
    
    return path[0] === startVertex ? path : [];
}

// ===== CYCLE DETECTION =====

// Detect cycle in undirected graph - O(V + E)
function hasCycleUndirected(graph) {
    const visited = new Set();
    
    function dfsCheck(vertex, parent) {
        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            const neighbor = edge.vertex;
            
            if (!visited.has(neighbor)) {
                if (dfsCheck(neighbor, vertex)) {
                    return true;
                }
            } else if (neighbor !== parent) {
                return true; // Back edge found (cycle)
            }
        }
        
        return false;
    }
    
    for (let vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            if (dfsCheck(vertex, null)) {
                return true;
            }
        }
    }
    
    return false;
}

// Detect cycle in directed graph - O(V + E)
function hasCycleDirected(graph) {
    const visited = new Set();
    const recursionStack = new Set();
    
    function dfsCheck(vertex) {
        visited.add(vertex);
        recursionStack.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            const neighbor = edge.vertex;
            
            if (!visited.has(neighbor)) {
                if (dfsCheck(neighbor)) {
                    return true;
                }
            } else if (recursionStack.has(neighbor)) {
                return true; // Back edge in DFS tree (cycle)
            }
        }
        
        recursionStack.delete(vertex);
        return false;
    }
    
    for (let vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            if (dfsCheck(vertex)) {
                return true;
            }
        }
    }
    
    return false;
}

// ===== TOPOLOGICAL SORT =====

// Topological Sort using DFS - O(V + E)
function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    function dfsSort(vertex) {
        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            if (!visited.has(edge.vertex)) {
                dfsSort(edge.vertex);
            }
        }
        
        stack.push(vertex); // Add to stack after visiting all neighbors
    }
    
    for (let vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            dfsSort(vertex);
        }
    }
    
    return stack.reverse();
}

// ===== CONNECTED COMPONENTS =====

// Find all connected components - O(V + E)
function findConnectedComponents(graph) {
    const visited = new Set();
    const components = [];
    
    function dfsComponent(vertex, component) {
        visited.add(vertex);
        component.push(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            if (!visited.has(edge.vertex)) {
                dfsComponent(edge.vertex, component);
            }
        }
    }
    
    for (let vertex of graph.getVertices()) {
        if (!visited.has(vertex)) {
            const component = [];
            dfsComponent(vertex, component);
            components.push(component);
        }
    }
    
    return components;
}

// ===== MINIMUM SPANNING TREE =====

// Kruskal's Algorithm - O(E log E)
function kruskalMST(graph) {
    const edges = [];
    const vertices = graph.getVertices();
    
    // Get all edges
    for (let vertex of vertices) {
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            if (vertex < edge.vertex) { // Avoid duplicate edges
                edges.push({
                    from: vertex,
                    to: edge.vertex,
                    weight: edge.weight
                });
            }
        }
    }
    
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    // Union-Find for cycle detection
    const parent = new Map();
    const rank = new Map();
    
    function find(x) {
        if (parent.get(x) !== x) {
            parent.set(x, find(parent.get(x)));
        }
        return parent.get(x);
    }
    
    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        
        if (rootX !== rootY) {
            if (rank.get(rootX) < rank.get(rootY)) {
                parent.set(rootX, rootY);
            } else if (rank.get(rootX) > rank.get(rootY)) {
                parent.set(rootY, rootX);
            } else {
                parent.set(rootY, rootX);
                rank.set(rootX, rank.get(rootX) + 1);
            }
            return true;
        }
        return false;
    }
    
    // Initialize Union-Find
    for (let vertex of vertices) {
        parent.set(vertex, vertex);
        rank.set(vertex, 0);
    }
    
    const mst = [];
    let totalWeight = 0;
    
    for (let edge of edges) {
        if (union(edge.from, edge.to)) {
            mst.push(edge);
            totalWeight += edge.weight;
            
            if (mst.length === vertices.length - 1) {
                break;
            }
        }
    }
    
    return { edges: mst, totalWeight };
}

// ===== COMMON GRAPH PROBLEMS =====

// Check if graph is bipartite - O(V + E)
function isBipartite(graph) {
    const color = new Map();
    
    function dfsColor(vertex, c) {
        color.set(vertex, c);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            const neighbor = edge.vertex;
            
            if (!color.has(neighbor)) {
                if (!dfsColor(neighbor, 1 - c)) {
                    return false;
                }
            } else if (color.get(neighbor) === c) {
                return false;
            }
        }
        
        return true;
    }
    
    for (let vertex of graph.getVertices()) {
        if (!color.has(vertex)) {
            if (!dfsColor(vertex, 0)) {
                return false;
            }
        }
    }
    
    return true;
}

// Clone graph - O(V + E)
function cloneGraph(node) {
    if (!node) return null;
    
    const cloned = new Map();
    
    function dfs(original) {
        if (cloned.has(original)) {
            return cloned.get(original);
        }
        
        const clone = { val: original.val, neighbors: [] };
        cloned.set(original, clone);
        
        for (let neighbor of original.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    }
    
    return dfs(node);
}

// ===== SIMPLE GRAPH UTILITIES =====

// Check if path exists between two vertices
function hasPath(graph, start, end) {
    const visited = new Set();
    
    function dfsPath(vertex) {
        if (vertex === end) return true;
        
        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            if (!visited.has(edge.vertex)) {
                if (dfsPath(edge.vertex)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    return dfsPath(start);
}

// Get all paths between two vertices
function getAllPaths(graph, start, end) {
    const paths = [];
    const visited = new Set();
    
    function dfsAllPaths(vertex, path) {
        if (vertex === end) {
            paths.push([...path, vertex]);
            return;
        }
        
        visited.add(vertex);
        
        const neighbors = graph.getNeighbors(vertex);
        for (let edge of neighbors) {
            if (!visited.has(edge.vertex)) {
                dfsAllPaths(edge.vertex, [...path, vertex]);
            }
        }
        
        visited.delete(vertex);
    }
    
    dfsAllPaths(start, []);
    return paths;
}

// ===== TEST FUNCTIONS =====

function testGraphs() {
    console.log('=== Testing Graph Operations ===');
    
    // Create undirected graph
    const graph = new Graph(false);
    
    // Add vertices and edges
    ['A', 'B', 'C', 'D', 'E'].forEach(v => graph.addVertex(v));
    
    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 8);
    graph.addEdge('C', 'E', 10);
    graph.addEdge('D', 'E', 2);
    
    console.log('Graph structure:');
    graph.print();
    
    console.log('\nDFS from A:', dfs(graph, 'A'));
    console.log('BFS from A:', bfs(graph, 'A'));
    
    console.log('\nConnected components:', findConnectedComponents(graph));
    console.log('Has cycle:', hasCycleUndirected(graph));
    console.log('Is bipartite:', isBipartite(graph));
    
    // Test shortest path
    const { distances, previous } = dijkstra(graph, 'A');
    console.log('\nShortest distances from A:', Object.fromEntries(distances));
    console.log('Shortest path A to E:', getShortestPath(previous, 'A', 'E'));
    
    // Test MST
    const mst = kruskalMST(graph);
    console.log('\nMinimum Spanning Tree:');
    console.log('Edges:', mst.edges);
    console.log('Total weight:', mst.totalWeight);
    
    // Test directed graph
    console.log('\n=== Testing Directed Graph ===');
    const directedGraph = new Graph(true);
    
    ['A', 'B', 'C', 'D'].forEach(v => directedGraph.addVertex(v));
    directedGraph.addEdge('A', 'B');
    directedGraph.addEdge('B', 'C');
    directedGraph.addEdge('C', 'D');
    directedGraph.addEdge('A', 'C');
    
    console.log('Directed graph structure:');
    directedGraph.print();
    
    console.log('Has cycle:', hasCycleDirected(directedGraph));
    console.log('Topological sort:', topologicalSort(directedGraph));
}