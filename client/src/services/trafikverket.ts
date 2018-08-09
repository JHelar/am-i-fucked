const ENDPOINT_URL = 'http://localhost:3030';

export interface TrainAnnouncement {
    Canceled: boolean;
    AdvertisedTimeAtLocation: Date;
    EstimatedTimeAtLocation: Date;
    TimeAtLocation: Date;
    TrackAtLocation: number;
    Deviation: string;
    LocationSignature: string;
    ActivityId: string;
    ActivityType: string;
}

export interface TrainStation {
    AdvertisedLocationName: string;
    CountryCode: string;
}

interface Response {
    RESPONSE: {
        RESULT: any[],
    };
}

export const getTrainAnnouncement = (trainNumber: number, limit: number | null = null, departureDate: Date = new Date()): Promise<TrainAnnouncement[]> => {
    return fetch(`${ENDPOINT_URL}/announcement/${trainNumber}`)
        .then((response: any) => response.json())
};

export const getTrainStation = (locationSignature: string): Promise<TrainStation> => {
    return fetch(`${ENDPOINT_URL}/station/${locationSignature}`)
    .then((response: any) => response.json())
};
