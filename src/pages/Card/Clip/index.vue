<template>
	<div class="car-clip-warp">
		<div class="logining" @click="login">
			请<span>登录账户</span>，确保已存名片永不丢失
		</div>
		<div class="search">
			<input type="text" name="" placeholder="搜索公司/联系人">
		</div>
		<div class="clip-list">
			<dl @click="lookcard">
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6><open-data type="userNickName"></open-data></h6>
					<p>总经理</p>
					<p>上海猫口袋信息科技有限公司</p>
				</dd>
			</dl>
			<dl @click="lookcard">
				<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
				<dd>
					<h6><open-data type="userNickName"></open-data></h6>
					<p>总经理</p>
					<p>上海猫口袋信息科技有限公司</p>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
export default {

	name: 'car-clip-warp',
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '名片夹'
		})
	},
	data () {
		return {

		}
	},
	methods: {
		lookcard() {
			wx.navigateTo({
			  url: '/pages/Card/Share/main'
			})
		},
		login() {
			wx.navigateTo({
			  url: '/pages/Login/Code/main'
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
.car-clip-warp{
	.clip-list{
		dl{
			display:flex;
			background:#fff;
			padding-bottom:10px;
			position:relative;
			dt{
				width:60px;
				height:60px;
				border-radius:50%;
				overflow:hidden;
				margin:10px;
			}
			dd{
				padding-top:10px;
				font-size:@fonttwo;
				color:@fontcolor;
				h6{
					font-size:@fontthree;
					color:#000;
				}
			}
			&:after{
				content:'';
				display:block;
				position:absolute;
				bottom:0;
				left:0;
				width:100%;
				height:1px;
				background:#eee;
			}
		}
	}
	.logining{
		width:100%;
		height:25px;
		font-size:@fontone;
		line-height:25px;
		text-indent:10px;
		color:@fontcolor;
		span{
			color:@maincolor;
		}
	}
	.search{
		width:100%;
		height:45px;
		background:#ddd;
		display:flex;
		align-items:center;
		input{
			width:95%;
			height:30px;
			border-radius:30px;
			background:#fff;
			margin:0 auto;
			font-size:@fonttwo;
			text-indent:10px;

		}
	}
}
</style>
