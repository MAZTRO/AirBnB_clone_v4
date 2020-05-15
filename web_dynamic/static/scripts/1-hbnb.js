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
});
