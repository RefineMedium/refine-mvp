import { VideoData } from './video-data';

export interface UserDataViewModel {
    address: string;
    amount: number;
    userId: number;
    email: string;
    password: string;
    userType: string;
    userStatus: string;
    createdAt: Date;
    updatedAt: Date;
    isEmailVerified: boolean;
    createdBy?: number;
    updatedBy?: any;
    webUrl?: any;
    referrerCode?: any;
    name: string;
    userVideo: VideoData[];
    authenticated?: any;
    blocked: boolean;
    enabled: boolean;
    authorities?: any;
    username: string;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    ethAmount: number;
}