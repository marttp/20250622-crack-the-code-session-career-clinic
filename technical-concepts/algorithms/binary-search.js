// Binary Search - Concept and Implementation Examples

// ===== BASIC BINARY SEARCH =====

// Iterative Binary Search
function binarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Target not found
}

// Recursive Binary Search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// ===== BINARY SEARCH VARIATIONS =====

// Find First Occurrence
function findFirstOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left for first occurrence
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find Last Occurrence
function findLastOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right for last occurrence
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Count Occurrences
function countOccurrences(arr, target) {
    const first = findFirstOccurrence(arr, target);
    if (first === -1) return 0;
    
    const last = findLastOccurrence(arr, target);
    return last - first + 1;
}

// ===== ADVANCED BINARY SEARCH PROBLEMS =====

// Search in Rotated Sorted Array
function searchRotatedArray(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Find Minimum in Rotated Sorted Array
function findMinInRotatedArray(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            // Minimum is in right half
            left = mid + 1;
        } else {
            // Minimum is in left half (including mid)
            right = mid;
        }
    }
    
    return nums[left];
}

// Search for a Range (Find First and Last Position)
function searchRange(nums, target) {
    return [findFirstOccurrence(nums, target), findLastOccurrence(nums, target)];
}

// ===== BINARY SEARCH ON ANSWER =====

// Find Square Root (Integer)
function mySqrt(x) {
    if (x < 2) return x;
    
    let left = 2;
    let right = Math.floor(x / 2);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;
        
        if (square === x) return mid;
        if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return right; // Return floor of square root
}

// Find Peak Element
function findPeakElement(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[mid + 1]) {
            // Peak is in left half (including mid)
            right = mid;
        } else {
            // Peak is in right half
            left = mid + 1;
        }
    }
    
    return left;
}

// Search in 2D Matrix
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let left = 0;
    let right = rows * cols - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = matrix[Math.floor(mid / cols)][mid % cols];
        
        if (midValue === target) return true;
        if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}

// ===== PRACTICAL EXAMPLES =====

// Binary Search in Real-World Scenario: Find Version
function findBadVersion(n) {
    let left = 1;
    let right = n;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (isBadVersion(mid)) {
            right = mid; // First bad version is at mid or before
        } else {
            left = mid + 1; // First bad version is after mid
        }
    }
    
    return left;
}

// Mock implementation of isBadVersion (would be provided by system)
function isBadVersion(version) {
    // This would be implemented by the system
    // Returns true if version is bad, false otherwise
    const firstBadVersion = 4; // Example
    return version >= firstBadVersion;
}

// Capacity To Ship Packages Within D Days
function shipWithinDays(weights, days) {
    let left = Math.max(...weights); // Minimum capacity needed
    let right = weights.reduce((sum, weight) => sum + weight, 0); // Maximum capacity
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canShipWithCapacity(weights, days, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

function canShipWithCapacity(weights, days, capacity) {
    let daysNeeded = 1;
    let currentWeight = 0;
    
    for (let weight of weights) {
        if (currentWeight + weight > capacity) {
            daysNeeded++;
            currentWeight = weight;
        } else {
            currentWeight += weight;
        }
    }
    
    return daysNeeded <= days;
}

// ===== BINARY SEARCH TEMPLATE =====

// Generic Binary Search Template
function binarySearchTemplate(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found target
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}

// Template for finding boundaries
function findBoundary(arr, condition) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (condition(arr[mid])) {
            result = mid;
            // Depending on what boundary you're looking for:
            // For leftmost: right = mid - 1
            // For rightmost: left = mid + 1
        } else {
            // Adjust left or right based on condition
        }
    }
    
    return result;
}

// ===== COMMON PITFALLS AND TIPS =====

/*
1. Integer Overflow: Use Math.floor((left + right) / 2) instead of (left + right) >> 1
2. Infinite Loop: Make sure to update left or right in each iteration
3. Off-by-one Errors: Be careful with <= vs < in while condition
4. Array Bounds: Ensure mid doesn't go out of bounds
5. Sorted Array: Binary search only works on sorted arrays
6. Equal Elements: Handle duplicates carefully in boundary searches
*/

// Test Functions
function testBinarySearch() {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15];
    console.log(binarySearchIterative(arr, 7)); // Should return 3
    console.log(binarySearchIterative(arr, 6)); // Should return -1
    
    const arrWithDuplicates = [1, 2, 2, 2, 3, 4, 5];
    console.log(findFirstOccurrence(arrWithDuplicates, 2)); // Should return 1
    console.log(findLastOccurrence(arrWithDuplicates, 2));  // Should return 3
    console.log(countOccurrences(arrWithDuplicates, 2));    // Should return 3
}