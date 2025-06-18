// Queues - FIFO (First In, First Out) Data Structure

// ===== BASIC QUEUE IMPLEMENTATION =====

class Queue {
    constructor() {
        this.items = [];
    }
    
    // Add element to rear - O(1)
    enqueue(element) {
        this.items.push(element);
    }
    
    // Remove element from front - O(n) - can be optimized
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }
    
    // Peek at front element - O(1)
    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }
    
    // Peek at rear element - O(1)
    rear() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }
    
    // Check if queue is empty - O(1)
    isEmpty() {
        return this.items.length === 0;
    }
    
    // Get queue size - O(1)
    size() {
        return this.items.length;
    }
    
    // Clear queue - O(1)
    clear() {
        this.items = [];
    }
    
    // Convert to array - O(n)
    toArray() {
        return [...this.items];
    }
    
    // Print queue
    print() {
        console.log('Queue:', this.items.join(' <- '));
    }
}

// ===== OPTIMIZED QUEUE (Circular Buffer) =====

class CircularQueue {
    constructor(capacity) {
        this.items = new Array(capacity);
        this.capacity = capacity;
        this.frontIndex = 0;
        this.rearIndex = -1;
        this.count = 0;
    }
    
    // Enqueue - O(1)
    enqueue(element) {
        if (this.isFull()) {
            throw new Error('Queue is full');
        }
        
        this.rearIndex = (this.rearIndex + 1) % this.capacity;
        this.items[this.rearIndex] = element;
        this.count++;
    }
    
    // Dequeue - O(1)
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        
        const element = this.items[this.frontIndex];
        this.items[this.frontIndex] = undefined;
        this.frontIndex = (this.frontIndex + 1) % this.capacity;
        this.count--;
        
        return element;
    }
    
    // Front element - O(1)
    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.frontIndex];
    }
    
    // Rear element - O(1)
    rear() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.rearIndex];
    }
    
    // Check if empty - O(1)
    isEmpty() {
        return this.count === 0;
    }
    
    // Check if full - O(1)
    isFull() {
        return this.count === this.capacity;
    }
    
    // Get size - O(1)
    size() {
        return this.count;
    }
}

// ===== QUEUE USING LINKED LIST =====

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.queueSize = 0;
    }
    
    // Enqueue - O(1)
    enqueue(val) {
        const newNode = new ListNode(val);
        
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        
        this.queueSize++;
    }
    
    // Dequeue - O(1)
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        
        const val = this.front.val;
        this.front = this.front.next;
        
        if (!this.front) {
            this.rear = null;
        }
        
        this.queueSize--;
        return val;
    }
    
    // Front element - O(1)
    frontElement() {
        return this.isEmpty() ? null : this.front.val;
    }
    
    // Rear element - O(1)
    rearElement() {
        return this.isEmpty() ? null : this.rear.val;
    }
    
    // Check if empty - O(1)
    isEmpty() {
        return this.front === null;
    }
    
    // Get size - O(1)
    size() {
        return this.queueSize;
    }
}

// ===== DEQUE (Double-ended Queue) =====

class Deque {
    constructor() {
        this.items = [];
    }
    
    // Add to front - O(n)
    addFront(element) {
        this.items.unshift(element);
    }
    
    // Add to rear - O(1)
    addRear(element) {
        this.items.push(element);
    }
    
    // Remove from front - O(n)
    removeFront() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }
    
    // Remove from rear - O(1)
    removeRear() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }
    
    // Peek front - O(1)
    peekFront() {
        return this.isEmpty() ? null : this.items[0];
    }
    
    // Peek rear - O(1)
    peekRear() {
        return this.isEmpty() ? null : this.items[this.items.length - 1];
    }
    
    // Check if empty - O(1)
    isEmpty() {
        return this.items.length === 0;
    }
    
    // Get size - O(1)
    size() {
        return this.items.length;
    }
}

// ===== PRIORITY QUEUE =====

