const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

;
(async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const mockedInput = 3;
        const expectedCount = mockedInput + 1;

        for (const index of fibonacci.execute(mockedInput)) { }

        deepStrictEqual(spy.callCount, expectedCount);
    }
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const mockedInput = 5;

        const [...results] = fibonacci.execute(mockedInput);
        const expectedResult = [0, 1, 1, 2, 3];
        const { args } = spy.getCall(2);
        const expectedArgs = Object.values({
            input: 3,
            current: 1,
            next: 2,
        })

        deepStrictEqual(args, expectedArgs);
        deepStrictEqual(results, expectedResult)
    }
})()