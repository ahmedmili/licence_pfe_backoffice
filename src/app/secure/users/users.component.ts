import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  columns = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.all().subscribe(
      users => {
        this.dataSource.data = users;
      }
    );  
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    if (confirm('Are you sure ?')) {
      this.userService.delete(id).subscribe(() => {
        const newData: User[] = [];
        this.dataSource.data.forEach((p: unknown) => {
          if ((p as User).id !== id) {
            let updatedData: User[] = [];
            updatedData.push(p as User);
          }
        });
        this.dataSource.data = newData;
        this.router.navigate(['/users']);
      });


    }
  }

}
