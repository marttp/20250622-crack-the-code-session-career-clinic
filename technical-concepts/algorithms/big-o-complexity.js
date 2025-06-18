// Time & Space Complexity (Big O) Examples

// ===== O(1) - Constant Time =====
function getFirstElement(arr) {
    return arr[0];
}

function getLastElement(arr) {
    return arr[arr.length - 1];
}

function addToObject(obj, key, value) {
    obj[key] = value;
    return obj;
}

// ===== O(log n) - Logarithmic Time =====
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Tree height calculation
function treeHeight(node) {
    if (!node) return 0;
    return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
}

// ===== O(n) - Linear Time =====
function findElement(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

function arraySum(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    return sum;
}

function reverseString(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}

// ===== O(n log n) - Linearithmic Time =====
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// ===== O(n²) - Quadratic Time =====
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function findAllPairs(arr) {
    const pairs = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs;
}

function matrixMultiplication(matrix1, matrix2) {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const cols2 = matrix2[0].length;
    const result = Array(rows1).fill().map(() => Array(cols2).fill(0));
    
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

// ===== O(2^n) - Exponential Time =====
function fibonacciNaive(n) {
    if (n <= 1) return n;
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

function powerSet(arr) {
    if (arr.length === 0) return [[]];
    
    const first = arr[0];
    const rest = arr.slice(1);
    const subsetsWithoutFirst = powerSet(rest);
    const subsetsWithFirst = subsetsWithoutFirst.map(subset => [first, ...subset]);
    
    return [...subsetsWithoutFirst, ...subsetsWithFirst];
}

// ===== SPACE COMPLEXITY EXAMPLES =====

// O(1) Space - Constant Space
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// O(n) Space - Linear Space
function createCopy(arr) {
    const copy = [];
    for (let item of arr) {
        copy.push(item);
    }
    return copy;
}

function fibonacciMemoized(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}

// O(log n) Space - Logarithmic Space (due to recursion stack)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// ===== COMPLEXITY ANALYSIS PRACTICE =====

// Analyze this function's time and space complexity
function findDuplicates(arr) {
    const seen = new Set();        // O(n) space
    const duplicates = [];         // O(k) space where k is number of duplicates
    
    for (let item of arr) {        // O(n) time
        if (seen.has(item)) {      // O(1) time
            duplicates.push(item); // O(1) time
        } else {
            seen.add(item);        // O(1) time
        }
    }
    
    return duplicates;
}
// Time Complexity: O(n)
// Space Complexity: O(n)

// Analyze this function's complexity
function nestedLoop(matrix) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {      // O(n) where n = number of rows
        for (let j = 0; j < matrix[i].length; j++) { // O(m) where m = number of columns
            sum += matrix[i][j];                     // O(1)
        }
    }
    return sum;
}
// Time Complexity: O(n * m) or O(n²) if matrix is square
// Space Complexity: O(1)

// Best, Average, Worst Case Example
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// QuickSort Complexity:
// Best Case: O(n log n) - pivot divides array evenly
// Average Case: O(n log n) - random pivot selection
// Worst Case: O(n²) - pivot is always smallest or largest element