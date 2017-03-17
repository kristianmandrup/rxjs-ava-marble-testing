"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hot() {
    if (!global.rxTestScheduler) {
        throw 'tried to use hot() in async test';
    }
    return global.rxTestScheduler.createHotObservable.apply(global.rxTestScheduler, arguments);
}
function cold() {
    if (!global.rxTestScheduler) {
        throw 'tried to use cold() in async test';
    }
    return global.rxTestScheduler.createColdObservable.apply(global.rxTestScheduler, arguments);
}
function expectObservable(...args) {
    if (!global.rxTestScheduler) {
        throw 'tried to use expectObservable() in async test';
    }
    return global.rxTestScheduler.expectObservable.apply(global.rxTestScheduler, arguments);
}
function expectSubscriptions() {
    if (!global.rxTestScheduler) {
        throw 'tried to use expectSubscriptions() in async test';
    }
    return global.rxTestScheduler.expectSubscriptions.apply(global.rxTestScheduler, arguments);
}
function createAssertDeepEqual(t) {
    return (actual, expected) => {
        t.deepEqual(actual, expected);
    };
}
exports.default = {
    hot: hot,
    cold: cold,
    expectObservable: expectObservable,
    expectSubscriptions: expectSubscriptions,
    createAssertDeepEqual: createAssertDeepEqual
};
