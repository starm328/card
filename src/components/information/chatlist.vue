
<template>
	<div class="information-system" >
		<chat-item v-for="(item,i) in userids" :key="i" :itemid="item" v-if="item"></chat-item>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
import ChatItem from '@/components/information/chatitem'
export default {
	name: 'information-system',
	components: {
		'chat-item':ChatItem
	},
	data () {
		return {
			navgationHeight:'',
			onReachBottom:true,
			userids:'',
			page:1,
			pageSize:10,
			id:''
		}
	},
	onPullDownRefresh() {
		this.getdata()
		this.page = 1
	},
	onUnload() {
		this.onReachBottom =  true,
		this.page = 1
		this.message = []
	},
	onLoad(option) {
			this.id  = wx.getStorageSync('token').user_id
			this.getdata()
			var startBarHeight = 20
			var navgationHeight = 44
			var _this = this;
			wx.getSystemInfo({
			  success: function (res) {
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				_this.navgationHeight= navgationHeight+startBarHeight
			  }
			})


	},
	methods: {
		chats(id) {
			wx.navigateTo({
				url: '/pages/Information/chat/main?id='+ id,
			})
		},
		getdata() {
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/chatslist`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				},
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.userids = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					wx.removeStorageSync('token')
				}else if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},

	}
}
</script>

<style lang="less" scoped>



</style>
