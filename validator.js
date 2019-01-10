const bloom = require('./bloom')

function importBF(jsonString) {
    var json = JSON.parse(jsonString)
    json.seeds = new Uint32Array(json.seeds.split(','))
    json.bitset = new Uint8Array(json.bitset.split(','))

    var bf = new bloom.BloomFilter(json.m, json.k,
                                   bitset = json.bitset,
                                   seeds = json.seeds,
                                   n = json.n)
    return bf
}

function validate(bf, input_element, callback) {
    if (bf.Query(input_element.value)) {
        callback(false)
        return false
    } else {
        callback(true)
        return true
    }
}

function buildBFValidator(bf, input_element, callback) {
    return function() {validate(bf, input_element, callback)}
}