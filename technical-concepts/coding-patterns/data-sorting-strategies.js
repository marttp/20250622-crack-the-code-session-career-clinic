// Data Sorting Strategies - Making Operations Easier

// ===== STRATEGY 1: SORT FOR BINARY SEARCH =====

// Prepare array for binary search operations
function prepareForBinarySearch(data) {
    return data.sort((a, b) => a - b);
}

// Binary search after sorting
function searchAfterSort(nums, target) {
    const sorted = prepareForBinarySearch([...nums]);
    
    let left = 0;
    let right = sorted.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (sorted[mid] === target) {
            return mid;
        } else if (sorted[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Find closest element after sorting
function findClosestElement(nums, target) {
    const sorted = prepareForBinarySearch([...nums]);
    
    let left = 0;
    let right = sorted.length - 1;
    let closest = sorted[0];
    let minDiff = Math.abs(sorted[0] - target);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const diff = Math.abs(sorted[mid] - target);
        
        if (diff < minDiff) {
            minDiff = diff;
            closest = sorted[mid];
        }
        
        if (sorted[mid] === target) {
            return sorted[mid];
        } else if (sorted[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return closest;
}

// ===== STRATEGY 2: SORT FOR MERGE OPERATIONS =====

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
            // Overlapping intervals, merge them
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // Non-overlapping interval
            merged.push(current);
        }
    }
    
    return merged;
}

// Insert Interval
function insertInterval(intervals, newInterval) {
    intervals.push(newInterval);
    return mergeIntervals(intervals);
}

// Meeting Rooms II (Minimum conference rooms needed)
function minMeetingRooms(intervals) {
    if (intervals.length === 0) return 0;
    
    // Sort intervals by start time
    const starts = intervals.map(interval => interval[0]).sort((a, b) => a - b);
    const ends = intervals.map(interval => interval[1]).sort((a, b) => a - b);
    
    let rooms = 0;
    let endPointer = 0;
    
    for (let i = 0; i < starts.length; i++) {
        if (starts[i] >= ends[endPointer]) {
            endPointer++;
        } else {
            rooms++;
        }
    }
    
    return rooms;
}

// ===== STRATEGY 3: SORT FOR DUPLICATE DETECTION =====

// Find duplicates by sorting first
function findDuplicatesSorted(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const duplicates = [];
    
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i - 1] && !duplicates.includes(sorted[i])) {
            duplicates.push(sorted[i]);
        }
    }
    
    return duplicates;
}

// Remove duplicates from sorted array
function removeDuplicatesSorted(nums) {
    if (nums.length === 0) return 0;
    
    nums.sort((a, b) => a - b);
    let writeIndex = 1;
    
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    return writeIndex;
}

// Find missing number in range [1, n]
function findMissingNumber(nums, n) {
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return n;
}

// ===== STRATEGY 4: SORT FOR FREQUENCY ANALYSIS =====

// Sort by frequency, then by value
function sortByFrequency(arr) {
    // Count frequencies
    const freq = new Map();
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

// Top K frequent elements
function topKFrequent(nums, k) {
    const freq = new Map();
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // Convert to array and sort by frequency
    const freqArray = Array.from(freq.entries());
    freqArray.sort((a, b) => b[1] - a[1]);
    
    return freqArray.slice(0, k).map(entry => entry[0]);
}

// Group elements by frequency
function groupByFrequency(arr) {
    const freq = new Map();
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    
    const groups = new Map();
    for (let [item, count] of freq) {
        if (!groups.has(count)) {
            groups.set(count, []);
        }
        groups.get(count).push(item);
    }
    
    return groups;
}

// ===== STRATEGY 5: SORT FOR GREEDY ALGORITHMS =====

// Activity Selection Problem
function activitySelection(activities) {
    // Sort by end time
    activities.sort((a, b) => a[1] - b[1]);
    
    const selected = [activities[0]];
    let lastEndTime = activities[0][1];
    
    for (let i = 1; i < activities.length; i++) {
        if (activities[i][0] >= lastEndTime) {
            selected.push(activities[i]);
            lastEndTime = activities[i][1];
        }
    }
    
    return selected;
}

// Fractional Knapsack
function fractionalKnapsack(items, capacity) {
    // Sort by value-to-weight ratio (descending)
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    const solution = [];
    
    for (let item of items) {
        if (remainingCapacity >= item.weight) {
            // Take whole item
            totalValue += item.value;
            remainingCapacity -= item.weight;
            solution.push({ ...item, fraction: 1 });
        } else if (remainingCapacity > 0) {
            // Take fraction of item
            const fraction = remainingCapacity / item.weight;
            totalValue += item.value * fraction;
            solution.push({ ...item, fraction });
            remainingCapacity = 0;
            break;
        }
    }
    
    return { totalValue, solution };
}

// ===== STRATEGY 6: SORT FOR OPTIMIZATION =====

// Minimum number of arrows to burst balloons
function findMinArrowShots(points) {
    if (points.length === 0) return 0;
    
    // Sort by end coordinate
    points.sort((a, b) => a[1] - b[1]);
    
    let arrows = 1;
    let arrowPos = points[0][1];
    
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > arrowPos) {
            arrows++;
            arrowPos = points[i][1];
        }
    }
    
    return arrows;
}

