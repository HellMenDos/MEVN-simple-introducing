<template>
  <div class="info">
    <div class="main_info">
    
    <div class="form">
        <form>
            <h1>Задать вопрос</h1>
            <div class="alert alert-danger" role="alert" 
                    v-show='success != null'>
                    {{ success }}
                    </div>
            <input type="text" name="email" placeholder="Ваша почта" required="required">
            <textarea name="text" placeholder="Введите суть вопроса" rows="10" required="required"></textarea>
            <input type="submit" name="" v-on:click.prevent='ask()'>
        </form>
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
                email: null,
                text:null,
                success:null
            }
        },
        methods: {
            ask:function() {
                var data = {
                email: this.email,
                text: this.text,
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/ask',
            };
            axios(options).then((response) => {
                if (response.data.status == 'ok') {
                    this.success = 'Вопрос успешно был отправлен нас'
                }else {
                    this.success = 'Могла возникнуть ошибка попробуйте в другой раз'
                }

            });
            }
        },
        watch: {
            success: function() {
                setTimeout(()=> {
                    this.success = null
                },5000)
            }
        }
    }
</script>
<style scoped>
.alert {
        color: #72541c;
    background-color: #f8f5d7;
    padding: 10px;
border-radius: 10px;
margin-bottom: 10px;

}
    form {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        width: 100%;
        padding: 10px;
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
     form > textarea {
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