<script>
import moment from "moment"
export default {
    name:'Github',
    props:{
        userData: Object
    },
    computed :{
      formatedDate () {
        return moment(this.userData.created_at).format("MMM Do YYYY")
    }
    }
}
</script>

<template>
    <div class="ui card">
      <div data-test-id="username-test" hidden>{{userData.login}}</div>
      <div class="image">
        <img vbind:src="{ userData.avatar_url }">
      </div>
      <div class="content">
        <a class="header">{{userData.login}}</a>
        <div class="meta">
          <span class="date">Joined on: {{ formatedDate }}</span>
        </div>
        <div class="description">
            {{userData.bio}}
        </div>
      </div>
      <div class="extra content">
          <i class="user icon"></i>
          {{userData.followers}}
      </div>
    </div>
</template>
