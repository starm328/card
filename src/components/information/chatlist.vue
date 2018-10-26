
<template>
	<div class="information-system" :style="'padding-top:'+navgationHeight+'px'">
		<dl v-for="(item,i) in message" :key="i" @click="chats(item.from_user_id)">
			<dt class="visit">
				<img :src="item.origin_avatarUrl" mode="widthFix">
			</dt>
			<dd>
				<h6>{{item.content}}</h6>
				<p>{{item.updated_at}}</p>
			</dd>
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
	},
	onLoad(option) {
			this.id  = option.id
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
				url:`${configs.card.apiBaseUrl}api/user/chats/`+_this.id,
				method: 'GET',
				data: {
					p: _this.page
				},
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
		chats(id) {
			wx.navigateTo({
				url: '/pages/Information/chat/main?id='+ id,
			})
		},
		getdata() {
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/chats/`+_this.id,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				},
				data: {
					p:0
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.message = d.data
					_this.scrollinto = 'bottoms'
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
		padding:20px;
		border-bottom:1px solid #eee;
		display:flex;
		background:#fff;
		dt{
			width:50px;
			height:50px;
			margin-right:10px;
			border-radius:5px;
			text-align:center;
			line-height:50px;
			image{
				width:100%;
				display:block;
				border-radius:5px;
				overflow:hidden;
			}
		}
		dd{
			flex:1;
			h6{
				font-size:@fontt16;
				span{
					float:right;
					color:@fontcolor;
					font-size:@fonttwo;
				}
			}
			p{
				font-size:@fonttwo;
				color:@fontcolor;
				margin-top:3px;
				display:flex;
			}
		}
	}
}
</style>
