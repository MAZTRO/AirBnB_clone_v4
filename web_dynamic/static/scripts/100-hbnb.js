const amenities = [];
const amenitiesId = [];
const states = [];
const statesId = [];
const cities = [];
const citiesId = [];
let filter = {};

function createPlaceTemplate(place) {
    return (
        `<article>
       <div class="title_box">
         <h2>${place.name}</h2>
         <div class="price_by_night">${place.price_by_night}</div>
       </div>
       <div class="information">
         <div class="max_guest">${place.max_guest} Guest</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
       </div>
       <div class="description">${place.description}</div>
     </article>`
    )
}

/* ========================================================== */
/* ========================================================== */
/* ========================================================== */

 /* --Refactored part for States, Cities, and Amenities--

function deleteElement(list, attr) {
    const index = list.indexOf(attr);
    list.splice(index, 1);
}

function deleteElementAndId(_list, list_id, name, id) {
    if (_list.includes(name)) {
        deleteElement(_list, name);
    }

    if (list_id.includes(id)) {
        deleteElement(list_id, id);
    }
}

function verificateIfChecked($element, _list, list_id, name, id) {
    if ($element.is(':checked')) {
        _list.push(name);
        list_id.push(id);
    } else {
        deleteElementAndId(_list, list_id, name, id);
    }
}

function newChecked() {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');
    const parent = $(this).parents()[0];
    console.log(parent.parentElement.parentElement.parentElement.parentElement.parentElement);
    const lastParent = parent.parentElement.parentElement.parentElement.attributes.class.nodeValues;

    if (parent.localName === 'h2') {
        if (lastParent === 'locations') {
            verificateIfChecked($(this), states, statesId, name, id);
            $('DIV.locations h4').text(states.concat(cities).sort().join(', '));
        }
    } else if (parent.localName === 'li') {
        if (lastParent === 'locations') {
            verificateIfChecked($(this), cities, citiesId, name, id);
            $('DIV.locations h4').text(states.concat(cities).sort().join(', '));
        } else if (lastParent === 'amenities') {
            verificateIfChecked($(this), amenities, amenitiesId, name, id);
            $('DIV.amenities h4').text(amenities.join(', '));
        }
    }
}

--END-- */


/* ========================================================== */
/* ========================================================== */
/* ========================================================== */
/* --Normal Part -- */

/* Amenity */
function checkedAmenity() {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
        amenities.push(name);
        amenitiesId.push(id);
    } else {
        deleteElement(name);
        deleteId(id);
    }
    showAmenities(amenities);
}

function deleteElement(name) {
    for (let i = 0; i < amenities.length; i++) {
        if (amenities[i] === name) {
            amenities.splice(i, 1);
        }
    }
}

function deleteId(id) {
    for (let i = 0; i < amenitiesId.length; i++) {
        if (amenitiesId[i] === id) {
            amenitiesId.splice(i, 1);
        }
    }
}

function showAmenities(array) {
    $('DIV.amenities h4').text(array.join(', '));
}
/* END Amenity */


/* State */
function checkedStates() {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');

    if ($(this).is(':checked')) {
        states.push(name);
        statesId.push(id);
    } else {
        deleteElementStates(name);
        deleteIdStates(id);
    }
    showStates(states, cities);
}

function deleteElementStates(name) {
    for (let i = 0; i < states.length; i++) {
        if (states[i] === name) {
            states.splice(i, 1);
        }
    }
}

function deleteIdStates(id) {
    for (let i = 0; i < statesId.length; i++) {
        if (statesId[i] === id) {
            statesId.splice(i, 1);
        }
    }
}

function showStates(states, cities) {
    $('DIV.locations h4').text(states.concat(cities).sort().join(', '));
}
/* End State */

/* Cities */
function checkedCities() {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');

    if ($(this).is(':checked')) {
        cities.push(name);
        citiesId.push(id);
    } else {
        deleteElementCities(name);
        deleteIdCities(id);
    }
    showStates(states, cities);
}

function deleteElementCities(name) {
    for (let i = 0; i < cities.length; i++) {
        if (cities[i] === name) {
            cities.splice(i, 1);
        }
    }
}

function deleteIdCities(id) {
    for (let i = 0; i < citiesId.length; i++) {
        if (citiesId[i] === id) {
            citiesId.splice(i, 1);
        }
    }
}
/* End  Cities */

function generateTemplate(data) {
    $('SECTION.places').empty();
    for (const x in data) {
        const template = createPlaceTemplate(data[x]);
        $('SECTION.places').append(template);
    }
}

function placesPostRequest(filter) {
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: `${filter}`,
        type: 'POST',
        success: function(data) {
            console.log("number of items found:", data.length);
            generateTemplate(data);
        }
    })
}

$(document).ready(function() {
    /* Refactored part */
    /* $('DIV.amenities .popover LI input').on('change', newChecked);
    $('DIV.locations .popover H2 input').on('change', newChecked);
    $('DIV.locations .popover LI input').on('change', newChecked); */

    $('DIV.amenities .popover LI input').on('change', checkedAmenity);
    $('DIV.locations .popover H2 input').on('change', checkedStates);
    $('DIV.locations .popover LI input').on('change', checkedCities);

    $.get("http://localhost:5001/api/v1/status/", function(data) {
        console.log("Status of API:", data.status);
        if (data.status === 'OK') {
            $('#api_status').removeClass();
            $('#api_status').toggleClass('available')
        } else {
            $('#api_status').removeClass();
        }
    });

    placesPostRequest(JSON.stringify(filter));
    $('button').on('click', function() {
        filter['amenities'] = amenitiesId;
        placesPostRequest(JSON.stringify(filter));
    });
});
