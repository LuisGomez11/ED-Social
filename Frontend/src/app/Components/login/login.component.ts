import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Forms } from 'src/app/Models/forms';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FormControl: FormGroup = new Forms().FormLogin();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login() {
    if (this.FormControl.valid) {
      await this.auth.Login(this.FormControl.value).subscribe(res => {
        localStorage.setItem('token', res.Token);
        this.auth.setItemStorage(res.User);
        this.router.navigate(['/home']);
      });
    } else {
      Swal.fire(
        'Error!',
        'Verifique que todo este bien',
        'error'
      );
    }

  }

}
