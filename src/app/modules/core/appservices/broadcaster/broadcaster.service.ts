import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})

export class BroadcasterService {
  private _transmission: Subject<BroadcastEvent>;

  constructor() {
    this._transmission = new Subject<BroadcastEvent>();
  }

  public broadcast(key: any, data?: any): void {
    this._transmission.next({ key, data });
  }

  public receive<T>(key: any): Observable<T> {
    return this._transmission.asObservable()
      .pipe(filter(event => event.key === key))
      .pipe(map(event => <T>event.data));
  }
}
