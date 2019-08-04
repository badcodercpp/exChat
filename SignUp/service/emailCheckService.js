export class EmailCheckService {
    constructor(mindatoryPayload){
        this.emailText=mindatoryPayload;
        this.fetchStatusHandler=this.fetchStatusHandler.bind(this);
        this.emailCheckApiRequest=this.emailCheckApiRequest.bind(this);
    }
    fetchStatusHandler=(response) => {
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(response.statusText);
      }
    }
    emailCheckApiRequest=(url,method,acceptType)=>{
        return fetch(url + "?email=" + this.emailText , {
            method: method,
            headers: {
              Accept: acceptType,
              'AppAuthorize':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o"
            }
          })
    }
}