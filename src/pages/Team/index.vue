<template>
	<div class="team-show">
		<div class="team-show-car">
			<h5>某某组织</h5>
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

		<div class="team-show-simal-top">
			<ul>
				<li>待授权人员 5人</li>
				<li>授权口令：123456789</li>
			</ul>
		</div>
		<div class="team-menu">
			<ul>
				<li @click="goteam">团队管理</li>
				<li @click="main(4)">队员管理</li>
				<li>队主管理</li>
				<li @click="counter">计数器管理</li>
				<li @click="main(3)">活动管理</li>
			</ul>
		</div>
		<div class="team-nav">
			<div class="stm-cell  team-nav-list">
				<div class="cell-warp">
					<div class="cell-left team-tit">订单管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  team-nav-list">
				<div class="cell-warp">
					<div class="cell-left team-tit">账户管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  team-nav-list">
				<div class="cell-warp">
					<div class="cell-left team-tit">帮助中心</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	name: 'team-show',

	data () {
		return {

		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '团队管理 '
		})
	},
	created () {
	},
	methods:{
		main(e) {
			wx.navigateTo({
			  url: '/pages/Team/Home/main' + '?id=' + e
			})
		},
		counter() {
			wx.navigateTo({
			  url: '/pages/Team/Counter/main'
			})
		},
		goteam() {
			wx.navigateTo({
			  url: '/pages/Team/Space/List/main'
			})
		}

	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
@import '../../configs/cell.less';
@import '../../configs/fonts.css';
.team-show{
	.team-show-car{
		h5{
			color:#fff;
			font-size:@fontthree;
		}
		.team-top-list{
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
	.team-show-simal-top{
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
	.team-nav{
		.team-nav-list{
			background:#fff;
			padding:12px 0;
			position:relative;
			.team-tit{
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
	.team-menu{
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
