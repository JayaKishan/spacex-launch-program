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
  var mission_id = '';
  $.ajax({
    url: url,
    success: function(result){
    $.each(result, function(i, val) {
      mission_id = val.mission_id[0] == undefined ? 'No Ids found': val.mission_id[0];
      console.log(mission_id);
      $("div.data").append('<div class="w3-third border">'+
                              '<div class="imgContainer">'+
                                '<img src='+ val.links.mission_patch_small+' width="130" height="130">'+
                              '</div>'+
                              '<div class="flightDetails">'+
                                '<span class="title">'+val.mission_name+'</span><span class="title"> #'+val.flight_number+'</span>'+
                                '<p class="bold">Mission Ids:</p>'+
                                '<p class="bold">'+mission_id+'</p>'+
                                '<span class="bold">Launch Year: </span><span>'+val.launch_year+'</span>'+
                                '<p><span class="bold">Successful Launch: </span><span>'+val.launch_success+'</span></p>'+
                                '<span class="bold">Successful Landing: </span><span>'+val.rocket.first_stage.cores[0].land_success+'</span>'+
                              '</div>'+
                            '</div>');
    });
  }});
}
