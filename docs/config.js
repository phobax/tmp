var config = {
  fms_url : "https://85.214.240.130:443",
  USE_LOCATION : true,
  SHOW_STOPS : false,
  startPosition : [52.4041, 13.073],
  mapbox_api_key : "pk.eyJ1IjoibWF4Z2VuZSIsImEiOiJjazVtOXoweDEwdXhuM21wdjl5N3YzaWlyIn0.KMLVmoDc-XhMMTl1-iYqYQ",
  COMPASS_OFFSET : -90
}

try {
  module.exports = {config};
}
catch(err){}
