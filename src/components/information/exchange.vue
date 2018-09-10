
<template>
	<div class="information-exchange" :style="'padding-top:'+navgationHeight+'px'">
		<div class="list" v-if="quest">
			<dl v-for="(item,i) in quest" :key="i">
				<dt v-if="item && item.mycard">
					<img :src="item.mycard.img_url" class="img" mode="widthFix">
				</dt>
				<dd v-if="item.mycard">
					<h6 v-if="item.mycard.name">
					</h6>
					<div class="company">
						<p>{{item.mycard.company}}</p>
						<div class="img">
							<img :src="item.card.img_url" mode="widthFix">
						</div>
					</div>
					<p>申请与我交换名片</p>
				</dd>
				<div class="btn" @click="grouping(item.id,i)">
					<span>交换</span>
				</div>
			</dl>
		</div>
		<div class="grouping"  v-if="groupingShow">
			<div class="bg" @click="groupingShow = false"></div>
			<div class="main">
				<div class="title">移动至</div>
				<scroll-view scroll-y style="height: 200px;">
					<!-- <dl>
						<dt>
							<i class="iconfont icon-chanpinguanli"></i>
						</dt>
						<dd>
							<p>新建分组</p>
							<span>0</span>
						</dd>
					</dl> -->
					<dl @click="give">
						<dt>
							<i class="iconfont icon-chanpinguanli"></i>
						</dt>
						<dd>
							<p>默认分组</p>
							<span>{{collection}}</span>
						</dd>
					</dl>
				</scroll-view>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'information-exchange',
	data () {
		return {
			navgationHeight:'',
			groupingShow:false,
			quest:'',
			collection:wx.getStorageSync('collection') ? wx.getStorageSync('collection').length : '',
			cardid:'',
			cardlength:''
		}
	},
	onLoad() {
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

			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showrequest`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.quest = d.data
					if(d.data.length > 0){
						console.log(_this.quest)
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
	},
	methods: {
		grouping(id,i) {
			this.groupingShow = true,
			this.cardid = id,
			this.cardlength = i
		},
		give() {
			wx.showLoading({
				title: '提交中',
			})
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/dealrequest/`+_this.cardid + '/2',
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					wx.showToast({
						title: '交換成功',
						icon: 'success',
						duration: 2000
					})
					_this.groupingShow = false
					_this.quest.splice(_this.cardlength, 1)
					if(wx.getStorageSync('showrequest') > 0){
						var showrequest =  wx.getStorageSync('showrequest') - 1
						wx.setStorageSync('showrequest',showrequest)

					}

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
				}else if(err.statusCode == 403){
					wx.showToast({
						title: err.data.message,
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

.information-exchange{
	.list{
		dl{
			width:80%;
			border-radius:10px;
			background:#fff;
			margin:20px auto 0 auto;
			display:flex;
			padding:15px;
			dt{
				width:60px;
				height:60px;
				border-radius:5px;
				overflow:hidden;
				margin-right:10px;
				.img{
					width:100%;
				}
			}
			dd{
				flex:1;
				h6{
					font-size:@fontt16;
				}
				.company{
					margin:2px 0;
					font-size:@fonttwo;
					display:flex;
					p{
						flex:1;
						overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
						font-size:@fonttwo;
						color:@fontcolor;
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
				p{
					overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
					font-size:@fonttwo;
					color:@fontcolor;

				}
			}
			.btn{
				width:90px;
				span{
					float:right;
					display:inline-block;
					border-radius:5px;
					text-align:center;
					font-size:@fonttwo;
					width:60px;
					line-height:30px;
					height:30px;
					background:@maincolor;
					color:#fff;
					margin-top:15px;
				}
				&.over{
					span{
						background:none;
						color:@maincolor
					}
				}
			}
		}
	}
	.grouping{
		.bg{
			position:fixed;
			bottom:0;
			width:100%;
			height:100%;
			background:rgba(000,000,000,0.5)
		}
		.main{
			position:fixed;
			bottom:0;
			background:#fff;
			border-top-left-radius:10px;
			border-top-right-radius:10px;
			overflow:hidden;
			width:100%;
			.title{
				width:100%;
				height:40px;
				line-height:40px;
				text-indent:10px;
				color:#000;
				background:#f1f1f1;
			}
			dl{
				display:flex;
				padding:5px;
				position:relative;
				border-bottom:1px solid #f1f1f1;
				dt{
					margin:10px;
					width:60px;
					height:60px;
					background:#f1f1f1;
					border-radius:10px;
					overflow:hidden;
					text-align:center;
					line-height:60px;
					i{
						color:@maincolor;
					}
				}
				dd{
					margin-top:10px;
					font-size:@fontthree;
					span{
						color:@fontcolor;
					}
				}
			}
		}
	}

}
</style>
