import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  columns = ['id', 'name', 'email', 'phone','birthday','sexe', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  loaded = false;
  search: string = '';
  status!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource.data = users;
        this.loaded = true;
      }
    );
  }


  toggleStatus(user: User) {
    if (user.status === 'ACTIVE') {
      user.status = 'INACTIVE';
    } else if (user.status === 'INACTIVE') {
      user.status = 'ACTIVE';
    }
    this.userService.updateUserStatus(user.id, user.status).subscribe(
      user => {
        user;
      }
    );
  }


  getStatusInputValue(status: any) {
    this.status = status;
    this.SearchUser();
  }


  SearchUser() {
    this.userService.getUsers(this.search, this.status).subscribe(users => {
      this.dataSource.data = users;
      console.log(users);
    });
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  delete(id: number): void {
    if (confirm('Are you sure ?')) {
      this.userService.delete(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((u: any) => u.id !== id);
        this.snackbarService.openSnackBar("id "+id+" with sucess ","deleted")
      });


    }
  }

}
