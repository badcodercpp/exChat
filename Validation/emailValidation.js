export default class EmailValidator{
    constructor(email){
        this.email=email;
    }
    validateEmail=()=>{
        let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return re.test(this.email);
    }
}