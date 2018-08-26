<template>
	<div class="team-home">
		<div class="show-top">
			<open-data type="userAvatarUrl" class="img"></open-data>
			<p>某某团队</p>
		</div>
		<div class="show-nav">
			<ul>
				<li @click="gonav(1)">
					<i class="iconfont  icon-qiyejianjie"></i>
					<p>团队介绍</p>
				</li>
				<li @click="gonav(2)">
					<i class="iconfont icon-chanpinguanli"></i>
					<p>计数器</p>
				</li>
				<li @click="gonav(3)">
					<i class="iconfont icon-huodongyouxian"></i>
					<p>团队活动</p>
				</li>
				<li @click="gonav(4)">
					<i class="iconfont icon-ziliaoguanli"></i>
					<p>队友列表</p>
				</li>
			</ul>
		</div>
		<div class="show-main stm-m10-t" v-if="nav == 1">
			<div class="Htitle">团队介绍</div>
			<p :class="{show:isShow}">上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司</p>
			<p class="more" @click="more">展示更多</p>
			<video></video>
			<swiper :indicator-dots="indicatorDots"  :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<image src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg" class="slide-image" width="355" height="150"/>
				</swiper-item>
				<swiper-item>
					<image src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg" class="slide-image" width="355" height="150"/>
				</swiper-item>
			</swiper>
		</div>
		<div class="count-show stm-m10-t" v-if="nav == 2">
				<div class="Htitle">计数统计</div>
				<div class="count-nav">
					<ul>
						<li @click="sublimt(1)" :class="[sub == 1? 'active' : '']">我的统计</li>
						<li @click="sublimt(2)" :class="[sub == 2? 'active' : '']">队友统计</li>
					</ul>
				</div>
				<div class="count-content" v-if="sub == 1">
					<div class="yd-preview" @click="toggteam">
						<div class="yd-preview-header">
							<div>打卡人</div>
							<div>叶志勇</div>
						</div>
						<div class="yd-preview-item">
							<div>备注</div>
							<div class="text-over">某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某</div>
						</div>
						<div class="yd-preview-item">
							<div>时间</div>
							<div>2018-05-21</div>
						</div>
					</div>
				</div>
				<div class="count-content" v-if="sub == 2">

				</div>
		</div>
		<team-count :isShow="teamisShow" @close="toggteam"></team-count>
		<div class="activity-show show-main stm-m10-t" v-if="nav == 3">
			<div class="Htitle">团队活动</div>
			<dl>
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6>活动名称</h6>
					<p>的事发生大幅度释放第三方第三方
					都发生的方法是大幅度释放速度防
					盗锁反对反对反对法
					</p>
					<span>时间：12011</span>
				</dd>
			</dl>
			<dl>
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6>活动名称</h6>
					<p>的事发生大幅度释放第三方第三方
					都发生的方法是大幅度释放速度防
					盗锁反对反对反对法
					</p>
					<span>时间：12011</span>
				</dd>
			</dl>
		</div>
		<div class="activity-show show-main stm-m10-t" v-if="nav == 4">
			<div class="Htitle">队友列表</div>
			<dl>
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6>昵称</h6>
					<p>加入时间：20155
					</p>
					<span>查看名片</span>
				</dd>
			</dl>
			<dl>
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6>昵称</h6>
					<p>加入时间：20155
					</p>
					<span>查看名片</span>
				</dd>
			</dl>
		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary" class="stm-main-button stm-m20-rl" @click="show" >打卡</button>
		</div>

		<div class="dialog-main clock-dialog" :class="{clockshow:clockisShow}">
			<div class="dialog-bg" @click="show"></div>
			<div class="dialog-content clock-content">
				<div class="title">打开/计数器</div>
				<div class="main">
					<p>当前时间：<stm-time :time="newtime"></stm-time></p>
					<p>当前地址：<span v-if="address">{{address}}</span><span v-else>暂无</span></p>
					<p style="display:flex;">
						<input type="text" name="" placeholder="数字输入">
						<input type="text" name="" placeholder="数字输入">
						<input type="text" name="" placeholder="数字输入">
					</p>
					<div><span>备注记录：</span><textarea placeholder="输入备注限500字内"></textarea></div>
					<button type="primary"  class="stm-main-button stm-m20-rl stm-m10-t" @click="show"> 提交 </button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TeamCount from '@/components/TeamHome/index'
