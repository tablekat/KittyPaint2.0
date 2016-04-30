
import ApiHelpers from './ApiHelpers';
import $ from 'jquery';

class ApiItems{

  static getItems(){
    return ApiHelpers.apiGet("/items");
  }

  static getItem(id){
    return ApiHelpers.apiGet("/items/" + id);
  }

  static hypeUp(id){
    return ApiHelpers.apiPost("/items/" + id + "/hypes/up");
  }
  static hypeDown(id){
    return ApiHelpers.apiPost("/items/" + id + "/hypes/down");
  }

  static addFriend(userId){
    return ApiHelpers.apiPost("/items/" + userId + "/friend/add");
  }
  static confirmFriend(connId){
    return ApiHelpers.apiPost("/items/" + connId + "/friend/confirm"); // todo: this is ugly, just go by friend userId.
  }

  static createTextPost(message){
    return ApiHelpers.apiPost("/items/create/textpost", {
      description: message,
      // location: ... todo
    });
  }

  static createPicture(message, file){
    var fd = new FormData();
    fd.append('file', file);
    fd.append('description', message);

    return new Promise(function(resolve, reject){
      $.ajax({
        url: ApiHelpers.apiUrl("/items/pictures/create"),
        type: 'post',
        data: fs,
        headers: { 'Content-Type': undefined }, // wait what
        dataType: 'json'
      }).done(resolve).fail(reject);
    });
  }

  static getHomeStream(){
    return ApiHelpers.apiGet("/items/stream/home");
  }

  static getFriends(id){
    return ApiHelpers.apiGet("/items/users/" + (id || "me") + "/friends");
  }

  static getPosts(id){
    return ApiHelpers.apiGet("/items/users/" + (id || "me") + "/posts");
  }
  
  static getItemsByConnectionType(itemId, connection){
    return ApiHelpers.apiGet("/items/" + itemId + "/" + (connection ? connection : "similar"));
  }

}

export default ApiItems;
