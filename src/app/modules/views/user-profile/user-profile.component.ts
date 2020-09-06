import { Component, OnInit } from '@angular/core';
import { AppAccountService } from '../../core/appservices/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminTransferViewModel } from '../../core/api-models/admin-transfer-view-model';
const like = 'LIKE';
const dislike = 'DISLIKE';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  public showErrMsg = true;
  public showModal = false;
  public showSuccessModal = false;
  public currentUserId: number;
  public myBalance: number;
  public transferAmnt: number;
  public transactionHash: string;

  public user: {
    name: string,
    email: string,
    role: string,
    walletAddress: string,
    balance: number,
    totalViews: number,
    totalLikes: number,
    totalComments: number,
    userVideos: VideoData[],
  };

  constructor(private router: Router, private route: ActivatedRoute, private accountService: AppAccountService) {
    this.user = {
      balance: 0,
      email: '',
      name: '',
      role: '',
      walletAddress: '',
      totalComments: 0,
      totalLikes: 0,
      totalViews: 0,
      userVideos: []
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      var userId = params["user_id"] || null;
      this.initUserProfile(userId);
      this.currentUserId = userId;
    });
  }

  initUserProfile(userId: string) {
    const userSub = this.accountService.userProfile(userId).subscribe(res => {
      this.user.name = res.data.name;
      this.user.email = res.data.email;
      this.user.role = res.data.userType;
      this.user.walletAddress = res.data.address;
      // Transactions
      // this.user.userTransactions = [];

      // Videos
      let userVids: VideoData[] = [];
      for (let i = 0; i < res.data.userVideo.length; i++) {
        userVids.push({
          title: res.data.userVideo[i].title,
          views: res.data.userVideo[i].viewed,
          dislikes: res.data.userVideo[i].videoAction.filter(elem => { return elem.action === like; }).length,
          likes: res.data.userVideo[i].videoAction.filter(elem => { return elem.action === dislike; }).length,
          comments: res.data.userVideo[i].videoComment.length,
          slug: res.data.userVideo[i].slug
        });
        this.user.totalViews += parseInt(res.data.userVideo[i].viewed);
        this.user.totalLikes += res.data.userVideo[i].videoAction.filter(elem => { return elem.action === like; }).length;
        this.user.totalComments += res.data.userVideo[i].videoComment.length;
      }
      this.user.userVideos = userVids;
      userSub.unsubscribe();
    });
  }

  showTransferModal() {
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
}

class VideoData {
  title: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  slug: string;
};
