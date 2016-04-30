
import ApiHelpers from './ApiHelpers';
import ApiAccount from './ApiAccount';
import ApiConnections from './ApiConnections';
import ApiItems from './ApiItems';


class ApiService{

  static getAccount(){ return ApiHelpers.getAccount(); }
  static getSessionId(){ return ApiHelpers.getSessionId(); }
  static setAccount(acc){ return ApiHelpers.setAccount(acc); }
  static setSessionId(ses){ return ApiHelpers.setSessionId(ses); }

  static imageUrl(imageId){
    return ApiHelpers.apiUrl("/static/images/" + imageId);
  }
  static thumbnailUrl(imageId){
    return ApiHelpers.apiUrl("/static/thumbnails/" + imageId);
  }

}

ApiService.Account = ApiAccount;
ApiService.Conns = ApiConnections;
ApiService.Items = ApiItems;


export default ApiService;
