<script>
import Github from './components/Github.vue'
import axios from 'axios'
export default {
  components:{
    Github
  },
  data () {
    return {
    username : "",
    userFound : Boolean,
    userDataList : []
  }
},
methods: {
  async fetchData () {
    try {
    const res = await axios.get("https://api.github.com/users/" + this.username)
    this.userDataList.push(res.data)
    this.username = ""
    this.userFound = true
    } catch {
      this.userFound = false
      this.username = ""
    }

  },
  clearData () {
    this.userDataList = []
  }
}
}
</script>
<template>
<div class="ui text container">
<form class="ui form" @submit.prevent>
  <div class="field">
    <label>Search Github user</label>
    <input data-test-id="username-input" v-model="username" placeholder="Github username">
  </div>
  <button data-test-id="username-submit" class="ui button" @click="fetchData"> Check Profile </button>
  <button data-test-id="username-clear" class="ui button" @click="clearData"> Clear</button>
</form>

  <div v-if="!userFound" class="ui negative message" data-test-id="warning-notexists">
  <i data-test-id="warning-notexists-close"
    @click="userFound = !userFound" class="close icon" ></i>
  <div class="header">
    This Github user do not exists.
  </div>
    Please enter a valid Github username.
</div>

  <github v-for="userData in userDataList" :userData="userData"></github>
</div>
</template>