const makeCache = require('../service-cache');
const fetch = require('node-fetch');

const trainStationRequest = (cred => locationSignature => {
    const body = `
    <REQUEST>
        <LOGIN authenticationkey="${cred.API_KEY}" />
        <QUERY objecttype="TrainStation">
            <FILTER>
                <EQ name="LocationSignature" value="${locationSignature}" />
            </FILTER>
        </QUERY>
    </REQUEST>
    `;
    return fetch(cred.ENDPOINT_URL, {
        method: 'POST',
        body
    })
})(require('../trafikverket-cred'));

class TrainStationService {
    constructor(){
        this.getData = makeCache('train-station');
    }
    async find(params) {
        return {}
    }
    async get(id, params) {
        return await this.getData(`get-${id}`, async () => {
            const reponse = await trainStationRequest(id);
            const json = await reponse.json();
            return json.RESPONSE.RESULT[0].TrainStation[0];
        }, 360)
    }
}

module.exports = app => {
    app.use('station', new TrainStationService())
}