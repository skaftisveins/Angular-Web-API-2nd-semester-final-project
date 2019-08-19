import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Token } from '../../interfaces/token';
import { DataService } from 'src/app/services/data.service';
import { Herocard } from 'src/app/interfaces/herocard';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  token$: Observable<Token>;
  herocards: Herocard[];
  constructor(
    private authService: AuthService,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getHerocards()
      .subscribe(x => {
         this.herocards = x;
         console.log(x);
      });

    this.authService.GetToken();
    this.token$ = this.authService.token$;
    console.log(this.token$);
  }
}
