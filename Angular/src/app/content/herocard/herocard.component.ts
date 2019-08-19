import { Component, OnInit, Input } from '@angular/core';
import { Herocard } from 'src/app/interfaces/herocard';
import { Deck } from 'src/app/interfaces/deck';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Token } from '../../interfaces/token';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-herocard',
  templateUrl: './herocard.component.html',
  styleUrls: ['./herocard.component.css']
})
export class HerocardComponent implements OnInit {
  @Input() herocards: Herocard;
  @Input() storeView: boolean;
  @Input() userView: boolean;
  @Input() playable: boolean;

  token$: Observable<Token>;
  user: User;
  closeResult: string;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.CheckToken();
    this.token$ = this.authService.token$;
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.UserInfo().subscribe(x => this.user = x);
  }

  onBuyCard(herocard: Herocard): void {
    console.log(`Buying ${herocard.Name}`, herocard);
    this.dataService.buyHerocard(herocard)
      .subscribe(
        result => {
          this.modalService.dismissAll();
          this.toastrService.success('Card bought and added to your deck!');
          this.router.navigate(['main']);
          console.log(result);
        },
        error => {
          this.toastrService.error('Not enough heropoints?');
          console.log(error);
        },
        () => {}
      );
  }

  onSellCard(herocard: Herocard): void {
    console.log(`Selling ${herocard.Name}`, herocard);
    this.dataService.sellHerocard(herocard)
      .subscribe(
        result => {
          this.modalService.dismissAll();
          this.toastrService.info('Card sold');
          this.router.navigate(['user']);
          console.log(result);
        },
        error => {
          this.toastrService.error('Something went wrong');
          console.log(error);
        },
        () => {}
      );
  }

  onSetHerocardPlayable(herocard: Herocard): void {
    this.dataService.setHerocardPlayable(herocard)
      .subscribe(
        result => {
          this.playable = true;
          this.toastrService.info('Card set as playable');
          console.log(result);
        },
        error => {
          this.toastrService.show('Something went wrong!');
          console.log(error);
        },
        () => {}
      );
  }

  onDetails(content) {
    this.modalService.open(content, {ariaLabelledBy: 'Herocard details'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
      }
  }
}
