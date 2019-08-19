import { Component, OnInit } from '@angular/core';
import { Herocard } from 'src/app/interfaces/herocard';
import { Comment } from 'src/app/interfaces/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  herocards: Herocard[];
  herocardForm: FormGroup;
  tmpHerocard: Herocard;

  allComments: Comment[];
  flaggedComments: Comment[];
  commentForm: FormGroup;
  tmpComment: Comment;

  allUsers: User[];
  userForm: FormGroup;
  tmpUser: User;

  btnCreate = false;
  btnUpdate = false;
  tmpSearchComment = false;
  tmpSearchUser = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.herocardForm = this.fb.group({
      Id: [''],
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Health: ['', Validators.required],
      Attack_Power: ['', Validators.required],
      Defense_Power: ['', Validators.required],
      Level_Power: ['', Validators.required],
      Price: ['', Validators.required],
      Poster: [''],
      Active: [''],
      Visible: ['']
    });
    this.commentForm = this.fb.group({
      Id: [''],
      PosterId: ['', Validators.required],
      CardId: ['', Validators.required],
      Message: ['', Validators.required],
      isFlagged: ['', Validators.required],
      Visible: [''],
      Created: [''],
      Updated: [''],
      Username: ['']
    });
    this.userForm = this.fb.group({
      Id: [''],
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Points: ['']
    });
    this.getAllHerocards();
    this.getAllComments();
    this.getAllUsers();
    this.getAllFlaggedComments();
  }

  getAllHerocards() {
    this.adminService.getHerocards()
      .subscribe(x => this.herocards = x);
  }

  getAllComments() {
    this.adminService.getAllComments()
      .subscribe(x => { this.allComments = x; console.log(x); });
  }

  getAllUsers() {
    this.adminService.getAllUsers()
      .subscribe(x => { this.allUsers = x; console.log(x); });
  }

  getAllFlaggedComments() {
    this.adminService.getAllFlaggedComments()
      .subscribe(x => this.flaggedComments = x);
  }

  onCommentFilterOptions() {
    this.tmpSearchComment = !this.tmpSearchComment;
  }

  onUserFilterOptions() {
    this.tmpSearchUser = !this.tmpSearchUser;
  }

  onHerocardSubmit() {
    if (this.herocardForm.valid) {
      this.herocardForm.disable();

      if (this.btnUpdate) {
        this.adminService.putHerocard(this.herocardForm.value).subscribe(x => {
          this.toastrService.show('Herocard updated!');
          this.tmpHerocard = null;
          this.getAllHerocards();
          this.herocardForm.enable();
        });

      } else if (this.btnCreate) {
      this.adminService.createHerocard(this.herocardForm.value).subscribe(x => {
        this.tmpHerocard = null;
        this.getAllHerocards();
        this.resetHerocardForm();
        });
      }
    }
    this.btnUpdate = false;
    this.btnCreate = false;
  }

  onCommentSubmit() {
    if (this.commentForm.valid) {
      this.commentForm.disable();

      if (this.btnUpdate) {
        this.adminService.updateComment(this.commentForm.value).subscribe(x => {
          this.toastrService.show('Comment updated!');
          this.tmpComment = null;
          this.getAllComments();
          this.commentForm.enable();
        });
      }
    }
    this.btnUpdate = false;
    this.btnCreate = false;
  }

  onUserSubmit() {
    if (this.userForm.valid) {
      this.userForm.disable();

      if (this.btnUpdate) {
        this.adminService.updateUser(this.userForm.value).subscribe(x => {
          this.toastrService.show('User updated!');
          this.tmpUser = null;
          this.getAllUsers();
          this.userForm.enable();
        });
      }
    }
    this.btnUpdate = false;
  }

  onLoadHerocardToEdit(herocard: Herocard) {
    window.scrollTo(0, 0);
    this.btnUpdate = true;
    this.herocardForm.controls.Id.setValue(herocard.Id);
    this.herocardForm.controls.Name.setValue(herocard.Name);
    this.herocardForm.controls.Description.setValue(herocard.Description);
    this.herocardForm.controls.Health.setValue(herocard.Health);
    this.herocardForm.controls.Attack_Power.setValue(herocard.Attack_Power);
    this.herocardForm.controls.Defense_Power.setValue(herocard.Defense_Power);
    this.herocardForm.controls.Level_Power.setValue(herocard.Level_Power);
    this.herocardForm.controls.Price.setValue(herocard.Price);
    this.herocardForm.controls.Poster.setValue(herocard.Poster);
    this.herocardForm.controls.Active.setValue(herocard.Active);
    this.herocardForm.controls.Visible.setValue(herocard.Visible);
    this.tmpHerocard = herocard;
  }

  onLoadCommentToEdit(comment: Comment) {
    window.scrollTo(0, 0);
    this.btnUpdate = true;
    this.commentForm.controls.Id.setValue(comment.Id);
    this.commentForm.controls.PosterId.setValue(comment.PosterId);
    this.commentForm.controls.CardId.setValue(comment.CardId);
    this.commentForm.controls.Message.setValue(comment.Message);
    this.commentForm.controls.isFlagged.setValue(comment.isFlagged);
    this.commentForm.controls.Visible.setValue(comment.Visible);
    this.commentForm.controls.Updated.setValue(comment.Updated);
    this.commentForm.controls.Created.setValue(comment.Created);
    this.commentForm.controls.Username.setValue(comment.Username);
    this.tmpComment = comment;
  }

  onLoadUserToEdit(user: User) {
    window.scrollTo(0, 0);
    this.btnUpdate = true;
    this.userForm.controls.Id.setValue(user.Id);
    this.userForm.controls.Email.setValue(user.Email);
    this.userForm.controls.Username.setValue(user.UserName);
    this.userForm.controls.Points.setValue(user.Points);
    this.tmpUser = user;
  }

  onCreateHerocard() {
    this.btnCreate = true;
    this.herocardForm.reset();
    this.tmpHerocard = {
      Name: null,
      Description: null,
      Health: null,
      Attack_Power: null,
      Defense_Power: null,
      Level_Power: null,
      Price: null,
      Poster: null,
      Active: null,
      Visible: null
    };
    console.log(this.herocardForm);
  }

  onRegisterNewUser() {
    this.router.navigate(['/register']);
  }

  onDeleteHerocard(id: number) {
    if (confirm('Are you sure you want to delete this herocard?')) {
      this.adminService.deleteHerocard(id).subscribe(() =>  {
        this.toastrService.warning('Herocard deleted!');
        this.getAllHerocards();
        this.resetHerocardForm();
        this.tmpHerocard = null;
        this.btnUpdate = false;
      });
    }
  }

  onDeleteComment(id: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.adminService.deleteComment(id).subscribe(() =>  {
        this.toastrService.warning('Comment deleted!');
        this.getAllComments();
        this.resetCommentForm();
        this.tmpComment = null;
        this.btnUpdate = false;
      });
    }
  }

  onDeleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(() => {
        this.toastrService.warning('User deleted!');
        this.getAllUsers();
        this.resetUserForm();
        this.tmpUser = null;
        this.btnUpdate = false;
      });
     }
  }

  cancelHerocardForm() {
    this.tmpHerocard = null;
    this.resetHerocardForm();
  }

  cancelCommentForm() {
    this.tmpComment = null;
    this.resetCommentForm();
  }

  cancelUserForm() {
    this.tmpUser = null;
    this.resetUserForm();
  }

  resetHerocardForm() {
    this.herocardForm.reset();
  }

  resetCommentForm() {
    this.commentForm.reset();
  }

  resetUserForm() {
    this.userForm.reset();
  }

}
