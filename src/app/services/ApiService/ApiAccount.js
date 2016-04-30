
import ApiHelpers from './ApiHelpers';

class ApiAccount{

  static getAccountId(){
    return ApiHelpers.getAccount()._id;
  }

  static login(email, password){
    return ApiHelpers.apiPost("/login", {
      email: email,
      password: password
    }).then(function(data){
      if(data.account) ApiHelpers.setAccount(data.account)
      if(data.sessionId) ApiHelpers.setSessionId(data.sessionId);
      return data;
    });
  }

  static logout(){
    return ApiHelpers.apiPost("/logout");
  }

  static signup(email, password){
    return ApiHelpers.apiPost("/signup", {
      email: email,
      password: password
    }).then(function(data){
      if(data.account) ApiHelpers.setAccount(data.account)
      if(data.sessionId) ApiHelpers.setSessionId(data.sessionId);
      return data;
    });
  }

  static loginCheck(){
    return ApiHelpers.apiGet("/login/check").then(function(data){
      if(data.account) ApiHelpers.setAccount(data.account)
      if(data.sessionId) ApiHelpers.setSessionId(data.sessionId);
      return data;
    });
  }

  static getAccountByItem(itemId){
    return ApiHelpers.apiGet("/users/item/" + itemId);
  }

}


export default ApiAccount;
