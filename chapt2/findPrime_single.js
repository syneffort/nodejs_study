const min = 2;
const max = 10_000_000;
const primes = [];

function generatePrimes(start, range) {
    const end = start + range;
    for (let i = start; i < end; i++) {
        let isPrime = true;
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
}

console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);