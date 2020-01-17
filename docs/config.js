var config = {
  fms_url : "https://192.168.9.140:8000",
  USE_LOCATION : true,
  SHOW_STOPS : false,
  startPosition : [52.4041, 13.073],
  mapbox_api_key : "pk.eyJ1IjoibWF4Z2VuZSIsImEiOiJjazVpOHhva2gwOG1pM21tbjM1MGZ0MWdjIn0.YcaRguzrCDmrBdhCfohvpA",
  COMPASS_OFFSET : 0
}

try {
  module.exports = {config};
}
catch(err){}
