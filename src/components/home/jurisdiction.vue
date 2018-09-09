<template>
	<div class="jurisdiction-index">
		<form @submit="formSubmit">
			<dl class="dl-li">
				<p class="dl-tit">
					信息谁可以看
				</p>
				<div class="hr"></div>
				<div class="radio">
					<radio-group class="group" @change="radio">
						<label>
							<radio color='#d95940'  value="1"></radio>
							隐私保护，仅相互交换了名片的用户可见。
						</label>
						<label>
							<radio color='#d95940' checked value="2"></radio>
							完全公开，手机号码对所有人可见。
						</label>
						<label>
							<radio color='#d95940' value="3"></radio>
							完全秘密，仅自己可见。
						</label>
					</radio-group>
					<input type="number" name="conceal" :value="conceal" style="display:none;">

				</div>
			</dl>
			<dl class="dl-li">
				<p class="dl-tit">
					微信分享
				</p>
				<textarea placeholder="问候语" name="wxshare"/>
					<input type="number" name="shareconceal" :value="shareconceal" style="display:none;">

			</dl>
			<dl class="dl-li">
				<label>
					<dd>
						<p>是否可转发</p>
						<switch color="#fa6b5b" @change="switCH"/>
					</dd>
				</label>
			</dl>
			<div class="fle-btn">
				<button type="primary" formType="submit" class="stm-main-button stm-m10-t">保存</button>
				<button type="primary"  bindtap="primary" class="stm-main-button stm-m10-t" @click="delcard">删除此名片</button>
			</div>
		</form>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {

	name: 'jurisdiction-index',
	onLoad(option) {
		if(option.id){
			console.log(option.id)
			this.id = option.id
		}

	},
	data () {
		return {
			id:'',
			conceal:2,
			shareconceal:1
		}
	},
	methods: {
		radio(e) {
			this.conceal = e.mp.detail.value
		},
		switCH(e) {
			console.log(e.mp.detail.value)
			if( e.mp.detail.value){
				this.shareconceal = 2
			}else{
				this.shareconceal = 1

			}
		},
		formSubmit(e) {
			console.log(e)
			if(this.id){
				var _this = this;
				wx.pro.request({
					url:  `${configs.card.apiBaseUrl}api/user/newcardauth/`+_this.id,
					method: 'POST',
					header: {
						token:Auth.proxy.token.access_token
					},
					data:e.mp.detail.value,

				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading ();
						wx.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 2000,
							success:()=>{
								wx.navigateBack({
									delta: 1
								})
							}
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

		},
		delcard() {
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/delcard/`+this.id,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					wx.showToast({
						title: '已删除',
						icon: 'none',
						duration: 2000,
						success:() => {
							wx.navigateTo({
							  url: '/pages/Home/index/main'
							})
						}
					})
				}else{
					wx.showToast({
						title: '删除失败',
						icon: 'none',
						duration: 2000,
					})
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					wx.hideLoading ();
					if(Auth.proxy.token.access_token){
						Auth.refresh(Auth.proxy.token.access_token);
						this.cardrequest();
					}
				}else if(err.statusCode == 500){
					wx.showModal({
						title: '错误提示',
						content: '系统错误',
						showCancel: false,

					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
.jurisdiction-index{
	padding-top:10px;
	.hr{
		height:1px;
		background:#ddd;
	}
	.dl-tit{
		text-align:left;
		font-size:@fontthree;
		color:@fontcolor;
		line-height:60px;
		margin:0 auto;
	}
	.dl-li{
			width:calc(100% - 45px);
			padding:0 15px;
			margin:10px auto;
			background:#fff;
			border-radius:5px;
			box-shadow: 0px 3px 12px 0px rgba(206, 206, 206, 0.5);
			dd{
				padding:15px 0;
				display:flex;
				height:30px;
				line-height:30px;
				switch{
					flex:1;
					text-align:right;
					transform:scale(0.9);
				}
			}
			textarea{
				color:@maincolor;
				font-size:@fontt16;
			}
	}
	.radio{
		padding:20px 0;
		font-size:@font12;
		color:@fontcolor;
		radio-group {
			radio {
				transform:scale(0.7);
			}
		}
		label{
			width:100%;
			display:block;

		}

	}
	.fle-btn{
		display:flex;
		width:96%;
		margin:0 auto;
		button{
			&:nth-child(1){
				flex:0 60%;
			}
			&:nth-child(2){
				flex:0 30%;
				background:#999;
			}
		}
	}
}

</style>
