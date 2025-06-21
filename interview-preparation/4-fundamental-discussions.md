# Fundamental Discussions

## Format and Structure

- **Format**: Verbal Q&A about technical concepts
- **Topics**: Data structures, algorithms, system design basics
- **Duration**: 15-30 minutes
- **Style**: Conversational, with follow-up questions

## Common Discussion Topics

### Data Structures

- **Arrays vs Linked Lists**: When to use each, trade-offs
- **Hash Tables**: Implementation, collision handling, use cases
- **Trees**: Binary trees, BST properties, traversal methods
- **Graphs**: Representation, traversal algorithms (BFS/DFS)

### Algorithms

- **Sorting**: Different algorithms, time complexities, when to use each
- **Searching**: Linear vs binary search, optimization techniques
- **Recursion**: Base cases, stack overflow, iterative alternatives
- **Dynamic Programming**: Memoization, bottom-up approach

### System Design Basics

- **Scalability**: Horizontal vs vertical scaling
- **Database**: SQL vs NoSQL, indexing, normalization
- **Caching**: Types of caching, cache invalidation
- **Load Balancing**: Distribution strategies, failover

### Web Development

- **How the Web Works**: What happens after you type a URL and press Enter
- **HTTP**: Request/response cycle, HTTP methods, status codes, HTTP/HTTPS flow
- **Web Performance**: Core Web Vitals (LCP, FID, CLS), Lighthouse/Chrome DevTools, Caching strategies (browser cache, CDN, service workers), Lazy loading
- **Security**: HTTPS, CSRF, XSS, CORS, Secure cookies, Authentication & Authorization (JWT, OAuth2, OpenID Connect)
- **Frontend Architecture**: SPA vs MPA, CSR/SSR/SSG, React, Progressive Web Apps (PWAs)
- **JavaScript Core Concepts**: Closures, hoisting, scope, this, event loop, promises, async/await

## Preparation Strategies

### Study Approach

- **Understand concepts**: Don't just memorize, understand why
- **Practice explanations**: Explain concepts to others or out loud
- **Use analogies**: Relate complex concepts to real-world examples
- **Draw diagrams**: Be prepared to sketch data structures and algorithms

### Communication Tips

- **Start with high-level**: Give overview before diving into details
- **Use examples**: Concrete examples help illustrate abstract concepts
- **Ask for clarification**: Ensure you understand the question
- **Admit limitations**: Be honest about what you don't know

## Example Questions and Approaches

### "Explain how a hash table works"

**Good Answer Structure:**

1. **Purpose**: Fast key-value lookups, O(1) average time
2. **Implementation**: Array with hash function to map keys to indices
3. **Collision handling**: Chaining or open addressing
4. **Trade-offs**: Space vs time, hash function quality
5. **Use cases**: Caches, database indexing, sets

### "When would you use a linked list over an array?"

**Good Answer Structure:**

1. **Dynamic size**: When size is unknown or frequently changing
2. **Insertion/deletion**: Frequent operations at beginning or middle
3. **Memory efficiency**: When memory is fragmented
4. **Trade-offs**: No random access, extra memory for pointers
5. **Examples**: Undo functionality, music playlist, browser history

### "What's the difference between BFS and DFS?"

**Good Answer Structure:**

1. **Traversal order**: Level-by-level vs depth-first
2. **Data structure**: Queue for BFS, stack (or recursion) for DFS
3. **Space complexity**: O(width) vs O(height)
4. **Use cases**: Shortest path vs topological sorting
5. **Implementation**: Show basic pseudocode

### "Explain how the JavaScript Event Loop works"

**Good Answer Structure:**

1. **Purpose**: Allows JavaScript (single-threaded) to handle asynchronous operations without blocking the main thread
2. **Core Concepts**: Explain call stack, event queue, callback queue, microtasks queue, web APIs
3. **How it works**: Explain how tasks are queued, executed, and how the loop works
4. **Use Cases**: Asynchronous operations, non-blocking code

> Understanding setTimeout(fn, 0) vs Promise.resolve().then(fn) execution order

### "Compare CSR, SSR, SSG, and ISR in web development"

**Good Answer Structure:**

1. **CSR - Client-Side Rendering**: Explain How it works, pros, cons, use cases
2. **SSR - Server-Side Rendering**: Explain How it works, pros, cons, use cases
3. **SSG - Static Site Generation**: Explain How it works, pros, cons, use cases
4. **ISR - Incremental Static Regeneration**: Explain How it works, pros, cons, use cases
5. **Trade-offs**: Compare and contrast, when to use each
6. **Modern Frameworks**: Next.js, Nuxt.js

## Red Flags to Avoid

- **Memorized answers**: Sounds rehearsed without understanding
- **Too technical**: Getting lost in implementation details
- **No examples**: Abstract explanations without concrete cases
- **Wrong terminology**: Using incorrect technical terms
- **Defensive**: Getting frustrated when asked follow-up questions
