export class LoginService {
    constructor(mindatoryPayload){
        this.loginHash=mindatoryPayload.LoginHash;
        this.passwordHash=mindatoryPayload.PasswordHash;
    }
    loginApiRequest=(url,method,contentType,acceptType)=>{
        return fetch(url, {
            method: method,
            headers: {
              Accept: acceptType,
              'Content-Type': contentType,
            },
            body:JSON.stringify({Mobile:this.loginHash,Password:this.passwordHash}),
          })
    }
}