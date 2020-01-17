var last_event = "";

  function getLocation () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (location)=>{
          debug (location.coords.latitude);
          resolve(location)
        },
        (err)=>{reject(err)},
        {timeout:400, enableHighAccuracy:true}
      );
    });
  }

  function show (str, id="pos") {
    document.getElementById(id).innerHTML = str;
  }


  var _users = {};
  var ORDER = null;
  var cnt = 0;


  function init_client() {
    params = getUrlParams();
    console.log(params);
    if ("location" in params) {
      config.USE_LOCATION = false;
      STATE.position = JSON.parse(params.location);
    }
  }

  function mapToList () {
    STATE.users = [];
    for (var key of Object.keys(_users)) {
      var user = _users[key];
      user["id"] = key;
      STATE.users.push(user);
    }
  }




  function update_event_list (list) {

    var current_event = "";
    document.getElementById("info_event").innerHTML = "";
    for (var i=0; i<list.length; i++) {
      var entry = list[i];
      var div = document.createElement("div");
      div.classList.add("event");
      if (i==0) {
        current_event = entry.type;
        div.classList.add("event_next");
      }
      div.innerHTML = entry.type+"<br>"+entry.userId;
      document.getElementById("info_event").appendChild(div);
    }

    if ((current_event=="onboard_pickup" || current_event=="goto_pickup") && current_event != last_event) {
      proximity(0);
    }

    if ((current_event=="offboard_dropoff" || current_event=="goto_dropoff") && current_event != last_event) {
      proximity(3);
    }

    last_event = current_event;
  }

  function update_state () {

    if (config.USE_LOCATION) {
      getLocation()
      .then(loc=>{
        debug(loc.coords.accuracy+" "+cnt)
        cnt += 1;
        STATE.position = [loc.coords.longitude,loc.coords.latitude];
      })
      .catch(err=>{
        //show(JSON.stringify(err));
      })
      .finally(()=>{
        podConnector.updateState(STATE)
        .then(ret=>{
          // console.log(ret);
        })
        .catch(err=>{
          console.log(err);
        })
      })
    }
    else {
      podConnector.updateState(STATE)
      // STATE.position[1] -= 0.0001;
    }
  }

  var cnt=0;

  function update_state_callback (loc) {

    debug(loc.coords.latitude+" "+loc.coords.longitude+" - "+cnt)
    cnt += 1;
    STATE.position = [loc.coords.longitude,loc.coords.latitude];

    podConnector.updateState(STATE)
    .then(ret=>{
        // console.log(ret);
    })
    .catch(err=>{
      console.log(err);
    })
  }
