<template>
  <div id="app">
    <h1>Is train <input type="number" v-model="trainNumber" debounce="500"> fucked?</h1>
    <Announcement v-for="announcement in announcements" :announcement="announcement" :key="announcement.activityId"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getTrainAnnouncement, TrainAnnouncement } from './services/trafikverket';
import Announcement from './components/Announcement.vue';

interface AppData {
    announcements: TrainAnnouncement[];
    trainNumber: number | null;
}

export default Vue.extend({
    data(): AppData {
        return {
            announcements: [],
            trainNumber: null,
        };
    },
    watch: {
        trainNumber(value: number) {
            this.fetchAnnouncements();
        },
    },
    methods: {
        fetchAnnouncements() {
            getTrainAnnouncement(this.trainNumber!, 100)
                .then((announcements) => this.announcements = announcements)
                .catch(console.error);
        },
    },
    components: {
        Announcement,
    },
});
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
