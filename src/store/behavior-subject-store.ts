import { BehaviorSubject } from 'rxjs';

type Cache = {
  key: string;
  client: Storage;
};

type BehaviorSubjectStoreProps<S> = {
  defaultState: S;
  cache?: Cache;
};

export abstract class BehaviorSubjectStore<S> {
  protected subject: BehaviorSubject<S>;

  private _cache?: Cache;
  private _state: S;

  constructor({ defaultState, cache }: BehaviorSubjectStoreProps<S>) {
    const serializedCachedState = cache && cache.client.getItem(cache.key);
    const initialState: S = serializedCachedState ? JSON.parse(serializedCachedState) : defaultState;
    this._state = initialState;
    this.subject = new BehaviorSubject<S>(initialState);
    this._cache = cache;
  }

  public get state() {
    return this._state;
  }

  protected set state(state: S) {
    this._state = state;
    this.subject.next(state);
    if (this._cache) {
      this._cache.client.setItem(this._cache.key, JSON.stringify(state));
    }
  }
}
