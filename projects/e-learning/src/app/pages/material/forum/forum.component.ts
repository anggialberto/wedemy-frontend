import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Forum } from '@bootcamp-elearning/models/forum';
import { ForumService } from '@bootcamp-elearning/services/forum.service';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  forums: any[];

  idDetailModuleRegistration: string;

  comment: string;
  replyComment: string;

  isShowReplyEditor: number = -1;

  defaultImg: string = "/assets/img/profile-default.jpeg";

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private forumService: ForumService) {
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetailModuleRegistration = params['idDtlModuleRgs'];
        this.getForum(this.idDetailModuleRegistration);
      });
  }

  getForum(idDetailModuleRegistration: string): void {
    this.forumService.getForum(idDetailModuleRegistration).subscribe(
      res => {
        this.forums = res.data
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  post(): void {
    let data: Forum = new Forum();
    data.contentText = this.comment;
    data.idUser = {
      id: this.authService.getUserId()
    };
    data.idDetailModuleRegistration = {
      id: this.idDetailModuleRegistration
    }
    this.forumService.postForum(data).subscribe(
      res => {
        console.log(res);
        this.getForum(this.idDetailModuleRegistration);
        this.comment = '';
      },
      err => {
        console.log(err);
      }
    )
  }

  reply(forumId: string): void {
    let reply = {
      contentText: this.replyComment,
      idUser: { id: this.authService.getUserId() },
      idForum: { id: forumId }
    }
    this.forumService.replyPostForum(reply).subscribe(
      res => {
        console.log(res);
        this.getForum(this.idDetailModuleRegistration);
        this.comment = '';
        this.replyComment = '';
      },
      err => {
        console.log(err);
      }
    )
  }

  showReplyEditor(replyEditorIndex: number): void {
    if (this.isShowReplyEditor === replyEditorIndex) {
      this.isShowReplyEditor = -1;
    } else {
      this.isShowReplyEditor = replyEditorIndex;
    }
    this.replyComment = '';
  }

}
