var config = {
  fms_url : "https://85.214.240.130:443",
  USE_LOCATION : true,
  SHOW_STOPS : false,
  startPosition : [52.4041, 13.073],
  mapbox_api_key : "pk.eyJ1IjoibWF4Z2VuZSIsImEiOiJjazVpOHhva2gwOG1pM21tbjM1MGZ0MWdjIn0.YcaRguzrCDmrBdhCfohvpA",
  COMPASS_OFFSET : 90
}

try {
  module.exports = {config};
}
catch(err){}
