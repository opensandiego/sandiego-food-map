import './style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker_icon from 'leaflet/dist/images/marker-icon.png'
import parse from 'csv-parse/lib/sync';


var data = null
var map = null
var markers = []

// webpack appears to mess up the leaflet css 
// so for now let's connect this icon manually
const blueIcon = L.icon({
    iconUrl: marker_icon
})

function init(){
    map = L.map('map');
    const defaultCenter = [32.8546305,-117.051348];
    const defaultZoom = 10;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', 
        {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    map.setView(defaultCenter, defaultZoom);

    load_data()
}

function load_data(){
    const SOURCE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSnF1wYkCiAbHAqhs_WG2i0EjVh5JPRTAp5pQW-9b_52TsYuaEOzNgz8EbFEGO6JB1o2Okd4QWRAWR/pub?output=csv";
    var request = new XMLHttpRequest();
    request.open('GET', SOURCE_URL, true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            data = parse(
                this.response, 
                { columns: true,skip_empty_lines: true}
            );
            console.log(data);
            update_data()
        } else {
        }
    };
    request.onerror = function(error) { console.error(error) };
    request.send();
}


function filter_data(){
    var result = data.filter( d => d.Service_Status__c == "Active" )
    // TODO add other filters from inputs here
    return result
}

function update_data(){
    const filtered = filter_data()
    console.log(filtered)
    filtered.forEach( d => {
        var marker = L.marker(
            [d.Geo_Location__Latitude__s,d.Geo_Location__Longitude__s],
            {icon: blueIcon}
        ).addTo(map);
        marker.bindPopup(`${d.Agency__r__Name}<br>${d.Name}<br><br>${d.Hours_of_Operation__c}<br><br>${d.Description__c}<br><br>${d.Eligibility__c}`)     
        marker.bindTooltip(`${d.Agency__r__Name}<br>${d.Name}`)
    })
}

window.onload = init