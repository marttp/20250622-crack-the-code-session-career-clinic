// Arrays - Basic Operations and Examples

// ===== ARRAY BASICS =====

// Creating arrays
const numbers = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'orange'];
const mixed = [1, 'hello', true, null];
const empty = [];

// Array constructor
const arr1 = new Array(5); // Creates array with 5 empty slots
const arr2 = new Array(1, 2, 3); // Creates [1, 2, 3]

// Array.from() - create from iterable
const range = Array.from({length: 5}, (_, i) => i + 1); // [1, 2, 3, 4, 5]
const letters = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

// ===== BASIC OPERATIONS =====

// Access elements - O(1)
console.log(numbers[0]); // 1 (first element)
console.log(numbers[numbers.length - 1]); // 5 (last element)
console.log(numbers[-1]); // undefined (no negative indexing in JS)

// Modify elements - O(1)
numbers[0] = 10;
console.log(numbers); // [10, 2, 3, 4, 5]

// Array length
console.log(numbers.length); // 5

// Check if it's an array
console.log(Array.isArray(numbers)); // true
console.log(Array.isArray('hello')); // false

// ===== ADDING ELEMENTS =====

// Add to end - O(1)
const arr = [1, 2, 3];
arr.push(4); // [1, 2, 3, 4]
arr.push(5, 6); // [1, 2, 3, 4, 5, 6]

// Add to beginning - O(n)
arr.unshift(0); // [0, 1, 2, 3, 4, 5, 6]

// Add at specific index - O(n)
arr.splice(3, 0, 2.5); // Insert 2.5 at index 3
console.log(arr); // [0, 1, 2, 2.5, 3, 4, 5, 6]

// ===== REMOVING ELEMENTS =====

// Remove from end - O(1)
const last = arr.pop(); // Returns 6, arr becomes [0, 1, 2, 2.5, 3, 4, 5]

// Remove from beginning - O(n)
const first = arr.shift(); // Returns 0, arr becomes [1, 2, 2.5, 3, 4, 5]

// Remove from specific index - O(n)
const removed = arr.splice(2, 1); // Remove 1 element at index 2
console.log(removed); // [2.5]
console.log(arr); // [1, 2, 3, 4, 5]

// Remove multiple elements
arr.splice(1, 2); // Remove 2 elements starting at index 1
console.log(arr); // [1, 4, 5]

// ===== SEARCHING =====

// Find index - O(n)
const index = arr.indexOf(4); // Returns 1
const lastIndex = arr.lastIndexOf(4); // Returns last occurrence
const notFound = arr.indexOf(10); // Returns -1 if not found

// Check if element exists - O(n)
const exists = arr.includes(4); // Returns true

// Find with condition - O(n)
const found = arr.find(x => x > 3); // Returns first element > 3
const foundIndex = arr.findIndex(x => x > 3); // Returns index of first element > 3

// ===== ARRAY METHODS (FUNCTIONAL PROGRAMMING) =====

const originalArray = [1, 2, 3, 4, 5];

// Map - transform each element - O(n)
const doubled = originalArray.map(x => x * 2); // [2, 4, 6, 8, 10]

// Filter - select elements based on condition - O(n)
const evens = originalArray.filter(x => x % 2 === 0); // [2, 4]

// Reduce - combine elements into single value - O(n)
const sum = originalArray.reduce((acc, x) => acc + x, 0); // 15
const max = originalArray.reduce((acc, x) => Math.max(acc, x)); // 5

// ForEach - execute function for each element - O(n)
originalArray.forEach((value, index) => {
    console.log(`Index ${index}: ${value}`);
});

// Some - check if any element satisfies condition - O(n)
const hasEven = originalArray.some(x => x % 2 === 0); // true

// Every - check if all elements satisfy condition - O(n)
const allPositive = originalArray.every(x => x > 0); // true

// ===== ARRAY SLICING AND COPYING =====

const original = [1, 2, 3, 4, 5];

