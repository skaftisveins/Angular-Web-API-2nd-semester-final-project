import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './content/main/main.component';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './content/register/register.component';
import { AdminComponent } from './content/admin/admin.component';
import { AdminGuard, AuthGuard } from './guards/auth.guard';
import { HerocardComponent } from './content/herocard/herocard.component';
import { UserComponent } from './content/user/user.component';
import { MatchComponent } from './content/match/match.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'herocard', component: HerocardComponent },
  { path: 'match', component: MatchComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
