import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Forms } from 'src/app/Models/forms';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  FormControl: FormGroup = new Forms().FormSignUp();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  async signUp(){
    if(this.FormControl.valid){
      await this.auth.SignUp(this.FormControl.value).subscribe(res => {
        Swal.fire(
          'Correcto!',
          'Cuenta registrada correctamente',
          'success'
        );
        this.FormControl.reset();
      });
    } else{
      Swal.fire(
        'Error!',
        'Verifique que todo este bien',
        'error'
      );
    }

  }

}
