import { Injectable } from '@angular/core';
import { BroadcasterService } from '../broadcaster/broadcaster.service';
import { AppEvents } from 'src/app/models/appenums';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class AppBaseService {
  private isProcessing = false;
  private showLoadingGif = true;
  @BlockUI() blockUI: NgBlockUI;

  constructor(public broadcaster: BroadcasterService) {
    this.showLoadingGif = true;
    this.showLoadingGif = false;// (showLoadingGif === undefined) ? true : showLoadingGif;
  }

  public processing(showIt: boolean) {
    showIt ? this.blockUI.start() : this.blockUI.stop();
    if (this.showLoadingGif) {
      setTimeout(() => {
        this.isProcessing = showIt;
        this.broadcaster.broadcast(AppEvents.Processing, showIt);
      }, 100);
    }
  }

  public handleError(methodName, err) {
    this.processing(false);
    // if (err.status === 422) { // Validation error for the call, we handle this differently
    //   return this.handleValidationError(err);
    // } else 
    if (err.status === 401) {  // expired token
      return this.handleUnAuthorizedError(err);
    }

    throw (err); // global error handler will catch this and show in toast
  }

  private handleUnAuthorizedError(err) {
    // Un-Authorized, session expired so send them back to login page.
    // app components will check for this 401 and show toast and redirect user to login page
    err.error.Message = 'Your session has expired, you will be logged out.';

    // this.broadcaster.broadcast(AppEvents.ShowToast, {
    //   title: 'Token Expired',
    //   summary: err.error.Message, status: err.status, error: true
    // });

    // this.router.navigateByUrl('/login');

    // this.broadcaster.RedirectToLogin();
  }

}
