// Hash Table Patterns - Map and Set Usage in Coding Interviews

// ===== PATTERN 1: FREQUENCY COUNTING =====

// Count character frequency
function charFrequency(str) {
    const freq = new Map();
    
    for (let char of str) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    return freq;
}

// Count array element frequency
function arrayFrequency(arr) {
    const freq = new Map();
    
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    
    return freq;
}

// Most frequent character
function mostFrequentChar(str) {
    const freq = charFrequency(str);
    let maxChar = '';
    let maxCount = 0;
    
    for (let [char, count] of freq) {
        if (count > maxCount) {
            maxCount = count;
            maxChar = char;
        }
    }
    
    return maxChar;
}

// ===== PATTERN 2: TWO SUM VARIATIONS =====

// Classic Two Sum - O(n)
function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}

// Two Sum - Return values instead of indices
function twoSumValues(nums, target) {
    const numSet = new Set();
    
    for (let num of nums) {
        const complement = target - num;
        
        if (numSet.has(complement)) {
            return [complement, num];
        }
        
        numSet.add(num);
    }
    
    return [];
}

// Two Sum - Count pairs
function twoSumCount(nums, target) {
    const freq = arrayFrequency(nums);
    let count = 0;
    
    for (let [num, frequency] of freq) {
        const complement = target - num;
        
        if (num === complement) {
            // Same number case: n*(n-1)/2 pairs
            count += (frequency * (frequency - 1)) / 2;
        } else if (freq.has(complement) && num < complement) {
            // Different numbers case: avoid double counting
            count += frequency * freq.get(complement);
        }
    }
    
    return count;
}

// ===== PATTERN 3: ANAGRAM PROBLEMS =====

// Valid Anagram
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const charCount = new Map();
    
    // Count characters in s
    for (let char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Subtract characters in t
    for (let char of t) {
        if (!charCount.has(char)) return false;
        
        charCount.set(char, charCount.get(char) - 1);
        if (charCount.get(char) === 0) {
            charCount.delete(char);
        }
    }
    
    return charCount.size === 0;
}

// Group Anagrams
function groupAnagrams(strs) {
    const groups = new Map();
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        
        groups.get(key).push(str);
    }
    
    return Array.from(groups.values());
}