class PriorityQueue {
    constructor(compareFn = (a, b) => a.priority - b.priority) {
        this.items = [];
        this.compare = compareFn;
    }
    
    // Enqueue with priority - O(n)
    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        
        for (let i = 0; i < this.items.length; i++) {
            if (this.compare(queueElement, this.items[i]) < 0) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        
        if (!added) {
            this.items.push(queueElement);
        }
    }
    
    // Dequeue highest priority - O(1)
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift().element;
    }
    
    // Peek highest priority - O(1)
    front() {
        return this.isEmpty() ? null : this.items[0].element;
    }
    
    // Check if empty - O(1)
    isEmpty() {
        return this.items.length === 0;
    }
    
    // Get size - O(1)
    size() {
        return this.items.length;
    }
}

// ===== COMMON QUEUE PROBLEMS =====

// 1. Generate Binary Numbers - O(n)
function generateBinaryNumbers(n) {
    const queue = new Queue();
    const result = [];
    
    queue.enqueue('1');
    
    for (let i = 0; i < n; i++) {
        const binary = queue.dequeue();
        result.push(binary);
        
        queue.enqueue(binary + '0');
        queue.enqueue(binary + '1');
    }
    
    return result;
}

// 2. Hot Potato (Josephus Problem) - O(n*k)
function hotPotato(names, num) {
    const queue = new Queue();
    
    // Add all names to queue
    for (let name of names) {
        queue.enqueue(name);
    }
    
    // Eliminate every num-th person
    while (queue.size() > 1) {
        // Pass the hot potato
        for (let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue());
        }
        
        // Eliminate the person holding it
        const eliminated = queue.dequeue();
        console.log(`${eliminated} is eliminated`);
    }
    
    return queue.dequeue(); // Winner
}

// 3. Sliding Window Maximum - O(n)
function slidingWindowMaximum(nums, k) {
    const deque = new Deque();
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (!deque.isEmpty() && deque.peekFront() < i - k + 1) {
            deque.removeFront();
        }
        
        // Remove smaller elements (they can't be maximum)
        while (!deque.isEmpty() && nums[deque.peekRear()] < nums[i]) {
            deque.removeRear();
        }
        
        deque.addRear(i);
        
        // Add maximum to result when window is full
        if (i >= k - 1) {
            result.push(nums[deque.peekFront()]);
        }
    }
    
    return result;
}

// 4. Queue Reconstruction by Height - O(n²)
function reconstructQueue(people) {
    // Sort by height desc, then by count asc
    people.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0]; // Height descending
        }
        return a[1] - b[1]; // Count ascending
    });
    
    const result = [];
    
    for (let person of people) {
        result.splice(person[1], 0, person);
    }
    
    return result;
}

// ===== BFS USING QUEUE =====

// Level Order Traversal of Binary Tree - O(n)
function levelOrder(root) {
    if (!root) return [];
    
    const queue = new Queue();
    const result = [];
    
    queue.enqueue(root);
    
    while (!queue.isEmpty()) {
        const levelSize = queue.size();
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.dequeue();
            currentLevel.push(node.val);
            
            if (node.left) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// Shortest Path in Unweighted Graph - O(V + E)
function shortestPath(graph, start, end) {
    const queue = new Queue();
    const visited = new Set();
    const parent = new Map();
    
    queue.enqueue(start);
    visited.add(start);
    parent.set(start, null);
    
    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        
        if (current === end) {
            // Reconstruct path
            const path = [];
            let node = end;
            
            while (node !== null) {
                path.unshift(node);
                node = parent.get(node);
            }
            
            return path;
        }
        
        for (let neighbor of graph[current] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent.set(neighbor, current);
                queue.enqueue(neighbor);
            }
        }
    }
    
    return []; // No path found
}

// ===== IMPLEMENT STACK USING QUEUES =====

class StackUsingQueues {
    constructor() {
        this.queue1 = new Queue();
        this.queue2 = new Queue();
    }
    
