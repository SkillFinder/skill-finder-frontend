import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {FormBuilder} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {Validators} from "angular2/common";

@Component({
    selector: 'login-form',
    templateUrl: 'views/login-form.html',
    directives: [FORM_DIRECTIVES]
})
export class LoginFormComponent {

    loginForm: ControlGroup;

    constructor(formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            "login": ["", Validators.required],
            "password":["", Validators.required]
        })
    }


    onSubmit():void {
        console.log(this.loginForm);
    }

}