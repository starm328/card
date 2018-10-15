<template>
	<div class="billing-index stm-warp">
		<form @submit="formSubmit">
			<dl class="dl-li">
				<dd>
					<p>企业名称</p>
					<input type="text" name="receiptname" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>税务登记号</p>
					<input type="text" name="registration" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>单位地址</p>
					<input type="text" name="receiptaddress" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>电话</p>
					<input type="number" name="receiptphone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>银行基本户账号</p>
					<input type="text" name="receiptcard" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>开户行</p>
					<input type="text" name="receiptbank" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<div style="width:96%;margin:0px auto;padding-bottom:20px;">
				<button type="primary" formType="submit" class="stm-main-button stm-m10-t">保存</button>
			</div>
		</form>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'billing-index',
	data () {
		return {
			id:''
		}
	},
	onLoad(option) {
		if(option.id){
			console.log(option.id)
			this.id = option.id
		}
	},
	onUnload() {
		this.id =''
	},
	methods: {
		formSubmit(e) {
			console.log(e)
			if(this.id){
				var _this = this;
				wx.pro.request({
					url:  `${configs.card.apiBaseUrl}api/user/receipt/`+_this.id,
					method: 'POST',
					header: {
						token:Auth.proxy.token.access_token
					},
					data:e.mp.detail.value,

				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading ();
						wx.redirectTo({
							url: '/pages/Home/show/main?id='+_this.id,
						})
						_this.cardid = d.data
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 422){
						wx.hideLoading ();
						console.log(err)
						wx.showToast({
						  title: '请填写必填项',
						  icon: 'none',
						  duration: 2000
						})
					}else if(err.statusCode == 403){
						console.log(err)
						wx.hideLoading ();
						wx.showToast({
						  title: err.data.message,
						  icon: 'none',
						  duration: 2000
						})
					}else if(err.statusCode == 404){
						wx.showModal({
							title: '错误提示',
							content: '登录失效，重新上传',
							showCancel: false,
							success: function (res) {
								if(Auth.proxy.token.access_token){
									Auth.refresh(Auth.proxy.token.access_token);
									this.formSubmit();
								}
							}
						})
					}else if(err.statusCode == 500){
							wx.showModal({
								title: '错误提示',
								content: '系统错误',
								showCancel: false,

							})
						}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}else{
				wx.showToast({
				  title: '请先返回填写名片基本信息',
				  icon: 'none',
				  duration: 2000
				})
			}

		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
.billing-index{
	padding-top:10px;
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
