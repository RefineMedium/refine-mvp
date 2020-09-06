import { Component, OnInit } from '@angular/core';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { UserTransferViewModel } from '../../core/api-models/user-transfer-view-model';
const like = 'LIKE';
const dislike = 'DISLIKE';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public user: {
    name: string,
    email: string,
    role: string,
    walletAddress: string,
    balance: number,
    etherBalance: number,
    totalViews: number,
    totalLikes: number,
    totalDislikes: number,
    totalComments: number,
    userVideos: VideoData[],
    userTransactions: TransData[]
  };
  public showModal = false;
  public showSuccessModal = false;
  public isTransactionActive = false;
  public showErrMsg = true;
  public showWalletErrMsg = true;
  public isVideoActive = true;
  public transferAmnt: number;
  public toWalletAddress: string;
  public transactionHash: string;

  constructor(public authenticateService: AuthenticationService, private accountService: AppAccountService, private router: Router) {
    this.user = {
      balance: 0,
      etherBalance: 0,
      email: '',
      name: '',
      role: '',
      walletAddress: '',
      totalComments: 0,
      totalLikes: 0,
      totalDislikes: 0,
      totalViews: 0,
      userTransactions: [],
      userVideos: []
    }
  }

  ngOnInit() {
    if (!this.authenticateService.authenticated) {
      this.router.navigateByUrl('');
    }
    this.initMyProfile();
  }

  initMyProfile() {
    const userSub = this.accountService.myProfile().subscribe(res => {
      this.user.name = res.data.name;
      this.user.email = res.data.email;
      this.user.role = res.data.userType;
      this.user.walletAddress = res.data.address;
      this.user.balance = res.data.amount;
      this.user.etherBalance = res.data.ethAmount;

      // Videos
      let userVids: VideoData[] = [];
      for (let i = 0; i < res.data.userVideo.length; i++) {
        userVids.push({
          title: res.data.userVideo[i].title,
          views: res.data.userVideo[i].viewed,
          dislikes: res.data.userVideo[i].videoAction.filter(elem => { return elem.action === dislike; }).length,
          likes: res.data.userVideo[i].videoAction.filter(elem => { return elem.action === like; }).length,
          comments: res.data.userVideo[i].videoComment.length,
          slug: res.data.userVideo[i].slug
        });

        this.user.totalViews += parseInt(res.data.userVideo[i].viewed);
        this.user.totalLikes += res.data.userVideo[i].videoAction.filter(elem => { return elem.action === like; }).length;
        this.user.totalDislikes += res.data.userVideo[i].videoAction.filter(elem => { return elem.action === dislike; }).length;
        this.user.totalComments += res.data.userVideo[i].videoComment.length;
      }
      this.user.userVideos = userVids;
      if (this.authenticateService.isAdmin === "true") {
        // get hot wallet address
        const sub = this.accountService.updateBalance().subscribe(res => {
          this.user.balance = res.data.amount;
          this.user.walletAddress = res.data.address;
          this.initTransactionData();
          sub.unsubscribe();
        });
      }
      if (this.authenticateService.isAdmin === "false") {
        const sub = this.accountService.updateUserBalance().subscribe(res => {
          this.user.balance = res.data;
          // this.user.walletAddress = res.data.address;
          this.initTransactionData();
          sub.unsubscribe();
        });
        this.initTransactionData();
      }
      userSub.unsubscribe();
    });
  }

  initTransactionData() {
    // Transactions
    this.user.userTransactions = [];
    const transSub = this.accountService.getUserTransactions(this.user.walletAddress, 0, 1000).subscribe(res => {
      let userTrans: TransData[] = [];
      for (let i = 0; i < res.data.resultSet.length; i++) {
        userTrans.push({
          amount: res.data.resultSet[i].amount,
          from: res.data.resultSet[i].fromAddress,
          to: res.data.resultSet[i].toAddress,
          transactionHash: res.data.resultSet[i].txnHash,
          status: res.data.resultSet[i].transactionStatus,
        });
      }
      this.user.userTransactions = userTrans;
      transSub.unsubscribe();
    });
  }

  closeModal() {
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
    this.showModal = false;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  showTransferModal() {
    const sub = this.accountService.updateBalance().subscribe(res => {
      this.user.balance = res.data.amount;
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
      window.scrollTo(500, 0);
      this.showModal = true;
      sub.unsubscribe();
    });
  }

  validateAmount(amnt: number) {
    this.transferAmnt = amnt;
    this.showErrMsg = (this.transferAmnt < 1 || this.transferAmnt > this.user.balance);
  }

  validateAddress(address: string) {
    this.toWalletAddress = address;
    this.showWalletErrMsg = (this.toWalletAddress === null || this.toWalletAddress === undefined || this.toWalletAddress === 'showWalletErrMsg');
  }

  transferAmount() {
    let transferModel: UserTransferViewModel;
    transferModel = {
      amount: this.transferAmnt,
      toAddress: this.toWalletAddress
    };
    const trasnferSub = this.accountService.userTransfer(transferModel).subscribe(res => {
      console.log(res);
      if (res && res.data) {
        this.transactionHash = res.data;
        this.showSuccessModal = true;
      }
      this.showModal = false;
      trasnferSub.unsubscribe();
    });
  }

  toggleTab(opt) {
    switch (opt) {
      case '1':
        this.isVideoActive = true;
        this.isTransactionActive = false;
        break;
      case '2':
        this.isVideoActive = false;
        this.isTransactionActive = true;
        break;
    }
  }

}

class VideoData {
  title: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  slug: string;
};

class TransData {
  from: string;
  to: string;
  amount: number;
  transactionHash: string;
  status: string;
};
