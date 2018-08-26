<!-- stui 时间组件 -->
<template>
	<span class="time" v-if="time">
		{{getFullYear}}年{{getMonth}}月{{getDate}}日{{getHours}}:{{getUTCMinutes}}:{{getSeconds}}

	</span>
</template>
<script>
export default {
	props: {
		time: {
			type:String,
			default:''
		}
	},
	computed:{
		getFullYear () {
			if(this.time){
				return this.time.getFullYear()
			}
		},
		getMonth () {
			if(this.time){
				return this.time.getMonth()+1
			}
		},
		getDate () {
			if(this.time){
				return this.time.getDate()
			}
		},
		getHours () {
			if(this.time){
				return this.time.getHours()
			}
		},
		getUTCMinutes () {
			if(this.time){
				return this.time.getUTCMinutes()
			}
		},
		getSeconds () {
			if(this.time){
				return this.time.getSeconds()
			}
		}
	}
}
</script>
<style lange="less">

</style>
