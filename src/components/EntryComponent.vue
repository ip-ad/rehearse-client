<template>
  <div class="container">
    <h1>Latest Entries</h1>
    <div class="create-entry">
      <label for="create-entry">Say Something...</label>
      <input type="text" id="create-entry" v-model="text" placeholder="Create an an entry">
      <button v-on:click="createEntry">Post Entry!</button>
    </div>
    <hr>
    <p class="error" v-if="error"> {{error}} </p>
    <div class="entries-container">
      <div class="entry"
        v-for="(entry, index) in entries" 
        v-bind:item="entry"
        v-bind:index="index"
        v-bind:key="entry._id"
        v-on:dblclick="deleteEntry(entry._id)"
      >
        {{ `${entry.createdAt.getDate()} / ${entry.createdAt.getMonth()} /
        ${entry.createdAt.getFullYear()}` }}
      <p class="text">{{ entry.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import EntryService from '../EntryService'

export default {
  name: 'EntryComponent',
  data() {
    return {
      entries: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try{
      this.entries = await EntryService.getEntries();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createEntry() {
      await EntryService.insertEntry(this.text)
      this.entries = await EntryService.getEntries();
    },
    async deleteEntry(id) {
      await EntryService.deleteEntry(id)
      this.entries = await EntryService.getEntries();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}

div.entry {
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
