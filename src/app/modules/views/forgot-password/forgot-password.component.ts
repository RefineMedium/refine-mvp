import { Component, OnInit } from '@angular/core';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string;

  constructor(private accountService: AppAccountService, private router: Router) {
    this.email = '';
  }

  ngOnInit() {
  }

  forgotPassword() {
    this.accountService.forgotPassword(this.email).subscribe(res => {
      this.router.navigateByUrl('');
    });
  }

}
