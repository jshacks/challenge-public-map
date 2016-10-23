/**
 * Created by wictort on 10/23/16.
 */

var selectedYear = 2007;
var selectedCategory = 'total';

function setSelectedYear() {
    selectedYear = Number(document.getElementById('yearSelected').value);
//        google.maps.event.trigger(map, 'resize');
    initMap();
}

function setSelectedCategory() {

}

var map;

var infowindow = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.012, lng: 28.8436},
        zoom: 12
    });



//        console.log(document.)
    var i = 0 ;
    var polygon = [];
    for (sector of sectors) {
        i++;
        polygon[i] = new google.maps.Polygon({
            paths: sector['coordinates'],
            strokeColor: crimeRate[selectedYear][sector['name']]['total'],
            strokeOpacity: 0.85,
            strokeWeight: 2,
            fillColor: crimeRate[selectedYear][sector['name']]['total'],
            fillOpacity: 0.75
        });
        polygon[i].setMap(map);
        createEvent(polygon[i], sector, selectedYear);
    }
}

function createEvent(polygon, sector, year) {
    google.maps.event.addListener(polygon, 'click', function (event) {

        if (infowindow) {
            infowindow.close();
        }

        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        infowindow = new google.maps.InfoWindow({
            position: {lat: latitude, lng: longitude},
            content: "" +
            " <div  style='color: " + crimeRate[selectedYear][sector['name']]['total'] + "'>" +
            "<h1> Criminality rate in " + sector['name'] + ": </h1>" +
            "<h3> Jafuri : "+ data[year][sector['name']]['jafuri'] +" </h3> " +
            "<h3> Furturi : "+ data[year][sector['name']]['furturi'] +" </h3> " +
            "<h3> Mita : "+ data[year][sector['name']]['mita'] +" </h3> " +
            "<h3> Violuri : "+ data[year][sector['name']]['violuri'] +" </h3> " +
            "</div>"
        });

        infowindow.open(map, polygon);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('yearSelected').addEventListener('change', setSelectedYear);
    document.getElementById('categorySelected').addEventListener('change', setSelectedCategory);

    document.getElementById('yearSelected').innerHTML = years.map(function (year) {
        if (year == selectedYear) {
            return '<option value="' + year + '" selected> ' + year + ' </option>';
        } else {
            return '<option value="' + year + '"> ' + year + ' </option>';
        }
    });

    // document.getElementById('categorySelected').innerHTML =
});