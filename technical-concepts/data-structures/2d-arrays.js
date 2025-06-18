// 2D Arrays (Matrix) - Operations and Examples

// ===== CREATING 2D ARRAYS =====

// Method 1: Literal notation
const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Method 2: Creating with specific dimensions
function createMatrix(rows, cols, defaultValue = 0) {
    return Array(rows).fill().map(() => Array(cols).fill(defaultValue));
}

const matrix2 = createMatrix(3, 4, 0);
console.log(matrix2); // 3x4 matrix filled with 0s

// Method 3: Creating identity matrix
function createIdentityMatrix(size) {
    return Array(size).fill().map((_, i) => 
        Array(size).fill().map((_, j) => i === j ? 1 : 0)
    );
}

const identityMatrix = createIdentityMatrix(3);
console.log(identityMatrix); // [[1,0,0], [0,1,0], [0,0,1]]

// ===== BASIC OPERATIONS =====

// Access element - O(1)
function getElement(matrix, row, col) {
    if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length) {
        return matrix[row][col];
    }
    return undefined; // Out of bounds
}

// Set element - O(1)
function setElement(matrix, row, col, value) {
    if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length) {
        matrix[row][col] = value;
        return true;
    }
    return false; // Out of bounds
}

// Get matrix dimensions
function getDimensions(matrix) {
    return {
        rows: matrix.length,
        cols: matrix.length > 0 ? matrix[0].length : 0
    };
}

// ===== TRAVERSAL PATTERNS =====

// Row by row traversal - O(n*m)
function traverseRowByRow(matrix) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            result.push(matrix[i][j]);
        }
    }
    return result;
}

// Column by column traversal - O(n*m)
function traverseColumnByColumn(matrix) {
    const result = [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            result.push(matrix[i][j]);
        }
    }
    return result;
}

// Diagonal traversal - O(n*m)
function traverseDiagonally(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    
    // Traverse upper half (including main diagonal)
    for (let k = 0; k < cols; k++) {
        let i = 0, j = k;
        while (i < rows && j >= 0) {
            result.push(matrix[i][j]);
            i++;
            j--;
        }
    }
    
    // Traverse lower half
    for (let k = 1; k < rows; k++) {
        let i = k, j = cols - 1;
        while (i < rows && j >= 0) {
            result.push(matrix[i][j]);
            i++;
            j--;
        }
    }
    
    return result;
}

// Spiral traversal - O(n*m)
function spiralTraversal(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let j = left; j <= right; j++) {
            result.push(matrix[top][j]);
        }
        top++;
        
        // Traverse down
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;
        
        // Traverse left (if we still have rows)
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                result.push(matrix[bottom][j]);
            }
            bottom--;
        }
        
        // Traverse up (if we still have columns)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}

// ===== SEARCH OPERATIONS =====

// Linear search - O(n*m)
function searchMatrix(matrix, target) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === target) {
                return [i, j];
            }
        }
    }
    return [-1, -1]; // Not found
}

// Binary search in sorted matrix - O(log(n*m))
function searchSortedMatrix(matrix, target) {
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

// Search in row and column sorted matrix - O(n + m)
function searchRowColumnSorted(matrix, target) {
    if (!matrix || matrix.length === 0) return false;
    
    let row = 0;
    let col = matrix[0].length - 1;
    
    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            col--;
        } else {
            row++;
        }
    }
    
    return false;
}

// ===== MATRIX TRANSFORMATIONS =====

// Transpose matrix - O(n*m)
function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = createMatrix(cols, rows);
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }
    
    return transposed;
}

// Rotate matrix 90 degrees clockwise - O(n²)
function rotateMatrix90(matrix) {
    const n = matrix.length;
    
    // First transpose
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Then reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
    
    return matrix;
}

// Flip matrix horizontally - O(n*m)
function flipHorizontally(matrix) {
    return matrix.map(row => [...row].reverse());
}

// Flip matrix vertically - O(n*m)
function flipVertically(matrix) {
    return [...matrix].reverse();
}

// ===== MATRIX OPERATIONS =====

