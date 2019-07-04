import mapboxgl from 'mapbox-gl';

const buildMap = (mapElement, center) => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: center,
    zoom: 8
  });
};

// fct to add the places markers on the map
const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
  });
};

// fct to add the search address on the map (if existing)
const addAddrMarkerToMap = (map, addr) => {
    new mapboxgl.Marker({ "color": "#b40219" })
      .setLngLat([ addr[0], addr[1] ])
      // .setPopup(popup)
      .addTo(map);

};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 14 });
};

const grabSelectedServices = () => {
    const cb_change_table = document.getElementById('Change_table');
    const cb_baby_chair = document.getElementById('Baby_chair');
    const cb_playing_area = document.getElementById('Playing_area');
    const cb_toys = document.getElementById('Toys');
    const cb_spielplatz = document.getElementById('Public_Playing_area');

    let checkedServicesIds = [];
    if (cb_change_table && cb_change_table.checked) {
      checkedServicesIds.push(parseInt(cb_change_table.value));
    }
    if (cb_baby_chair && cb_baby_chair.checked) {
      checkedServicesIds.push(parseInt(cb_baby_chair.value));
    }
    if (cb_playing_area && cb_playing_area.checked) {
      checkedServicesIds.push(parseInt(cb_playing_area.value));
    }
    if (cb_toys && cb_toys.checked) {
      checkedServicesIds.push(parseInt(cb_toys.value));
    }
    if (cb_spielplatz && cb_spielplatz.checked) {
      checkedServicesIds.push(parseInt(cb_spielplatz.value));
    }
    return checkedServicesIds;
};

const filterMarkersBySelectedServices = (mapElement, checkedServicesIds) => {
    const allMarkers = JSON.parse(mapElement.dataset.markers);

    let markers = [];

    if (checkedServicesIds.length == 0) {
      markers = allMarkers
    } else {
      markers = allMarkers.filter((marker) => {

        return marker.services.filter(service => checkedServicesIds.includes(service)).length == checkedServicesIds.length;
      });

    }

    return markers;
};

const defineMapCenter = (addr) => {

    // define the center to the center of Berlin if no address or autolocation
    let center = [13.365783, 52.529846];
    // update if user address available
    if (addr !== null) {
      center = [ addr.addr[1], addr.addr[0] ];
    }

    return center;
};

// fct called at init or each checkbox events
// it display all markers (address filter done in the controller) if no checkbox checked
// otherwise only the selected services are displayed
const displayMapWithFilteredMarkers = () => {
  const mapElement = document.getElementById('map');

  if (mapElement){

    let checkedServicesIds = grabSelectedServices();
    let markers = filterMarkersBySelectedServices(mapElement, checkedServicesIds);

    const addr = JSON.parse(mapElement.dataset.addr);
    let center = defineMapCenter(addr);

    const map = buildMap(mapElement, center);

    if (markers.length != 0){
      addMarkersToMap(map, markers);
      fitMapToMarkers(map, markers);
    }
    if (addr !== null) {
      addAddrMarkerToMap(map, center);
    }
  }
};

const initCheckboxesListener = () => {

  const cb_change_table = document.getElementById('Change_table');
  if (cb_change_table) {
    cb_change_table.onchange = () => {
      displayMapWithFilteredMarkers();
    };
  }

  const cb_baby_chair = document.getElementById('Baby_chair');
  if (cb_baby_chair) {
    cb_baby_chair.onchange = () => {
      displayMapWithFilteredMarkers();
    };
  }

  const cb_playing_area = document.getElementById('Playing_area');
  if (cb_playing_area) {
    cb_playing_area.onchange = () => {
      displayMapWithFilteredMarkers();
    };
  }

  const cb_toys = document.getElementById('Toys');
  if (cb_playing_area) {
    cb_toys.onchange = () => {
      displayMapWithFilteredMarkers();
    };
  }

  const cb_spielplatz = document.getElementById('Public_Playing_area');
  if (cb_spielplatz) {
    cb_spielplatz.onchange = () => {
      displayMapWithFilteredMarkers();
    };
  }

};

const initMapboxWithCheckboxes = () => {
  initCheckboxesListener();
  displayMapWithFilteredMarkers();
};

export { initMapboxWithCheckboxes };
