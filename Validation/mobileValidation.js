export default class MobileValidator {
    constructor(mobile){
        this.mobile=mobile;
    }
    validateMobile=()=>{
        let re = /^[0]?[789]\d{9}$/;  
        return re.test(this.mobile);      
    }
}