# RxJS Marble Testing Setup for Ava

Minimal setup to start utilizing [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md).

### Status

WIP: Please help out!

### Getting Started

```bash
# clone the repo
git clone https://github.com/kristianmandrup/rxjs-ava-marble-testing.git

# run install
npm install
```

Run `ava --init` and follow steps in [using Ava](https://github.com/avajs/ava#usage)

```js
import { test } from 'ava'
import h from './helpers/test-helper'

test('The filter operator', t => {
    // to cleanup TestScheduler after each test run
    h.afterEach(t)

    h.it(t, () => {
        const source = Observable.from<number>([1, 2, 3, 4, 5])
        // ...
        h.expectObservable(example, ???)
    });
});


## API

- `cold`
- `hot`
- `expectObservable`
- `expectSubscriptions`
- `ajax` with `MockWebSocket` and `MockXMLHttpRequest`
- `afterEach(t)` which sets up an Ava `afterEach` hook to reset the rx `TestScheduler` after each test run

## Issues

Currently uses test helpers in this form:

```js
function hot() {
  if (!global.rxTestScheduler) {
    throw 'tried to use hot() in async test';
  }
  return global.rxTestScheduler.createHotObservable.apply(global.rxTestScheduler, arguments);
}
```

I'm not sure how to correctly use the `global` variable for testing and how to make the `expectXYZ` helpers work with Ava. Please help out! Thanks

I only tweaked the `assertDeepEqual` for now...

```js
function createAssertDeepEqual(t) {
  return (actual, expected) => {
    (<any>t.deepEqual(actual, expected))
  }
}
```

## Copyright

MIT