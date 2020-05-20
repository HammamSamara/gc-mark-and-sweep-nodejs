
let {push: gc_push, gc} = require('./gc')

const A = {
    language: 'Javascript'
}

gc_push(A)

const B = {
    language: 'Rust'
}

gc_push(B)

A.B = B

const C = {
    language: 'Dart'
}

gc_push(C)

A.C = C

delete A.C

const D = {
    language: 'GoLang'
}

gc_push(D)

B.D = D

delete A.B

// After these manipulations, the heap still contains four objects:
// [{ A }, { B }, { C }, { D }], but only the "A" object is reachable (root)

// Make a call to garbage collector
gc()
