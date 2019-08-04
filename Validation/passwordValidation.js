export default class PasswordValidator {
    constructor(password){
        this.password=password;
    }
    validatePassword=()=>{
        let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return re.test(this.password);
    }
}