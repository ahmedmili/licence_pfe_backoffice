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
user!:User;
  constructor(
    private authService:AuthService,
    private sneackbarService: SnackbarService
    ) { }

  ngOnInit(): void {
    // this.sneackbarService.openSnackBar("hello", "");
    Emitters.userEmitter.subscribe(
      user=>{
        this.user=user;
      }
    );
    
  }

  logout(): void {
    this.authService.logout();

  }

}
