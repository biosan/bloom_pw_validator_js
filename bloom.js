// Just another JS Bloom Filter module.

var murmurHash3 = require("murmurhash3js");

// Constructor.
function BloomFilter(m, k, bitset = null, seeds = null, n = null) {

    // Insert an item.
    this.Add = function (item) {
        hashes = this.HashIt(item)
        hashes.forEach(index => {
            byte_index = Math.floor(index / 8)
            bit_index = index % 8
            this.bitset[byte_index] |= 1 << bit_index
        })
        this.n += 1
        return [item, this.n]
    }

    // Check if an item is in the filter.
    this.Query = function (item) {
        probably_in = true
        hashes = this.HashIt(item)
        hashes.forEach(index => {
            byte_index = Math.floor(index / 8)
            bit_index = index % 8
            if (!(this.bitset[byte_index] && (1 << bit_index))) {
                probably_in = false
            }
        })
        return Boolean(probably_in)
    }
    
    // Compute all the "k" different hashes.
    this.HashIt = function (item) {
        out = new Uint32Array(this.k)
        for (let i = 0; i < this.k; i++) {
            out[i] = this.hashfn(item, this.seeds[i])
            out[i] = out[i] % this.m
        }
        return out
    }

    // Generate random seeds to build "k" different hash functions.
    this.genSeeds = function (k, m) {
        out = new Uint32Array(k)
        for (let index = 0; index < k; index++) {
            out[index] = Math.floor(Math.random() * m)
        }
        return out
    }

    // This function is simply a container for the real hash function.
    // Having a simple wrapper like this allow to easly change hash function.
    this.hashfn = function (input, seed) {
        return murmurHash3.x86.hash32(input, seed)
    }

    // Bloom Filter parameters.
    // With this 3 stupid IFs you could define external seeds or bitset
    if (bitset != null) {
        this.bitset = bitset
    } else {
        this.bitset = new Uint8Array(m/8)
    }
    if (seeds != null) {
        this.seeds = seeds
    } else {
        this.seeds = this.genSeeds(k, m)
    }
    if (n != null) {
        this.n = n
    } else {
        this.n = 0
    }
    this.k = k
    this.m = m
}

module.exports = {BloomFilter: BloomFilter}