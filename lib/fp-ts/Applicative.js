"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApplicativeComposition = getApplicativeComposition;
exports.getApplicativeMonoid = getApplicativeMonoid;

var _Apply = require("./Apply");

var _function = require("./function");

var _Functor = require("./Functor");

/**
 * The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
 * of type `f a` from values of type `a`.
 *
 * Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
 * wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
 * function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
 * any number of function arguments.
 *
 * Instances must satisfy the following laws in addition to the `Apply` laws:
 *
 * 1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
 * 2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
 * 3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`
 *
 * Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`
 *
 * @since 2.0.0
 */
function getApplicativeMonoid(F) {
  var f = (0, _Apply.getApplySemigroup)(F);
  return function (M) {
    return {
      concat: f(M).concat,
      empty: F.of(M.empty)
    };
  };
} // -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation

/**
 * @since 2.0.0
 * @deprecated
 */


/** @deprecated */
function getApplicativeComposition(F, G) {
  var map = (0, _Functor.getFunctorComposition)(F, G).map;

  var _ap = (0, _Apply.ap)(F, G);

  return {
    map: map,
    of: function of(a) {
      return F.of(G.of(a));
    },
    ap: function ap(fgab, fga) {
      return (0, _function.pipe)(fgab, _ap(fga));
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mcC10cy9BcHBsaWNhdGl2ZS50cyJdLCJuYW1lcyI6WyJnZXRBcHBsaWNhdGl2ZU1vbm9pZCIsIkYiLCJmIiwiTSIsImNvbmNhdCIsImVtcHR5Iiwib2YiLCJnZXRBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uIiwiRyIsIm1hcCIsIl9hcCIsImEiLCJhcCIsImZnYWIiLCJmZ2EiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBbUJBOztBQUNBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTZGTyxTQUFTQSxvQkFBVCxDQUFpQ0MsQ0FBakMsRUFBNEY7QUFDakcsTUFBTUMsQ0FBQyxHQUFHLDhCQUFrQkQsQ0FBbEIsQ0FBVjtBQUNBLFNBQU8sVUFBSUUsQ0FBSjtBQUFBLFdBQXNCO0FBQzNCQyxNQUFBQSxNQUFNLEVBQUVGLENBQUMsQ0FBQ0MsQ0FBRCxDQUFELENBQUtDLE1BRGM7QUFFM0JDLE1BQUFBLEtBQUssRUFBRUosQ0FBQyxDQUFDSyxFQUFGLENBQUtILENBQUMsQ0FBQ0UsS0FBUDtBQUZvQixLQUF0QjtBQUFBLEdBQVA7QUFJRCxDLENBRUQ7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQXFLQTtBQUNPLFNBQVNFLHlCQUFULENBQXlDTixDQUF6QyxFQUE0RE8sQ0FBNUQsRUFBNkc7QUFDbEgsTUFBTUMsR0FBRyxHQUFHLG9DQUFzQlIsQ0FBdEIsRUFBeUJPLENBQXpCLEVBQTRCQyxHQUF4Qzs7QUFDQSxNQUFNQyxHQUFHLEdBQUcsZUFBR1QsQ0FBSCxFQUFNTyxDQUFOLENBQVo7O0FBQ0EsU0FBTztBQUNMQyxJQUFBQSxHQUFHLEVBQUhBLEdBREs7QUFFTEgsSUFBQUEsRUFBRSxFQUFFLFlBQUNLLENBQUQ7QUFBQSxhQUFPVixDQUFDLENBQUNLLEVBQUYsQ0FBS0UsQ0FBQyxDQUFDRixFQUFGLENBQUtLLENBQUwsQ0FBTCxDQUFQO0FBQUEsS0FGQztBQUdMQyxJQUFBQSxFQUFFLEVBQUUsWUFBQ0MsSUFBRCxFQUFPQyxHQUFQO0FBQUEsYUFBZSxvQkFBS0QsSUFBTCxFQUFXSCxHQUFHLENBQUNJLEdBQUQsQ0FBZCxDQUFmO0FBQUE7QUFIQyxHQUFQO0FBS0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBgQXBwbGljYXRpdmVgIHR5cGUgY2xhc3MgZXh0ZW5kcyB0aGUgYEFwcGx5YCB0eXBlIGNsYXNzIHdpdGggYSBgb2ZgIGZ1bmN0aW9uLCB3aGljaCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgdmFsdWVzXG4gKiBvZiB0eXBlIGBmIGFgIGZyb20gdmFsdWVzIG9mIHR5cGUgYGFgLlxuICpcbiAqIFdoZXJlIGBBcHBseWAgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gbGlmdCBmdW5jdGlvbnMgb2YgdHdvIG9yIG1vcmUgYXJndW1lbnRzIHRvIGZ1bmN0aW9ucyB3aG9zZSBhcmd1bWVudHMgYXJlXG4gKiB3cmFwcGVkIHVzaW5nIGBmYCwgYW5kIGBGdW5jdG9yYCBwcm92aWRlcyB0aGUgYWJpbGl0eSB0byBsaWZ0IGZ1bmN0aW9ucyBvZiBvbmUgYXJndW1lbnQsIGBwdXJlYCBjYW4gYmUgc2VlbiBhcyB0aGVcbiAqIGZ1bmN0aW9uIHdoaWNoIGxpZnRzIGZ1bmN0aW9ucyBvZiBfemVyb18gYXJndW1lbnRzLiBUaGF0IGlzLCBgQXBwbGljYXRpdmVgIGZ1bmN0b3JzIHN1cHBvcnQgYSBsaWZ0aW5nIG9wZXJhdGlvbiBmb3JcbiAqIGFueSBudW1iZXIgb2YgZnVuY3Rpb24gYXJndW1lbnRzLlxuICpcbiAqIEluc3RhbmNlcyBtdXN0IHNhdGlzZnkgdGhlIGZvbGxvd2luZyBsYXdzIGluIGFkZGl0aW9uIHRvIHRoZSBgQXBwbHlgIGxhd3M6XG4gKlxuICogMS4gSWRlbnRpdHk6IGBBLmFwKEEub2YoYSA9PiBhKSwgZmEpIDwtPiBmYWBcbiAqIDIuIEhvbW9tb3JwaGlzbTogYEEuYXAoQS5vZihhYiksIEEub2YoYSkpIDwtPiBBLm9mKGFiKGEpKWBcbiAqIDMuIEludGVyY2hhbmdlOiBgQS5hcChmYWIsIEEub2YoYSkpIDwtPiBBLmFwKEEub2YoYWIgPT4gYWIoYSkpLCBmYWIpYFxuICpcbiAqIE5vdGUuIGBGdW5jdG9yYCdzIGBtYXBgIGNhbiBiZSBkZXJpdmVkOiBgQS5tYXAoeCwgZikgPSBBLmFwKEEub2YoZiksIHgpYFxuICpcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5pbXBvcnQgeyBBcHBseSwgQXBwbHkxLCBBcHBseTIsIEFwcGx5MkMsIEFwcGx5MywgQXBwbHkzQywgQXBwbHk0LCBhcCwgZ2V0QXBwbHlTZW1pZ3JvdXAgfSBmcm9tICcuL0FwcGx5J1xuaW1wb3J0IHsgcGlwZSB9IGZyb20gJy4vZnVuY3Rpb24nXG5pbXBvcnQge1xuICBGdW5jdG9yQ29tcG9zaXRpb24sXG4gIEZ1bmN0b3JDb21wb3NpdGlvbjExLFxuICBGdW5jdG9yQ29tcG9zaXRpb24xMixcbiAgRnVuY3RvckNvbXBvc2l0aW9uMTJDLFxuICBGdW5jdG9yQ29tcG9zaXRpb24yMSxcbiAgRnVuY3RvckNvbXBvc2l0aW9uMjIsXG4gIEZ1bmN0b3JDb21wb3NpdGlvbjIyQyxcbiAgRnVuY3RvckNvbXBvc2l0aW9uMkMxLFxuICBGdW5jdG9yQ29tcG9zaXRpb25IS1QxLFxuICBGdW5jdG9yQ29tcG9zaXRpb25IS1QyLFxuICBGdW5jdG9yQ29tcG9zaXRpb25IS1QyQyxcbiAgZ2V0RnVuY3RvckNvbXBvc2l0aW9uXG59IGZyb20gJy4vRnVuY3RvcidcbmltcG9ydCB7IEhLVCwgS2luZCwgS2luZDIsIEtpbmQzLCBLaW5kNCwgVVJJUywgVVJJUzIsIFVSSVMzLCBVUklTNCB9IGZyb20gJy4vSEtUJ1xuaW1wb3J0IHsgTW9ub2lkIH0gZnJvbSAnLi9Nb25vaWQnXG5pbXBvcnQgeyBQb2ludGVkLCBQb2ludGVkMSwgUG9pbnRlZDIsIFBvaW50ZWQyQywgUG9pbnRlZDMsIFBvaW50ZWQzQywgUG9pbnRlZDQgfSBmcm9tICcuL1BvaW50ZWQnXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIG1vZGVsXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogQGNhdGVnb3J5IHR5cGUgY2xhc3Nlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpdmU8Rj4gZXh0ZW5kcyBBcHBseTxGPiwgUG9pbnRlZDxGPiB7fVxuXG4vKipcbiAqIEBjYXRlZ29yeSB0eXBlIGNsYXNzZXNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aXZlMTxGIGV4dGVuZHMgVVJJUz4gZXh0ZW5kcyBBcHBseTE8Rj4sIFBvaW50ZWQxPEY+IHt9XG5cbi8qKlxuICogQGNhdGVnb3J5IHR5cGUgY2xhc3Nlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpdmUyPEYgZXh0ZW5kcyBVUklTMj4gZXh0ZW5kcyBBcHBseTI8Rj4sIFBvaW50ZWQyPEY+IHt9XG5cbi8qKlxuICogQGNhdGVnb3J5IHR5cGUgY2xhc3Nlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpdmUyQzxGIGV4dGVuZHMgVVJJUzIsIEU+IGV4dGVuZHMgQXBwbHkyQzxGLCBFPiwgUG9pbnRlZDJDPEYsIEU+IHt9XG5cbi8qKlxuICogQGNhdGVnb3J5IHR5cGUgY2xhc3Nlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpdmUzPEYgZXh0ZW5kcyBVUklTMz4gZXh0ZW5kcyBBcHBseTM8Rj4sIFBvaW50ZWQzPEY+IHt9XG5cbi8qKlxuICogQGNhdGVnb3J5IHR5cGUgY2xhc3Nlc1xuICogQHNpbmNlIDIuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpdmUzQzxGIGV4dGVuZHMgVVJJUzMsIEU+IGV4dGVuZHMgQXBwbHkzQzxGLCBFPiwgUG9pbnRlZDNDPEYsIEU+IHt9XG5cbi8qKlxuICogQGNhdGVnb3J5IHR5cGUgY2xhc3Nlc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpdmU0PEYgZXh0ZW5kcyBVUklTND4gZXh0ZW5kcyBBcHBseTQ8Rj4sIFBvaW50ZWQ0PEY+IHt9XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHV0aWxzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogTGlmdCBhIG1vbm9pZCBpbnRvICdGJywgdGhlIGlubmVyIHZhbHVlcyBhcmUgY29uY2F0ZW5hdGVkIHVzaW5nIHRoZSBwcm92aWRlZCBgTW9ub2lkYC5cbiAqXG4gKiBAc2luY2UgMi4xMC4wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZU1vbm9pZDxGIGV4dGVuZHMgVVJJUzQ+KFxuICBGOiBBcHBsaWNhdGl2ZTQ8Rj5cbik6IDxBLCBTLCBSLCBFPihNOiBNb25vaWQ8QT4pID0+IE1vbm9pZDxLaW5kNDxGLCBTLCBSLCBFLCBBPj5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZU1vbm9pZDxGIGV4dGVuZHMgVVJJUzM+KFxuICBGOiBBcHBsaWNhdGl2ZTM8Rj5cbik6IDxBLCBSLCBFPihNOiBNb25vaWQ8QT4pID0+IE1vbm9pZDxLaW5kMzxGLCBSLCBFLCBBPj5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZU1vbm9pZDxGIGV4dGVuZHMgVVJJUzMsIEU+KFxuICBGOiBBcHBsaWNhdGl2ZTNDPEYsIEU+XG4pOiA8QSwgUj4oTTogTW9ub2lkPEE+KSA9PiBNb25vaWQ8S2luZDM8RiwgUiwgRSwgQT4+XG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVNb25vaWQ8RiBleHRlbmRzIFVSSVMyPihcbiAgRjogQXBwbGljYXRpdmUyPEY+XG4pOiA8QSwgRT4oTTogTW9ub2lkPEE+KSA9PiBNb25vaWQ8S2luZDI8RiwgRSwgQT4+XG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVNb25vaWQ8RiBleHRlbmRzIFVSSVMyLCBFPihcbiAgRjogQXBwbGljYXRpdmUyQzxGLCBFPlxuKTogPEE+KE06IE1vbm9pZDxBPikgPT4gTW9ub2lkPEtpbmQyPEYsIEUsIEE+PlxuZXhwb3J0IGZ1bmN0aW9uIGdldEFwcGxpY2F0aXZlTW9ub2lkPEYgZXh0ZW5kcyBVUklTPihGOiBBcHBsaWNhdGl2ZTE8Rj4pOiA8QT4oTTogTW9ub2lkPEE+KSA9PiBNb25vaWQ8S2luZDxGLCBBPj5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZU1vbm9pZDxGPihGOiBBcHBsaWNhdGl2ZTxGPik6IDxBPihNOiBNb25vaWQ8QT4pID0+IE1vbm9pZDxIS1Q8RiwgQT4+XG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVNb25vaWQ8Rj4oRjogQXBwbGljYXRpdmU8Rj4pOiA8QT4oTTogTW9ub2lkPEE+KSA9PiBNb25vaWQ8SEtUPEYsIEE+PiB7XG4gIGNvbnN0IGYgPSBnZXRBcHBseVNlbWlncm91cChGKVxuICByZXR1cm4gPEE+KE06IE1vbm9pZDxBPikgPT4gKHtcbiAgICBjb25jYXQ6IGYoTSkuY29uY2F0LFxuICAgIGVtcHR5OiBGLm9mKE0uZW1wdHkpXG4gIH0pXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGRlcHJlY2F0ZWRcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gdHNsaW50OmRpc2FibGU6IGRlcHJlY2F0aW9uXG5cbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aXZlQ29tcG9zaXRpb248RiwgRz4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb248RiwgRz4ge1xuICByZWFkb25seSBvZjogPEE+KGE6IEEpID0+IEhLVDxGLCBIS1Q8RywgQT4+XG4gIHJlYWRvbmx5IGFwOiA8QSwgQj4oZmdhYjogSEtUPEYsIEhLVDxHLCAoYTogQSkgPT4gQj4+LCBmZ2E6IEhLVDxGLCBIS1Q8RywgQT4+KSA9PiBIS1Q8RiwgSEtUPEcsIEI+PlxufVxuXG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uSEtUMTxGLCBHIGV4dGVuZHMgVVJJUz4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb25IS1QxPEYsIEc+IHtcbiAgcmVhZG9ubHkgb2Y6IDxBPihhOiBBKSA9PiBIS1Q8RiwgS2luZDxHLCBBPj5cbiAgcmVhZG9ubHkgYXA6IDxBLCBCPihmZ2FiOiBIS1Q8RiwgS2luZDxHLCAoYTogQSkgPT4gQj4+LCBmZ2E6IEhLVDxGLCBLaW5kPEcsIEE+PikgPT4gSEtUPEYsIEtpbmQ8RywgQj4+XG59XG5cbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aXZlQ29tcG9zaXRpb25IS1QyPEYsIEcgZXh0ZW5kcyBVUklTMj4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb25IS1QyPEYsIEc+IHtcbiAgcmVhZG9ubHkgb2Y6IDxFLCBBPihhOiBBKSA9PiBIS1Q8RiwgS2luZDI8RywgRSwgQT4+XG4gIHJlYWRvbmx5IGFwOiA8RSwgQSwgQj4oZmdhYjogSEtUPEYsIEtpbmQyPEcsIEUsIChhOiBBKSA9PiBCPj4sIGZnYTogSEtUPEYsIEtpbmQyPEcsIEUsIEE+PikgPT4gSEtUPEYsIEtpbmQyPEcsIEUsIEI+PlxufVxuXG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uSEtUMkM8RiwgRyBleHRlbmRzIFVSSVMyLCBFPiBleHRlbmRzIEZ1bmN0b3JDb21wb3NpdGlvbkhLVDJDPEYsIEcsIEU+IHtcbiAgcmVhZG9ubHkgb2Y6IDxBPihhOiBBKSA9PiBIS1Q8RiwgS2luZDI8RywgRSwgQT4+XG4gIHJlYWRvbmx5IGFwOiA8QSwgQj4oZmdhYjogSEtUPEYsIEtpbmQyPEcsIEUsIChhOiBBKSA9PiBCPj4sIGZnYTogSEtUPEYsIEtpbmQyPEcsIEUsIEE+PikgPT4gSEtUPEYsIEtpbmQyPEcsIEUsIEI+PlxufVxuXG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uMTE8RiBleHRlbmRzIFVSSVMsIEcgZXh0ZW5kcyBVUklTPiBleHRlbmRzIEZ1bmN0b3JDb21wb3NpdGlvbjExPEYsIEc+IHtcbiAgcmVhZG9ubHkgb2Y6IDxBPihhOiBBKSA9PiBLaW5kPEYsIEtpbmQ8RywgQT4+XG4gIHJlYWRvbmx5IGFwOiA8QSwgQj4oZmdhYjogS2luZDxGLCBLaW5kPEcsIChhOiBBKSA9PiBCPj4sIGZnYTogS2luZDxGLCBLaW5kPEcsIEE+PikgPT4gS2luZDxGLCBLaW5kPEcsIEI+PlxufVxuXG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uMTI8RiBleHRlbmRzIFVSSVMsIEcgZXh0ZW5kcyBVUklTMj4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb24xMjxGLCBHPiB7XG4gIHJlYWRvbmx5IG9mOiA8RSwgQT4oYTogQSkgPT4gS2luZDxGLCBLaW5kMjxHLCBFLCBBPj5cbiAgcmVhZG9ubHkgYXA6IDxFLCBBLCBCPihcbiAgICBmZ2FiOiBLaW5kPEYsIEtpbmQyPEcsIEUsIChhOiBBKSA9PiBCPj4sXG4gICAgZmdhOiBLaW5kPEYsIEtpbmQyPEcsIEUsIEE+PlxuICApID0+IEtpbmQ8RiwgS2luZDI8RywgRSwgQj4+XG59XG5cbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aXZlQ29tcG9zaXRpb24xMkM8RiBleHRlbmRzIFVSSVMsIEcgZXh0ZW5kcyBVUklTMiwgRT4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb24xMkM8RiwgRywgRT4ge1xuICByZWFkb25seSBvZjogPEE+KGE6IEEpID0+IEtpbmQ8RiwgS2luZDI8RywgRSwgQT4+XG4gIHJlYWRvbmx5IGFwOiA8QSwgQj4oZmdhYjogS2luZDxGLCBLaW5kMjxHLCBFLCAoYTogQSkgPT4gQj4+LCBmZ2E6IEtpbmQ8RiwgS2luZDI8RywgRSwgQT4+KSA9PiBLaW5kPEYsIEtpbmQyPEcsIEUsIEI+PlxufVxuXG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uMjE8RiBleHRlbmRzIFVSSVMyLCBHIGV4dGVuZHMgVVJJUz4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb24yMTxGLCBHPiB7XG4gIHJlYWRvbmx5IG9mOiA8RSwgQT4oYTogQSkgPT4gS2luZDI8RiwgRSwgS2luZDxHLCBBPj5cbiAgcmVhZG9ubHkgYXA6IDxFLCBBLCBCPihcbiAgICBmZ2FiOiBLaW5kMjxGLCBFLCBLaW5kPEcsIChhOiBBKSA9PiBCPj4sXG4gICAgZmdhOiBLaW5kMjxGLCBFLCBLaW5kPEcsIEE+PlxuICApID0+IEtpbmQyPEYsIEUsIEtpbmQ8RywgQj4+XG59XG5cbi8qKlxuICogQHNpbmNlIDIuMC4wXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aXZlQ29tcG9zaXRpb24yQzE8RiBleHRlbmRzIFVSSVMyLCBHIGV4dGVuZHMgVVJJUywgRT4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb24yQzE8RiwgRywgRT4ge1xuICByZWFkb25seSBvZjogPEE+KGE6IEEpID0+IEtpbmQyPEYsIEUsIEtpbmQ8RywgQT4+XG4gIHJlYWRvbmx5IGFwOiA8QSwgQj4oZmdhYjogS2luZDI8RiwgRSwgS2luZDxHLCAoYTogQSkgPT4gQj4+LCBmZ2E6IEtpbmQyPEYsIEUsIEtpbmQ8RywgQT4+KSA9PiBLaW5kMjxGLCBFLCBLaW5kPEcsIEI+PlxufVxuXG4vKipcbiAqIEBzaW5jZSAyLjAuMFxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uMjI8RiBleHRlbmRzIFVSSVMyLCBHIGV4dGVuZHMgVVJJUzI+IGV4dGVuZHMgRnVuY3RvckNvbXBvc2l0aW9uMjI8RiwgRz4ge1xuICByZWFkb25seSBvZjogPEZFLCBHRSwgQT4oYTogQSkgPT4gS2luZDI8RiwgRkUsIEtpbmQyPEcsIEdFLCBBPj5cbiAgcmVhZG9ubHkgYXA6IDxGRSwgR0UsIEEsIEI+KFxuICAgIGZnYWI6IEtpbmQyPEYsIEZFLCBLaW5kMjxHLCBHRSwgKGE6IEEpID0+IEI+PixcbiAgICBmZ2E6IEtpbmQyPEYsIEZFLCBLaW5kMjxHLCBHRSwgQT4+XG4gICkgPT4gS2luZDI8RiwgRkUsIEtpbmQyPEcsIEdFLCBCPj5cbn1cblxuLyoqXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpdmVDb21wb3NpdGlvbjIyQzxGIGV4dGVuZHMgVVJJUzIsIEcgZXh0ZW5kcyBVUklTMiwgRT4gZXh0ZW5kcyBGdW5jdG9yQ29tcG9zaXRpb24yMkM8RiwgRywgRT4ge1xuICByZWFkb25seSBvZjogPEZFLCBBPihhOiBBKSA9PiBLaW5kMjxGLCBGRSwgS2luZDI8RywgRSwgQT4+XG4gIHJlYWRvbmx5IGFwOiA8RkUsIEEsIEI+KFxuICAgIGZnYWI6IEtpbmQyPEYsIEZFLCBLaW5kMjxHLCBFLCAoYTogQSkgPT4gQj4+LFxuICAgIGZnYTogS2luZDI8RiwgRkUsIEtpbmQyPEcsIEUsIEE+PlxuICApID0+IEtpbmQyPEYsIEZFLCBLaW5kMjxHLCBFLCBCPj5cbn1cblxuLyoqXG4gKiBVc2UgW2BhcGBdKC4vQXBwbHkudHMuaHRtbCNhcCkgaW5zdGVhZC5cbiAqXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uPEYgZXh0ZW5kcyBVUklTMiwgRyBleHRlbmRzIFVSSVMyLCBFPihcbiAgRjogQXBwbGljYXRpdmUyPEY+LFxuICBHOiBBcHBsaWNhdGl2ZTJDPEcsIEU+XG4pOiBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uMjJDPEYsIEcsIEU+XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uPEYgZXh0ZW5kcyBVUklTMiwgRyBleHRlbmRzIFVSSVMyPihcbiAgRjogQXBwbGljYXRpdmUyPEY+LFxuICBHOiBBcHBsaWNhdGl2ZTI8Rz5cbik6IEFwcGxpY2F0aXZlQ29tcG9zaXRpb24yMjxGLCBHPlxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVDb21wb3NpdGlvbjxGIGV4dGVuZHMgVVJJUzIsIEcgZXh0ZW5kcyBVUklTMiwgRT4oXG4gIEY6IEFwcGxpY2F0aXZlMjxGPixcbiAgRzogQXBwbGljYXRpdmUyQzxHLCBFPlxuKTogQXBwbGljYXRpdmVDb21wb3NpdGlvbjIyQzxGLCBHLCBFPlxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVDb21wb3NpdGlvbjxGIGV4dGVuZHMgVVJJUzIsIEcgZXh0ZW5kcyBVUklTPihcbiAgRjogQXBwbGljYXRpdmUyPEY+LFxuICBHOiBBcHBsaWNhdGl2ZTE8Rz5cbik6IEFwcGxpY2F0aXZlQ29tcG9zaXRpb24yMTxGLCBHPlxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVDb21wb3NpdGlvbjxGIGV4dGVuZHMgVVJJUywgRyBleHRlbmRzIFVSSVMyPihcbiAgRjogQXBwbGljYXRpdmUxPEY+LFxuICBHOiBBcHBsaWNhdGl2ZTI8Rz5cbik6IEFwcGxpY2F0aXZlQ29tcG9zaXRpb24xMjxGLCBHPlxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVDb21wb3NpdGlvbjxGIGV4dGVuZHMgVVJJUywgRyBleHRlbmRzIFVSSVMyLCBFPihcbiAgRjogQXBwbGljYXRpdmUxPEY+LFxuICBHOiBBcHBsaWNhdGl2ZTJDPEcsIEU+XG4pOiBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uMTJDPEYsIEcsIEU+XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uPEYgZXh0ZW5kcyBVUklTLCBHIGV4dGVuZHMgVVJJUz4oXG4gIEY6IEFwcGxpY2F0aXZlMTxGPixcbiAgRzogQXBwbGljYXRpdmUxPEc+XG4pOiBBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uMTE8RiwgRz5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFwcGxpY2F0aXZlQ29tcG9zaXRpb248RiwgRyBleHRlbmRzIFVSSVMyPihcbiAgRjogQXBwbGljYXRpdmU8Rj4sXG4gIEc6IEFwcGxpY2F0aXZlMjxHPlxuKTogQXBwbGljYXRpdmVDb21wb3NpdGlvbkhLVDI8RiwgRz5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFwcGxpY2F0aXZlQ29tcG9zaXRpb248RiwgRyBleHRlbmRzIFVSSVMyLCBFPihcbiAgRjogQXBwbGljYXRpdmU8Rj4sXG4gIEc6IEFwcGxpY2F0aXZlMkM8RywgRT5cbik6IEFwcGxpY2F0aXZlQ29tcG9zaXRpb25IS1QyQzxGLCBHLCBFPlxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwbGljYXRpdmVDb21wb3NpdGlvbjxGLCBHIGV4dGVuZHMgVVJJUz4oXG4gIEY6IEFwcGxpY2F0aXZlPEY+LFxuICBHOiBBcHBsaWNhdGl2ZTE8Rz5cbik6IEFwcGxpY2F0aXZlQ29tcG9zaXRpb25IS1QxPEYsIEc+XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBsaWNhdGl2ZUNvbXBvc2l0aW9uPEYsIEc+KEY6IEFwcGxpY2F0aXZlPEY+LCBHOiBBcHBsaWNhdGl2ZTxHPik6IEFwcGxpY2F0aXZlQ29tcG9zaXRpb248RiwgRz5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFwcGxpY2F0aXZlQ29tcG9zaXRpb248RiwgRz4oRjogQXBwbGljYXRpdmU8Rj4sIEc6IEFwcGxpY2F0aXZlPEc+KTogQXBwbGljYXRpdmVDb21wb3NpdGlvbjxGLCBHPiB7XG4gIGNvbnN0IG1hcCA9IGdldEZ1bmN0b3JDb21wb3NpdGlvbihGLCBHKS5tYXBcbiAgY29uc3QgX2FwID0gYXAoRiwgRylcbiAgcmV0dXJuIHtcbiAgICBtYXAsXG4gICAgb2Y6IChhKSA9PiBGLm9mKEcub2YoYSkpLFxuICAgIGFwOiAoZmdhYiwgZmdhKSA9PiBwaXBlKGZnYWIsIF9hcChmZ2EpKVxuICB9XG59XG4iXX0=