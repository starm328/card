<template>
	<div class="people-index" :style="'padding-top:'+navgationHeight+'px;background:#eee;min-height:100vh'">
		<ul>
			<input type="" name="" placeholder="搜索">
			<li :class="[type == 1 ? 'active':'']" @click="Gtype(1)">最具人气</li>
			<li :class="[type == 2 ? 'active':'']" @click="Gtype(2)">最为活跃</li>
			<li :class="[type == 3 ? 'active':'']" @click="Gtype(3)">最新发布</li>
		</ul>
		<div class="list">
			<dl v-for="(item,i) in list" @tap="longtap(item.id)" :key="i">
				<dt>
					<img :src="item.img_url"  class="img" mode="widthFix">
				</dt>
				<dd>
					<h6>{{item.name}}</h6>
					<p>{{item.company}}</p>
				</dd>
			</dl>
		</div>

		<div class="datano" v-if="!onReachBottom">没有更多数据了</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
var util = require('@/utils/md5.js')
export default {
	name: 'people-index',
	data () {
		return {
			navgationHeight:'',
			list:'',
			page:1,
			onReachBottom:true,
			pageSize:10,
			type:1,
		}
	},

	onLoad() {
			this.getdata()
			let startBarHeight = 20
			let navgationHeight = 44
			let that = this
			wx.getSystemInfo({
			  success: function (res) {
				console.log(res.model)
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				console.log('o')
				that.navgationHeight= navgationHeight+startBarHeight
			  }
			})

	},
	onUnload() {
		this.onReachBottom =  true,
		this.page = 1
		this.pageSize = 10
		this.type = 1
	},
	components: {
	},
	onPullDownRefresh() {
		this.getdata();
		this.page = 1
		this.pageSize = 10
	},
	onReachBottom() {
		var _this = this;
		console.log(_this.onReachBottom)
		if(_this.onReachBottom){
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/card/index/`+_this.page + '?type=' + _this.type,
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
					_this.list = [..._this.list,..._list];
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
		Gtype(e){
			this.type = e
			this.getdata()
			this.page = 1
		},
		getdata() {
			var _this = this
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/card/index/0?type=`+_this.type,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					this.list = d.data
					wx.stopPullDownRefresh()
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
		longtap(cardid) {
				var date = new Date().getTime()
				wx.navigateTo({
				  url: '/pages/Home/share/main?id='+ cardid +'&time=' + date+'&token='+util.hexMD5(cardid + '_' + date) + '&isback=isback',
				})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
.people-index{
	.datano{
		width:100%;
		height:30px;
		line-height:30px;
		color:#999;
		font-size:13px;
		text-align:center;
	}
	ul{
		input{
			width:95%;
			height:35px;
			line-height:35px;
			background:#eee;
			margin:4px auto 10px auto;
			text-indent:10px;
			font-size:13px;
		}
		width:100%;
		background:#fff;
		padding-bottom:10px;
		padding-top:10px;
		li{
			padding:0 10px;
			font-size:@fonttwo;
			color:@fontcolor;

			float:left;
			&.active{
				color:#000;
			}
		}
		&:after{
			clear:both;
			display:block;
			content:''
		}

	}
	.list{
		dl{
			width:calc(33.3% - 16px);
			border-radius:5px;
			background:#fff;
			margin:20px 8px 10px 8px;
			float:left;
			text-align:center;
			padding:0 0 10px 0;
			box-shadow:0px 2px 9px 3px rgba(000, 000, 000, 0.1);
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
					overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
				}

				p{
					flex:1;
					overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
					font-size:@fontone;
					color:@fontcolor;
				}

			}
		}
		&:after{
			clear:both;
			display:block;
			content:''
		}
	}

}
</style>
