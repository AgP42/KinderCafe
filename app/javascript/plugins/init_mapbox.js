import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');
const markers = JSON.parse(mapElement.dataset.markers);

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

const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
  }
  initCheckboxes();
};

const initCheckboxes = () => {
  const checkbox = document.getElementById('service_id_9');

   // checkbox.addEventListener("change", console.log("hello"))

  checkbox.onchange = (event) => {

    const checkbox_checked = event.target.checked;

    // console.log(event.target)
    // console.log(event.target.checked)

    if (checkbox_checked) {
      console.log(event.target.value + " checked");
      console.log(markers);
      const new_marker = [markers[0], markers[5]];
      const map = buildMap();
      addMarkersToMap(map, new_marker);
      fitMapToMarkers(map, new_marker);
    }


  };
};

export { initMapbox };