// Matrix addition - O(n*m)
function addMatrices(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Matrices must have same dimensions');
    }
    
    const result = createMatrix(matrix1.length, matrix1[0].length);
    
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    
    return result;
}

// Matrix multiplication - O(n³)
function multiplyMatrices(matrix1, matrix2) {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;
    
    if (cols1 !== rows2) {
        throw new Error('Cannot multiply: incompatible dimensions');
    }
    
    const result = createMatrix(rows1, cols2, 0);
    
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    
    return result;
}

// Scalar multiplication - O(n*m)
function scalarMultiply(matrix, scalar) {
    return matrix.map(row => row.map(val => val * scalar));
}

// ===== SPECIAL MATRIX OPERATIONS =====

// Check if matrix is symmetric - O(n²)
function isSymmetric(matrix) {
    const n = matrix.length;
    if (n === 0 || matrix[0].length !== n) return false;
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== matrix[j][i]) {
                return false;
            }
        }
    }
    
    return true;
}

// Get matrix trace (sum of diagonal elements) - O(n)
function getTrace(matrix) {
    let trace = 0;
    const size = Math.min(matrix.length, matrix[0].length);
    
    for (let i = 0; i < size; i++) {
        trace += matrix[i][i];
    }
    
    return trace;
}

// Set matrix zeros - O(n*m)
function setZeroes(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const zeroRows = new Set();
    const zeroCols = new Set();
    
    // Find all zero positions
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                zeroRows.add(i);
                zeroCols.add(j);
            }
        }
    }
    
    // Set entire rows and columns to zero
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (zeroRows.has(i) || zeroCols.has(j)) {
                matrix[i][j] = 0;
            }
        }
    }
    
    return matrix;
}

// ===== COMMON ALGORITHMS =====

// Find the number of islands (connected components) - O(n*m)
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') {
            return;
        }
        
        grid[i][j] = '0'; // Mark as visited
        
        // Check all 4 directions
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    
    return count;
}

// Find path in matrix (using BFS) - O(n*m)
function findPath(matrix, start, end) {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    if (matrix[startRow][startCol] === 1 || matrix[endRow][endCol] === 1) {
        return []; // Start or end is blocked
    }
    
    const queue = [[startRow, startCol, []]];
    const visited = new Set();
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    
    while (queue.length > 0) {
        const [row, col, path] = queue.shift();
        const key = `${row},${col}`;
        
        if (visited.has(key)) continue;
        visited.add(key);
        
        const newPath = [...path, [row, col]];
        
        if (row === endRow && col === endCol) {
            return newPath;
        }
        
        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols && 
                matrix[newRow][newCol] === 0 && 
                !visited.has(`${newRow},${newCol}`)) {
                
                queue.push([newRow, newCol, newPath]);
            }
        }
    }
    
    return []; // No path found
}

// ===== UTILITY FUNCTIONS =====

// Print matrix in readable format
function printMatrix(matrix, name = 'Matrix') {
    console.log(`${name}:`);
    matrix.forEach(row => {
        console.log(row.map(val => val.toString().padStart(3)).join(' '));
    });
    console.log();
}

// Check if matrices are equal
function matricesEqual(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length) return false;
    
    for (let i = 0; i < matrix1.length; i++) {
        if (matrix1[i].length !== matrix2[i].length) return false;
        
        for (let j = 0; j < matrix1[i].length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) return false;
        }
    }
    
    return true;
}

// ===== TEST FUNCTIONS =====

function testMatrixOperations() {
    console.log('=== Testing 2D Array Operations ===');
    
    const testMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    
    printMatrix(testMatrix, 'Original Matrix');
    
    console.log('Row by row:', traverseRowByRow(testMatrix));
    console.log('Column by column:', traverseColumnByColumn(testMatrix));
    console.log('Spiral:', spiralTraversal(testMatrix));
    
    const transposed = transpose(testMatrix);
    printMatrix(transposed, 'Transposed');
    
    console.log('Search for 5:', searchMatrix(testMatrix, 5));
    console.log('Search for 10:', searchMatrix(testMatrix, 10));
}