import Time from '@/components/time/index'
var QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
export default {

	name: 'team-home',
	components: {
		'team-count':TeamCount,
		'stm-time':Time
	},
	data () {
		return {
			clockisShow:false,
			isShow:false,
			teamisShow:false,
			indicatorDots: true,
			autoplay: false,
			interval: 5000,
			duration: 1000,
			newtime:'',
			nav:1,
			sub:1,
			address:''
		}
	},
	onLoad(e) {
		this.nav = e.id
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '某某团队'
		})
		qqmapsdk = new QQMapWX({
			key: '5VHBZ-XUP6S-MK4OD-6Y63R-5SIAZ-T3FH7'
		})
		var _this = this;
		wx.getLocation({
			type:'wgs84',
			success(res) {
				// 调用接口
				qqmapsdk.reverseGeocoder({
						location: {
								latitude: res.latitude,
								longitude:  res.longitude
						},
						success: function (res) {
								_this.address = res.result.address
						},
						fail: function (res) {
								console.log(res);
						},
					complete: function (res) {
					}
				})
			}
		})
	},
	created() {
		var date = new Date();
		this.newtime = date;
	},
	methods:{
		show() {
			this.clockisShow = !this.clockisShow
		},
		more() {
			this.isShow = !this.isShow
		},
		gonav(e){
			this.nav = e
		},
		sublimt(e) {
			this.sub = e
		},
		toggteam() {
			this.teamisShow = !this.teamisShow
		},

	}
}
</script>

<style lang="less">
@import '../../../configs/style.less';
@import '../../../configs/main.less';
@import '../../../configs/dialog.less';
@import '../../../configs/yd-preview.less';
.team-home{
	.clock-dialog{
		display:none;
		.main{
			font-size:@fonttwo;
			padding:20px;
			p{
				margin:4px 0;
				input{
					border:1px solid #ccc;
					margin:10px;
					line-height:30px;
					height:30px;
					text-align:center;
					font-size:@fonttwo
				}
			}
			div{
				width:100%;
				display:flex;
				textarea{
					width:100%;
					flex:1;
					height:90px;
					max-height:90px;
				}
			}
		}
	}
	.clockshow{
		display:block;
	}
	.show-top{
		width:calc(100% - 40px);
		padding:20px 20px;
		background:@maincolor;
		display:flex;
		align-items:center;
		.img{
			width:60px;
			height:60px;
			border-radius:5px;
			overflow:hidden;
			flex:0 60px;
		}
		p{
			flex:1;
			font-size:@fonttwo;
			color:#fff;
			margin-left:20px;
		}

	}
	.show-nav{
		ul{
			display:flex;
			background:#fff;
			li{
				padding:20px 0;
				flex:1;
				font-size:@fonttwo;
				text-align:center;
				color:@fontcolor;
				i{
					font-size:@fontthree;
				}
			}
		}
	}
	.Htitle{
		height:30px;
		font-size:@fontthree;
		line-height:30px;
		position:relative;
		text-indent:10px;
		margin-bottom:10px;
		&:after{
			content:'';
			display:block;
			position:absolute;
			left:0;
			top:8px;
			width:2px;
			height:18px;
			background:@auxiliary;
		}
	}
	.count-show{

		.text-over{
			word-wrap: break-word;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}
		.count-nav{
			background:#fff;
			padding-top:10px;
			ul{
				display:flex;
				li{
					&.active{
						color:@maincolor;
						border-bottom:2px solid @maincolor;
					}
					flex:1;
					text-align:center;
					padding-bottom:10px;
				}
			}
		}
	}
	.activity-show{
		dl{
			margin-bottom:10px;
			display:flex;
			position:relative;
			padding-bottom:10px;
			dt{
				width:60px;
				height:60px;
				img{
					width:60px;
					height:auto;
				}
			}
			dd{
				margin-left:10px;
				flex:1;
				h6{
					font-size:@fontthree;
					font-weight:normal;
					line-height:25px;
				}
				p,span{
					font-size:@fonttwo;
					color:@fontcolor;
					word-wrap:break-word;
					word-break:break-all;
					overflow:hidden;
					text-overflow:ellipsis;
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:1;
					margin:0;
				}
			}
			&:after{
				clear:both;
				display:block;
				content:'';
				height:1px;
				width:100%;
				position:absolute;
				bottom:0;
				background:#eee;
			}
		}
	}
	.show-main{
		background:#fff;
		padding:20px;
		video{
			width:100%;
		}
		p{
			font-size:@fonttwo;
			color:@fontcolor;
			line-height:25px;
			margin-bottom:5px;
			word-wrap: break-word;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow:hidden;
			&.show{
				-webkit-line-clamp: initial;
				overflow: initial;
			}
			i{
				margin-right:10px;
			}
		}
		.more{
			color:@auxiliary;
		}
	}
}
</style>
