import './style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function init(){
    const map = L.map('map');
    const defaultCenter = [32.8546305,-117.051348];
    const defaultZoom = 10;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', 
        {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    map.setView(defaultCenter, defaultZoom);


}



window.onload = init