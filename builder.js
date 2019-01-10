const bloom = require('./bloom')

const fs = require('fs')
const readline = require('readline')


function buildBloomFilter(file, m=0, k=0) {
    var bf = new bloom.BloomFilter(m, k)

    fs.readFileSync(file).toString('utf-8').split('\n')
      .forEach((line, index, lines) => bf.Add(line))

    // User report
    console.log("Processed", bf.n, "passwords")
    console.log("Bloom Filter parameters:")
    console.log("\tNumber of hash functions:\t\t", bf.k)
    console.log("\tSize of bit set:\t\t", bf.m, "bits")

    // Export
    data = {m: bf.m, k: bf.k, n: bf.n, seeds: bf.seeds.toString(), bitset: bf.bitset.toString()}
    console.log(bf.n)
    jsonData = JSON.stringify(data)
    fs.writeFile('output.txt', jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    })
}

// Only for testing
var myfile = "passwords.txt"
buildBloomFilter('passwords.txt', 1024, 4)