import { Component, OnInit } from '@angular/core';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { ContactUsViewModel } from '../../core/api-models/contact-us-view-model';
import { ThrowStmt } from '@angular/compiler';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public formData: { name: string; email: string; phone: number; message: string };
  public errorClasses: { active: boolean; error: boolean };
  public errorMessage: string;
  public submitted: boolean;

  constructor(private accountService: AppAccountService, private notifier: NotifierService) {
    this.formData = { name: null, email: null, phone: null, message: null };
  }

  ngOnInit() {
  }

  submit() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.formData.name === null || this.formData.name === "") {
      this.errorMessage = "Name is required.";
      this.errorClasses = { active: true, error: true };
    } else if (this.formData.email === null || this.formData.email === "") {
      this.errorMessage = "Email is required.";
      this.errorClasses = { active: true, error: true };
    } else if (!re.test(this.formData.email)) {
      this.errorMessage = "Email is invalid.";
      this.errorClasses = { active: true, error: true };
    } else if (this.formData.message === null || this.formData.message === "") {
      this.errorMessage = "Message is required.";
      this.errorClasses = { active: true, error: true };
    } else {
      // this.contactus.add(this.formData);
      let contactModel: ContactUsViewModel;
      contactModel = {
        contactNumber: this.formData.phone.toString(),
        email: this.formData.email,
        message: this.formData.message,
        name: this.formData.name
      };
      const contactSub = this.accountService.contactUs(contactModel).subscribe(res => {
        this.notifier.notify("success", `Your query is submitted successfully!`);
        contactSub.unsubscribe();
      });
      this.submitted = true;
    }
  }

  reset() {
    this.formData = { name: null, email: null, phone: null, message: null };
  }
}
