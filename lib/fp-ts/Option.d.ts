/**
 * ```ts
 * type Option<A> = None | Some<A>
 * ```
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None`.
 *
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at `Option` is: it represents the effect of a possibly failing computation.
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt';
import { Alternative1 } from './Alternative';
import { Applicative1 } from './Applicative';
import { Apply1 } from './Apply';
import { Chain1 } from './Chain';
import { Compactable1 } from './Compactable';
import { Either } from './Either';
import { Eq } from './Eq';
import { Extend1 } from './Extend';
import { Filterable1 } from './Filterable';
import { Foldable1 } from './Foldable';
import { FromEither1 } from './FromEither';
import { Lazy } from './function';
import { Functor1 } from './Functor';
import { Monad1 } from './Monad';
import { MonadThrow1 } from './MonadThrow';
import { Monoid } from './Monoid';
import { Ord } from './Ord';
import { Pointed1 } from './Pointed';
import { Predicate } from './Predicate';
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray';
import { Refinement } from './Refinement';
import { Semigroup } from './Semigroup';
import { Separated } from './Separated';
import { Show } from './Show';
import { PipeableTraverse1, Traversable1 } from './Traversable';
import { PipeableWilt1, PipeableWither1, Witherable1 } from './Witherable';
import { Zero1 } from './Zero';
/**
 * @category model
 * @since 2.0.0
 */
export interface None {
    readonly _tag: 'None';
}
/**
 * @category model
 * @since 2.0.0
 */
export interface Some<A> {
    readonly _tag: 'Some';
    readonly value: A;
}
/**
 * @category model
 * @since 2.0.0
 */
export declare type Option<A> = None | Some<A>;
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const none: Option<never>;
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const some: <A>(a: A) => Option<A>;
/**
 * Returns a *smart constructor* based on the given predicate.
 *
 * @example
 * import { none, some, fromPredicate } from 'fp-ts/Option'
 *
 * const getOption = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), none)
 * assert.deepStrictEqual(getOption(1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>;
export declare function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => Option<B>;
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>;
/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const getLeft: <E, A>(ma: Either<E, A>) => Option<E>;
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
export declare const getRight: <E, A>(ma: Either<E, A>) => Option<A>;
/**
 * @category instances
 * @since 2.0.0
 */
export declare const URI = "Option";
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI;
declare module './HKT' {
    interface URItoKind<A> {
        readonly [URI]: Option<A>;
    }
}
/**
 * @category instances
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<Option<A>>;
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @category instances
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<Option<A>>;
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 *
 * const O = getOrd(N.Ord)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category instances
 * @since 2.0.0
 */
export declare const getOrd: <A>(O: Ord<A>) => Ord<Option<A>>;
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(b) | some(b)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * const M = getMonoid(SemigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
export declare const getMonoid: <A>(S: Semigroup<A>) => Monoid<Option<A>>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Functor: Functor1<URI>;
/**
 * @category instance operations
 * @since 2.7.0
 */
export declare const of: Pointed1<URI>['of'];
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Pointed: Pointed1<URI>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>;
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Apply: Apply1<URI>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Applicative: Applicative1<URI>;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category instance operations
 * @since 2.0.0
 */
export declare const chain: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B>;
/**
 * @category instances
 * @since 2.10.0
 */
export declare const Chain: Chain1<URI>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Monad: Monad1<URI>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Foldable: Foldable1<URI>;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category instance operations
 * @since 2.9.0
 */
export declare const altW: <B>(that: Lazy<Option<B>>) => <A>(fa: Option<A>) => Option<A | B>;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category instance operations
 * @since 2.0.0
 */
export declare const alt: <A>(that: Lazy<Option<A>>) => (fa: Option<A>) => Option<A>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Alt: Alt1<URI>;
/**
 * @category instance operations
 * @since 2.7.0
 */
export declare const zero: Zero1<URI>['zero'];
/**
 * @category instances
 * @since 2.11.0
 */
export declare const Zero: Zero1<URI>;
/**
 * @category constructors
 * @since 2.11.0
 */
export declare const guard: (b: boolean) => Option<void>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Alternative: Alternative1<URI>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Extend: Extend1<URI>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const compact: <A>(fa: Option<Option<A>>) => Option<A>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const separate: <A, B>(ma: Option<Either<A, B>>) => Separated<Option<A>, Option<B>>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Compactable: Compactable1<URI>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Option<B>;
    <A>(predicate: Predicate<A>): <B extends A>(fb: Option<B>) => Option<B>;
    <A>(predicate: Predicate<A>): (fa: Option<A>) => Option<A>;
};
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B>;
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Separated<Option<A>, Option<B>>;
    <A>(predicate: Predicate<A>): <B extends A>(fb: Option<B>) => Separated<Option<B>, Option<B>>;
    <A>(predicate: Predicate<A>): (fa: Option<A>) => Separated<Option<A>, Option<A>>;
};
/**
 * @category instance operations
 * @since 2.0.0
 */
