export class MobileCheckService {
    constructor(mobile,url,method,acceptType){
        this._mobile=mobile;
        this._url=url;
        this._method=method;
        this._acceptType=acceptType;
    }
    checkMobile=()=>{
        return fetch(this._url + "?userId=" + this._mobile , {
            method: this._method,
            headers: {
              Accept: this._acceptType,
              'AppAuthorize':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o"
            }
          })
    }
}