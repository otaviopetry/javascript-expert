const { equal } = require('assert');

console.log(
    '9999999999999999',
    9999999999999999
); // 10000000000000000
console.log(
    'true + 2',
    true + 2
); // 3
console.log(
    `'21' + true`,
    '21' + true
); // 21true
console.log(
    `'21' - true`,
    '21' - true
); // 20
console.log(
    `'21' - - 1`,
    '21' - - 1
); // 22
console.log(
    '0.1 + 0.2',
    0.1 + 0.2
); // 0.30000000000000004
console.log(
    '3 > 2 > 1',
    3 > 2 > 1
); // false
console.log(
    '3 > 2 >= 1',
    3 > 2 >= 1
); // true
console.log(
    `'b' + 'a' + + 'a' + 'a'`,
    'b' + 'a' + + 'a' + 'a'
); // baNaNa

// ----------------------------------------------

equal(9999999999999999, 10000000000000000);
equal(true + 2, 3);
equal('21' + true, '21true');
equal('21' - true, 20);
equal('21' - - 1, 22);
equal(0.1 + 0.2, 0.30000000000000004);
equal(3 > 2 > 1, false);
equal(3 > 2 >= 1, true);
equal('b' + 'a' + + 'a' + 'a', 'baNaNa');

// ----------------------------------------------

console.assert(String(123) === '123', 'explicit conversion to string');
console.assert(123 + '' === '123', 'implicit conversion to string');

console.assert(('hello' || 123) === 'hello', '|| returns the first element if both are truthy');
console.assert(('hello' && 123) === 123, '&& returns the last element if both are truthy');

console.log(String(123) === '123', `String(123) === '123'`, ': explicit conversion to string');
console.log(123 + '' === '123', `123 + '' === '123'`, ': implicit conversion to string');

console.assert(('hello' || 123) === 'hello', `('hello' || 123) === 'hello'`, ': || returns the first element if both are truthy');
console.assert(('hello' && 123) === 123, `('hello' && 123) === 123`, ': && returns the last element if both are truthy');

// ----------------------------------------------

const me = {
    name: 'Otavio',
    age: 35,
    toString() {
        return `My name is ${ this.name } and I'm ${ this.age } years old.`;
    },
    valueOf() {
        return 3.1415;
    },
    // Symbol.toPrimitive has priority over toString and valueOf
    [Symbol.toPrimitive](coercionType) {
        console.log('coercionType', coercionType);
        
        const types = {
            string: this.toString(),
            number: this.valueOf(),
        };

        return types[coercionType] || this.toString();
    }
}

console.log('me', me);
console.log('me + 1', me + 1);
console.log('me + "1"', me + '1');
console.log(String(me));
console.log(Number(me));