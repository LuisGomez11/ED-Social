import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { PublicationService } from 'src/app/Services/publication.service';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { Publication } from 'src/app/Models/publication';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  User: User;
  UserSession: User;

  publications: Publication[];
  allPublications: Publication[];

  token: String;

  UserNew: Subject<User> = new BehaviorSubject(new User());

  constructor(private auth: AuthService,
    private service: PublicationService,
    private serviceUser: UserService,
    private router: Router
  ) {
    this.User = new User();
  }

  ngOnInit() {
    
    this.token = this.auth.getToken();
    this.UserSession = this.auth.getStorage();
    const id = localStorage.getItem('id');

    if (!id) {
      alert('Acción invalida');
      this.router.navigate(['home']);
      return;
    }
    this.serviceUser.getUser(id).subscribe(res => {
      this.User = res;
      this.getPublications();
    })
    
  }

  getPublications() {
    this.service.getPublications().subscribe(res => {
      this.publications = res.reverse();
      this.allPublications = res.reverse();
      this.publications = this.allPublications.filter(us => us.user === this.User.name );
    })
  }

  UploadImage(event) {
    if(event.target.files[0] !== undefined){
      this.UserNew.subscribe(user => {
        this.serviceUser.uploadImage(this.token, event.target.files[0]).subscribe(newUser => {
          this.auth.setItemStorage(newUser);
          this.UserNew.next(newUser);
          window.location.reload();
        });
      }, err => console.log(err)).unsubscribe();
    }
  }

}
