<template>
	<div class="withdrawal-limit" v-if="limits.length > 0">
		提现约束：
		<div v-for="(limit,i) in limits" :key="i">
			<div v-if="!limit.is_floor">
				<p v-if="limit.time_range/3600 > '25' " class="fg-gray">{{(limit.time_range/3600/24)}}天之内 提现限额{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 == '0' " class="fg-gray">单笔限额{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 <= '24'" class="fg-gray">{{limit.time_range/3600}}小时之内 限额{{limit.limit}}</p>
				<p v-else class="fg-gray">{{(limit.time_range/3600/24)}}天之内 提现限额{{limit.limit}}</p>
			</div>
			<div v-else>
				<p v-if="limit.time_range/3600 > '25' " class="fg-gray">{{(limit.time_range/3600/24)}}天之内 最低额度{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 == '0' " class="fg-gray">单笔最低限额{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 <= '24'" class="fg-gray">{{limit.time_range/3600}}小时之内 最低限额{{limit.limit}}</p>
				<p v-else class="fg-gray">{{(limit.time_range/3600/24)}}天之内 最低额度{{limit.limit}}</p>
			</div>
		</div>
	</div>
	<div class="withdrawal-limit" v-else>
		无提现约束

	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'limits',
	data () {
		return {
			limits:''
		}
	},
	props: {
		id:Number
	},
	onLoad() {
			this.getdata()
	},
	methods: {
		getdata() {
			var _this = this
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}withdraw-rules/${this.id}/limits?is_hard=1`,
				method: 'GET',
				header: {
					token:wx.getStorageSync('Authtoken'),
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					console.log(d)
					_this.limits = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}else if(err.statusCode == 401){
					wx.removeStorageSync('Authtoken')
					_this.getdata()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	}
}
</script>

<style lang="less" scoped>
.withdrawal-limit{margin-top:10px;}
.withdrawal-limit p{line-height: 20px;}
</style>
