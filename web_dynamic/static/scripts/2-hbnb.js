const amenities = [];

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

$(document).ready(function() {
  $('DIV.amenities .popover UL LI input').on('change', checked);

  /* $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      console.log(data);
    }
  }); */

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
});
