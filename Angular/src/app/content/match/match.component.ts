import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Herocard } from 'src/app/interfaces/herocard';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private userService: UserService
  ) { }
  token$: Observable<Token>;
  userDecks: Herocard[];
  playableUserDecks: Herocard[];
  showYouCards = false;
  showYouPlayableCards = true;

    userDeck = [
      this.userDecks
    ];

    playableDeck = [
      this.playableUserDecks
    ];

  ngOnInit() {
    if (this.authService.GetToken()) {
      this.dataService.getUserDecks().subscribe(x => { this.userDecks = x; console.log(x); });
      this.dataService.getPlayableUserDecks().subscribe(x => { this.playableUserDecks = x; console.log(x); });
      this.userService.UserInfo();
    }
  }

  showYourCards() {
    this.showYouCards = !this.showYouCards;
  }

  showPlayableCards() {
    this.showYouPlayableCards = !this.showYouPlayableCards;
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }
}
