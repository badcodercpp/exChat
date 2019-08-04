export class PushUserDetails {
    constructor(mindatoryPayload){
        this._body=mindatoryPayload;
    }
    pushDetails=(url,method,acceptType,contentType,token)=>{
        return fetch(url, {
            method: method,
            headers: {
              Accept: acceptType,
              'AppAuthorize':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o",
              'Content-Type': contentType,
              'Authorization':`Bearer ${token}`
            },
            body: this._body,
          })
    }
}