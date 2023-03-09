import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User = {
       id: 0,
    name: "user",
    email: "user@use.user",
    phone:10000
  };
  constructor(
    private authService: AuthService,
    private sneackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    Emitters.userEmitter.subscribe(
      user => {
        this.user = user;
        // console.log(this.user)
      }
    );

  }

  logout(): void {
    this.authService.logout();

  }

}
