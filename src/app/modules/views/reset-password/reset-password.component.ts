import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordViewModel } from '../../core/api-models/reset-password-view-model';
import { AppAccountService } from '../../core/appservices/account/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public confirmPassword: string;
  public password: string;
  public resetPasswordModel: ResetPasswordViewModel;

  constructor(private route: ActivatedRoute, private accountService: AppAccountService,
    private router: Router) {
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.resetPasswordModel.token = params["user_token"] || null;
    });
  }

  resetPassword() {
    this.accountService.resetPassword(this.resetPasswordModel).subscribe(res => {
      this.router.navigateByUrl('');
    });
  }


}
