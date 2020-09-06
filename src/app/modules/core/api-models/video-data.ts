/*tslint:disable*/
import { VideoActionViewModel } from './video-action-view-model';
import { VideoCommentViewModel } from './video-comment-view-model';

export interface VideoData {
    userVideoId: number;
    videoPath: string;
    imagePath: string;
    title: string;
    description: string;
    videoAction: VideoActionViewModel[];
    videoComment: VideoCommentViewModel[];
    creationDate: Date;
    udationDate: Date;
    slug: string;
    viewed: number;
    uploadedBy: string;
}