// Hash Tables - Key-Value Storage with Fast Access

// ===== JAVASCRIPT MAP AND SET =====

// Using Map for hash table functionality
const hashMap = new Map();

// Set operations - O(1) average
hashMap.set('name', 'Alice');
hashMap.set('age', 30);
hashMap.set('city', 'New York');

// Get operations - O(1) average
console.log(hashMap.get('name')); // 'Alice'
console.log(hashMap.get('country')); // undefined

// Check existence - O(1) average
console.log(hashMap.has('age')); // true
console.log(hashMap.has('country')); // false

// Delete operations - O(1) average
hashMap.delete('city');
console.log(hashMap.has('city')); // false

// Iteration
for (let [key, value] of hashMap) {
    console.log(`${key}: ${value}`);
}

// Using Set for hash set functionality
const hashSet = new Set();

// Add operations - O(1) average
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(2); // Duplicate, won't be added

// Check existence - O(1) average
console.log(hashSet.has(2)); // true
console.log(hashSet.has(4)); // false

// Delete operations - O(1) average
hashSet.delete(2);
console.log(hashSet.has(2)); // false

// ===== BASIC HASH TABLE IMPLEMENTATION =====

class HashTable {
    constructor(size = 53) {
        this.size = size;
        this.buckets = new Array(size);
    }
    
    // Simple hash function
    _hash(key) {
        let total = 0;
        const WEIRD_PRIME = 31;
        
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key.charCodeAt(i);
            total = (total * WEIRD_PRIME + char) % this.size;
        }
        
        return total;
    }
    
    // Set key-value pair - O(1) average
    set(key, value) {
        const index = this._hash(key);
        
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        
        // Check if key already exists
        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                this.buckets[index][i][1] = value;
                return;
            }
        }
        
        // Add new key-value pair
        this.buckets[index].push([key, value]);
    }
    
    // Get value by key - O(1) average
    get(key) {
        const index = this._hash(key);
        
        if (this.buckets[index]) {
            for (let pair of this.buckets[index]) {
                if (pair[0] === key) {
                    return pair[1];
                }
            }
        }
        
        return undefined;
    }
    
    // Check if key exists - O(1) average
    has(key) {
        return this.get(key) !== undefined;
    }
    
    // Delete key-value pair - O(1) average
    delete(key) {
        const index = this._hash(key);
        
        if (this.buckets[index]) {
            for (let i = 0; i < this.buckets[index].length; i++) {
                if (this.buckets[index][i][0] === key) {
                    this.buckets[index].splice(i, 1);
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // Get all keys - O(n)
    keys() {
        const keys = [];
        
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    keys.push(pair[0]);
                }
            }
        }
        
        return keys;
    }
    
    // Get all values - O(n)
    values() {
        const values = [];
        
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    values.push(pair[1]);
                }
            }
        }
        
        return values;
    }
}

// ===== COMMON HASH TABLE PATTERNS =====

// 1. Count Frequency - O(n)
function countFrequency(arr) {
    const freq = new Map();
    
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    
    return freq;
}

