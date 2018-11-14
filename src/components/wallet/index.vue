<template>
	<div class="wallet-index" :style="'padding-top:'+navgationHeight+'px;'">
		<div class="detial" v-if="account && account.available">
			<h4>{{account.available.showing}}<p>可提现金额</p></h4>
			<ul>
				<li><span>{{account.having.showing}}</span><p>现有</p></li>
				<li><span>{{account.accumu.showing}}</span><p>总收入</p></li>
			</ul>
		</div>
		<!-- <div class="withdrawable" v-for="item in withdrawable" :key="item.id">
			<h6 v-if="item.channel !==null || item.fee !== null">提现规则</h6>
			<h6 v-else>无提现规则</h6>
			<p v-if="item.fee !==null">
				{{item.fee.title}}：<span class="fg-gray">{{item.fee.rate}}:{{item.fee.denominator}}</span>
			</p>
			<st-withdrawablelimits :id="item.id"></st-withdrawablelimits>
			<div style="width:96%;margin:0 auto">
				<form @submit="gotoformid" :report-submit="true">
					<button formType="submit" @click="withdrawals(item.id)" class="stm-main-button stm-m10-t" style="color:#fff;">
							提现
					</button>
				</form>
			</div>
		</div>
		<p style="text-align:center;font-size:15px;line-height:45px;">提现记录</p> -->
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
import Withdrawablelimits from '@/components/wallet/limits';
export default {
	name: 'wallet-index',
	components: {
		'st-withdrawablelimits':Withdrawablelimits
	},
	data () {
		return {
			navgationHeight:'',
			account:'',
			withdrawable:[],
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
				_this.wallet(wx.getStorageSync('Authtoken'))
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
						_this.wallet(d.data.token)
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
		wallet(user) {
			var _this = this;
				wx.pro.request({
					url:`${configs.shop.apiBaseUrl}accounts`,
					method: 'GET',
					header: {
						token:user
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.pro.request({
							url:`${configs.shop.apiBaseUrl}withdrawable/1/withdrawRules`,
							method: 'GET',
							header: {
								token:user,

							}
						})
						.then(d => {
							if(d.statusCode == 200){
								_this.withdrawable = d.data
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

						wx.pro.request({
							url:`${configs.shop.apiBaseUrl}accounts/${d.data[0].id}/count/accumu-available-having`,
							method: 'GET',
							header: {
								token:user,

							}
						})
						.then(d => {
							if(d.statusCode == 200){
								_this.account = d.data
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
					}
					// 2XX, 3XX
				})
				.catch(err => {
					console.log(err)
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
		gotoformid(e) {
			Auth.formid(e.target.formId)
		},
		withdrawals(id){
			wx.navigateTo({
				url: '/pages/wallet/form/main?id='+ id,
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
.wallet-index{
	.withdrawable{
		background:#fff;
		font-size:@fonttwo;
		width:calc(100% - 20px);
		padding:10px;
		margin:0 auto;
		p{
			color:@fontcolor;
		}
	}
	.detial{
		padding-bottom:20px;
		background:#fa6b5b;
		h4{
			text-align:center;
			color:#fff;
			font-size:25px;

		}
		p{
			font-size:@fonttwo
		}
		ul{
			margin-top:20px;
			display:flex;
			color:#fff;
			li{
				flex:1;
				text-align:center;
				position:relative;
				&:nth-child(1):after{
					display:block;
					content:'';
					width:1px;
					height:20px;
					background:#fff;
					position:absolute;
					right:0;
					top:10px;
				}
			}
		}
	}
}
</style>
