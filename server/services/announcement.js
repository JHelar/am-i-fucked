const makeCache = require('../service-cache');
const fetch = require('node-fetch');

const trainAnnouncementRequest = (cred => (trainNumber, limit = 100, departureDate = new Date()) => {
    const body = `
    <REQUEST>
        <LOGIN authenticationkey="${cred.API_KEY}" />
        <QUERY objecttype="TrainAnnouncement" limit="${limit ? limit : ''}" orderby="AdvertisedTimeAtLocation asc">
            <FILTER>
                <AND>
                    <EQ name="AdvertisedTrainIdent" value="${trainNumber}" />
                    <EQ name="ScheduledDepartureDateTime" value="${departureDate.toDateString()}" />
                    <EQ name="ActivityType" value="Avgang"/>
                </AND>
            </FILTER>
        </QUERY>
    </REQUEST>
    `;
    return fetch(cred.ENDPOINT_URL, {
        method: 'POST',
        body
    })
})(require('../trafikverket-cred'));

class AnnouncementService {
    constructor(){
        this.getData = makeCache('announcement');
    }
    async find(params) {
        return this.getData('find', () => [{
            time: new Date()
        }]);
    }
    async get(id, params) {
        return await this.getData(`get-${id}`, async () => {
            const response = await trainAnnouncementRequest(id)
            const json = await response.json();
            return json.RESPONSE.RESULT[0].TrainAnnouncement;
        }, 60)
    }
}

module.exports = app => {
    app.use('announcement', new AnnouncementService())
}