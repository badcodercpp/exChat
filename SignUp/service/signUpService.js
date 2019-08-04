export class SignupThisUser {
    constructor(mindatoryPayload){
        this._body=mindatoryPayload;
    }
    fetchStatusHandler=(response) => {
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(response.statusText);
      }
    }
    signUptheUser=(url,method,acceptType,contentType)=>{
        return fetch(url, {
            method: method,
            headers: {
              Accept: acceptType,
              'AppAuthorize':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o",
              'Content-Type': contentType,
            },
            body: this._body,
          })
    }
}