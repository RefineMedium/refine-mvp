import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Our Modules
import { BroadcasterService } from '../appservices/broadcaster/broadcaster.service';
import { AppState } from 'src/app/models/app-state';
import { AppEvents } from 'src/app/models/appenums';
import { AppEvent } from 'src/app/models/appevents';

/* ****************** App State service. *****************
Used to store app state as observables
components subscribe to data as needed and values are delivered by this service injection
 ********************************************************/
@Injectable({
  providedIn: 'root'
})

export class AppStateService {
  private _appState$: BehaviorSubject<AppState>;

  constructor(private broadcaster: BroadcasterService) {
    this._appState$ = new BehaviorSubject<AppState>(new AppState());

    const self = this;

    // subscribe to some events of the application
    this.broadcaster.receive<any>('AppEvent').subscribe({
      next(response) {
        self.onEventTriggered(response);
      },
      error(err) {
        self.onAppError(err);
      },
      complete() { }
    });
  }

  // recieve events
  onEventTriggered($event) {
    switch ($event.id) {
      case AppEvents.LoggedIn: {
        this._appState$.value.isLoggedIn$.next($event.data);
        break;
      }
      case AppEvents.SetUser: {
        this._appState$.value.currentUser$.next($event.data);
        break;
      }
      default:
        break;
    }
  }

  // TODO Global error handler, how does mosaic handle this ?
  onAppError(appError) {
    alert(appError);
  }

  public sendEvent(eventId, payLoad) {
    const eventData = new AppEvent(
      eventId,
      `App Event Created: Id ${eventId}`,
      payLoad
    );
    this.broadcaster.broadcast('AppEvent', eventData);
  }

  // Observable accessors
  public isLoggedIn() {
    return this._appState$.value.isLoggedIn$;
  }
  public currentUser() {
    return this._appState$.value.currentUser$;
  }
  public currentTest() {
    return this._appState$.value;
  }

}
