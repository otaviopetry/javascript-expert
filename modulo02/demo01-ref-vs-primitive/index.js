const { deepStrictEqual } = require('assert');

let counter = 0;
let counter2 = counter;
counter2++;

deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

const item = { counter: 0 };
const item2 = item;
item2.counter++;

deepStrictEqual(item, { counter: 1 });
deepStrictEqual(item2, { counter: 1 });

const baseClass = { hp: 100, mana: 100 };
const mage = Object.assign({ }, baseClass);
const paladin = Object.assign({ }, baseClass);
mage.mana = 1000;
paladin.hp = 500;
paladin.mana = 500;

deepStrictEqual(baseClass, { hp: 100, mana: 100 });
deepStrictEqual(mage, { hp: 100, mana: 1000 });
deepStrictEqual(paladin, { hp: 500, mana: 500 });
