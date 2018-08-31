<template>
	<div class="home-seniro-component stm-warp">
		<dl class="dl-li">
			<dd class="btn" @click="detailed">
				<i class="iconfont icon-jibenziliao one"></i>
				<p>详细资料</p>
				<i class="iconfont icon-arrow-right-copy-copy-copy right"></i>
			</dd>
		</dl>
		<dl class="dl-li">
			<dd class="btn" @click="jurisdiction">
				<i class="iconfont icon-icon_set_up two"></i>
				<p>权限设置</p>
				<i class="iconfont icon-arrow-right-copy-copy-copy right"></i>
			</dd>
		</dl>
		<dl class="dl-li">
			<dd class="btn" @click="billing">
				<i class="iconfont icon-renzhengyonghu three"></i>
				<p>开票信息</p>
				<i class="iconfont icon-arrow-right-copy-copy-copy right"></i>
			</dd>
		</dl>
		<div class="fle-btn">
			<button type="primary" formType="submit" class="stm-main-button stm-m10-t" @click="look">跳过</button>
			<button type="primary"  bindtap="primary" class="stm-main-button stm-m10-t" @click="delcard">删除此名片</button>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'home-seniro-component',
	data () {
		return {
			pageid:''
		}
	},
	onLoad(option) {
		if(option){
			this.pageid = option.id
		}
	},
	methods: {
		jurisdiction() {
			wx.navigateTo({
				url:'/pages/Home/jurisdiction/main?id='+this.pageid,
			})
		},
		billing() {
			wx.navigateTo({
				url: '/pages/Home/billing/main?id='+this.pageid ,
			})
		},

		detailed(){
			wx.navigateTo({
				url:'/pages/Home/detailed/main?id='+this.pageid ,
			})
		},
		look() {
			wx.redirectTo({
				url: '/pages/Home/show/main?id='+this.pageid,
			})

		},
		delcard() {
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/delcard/`+this.pageid,
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
							wx.redirectTo({
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
.home-seniro-component{
	padding-top:10px;
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
			p{
				font-size:@fontthree;
			}
			input{
				flex:1;
				font-size:@fonttwo;
				margin-left:20px;
				color:@maincolor;
				line-height:30px;
				height:30px;
			}
			&.after{
				border-bottom:1px solid #eee;
			}
			&.btn{
				.one{
					color:@maincolor;
				}
				.two{
					color:#00ccff;
				}
				.three{
					color:#3c9;
				}
				i{
					line-height:20px;
					-webkit-box-align:center;
					display:-webkit-box;
					margin-right:10px;

					&.right{
						color:@fontcolor
					}
				}
				p{
					flex:1;
				}
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
