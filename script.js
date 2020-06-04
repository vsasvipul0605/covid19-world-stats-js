let chuchu = 1 ;
if( chuchu === 1){
  window.location.href = "#t1" ;
  chuchu = 0 ;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoidnNhc3ZpcHVsIiwiYSI6ImNrYW13YXpnZzE0dW4ycW82aGNwZG5xZWEifQ.QFSJLd4VKXjLA1fMviTXGQ";
var map = new mapboxgl.Map({
  container: "map",
  zoom: 2,
  center: [75, 20],
  style: "mapbox://styles/mapbox/dark-v10",
});

const getColorFromCases = (count) => {
  if (count >= 10000) {
    return "#b33500";
  }
  if (count >= 1000) {
    return "#b36200";
  }
  return "#b38f00";
};


fetch("https://disease.sh/v2/countries")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((record) => {
      // console.log(record.country, record.cases);
      var popup = new mapboxgl.Popup().setHTML(
        "<h3 class='info'>" +
          record.country +
          '</h3><p><img width="75%" src="' +
          record.countryInfo.flag +
          '" title="" /></p>' +
          "<p class='info'><b>Cases : </b>" +
          record.cases +
          "</p>" + "<p class='info'><b> For more details and other info, check other pages. </b></p>"
      );
      new mapboxgl.Marker({
        color: getColorFromCases(record.cases),
      })
        .setLngLat([record.countryInfo.long, record.countryInfo.lat]) // sets latitude and longitude
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    });
  });


// navbar

const menu = document.querySelector("#menu");
menu.addEventListener("click", function (event) {
  const ev = event.target.parentNode.parentNode;
  if (ev.getAttribute("href") === "#t1") {
    menu.style.backgroundColor = "transparent";
  } else menu.style.backgroundColor = "#191E28";

});

// cases-table

$(document).ready(function () {
  $.getJSON("https://disease.sh/v2/countries", function (data) {
    var world_data = "";
    $.each(data, function (key, value) {
      world_data += "<tr>";
      world_data +=
        "<td>" +
        value.country +
        " " +
        '<img style="border-radius: 50%;" width="30px" height="30px" src="' +
        value.countryInfo.flag +
        '" title="" />' +
        "</td>";
      world_data += "<td>" + value.cases + "</td>";
      world_data += "<td>" + value.active + "</td>";
      world_data += "<td>" + value.recovered + "</td>";
      world_data += "<td>" + value.deaths + "</td>";

      world_data += "</tr>";

    });
    $("#world_table").append(world_data);
  });
});

// total cases

fetch("https://disease.sh/v2/all")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#total_confirmed").append(data.cases);
    document.querySelector("#total_active").append(data.active);
    document.querySelector("#total_recovered").append(data.recovered);
    document.querySelector("#total_deaths").append(data.deaths);

    document.querySelector("#today_confirmed").append('+'+data.todayCases);
    document.querySelector("#today_active").append('-');
    document.querySelector("#today_recovered").append('+'+data.todayRecovered);
    document.querySelector("#today_deaths").append('+'+data.todayDeaths);
});