<template>
  <div class="section">
    <h1>Курсы</h1>
    <div class="inner_list">
      <div class="row" v-for="course in allcourses"  :key="course._id">
        <div class="oneS"></div>
        <div class="TwoS">
          <div>{{course.des}}</div>
        <div class="button" v-show='course.buy == false'>
          <a v-on:click='buy(course._id)'>Купить {{course.cost}}→</a></div>
        <div class="button" v-show='course.buy == true'><a :href='"/course/"+course._id'>Перейти →</a></div>



      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs'
export default {
  data() {
    return {
      allcourses: [],
    }
  },
   mounted: function(){
       axios
        .get('http://localhost:3000/api/AllCourses')
        .then(response => {
          var newarr;
          var arr = [];
          for (var i = 0; i < response.data.length; i++) {
             var data = {
                userId: JSON.parse(localStorage.getItem('user'))._id,
                courseId: response.data[i]._id,
                num: i
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/checkers',
            };
            axios(options).then((res) => {
          if(res.data.status) {

           newarr = response.data[res.data.id]
            newarr.buy = true
            this.allcourses.push(newarr)
          }else {
            newarr = response.data[res.data.id]
            newarr.buy = false
           this.allcourses.push(newarr)
          }


    });


        }
          });
  },
  methods: {
    buy: function(e) {
            var data = {
                userId: JSON.parse(localStorage.getItem('user'))._id,
                courseId: e,
                first_param: 0,
                Second_param: 0
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/buycourse',
            };
            axios(options).then((response) => {
                location.reload()

            });
    },
  }
}
</script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
  letter-spacing: 10px;
    width: 100%;
    text-align: left;
    margin-bottom: 30px;

}
.section {
  margin-bottom: 150px;
}
.button {
      text-align: center;
    margin-top: 10px;
    align-self: flex-end;
    padding: 10px 20px;
    background: black;
    color: white;
    width: 300px;
    border-radius: 10px;
    cursor: pointer;
}

.button > a {
  color: #2d3e4f;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: white
}
.TwoS {
  width: 69%;
  margin-left: 1%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  flex-direction: column;
}
.oneS {
  width: 29%;
  height: 200px;
  background: black;
  border-radius: 10px;
  margin-right: 1%;
}
  .row {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
</style>
