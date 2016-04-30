
import Cookies from 'js-cookie';
import Config from '../../config.js';
import $ from 'jquery';

var account = null;
var sessionId = null;

class ApiHelpers{

  static getAccount(){
    if(account === null){
      try{
        account = JSON.parse(Cookies.get('account'));
      }catch(e){}
    }
    return account;
  }

  static getSessionId(){
    if(sessionId === null){
      sessionId = Cookies.get('sessionId');
    }
    return sessionId;
  }

  static setAccount(acc){
    account = acc;
    Cookies.set('account', JSON.stringify(acc));
  }

  static setSessionId(ses){
    sessionId = ses;
    Cookies.set('sessionId', ses);
  }

  static getApiUrl(){
    return Config.apiUrl;
  }

  static apiUrl(path){
    var p = Config.apiUrl + path;
    if(/\?/.exec(p)) p += "&sessionId=" + sessionId;
    else p += "?sessionId=" + sessionId;
    console.log(p);
    return p;
  }

  static apiGet(path){
    var url = ApiHelpers.apiUrl(path);
    return new Promise(function(resolve, reject){
      $.get(url)
        .done(resolve)
        .fail(reject);
    });
  }

  static apiPost(path, data){
    var url = ApiHelpers.apiUrl(path);
    return new Promise(function(resolve, reject){
      $.post(url, data, null, 'json')
        .done(resolve)
        .fail(reject);
    });
  }

}


export default ApiHelpers;
