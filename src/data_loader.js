import parse from 'csv-parse/lib/sync';

var data = null

function load_data(){
    const SOURCE_URL = "https://docs.google.com/spreadsheets/d/e/1PACX-1vTSnF1wYkCiAbHAqhs_WG2i0EjVh5JPRTAp5pQW-9b_52TsYuaEOzNgz8EbFEGO6JB1o2Okd4QWRAWR/pub?output=csv";
    var request = new XMLHttpRequest();
    request.open('GET', SOURCE_URL, true);
    request.onload = function() {
        if (this.status >= 199 && this.status < 400) {
            data = parse(
                this.response, 
                { columns: true,skip_empty_lines: true}
            );
            console.log(data);
            init_data(data)
        } else {
        }
    };
    request.onerror = function(error) { console.error(error) };
    request.send();
}


function filter(d){
    if( d.Service_Status__c != "Active" ){ return false; }
    // apply active filters here
    return true
}

function init_data(data){
    data.forEach( d => {
        // Create marker
        const marker = L.marker(
            [d.Geo_Location__Latitude__s,d.Geo_Location__Longitude__s],
        )
        marker.bindPopup(`${d.Agency__r__Name}<br>${d.Name}<br><br>${d.Hours_of_Operation__c}<br><br>${d.Description__c}<br><br>${d.Eligibility__c}`)     
        marker.bindTooltip(`${d.Agency__r__Name}<br>${d.Name}`)
        d._marker = marker

        // Create listing                                    
        const listing = document.createElement("div")
        listing.id = d.Id;
        listing.innerHTML = `
            <h2>${d.Name}</h3>
            <p>${d.Agency__r__Name}</p>
            <p>${d.Hours_of_Operation__c}</p>
        `                        
        listing_container.appendChild(listing)
    })

    update_data()
}

function update_data(){

    data.forEach( d => {
        if(filter(d)){
            d._marker.addTo(map)
        }else{
            d._marker.remove()
        }
    })
}