// Find All Anagrams in String
function findAnagrams(s, p) {
    const result = [];
    const pFreq = charFrequency(p);
    const windowFreq = new Map();
    
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Add character to window
        const rightChar = s[right];
        windowFreq.set(rightChar, (windowFreq.get(rightChar) || 0) + 1);
        
        // Shrink window if needed
        if (right - left + 1 > p.length) {
            const leftChar = s[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
            if (windowFreq.get(leftChar) === 0) {
                windowFreq.delete(leftChar);
            }
            left++;
        }
        
        // Check if window is anagram of p
        if (right - left + 1 === p.length && mapsEqual(windowFreq, pFreq)) {
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

// ===== PATTERN 4: DUPLICATE DETECTION =====

// Contains Duplicate
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

// Contains Duplicate II (within distance k)
function containsNearbyDuplicate(nums, k) {
    const indexMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        if (indexMap.has(nums[i])) {
            if (i - indexMap.get(nums[i]) <= k) {
                return true;
            }
        }
        indexMap.set(nums[i], i);
    }
    
    return false;
}

// Find First Non-Repeating Character
function firstUniqueChar(s) {
    const charCount = charFrequency(s);
    
    for (let i = 0; i < s.length; i++) {
        if (charCount.get(s[i]) === 1) {
            return i;
        }
    }
    
    return -1;
}

// ===== PATTERN 5: SET OPERATIONS =====

// Intersection of Two Arrays
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

// Union of Two Arrays
function union(nums1, nums2) {
    const result = new Set([...nums1, ...nums2]);
    return Array.from(result);
}

// Difference of Two Arrays
function difference(nums1, nums2) {
    const set2 = new Set(nums2);
    const result = [];
    
    for (let num of nums1) {
        if (!set2.has(num)) {
            result.push(num);
        }
    }
    
    return result;
}

// ===== PATTERN 6: SUBSTRING PROBLEMS =====

// Longest Substring Without Repeating Characters
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

// Minimum Window Substring
function minWindow(s, t) {
    if (s.length < t.length) return "";
    
    const tCount = charFrequency(t);
    const windowCount = new Map();
    
    let left = 0, right = 0;
    let formed = 0;
    let required = tCount.size;
    let minLen = Infinity;
    let minStart = 0;
    
    while (right < s.length) {
        // Add character from right
        const char = s[right];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);
        
        if (tCount.has(char) && windowCount.get(char) === tCount.get(char)) {
            formed++;
        }
        
        // Try to shrink window
        while (left <= right && formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            // Remove character from left
            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            
            if (tCount.has(leftChar) && windowCount.get(leftChar) < tCount.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
        
        right++;
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

// ===== PATTERN 7: ARRAY SUM PROBLEMS =====

// Subarray Sum Equals K
function subarraySum(nums, k) {
    const prefixSums = new Map();
    prefixSums.set(0, 1); // Empty subarray
    
    let count = 0;
    let sum = 0;
    
    for (let num of nums) {
        sum += num;
        
        if (prefixSums.has(sum - k)) {
            count += prefixSums.get(sum - k);
        }
        
        prefixSums.set(sum, (prefixSums.get(sum) || 0) + 1);
    }
    
    return count;
}

// Maximum Size Subarray Sum Equals K
function maxSubArrayLen(nums, k) {
    const prefixSums = new Map();
    prefixSums.set(0, -1); // Empty subarray at index -1
    
    let maxLen = 0;
    let sum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        
        if (prefixSums.has(sum - k)) {
            maxLen = Math.max(maxLen, i - prefixSums.get(sum - k));
        }
        
        if (!prefixSums.has(sum)) {
            prefixSums.set(sum, i);
        }
    }
    
    return maxLen;
}

// ===== PATTERN 8: TOP K PROBLEMS =====

// Top K Frequent Elements
function topKFrequent(nums, k) {
    const freq = arrayFrequency(nums);
    
    // Convert to array and sort by frequency
    const freqArray = Array.from(freq.entries());
    freqArray.sort((a, b) => b[1] - a[1]);
    
    return freqArray.slice(0, k).map(entry => entry[0]);
}

// Top K Frequent Words
function topKFrequentWords(words, k) {
    const freq = arrayFrequency(words);
    
    // Convert to array and sort by frequency (desc), then by word (asc)
    const freqArray = Array.from(freq.entries());
    freqArray.sort((a, b) => {
        if (a[1] !== b[1]) {
            return b[1] - a[1]; // Frequency descending
        }
        return a[0].localeCompare(b[0]); // Word ascending
    });
    
    return freqArray.slice(0, k).map(entry => entry[0]);
}

// ===== PATTERN 9: DESIGN PROBLEMS =====

// Design HashMap
class MyHashMap {
    constructor() {
        this.size = 769; // Prime number
        this.buckets = Array(this.size).fill(null).map(() => []);
    }
    
    _hash(key) {
        return key % this.size;
    }
    
    put(key, value) {
        const bucket = this.buckets[this._hash(key)];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        
        bucket.push([key, value]);
    }
    
    get(key) {
        const bucket = this.buckets[this._hash(key)];
        
        for (let [k, v] of bucket) {
            if (k === key) return v;
        }
        
        return -1;
    }
    
    remove(key) {
        const bucket = this.buckets[this._hash(key)];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return;
            }
        }
    }
}

// Design HashSet
class MyHashSet {
    constructor() {
        this.size = 769;
        this.buckets = Array(this.size).fill(null).map(() => []);
    }
    
    _hash(key) {
        return key % this.size;
    }
    
    add(key) {
        const bucket = this.buckets[this._hash(key)];
        
        if (!bucket.includes(key)) {
            bucket.push(key);
        }
    }
    
    remove(key) {
        const bucket = this.buckets[this._hash(key)];
        const index = bucket.indexOf(key);
        
        if (index !== -1) {
            bucket.splice(index, 1);
        }
    }
    
    contains(key) {
        const bucket = this.buckets[this._hash(key)];
        return bucket.includes(key);
    }
}

// ===== UTILITY FUNCTIONS =====

// Check if two arrays have same elements (order doesn't matter)
function haveSameElements(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    const freq1 = arrayFrequency(arr1);
    const freq2 = arrayFrequency(arr2);
    
    return mapsEqual(freq1, freq2);
}

// Remove duplicates while preserving order
function removeDuplicatesPreserveOrder(arr) {
    const seen = new Set();
    const result = [];
    
    for (let item of arr) {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    }
    
    return result;
}

// Find missing number in array
function findMissingNumber(nums, n) {
    const numSet = new Set(nums);
    
    for (let i = 1; i <= n; i++) {
        if (!numSet.has(i)) {
            return i;
        }
    }
    
    return -1;
}

// ===== TEST FUNCTIONS =====

function testHashTablePatterns() {
    console.log('=== Testing Hash Table Patterns ===');
    
    // Test Two Sum
    console.log('Two Sum [2,7,11,15], target 9:', twoSum([2, 7, 11, 15], 9));
    
    // Test Anagram
    console.log('Is "listen" anagram of "silent"?', isAnagram('listen', 'silent'));
    
    // Test Group Anagrams
    const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    console.log('Group anagrams:', groupAnagrams(strs));
    
    // Test Contains Duplicate
    console.log('Contains duplicate [1,2,3,1]:', containsDuplicate([1, 2, 3, 1]));
    
    // Test Intersection
    console.log('Intersection [1,2,2,1] and [2,2]:', intersection([1, 2, 2, 1], [2, 2]));
    
    // Test Longest Substring
    console.log('Longest substring without repeating "abcabcbb":', 
                lengthOfLongestSubstring('abcabcbb'));
    
    // Test Subarray Sum
    console.log('Subarray sum equals 7 in [3,4,7,2,-3,1,4,2]:', 
                subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7));
    
    // Test Top K Frequent
    console.log('Top 2 frequent in [1,1,1,2,2,3]:', topKFrequent([1, 1, 1, 2, 2, 3], 2));
}