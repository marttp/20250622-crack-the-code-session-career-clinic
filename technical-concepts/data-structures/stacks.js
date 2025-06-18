// Stacks - LIFO (Last In, First Out) Data Structure

// ===== BASIC STACK IMPLEMENTATION =====

class Stack {
    constructor() {
        this.items = [];
    }
    
    // Push element to top - O(1)
    push(element) {
        this.items.push(element);
    }
    
    // Pop element from top - O(1)
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }
    
    // Peek at top element without removing - O(1)
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }
    
    // Check if stack is empty - O(1)
    isEmpty() {
        return this.items.length === 0;
    }
    
    // Get stack size - O(1)
    size() {
        return this.items.length;
    }
    
    // Clear stack - O(1)
    clear() {
        this.items = [];
    }
    
    // Convert to array - O(n)
    toArray() {
        return [...this.items];
    }
    
    // Print stack
    print() {
        console.log('Stack:', this.items.join(' <- '));
    }
}

// ===== STACK USING LINKED LIST =====

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedStack {
    constructor() {
        this.head = null;
        this.stackSize = 0;
    }
    
    // Push element - O(1)
    push(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        this.stackSize++;
    }
    
    // Pop element - O(1)
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        
        const val = this.head.val;
        this.head = this.head.next;
        this.stackSize--;
        return val;
    }
    
    // Peek at top - O(1)
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.head.val;
    }
    
    // Check if empty - O(1)
    isEmpty() {
        return this.head === null;
    }
    
    // Get size - O(1)
    size() {
        return this.stackSize;
    }
}

// ===== COMMON STACK PROBLEMS =====

// 1. Check Balanced Parentheses - O(n)
function isBalanced(str) {
    const stack = new Stack();
    const pairs = { '(': ')', '[': ']', '{': '}' };
    
    for (let char of str) {
        if (pairs[char]) {
            // Opening bracket
            stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
            // Closing bracket
            if (stack.isEmpty() || pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }
    
    return stack.isEmpty();
}

// 2. Evaluate Postfix Expression - O(n)
function evaluatePostfix(expression) {
    const stack = new Stack();
    const operators = ['+', '-', '*', '/'];
    
    for (let token of expression.split(' ')) {
        if (operators.includes(token)) {
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        } else {
            stack.push(parseFloat(token));
        }
    }
    
    return stack.pop();
}

// 3. Convert Infix to Postfix - O(n)
function infixToPostfix(infix) {
    const stack = new Stack();
    const result = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    
    function isOperator(char) {
        return precedence.hasOwnProperty(char);
    }
    
    for (let char of infix) {
        if (char === ' ') continue;
        
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                result.push(stack.pop());
            }
            stack.pop(); // Remove '('
        } else if (isOperator(char)) {
            while (!stack.isEmpty() && 
                   stack.peek() !== '(' && 
                   precedence[stack.peek()] >= precedence[char]) {
                result.push(stack.pop());
            }
            stack.push(char);
        } else {
            result.push(char); // Operand
        }
    }
    
    while (!stack.isEmpty()) {
        result.push(stack.pop());
    }
    
    return result.join(' ');
}

