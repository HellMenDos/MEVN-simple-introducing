<template>
<div class="course">
	<div class="course_inner">
		<div class="video"></div>
		<div class="description">
			{{data.des}}
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
				data:null
			}
		},
		mounted:function() {
			
			var data = {
                userId: JSON.parse(localStorage.getItem('user'))._id,
                courseId: this.$route.params.id,
                num: 0
            };
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3000/api/checkersplus',
            };
            axios(options).then((res) => {
            //	console.log(res)
            if (res.data.status == false) {
            	location.href = '/'
            }else {
            	this.data = res.data.buy[0]
            }
});
		}
	}
</script>
<style scoped>
	.course {
		margin-bottom: 170px;
	}
	.course_inner {
		max-width: 900px;
		width: 100%;
		margin: 0 auto;
		
	}
	.video {
		height: 600px;
		background: black;
	}
	.description {
		text-align: left;
		margin-top: 90px;
	}
</style>