export declare const partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: Option<A>) => Separated<Option<B>, Option<C>>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Filterable: Filterable1<URI>;
/**
 * @category instance operations
 * @since 2.6.3
 */
export declare const traverse: PipeableTraverse1<URI>;
/**
 * @category instance operations
 * @since 2.6.3
 */
export declare const sequence: Traversable1<URI>['sequence'];
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Traversable: Traversable1<URI>;
/**
 * @category instance operations
 * @since 2.6.5
 */
export declare const wither: PipeableWither1<URI>;
/**
 * @category instance operations
 * @since 2.6.5
 */
export declare const wilt: PipeableWilt1<URI>;
/**
 * @category instances
 * @since 2.7.0
 */
export declare const Witherable: Witherable1<URI>;
/**
 * @category instance operations
 * @since 2.7.0
 */
export declare const throwError: MonadThrow1<URI>['throwError'];
/**
 * @category instances
 * @since 2.7.0
 */
export declare const MonadThrow: MonadThrow1<URI>;
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getright)
 *
 * @category natural transformations
 * @since 2.0.0
 */
export declare const fromEither: FromEither1<URI>['fromEither'];
/**
 * @category instances
 * @since 2.11.0
 */
export declare const FromEither: FromEither1<URI>;
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category refinements
 * @since 2.0.0
 */
export declare const isSome: <A>(fa: Option<A>) => fa is Some<A>;
/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category refinements
 * @since 2.0.0
 */
export declare const isNone: (fa: Option<unknown>) => fa is None;
/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
export declare const matchW: <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Option<A>) => B | C;
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category destructors
 * @since 2.10.0
 */
export declare const foldW: <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Option<A>) => B | C;
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 2.10.0
 */
export declare const match: <A, B>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>) => B;
/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
export declare const fold: <A, B>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>) => B;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.6.0
 */
export declare const getOrElseW: <B>(onNone: Lazy<B>) => <A>(ma: Option<A>) => B | A;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
export declare const getOrElse: <A>(onNone: Lazy<A>) => (ma: Option<A>) => A;
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export declare const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B>;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apFirst: <B>(second: Option<B>) => <A>(first: Option<A>) => Option<A>;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const apSecond: <B>(second: Option<B>) => <A>(first: Option<A>) => Option<B>;
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const flatten: <A>(mma: Option<Option<A>>) => Option<A>;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const chainFirst: <A, B>(f: (a: A) => Option<B>) => (first: Option<A>) => Option<A>;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export declare const duplicate: <A>(ma: Option<A>) => Option<Option<A>>;
/**
 * @category combinators
 * @since 2.11.0
 */
export declare const fromEitherK: <E, A extends readonly unknown[], B>(f: (...a: A) => Either<E, B>) => (...a: A) => Option<B>;
/**
 * @category combinators
 * @since 2.11.0
 */
export declare const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Option<A>) => Option<B>;
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category interop
 * @since 2.0.0
 */
export declare const fromNullable: <A>(a: A) => Option<NonNullable<A>>;
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @category interop
 * @since 2.0.0
 */
export declare const tryCatch: <A>(f: Lazy<A>) => Option<A>;
/**
 * Converts a function that may throw to one returning a `Option`.
 *
 * @category interop
 * @since 2.10.0
 */