// 2. Two Sum Problem - O(n)
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// 3. Group Anagrams - O(n * m log m)
function groupAnagrams(strs) {
    const map = new Map();
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

// 4. First Unique Character - O(n)
function firstUniqueChar(s) {
    const charCount = new Map();
    
    // Count frequency
    for (let char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Find first unique
    for (let i = 0; i < s.length; i++) {
        if (charCount.get(s[i]) === 1) {
            return i;
        }
    }
    
    return -1;
}

// 5. Valid Anagram - O(n)
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const charCount = new Map();
    
    // Count chars in s
    for (let char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Subtract chars in t
    for (let char of t) {
        if (!charCount.has(char)) return false;
        
        charCount.set(char, charCount.get(char) - 1);
        
        if (charCount.get(char) === 0) {
            charCount.delete(char);
        }
    }
    
    return charCount.size === 0;
}

// 6. Contains Duplicate - O(n)
function containsDuplicate(nums) {
    const seen = new Set();
    
    for (let num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
}

// 7. Intersection of Two Arrays - O(n + m)
function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const result = new Set();
    
    for (let num of nums2) {
        if (set1.has(num)) {
            result.add(num);
        }
    }
    
    return Array.from(result);
}

// ===== ADVANCED HASH TABLE PROBLEMS =====

// LRU Cache Implementation
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            // Move to end (most recently used)
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove least recently used (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
}

// Word Pattern Matching - O(n)
function wordPattern(pattern, s) {
    const words = s.split(' ');
    
    if (pattern.length !== words.length) return false;
    
    const charToWord = new Map();
    const wordToChar = new Map();
    
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        
        if (charToWord.has(char)) {
            if (charToWord.get(char) !== word) return false;
        } else {
            charToWord.set(char, word);
        }
        
        if (wordToChar.has(word)) {
            if (wordToChar.get(word) !== char) return false;
        } else {
            wordToChar.set(word, char);
        }
    }
    
    return true;
}

// Subarray Sum Equals K - O(n)
function subarraySum(nums, k) {
    const prefixSums = new Map();
    prefixSums.set(0, 1); // Empty subarray
    
    let count = 0;
    let sum = 0;
    
    for (let num of nums) {
        sum += num;
        
        // Check if (sum - k) exists
        if (prefixSums.has(sum - k)) {
            count += prefixSums.get(sum - k);
        }
        
        // Add current sum to map
        prefixSums.set(sum, (prefixSums.get(sum) || 0) + 1);
    }
    
    return count;
}

// Top K Frequent Elements - O(n log k)
function topKFrequent(nums, k) {
    const freq = countFrequency(nums);
    
    // Convert to array and sort by frequency
    const freqArray = Array.from(freq.entries());
    freqArray.sort((a, b) => b[1] - a[1]);
    
    return freqArray.slice(0, k).map(entry => entry[0]);
}

// ===== HASH SET OPERATIONS =====

// Union of two sets
function union(set1, set2) {
    const result = new Set(set1);
    for (let item of set2) {
        result.add(item);
    }
    return result;
}

// Intersection of two sets
function intersectionSets(set1, set2) {
    const result = new Set();
    for (let item of set1) {
        if (set2.has(item)) {
            result.add(item);
        }
    }
    return result;
}

// Difference of two sets
function difference(set1, set2) {
    const result = new Set();
    for (let item of set1) {
        if (!set2.has(item)) {
            result.add(item);
        }
    }
    return result;
}

// Check if subset
function isSubset(subset, superset) {
    for (let item of subset) {
        if (!superset.has(item)) {
            return false;
        }
    }
    return true;
}

// ===== STRING HASHING PROBLEMS =====

// Longest Substring Without Repeating Characters - O(n)
function lengthOfLongestSubstring(s) {
    const charIndex = new Map();
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        const char = s[end];
        
        if (charIndex.has(char) && charIndex.get(char) >= start) {
            start = charIndex.get(char) + 1;
        }
        
        charIndex.set(char, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

// Find All Anagrams in String - O(n)
function findAnagrams(s, p) {
    const result = [];
    const pCount = countFrequency(p.split(''));
    const windowCount = new Map();
    
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Add character to window
        const rightChar = s[right];
        windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
        
        // Shrink window if needed
        if (right - left + 1 > p.length) {
            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            if (windowCount.get(leftChar) === 0) {
                windowCount.delete(leftChar);
            }
            left++;
        }
        
        // Check if window matches p
        if (right - left + 1 === p.length && mapsEqual(windowCount, pCount)) {
            result.push(left);
        }
    }
    
    return result;
}

function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    
    for (let [key, value] of map1) {
        if (map2.get(key) !== value) return false;
    }
    
    return true;
}

// ===== HASH TABLE WITH CUSTOM OBJECTS =====

// Employee class for hashing
class Employee {
    constructor(id, name, department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }
    
    // Custom hash function for employee
    getHash() {
        return this.id; // Simple hash based on ID
    }
    
    equals(other) {
        return this.id === other.id;
    }
}

// Employee hash table
class EmployeeHashTable {
    constructor(size = 53) {
        this.size = size;
        this.buckets = new Array(size);
    }
    
    _hash(employee) {
        return employee.getHash() % this.size;
    }
    
    add(employee) {
        const index = this._hash(employee);
        
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        
        // Check if employee already exists
        for (let emp of this.buckets[index]) {
            if (emp.equals(employee)) {
                return false; // Already exists
            }
        }
        
        this.buckets[index].push(employee);
        return true;
    }
    
    find(employee) {
        const index = this._hash(employee);
        
        if (this.buckets[index]) {
            for (let emp of this.buckets[index]) {
                if (emp.equals(employee)) {
                    return emp;
                }
            }
        }
        
        return null;
    }
}

// ===== PERFORMANCE ANALYSIS =====

function analyzeHashTablePerformance() {
    console.log('=== Hash Table Performance Analysis ===');
    
    const map = new Map();
    const startTime = performance.now();
    
    // Insert 10000 elements
    for (let i = 0; i < 10000; i++) {
        map.set(`key${i}`, `value${i}`);
    }
    
    const insertTime = performance.now() - startTime;
    console.log(`Insert 10000 elements: ${insertTime.toFixed(2)}ms`);
    
    // Search for elements
    const searchStart = performance.now();
    for (let i = 0; i < 1000; i++) {
        map.get(`key${i}`);
    }
    
    const searchTime = performance.now() - searchStart;
    console.log(`Search 1000 elements: ${searchTime.toFixed(2)}ms`);
}

// ===== TEST FUNCTIONS =====

function testHashTable() {
    console.log('=== Testing Hash Table Operations ===');
    
    // Test basic operations
    const ht = new HashTable();
    ht.set('name', 'Alice');
    ht.set('age', 30);
    ht.set('city', 'New York');
    
    console.log('Get name:', ht.get('name')); // Alice
    console.log('Get age:', ht.get('age')); // 30
    console.log('Has city:', ht.has('city')); // true
    console.log('Has country:', ht.has('country')); // false
    
    // Test frequency counting
    const arr = [1, 2, 3, 2, 1, 3, 1];
    const freq = countFrequency(arr);
    console.log('Frequency count:', freq);
    
    // Test two sum
    console.log('Two sum [2,7,11,15], target 9:', twoSum([2, 7, 11, 15], 9));
    
    // Test anagram grouping
    const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    console.log('Group anagrams:', groupAnagrams(strs));
    
    // Test LRU Cache
    const lru = new LRUCache(2);
    lru.put(1, 1);
    lru.put(2, 2);
    console.log('LRU get(1):', lru.get(1)); // 1
    lru.put(3, 3); // Evicts key 2
    console.log('LRU get(2):', lru.get(2)); // -1
}