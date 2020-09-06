/*tslint:disbale*/
import { BaseResponse } from './base-response-model';
import { VideoUserData } from './video-user-data';

export interface VideoViewModel extends BaseResponse {
    data: VideoUserData;
}
