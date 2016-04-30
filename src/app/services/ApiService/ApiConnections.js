
import ApiHelpers from './ApiHelpers';

class ApiConnections{

  static getConns(){
    return ApiHelpers.apiGet("/conns");
  }
  static getConnectionsByPair(item1Id, item2Id, connection){
    return ApiHelpers.apiGet("/conns/pair?connection=" + (connection || "similar") + '&item1Id=' + item1Id + '&item2Id=' + item2Id);
  }
  static getConnectionsByPairStrict(item1Id, item2Id, connection){
    return ApiHelpers.apiGet("/conns/pair/strict?connection=" + (connection || "similar") + '&item1Id=' + item1Id + '&item2Id=' + item2Id);
  }


}


export default ApiConnections;
