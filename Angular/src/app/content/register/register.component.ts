import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: Register;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerForm.disable();
      const newUser: Register = {
        Email: this.registerForm.controls.Email.value,
        Password: this.registerForm.controls.Password.value,
        ConfirmPassword: this.registerForm.controls.ConfirmPassword.value
      };

      this.authService.Register(newUser).subscribe(newRegister => {
        this.toastrService.success('User registration successful', newRegister);
        this.authService.Login(newUser.Email, newUser.Password).subscribe(
          token => {
            this.authService.SetToken(token);
            this.toastrService.info('Login successfull');
            this.router.navigate(['']);
          },
          error => {
            this.toastrService.error('Login failed', error);
          },
          () => this.registerForm.enable()
        );
      },
      error => {
        this.toastrService.error('Registration failed', error);
      });
    }
  }
}
