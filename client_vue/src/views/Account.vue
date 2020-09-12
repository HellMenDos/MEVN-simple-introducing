
<template>
    <div class="account" id="id">
        <div class="choose">
            <div class="registr" v-on:click='show = true,forgot = false'>Регистрация</div>|
            <div class="login" v-on:click='show = false,forgot = false'>Вход</div>
        </div>

        <div class="account-inner">
            <div class="form-registr" v-show='show == true  && forgot == false'>
                <h1>Регистрация</h1>
                <div class="form">
                    <form class="registr-form">
                    <div class="alert alert-danger" role="alert" 
                    v-show='errorTextReg != null'>
                    {{ errorTextReg }}
                    </div>
                    <div class="alert alert-danger" role="alert" 
                    v-show='axiosError != null'>
                    {{ axiosError }}
                    </div>
                    <div class="alert alert-success" role="alert" 
                    v-show='success != null'>
                    {{ success }}
                    </div>
                    <p>Имя должно быть больше 6 символов</p>
                    <input type="name" name="name" class="form-control" placeholder="Имя" v-on:input='name' v-model='nameform' required="required">
                    <input type="email" name="email" class="form-control" placeholder="Почта" v-on:input='email' v-model='emailform' required="required">
                    <p>Имя должно быть больше 6 символов</p>
                    <input type="password" name="password" class="form-control" placeholder="Пароль" v-on:input='password' v-model='pass' required="required">
                    <input type="password" name="conf-password" class="form-control" placeholder="Подтвердить пароль" v-on:input='confPass' required="required">
                    <input type="submit"  value="Зарегестрироваться" name="sub" class="form-control"
                    v-if='errorStatusReg.name == false && errorStatusReg.pass == false && errorStatusReg.confpass == false && errorStatusReg.email == false' v-on:click.prevent='registration()'>
                    <input type="submit" value="Зарегестрироваться" name="sub" class="form-control" v-else disabled="disabled">
                    </form>
                </div>
            </div>
            <div class="form-login" v-show='show == false && forgot == false'>
                <h1>Войти</h1>
                <div class="form">
                <form>
                <div class="alert alert-danger" role="alert" 
                v-show='axiosError != null'>
                {{ axiosError }}
                </div>
                <div class="alert alert-success" role="alert" 
                v-show='success != null'>
                {{ success }}
                </div>
                <input type="email" name="email" v-model='emailform' class="form-control" placeholder="Почта" required="required">
                <input type="password" name="password" v-model='pass' class="form-control" placeholder="Пароль" required="required">
                <input type="submit" name="sub" class="form-control" value="Войти" v-on:click.prevent='loginMethod()'>
                </form>
                </div>
            </div>
            <div class="form-forgot" v-show='forgot == true'>
                <h1>Забыли пароль?</h1>
                <div class="form">
                <form>
                <div class="alert alert-danger" role="alert" 
                v-show='axiosError != null'>
                {{ axiosError }}
                </div>
                <div class="alert alert-success" role="alert" 
                v-show='success != null'>
                {{ success }}
                </div>
                <input type="email" name="email" class="form-control" placeholder="Почта" required="required"  v-model='emailform'>
                <input type="submit" name="sub" class="form-control" value="Отправить" v-on:click.prevent='forgotMethodApi()'>
                </form>
                </div>
            </div>
        </div>
<div class="forgot-btn" v-on:click='forgotMethod()'>Забыли пароль?</div>
    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs'
    import mixin from '@/mixins/mixin.vue'
    export default { 
    data (){
        return {
    show: false,
    forgot: false,
    axiosError: null,
    }
    },
    mixins: [mixin],
    methods: {
        forgotMethod: function() {
            this.forgot = true
        }, 
        registration: function() {
            
            var data = {
                name: this.nameform,
                password: this.pass,
                email: this.emailform
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/registr',
            };
            axios(options).then((response) => {
                if (response.data.error) {
                this.success = null
                    this.axiosError = 'Такой пользователь уже сущестует'
                }else {
                    this.success = 'Вы успешно создали аккаунт, проверьте почту'
                    this.axiosError = null
                }

            });
        },
        forgotMethodApi: function() {
        var data = {
                email: this.emailform
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/forgot',
            };
            axios(options).then((response) => {
                if (response.data.error) {
                    this.success = null
                    this.axiosError = 'Такого пользователя не существует'
                }else {
                    this.success = 'Новый пароль выслан к вам на почту'
                    this.axiosError = null
                }

            });
        },
        loginMethod: function() {
            var data = {
                email: this.emailform,
                password: this.pass
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/login',
            };
            axios(options).then((response) => {
                if (response.data.error == 1) {
                    this.success = null
                    this.axiosError = 'Пользователя не существует'
                }else if(response.data.error == 2){
                    this.axiosError = 'Неверный пароль'
                    this.success = null
                }else if(response.data.error == 3){
                    this.axiosError = 'Аккаунт не активирован'
                    this.success = null
                }else {
                	delete response.data.password
                localStorage.setItem('user',JSON.stringify(response.data))
                location.reload()
                }

            });
        }
    }
    }
</script>




<style scoped>
.form-registr {
    margin-bottom: 80px;
}
input[disabled] {
background: #929292 !important;
color: #a7a7a7 !important;
}
.alert-success {
    color: #45721c;
    background-color: #d8f8d7;
    padding: 10px;
border-radius: 10px;
margin-bottom: 10px;

}
.alert-danger {
    color: #721c24;
background-color: #f8d7da;
padding: 10px;
border-radius: 10px;
margin-bottom: 10px;
}
.account {
height: 65vh;
margin-top: 15vh;
}
.forgot-btn {
text-transform: uppercase;
letter-spacing: 5px;
cursor: pointer;
text-decoration: underline;
}
.choose {
    display: flex;
justify-content: center;
align-items: center;
}
.choose > div {
    cursor: pointer;
font-size: 20px;
padding: 5px;
margin: 10px;
width: 300px;
background: black;
color: white;
border-radius: 10px;
text-transform: uppercase;
letter-spacing: 5px;
}
    form {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        width: 100%;
    }
    .form {
        display: flex;
        justify-content: center;
    }
    h1 {
        margin-top: 40px;
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
</style>