import {Component} from "angular2/core";
import {Http, HTTP_PROVIDERS, RequestOptions, RequestMethod, Headers, Request} from "angular2/http";
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from "angular2/common";
import {RegistrationUser} from "./RegistrationUser";
import {User} from "./User";
import 'rxjs/add/operator/map';
import {} from "angular2/common";
import {FORM_PROVIDERS} from "angular2/common";


function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup) => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
            return confirmPassword.setErrors({mismatchedPasswords: true}, false);
        }
    }
}

@Component({
    selector: 'register',
    directives: [FORM_DIRECTIVES],
    templateUrl: 'views/register.html'
})
export class RegisterComponent {
    private user = new RegistrationUser("", "", "", "");
    private users: User[] = [];

    private registerForm;

    constructor(http: Http, formBuilder: FormBuilder) {
        this.registerForm = formBuilder.group({
            name: ["", Validators.required],
            email: ["", Validators.compose([Validators.required, RegisterComponent.emailValidator])],
            password: ["", Validators.compose([Validators.minLength(4), Validators.required])],
            confirmPassword: ["", Validators.compose([Validators.minLength(4), Validators.required])]
        }, {validator: matchingPasswords('password', 'confirmPassword')});

        http.get("http://localhost:8080/users", {
            headers: new Headers({
                'Authorization': 'Basic ' + btoa('mariusz:mariusz')
            })
        })
        .map(res => res.json())
        .subscribe(
            users => {
                this.users = users;
            },
            err => console.log("jakis error")
        );
    }

    onSubmit(value: string): void {
        console.log("you've submitted value: ", value);
    }

    static emailValidator(control: Control): { [s: string]: boolean } {
        if (!control.value.match(/^\w+@\w+/)) {
            return {notEmail: true};
        }
    }
    //passwordValidator(control:Control):{ [s: string]: boolean } {
    //    if (this.password != undefined && control.value != this.password.value) {
    //        return {notTheSame: true};
    //    }
    //}


}