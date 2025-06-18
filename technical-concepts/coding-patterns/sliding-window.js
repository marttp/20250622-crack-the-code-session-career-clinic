// Sliding Window Pattern - Efficient Subarray/Substring Problems

// ===== PATTERN 1: FIXED WINDOW SIZE =====

// Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
    if (arr.length < k) return null;
    
    // Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    let maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Average of Subarrays of Size K
function averageOfSubarrays(arr, k) {
    const result = [];
    let windowSum = 0;
    
    // Calculate first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    result.push(windowSum / k);
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result.push(windowSum / k);
    }
    
    return result;
}

// Contains Duplicate III (within range and value difference)
function containsNearbyAlmostDuplicate(nums, k, t) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j <= Math.min(i + k, nums.length - 1); j++) {
            if (Math.abs(nums[i] - nums[j]) <= t) {
                return true;
            }
        }
    }
    return false;
}

// ===== PATTERN 2: VARIABLE WINDOW SIZE =====

// Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Shrink window until no duplicates
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Minimum Window Substring
function minWindow(s, t) {
    if (s.length < t.length) return "";
    
    const tFreq = new Map();
    for (let char of t) {
        tFreq.set(char, (tFreq.get(char) || 0) + 1);
    }
    
    const windowFreq = new Map();
    let left = 0;
    let formed = 0;
    let required = tFreq.size;
    let minLen = Infinity;
    let minStart = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Add character from right
        const char = s[right];
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        if (tFreq.has(char) && windowFreq.get(char) === tFreq.get(char)) {
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
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
            
            if (tFreq.has(leftChar) && windowFreq.get(leftChar) < tFreq.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

// Longest Substring with At Most K Distinct Characters
function lengthOfLongestSubstringKDistinct(s, k) {
    if (k === 0) return 0;
    
    const charFreq = new Map();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charFreq.set(char, (charFreq.get(char) || 0) + 1);
        
        // Shrink window if more than k distinct characters
        while (charFreq.size > k) {
            const leftChar = s[left];
            charFreq.set(leftChar, charFreq.get(leftChar) - 1);
            
            if (charFreq.get(leftChar) === 0) {
                charFreq.delete(leftChar);
            }
            
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// ===== PATTERN 3: SUBARRAY PROBLEMS =====

// Subarray Sum Equals K (Count)
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
    prefixSums.set(0, -1); // Empty subarray
    
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

// Minimum Size Subarray Sum (greater than or equal to target)
function minSubArrayLen(target, nums) {
    let left = 0;
    let sum = 0;
    let minLen = Infinity;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}

// ===== PATTERN 4: CHARACTER FREQUENCY PROBLEMS =====

// Permutation in String
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const s1Freq = new Map();
    for (let char of s1) {
        s1Freq.set(char, (s1Freq.get(char) || 0) + 1);
    }
    
    const windowFreq = new Map();
    let left = 0;
    
    for (let right = 0; right < s2.length; right++) {
        const char = s2[right];
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Shrink window if larger than s1
        if (right - left + 1 > s1.length) {
            const leftChar = s2[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
            if (windowFreq.get(leftChar) === 0) {
                windowFreq.delete(leftChar);
            }
            left++;
        }
        
        // Check if current window is permutation of s1
        if (right - left + 1 === s1.length && mapsEqual(windowFreq, s1Freq)) {
            return true;
        }
    }
    
    return false;
}

// Find All Anagrams in String
function findAnagrams(s, p) {
    if (p.length > s.length) return [];
    
    const pFreq = new Map();
    for (let char of p) {
        pFreq.set(char, (pFreq.get(char) || 0) + 1);
    }
    
    const result = [];
    const windowFreq = new Map();
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Shrink window if larger than p
        if (right - left + 1 > p.length) {
            const leftChar = s[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
            if (windowFreq.get(leftChar) === 0) {
                windowFreq.delete(leftChar);
            }
            left++;
        }
        
        // Check if current window is anagram of p
        if (right - left + 1 === p.length && mapsEqual(windowFreq, pFreq)) {
            result.push(left);
        }
    }
    
    return result;
}

// Longest Repeating Character Replacement
function characterReplacement(s, k) {
    const charFreq = new Map();
    let left = 0;
    let maxCount = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charFreq.set(char, (charFreq.get(char) || 0) + 1);
        maxCount = Math.max(maxCount, charFreq.get(char));
        
        // If window size - maxCount > k, shrink window
        if (right - left + 1 - maxCount > k) {
            const leftChar = s[left];
            charFreq.set(leftChar, charFreq.get(leftChar) - 1);
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// ===== PATTERN 5: MAXIMUM/MINIMUM IN WINDOW =====

// Sliding Window Maximum
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove smaller elements (they can't be maximum)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add maximum to result when window is full
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// Sliding Window Minimum
function minSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove larger elements (they can't be minimum)
        while (deque.length > 0 && nums[deque[deque.length - 1]] > nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add minimum to result when window is full
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// ===== PATTERN 6: FRUITS AND BASKETS TYPE =====

// Fruit Into Baskets (at most 2 types)
function totalFruit(fruits) {
    const fruitCount = new Map();
    let left = 0;
    let maxFruits = 0;
    
    for (let right = 0; right < fruits.length; right++) {
        const fruit = fruits[right];
        fruitCount.set(fruit, (fruitCount.get(fruit) || 0) + 1);
        
        // Shrink window if more than 2 types
        while (fruitCount.size > 2) {
            const leftFruit = fruits[left];
            fruitCount.set(leftFruit, fruitCount.get(leftFruit) - 1);
            
            if (fruitCount.get(leftFruit) === 0) {
                fruitCount.delete(leftFruit);
            }
            
            left++;
        }
        
        maxFruits = Math.max(maxFruits, right - left + 1);
    }
    
    return maxFruits;
}

// ===== UTILITY FUNCTIONS =====

// Helper function to compare two maps
function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    
    for (let [key, value] of map1) {
        if (map2.get(key) !== value) return false;
    }
    
    return true;
}

// Get all subarrays of size k
function getSubarraysOfSizeK(arr, k) {
    const result = [];
    
    for (let i = 0; i <= arr.length - k; i++) {
        result.push(arr.slice(i, i + k));
    }
    
    return result;
}

// Check if substring exists with given constraints
function hasSubstringWithConstraints(s, minLen, maxLen, allowedChars) {
    const allowed = new Set(allowedChars);
    
    for (let len = minLen; len <= maxLen; len++) {
        for (let i = 0; i <= s.length - len; i++) {
            const substring = s.substring(i, i + len);
            let valid = true;
            
            for (let char of substring) {
                if (!allowed.has(char)) {
                    valid = false;
                    break;
                }
            }
            
            if (valid) return true;
        }
    }
    
    return false;
}

// ===== ADVANCED PROBLEMS =====

// Longest Substring with At Most Two Distinct Characters
function lengthOfLongestSubstringTwoDistinct(s) {
    return lengthOfLongestSubstringKDistinct(s, 2);
}

// Minimum Window Subsequence
function minWindowSubsequence(s, t) {
    let minStart = -1;
    let minLen = Infinity;
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === t[0]) {
            let si = i;
            let ti = 0;
            
            // Find subsequence
            while (si < s.length && ti < t.length) {
                if (s[si] === t[ti]) {
                    ti++;
                }
                si++;
            }
            
            if (ti === t.length) {
                // Found subsequence, now shrink from left
                si--; // Move back to last matched character
                ti--;
                
                while (ti >= 0) {
                    if (s[si] === t[ti]) {
                        ti--;
                    }
                    si--;
                }
                
                si++; // Adjust to valid start
                
                if (si - i + 1 < minLen) {
                    minLen = si - i + 1;
                    minStart = i;
                }
            }
        }
    }
    
    return minStart === -1 ? "" : s.substring(minStart, minStart + minLen);
}

// ===== TEST FUNCTIONS =====

function testSlidingWindow() {
    console.log('=== Testing Sliding Window Patterns ===');
    
    // Test Max Sum Subarray
    console.log('Max sum subarray of size 3 in [2,1,5,1,3,2]:', 
                maxSumSubarray([2, 1, 5, 1, 3, 2], 3));
    
    // Test Longest Substring Without Repeating
    console.log('Longest substring without repeating "abcabcbb":', 
                lengthOfLongestSubstring("abcabcbb"));
    
    // Test Minimum Window Substring
    console.log('Minimum window substring S="ADOBECODEBANC", T="ABC":', 
                minWindow("ADOBECODEBANC", "ABC"));
    
    // Test Subarray Sum Equals K
    console.log('Subarray sum equals 7 in [3,4,7,2,-3,1,4,2]:', 
                subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7));
    
    // Test Permutation in String
    console.log('Permutation of "ab" in "eidbaooo":', 
                checkInclusion("ab", "eidbaooo"));
    
    // Test Find Anagrams
    console.log('Find anagrams of "ab" in "abab":', 
                findAnagrams("abab", "ab"));
    
    // Test Sliding Window Maximum
    console.log('Sliding window maximum [1,3,-1,-3,5,3,6,7], k=3:', 
                maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
    
    // Test Character Replacement
    console.log('Longest repeating character replacement "ABAB", k=2:', 
                characterReplacement("ABAB", 2));
    
    // Test Fruit Into Baskets
    console.log('Total fruit [1,2,1]:', totalFruit([1, 2, 1]));
    console.log('Total fruit [0,1,2,2]:', totalFruit([0, 1, 2, 2]));
}