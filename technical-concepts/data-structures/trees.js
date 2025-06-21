// Trees - Hierarchical Data Structure (Quick Overview)

// ===== TREE NODE STRUCTURE =====

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Generic tree node with multiple children
class GenericTreeNode {
    constructor(val = 0, children = []) {
        this.val = val;
        this.children = children;
    }
    
    addChild(child) {
        this.children.push(child);
    }
}

// ===== BINARY TREE TRAVERSALS =====

// Inorder Traversal (Left, Root, Right) - O(n)
function inorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        
        traverse(node.left);   // Left
        result.push(node.val); // Root
        traverse(node.right);  // Right
    }
    
    traverse(root);
    return result;
}

// Preorder Traversal (Root, Left, Right) - O(n)
function preorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        
        result.push(node.val); // Root
        traverse(node.left);   // Left
        traverse(node.right);  // Right
    }
    
    traverse(root);
    return result;
}

// Postorder Traversal (Left, Right, Root) - O(n)
function postorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        
        traverse(node.left);   // Left
        traverse(node.right);  // Right
        result.push(node.val); // Root
    }
    
    traverse(root);
    return result;
}

// Level Order Traversal (BFS) - O(n)
function levelOrderTraversal(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// ===== BINARY TREE PROPERTIES =====

// Calculate tree height - O(n)
function treeHeight(root) {
    if (!root) return 0;
    
    const leftHeight = treeHeight(root.left);
    const rightHeight = treeHeight(root.right);
    
    return 1 + Math.max(leftHeight, rightHeight);
}

// Count total nodes - O(n)
function countNodes(root) {
    if (!root) return 0;
    
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// Count leaf nodes - O(n)
function countLeaves(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    
    return countLeaves(root.left) + countLeaves(root.right);
}

// Check if tree is balanced - O(n)
function isBalanced(root) {
    function checkHeight(node) {
        if (!node) return 0;
        
        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1;
        
        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1;
        
        // Check if current node is balanced
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Unbalanced
        }
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    return checkHeight(root) !== -1;
}

// ===== BINARY SEARCH TREE (BST) =====

// Insert into BST - O(log n) average, O(n) worst
function insertBST(root, val) {
    if (!root) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insertBST(root.left, val);
    } else if (val > root.val) {
        root.right = insertBST(root.right, val);
    }
    
    return root;
}

// Search in BST - O(log n) average, O(n) worst
function searchBST(root, val) {
    if (!root || root.val === val) return root;
    
    if (val < root.val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
}

// Find minimum value in BST - O(log n) average
function findMin(root) {
    if (!root) return null;
    
    while (root.left) {
        root = root.left;
    }
    
    return root.val;
}

// Find maximum value in BST - O(log n) average
function findMax(root) {
    if (!root) return null;
    
    while (root.right) {
        root = root.right;
    }
    
    return root.val;
}

// Delete from BST - O(log n) average
function deleteBST(root, val) {
    if (!root) return root;
    
    if (val < root.val) {
        root.left = deleteBST(root.left, val);
    } else if (val > root.val) {
        root.right = deleteBST(root.right, val);
    } else {
        // Node to be deleted found
        
        // Case 1: No children (leaf node)
        if (!root.left && !root.right) {
            return null;
        }
        
        // Case 2: One child
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Case 3: Two children
        // Find inorder successor (smallest value in right subtree)
        const minVal = findMin(root.right);
        root.val = minVal;
        root.right = deleteBST(root.right, minVal);
    }
    
    return root;
}

// Validate BST - O(n)
function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// ===== COMMON TREE PROBLEMS =====

// Maximum Path Sum - O(n)
function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function maxGain(node) {
        if (!node) return 0;
        
        // Maximum sum from left and right subtrees
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        // Current path sum including this node
        const currentPathSum = node.val + leftGain + rightGain;
        
        // Update global maximum
        maxSum = Math.max(maxSum, currentPathSum);
        
        // Return maximum gain from this node
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}

// Lowest Common Ancestor - O(n)
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}

// Tree Diameter - O(n)
function diameterOfBinaryTree(root) {
    let diameter = 0;
    
    function depth(node) {
        if (!node) return 0;
        
        const leftDepth = depth(node.left);
        const rightDepth = depth(node.right);
        
        // Update diameter (longest path through this node)
        diameter = Math.max(diameter, leftDepth + rightDepth);
        
        return 1 + Math.max(leftDepth, rightDepth);
    }
    
    depth(root);
    return diameter;
}

// Serialize and Deserialize Binary Tree
function serialize(root) {
    if (!root) return 'null';
    
    return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data) {
    const values = data.split(',');
    let index = 0;
    
    function buildTree() {
        if (values[index] === 'null') {
            index++;
            return null;
        }
        
        const node = new TreeNode(parseInt(values[index]));
        index++;
        
        node.left = buildTree();
        node.right = buildTree();
        
        return node;
    }
    
    return buildTree();
}

// ===== TREE CONSTRUCTION =====

// Build tree from preorder and inorder
function buildTreeFromPreorderInorder(preorder, inorder) {
    if (preorder.length === 0) return null;
    
    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    
    const rootIndex = inorder.indexOf(rootVal);
    
    const leftInorder = inorder.slice(0, rootIndex);
    const rightInorder = inorder.slice(rootIndex + 1);
    
    const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
    const rightPreorder = preorder.slice(1 + leftInorder.length);
    
    root.left = buildTreeFromPreorderInorder(leftPreorder, leftInorder);
    root.right = buildTreeFromPreorderInorder(rightPreorder, rightInorder);
    
    return root;
}

// Convert sorted array to BST - O(n)
function sortedArrayToBST(nums) {
    function build(left, right) {
        if (left > right) return null;
        
        const mid = Math.floor((left + right) / 2);
        const root = new TreeNode(nums[mid]);
        
        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);
        
        return root;
    }
    
    return build(0, nums.length - 1);
}

