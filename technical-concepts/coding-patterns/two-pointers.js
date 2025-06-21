// Two Pointers Pattern - Efficient Array and String Processing

// ===== PATTERN 1: OPPOSITE DIRECTION POINTERS =====

// Two Sum II - Input Array is Sorted
function twoSumSorted(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

// Valid Palindrome
function isPalindrome(s) {
    // Clean string: keep only alphanumeric, convert to lowercase
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Reverse String
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    
    return s;
}

// Container With Most Water
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const currentWater = width * minHeight;
        
        maxWater = Math.max(maxWater, currentWater);
        
        // Move pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// ===== PATTERN 2: THREE SUM PROBLEMS =====

// Three Sum
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first number
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

// Three Sum Closest
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closestSum = nums[0] + nums[1] + nums[2];
    
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];
            
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }
            
            if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return closestSum;
}

// ===== PATTERN 3: SAME DIRECTION POINTERS =====

// Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let writeIndex = 1;
    
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Remove Element
function removeElement(nums, val) {
    let writeIndex = 0;
    
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== val) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Move Zeros
function moveZeroes(nums) {
    let writeIndex = 0;
    
    // Move all non-zero elements to front
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== 0) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    // Fill remaining with zeros
    while (writeIndex < nums.length) {
        nums[writeIndex] = 0;
        writeIndex++;
    }
    
    return nums;
}

// Sort Colors (Dutch National Flag)
function sortColors(nums) {
    let left = 0;      // Boundary for 0s
    let current = 0;   // Current element
    let right = nums.length - 1; // Boundary for 2s
    
    while (current <= right) {
        if (nums[current] === 0) {
            [nums[left], nums[current]] = [nums[current], nums[left]];
            left++;
            current++;
        } else if (nums[current] === 1) {
            current++;
        } else { // nums[current] === 2
            [nums[current], nums[right]] = [nums[right], nums[current]];
            right--;
            // Don't increment current here
        }
    }
    
    return nums;
}

// ===== PATTERN 4: FAST AND SLOW POINTERS =====

// Linked List Cycle
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}

// Find Middle of Linked List
function findMiddle(head) {
    if (!head) return null;
    
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Remove Nth Node From End of List
function removeNthFromEnd(head, n) {
    const dummy = { next: head };
    let fast = dummy;
    let slow = dummy;
    
    // Move fast pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both pointers until fast reaches end
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // Remove nth node from end
    slow.next = slow.next.next;
    
    return dummy.next;
}

// ===== PATTERN 5: PARTITION PROBLEMS =====

// Partition Array
function partition(nums, pivot) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        while (left <= right && nums[left] < pivot) {
            left++;
        }
        
        while (left <= right && nums[right] >= pivot) {
            right--;
        }
        
        if (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }
    
    return left; // Index where partition ends
}

// Quick Select (Find Kth Largest Element)
function findKthLargest(nums, k) {
    function quickSelect(left, right, kSmallest) {
        if (left === right) return nums[left];
        
        const pivotIndex = partition(left, right);
        
        if (kSmallest === pivotIndex) {
            return nums[pivotIndex];
        } else if (kSmallest < pivotIndex) {
            return quickSelect(left, pivotIndex - 1, kSmallest);
        } else {
            return quickSelect(pivotIndex + 1, right, kSmallest);
        }
    }
    
    function partition(left, right) {
        const pivot = nums[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    }
    
    return quickSelect(0, nums.length - 1, nums.length - k);
}

// ===== PATTERN 6: SUBSTRING PROBLEMS =====

// Longest Palindromic Substring (Expand Around Centers)
function longestPalindrome(s) {
    if (!s || s.length === 0) return "";
    
    let start = 0;
    let maxLen = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLen = right - left + 1;
            if (currentLen > maxLen) {
                maxLen = currentLen;
                start = left;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // Odd length palindromes
        expandAroundCenter(i, i + 1); // Even length palindromes
    }
    
    return s.substring(start, start + maxLen);
}

// Valid Palindrome II (Remove at most one character)
function validPalindrome(s) {
    function isPalindromeRange(left, right) {
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            // Try removing left character or right character
            return isPalindromeRange(left + 1, right) || 
                   isPalindromeRange(left, right - 1);
        }
        left++;
        right--;
    }
    
    return true;
}

// ===== PATTERN 7: MERGE PROBLEMS =====

// Merge Sorted Array
function merge(nums1, m, nums2, n) {
    let i = m - 1;      // Last element in nums1
    let j = n - 1;      // Last element in nums2
    let k = m + n - 1;  // Last position in merged array
    
    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
    
    return nums1;
}

// Merge Two Sorted Lists
function mergeTwoLists(l1, l2) {
    const dummy = { next: null };
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    
    return dummy.next;
}

// ===== UTILITY FUNCTIONS =====

// Check if array is sorted
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Find pair with given sum in sorted array
function findPairWithSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) {
            return [arr[left], arr[right]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return null;
}

// Remove duplicates from sorted array II (keep at most 2)
function removeDuplicatesII(nums) {
    if (nums.length <= 2) return nums.length;
    
    let writeIndex = 2;
    
    for (let readIndex = 2; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[writeIndex - 2]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// ===== TEST FUNCTIONS =====

function testTwoPointers() {
    console.log('=== Testing Two Pointers Patterns ===');
    
    // Test Two Sum Sorted
    console.log('Two Sum Sorted [2,7,11,15], target 9:', 
                twoSumSorted([2, 7, 11, 15], 9));
    
    // Test Palindrome
    console.log('Is "A man a plan a canal Panama" palindrome?', 
                isPalindrome("A man, a plan, a canal: Panama"));
    
    // Test Three Sum
    console.log('Three Sum [-1,0,1,2,-1,-4]:', 
                threeSum([-1, 0, 1, 2, -1, -4]));
    
    // Test Container With Most Water
    console.log('Max Area [1,8,6,2,5,4,8,3,7]:', 
                maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
    
    // Test Remove Duplicates
    const arr = [1, 1, 2, 2, 2, 3];
    const newLength = removeDuplicates([...arr]);
    console.log(`Remove duplicates from [${arr}], new length:`, newLength);
    
    // Test Move Zeros
    console.log('Move zeros [0,1,0,3,12]:', 
                moveZeroes([0, 1, 0, 3, 12]));
    
    // Test Sort Colors
    console.log('Sort colors [2,0,2,1,1,0]:', 
                sortColors([2, 0, 2, 1, 1, 0]));
    
    // Test Longest Palindrome
    console.log('Longest palindrome in "babad":', 
                longestPalindrome("babad"));
    
    // Test Valid Palindrome II
    console.log('Valid palindrome II "aba":', validPalindrome("aba"));
    console.log('Valid palindrome II "abca":', validPalindrome("abca"));
}