export declare const tryCatchK: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>;
/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { fromNullableK, none, some } from 'fp-ts/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = fromNullableK(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none)
 *
 * @category interop
 * @since 2.9.0
 */
export declare const fromNullableK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B | null | undefined) => (...a: A) => Option<NonNullable<B>>;
/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Employee {
 *   readonly company?: {
 *     readonly address?: {
 *       readonly street?: {
 *         readonly name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category interop
 * @since 2.9.0
 */
export declare const chainNullableK: <A, B>(f: (a: A) => B | null | undefined) => (ma: Option<A>) => Option<NonNullable<B>>;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @category interop
 * @since 2.0.0
 */
export declare const toNullable: <A>(ma: Option<A>) => A | null;
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category interop
 * @since 2.0.0
 */
export declare const toUndefined: <A>(ma: Option<A>) => A | undefined;
/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 * import * as N from 'fp-ts/number'
 *
 * assert.strictEqual(pipe(some(1), elem(N.Eq)(1)), true)
 * assert.strictEqual(pipe(some(1), elem(N.Eq)(2)), false)
 * assert.strictEqual(pipe(none, elem(N.Eq)(1)), false)
 *
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): {
    (a: A): (ma: Option<A>) => boolean;
    (a: A, ma: Option<A>): boolean;
};
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
export declare const exists: <A>(predicate: Predicate<A>) => (ma: Option<A>) => boolean;
/**
 * @since 2.9.0
 */
export declare const Do: Option<{}>;
/**
 * @since 2.8.0
 */
export declare const bindTo: <N extends string>(name: N) => <A>(fa: Option<A>) => Option<{ readonly [K in N]: A; }>;
/**
 * @since 2.8.0
 */
export declare const bind: <N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => Option<B>) => (ma: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B; }>;
/**
 * @since 2.8.0
 */
export declare const apS: <N extends string, A, B>(name: Exclude<N, keyof A>, fb: Option<B>) => (fa: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B; }>;
/**
 * @since 2.11.0
 */
export declare const ApT: Option<readonly []>;
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(f: (index: number, a: A) => Option<B>) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>;
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.11.0
 */
export declare const traverseReadonlyArrayWithIndex: <A, B>(f: (index: number, a: A) => Option<B>) => (as: readonly A[]) => Option<readonly B[]>;
/**
 * @since 2.9.0
 */
export declare const traverseArrayWithIndex: <A, B>(f: (index: number, a: A) => Option<B>) => (as: ReadonlyArray<A>) => Option<ReadonlyArray<B>>;
/**
 * @since 2.9.0
 */
export declare const traverseArray: <A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<readonly B[]>;
/**
 * @since 2.9.0
 */
export declare const sequenceArray: <A>(arr: ReadonlyArray<Option<A>>) => Option<ReadonlyArray<A>>;
/**
 * Use `Refinement` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export declare function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B>;
/**
 * Use [`chainNullableK`](#chainnullablek) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
export declare const mapNullable: <A, B>(f: (a: A) => B | null | undefined) => (ma: Option<A>) => Option<NonNullable<B>>;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export declare const option: Monad1<URI> & Foldable1<URI> & Alternative1<URI> & Extend1<URI> & Witherable1<URI> & MonadThrow1<URI>;
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export declare const getApplySemigroup: <A>(S: Semigroup<A>) => Semigroup<Option<A>>;
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export declare const getApplyMonoid: <A>(M: Monoid<A>) => Monoid<Option<A>>;
/**
 * Use
 *
 * ```ts
 * import { first } from 'fp-ts/Semigroup'
 * import { getMonoid } from 'fp-ts/Option'
 *
 * getMonoid(first())
 * ```
 *
 * instead.
 *
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(b) | some(b)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export declare const getFirstMonoid: <A = never>() => Monoid<Option<A>>;
/**
 * Use
 *
 * ```ts
 * import { last } from 'fp-ts/Semigroup'
 * import { getMonoid } from 'fp-ts/Option'
 *
 * getMonoid(last())
 * ```
 *
 * instead.
 *
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(b) | some(b)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export declare const getLastMonoid: <A = never>() => Monoid<Option<A>>;