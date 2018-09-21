<template>
	<div v-if="!Auth.loaded">
		<div class="loding"><span>加载中</span></div>
	</div>
	<div v-else-if="Auth.logined">
			<slot></slot>
	</div>
	<div v-else-if="!Auth.token" class="login">

					<div class="swiper-content">
							<div class="imgno">
								<open-data type="userAvatarUrl" class="img"></open-data>
							</div>
							<button type="default" class="stm-mt10" open-type="getUserInfo" @getuserinfo="onGotUserInfo">授权登录</button>
					</div>


	</div>
	<div  v-else-if="Auth.token && !Auth.token.is_new" class="login">

					<div class="swiper-content">
							<div class="imgno">
								<open-data type="userAvatarUrl" class="img"></open-data>
							</div>
							<button type="default" class="stm-mt10" @click="gosign">注册</button>
					</div>

		<stm-phone v-if="sign" @log="oversign"></stm-phone>
	</div>


</template>

<script>
import Auth from '@/utils/Auth';
import Phone from '@/components/phone/phone';

export default {
	name: 'cart-loged',
	data () {
		return {
			Auth: Auth.proxy,
			sign:false
		}
	},
	components:{
		'stm-phone':Phone,

	},
	props:{
	},
	methods:{
		onGotUserInfo(e) {
			if(e.target.errMsg == 'getUserInfo:ok'){
				Auth.login(e.target)
				wx.setStorageSync('WxUser',e.target.userInfo.nickName)
			}else {

			}
		},
		gosign() {
			this.sign = true;
		},
		oversign(){
			this.sign = false;
			Auth.refresh(this.auth.proxy.token.access_token)
		},

	}
}
</script>

<style lang="less" scoped>
@import '../configs/style.less';
.loding{
	position:fixed;
	width:100%;
	height:100%;
	text-align:center;
	span{
		display:block;
		width:90px;
		height:90px;
		border-radius:10px;
		background:rgba(000,000,000,0.5);
		color:#fff;
		text-align:center;
		margin:0 auto;
		line-height:90px;
		font-size:13px;
		margin-top:50%;

	}
}
.login{
	position:relative;
	padding-top:30px;
	swiper{
		height:80vh;
	}
	.swiper-content{
		background:#fff;
		width:100%;
		margin:0 auto;
		height:80vh;
		border-radius:10px;
		transform:scale(0.8);
		transition: transform 0.5s;
		text-align:center;
		overflow:hidden;
		button{
			width:auto;
			display:inline-block;
			margin:0 auto;
			border:0;
			background:none;
			font-size:@fontthree;
			color:@maincolor;
			&:after{
				border:1px solid @maincolor;
			}
		}
		.imgno{
				padding:10%;
			img{
				width:100%;
				display:block;
				margin:0 auto;
			}
		}
	}

}

</style>
