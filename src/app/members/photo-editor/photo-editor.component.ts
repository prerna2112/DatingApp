import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';

import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photo: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl  = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(private auth: AuthService, private userService: UserService , private alertify: AlertifyService){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.auth.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType : ['image'],
      isHTML5: true,
      autoUpload: false,
      method: 'post',
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; } ;
    this.hasBaseDropZoneOver = false;
    this.uploader.onSuccessItem = (item, res , status, headers) => {
      if (res){
        const responseObj: Photo = JSON.parse(res);
        const photo = {
          id: responseObj.id,
          url: responseObj.url,
          dateAdded: responseObj.dateAdded,
          description: responseObj.description,
          isMain: responseObj.isMain
        };
        this.photo.push(photo);
        if (photo.isMain){
          this.auth.changeMemberPhoto(photo.url);
          this.auth.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
        }
      }
    };
  }

  ngOnInit(){
    //this.initializeUploader();

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setAsMainPhoto(photo: Photo){
    this.userService.setMainphoto(this.auth.decodedToken.nameid, photo.id).subscribe(() => {
    this.currentMainPhoto = this.photo.filter(p => p.isMain === true)[0];
    this.currentMainPhoto.isMain = false;
    photo.isMain = true;
    this.auth.changeMemberPhoto(photo.url);
    this.auth.currentUser.photoUrl = photo.url;
    localStorage.setItem('user', JSON.stringify(this.auth.currentUser));

  }, error => {
    this.alertify.error('Error adding main photo');
  });
  }
  deletePhoto(photoId: number){
this.alertify.confirm('Are you sure you want to delete this photo?', () =>
{
  this.userService.deletePhoto(this.auth.decodedToken.nameid, photoId).subscribe(() => {
  this.photo.splice(this.photo.findIndex(p => p.id === photoId), 1);
  this.alertify.success('deleted successfully!');
  }, error => {
    this.alertify.error('Failed to delete the photo!');
  });
});
  }

}
