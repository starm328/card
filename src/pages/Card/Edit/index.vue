<template>
	<div class="card-edit-index">
		<div class="card-edit-top">
			<div  class="chooseimg">
				<open-data type="userAvatarUrl" class="img" @click="chooseimg" v-if="!tempFilePaths"></open-data><img :src="tempFilePaths" class="img" @click="chooseimg" v-else>
				<i class="iconfont icon-xiangji" v-if="tempFilePaths == ''"></i>
			</div>
			<div class="img-input">
				<stm-input types="text" placeholder="真实名字">
				</stm-input>
				<stm-input types="number" placeholder="手机号" @code="code" @input="getinput">
					<div class="code">获取</div>
				</stm-input>
			</div>
		</div>
		<div class="card-edit-bottom">
			<stm-input types="number" placeholder="验证码" title="验证码" required >
			</stm-input>
			<stm-input types="password" placeholder="密码" title="密码" required >
			</stm-input>

		</div>
		<button type="primary"  bindtap="primary" class="stm-main-button stm-m20-rl stm-m10-t" @click="personal">登录</button>
		<div class="login" @click="login">
			已有<span >我的全能名片账户</span>,直接登录
		</div>
	</div>
</template>

<script>
import Input from '@/components/input/index';
export default {
	name: 'card-edit',
	components:{
		'stm-input': Input
	},
	data () {
		return {
			value:'',
			tempFilePaths:''
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title:'创建名片'
		})

	},
	created () {


	},
	methods: {
		login() {
			wx.navigateTo({
			  url: '/pages/Login/Code/main'
			})
		},
		getinput(e){
			this.value = e.mp.detail.value;
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
		personal() {
			wx.redirectTo({
			  url: '/pages/Card/Edit/Personal/main'
			})
		},
		chooseimg() {
			var _this =this
			wx.chooseImage({
			  count: 1, // 默认9
			  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			  success: function (res) {
			    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
			    _this.tempFilePaths = res.tempFilePaths[0]
			    console.log(res.tempFilePaths)
			  }
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
@import '../../../configs/main.less';
	.card-edit-index{
		.card-edit-top{
			display:flex;
			padding:10px 10px 0 10px;
			background:#fff;
			.chooseimg{
				width:70px;
				height:70px;
				border-radius:10px;
				overflow:hidden;
				margin-top:17px;
				position:relative;
				i{
					position:absolute;
					bottom:5px;
					left:50%;
					margin-left:-10px;
					color:#fff;
					font-size:@fontthree;

				}
				.img{
					width:70px;
					height:70px;
				}
			}
			.img-input{
				flex:1;
				margin-left:20px;
				.code{
					font-size:@fonttwo;
					border-radius:5px;
					border:1px solid @auxiliary;padding:5px 10px;
				}
			}
		}
		.card-edit-bottom{
			background:#fff;
			margin-top:10px;
			padding:0 10px;
		}
		.login{
			text-align:center;
			font-size:@fonttwo;
			line-height:35px;
			color:@fontcolor;
			span{
				color:@maincolor;
				padding:0 10px;
			}
		}
	}
</style>
