<template>
	<div class="referress-component" :style="'padding-top:'+navgationHeight+'px'">
		<div class="nav" :style="'height:'+navgationHeight + 'px'">
			<i class="iconfont  icon-shangyiyehoutuifanhui-yuankuang" :style="'margin-top:'+fontmar +'px'" :class="fonticon" @click="back"></i>
			<div class="text" :style="'top:'+fontmar +'px'">
				<picker @change="bindPickerChange" :value="index" :range="commissionde">
					<view class="picker">
						{{commissionde[index]}}<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
					</view>
				</picker>
			</div>

		</div>
		<st-nodata v-if="referress.length == 0"></st-nodata>
		<div v-else>
			<dl v-for="(item,i) in referress" :key="i">
				<dt class="img" v-if="item.head_picture" >
					<img :src="item.head_picture" mode="widthFix" style="width:100%">
				</dt>
				<dt class="visit" v-else>
					<div class="icon">
						<i class="iconfont icon-huiyuan21"></i>
					</div>
				</dt>
				<dd>
					<h6>{{item.label}}<span v-if="commissions && commissions[i]">{{commissions[i].label}}</span></h6>
					<p>ID:{{item.id}}</p>
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

export default {
	name: 'referress-component',
	components: {
		'st-nodata': Nodata,
	},
	data () {
		return {
			navgationHeight:'',
			referress:'',
			onReachBottom:true,
			pageSize:15,
			page:15,
			commissions:[],
			commissiond:wx.getStorageSync('commission')?wx.getStorageSync('commission'):'',
			navgationHeight:'',
			index:0,
			role:''
		}
	},
	onUnload() {
		this.onReachBottom =  true,
		this.page = 15,
		this.pageSize = 15,
		this.commissions = [],
		this.index=0,
		this.role=''

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
	computed: {
		fontmar() {
			return this.navgationHeight - 37
		},
		commissionde() {
			var b = []
			for (var i = 0; i<this.commissiond.length; i++) {
				b.push(this.commissiond[i].label)
			}
			return b
		}
	},
	onPullDownRefresh() {
		this.getdata()
		this.page = 15
		this.pageSize = 15
		this.commissions = []
	},
	onReachBottom() {
		var _this = this;
		if(_this.onReachBottom){
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}relations/0/referrees?take=${_this.pageSize}&skip=${_this.page}${ _this.role !== ''? ('&filters[roleIn][0]=' + _this.role) :''}`,
				method: 'GET',
				header: {
					token:wx.getStorageSync('Authtoken')
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					const _list = d.data;
					_this.referress = [..._this.referress,..._list];
					var commission = wx.getStorageSync('commission')
					var com = []
					_list.forEach(exploitee=>{
						var data= commission.filter(function(item){
							return item.id == exploitee.role;
						})
						com = com.concat(data)
					})
					_this.commissions = _this.commissions.concat(com)
					if(_list.length < _this.pageSize) {
						this.onReachBottom =  false
						return
					}
					_this.page = _this.page + 15
					// _this.records = _list
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading ();
				if(err.statusCode == 401){
					wx.removeStorageSync('token')
					_this.getdata()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	},
	methods: {
		bindPickerChange(e) {
			console.log(this.commissionde)
			if(e.mp.detail.value == '0'){
				this.role = 95
				this.index = 0
				this.getdata()
			}else if(e.mp.detail.value == "1"){
				this.role = 96
				this.index = 1
				this.getdata()
			}else{
				this.role = 97
				this.index = 2
				this.getdata()
			}
		},
		back(){
			wx.navigateBack({
			  delta: 1
			})
		},
		getdata() {
			var _this = this
			if(wx.getStorageSync('Authtoken')){
				_this.getreferress(wx.getStorageSync('Authtoken'))
			}else {
				// 获取商城token
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/token`,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.setStorageSync('Authtoken',d.data.token)
						_this.getreferress(d.data.token)


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
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}




		},

		// 直属下级数量
		getreferress(token) {
			wx.showLoading({
				title: '玩命加载中',
			})
			var _this = this;
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}relations/0/referrees?take=15${_this.role !== ''? ('&filters[roleIn][0]=' + _this.role) :''}`,
				method: 'GET',
				header:{
					token:token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					wx.stopPullDownRefresh()
					_this.referress =  d.data
					var commission = wx.getStorageSync('commission')
					var com = []
					d.data.forEach(exploitee=>{
						var data= commission.filter(function(item){
							return item.id == exploitee.role;
						})
						console.log(data)
						com = com.concat(data)
					})
					_this.commissions = _this.commissions.concat(com)
					console.log(_this.commissions)
				}
				// 2XX, 3XX
			})
			.catch(err => {
					wx.hideLoading ();
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
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
.referress-component{
	.nav{
		width:100%;
		position:fixed;
		top:0;
		left:0;
		z-index:99;
		background:#fa6b5b;
		i{
			margin-left:20px;
			color:#fff;
			font-size:30px;
			position:relative;
			&.active{
				color:#ccc;
			}
		}
		.text{
			position:absolute;
			left:40%;
			text-align:center;
			color:#fff;
			.picker i{
				display:inline-block;
				transform:rotate(90deg);
				font-size:15px;
			}
		}

	}
	.datano{
		width:100%;
		height:30px;
		line-height:30px;
		color:#999;
		font-size:13px;
		text-align:center;
	}
	dl{
		padding:20px 20px 10px 20px;
		display:flex;
		background:#fff;
		border-bottom:1px solid #eee;
		dt{
			width:50px;
			height:50px;
			margin-right:10px;
			border-radius:5px;
			text-align:center;
			line-height:50px;
			i{
				font-size:@fontt16;
				color:#fff;
			}
			&.img{
				border-radius:5px;
				overflow:hidden;
			}
			.icon{
				position:relative;
				span{
					font-size: 12px;
					position: absolute;
					top:-4px;
					right:-4px;
					display: inline-block;
					border-radius: 1000px;
					line-height: 1;
					padding: 3px 6px;
					white-space: nowrap;
					color:#fff;
					background:@maincolor
				}
			}
			&.visit{
				background:#eee;
			}
			&.exchange{
				background:#6866d1
			}
			&.service{
				background:#f56d5b
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
				overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
				em{
					color:@maincolor;
					border:1px solid @maincolor;
					font-size:@fonttwo;
					margin-right:4px;
					border-radius:3px;
					padding:0 3px;
					display:inline-block;
				}
			}
		}
	}
}
</style>
