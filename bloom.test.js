const bloom = require('./bloom');

// Bloom Filter paramenters.
// With less than 10 items the false probabilty
// should be under 1/41550 (0.000024067)
const m = 1024, k = 4
const testing_seeds = new Uint32Array([312, 624, 785, 113])

// Return a random string for random testing
function getRandomStrings(n, l) {
    const randString = (value, index, array) => Math.random().toString(86).substring(l)
    return Array(n).map(randString)
}

// Random strings generation
var rand_testing_strings = getRandomStrings(5, 32)
var rand_query_strings = getRandomStrings(5, 32)


// Some constant strings to test the filter
const testing_strings = [
    "test",
    "",
    "1,2,3,4",
    "test \n test \n test",
    "very long string asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
]
const query_strings = [
    "test1",
    "  ",
    "1,2,34",
    "Test \n Test \n Test",
    "asdfasdfasdfasdfasdfasdf"
]


/*
 * CONSTANT DATA TESTING
 */

// Create and init new Bloom Filters
var rand_bf = new bloom.BloomFilter(m, k)
var const_bf = new bloom.BloomFilter(m, k, null, testing_seeds, null)


// Constant filter tests
test('Constant Filter: Insert testing strings in the filter', () => {
    testing_strings.forEach((string, idx, array) =>
        expect(const_bf.Add(string)).toEqual([string, idx+1])
    )
});

test('Constant Filter: Query testing strings', () => {
    testing_strings.forEach((string, idx, array) =>
        expect(const_bf.Query(string)).toEqual(true)
    )
});

test('Constant Filter: Query "query_strings"', () => {
    query_strings.forEach((string, idx, array) =>
        expect(const_bf.Query(string)).toEqual(false)
    )
});


// Random seeds filter tests
test('Random Seeds Filter: Insert testing strings in the filter', () => {
    testing_strings.forEach((string, idx, array) =>
        expect(rand_bf.Add(string)).toEqual([string, idx+1])
    )
});

test('Random Seeds Filter: Query testing strings', () => {
    testing_strings.forEach((string, idx, array) =>
        expect(rand_bf.Query(string)).toEqual(true)
    )
});

test('Random Seeds Filter: Query "query_strings"', () => {
    query_strings.forEach((string, idx, array) =>
        expect(rand_bf.Query(string)).toEqual(false)
    )
});


/*
 * RANDOM DATA TESTING
 */

// Create and init new Bloom Filters
var rand_bf = new bloom.BloomFilter(m, k)
var const_bf = new bloom.BloomFilter(m, k, null, testing_seeds, null)

// Constant filter tests with random data
test('Constant Filter: Insert random strings in the filter', () => {
    rand_testing_strings.forEach((string, idx, array) =>
        expect(const_bf.Add(string)).toEqual([string, idx+1])
    )
});

test('Constant Filter: Query inserted random strings', () => {
    rand_testing_strings.forEach((string, idx, array) =>
        expect(const_bf.Query(string)).toEqual(true)
    )
});

test('Constant Filter: Query random strings', () => {
    rand_query_strings.forEach((string, idx, array) =>
        expect(const_bf.Query(string)).toEqual(false)
    )
});


// Random seeds filter tests with random data
test('Random Seeds Filter: Insert random strings in the filter', () => {
    rand_testing_strings.forEach((string, idx, array) =>
        expect(rand_bf.Add(string)).toEqual([string, idx+1])
    )
});

test('Random Seeds Filter: Query inserted random strings', () => {
    rand_testing_strings.forEach((string, idx, array) =>
        expect(rand_bf.Query(string)).toEqual(true)
    )
});

test('Random Seeds Filter: Query random strings', () => {
    rand_query_strings.forEach((string, idx, array) =>
        expect(rand_bf.Query(string)).toEqual(false)
    )
});