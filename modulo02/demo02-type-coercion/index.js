const { equal } = require('assert');

console.log('9999999999999999', 9999999999999999); // 10000000000000000
console.log('true + 2', true + 2); // 3
console.log(`'21' + true`, '21' + true); // 21true
console.log(`'21' - true`, '21' - true); // 20
console.log(`'21' - - 1`, '21' - - 1); // 22
console.log('0.1 + 0.2', 0.1 + 0.2); // 0.30000000000000004
console.log('3 > 2 > 1', 3 > 2 > 1); // false
console.log('3 > 2 >= 1', 3 > 2 >= 1); // true
console.log(`'b' + 'a' + + 'a' + 'a'`, 'b' + 'a' + + 'a' + 'a'); // baNaNa

equal(9999999999999999, 10000000000000000);
equal(true + 2, 3);
equal('21' + true, '21true');
equal('21' - true, 20);
equal('21' - - 1, 22);
equal(0.1 + 0.2, 0.30000000000000004);
equal(3 > 2 > 1, false);
equal(3 > 2 >= 1, true);
equal('b' + 'a' + + 'a' + 'a', 'baNaNa');
