"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/from");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/merge");
const ava_1 = require("ava");
const test_helper_1 = require("./helpers/test-helper");
ava_1.test('The filter operator', t => {
    // to cleanup TestScheduler after each test run
    const m = test_helper_1.marbles(t);
    m.it('should correctly filter non-even numbers', () => {
        const source = Observable_1.Observable.from([1, 2, 3, 4, 5]);
        const example = source.filter(num => num % 2 === 0);
        const values = { a: 2, b: 4 };
        const expected = '(ab|)';
        m.expectObservable(example).toBe(expected, values);
    });
});
//Example with expectSubscription
ava_1.test('The merge operator', t => {
    const m = test_helper_1.marbles(t);
    m.it('should merge two observables', () => {
        const values = { a: 1, b: 2, c: 3, d: 4 };
        const a = m.cold(' a-----b-----c----|', values);
        const asub = ('^-----------------!');
        const b = m.cold('---------d----------|', values);
        const bsub = '^-------------------!';
        const expected = '-a-----b-d---c------|';
        m.expectObservable(a.merge(b)).toBe(expected, values);
        m.expectSubscriptions(a.subscriptions).toBe(asub);
        m.expectSubscriptions(b.subscriptions).toBe(bsub);
    });
});
