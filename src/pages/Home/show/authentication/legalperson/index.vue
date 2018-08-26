<template>
	<div class="show-indentity">
		<ul>
			<li>
				<p>已通过企业法人认证</p>
				<i class="iconfont icon-renzheng">
					<em class="iconfont icon-renzheng"></em>
				</i>
			</li>
		</ul>
		<dl>
			<dt>上海启烨网络安全技术有限公司</dt>
			<dd>法人：叶**</dd>
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
			title:'法人认证'
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
			background:#2fd2b1;
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
					background:#2fd2b1;
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
