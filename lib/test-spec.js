"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// declare const it, expectObservable
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/from");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/merge");
const ava_1 = require("ava");
const test_helper_1 = require("./helpers/test-helper");
ava_1.test('The filter operator', t => {
    // to cleanup TestScheduler after each test run
    test_helper_1.default.afterEach(t);
    test_helper_1.default.it(t, () => {
        const source = Observable_1.Observable.from([1, 2, 3, 4, 5]);
        const example = source.filter(num => num % 2 === 0);
        const values = { a: 2, b: 4 };
        const expected = '(ab|)';
        test_helper_1.default.expectObservable(example);
    });
});
