<template>
	<div class="enterprise-show">
		<div class="enterprise-show-car">
			<h5>上海猫口袋信息科技有限公司</h5>
			<dl>
				<dt>负责人：也之用</dt>
				<dt>当前身份：赞助商</dt>
				<dt>授权人数：无限</dt>
				<dt>当前已授权：5人</dt>
				<dt>产品数量：5个</dt>
				<dt>当前已发布：5个</dt>
				<dt>总访问数量：233次</dt>
				<dt>贡献值：2222</dt>
				<dt>活动数量：3个</dt>
				<dt>当前活跃活动：1个</dt>
				<dt>参与人数：2个</dt>
			</dl>
		</div>

		<div class="enterprise-show-simal-top">
			<ul>
				<li @click="Authorize">待授权员工名片 5人</li>
				<li>授权口令：123456789</li>
			</ul>
		</div>
		<div class="enterprise-menu">
			<ul>
				<li @click="template">建设模板</li>
				<li @click="clock">员工打卡</li>
				<li @click="lookshow">企业信息</li>
			</ul>
		</div>
		<div class="enterprise-nav">
			<div class="stm-cell  enterprise-nav-list" @click="admProduct">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">产品管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">活动管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list" @click="gostaff">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">员工管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">财务信息</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">账号管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">帮助中心</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
		</div>
		<button type="primary"  bindtap="primary" class="stm-main-button stm-m20-rl stm-m10-t" @click="cardeit"> 资助感恩父母行动联盟 </button>
	</div>
</template>

<script>
export default {

	name: 'enterprise-show',

	data () {
		return {

		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '企业账号'
		})
	},
	created () {
	},
	methods:{
		gostaff() {
			wx.navigateTo({
				url:'/pages/Enterprise/Staff/main'
			})
		},
		Authorize() {
			wx.navigateTo({
				url:'/pages/Enterprise/Authorize/main'
			})
		},
		admProduct() {
			wx.navigateTo({
				url:'/pages/Enterprise/AdmProduct/main'
			})
		},
		clock(){
			wx.navigateTo({
			  url: '/pages/Enterprise/Clock/main'
			})
		},
		lookshow(){
			wx.navigateTo({
			  url: '/pages/Card/Share/Show/main'
			})
		},
		template() {
			wx.navigateTo({
			  url: '/pages/Enterprise/Template/main'
			})
		}

	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
@import '../../../configs/main.less';
@import '../../../configs/cell.less';
@import '../../../configs/fonts.css';
.enterprise-show{
	.enterprise-show-car{
		h5{
			color:#fff;
			font-size:@fontthree;
		}
		.enterprise-top-list{
			margin:10px 0;
			position:relative;
			border-top:1px dashed #fff;
			padding-top:10px;
			.right-btn{
				position:absolute;
				right:0;
				top:50%;
				margin-top:-7px;
				background:@auxiliary;
				padding:4px 10px;
				font-size:@fonttwo;
				color:#fff;
				border-radius:5px;
			}
			&:after{
				display:none;
			}
		}
		width:90%;
		margin:10px auto;
		background:@maincolor;
		border-radius:4px;
		box-shadow:2px 12px 2px -10px @auxiliary;
		padding:10px;
		dl{
			dt{
				width:50%;
				float:left;
				color:#fff;
				font-size:@fonttwo;
			}
			&:after{
				clear:both;
				content:'';
				display:block;
			}
		}
		p{
			color:#fff;
			font-size:@fonttwo;
		}
	}
	.enterprise-show-simal-top{
		ul{
			display:flex;
			background:#fff;
			margin-bottom:10px;
			font-size:@fonttwo;
			line-height:45px;
			li{
				flex:1;
				text-align:center;
			}
		}
	}
	.enterprise-nav{
		.enterprise-nav-list{
			background:#fff;
			padding:12px 0;
			position:relative;
			.enterprise-tit{
				font-size:@fonttwo;
				text-indent:20px;
			}
			i{
				display:block;
				flex:1;
				text-align:right;
				padding-right:20px;
				color:@fontcolor;
			}
		}
	}
	.enterprise-menu{
		background:#fff;
		margin-bottom:10px;
		padding:10px 0;
		ul{
			li{
				width:33.3%;
				float:left;
				text-align:center;
				font-size:@fonttwo;
				line-height:30px;
				position:relative;
				&:after{
					content:'|';
					position:absolute;
					right:0;
					color:@fontcolor;
				}
				&:nth-child(3n):after{
					display:none;
				}
			}
			&::after{
				clear:both;
				content:'';
				display:block;
			}
		}
	}
}

</style>
