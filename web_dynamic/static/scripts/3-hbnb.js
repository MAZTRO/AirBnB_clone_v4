const amenities = [];

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
  if ($(this).is(':checked')) {
    amenities.push(name);
  } else {
    deleteElement(name);
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

function showAmenities (array) {
    $('DIV.amenities h4').text(array.join(', '));
}

function generateTemplate(data) {
  for (const x in data) {
      console.log(data[x]);
      //generate the html template
      const template = createPlaceTemplate(data[x]);
      $('SECTION.places').append(template);
    }
}

function placesPostRequest() {
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    type: 'POST',
    success: function (data) {
      console.log(data);
      generateTemplate(data);
    }
  })
}

$(document).ready(function() {
  $('DIV.amenities .popover UL LI input').on('change', checked);

  $.get("http://localhost:5001/api/v1/status/", function(data)
	{
    console.log(data.status);
    if (data.status === 'OK') {
      $('#api_status').removeClass();
      $('#api_status').toggleClass('available')
    } else {
      $('#api_status').removeClass();
    }
	});

  placesPostRequest();
});
