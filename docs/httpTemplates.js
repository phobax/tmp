function setButtonActive (btn, active, text=null) {
  if (active) {
    btn.classList.remove("disabled");
    btn.classList.add("enabled");
    if (text) btn.innerHTML = text[0];
  }
  else {
    btn.classList.remove("enabled");
    btn.classList.add("disabled");
    if (text) btn.innerHTML = text[1];
  }
}


function updateOrderDiv (order, div) {

  if (order.state=="ended") {
    var div = document.getElementById("order"+order.id);
    if (div) {
      div.parentElement.removeChild(div);
    }
    return;
  }

  div.querySelector(".voucher_code").innerHTML = order.voucher_id;
  div.querySelector(".location").innerHTML = order.dropoff.place_name.split(",")[0];
  setButtonActive(div.querySelector("#btn_inside"), order.user_inside,["innen", "außen"]);
  div.querySelector("#btn_inside").classList.remove("blocked");
}


function createOrderDiv (order) {

  if (order.state=="ended") return;
  var temp = document.getElementById("template");
  var clon = temp.content.cloneNode(true);
  clon.querySelector("#xxx").id = "order"+order.id;
  clon.querySelector("#btn_inside").addEventListener("click", (evt)=>{setUserInside(order.id, evt.target)});
  clon.querySelector("#btn_end_ride").addEventListener("click", (evt)=>{endRide(order.id, evt.target)});

  updateOrderDiv(order, clon);

  return clon;
}
