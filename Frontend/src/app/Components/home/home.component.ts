import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list: any[]

  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getStorage();
    this.list = [1,1,1,1,1,1,1,1,1]
  }

  logOut(){
    this.auth.logOut();
  }

}
