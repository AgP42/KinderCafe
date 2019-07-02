import places from 'places.js';

const initAutocomplete = () => {
  const addressInput = document.getElementById('address');
  if (addressInput) {
    places({ container: addressInput });
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    // console.log(position.coords.latitude, position.coords.longitude);
    const newURL = window.location.pathname + `?&lat=${position.coords.latitude}&long=${position.coords.longitude}`;
    window.location = newURL;

  });

};

export { initAutocomplete };
