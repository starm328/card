
<template>
	<div class="information-system" :style="'padding-top:'+navgationHeight+'px'">
		<dl v-for="(item,i) in message" :key="i">
			<dd>{{item.content}}</dd>
		</dl>
		<div class="datano" v-if="!onReachBottom">没有更多数据了</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'information-system',
	data () {
		return {
			navgationHeight:'',
			onReachBottom:true,
			message:'',
			page:1,
			pageSize:10
		}
	},
	onPullDownRefresh() {
		this.getdata()
	},
	onUnload() {
		this.onReachBottom =  true,
		this.page = 1
	},
	onLoad() {
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
	onReachBottom() {
		var _this = this;
		console.log(_this.onReachBottom)
		if(_this.onReachBottom){
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/message/index/3/`+_this.page,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();

					const _list = d.data;
					console.log(d,_this.page,'001')
					_this.message = [..._this.message,..._list];
					if(_list.length < _this.pageSize) {
						_this.onReachBottom =  false
						return
					}

					_this.page = _this.page + 1
					// _this.records = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading ();
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
		}


	},
	methods: {
		getdata() {
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/message/index/3/0`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.stopPullDownRefresh()
					_this.message = d.data
					if(d.data.length > 0){
						console.log(_this.message)
						const innerAudioContext = wx.createInnerAudioContext()
						innerAudioContext.autoplay = true
						innerAudioContext.src = 'https://i1.vpinpai.cn/card/sHUQI2c6q0Dicz76Q6JCUqJOA1bScbWzEr8SedeV.mpga'
						console.log(this.tempFilePath)
						innerAudioContext.onPlay(() => {
							console.log('开始播放')
						})
					}

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
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';

.information-system{
	dl{
		background:#fff;
		border-bottom:1px solid #ddd;
		font-size:@fonttwo;
		padding:20px;
	}
	.datano{
		width:100%;
		height:30px;
		line-height:30px;
		color:#999;
		font-size:13px;
		text-align:center;
	}
}
</style>
