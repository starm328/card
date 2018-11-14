
<template>
	<div class="information-chat" :style="'padding-top:'+navgationHeight+'px'">
		<scroll-view scroll-y="true" style="height: 100vh;" :scroll-into-view="scrollinto" enable-back-to-top>
			<dl v-if="chat.length> 0" v-for="(item,i) in chat"  :key="i" :class="[userid == item.from_user_id ? 'meshare' : '']">
				<dt><img :src="item.from_avatarUrl" mode="widthFix"></dt>
				<dd><p>{{item.content}}</p></dd>
			</dl>

			<dl v-if="sharecontent.length> 0" v-for="(item,i) in sharecontent " class="meshare" :key="i">
				<dt><open-data type="userAvatarUrl" ></open-data></dt>
				<dd><p>{{item}}</p></dd>
			</dl>

			<form @submit="gotoformid" :report-submit="true">
			<div class="bottom">
				<input type="text" name="" placeholder="请输入消息" v-model="content" confirm-type="send" @confirm="chats" >
				<button formType="submit" class="form_button"  style="color:#fff;"><p @click="chats">发送</p></button>
			</div>
			</form>
			<view style="height:120px;" id="bottoms" v-if="chat.length> 0"></view>
		</scroll-view>

	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {
	name: 'information-chat',
	data () {
		return {
			navgationHeight:'',
			id:'',
			chat:'',
			content:'',
			sharecontent:[],
			scrollinto:'',
			userid:wx.getStorageSync('token').user_id
		}
	},
	onUnload() {
		this.sharecontent = []
		this.chat= ''
		this.scrollinto=''
	},
	onLoad(option) {
		console.log(option)
			this.id  = option.id
			this.getdata()
			var startBarHeight = 20
			var navgationHeight = 44
			var _this = this;
			wx.getSystemInfo({
			  success: function (res) {
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				_this.navgationHeight= navgationHeight+startBarHeight
			  }
			})
	},
	methods: {
		gotoformid(e) {
			Auth.formid(e.target.formId)
		},
		getdata() {
			var _this = this;
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/chats/${_this.id}`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				},

			})
			.then(d => {
				if(d.statusCode == 200){
					_this.chat = d.data
					_this.scrollinto = 'bottoms'

				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					Auth.proxy.token = ''
					wx.removeStorageSync('token')
					// Auth.RefreshToken();
				}else if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		chats() {
				var _this = this;
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/wechats`,
					method: 'POST',
					header: {
						token:Auth.proxy.token.access_token
					},
					data: {
						user_id:_this.id,
						content:_this.content
					}

				})
				.then(d => {
					if(d.statusCode == 200){
						wx.showToast({
							title:"发送成功",
							icon: 'success',
							duration: 3000,
							mask:true,
						})
						_this.sharecontent.push(_this.content)
						setTimeout(()=>{
							_this.content = ''
						},500)

					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						Auth.proxy.token = ''
						wx.removeStorageSync('token')
						// Auth.RefreshToken();
					}else if(err.statusCode == 500){
						wx.showToast({
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
					}else if(err.statusCode == 422){
						wx.showToast({
							title: '请输入你要跟他说的话',
							icon: 'none',
							duration: 2000,
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

.information-chat{
	#demo2{background:red}
	dl{
		min-height:45px;
		&:nth-child(1){
			margin-top:20px;
		}
		&.meshare{
			dt{
				position:relative;
				float:right;
				margin-right:10px;
				width:40px;
				height:40px;
				display:inline-block;
				border-radius:50%;
				background: #fff;
				margin-bottom:20px;
				overflow:hidden;
			}
			dd{
				float:right;
				margin-right:10px;
				background:#b2e281;
				margin-top:4px;
				&:before{
					left:100%;
					border-top: 6px solid transparent;
					border-left: 8px solid #b2e281;
					border-right: 6px solid transparent;
					border-bottom: 6px solid transparent;
				}
			}
		}
		dt{
			position:relative;
			float:left;
			margin-left:10px;
			width:40px;
			height:40px;
			margin-right:10px;
			display:inline-block;
			border-radius:50%;
			background: #fff;
			margin-bottom:20px;
			overflow:hidden;
			img{
				width:100%;
			}
		}
		dd{
			position:relative;
			float:left;
			margin-left:10px;
			max-width:220px;
			display:inline-block;
			background: #fff;
			-moz-border-radius: 6px;
			-webkit-border-radius: 6px;
			border-radius: 6px;
			padding:10px;
			margin-top:4px;
			font-size:@fonttwo;
			margin-bottom:20px;
			&:before{
				position: absolute;
				content: "";
				width: 0;
				height: 0;
				right: 100%;
				top: 5px;
				border-top: 6px solid transparent;
				border-right: 8px solid #fff;
				border-bottom: 6px solid transparent;
			}
		}
		&:after{
			clear:both;
			display:block;
			content:''
		}

	}

	.bottom{
		width:100%;
		position:fixed;
		bottom:0;
		display:flex;
		border-top:1px solid #ccc;
		background:#eee;
		input{
			flex:1;
			border-radius:40px;
			background:#fff;
			margin:8px 10px 8px 10px;
			font-size:15px;
			text-indent:10px;
			height:35px;
		}
		p{
			width:60px;
			background:-webkit-linear-gradient(left,@maincolor, #d98a40);
			font-size:@fonttwo;
			height:35px;
			line-height:35px;
			border-radius:40px;
			color:#fff;
			margin:8px 8px 8px 0;
			text-align:center;
		}
	}
}
</style>
