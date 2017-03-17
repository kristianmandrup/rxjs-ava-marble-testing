// declare const global;
import { TestScheduler } from 'rxjs/testing/TestScheduler';

import * as ajax from './ajax-helper';
import marbleHelpers from './marble-testing';

let global = {
  cold: marbleHelpers.cold,
  hot: marbleHelpers.hot,
  expectObservable: marbleHelpers.expectObservable,
  expectSubscriptions: marbleHelpers.expectSubscriptions,
  ajax,
  afterEach: null,
  it: null,
  rxTestScheduler: null
}

const afterEach = function (test) {
  test.afterEach(t => {
    global.rxTestScheduler = null;
  })
};

const createAssertDeepEqual = marbleHelpers.createAssertDeepEqual

const it = function (t, cb) {
  const assertDeepEqual = createAssertDeepEqual(t)
  global.rxTestScheduler = new TestScheduler(assertDeepEqual)
  cb();
  global.rxTestScheduler.flush()
}

global.afterEach = afterEach
global.it = it

console.log('global', global)

export default global