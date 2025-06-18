// Sorting Algorithms - Built-in Functions and Concepts

// ===== JAVASCRIPT BUILT-IN SORT =====

// Default Sort (Lexicographic)
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log([...numbers].sort()); // ['1', '1', '2', '3', '4', '5', '6', '9'] - treats as strings!

// Numeric Sort (Ascending)
console.log([...numbers].sort((a, b) => a - b)); // [1, 1, 2, 3, 4, 5, 6, 9]

// Numeric Sort (Descending)
console.log([...numbers].sort((a, b) => b - a)); // [9, 6, 5, 4, 3, 2, 1, 1]

// ===== SORTING OBJECTS =====

const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
    { name: 'David', age: 25 }
];

// Sort by age (ascending)
const sortedByAge = [...people].sort((a, b) => a.age - b.age);
console.log(sortedByAge);

// Sort by name (alphabetical)
const sortedByName = [...people].sort((a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);

// Sort by multiple criteria (age first, then name)
const sortedMultiple = [...people].sort((a, b) => {
    if (a.age !== b.age) {
        return a.age - b.age;
    }
    return a.name.localeCompare(b.name);
});
console.log(sortedMultiple);

// ===== ADVANCED SORTING PATTERNS =====

// Sort by Frequency
function sortByFrequency(arr) {
    const freq = new Map();
    
    // Count frequencies
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    
    // Sort by frequency (descending), then by value (ascending)
    return arr.sort((a, b) => {
        const freqDiff = freq.get(b) - freq.get(a);
        if (freqDiff !== 0) return freqDiff;
        return a - b;
    });
}

// Sort by Custom Comparator
function customSort(arr, compareFn) {
    return arr.sort(compareFn);
}

// Example: Sort strings by length, then alphabetically
const words = ['apple', 'pie', 'washington', 'book', 'a'];
const sortedWords = customSort([...words], (a, b) => {
    if (a.length !== b.length) {
        return a.length - b.length;
    }
    return a.localeCompare(b);
});
console.log(sortedWords); // ['a', 'pie', 'book', 'apple', 'washington']

// ===== STABLE VS UNSTABLE SORTING =====

// JavaScript's Array.sort() is stable (maintains relative order of equal elements)
const students = [
    { name: 'Alice', grade: 85 },
    { name: 'Bob', grade: 90 },
    { name: 'Charlie', grade: 85 },
    { name: 'David', grade: 90 }
];

// Sort by grade - Alice and Charlie maintain their relative order
const byGrade = [...students].sort((a, b) => a.grade - b.grade);
console.log(byGrade);

// ===== PRACTICAL SORTING EXAMPLES =====

// Sort Array of Arrays
const matrix = [[3, 1], [2, 5], [1, 4]];

// Sort by first element
const sortedByFirst = [...matrix].sort((a, b) => a[0] - b[0]);
console.log(sortedByFirst); // [[1, 4], [2, 5], [3, 1]]

// Sort by sum of elements
const sortedBySum = [...matrix].sort((a, b) => {
    const sumA = a.reduce((sum, val) => sum + val, 0);
    const sumB = b.reduce((sum, val) => sum + val, 0);
    return sumA - sumB;
});
console.log(sortedBySum);

// Sort Dates
const dates = [
    new Date('2023-03-15'),
    new Date('2023-01-10'),
    new Date('2023-12-25'),
    new Date('2023-06-20')
];

const sortedDates = [...dates].sort((a, b) => a - b);
console.log(sortedDates);

// ===== SPECIALIZED SORTING FUNCTIONS =====

// Sort with Custom Key Function
function sortBy(arr, keyFn) {
    return arr.sort((a, b) => {
        const keyA = keyFn(a);
        const keyB = keyFn(b);
        
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
}

// Usage
const products = [
    { name: 'Laptop', price: 999 },
    { name: 'Phone', price: 699 },
    { name: 'Tablet', price: 399 }
];

const sortedByPrice = sortBy([...products], product => product.price);
console.log(sortedByPrice);

// Reverse Sort Helper
function reverseSort(arr, compareFn) {
    return arr.sort((a, b) => compareFn(b, a));
}

// Stable Sort by Multiple Keys
function multiKeySort(arr, ...keyFns) {
    return arr.sort((a, b) => {
        for (let keyFn of keyFns) {
            const keyA = keyFn(a);
            const keyB = keyFn(b);
            
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        }
        return 0;
    });
}

// Usage
const employees = [
    { name: 'Alice', department: 'Engineering', salary: 80000 },
    { name: 'Bob', department: 'Sales', salary: 60000 },
    { name: 'Charlie', department: 'Engineering', salary: 90000 },
    { name: 'David', department: 'Sales', salary: 70000 }
];

const sortedEmployees = multiKeySort([...employees],
    emp => emp.department,
    emp => -emp.salary  // Negative for descending order
);
console.log(sortedEmployees);

// ===== SORTING PERFORMANCE CONSIDERATIONS =====

// Time Complexity: O(n log n) average case for built-in sort
// Space Complexity: O(log n) for the recursion stack

// For large datasets, consider:
function efficientSort(arr) {
    // For numbers
    if (typeof arr[0] === 'number') {
        return arr.sort((a, b) => a - b);
    }
    
    // For strings
    if (typeof arr[0] === 'string') {
        return arr.sort();
    }
    
    // For objects, use specific property
    return arr;
}

// ===== PARTIAL SORTING =====

// Get top K elements (more efficient than full sort for small K)
function getTopK(arr, k, compareFn) {
    // For small k, this is more efficient than full sort
    const result = [];
    const temp = [...arr];
    
    for (let i = 0; i < k && temp.length > 0; i++) {
        let maxIndex = 0;
        for (let j = 1; j < temp.length; j++) {
            if (compareFn(temp[j], temp[maxIndex]) > 0) {
                maxIndex = j;
            }
        }
        result.push(temp.splice(maxIndex, 1)[0]);
    }
    
    return result;
}

// Get bottom K elements
function getBottomK(arr, k, compareFn) {
    return getTopK(arr, k, (a, b) => compareFn(b, a));
}

// ===== SORTING UTILITIES =====

// Check if array is sorted
function isSorted(arr, compareFn = (a, b) => a - b) {
    for (let i = 1; i < arr.length; i++) {
        if (compareFn(arr[i - 1], arr[i]) > 0) {
            return false;
        }
    }
    return true;
}

// Sort and remove duplicates
function sortUnique(arr, compareFn = (a, b) => a - b) {
    const sorted = [...arr].sort(compareFn);
    const unique = [];
    
    for (let i = 0; i < sorted.length; i++) {
        if (i === 0 || compareFn(sorted[i], sorted[i - 1]) !== 0) {
            unique.push(sorted[i]);
        }
    }
    
    return unique;
}

// Merge two sorted arrays
function mergeSorted(arr1, arr2, compareFn = (a, b) => a - b) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (compareFn(arr1[i], arr2[j]) <= 0) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }
    
    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    
    return result;
}

// ===== INTERVIEW QUESTIONS USING SORT =====

// Merge Intervals
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];
        
        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
}

// Meeting Rooms
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }
    
    return true;
}

// Largest Number
function largestNumber(nums) {
    const strings = nums.map(String);
    
    strings.sort((a, b) => (b + a).localeCompare(a + b));
    
    const result = strings.join('');
    return result[0] === '0' ? '0' : result;
}

// Test Functions
function testSorting() {
    console.log('=== Testing Sorting Functions ===');
    
    const testArray = [3, 1, 4, 1, 5, 9, 2, 6];
    console.log('Original:', testArray);
    console.log('Sorted (asc):', [...testArray].sort((a, b) => a - b));
    console.log('Sorted (desc):', [...testArray].sort((a, b) => b - a));
    
    const testWords = ['banana', 'apple', 'cherry', 'date'];
    console.log('Words sorted:', [...testWords].sort());
    
    console.log('Is [1,2,3,4] sorted?', isSorted([1, 2, 3, 4]));
    console.log('Is [1,3,2,4] sorted?', isSorted([1, 3, 2, 4]));
}