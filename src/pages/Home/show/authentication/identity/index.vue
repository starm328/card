<template>
	<div class="show-indentity">
		<ul>
			<li>
				<p>已通过身份认证</p>
				<i class="iconfont icon-huiyuan21">
					<em class="iconfont icon-renzheng"></em>
				</i>
			</li>
		</ul>
		<dl>
			<dt>姓名</dt>
			<dd>已实名认证，当前名字为化名</dd>
		</dl>
		<dl>
			<dt>手机号</dt>
			<dd>189****1319</dd>
		</dl>
		<dl>
			<dt>身份证号码</dt>
			<dd>310*******1614</dd>
		</dl>
	</div>
</template>

<script>
export default {
	name: 'show-indentity',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'身份认证'
		})

	},
}
</script>

<style lang="less" scoped>
@import '../../../../../configs/style.less';

.show-indentity{
	min-height:100%;
	background:#fff;
	ul{
		margin:0 20px;
		padding-top:20px;
		li{
			p{
				flex:1;
				font-size:@fonttwo;
				color:#fff;
				line-height:40px;
				text-indent:20px;
			}
			display:flex;
			width:100%;
			background:@maincolor;
			margin:20px auto;
			padding-top:80px;
			border-radius:5px;
			padding-bottom:5px;
			i{
				flex:1;
				text-align:right;
				margin-right:20px;
				font-size:@fontfive;
				position:relative;
				color:#fff;
				em{
					position:absolute;
					right:-1px;
					bottom:15px;
					font-size:13px;
					z-index:2;
					color:#fff;
					background:@maincolor;
					border-radius:50%;
				}
			}

		}

	}
	dl{
		padding:20px;
		dt{
			font-size:@fonttwo;
			font-weight:bold;
			margin-bottom:5px;
		}
		dd{
			font-size:@fontone;
			color:@fontcolor;
		}
	}
}
</style>
