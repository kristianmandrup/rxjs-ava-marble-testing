"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function createAssertDeepEqual(t) {
    return (actual, expected) => {
        t.deepEqual(actual, expected);
    };
}
function marbles(t) {
    return new Marbles(t);
}
exports.marbles = marbles;
class Marbles {
    constructor(t) {
        this.t = t;
    }
    it(description, cb) {
        const assertDeepEqual = createAssertDeepEqual(this.t);
        this._rxTestScheduler = new rxjs_1.TestScheduler(assertDeepEqual);
        cb();
        this.rxTestScheduler.flush();
        this._rxTestScheduler = null;
    }
    get rxTestScheduler() {
        return this._rxTestScheduler;
    }
    hot(marbles, values, error) {
        return this.rxTestScheduler.createHotObservable(marbles, values, error);
    }
    cold(marbles, values, error) {
        return this.rxTestScheduler.createColdObservable(marbles, values, error);
    }
    expectObservable(actualObservable) {
        return this.rxTestScheduler.expectObservable(actualObservable);
    }
    expectSubscriptions(actualSubscriptions) {
        return this.rxTestScheduler.expectSubscriptions(actualSubscriptions);
    }
}
exports.Marbles = Marbles;
