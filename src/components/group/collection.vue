<template>
	<div class="information-exchange" :style="'padding-top:'+navgationHeight+'px'">
		<st-nodata v-if="quest.length == 0"></st-nodata>

		<div class="list" v-else>
			<dl v-for="(item,i) in quest" :key="i" @tap="longtap(item.user_id)" @longpress="longpress(item.id,i)" :class="[scale == i ? ' scale': '']" @touchend="touchend(i)" v-if="item.card">
				<dt v-if="item.card">
					<img :src="item.card.img_url" class="img" mode="widthFix">
				</dt>
				<dd v-if="item.card">
					<h6>
						{{item.card.name}}
					</h6>
					<div class="company">
						<p>{{item.card.company}}</p>
					</div>
				</dd>
			</dl>
		</div>
		<div class="datano" v-if="!onReachBottom">没有更多数据了</div>

	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
import Nodata from '@/components/nodata';

var util = require('@/utils/md5.js')
export default {
	name: 'information-exchange',
	components: {
		'st-nodata': Nodata,
	},
	data () {
		return {
			navgationHeight:'',
			groupingShow:false,
			quest:'',
			page:1,
			onReachBottom:true,
			scale:-1,
			pageSize:10
		}
	},

	onLoad() {
			this.getdata();
			let startBarHeight = 20
			let navgationHeight = 44
			let that = this
			wx.getSystemInfo({
			  success: function (res) {
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				that.navgationHeight= navgationHeight+startBarHeight
			  }
			})

	},
	onUnload() {
		this.onReachBottom =  true
	},
	onPullDownRefresh() {
		this.getdata()
		this.page = 1
		this.pageSize = 10
	},
	onReachBottom() {
		var _this = this;
		if(_this.onReachBottom){
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showcollection/`+this.page,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					const _list = d.data;
					_this.quest = [..._this.quest,..._list];
					if(_list.length < _this.pageSize) {
						this.onReachBottom =  false
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
		longpress(id,i){
			var _this = this;
				wx.showModal({
					title: '提示',
					content: '确认删除',
					success: function(res) {
						if (res.confirm) {
							wx.pro.request({
								url:`${configs.card.apiBaseUrl}api/user/delcollection/`+id,
								method: 'GET',
								header: {
									token:Auth.proxy.token.access_token
								}
							})
							.then(d => {
								if(d.statusCode == 200){
									wx.showToast({
										title: '已删除',
										icon: 'success',
										duration: 2000
									})
									_this.quest.splice(i,1)
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
						} else if (res.cancel) {

						}
					}
				})
				_this.scale = i
		},
		touchend(i) {
			this.scale = -1
		},
		longtap(userid) {
			wx.navigateTo({
				url: '/pages/Information/chat/main?id='+ userid,
			})
		},
		getdata() {
			wx.showLoading({
				title: '玩命加载中',
			})
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showcollection/0`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					wx.stopPullDownRefresh()
					_this.quest = d.data
					console.log(_this.quest)
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
		},

	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';

.information-exchange{
	.datano{
		width:100%;
		height:30px;
		line-height:30px;
		color:#999;
		font-size:13px;
		text-align:center;
	}
	.list{
		&:after{
			clear:both;
			display:block;
			content:''
		}
		dl{
			width:calc(33.3% - 16px);
			border-radius:5px;
			background:#fff;
			margin:20px 8px 10px 8px;
			float:left;
			text-align:center;
			padding:0 0 10px 0;
			box-shadow:0px 2px 9px 3px rgba(000, 000, 000, 0.1);
			transition:transform 2s;
			dt{
				width:100%;
				border-radius:5px;
				overflow:hidden;
				margin-right:10px;
				max-height:120px;
				.img{
					width:100%;
				}
			}
			dd{
				h6{
					font-size:@fontt16;
					margin-bottom:4px;
					height:20px;
					line-height:18px;
					overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
				}
				.company{
					margin:2px 0;
					font-size:@fonttwo;
					display:flex;
					p{
						flex:1;
						font-size:@fontone;
						color:@fontcolor;
						height:20px;
						line-height:18px;
						overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
					}
					.img{
						width:20px;
						height:20px;
						border-radius:5px;
						overflow:hidden;
						img{
							width:100%
						}
					}
				}

			}
			&.scale{
				transform:scale(0.8,0.8)
			}
		}
	}

}
</style>
