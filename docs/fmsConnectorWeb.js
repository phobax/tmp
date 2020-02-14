var pod_access_token = "1234";
var user_access_token = "abcd";

class FmsConnector {

  constructor (fms_url) {
    this.fms_url = fms_url;
  }

  cancel_all_orders () {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"/order/cancel_all/", {access_token:user_access_token})
      .then(ret=>{
        res(true);
      })
      .catch (err=> {
        res(false);
      })
    })
  }

  pod_register (id) {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"/pod/register", {"id":id, access_token:pod_access_token})
      .then(ret=>{
        res(true);
      })
      .catch(err=>{
        rej(false);
      })
    })
  }

  pod_unregister () {
    // get(this.fms_url+"/pod/unregister", {"id":this.id})
    // .then(ret=>{})
    // .catch(err=>{})
  }

  get_order (id) {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"/data/get/order/"+id, {access_token:user_access_token})
      .then(ret=>{
        res (ret);
      })
      .catch(err=>{
        rej (null);
      })
    })
  }

  get_orders (pod_id=null) {
    return new Promise ((res, rej)=>{

      var options = {access_token:user_access_token};
      if (pod_id) {
        options["pod_id"] = pod_id;
      }

      get(this.fms_url+"/data/get/orders", options)
      .then(ret=>{
        res (JSON.parse(ret).message);
      })
      .catch(err=>{
        rej (null);
      })
    })
  }

  pod_get (id) {
    return new Promise ((res, rej)=>{
      get (this.fms_url+"/data/get/pod", {pod_id:id, access_token:user_access_token})
      .then(ret=>{
        res(ret);
      })
      .catch(err=>{
        rej(false);
      })
    })
  }

  order_set_user_inside (order_id, inside) {
    return new Promise ((res, rej)=>{
      get (this.fms_url+"/order/set_user_inside", {order_id:order_id, inside:inside, access_token:user_access_token})
      .then(ret=>{
        res(ret);
      })
      .catch(err=>{
        rej(false);
      })
    })
  }

  pod_update_state (state) {
    return new Promise ((res, rej)=>{
      post (this.fms_url+"/pod/update_state", {id:state.id, access_token:pod_access_token}, state)
      // post (this.fms_url+"/pod/update_state", {id:""+state.id}, state)
      .then(ret=>{
        res(ret);
      })
      .catch(err=>{
        rej(err);
      })
    })
  }

  // get (config.fms_url+"/order/handle_feature_event", {order_id:featureEvent.order_id, event_type:featureEvent.event_type})

  order_handle_feature_event (event) {

    return new Promise ((res, rej)=>{
      get (this.fms_url+"/order/handle_feature_event", {order_id:event.order_id, event_type:event.event_type, access_token:user_access_token})
      .then(ret=>{
        res(ret);
      })
      .catch(err=>{
        rej(false);
      })
    })
  }

  pod_get_event_list (id) {
    return new Promise ((res, rej)=>{
      get (this.fms_url+"/pod/get_event_list", {"id":id, access_token:pod_access_token})
      .then(ret=>{
        res(ret.message.list);
      })
      .catch(err=>{
        rej(err);
      })
    })
  }

  pod_next_event (id) {
    return new Promise ((res, rej)=>{
      get (this.fms_url+"/pod/next_event", {"id":id, access_token:pod_access_token})
      .then(ret=>{
        res(ret);
      })
      .catch(err=>{
        rej(err);
      })
    })
  }

  pod_get_current_user (id) {
    return new Promise ((res, rej)=>{
      get (this.fms_url+"/pod/get_current_user", {"id":id, access_token:pod_access_token})
      .then(ret=>{
        if (ret.code==0)
          res(ret.message);
        else
          res(null);
      })
      .catch(err=>{
        rej(err);
      })
    })
  }

  user_set_destination (user_id, destination) {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"set_destination", {user_id, destination, access_token:user_access_token})
      .then(ret=>{
        if (ret.code==0)
          res(true);
        else rej(false);
      })
      .catch(err=>{
        rej(false);
      })
    })
  }

  get_order (id) {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"/data/get/order/"+id, {access_token:user_access_token})
      .then(ret=>{
        res(ret);
      })
      .catch(err=>{
        rej(null);
      })
    })
  }

  user_update_state (state) {
    return new Promise ((res, rej)=>{
      post (this.fms_url+"/user/update_state", {access_token:user_access_token}, state)
      .then(ret=>{
        if (ret.code != 0) rej(false);
        else res(true);
      })
      .catch(err=>{
        rej(false);
      })
    })
  }

  user_request_order (from, to, user_id) {

    return new Promise ((res, rej) => {
      post(this.fms_url+"/order/request", {access_token:user_access_token}, {
        "user_id" : user_id,
        "from" :  from,
        "to" : to
      })
      .then(ret=>{
        ret = JSON.parse(ret);
        if (ret.code==0) {
          res(ret.message);
        }
        else {
          rej(null);
        }
      })
      .catch(err=>{
        rej(null);
      })
    })
  }

  user_confirm_order (order_id) {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"/order/confirm", {order_id : order_id, access_token:user_access_token})
      .then(ret=>{
        ret = JSON.parse(ret);
        res(ret);
      })
      .catch(err=>{
        rej(false);
      })
    })
  }

  user_start_ride (user_id) {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"/user/start_ride", {user_id:user_id, access_token:user_access_token})
      .then(ret=>{
        res(true);
      })
      .catch(err=>{
        rej(err);
      })
    })
  }

  pause() {
    //this.socket.emit("user_command", "pause_ride");
  }

  continue() {
    //this.socket.emit("user_command", "continue_ride");
  }

  end() {
    //this.socket.emit("user_command", "end_ride");
  }

  user_cancel_order (user_id) {
    return new Promise ((res, rej)=>{
      get(this.fms_url+"/order/cancel", {user_id:user_id, access_token:user_access_token})
      .then(ret=>{
        res(true);
      })
      .catch(err=>{
        rej(err);
      })
    })
  }
}

class PodConnector extends FmsConnector {
  constructor (fms_url, id, position) {
    super(fms_url);
    this.state = {
      id,
      position
    }
  }

  updateState (state) {
    this.state = state;
    return this.pod_update_state (this.state);
  }

  updatePodPositionInOrder (order_id, pod_position) {
    return get(this.fms_url+"/pod/update_position_for_order", {order_id, pod_position, access_token:pod_access_token})
  }
}

class UserConnector extends FmsConnector {

  constructor (fms_url, id, position) {
    super(fms_url);
    this.state = {
      id,
      position
    }
    this.order_id = -1;
  }

  requestAndConfirmOrder (from, to) {

    this.user_request_order(from, to, this.state.id)
    .then(ret=>{
      this.user_id = ret.id;
      this.user_confirm_order(ret.id)
    })
    .catch(err=>{
      console.log("err"+err);
    })
  }

  cancelOrder() {
    this.user_cancel_order(this.state.id);
  }
}
