<script>
	export default {
		data() {
			return {
				errorTextReg: null,
    	errorStatusReg: {
        name:true,
        pass:true,
        confpass:true,
        email:true
    },
        pass: null,
        nameform: null,
    	emailform: null,
    	  success: null,
			}
		},
		methods: {
			name: function(e) {
            if (e.target.value.length < 6) {
                this.errorTextReg = 'Имя должно быть больше 6 символов'
                this.errorStatusReg.name = true
            }else {
                this.errorStatusReg.name = false
                this.errorTextReg = null
            }
        },
        password: function(e) {
            if (e.target.value.length < 6) {
                this.errorTextReg = 'Пароль должен быть больше 6 символов'
                this.errorStatusReg.pass = true
            }else {
                this.errorStatusReg.pass = false
                this.errorTextReg = null
            }
        },
        confPass: function(e) {
            if (this.pass != e.target.value) {
                this.errorTextReg = 'Пароли не совпадают'
                this.errorStatusReg.confpass = true
            }else {
                this.errorStatusReg.confpass = false
                this.errorTextReg = null
            }
        },
        email:function (e) {
            if (e.target.value.length == 0) {
                this.errorTextReg = 'Введите почту'
                this.errorStatusReg.email = true
            }else {
                this.errorStatusReg.email = false
                this.errorTextReg = null
            }
        },
		},
		watch: {
			success: function() {
				setTimeout(()=>{this.success = null},5000)
			}
		}
	}
</script>

<style>
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
</style>