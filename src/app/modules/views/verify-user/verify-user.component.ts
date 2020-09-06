import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private accountService: AppAccountService,
    private router: Router, private notifier: NotifierService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params["user_token"] || null;
      if (token === null || token === undefined || token === '') {
        this.router.navigateByUrl('');
      }
      this.accountService.verifyUser(token).subscribe(res => {
        this.notifier.notify("success", "Email Verified Successfully");
      });
    });
  }

}
