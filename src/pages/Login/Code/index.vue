<template>
	<div class="code-login-warp">
		<div class="from">
			<div class="stm-cell code-login-from-list">
				<div class="cell-warp">
					<div class="cell-left code-login-from-tit">手机号码：</div>
					<div class="cell-main code-login-from-main">
						<input type="number" name="" placeholder="请输入手机号码">
					</div>
				</div>
			</div>
			<div class="stm-cell code-login-from-list">
				<div class="cell-warp">
					<div class="cell-left code-login-from-tit">验证码：</div>
					<div class="cell-main code-login-from-main">
						<input type="number" name="" placeholder="请输入验证码" v-model="value">
						<div class="code" @click="code">验证</div>
					</div>
				</div>
			</div>
		</div>
		<button type="primary"  bindtap="primary" class="stm-main-button stm-m20-rl stm-m10-t">提交</button>
		<p class="login-other" @click="other">账号密码登录</p>
	</div>
</template>

<script>
export default {
	name: 'code-login',
	data () {
		return {
			value:''
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '验证码登录'
		})
	},
	methods: {
		other() {
			wx.navigateTo({
			  url: '/pages/Login/Name/main'
			})
		},
		code() {
			if(!this.value) {
				wx.showLoading({
					title: '请填写手机号',
				});
				setTimeout(function(){
				  wx.hideLoading()
				},2000)
			}else{
				console.log('1')
			}

		},
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
@import '../../../configs/cell.less';
@import '../../../configs/main.less';
.code-login-warp{
	.login-other{
		line-height:55px;
		font-size:@fonttwo;
		color:@maincolor;
		padding:0 20px;

	}
	.from{
		background:#fff;
		padding:0 20px;
		font-size:@fonttwo;
		.code-login-from-list{
			.code-login-from-main{
				position:relative;
				.code{
					position:absolute;
					right:0;top:0;
					font-size:@fonttwo;
					border-radius:5px;
					color:#000;
					border:1px solid @auxiliary;
					padding:5px 10px;
				}
			}
		}

	}
}
</style>
