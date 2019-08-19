import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Herocard } from 'src/app/interfaces/herocard';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Token } from '../../interfaces/token';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  token$: Observable<Token>;
  herocards: Herocard[];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    if (this.authService.GetToken()) {
      this.dataService.getUserDecks().subscribe(x => { this.herocards = x; console.log(x); });
    }
  }
}