// 4. Valid Parentheses with Multiple Types - O(n)
function isValidParentheses(s) {
    const stack = new Stack();
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (mapping[char]) {
            if (stack.isEmpty() || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.isEmpty();
}

// 5. Next Greater Element - O(n)
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = new Stack();
    
    for (let i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            const index = stack.pop();
            result[index] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

// 6. Daily Temperatures - O(n)
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = new Stack();
    
    for (let i = 0; i < temperatures.length; i++) {
        while (!stack.isEmpty() && temperatures[stack.peek()] < temperatures[i]) {
            const index = stack.pop();
            result[index] = i - index;
        }
        stack.push(i);
    }
    
    return result;
}

// 7. Largest Rectangle in Histogram - O(n)
function largestRectangleArea(heights) {
    const stack = new Stack();
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];
        
        while (!stack.isEmpty() && heights[stack.peek()] > currentHeight) {
            const height = heights[stack.pop()];
            const width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

// ===== ADVANCED STACK PROBLEMS =====

// Min Stack - Get minimum element in O(1)
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        if (this.stack.length === 0) return null;
        
        const val = this.stack.pop();
        if (val === this.getMin()) {
            this.minStack.pop();
        }
        
        return val;
    }
    
    top() {
        return this.stack.length === 0 ? null : this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack.length === 0 ? null : this.minStack[this.minStack.length - 1];
    }
}

// Implement Queue using Stacks
class QueueUsingStacks {
    constructor() {
        this.stack1 = new Stack(); // For enqueue
        this.stack2 = new Stack(); // For dequeue
    }
    
    enqueue(val) {
        this.stack1.push(val);
    }
    
    dequeue() {
        if (this.stack2.isEmpty()) {
            while (!this.stack1.isEmpty()) {
                this.stack2.push(this.stack1.pop());
            }
        }
        
        return this.stack2.pop();
    }
    
    front() {
        if (this.stack2.isEmpty()) {
            while (!this.stack1.isEmpty()) {
                this.stack2.push(this.stack1.pop());
            }
        }
        
        return this.stack2.peek();
    }
    
    isEmpty() {
        return this.stack1.isEmpty() && this.stack2.isEmpty();
    }
}

// ===== BROWSER HISTORY USING STACK =====

class BrowserHistory {
    constructor(homepage) {
        this.history = new Stack();
        this.future = new Stack();
        this.current = homepage;
    }
    
    visit(url) {
        this.history.push(this.current);
        this.current = url;
        this.future.clear(); // Clear forward history
    }
    
    back(steps) {
        let actualSteps = 0;
        
        while (actualSteps < steps && !this.history.isEmpty()) {
            this.future.push(this.current);
            this.current = this.history.pop();
            actualSteps++;
        }
        
        return this.current;
    }
    
    forward(steps) {
        let actualSteps = 0;
        
        while (actualSteps < steps && !this.future.isEmpty()) {
            this.history.push(this.current);
            this.current = this.future.pop();
            actualSteps++;
        }
        
        return this.current;
    }
}

// ===== RECURSION SIMULATION WITH STACK =====

// Factorial using stack (instead of recursion)
function factorialIterative(n) {
    if (n <= 1) return 1;
    
    const stack = new Stack();
    let result = 1;
    
    // Push all numbers from n down to 2
    for (let i = n; i > 1; i--) {
        stack.push(i);
    }
    
    // Multiply all numbers
    while (!stack.isEmpty()) {
        result *= stack.pop();
    }
    
    return result;
}

// Tree traversal using stack (instead of recursion)
function inorderTraversalIterative(root) {
    const result = [];
    const stack = new Stack();
    let current = root;
    
    while (current || !stack.isEmpty()) {
        // Go to leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        // Process current node
        current = stack.pop();
        result.push(current.val);
        
        // Move to right subtree
        current = current.right;
    }
    
    return result;
}

// ===== UTILITY FUNCTIONS =====

// Reverse string using stack
function reverseString(str) {
    const stack = new Stack();
    
    // Push all characters
    for (let char of str) {
        stack.push(char);
    }
    
    // Pop all characters
    let reversed = '';
    while (!stack.isEmpty()) {
        reversed += stack.pop();
    }
    
    return reversed;
}

// Check if string is palindrome using stack
function isPalindromeStack(str) {
    const stack = new Stack();
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Push first half
    const mid = Math.floor(cleanStr.length / 2);
    for (let i = 0; i < mid; i++) {
        stack.push(cleanStr[i]);
    }
    
    // Compare second half
    const start = cleanStr.length % 2 === 0 ? mid : mid + 1;
    for (let i = start; i < cleanStr.length; i++) {
        if (stack.pop() !== cleanStr[i]) {
            return false;
        }
    }
    
    return true;
}

// ===== TEST FUNCTIONS =====

function testStack() {
    console.log('=== Testing Stack Operations ===');
    
    const stack = new Stack();
    
    // Test basic operations
    stack.push(1);
    stack.push(2);
    stack.push(3);
    
    console.log('Stack after pushes:', stack.toArray()); // [1, 2, 3]
    console.log('Peek:', stack.peek()); // 3
    console.log('Pop:', stack.pop()); // 3
    console.log('Stack after pop:', stack.toArray()); // [1, 2]
    
    // Test balanced parentheses
    console.log('Is "()" balanced?', isBalanced('()')); // true
    console.log('Is "([)]" balanced?', isBalanced('([)]')); // false
    console.log('Is "{[()]}" balanced?', isBalanced('{[()]}')); // true
    
    // Test postfix evaluation
    console.log('Postfix "3 4 + 2 *" =', evaluatePostfix('3 4 + 2 *')); // 14
    
    // Test infix to postfix
    console.log('Infix "A+B*C" to postfix:', infixToPostfix('A+B*C')); // "A B C * +"
    
    // Test next greater element
    console.log('Next greater for [2,1,2,4,3,1]:', nextGreaterElement([2,1,2,4,3,1]));
    
    // Test MinStack
    const minStack = new MinStack();
    minStack.push(3);
    minStack.push(1);
    minStack.push(2);
    console.log('Min stack minimum:', minStack.getMin()); // 1
    minStack.pop();
    console.log('Min stack minimum after pop:', minStack.getMin()); // 1
}