    // Push - O(n)
    push(val) {
        // Add to queue2
        this.queue2.enqueue(val);
        
        // Move all elements from queue1 to queue2
        while (!this.queue1.isEmpty()) {
            this.queue2.enqueue(this.queue1.dequeue());
        }
        
        // Swap queues
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
    }
    
    // Pop - O(1)
    pop() {
        return this.queue1.dequeue();
    }
    
    // Top - O(1)
    top() {
        return this.queue1.front();
    }
    
    // Empty - O(1)
    empty() {
        return this.queue1.isEmpty();
    }
}

// ===== RECENT COUNTER =====

class RecentCounter {
    constructor() {
        this.requests = new Queue();
    }
    
    ping(t) {
        this.requests.enqueue(t);
        
        // Remove requests older than 3000ms
        while (!this.requests.isEmpty() && this.requests.front() < t - 3000) {
            this.requests.dequeue();
        }
        
        return this.requests.size();
    }
}

// ===== UTILITY FUNCTIONS =====

// Reverse first K elements of queue
function reverseFirstK(queue, k) {
    if (k <= 0 || k > queue.size()) {
        return;
    }
    
    const stack = [];
    
    // Dequeue first k elements and push to stack
    for (let i = 0; i < k; i++) {
        stack.push(queue.dequeue());
    }
    
    // Enqueue elements from stack (reversed order)
    while (stack.length > 0) {
        queue.enqueue(stack.pop());
    }
    
    // Move remaining elements to back
    const remaining = queue.size() - k;
    for (let i = 0; i < remaining; i++) {
        queue.enqueue(queue.dequeue());
    }
}

// Interleave two halves of queue
function interleaveQueue(queue) {
    const size = queue.size();
    if (size % 2 !== 0) {
        throw new Error('Queue size must be even');
    }
    
    const stack = [];
    const halfSize = size / 2;
    
    // Move first half to stack
    for (let i = 0; i < halfSize; i++) {
        stack.push(queue.dequeue());
    }
    
    // Enqueue from stack
    while (stack.length > 0) {
        queue.enqueue(stack.pop());
    }
    
    // Move first half to back
    for (let i = 0; i < halfSize; i++) {
        queue.enqueue(queue.dequeue());
    }
    
    // Move first half to stack again
    for (let i = 0; i < halfSize; i++) {
        stack.push(queue.dequeue());
    }
    
    // Interleave
    while (stack.length > 0) {
        queue.enqueue(stack.pop());
        queue.enqueue(queue.dequeue());
    }
}

// ===== TEST FUNCTIONS =====

function testQueue() {
    console.log('=== Testing Queue Operations ===');
    
    const queue = new Queue();
    
    // Test basic operations
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    
    console.log('Queue after enqueues:', queue.toArray()); // [1, 2, 3]
    console.log('Front:', queue.front()); // 1
    console.log('Rear:', queue.rear()); // 3
    console.log('Dequeue:', queue.dequeue()); // 1
    console.log('Queue after dequeue:', queue.toArray()); // [2, 3]
    
    // Test circular queue
    const circularQueue = new CircularQueue(3);
    circularQueue.enqueue('A');
    circularQueue.enqueue('B');
    circularQueue.enqueue('C');
    
    console.log('Circular queue front:', circularQueue.front()); // A
    console.log('Circular queue dequeue:', circularQueue.dequeue()); // A
    circularQueue.enqueue('D');
    console.log('Circular queue rear:', circularQueue.rear()); // D
    
    // Test priority queue
    const pq = new PriorityQueue();
    pq.enqueue('Low', 3);
    pq.enqueue('High', 1);
    pq.enqueue('Medium', 2);
    
    console.log('Priority queue order:');
    while (!pq.isEmpty()) {
        console.log(pq.dequeue());
    }
    
    // Test binary number generation
    console.log('First 5 binary numbers:', generateBinaryNumbers(5));
    
    // Test hot potato
    console.log('Hot potato winner:', hotPotato(['A', 'B', 'C', 'D', 'E'], 3));
}