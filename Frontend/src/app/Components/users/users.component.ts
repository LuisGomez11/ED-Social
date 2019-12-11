import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User;
  allUsers: User[];
  users: User[];

  constructor(private service: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.auth.getStorage();
    this.service.getUsers().subscribe(res => {
      this.allUsers = res;
      this.users = this.allUsers.filter(us => us._id !== this.user._id );
    });

  }

  viewProfile(id: string) {
    localStorage.removeItem('id');
    localStorage.setItem('id', id);
    this.router.navigate(['profile']);
  }
}
