const ENDPOINT_URL = 'http://api.trafikinfo.trafikverket.se/v1.3/data.json';
const API_KEY = 'c38c3fc4e3ca49519df547698af50cf0';

export interface TrainAnnouncement {
    Canceled: boolean,
    AdvertisedTimeAtLocation: Date,
    EstimatedTimeAtLocation: Date,
    TimeAtLocation: Date,
    TrackAtLocation: number,
    Deviation: string,
    LocationSignature: string,
    ActivityId: string,
    ActivityType: string
}

export interface TrainStation {
    AdvertisedLocationName: string,
    CountryCode: string,
}

interface Response {
    RESPONSE: {
        RESULT: any[]
    }
}

const trainAnnouncementRequest = (trainNumber: number, limit: number | null, departureDate: Date = new Date()) => 
`
<REQUEST>
    <LOGIN authenticationkey="${API_KEY}" />
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
`

const trainStationRequest = (locationSignature: string) => 
`
<REQUEST>
    <LOGIN authenticationkey="${API_KEY}" />
    <QUERY objecttype="TrainStation">
        <FILTER>
            <EQ name="LocationSignature" value="${locationSignature}" />
        </FILTER>
    </QUERY>
</REQUEST>
`

export const getTrainAnnouncement = (trainNumber: number, limit: number | null = null, departureDate: Date = new Date()): Promise<TrainAnnouncement[]> => {
    return fetch(ENDPOINT_URL, {
        method: 'POST',
        body: trainAnnouncementRequest(trainNumber, limit, departureDate)
    })
    .then((response: any) => response.json())
    .then((json: Response) => json.RESPONSE.RESULT[0].TrainAnnouncement as TrainAnnouncement[])
}

export const getTrainStation = (locationSignature: string): Promise<TrainStation[]> => {
    return fetch(ENDPOINT_URL, {
        method: 'POST',
        body: trainStationRequest(locationSignature)
    })
    .then((response: any) => response.json())
    .then((json: Response) => json.RESPONSE.RESULT[0].TrainStation as TrainStation[])
}