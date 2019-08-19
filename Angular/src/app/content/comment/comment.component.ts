import { Component, OnInit, Input } from '@angular/core';
import { Herocard } from 'src/app/interfaces/herocard';
import { Comment } from '../../interfaces/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { Token } from '../../interfaces/token';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() cardId: number;
  auth$: Observable<Token>;
  card: Herocard;

  comments: Comment[];
  flaggedComments: Comment[];
  commentForm: FormGroup;
  tmpComment: Comment;
  flag: boolean;

  btnComment = false;
  btnCreate = true;
  btnUpdate = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private authService: AuthService,
    private commentService: CommentService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      Message: ['', Validators.required]
    });
    this.authService.CheckToken();
    this.auth$ = this.authService.token$;
    this.getFlaggedComments();
    this.getAllComments();
  }

  getAllComments() {
    this.commentService.getComments(this.cardId)
      .subscribe(x => { this.comments = x; console.log(x); } );
  }

  getFlaggedComments() {
    this.commentService.getFlaggedComments(this.cardId)
      .subscribe(x => { this.flaggedComments = x; console.log(x); });
  }

  onShowCommentForm() {
    this.btnComment = true;
  }

  onFlagComment(comment: Comment) {
    this.commentService.flagComment(comment)
      .subscribe(
        result => {
          if (!comment.isFlagged) {
            this.flag = true;
            this.toastrService.show('Comment flagged!');
            this.getAllComments();
            console.log(result);
          } else {
            this.flag = true;
            this.toastrService.error('Comment already flagged!');
          }
        },
        error => {
          this.toastrService.show('Something went wrong!');
          console.log(error);
        },
        () => {}
      );
  }

  flagStyles(): any {
    return {
      okFlag: this.comments, redFlag: this.flaggedComments
    };
  }

  onEditComment(comment: Comment) {
    this.btnComment = true;
    this.btnUpdate = true;
    this.btnCreate = false;
    this.commentForm.controls.Message.setValue(comment.Message);
    this.tmpComment = comment;
  }

  onRemoveComment(id: number) {
    this.commentService.removeComment(id).subscribe(); {
      this.commentForm.reset();
    }
    this.getAllComments();
  }

  onDeleteComment(id: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.adminService.deleteComment(id).subscribe(() =>  {
        this.toastrService.warning('Comment deleted!');
        this.getAllComments();
      });
    }
  }

  onSubmitComment(): void {
    if (this.btnUpdate) {
        this.tmpComment.Message = this.commentForm.controls.Message.value;
        console.log(this.tmpComment);
        this.commentService.editComment(this.tmpComment)
          .subscribe(x => {
            this.commentForm.reset();
            this.getAllComments();
            window.scrollTo(0, 0);
            this.btnComment = false;
        });
    } else {
      const newComment: Comment = {
        Message: this.commentForm.controls.Message.value,
        CardId: this.cardId
      };
      console.log(newComment);
      this.commentService.postComment(newComment)
        .subscribe(x => {
          this.tmpComment = null;
          this.commentForm.reset();
          this.getAllComments();
          window.scrollTo(0, 0);
          this.btnComment = false;
        });
    }
    this.btnCreate = false;
    this.btnUpdate = false;
  }

  onCancelCommentForm() {
    this.btnComment = false;
    this.tmpComment = null;
    this.commentForm.reset();
  }
}
