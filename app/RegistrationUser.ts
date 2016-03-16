export class RegistrationUser {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    ) {}

    //constructor() {
    //    this("", "", "", "");
    //}
}
