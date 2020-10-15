$( document ).ready(function() {
  $('div.data').empty();
  var url = 'https://api.spaceXdata.com/v3/launches?limit=100';
  getData(url);
});

$( document ).ready(function() {
  $('div.grid-container div.year').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else {
        $('div.grid-container div.year').removeClass('active');
        $(this).addClass('active');
      }
      getValues()
    });
});

$( document ).ready(function() {
  $('div.grid-container div.launch').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else {
        $('div.grid-container div.launch').removeClass('active');
        $(this).addClass('active');
      }
      getValues()
    });
});

$( document ).ready(function() {
  $('div.grid-container div.landing').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else {
        $('div.grid-container div.landing').removeClass('active');
        $(this).addClass('active');
      }
      getValues()
    });
});

function getValues() {
  var elementsToTrack = $('div.grid-container div.active');
  var attributes = [];
  var baseUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
  var url = '';
  var filter = new Object();
  var launch_year, launch_success, land_success = '';
  for(var i = 0; i != elementsToTrack.length; i++){
    var currentAttr = elementsToTrack[i].attributes;
    attributes.push(currentAttr);
  }
  for(var i = 0; i != attributes.length; i++){
    if (attributes[i][2].value == 'launch_year') {
      filter.launch_year = attributes[i][1].value;
    }else if (attributes[i][2].value == 'launch_success') {
      filter.launch_success = attributes[i][1].value;
    }else if (attributes[i][2].value == 'land_success'){
      filter.land_success = attributes[i][1].value;
    }else {
      console.log('no filters');
    }

  }
  launch_year = filter.launch_year ? '&launch_year='+filter.launch_year : '';
  launch_success = filter.launch_success ? '&launch_success='+filter.launch_success : '';
  land_success = filter.land_success ? '&land_success='+filter.land_success : '';
  url = baseUrl+launch_year+launch_success+land_success
  getData(url);
}

function getData(url) {
  $('div.data').empty();
  $.ajax({
    url: url,
    success: function(result){
    $.each(result, function(i, val) {
      $("div.data").append('<div class="w3-third border">'+
                              '<div class="imgContainer">'+
                                '<img src='+ val.links.mission_patch_small+' width="150" height="150">'+
                              '</div>'+
                              '<div class="flightDetails">'+
                                '<span>'+val.mission_name+'</span><span>#'+val.flight_number+'</span>'+
                                '<p>Mission Ids:</p>'+
                                '<p>'+val.mission_id[0]+'</p>'+
                                '<p>Launch Year: <span>'+val.launch_year+'</span></p>'+
                                '<p>Successful Launch: <span>'+val.launch_success+'</span></p>'+
                                '<p>Successful Landing: <span>'+val.upcoming+'</span></p>'+
                              '</div>'+
                            '</div>');
    });
  }});
}
