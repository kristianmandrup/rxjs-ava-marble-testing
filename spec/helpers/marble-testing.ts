import { TestScheduler } from 'rxjs'
import { test } from 'ava'

function createAssertDeepEqual(t) {
  return (actual, expected) => {
    (<any>t.deepEqual(actual, expected))
  }
}

export function marbles(t) {
  return new Marbles(t)
}

export class Marbles {
  protected t: any
  protected _rxTestScheduler: TestScheduler

  constructor(t: any) {
    this.t = t
  }

  it(description, cb) {
    const assertDeepEqual = createAssertDeepEqual(this.t)
    this._rxTestScheduler = new TestScheduler(assertDeepEqual)
    cb()

    this.rxTestScheduler.flush()
    this._rxTestScheduler = null;
  }

  get rxTestScheduler() {
    return this._rxTestScheduler
  }

  hot(marbles, values?, error?) {
    return this.rxTestScheduler.createHotObservable(marbles, values, error)
  }


  cold(marbles, values?, error?) {
    return this.rxTestScheduler.createColdObservable(marbles, values, error)
  }

  expectObservable(actualObservable) {
    return this.rxTestScheduler.expectObservable(actualObservable)
  }

  expectSubscriptions(actualSubscriptions) {
    return this.rxTestScheduler.expectSubscriptions(actualSubscriptions)
  }
}
