import axios from 'axios';

export default {
    getPosition: function (lat, lon) {
        const query = '/search'
        return axios.get(query, {
            params: {
                lattiude: lat,
                longitude: lon
            }
        });
    }
}