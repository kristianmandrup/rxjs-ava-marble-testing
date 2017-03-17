import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import { test } from 'ava'
import { marbles } from './helpers/test-helper'

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