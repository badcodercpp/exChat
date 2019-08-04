export default class NameValidator {
    constructor(name){
        this.name=name;
    }
    validateName(){
        let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}$/;
        return re.test(this.name);
    }
}