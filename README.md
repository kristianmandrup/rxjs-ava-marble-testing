# RxJS Marble Testing Setup for Ava

Helpers for using [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md). with [Ava](https://github.com/avajs/ava) testing framework

Note: This project was derived from [rxjs-marble-testing](https://github.com/btroncone/rxjs-marble-testing) for Jasmine/Wallaby.

Marble testing resources:
- [rxjs marble diagram tests using Qunit](https://www.ericponto.com/blog/2017/01/08/rxjs-marble-diagram-tests-with-qunit/)
- [Egghead intro video](https://egghead.io/lessons/rxjs-introduction-to-rxjs-marble-testing)

### Status
*It works :)*

Currently depends on:
- rxjs: `^5.0.0`
- ava: `^0.18.0`

### Getting Started

```bash
npm install rxjs-ava-marble-testing --save-dev
```

From your Terminal run:

`ava --init`

Follow steps in [using Ava](https://github.com/avajs/ava#usage) guide

## Marble Test API
- `cold(marbles, values?, error?)`
- `hot(marbles, values?, error?)`
- `expectObservable(actualObservable)`
- `expectSubscriptions(actualSubscriptions)`
- `ajax` with `MockWebSocket` and `MockXMLHttpRequest`

### Example usage

```js
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';

import { test } from 'ava'
import { marbles } from 'rxjs-ava-marble-testing'

test('The filter operator', t => {
    // to cleanup TestScheduler after each test run
    const m = marbles(t)

    m.it('should correctly filter non-even numbers', () => {
        const source = Observable.from<number>([1, 2, 3, 4, 5])
        const example = source.filter(num => num % 2 === 0)
        const values = { a: 2, b: 4 }
        const expected = '(ab|)'

        m.expectObservable(example).toBe(expected, values)
    })
});


//Example with expectSubscription
test('The merge operator', t => {
    const m = marbles(t)

    m.it('should merge two observables', () => {
        const values = { a: 1, b: 2, c: 3, d: 4 };
        const a = m.cold(' a-----b-----c----|', values)
        const asub = ('^-----------------!')
        const b = m.cold('---------d----------|', values)
        const bsub = '^-------------------!'
        const expected = '-a-----b-d---c------|'

        m.expectObservable(a.merge(b)).toBe(expected, values)
        m.expectSubscriptions(a.subscriptions).toBe(asub)
        m.expectSubscriptions(b.subscriptions).toBe(bsub)
    })
})
```

## Ajax Mock helpers
- `MockWebSocket`
- `MockXMLHttpRequest`

Usage:

`import { ajax } from 'rxjs-ava-marble-testing'`

### MockWebSocket class API
- `constructor(public url: string, public protocol: string)`

Instance:
- `send(data: any): void`
- `get lastMessageSent(): any`
- `triggerClose(e: any): void`
- `triggerError(err: any): void`
- `triggerMessage(data: any): void`
- `open(): void`
- `close(code: any, reason: any): void`
- `addEventListener(name: string, handler: any): void`
- `removeEventListener(name: string, handler: any): void`
- `trigger(name: string, e: any)`

Static:
- `get lastSocket(): MockWebSocket`
- `clearSockets(): void`


##  MockXMLHttpRequest class API
- `constructor()`

Instance:
- `send(data: any): void`
- `open(method: any, url: any, async: any, user: any, password: any): void`
- `setRequestHeader(key: any, value: any): void`
- `addEventListener(name: string, handler: any): void`
- `removeEventListener(name: string, handler: any): void`
- `throwError(err: any): void`
- `respondWith(response: any): void`
- `triggerEvent(name: any, eventObj?: any): void`

Static:
- `get mostRecent(): MockXMLHttpRequest`
- `get allRequests(): Array<MockXMLHttpRequest>`
- `clearRequest(): void`

## Copyright

MIT