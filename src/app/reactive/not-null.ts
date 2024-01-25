import {filter, MonoTypeOperatorFunction, Observable, pipe} from 'rxjs';

export function notNull<T>(): MonoTypeOperatorFunction<T> {
  return (source) => source.pipe(filter(value => value != null))
}
