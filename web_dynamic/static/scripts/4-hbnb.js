const amenities = [];
const amenity_id = [];
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


function checked () {
  const name =  $(this).attr('data-name');
  const id = $(this).attr('data-id');
  if ($(this).is(':checked')) {
    amenities.push(name);
    amenity_id.push(id);
  } else {
    deleteElement(name);
    deleteId(id);
  }
  showAmenities(amenities);
}

function deleteElement (name) {
  for (let i = 0; i < amenities.length; i++) {
    if (amenities[i] === name) {
      amenities.splice(i, 1);
    }
  }
}

function deleteId (id) {
  for (let i = 0; i < amenity_id.length; i++) {
    if (amenity_id[i] === id) {
      amenity_id.splice(i, 1);
    }
  }
}

function showAmenities (array) {
  $('DIV.amenities h4').text(array.join(', '));
}

function generateTemplate(data) {
  $('SECTION.places').empty();
  for (const x in data) {
      //generate the html template
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
    success: function (data) {
      console.log("number of items found:", data.length);
      generateTemplate(data);
    }
  })
}

$(document).ready(function() {
  $('DIV.amenities .popover UL LI input').on('change', checked);

  $.get("http://localhost:5001/api/v1/status/", function(data)
	{
    console.log("Status of API:", data.status);
    if (data.status === 'OK') {
      $('#api_status').removeClass();
      $('#api_status').toggleClass('available')
    } else {
      $('#api_status').removeClass();
    }
	});

  placesPostRequest(JSON.stringify(filter));
  $('button').on('click', function () {
    filter['amenities'] = amenity_id;
    placesPostRequest(JSON.stringify(filter));
  });
});
