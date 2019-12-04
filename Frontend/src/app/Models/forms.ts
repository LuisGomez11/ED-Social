import { FormGroup, FormControl, Validators } from "@angular/forms";

export class Forms {

    FormLogin() {
        return new FormGroup({
            userName: new FormControl('', {
                validators: [Validators.required, Validators.minLength(4)]
            }),
            password: new FormControl('', {
                validators: [Validators.required]
            })
        });
    }

    FormSignUp() {
        return new FormGroup({
            userName: new FormControl('', {
                validators: [Validators.required, Validators.minLength(4)]
            }),
            password: new FormControl('', {
                validators: [Validators.required]
            }),
            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            name: new FormControl('', {
                validators: [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
            })
        });
    }

}