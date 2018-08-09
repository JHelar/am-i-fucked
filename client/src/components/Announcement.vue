<template>
    <div>
        <h2 v-if="trainStation">{{ trainStation.AdvertisedLocationName }}</h2>
        <h3>{{ announcement.LocationSignature }}</h3>
        Advertised: {{announcement.AdvertisedTimeAtLocation}}<br>
        Estimated: {{announcement.EstimatedTimeAtLocation}}<br>
        TimeAtLocation: {{announcement.TimeAtLocation}}<br>
        ActivityType: {{announcement.ActivityType}}
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { TrainAnnouncement, getTrainStation, TrainStation } from '../services/trafikverket';

interface AnnouncementData {
    trainStation: TrainStation | null
}

export default Vue.extend({
    props: {
        announcement: {
            type: Object
        ,}
    },
    data(): AnnouncementData {
        return {
            trainStation: null
        }
    },
    created() {
        this.fetchTrainStation()
    },
    methods: {
        fetchTrainStation() {
            getTrainStation((this.announcement as TrainAnnouncement).LocationSignature)
                .then((stations: TrainStation) => this.trainStation = stations)
                .catch(console.error)
        }
    }
})
</script>
