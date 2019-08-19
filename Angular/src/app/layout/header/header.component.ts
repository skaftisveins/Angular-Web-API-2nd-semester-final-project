import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../interfaces/token';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  auth$: Observable<Token>;
  user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authService.CheckToken();
    this.auth$ = this.authService.token$;
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.UserInfo()
      .subscribe(x => {
      console.log(x);
      this.user = x;
    });
  }

  logout(): void {
    this.authService.Logout().subscribe(x => this.authService.RemoveToken());
    this.toastrService.warning('Logout successfull!');
    this.router.navigate(['']);
  }
}
