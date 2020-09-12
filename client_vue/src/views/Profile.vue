<template>
<div class="profile">
	<div class="profile-inner">
		<div class="name-section">
			<div class="name">{{ accname }}</div>
			<div class="exit" v-on:click='exit()'>Выход</div>
		</div>
		<hr>
		<div class="navigate">
			<div class="settings" v-on:click='navStatus = 0'>Настройки</div>
			<div class="courses" v-on:click='navStatus = 1'>Ваши курсы</div>
		</div>
		<div class="inner">
			<div class="settings_container" v-show='navStatus == 0'>
				<h1 class="title">Изменить настройки</h1>
				<form>
				<div class="alert alert-danger" role="alert" 
                    v-show='errorTextReg != null'>
                    {{ errorTextReg }}
                  </div>
                 <div class="alert alert-success" role="alert" 
                v-show='success != null'>
                {{ success }}
                </div>
				<input type="name" name="" placeholder="Имя"  v-on:input='name' v-model='accname'>
				<input type="email" name="" placeholder="Почта"  v-on:input='email' v-model='accemail' required='required'>
				<input type="password" name="" placeholder="Старый пароль" v-on:input='password' v-model='pass'>
				<input type="password" name="" placeholder="Новый пароль" v-on:input='password' v-model='newpass'>
				 <input type="submit"  value="Обновить" v-on:click.prevent='update()'>
                    
				</form>
			</div>
			<div class="courses_container" v-show='navStatus == 1'>
		
		<h1>Все курсы</h1>
		   <div class="row" v-for="course in arrayofall"  :key="course._id">
        <div class="oneS"></div>
        <div class="TwoS">


          <div>{{course.des}}</div>
        <div class="button" ><a :href='"/course/"+course._id'>Перейти →</a></div>
	</div>
      </div>



			</div>
		</div>
	</div>
</div>
</template>
<script>
	import axios from 'axios';
    import qs from 'qs'
	import mixin from '@/mixins/mixin.vue'
	export default {
		data() {
			return {
				navStatus: 0,
				accname: JSON.parse(localStorage.getItem('user')).name,
				accemail: JSON.parse(localStorage.getItem('user')).email,
				newpass:null,
				arrayofall: null
			}
		},
		mixins: [mixin],
		mounted: function(){
			var data = {
                userId: JSON.parse(localStorage.getItem('user'))._id,
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/geyb',
            };
            axios(options).then((res) => {
            	var all = []
            	console.log(res.data)
            	for (var i = 0; i < res.data.length; i++) {

            		var data = {
               		 id: res.data[i].courseId,
            		};
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/geyc',
            };
            axios(options).then((res2) => {
            	all.push(res2.data[0])
            })
            	}
            	this.arrayofall = all
            	
            })
           
		},
		methods: {
			exit: function() {
				localStorage.removeItem('user')
				location.reload()
			},
			request: function() {
				var data = {
                name: this.accname,
                email: this.accemail,
                newpass: this.newpass,
                pass:this.pass,
                id: JSON.parse(localStorage.getItem('user'))._id
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/update',
            };
            axios(options).then((response) => {
                if (response.data.status == 4) {
                	this.errorTextReg = 'Пароль неверен'
                }else {
                	var info = JSON.parse(localStorage.getItem('user'))
                	info.name = this.accname
                	info.email = this.accemail
                	localStorage.setItem('user',JSON.stringify(info))
                	this.success = 'Профиль успешно обновлен'

                }

            });
			},
			update: function() {
				 if (this.accname.length <= 6) {
                this.errorTextReg = 'Имя должно быть больше 6 символов'
                this.errorStatusReg.name = true
            }else {
                this.errorStatusReg.name = false
                this.errorTextReg = null
             if ((this.pass == null && this.newpass == null)) {
                this.request() 
        }else {

        	if ((this.pass.length >= 6 && this.newpass.length >= 6) || (this.pass.length == 0 && this.newpass.length == 0)) {
        		this.request()
        	}else {

        	
        	this.errorTextReg = 'Пароль должен быть больше 6 символов'
        }
        }
            }
			}
		}
	}
</script>
<style scoped>
	.exit {
		cursor: pointer;
	}
	.title {
		text-align: center;
	}
	.row {
		margin-bottom: 150px;
	}
	form > input {
		margin-bottom: 10px;
		outline: none;
		padding: 10px;
		border: 1px solid #2d3e4f;
		border-radius: 10px;
		font-size: 20px;
	}
	input[type=submit] {
		background: unset;
		border: none;
		background: black;
		color: white;

	}
	form {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		width: 100%;
		margin: 0 auto;
	}
	.navigate {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
	.inner > div {
		text-align: left;
		padding-top: 20px;
	height: 50vh;
	margin-top: 10vh;
	margin-bottom: 15vh;
	}
	.navigate > div {
		cursor: pointer;
		padding: 10px 100px;
		background: black;
		color: white;
		border-radius: 10px;
	}
	.exit {
		text-transform: uppercase;
		letter-spacing: 5px;
		font-size: 20px;
	}
	.name-section {
		display: flex;
		justify-content: space-between;
		font-size: 25px
	}
	.profile-inner {
		max-width: 900px;
		width: 100%;
		margin: 0 auto;
	}
.button {
      text-align: center;
    margin-top: 10px;
    align-self: flex-end;
    padding: 10px 20px;
    background: black;
    color: white;
    width: 90%;
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