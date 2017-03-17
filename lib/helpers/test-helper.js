"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// declare const global;
const TestScheduler_1 = require("rxjs/testing/TestScheduler");
const ajax = require("./ajax-helper");
const marble_testing_1 = require("./marble-testing");
let global = {
    cold: marble_testing_1.default.cold,
    hot: marble_testing_1.default.hot,
    expectObservable: marble_testing_1.default.expectObservable,
    expectSubscriptions: marble_testing_1.default.expectSubscriptions,
    ajax,
    afterEach: null,
    it: null,
    rxTestScheduler: null
};
const afterEach = function (test) {
    test.afterEach(t => {
        global.rxTestScheduler = null;
    });
};
const createAssertDeepEqual = marble_testing_1.default.createAssertDeepEqual;
const it = function (t, cb) {
    const assertDeepEqual = createAssertDeepEqual(t);
    global.rxTestScheduler = new TestScheduler_1.TestScheduler(assertDeepEqual);
    cb();
    global.rxTestScheduler.flush();
};
global.afterEach = afterEach;
global.it = it;
console.log('global', global);
exports.default = global;
