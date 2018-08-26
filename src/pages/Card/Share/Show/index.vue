<template>
	<div class="card-show-home">
		<div class="show-top">
			<open-data type="userAvatarUrl" class="img"></open-data>
			<p>上海猫口袋信息科技有限公司</p>
		</div>
		<div class="show-nav">
			<ul>
				<li @click="gonav(1)">
					<i class="iconfont  icon-qiyejianjie"></i>
					<p>企业介绍</p>
				</li>
				<li @click="gonav(2)">
					<i class="iconfont icon-chanpinguanli"></i>
					<p>企业产品</p>
				</li>
				<li @click="gonav(3)">
					<i class="iconfont icon-huodongyouxian"></i>
					<p>企业活动</p>
				</li>
				<li @click="gonav(4)">
					<i class="iconfont icon-ziliaoguanli"></i>
					<p>工商信息</p>
				</li>
			</ul>
		</div>
		<div class="show-main stm-m10-t" v-if="nav == 1">
			<div class="Htitle">公司介绍</div>
			<p><i class="iconfont icon-wode"></i><span>企业规模：51~100人</span></p>
			<p><i class="iconfont icon-hangyexiehui"></i><span>所属行业：计算机软件</span></p>
			<p :class="{show:isShow}">上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司</p>
			<p class="more" @click="more">展示更多</p>
		</div>
		<div class="stm-m10-t activity-show show-main" v-if="nav == 2">
			<div class="Htitle">企业产品(2个)</div>
			<dl @click="goitem">
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6>产品名字</h6>
					<p>的事发生大幅度释放第三方第三方
					都发生的方法是大幅度释放速度防
					盗锁反对反对反对法
					</p>
					<span>展开产品详情</span>
				</dd>
			</dl>
			<dl @click="goitem">
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6>产品名字</h6>
					<p>的事发生大幅度释放第三方第三方
					都发生的方法是大幅度释放速度防
					盗锁反对反对反对法
					</p>
					<span>展开产品详情</span>
				</dd>
			</dl>
		</div>
		<team-count :isShow="isShow" @close="toggteam"></team-count>
		<div class="activity-show show-main stm-m10-t" v-if="nav == 3">
			<div class="Htitle">企业活动(2个)</div>
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
			<div class="Htitle">工商信息</div>
		</div>
	</div>
</template>

<script>
export default {

	name: 'card-show-home',

	data () {
		return {
			clockisShow:false,
			isShow:false,

			newtime:'',
			nav:1,
			sub:1,
			address:''
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '企业信息'
		})
	},
	created() {

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
			this.isShow = !this.isShow
		},
		goitem() {
			wx.navigateTo({
			  url: '/pages/Card/Share/Item/main'
			})
		}
	}
}
</script>

<style lang="less">
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
@import '../../../../configs/dialog.less';
@import '../../../../configs/yd-preview.less';
.card-show-home{
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
