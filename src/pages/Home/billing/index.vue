<template>
	<div class="billing-index">
		<form @submit="formSubmit">
			<dl class="dl-li">
				<dd>
					<p>企业名称</p>
					<input type="text" name="phone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>税务登记号</p>
					<input type="text" name="phone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>单位地址</p>
					<input type="text" name="phone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>电话</p>
					<input type="text" name="phone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>银行基本户账号</p>
					<input type="text" name="phone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>开户行</p>
					<input type="text" name="phone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<div style="width:96%;margin:0px auto;padding-bottom:20px;">
				<button type="primary" formType="submit" class="stm-main-button stm-m10-t">保存</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'billing-index',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
		  title: '开票信息'
		})

	},
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
@import '../../../configs/main.less';
.billing-index{
	.dl-li{
		.dl-tit{
			text-align:left;
			font-size:@fontthree;
			color:@fontcolor;
			line-height:60px;
			margin:0 auto;
		}
		textarea{
			color:@maincolor;
			font-size:@fontt16;
		}
		width:calc(100% - 45px);
		padding:15px;
		margin:10px auto;
		background:#fff;
		border-radius:5px;
		box-shadow: 0px 3px 12px 0px rgba(206, 206, 206, 0.5);
		display:block;
		dd{
			display:flex;
			height:30px;
			line-height:30px;
			input{
				flex:1;
				font-size:@fonttwo;
				margin-left:20px;
				color:@maincolor;
				height:30px;
				line-height:30px;
			}
			.music-start{
				width:100%;
				text-align:center;
			}
			.music-play,.music-delete{
				flex:1;
				width:100%;
				text-align:center;
				display:flex;
				i{
					color:@fontcolor;
					margin-right:10px;
				}
			}
			&.btn{
				p{
					flex:1;
				}
				i.right{
					color:@fontcolor
				}

			}
		}
		.form{
			margin-top:20px;
			border-radius:5px;
			border:1px solid #ccc;
			padding:5px;
			position:relative;
			margin-bottom:10px;
			input{
				font-size:@fonttwo;
				line-height:40px;
				height:40px;
				color:@maincolor;
				border-bottom:1px solid #ccc;
				&:last-child{
					border:0;
				}
			}
			i{
				position:absolute;
				right:-4px;
				top:-8px;
				font-size:@fontfive;
			}
		}
	}
}
</style>
