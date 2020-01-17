var config = {
  fms_url : "https://192.168.9.140:8000",
  USE_LOCATION : true,
  SHOW_STOPS : false,
  startPosition : [52.4041, 13.073],
  mapbox_api_key : "pk.eyJ1IjoibWF4Z2VuZSIsImEiOiJjazNhY2Vob3QwYXd2M2NreDk5d3dvcWh0In0.7EyDKC6KYi9yfhlsvErjUA",
  COMPASS_OFFSET : 0
}

try {
  module.exports = {config};
}
catch(err){}
