import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Models/user';
import { PublicationService } from 'src/app/Services/publication.service';
import { Publication } from 'src/app/Models/publication';
import Swal from 'sweetalert2'
import { Forms } from 'src/app/Models/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  FormControl: FormGroup = new Forms().FormPublication();

  publications: Publication[];
  user: User;

  f = new Date();
  currentDate: string;


  constructor(private auth: AuthService, private service: PublicationService, private router: Router) { }

  ngOnInit() {
    this.user = this.auth.getStorage();
    this.getPublications();
    this.currentDate = this.f.getDate() + '/' + (this.f.getMonth() + 1) + '/' + this.f.getFullYear()
      + ' ' + this.f.getHours() + ':' + this.f.getMinutes();
  }

  logOut() {
    this.auth.logOut();
  }

  getPublications() {
    this.service.getPublications().subscribe(res => {
      this.publications = res.reverse();
    })
  }

  async addPublication() {
    this.FormControl.value.createAt = this.currentDate;
    this.FormControl.value.user = this.user.name;
    if (this.FormControl.valid) {
      await this.service.addPublication(this.FormControl.value).subscribe(res => {
        console.log(res);
        this.getPublications();
        this.FormControl.reset();
      });
    } else {
      Swal.fire(
        'Error!',
        'Verifique que todo este bien',
        'error'
      );
    }
  }

  viewProfile(id: string) {
    localStorage.removeItem('id');
    localStorage.setItem('id', id);
    this.router.navigate(['profile']);
  }

}