// Non-overlapping intervals (minimum removals)
function eraseOverlapIntervals(intervals) {
    if (intervals.length <= 1) return 0;
    
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let lastEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < lastEnd) {
            count++; // Remove current interval
        } else {
            lastEnd = intervals[i][1];
        }
    }
    
    return count;
}

// ===== STRATEGY 7: SORT FOR ARRAY PROBLEMS =====

// Three Sum (avoid duplicates)
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates
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

// Two Sum II (sorted array)
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

// ===== STRATEGY 8: SORT FOR STRING PROBLEMS =====

// Group anagrams by sorting
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

// Custom string sorting
function customSort(order, str) {
    const orderMap = new Map();
    for (let i = 0; i < order.length; i++) {
        orderMap.set(order[i], i);
    }
    
    return str.split('').sort((a, b) => {
        const orderA = orderMap.has(a) ? orderMap.get(a) : order.length;
        const orderB = orderMap.has(b) ? orderMap.get(b) : order.length;
        return orderA - orderB;
    }).join('');
}

// ===== STRATEGY 9: MULTI-CRITERIA SORTING =====

// Sort by multiple criteria
function multiCriteriaSort(people) {
    return people.sort((a, b) => {
        // Primary: age (ascending)
        if (a.age !== b.age) {
            return a.age - b.age;
        }
        
        // Secondary: name (alphabetical)
        if (a.name !== b.name) {
            return a.name.localeCompare(b.name);
        }
        
        // Tertiary: score (descending)
        return b.score - a.score;
    });
}

// Queue reconstruction by height
function reconstructQueue(people) {
    // Sort by height (desc), then by count (asc)
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

// ===== UTILITY FUNCTIONS =====

// Generic sorting function with custom comparator
function sortWithComparator(arr, compareFn) {
    return arr.sort(compareFn);
}

// Sort stability check
function isStableSort(originalItems, sortedItems, keyFn) {
    // Group by key
    const groups = new Map();
    for (let i = 0; i < originalItems.length; i++) {
        const key = keyFn(originalItems[i]);
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(i);
    }
    
    // Check if relative order is preserved
    for (let [key, indices] of groups) {
        let lastIndex = -1;
        
        for (let item of sortedItems) {
            if (keyFn(item) === key) {
                const originalIndex = originalItems.indexOf(item, lastIndex + 1);
                if (originalIndex <= lastIndex) {
                    return false;
                }
                lastIndex = originalIndex;
            }
        }
    }
    
    return true;
}

// ===== PERFORMANCE OPTIMIZATION =====

// Choose sorting strategy based on data characteristics
function chooseSortingStrategy(data, operation) {
    switch (operation) {
        case 'binary_search':
            return data.sort((a, b) => a - b);
        
        case 'merge_intervals':
            return data.sort((a, b) => a[0] - b[0]);
        
        case 'frequency_analysis':
            const freq = new Map();
            data.forEach(item => {
                freq.set(item, (freq.get(item) || 0) + 1);
            });
            return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);
        
        case 'duplicate_detection':
            return data.sort((a, b) => a - b);
        
        case 'range_queries':
            return data.sort((a, b) => a - b);
        
        default:
            return data.sort();
    }
}

// ===== TEST FUNCTIONS =====

function testSortingStrategies() {
    console.log('=== Testing Data Sorting Strategies ===');
    
    // Test binary search preparation
    const nums = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original:', nums);
    console.log('Prepared for binary search:', prepareForBinarySearch([...nums]));
    console.log('Search for 25:', searchAfterSort(nums, 25));
    
    // Test merge intervals
    const intervals = [[1,3],[2,6],[8,10],[15,18]];
    console.log('Merge intervals:', mergeIntervals([...intervals]));
    
    // Test frequency sorting
    const freqArray = [4, 6, 2, 2, 6, 4, 4, 4];
    console.log('Sort by frequency:', sortByFrequency([...freqArray]));
    
    // Test three sum
    console.log('Three sum [-1,0,1,2,-1,-4]:', threeSum([-1, 0, 1, 2, -1, -4]));
    
    // Test group anagrams
    const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    console.log('Group anagrams:', groupAnagrams(words));
    
    // Test activity selection
    const activities = [[1,4], [3,5], [0,6], [5,7], [3,9], [5,9], [6,10], [8,11], [8,12], [2,14], [12,16]];
    console.log('Activity selection:', activitySelection([...activities]));
    
    // Test multi-criteria sort
    const people = [
        {name: 'Alice', age: 30, score: 95},
        {name: 'Bob', age: 25, score: 87},
        {name: 'Charlie', age: 30, score: 92},
        {name: 'Alice', age: 25, score: 95}
    ];
    console.log('Multi-criteria sort:', multiCriteriaSort([...people]));
}