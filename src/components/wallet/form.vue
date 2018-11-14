<template>
	<div class="wallet-form" :style="'padding-top:'+navgationHeight+'px;'">
		<div class="detial">
			<div class="title">
				<p>可提现</p>
				<span>846.78</span>
			</div>
		</div>
		<div class="account">
			选择提现账户
		</div>
		<div class="hasaccount">
			<p>账户：starm</p>
			<dl>
				<dd>账户：ab@c.com</dd>
				<dd>姓名：测试账户</dd>
			</dl>
		</div>
		<div class="stm-cell wallet-form-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left" style="font-size:30px;color:#555">￥</div>
				<div class="cell-main">
					<input type="number" name=""style="padding-left:10px;height:50px;font-size:30px;color:#555" placeholder="提现金额" placeholder-style="font-size:15px;">

				</div>
			</div>
		</div>
		<div class="stm-cell wallet-form-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-main">
					<input type="hidden" name="desc" style="width:0;min-height:0;height:0;" v-model="desc">
					<textarea placeholder="输入提现备注" name="desc"  v-model="desc" maxlength="-1"  @input="bindWordLimit"></textarea>
					<text style="color:#999;width:100%;font-size:13px;text-align:right">{{currentNoteLen|0}}个字</text>

				</div>
			</div>
		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button  type="primary" formType="submit"  class="stm-main-button stm-m20-rl" > 确认提现 </button>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'wallet-form',
	data () {
		return {
			navgationHeight:'',
			desc:'',
			noteMaxLen: 50, //备注最少字数
			currentNoteLen:0
		}
	},
	onLoad() {
			this.getdata()
			let startBarHeight = 20
			let navgationHeight = 44
			let that = this
			wx.getSystemInfo({
			  success: function (res) {
				console.log(res.model)
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				console.log('o')
				that.navgationHeight= navgationHeight+startBarHeight
			  }
			})

	},
	methods: {
		getdata() {
			var _this = this
			if(wx.getStorageSync('Authtoken')){
				_this.choice(wx.getStorageSync('Authtoken'))
			}else {
				// 获取商城token
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/token`,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.setStorageSync('Authtoken',d.data.token)
						_this.choice(d.data.token)
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}
		},
		choice(token) {
			wx.pro.request({
				url:`${configs.shop.apiBaseUrl}external-accounts`,
				method: 'GET',
				header: {
					token:token,

				}
			})
			.then(d => {
				if(d.statusCode == 200){
					console.log(d)
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}else if(err.statusCode == 401){
					wx.removeStorageSync('Authtoken')
					_this.getdata()
				}
				// 网络错误、或服务器返回 4XX、5XX
			})

		},
		bindWordLimit: function(e){
			console.log(e)
			var value = e.target.value, len = parseInt(value.length);
			this.currentNoteLen = len


		},
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/cell.less';
@import '../../configs/style.less';
@import '../../configs/main.less';
.wallet-form{
	.account{
		padding:10px;
		background:rgb(232, 82, 65);
		text-align:center;
		color:#fff;
		font-size:@fonttwo;
	}
	.hasaccount{
		padding:10px;
		background:#fff;
		text-align:center;
		color:@fontcolor;
		font-size:@fonttwo;
		p{
			text-align:left;
		}
		dl{
			display:flex;
			dd{
				flex:1;
				text-align:left;
			}
		}
	}
	.detial{
		padding-bottom:20px;
		background:#fa6b5b;
		.title{
			text-align:center;
			color:#fff;
			p{
				color:rgba(255,255,255,0.5);
				font-size:@fonttwo;
			}
			span{
				font-size:30px;
			}
		}
	}
	.wallet-form-list{
		background:#fff;
		padding: 10px 20px;
		font-size:@fonttwo;
		textarea{
			width:100%;
			max-height:100px;
		}
	}
}

</style>
