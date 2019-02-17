<!-- App.vue -->

<template>
  <div id="app" class="container">
    <div class="input-group input-group-lg bottom">
      <div class="input-group-prepend">
        <span class="input-group-text">Search</span>
      </div>
      <input type="text"
        class="form-control col-md-6"
        @keyup.prevent="search"
        v-model="query" />
    </div>
    <div id="result" style="margin: 4em;" v-if="data.length>0">
      <p >hit {{ data.length }} 件</p>
      <div class="card" style="margin: 1em;" v-for="da in data">
        <div class="card-body">
          <h5 class="card-title">@username: {{ da._source["@username"] }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">@channel: {{ da._source["@channel_name"] }}</h6>
          <p class="card-text">{{ da._source["text"] }}</p>
          <span style="font-size: small; font-style: italic; opacity: 0.5;"><i class="cui-energy"></i>{{ unixTime2ymd(da._source["@timestamp"]) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      data: []
    }
  },
  methods: {
    search() {
        this.$axios.get("http://192.168.100.100:9200/slack/_search?q=text:" + this.query)
              .then(response => {
                console.log(response.data.hits.hits);
                this.data = response.data.hits.hits;
          })
    },
    unixTime2ymd(intTime){
      var d = new Date( intTime );
      var year  = d.getFullYear();
      var month = d.getMonth() + 1;
      var day  = d.getDate();
      var hour = ( '0' + d.getHours() ).slice(-2);
      var min  = ( '0' + d.getMinutes() ).slice(-2);
      var sec   = ( '0' + d.getSeconds() ).slice(-2);
      return( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec );
    }
  }
}
</script>

<style>
  .bottom {
    margin-top: 50px;
    margin-left: 200px;
  }
</style>
