// Linked Lists - Quick Implementation and Examples

// ===== NODE STRUCTURE =====

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ===== SINGLY LINKED LIST =====

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Insert at beginning - O(1)
    prepend(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        this.size++;
    }
    
    // Insert at end - O(n)
    append(val) {
        const newNode = new ListNode(val);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    // Insert at specific index - O(n)
    insertAt(index, val) {
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }
        
        if (index === 0) {
            this.prepend(val);
            return;
        }
        
        const newNode = new ListNode(val);
        let current = this.head;
        
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }
    
    // Find element - O(n)
    find(val) {
        let current = this.head;
        let index = 0;
        
        while (current) {
            if (current.val === val) {
                return { node: current, index };
            }
            current = current.next;
            index++;
        }
        
        return null;
    }
    
    // Delete by value - O(n)
    delete(val) {
        if (!this.head) return false;
        
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.val !== val) {
            current = current.next;
        }
        
        if (current.next) {
            current.next = current.next.next;
            this.size--;
            return true;
        }
        
        return false;
    }
    
    // Delete at index - O(n)
    deleteAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        
        if (index === 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        current.next = current.next.next;
        this.size--;
    }
    
    // Get element at index - O(n)
    get(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.val;
    }
    
    // Get size - O(1)
    getSize() {
        return this.size;
    }
    
    // Check if empty - O(1)
    isEmpty() {
        return this.size === 0;
    }
    
    // Convert to array - O(n)
    toArray() {
        const result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        return result;
    }
    
    // Clear list - O(1)
    clear() {
        this.head = null;
        this.size = 0;
    }
}

// ===== DOUBLY LINKED LIST NODE =====

class DoublyListNode {
    constructor(val = 0, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

// ===== DOUBLY LINKED LIST =====

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Insert at beginning - O(1)
    prepend(val) {
        const newNode = new DoublyListNode(val);
        
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        
        this.size++;
    }
    
    // Insert at end - O(1)
    append(val) {
        const newNode = new DoublyListNode(val);
        
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        
        this.size++;
    }
    
    // Delete from beginning - O(1)
    deleteFirst() {
        if (!this.head) return null;
        
        const val = this.head.val;
        
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        
        this.size--;
        return val;
    }
    
    // Delete from end - O(1)
    deleteLast() {
        if (!this.tail) return null;
        
        const val = this.tail.val;
        
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        
        this.size--;
        return val;
    }
}

// ===== COMMON LINKED LIST ALGORITHMS =====

// Reverse linked list - O(n)
function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev; // New head
}

// Find middle of linked list - O(n)
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

// Detect cycle in linked list - O(n)
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

// Find cycle start - O(n)
function findCycleStart(head) {
    if (!head || !head.next) return null;
    
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            break;
        }
    }
    
    if (!fast || !fast.next) return null; // No cycle
    
    // Find start of cycle
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow;
}

// Merge two sorted linked lists - O(n + m)
function mergeTwoSortedLists(l1, l2) {
    const dummy = new ListNode(0);
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
    
    // Attach remaining nodes
    current.next = l1 || l2;
    
    return dummy.next;
}

// Remove nth node from end - O(n)
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
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

// Check if linked list is palindrome - O(n)
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // Find middle
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let secondHalf = reverseLinkedList(slow.next);
    slow.next = null;
    
    // Compare first and second half
    let firstHalf = head;
    while (firstHalf && secondHalf) {
        if (firstHalf.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}

// Remove duplicates from sorted linked list - O(n)
function removeDuplicates(head) {
    if (!head) return head;
    
    let current = head;
    
    while (current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return head;
}

// Intersection of two linked lists - O(n + m)
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    
    let pA = headA;
    let pB = headB;
    
    // When one pointer reaches end, redirect to other list's head
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    
    return pA;
}

// ===== UTILITY FUNCTIONS =====

// Create linked list from array
function createLinkedListFromArray(arr) {
    if (arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

// Print linked list
function printLinkedList(head, name = 'List') {
    const arr = linkedListToArray(head);
    console.log(`${name}: ${arr.join(' -> ')} -> null`);
}

// ===== ADVANCED PATTERNS =====

// Add two numbers represented as linked lists - O(max(n, m))
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}

// Rotate linked list - O(n)
function rotateRight(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // Get length and make it circular
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    tail.next = head; // Make circular
    
    // Find new tail (length - k % length - 1 steps from head)
    k = k % length;
    let stepsToNewTail = length - k;
    
    let newTail = head;
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }
    
    const newHead = newTail.next;
    newTail.next = null; // Break the circle
    
    return newHead;
}

// ===== TEST FUNCTIONS =====

function testLinkedList() {
    console.log('=== Testing Linked List Operations ===');
    
    const list = new LinkedList();
    
    // Test insertions
    list.append(1);
    list.append(2);
    list.append(3);
    list.prepend(0);
    
    console.log('List after insertions:', list.toArray()); // [0, 1, 2, 3]
    
    // Test find
    const found = list.find(2);
    console.log('Found value 2 at index:', found ? found.index : 'not found');
    
    // Test deletion
    list.delete(1);
    console.log('List after deleting 1:', list.toArray()); // [0, 2, 3]
    
    // Test algorithms
    const testHead = createLinkedListFromArray([1, 2, 3, 4, 5]);
    printLinkedList(testHead, 'Original');
    
    const reversed = reverseLinkedList(testHead);
    printLinkedList(reversed, 'Reversed');
    
    const middle = findMiddle(createLinkedListFromArray([1, 2, 3, 4, 5]));
    console.log('Middle element:', middle ? middle.val : 'none');
}