// Slice - extract portion (doesn't modify original) - O(n)
const portion = original.slice(1, 4); // [2, 3, 4]
const fromIndex = original.slice(2); // [3, 4, 5]
const lastTwo = original.slice(-2); // [4, 5]

// Shallow copy
const copy1 = [...original]; // Spread operator
const copy2 = Array.from(original); // Array.from
const copy3 = original.slice(); // slice without params

// ===== ARRAY CONCATENATION =====

const arr1Array = [1, 2, 3];
const arr2Array = [4, 5, 6];

// Concat method - O(n + m)
const combined1 = arr1Array.concat(arr2Array); // [1, 2, 3, 4, 5, 6]

// Spread operator - O(n + m)
const combined2 = [...arr1Array, ...arr2Array]; // [1, 2, 3, 4, 5, 6]

// ===== SORTING =====

const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];

// Sort in place - O(n log n)
unsorted.sort(); // Sorts as strings by default
console.log(unsorted); // ['1', '1', '2', '3', '4', '5', '6', '9']

// Numeric sort
const numbers2 = [3, 1, 4, 1, 5, 9, 2, 6];
numbers2.sort((a, b) => a - b); // [1, 1, 2, 3, 4, 5, 6, 9]

// Reverse - O(n)
numbers2.reverse(); // [9, 6, 5, 4, 3, 2, 1, 1]

// ===== COMMON ARRAY PATTERNS =====

// Remove duplicates
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// Flatten array
function flatten(arr) {
    return arr.flat(); // Flattens one level
    // return arr.flat(Infinity); // Flattens all levels
}

// Group by property
function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
        const group = item[key];
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}

// Chunk array into smaller arrays
function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

// Find intersection of two arrays
function intersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(x => set2.has(x));
}

// Find difference between arrays
function difference(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(x => !set2.has(x));
}

// ===== ARRAY ALGORITHMS =====

// Binary search (requires sorted array) - O(log n)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Two sum problem - O(n²) naive approach
function twoSumNaive(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Maximum subarray sum (Kadane's algorithm) - O(n)
function maxSubarraySum(arr) {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Rotate array by k positions - O(n)
function rotateArray(arr, k) {
    const n = arr.length;
    k = k % n; // Handle k > n
    
    return [...arr.slice(-k), ...arr.slice(0, -k)];
}

// ===== PERFORMANCE CONSIDERATIONS =====

// Use appropriate methods based on operation frequency
class DynamicArray {
    constructor() {
        this.data = [];
    }
    
    // O(1) amortized
    push(value) {
        this.data.push(value);
    }
    
    // O(1)
    pop() {
        return this.data.pop();
    }
    
    // O(n)
    insert(index, value) {
        this.data.splice(index, 0, value);
    }
    
    // O(n)
    remove(index) {
        return this.data.splice(index, 1)[0];
    }
    
    // O(1)
    get(index) {
        return this.data[index];
    }
    
    // O(1)
    set(index, value) {
        this.data[index] = value;
    }
    
    // O(1)
    size() {
        return this.data.length;
    }
}

// ===== TEST FUNCTIONS =====

function testArrayOperations() {
    console.log('=== Testing Array Operations ===');
    
    const testArray = [1, 2, 3, 4, 5];
    console.log('Original array:', testArray);
    
    // Test basic operations
    console.log('First element:', testArray[0]);
    console.log('Last element:', testArray[testArray.length - 1]);
    
    // Test methods
    console.log('Doubled:', testArray.map(x => x * 2));
    console.log('Evens:', testArray.filter(x => x % 2 === 0));
    console.log('Sum:', testArray.reduce((sum, x) => sum + x, 0));
    
    // Test utility functions
    console.log('Remove duplicates:', removeDuplicates([1, 2, 2, 3, 3, 4]));
    console.log('Chunk array:', chunk([1, 2, 3, 4, 5, 6], 2));
    console.log('Max subarray sum:', maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
}