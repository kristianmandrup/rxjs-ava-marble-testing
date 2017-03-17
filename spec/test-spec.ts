// declare const it, expectObservable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import { test } from 'ava'
import h from './helpers/test-helper'

test('The filter operator', t => {
    // to cleanup TestScheduler after each test run
    h.afterEach(t)

    h.it(t, () => {
        const source = Observable.from<number>([1, 2, 3, 4, 5])
        const example = source.filter(num => num % 2 === 0)
        const values = { a: 2, b: 4 }
        const expected = '(ab|)'

        h.expectObservable(example)
    });
});

