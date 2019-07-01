import places from 'places.js';

const initAutocomplete = () => {
  const addressInput = document.getElementById('address');
  if (addressInput) {
    places({ container: addressInput });
  }

  const checkbox = document.getElementById('9');
  checkbox.addEventListener("change", () => {
    console.log("you need to be fluent in English to apply for the job");

  });

};

export { initAutocomplete };
