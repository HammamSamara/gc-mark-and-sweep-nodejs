
let HEAP = []

const root = () => HEAP[0]

// Push garbage to HEAP
const push = (object) => {

    HEAP.push(object)
}

// Traverse all the reachable objects starting from the root and set the
// __mark__ bit on it to 1
const mark = () => {

    // Initially only the root is reachable
    let reachables = [root()]

    while (reachables.length) {
        // Get the next object
        let current = reachables.pop()
        // Mark the object if it is not already marked
        if (!current.__markBit__) {
            current.__markBit__ = 1
            // add all the reachable objects from the current object
            // reachables array
            for (let i in current) {
                if (typeof current[i] === 'object') {
                    // Add it to the reachables
                    reachables.push(current[i])
                }
            }
        }
    }
}

// Traverse the heap and move all unmarked or unreachable objects to the free list.
const sweep = () => {
    // Update the state
    HEAP = HEAP.filter((current) => {
        // For future Garbage collection cycles, reset the __markBit__ bit to 0
        if (current.__markBit__ === 1) {
            current.__markBit__ = 0
            return true
        }

        return false // move it to the free list
    })
}

// Garbage collector (uses mark and sweep algorithm )
const gc = () => {
    console.log("\nHeap state before garbage collection: ", HEAP);

    // Set __mark__ bits on the reachable objects to 1
    mark()

    // Collect the garbage (objects with __mark__ bit not set to 1)
    sweep()

    console.log("\nHeap state after garbage collection: ", HEAP);
}

module.exports = {
    push,
    gc
}
