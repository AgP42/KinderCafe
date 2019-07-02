import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');
const allMarkers = JSON.parse(mapElement.dataset.markers);

const cb_change_table = document.getElementById('Change_table');
const cb_baby_chair = document.getElementById('Baby_chair');
const cb_playing_area = document.getElementById('Playing_area');
const cb_toys = document.getElementById('Toys');

const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [13.365783, 52.529846],
    zoom: 8
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 12 });
};

const initMapboxWithCheckboxes = () => {
  initCheckboxesListener();
  displayMapWithFilteredMarkers();
};

const displayMapWithFilteredMarkers = () => {
  // let cb_change_table_checked = cb_change_table.checked;
  // const cb_change_table_id = cb_change_table.value;
  // console.log(cb_change_table_id)

  // let cb_baby_chair_checked = cb_baby_chair.checked;
  // let cb_playing_area_checked = cb_playing_area.checked;
  // let cb_toys_checked = cb_toys.checked;


  let checkedServicesIds = [];
  if (cb_change_table.checked) {
    checkedServicesIds.push(parseInt(cb_change_table.value));
  }
  if (cb_baby_chair.checked) {
    checkedServicesIds.push(parseInt(cb_baby_chair.value));
  }
  if (cb_playing_area.checked) {
    checkedServicesIds.push(parseInt(cb_playing_area.value));
  }
  if (cb_toys.checked) {
    checkedServicesIds.push(parseInt(cb_toys.value));
  }

  console.log(checkedServicesIds)
  console.log(allMarkers);

  let markers = [];

  if (checkedServicesIds.length == 0) {
    markers = allMarkers
  } else {
    markers = allMarkers.filter((marker) => {
      console.log(marker.services);
      console.log(marker.services.filter(service => checkedServicesIds.includes(service)));
      console.log(marker.services.filter(service => checkedServicesIds.includes(service)).length == checkedServicesIds.length);

      return marker.services.filter(service => checkedServicesIds.includes(service)).length == checkedServicesIds.length;
    });

  }

  console.log(markers);

  // const markers = [markers[0], markers[5]];
  const map = buildMap();
  if (markers.length != 0){
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
  }
};

const initCheckboxesListener = () => {

  cb_change_table.onchange = () => {
    displayMapWithFilteredMarkers();
  };

  cb_baby_chair.onchange = () => {
    displayMapWithFilteredMarkers();
  };

  cb_playing_area.onchange = () => {
    displayMapWithFilteredMarkers();
  };

  cb_toys.onchange = () => {
    displayMapWithFilteredMarkers();
  };


};

export { initMapboxWithCheckboxes };
