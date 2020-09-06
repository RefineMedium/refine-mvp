import { Component, OnInit } from '@angular/core';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { AppVideoService } from '../../core/appservices/video/video.service';
import { AdminTransferViewModel } from '../../core/api-models/admin-transfer-view-model';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { GasPriceUpdate } from '../../core/api-models/gas-price-update';
import { NotifierService } from 'angular-notifier';
const like = 'LIKE';
const dislike = 'DISLIKE';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public isUsersVisible = true;
  public isVideosVisible = false;
  public showErrMsg = true;
  public showModal = false;
  public showSuccessModal = false;
  public isGasPriceErrorVisible = false;
  public isGweiErrorVisible = false;
  public currentUserId: number;
  public myBalance: number;
  public transferAmnt: number;
  public adddress: string;
  public transactionHash: string;
  public gasLimit: number;
  public gwei: number;

  public usersList = [{
    name: '',
    email: '',
    walletAddress: '',
    videosCount: 0,
    userId: 0
  }];
  public videosList = [{
    title: '',
    uploadedBy: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    comments: 0,
    slug: '',
    uploaded_by: ''
  }];

  constructor(public authenticateService: AuthenticationService, private accountService: AppAccountService,
    private videoService: AppVideoService, private router: Router, private notifier: NotifierService) {
    this.usersList = [];
    this.videosList = [];
  }

  ngOnInit() {
    if (!this.authenticateService.authenticated) {
      this.router.navigateByUrl('');
    }
    this.initUsers();
    this.initVideos();
    this.initGasPrice();
  }

  initUsers() {
    const usersSub = this.accountService.getAllUsers().subscribe(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.usersList.push({
          email: res.data[i].email,
          name: res.data[i].name,
          videosCount: res.data[i].userVideo.length,
          walletAddress: res.data[i].email,
          userId: res.data[i].userId
        });
      }
      usersSub.unsubscribe();
    });
  }

  initVideos() {
    const videosSub = this.videoService.getAllVideos().subscribe(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.videosList.push({
          title: res.data[i].title,
          uploadedBy: '',
          views: res.data[i].viewed,
          dislikes: res.data[i].videoAction.filter(elem => { return elem.action === like; }).length,
          likes: res.data[i].videoAction.filter(elem => { return elem.action === dislike; }).length,
          comments: res.data[i].videoComment.length,
          slug: res.data[i].slug,
          uploaded_by: res.data[i].uploadedBy
        });
      }
      videosSub.unsubscribe();
    });
  }

  initGasPrice() {
    const gasPriceSub = this.accountService.getGasPrice().subscribe(res => {
      this.gasLimit = res.data.gasLimit;
      this.gwei = res.data.gwei;
      gasPriceSub.unsubscribe();
    });
    const sub = this.accountService.updateBalance().subscribe(res => {
      this.myBalance = res.data.amount;
      this.adddress = res.data.address;
      sub.unsubscribe();
    });
  }

  updateTabs(opt) {
    switch (opt) {
      case '1':
        this.isUsersVisible = true;
        this.isVideosVisible = false;
        break;
      case '2':
        this.isUsersVisible = false;
        this.isVideosVisible = true;
        break;
    }
  }

  showTransferModal(userId) {
    this.currentUserId = userId;
    const sub = this.accountService.updateBalance().subscribe(res => {
      this.myBalance = res.data.amount;
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
      window.scrollTo(500, 0);
      this.showModal = true;
      sub.unsubscribe();
    });
  }

  closeModal() {
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    this.showModal = false;
  }

  validateAmount(amnt: number) {
    this.transferAmnt = amnt;
    this.showErrMsg = (this.transferAmnt < 1 || this.transferAmnt > this.myBalance);
  }

  validateFormField(val: string, opt: string) {
    if (opt === '1') {
      this.isGasPriceErrorVisible = val === null || parseInt(val) === 0 || val === '';
    } else if (opt === '2') {
      this.isGweiErrorVisible = val === null || parseInt(val) === 0 || val === '';
    }
  }

  transferAmount() {
    let transferModel: AdminTransferViewModel;
    transferModel = {
      amount: this.transferAmnt,
      userId: this.currentUserId
    };
    const trasnferSub = this.accountService.adminTransfer(transferModel).subscribe(res => {
      console.log(res);
      if (res && res.data) {
        this.transactionHash = res.data;
        this.showSuccessModal = true;
      }
      this.showModal = false;
      trasnferSub.unsubscribe();
    });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  updateGasPrice() {
    const gasPrice: GasPriceUpdate = {
      gasLimit: this.gasLimit,
      gwei: this.gwei
    };
    const updateGasPriceSub = this.accountService.updateGasPrice(gasPrice).subscribe(res => {
      this.notifier.notify("success", "Gas Price Updated Successfully");
      updateGasPriceSub.unsubscribe();
    });
  }
}