// ===== TREE UTILITIES =====

// Convert tree to array (level order)
function treeToArray(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    
    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }
    
    return result;
}

// Create tree from array (level order)
function arrayToTree(arr) {
    if (!arr || arr.length === 0) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        
        // Left child
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        // Right child
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// ===== SIMPLE BST CLASS =====

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    insert(val) {
        this.root = insertBST(this.root, val);
    }
    
    search(val) {
        return searchBST(this.root, val) !== null;
    }
    
    delete(val) {
        this.root = deleteBST(this.root, val);
    }
    
    inorder() {
        return inorderTraversal(this.root);
    }
    
    levelOrder() {
        return levelOrderTraversal(this.root);
    }
    
    height() {
        return treeHeight(this.root);
    }
    
    isValid() {
        return isValidBST(this.root);
    }
}

// ===== TEST FUNCTIONS =====

export function testTrees() {
    console.log('=== Testing Tree Operations ===');
    
    // Create a sample tree
    //       4
    //      / \
    //     2   6
    //    / \ / \
    //   1  3 5  7
    
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(7);

    
    console.log('Inorder:', inorderTraversal(root));
    console.log('Preorder:', preorderTraversal(root));
    console.log('Postorder:', postorderTraversal(root));
    console.log('Level order:', levelOrderTraversal(root));
    
    console.log('Tree height:', treeHeight(root));
    console.log('Total nodes:', countNodes(root));
    console.log('Leaf nodes:', countLeaves(root));
    console.log('Is balanced:', isBalanced(root));
    console.log('Is valid BST:', isValidBST(root));
    
    // Test BST operations
    console.log('\n=== Testing BST Operations ===');
    const bst = new BinarySearchTree();
    
    [4, 2, 6, 1, 3, 5, 7].forEach(val => bst.insert(val));
    
    console.log('BST inorder:', bst.inorder());
    console.log('Search 5:', bst.search(5));
    console.log('Search 8:', bst.search(8));
    
    bst.delete(6);
    console.log('After deleting 6:', bst.inorder());
}