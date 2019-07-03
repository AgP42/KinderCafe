import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!

import { initMapboxWithCheckboxes } from '../plugins/init_mapbox';
import { initAutocomplete } from '../plugins/init_autocomplete';
import { initAutocompleteNewForm } from '../plugins/init_autocomplete';

initMapboxWithCheckboxes();
initAutocomplete();
initAutocompleteNewForm();

