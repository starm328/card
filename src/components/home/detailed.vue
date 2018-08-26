<template>
	<div class="home-detailed-component">
		<form @submit="formSubmit">
			<dl class="dl-li">
				<dd>
					<p>电话</p>
					<input type="number" name="phone" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>邮箱</p>
					<input type="text" name="emil" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>地址</p>
					<input type="text" name="address" placeholder="请输入" placeholder-style="color:#888;">
				</dd>
			</dl>
			<p class="dl-tit">
				个性化展示
			</p>
			<dl class="dl-li">
				<dd>
					<input type="text" name="voice" :value="voicemp3" style="display:none;">
					<p @click="startRecordMp3" v-if="start" class="music-start">点击录制60秒语音介绍</p>
					<p @click="stopRecord" v-if="stop" class="music-start">结束</p>
					<p @click="playRecord" v-if="play" class="music-play"><i class="iconfont icon-xiaolaba"></i><span>播放</span></p>
					<p @click="deletebtn" v-if="play" class="music-delete"><i class="iconfont icon-zhongzhi"></i><span>重新录制</span></p>
				</dd>
			</dl>
			<dl class="dl-li">
				<dd class="btn" @click="addhonor">
					<p>所获荣誉</p>
					<i class="iconfont icon-tianjia right"></i>
				</dd>
				<div class="form" v-for="(item,i) in honor" :key="i">
					<i class="iconfont icon-guanbi" @click="delet(i)"></i>
					<input type="tel" name="title" placeholder="荣誉名称" :value="item.title" placeholder-style="color:#888;" v-model="item.title">
					<input type="tel" name="organization" placeholder="颁发单位名称(非必填)" :value="item.organization"  placeholder-style="color:#888;" v-model="item.organization">
				</div>
			</dl>
			<dl class="dl-li">
				<p class="dl-tit">
					个人介绍
				</p>
				<textarea placeholder="介绍语" name="desc"/>
			</dl>
			<div style="width:96%;margin:0 auto 10px auto">
				<button  type="primary" formType="submit" class="stm-main-button stm-m10-t">保存</button>
			</div>

		</form>
	</div>
</template>
<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
export default {
	name: 'detailed-index',
	data () {
		return {
			start:true,
			stop:false,
			play:false,
			honor:[],
			id:'',
			voicemp3:'',
			tempFilePath:''
		}
	},
	onLoad(option) {
		if(option.id){
			console.log(option.id)
			this.id = option.id
		}

	},
	methods: {
		delet(i) {
			this.honor.splice(i,1)
		},
		addhonor() {
			this.honor.splice(0,0,{title:'',organization:''})
		},
		/**
		 * 录制mp3音频
		*/
		 startRecordMp3 () {
			const options = {
				format: 'mp3',
				duration: 60000
			}
			recorderManager.start(options);
			recorderManager.onStart(() => {
			  console.log('recorder start')
			});
			//错误回调
			recorderManager.onError((res) => {
			  console.log(res);
			})
			this.stop = true
			this.start = false

		},

		/**
		 * 停止录音
		 */
		stopRecord(){
			var _this = this;
			recorderManager.stop();
			recorderManager.onStop((res) => {
				console.log(res)
				_this.tempFilePath = res.tempFilePath
				wx.uploadFile({
					url: `${configs.card.apiBaseUrl}api/user/upload`,
					filePath: res.tempFilePath,
					name: 'url',
					formData: {
						'voice': "voice"
					},
					header: {
						token: Auth.proxy.token.access_token,
						"Content-Type": "multipart/form-data"
					},
					success: function (res) {
						//服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
						if(res.statusCode == 404){
							wx.showModal({
								title: '错误提示',
								content: '登录失效，重新上传',
								showCancel: false,
								success: function (res) {
									Auth.refresh(Auth.proxy.token.access_token)
								}
							})
						}else if(res.statusCode == 200){
							console.log(_this.voicemp3 = JSON.parse(res.data).data)
						}
					},
					fail: function (res) {
						wx.hideToast();
						wx.showModal({
							title: '错误提示',
							content: '上传录音失败',
							showCancel: false,
							success: function (res) { }
						})
					}
				});
			})
			this.stop = false
			this.start = false
			this.play = true
		},

		/**
		 * 播放录音
		 */
		 playRecord(){
			innerAudioContext.autoplay = true
			innerAudioContext.src = this.tempFilePath

			innerAudioContext.onPlay(() => {
				console.log('开始播放')
			})
			innerAudioContext.onError((res) => {
				console.log(this.tempFilePath)
				console.log(res.errMsg)
				console.log(res.errCode)
			})

		},
		/**
		*刪除录音
		**/
		deletebtn() {
			this.tempFilePath = '',
			this.voicemp3 = '',
			this.stop = false
			this.start = true
			this.play = false
		},
		formSubmit(e) {
			console.log(this.honor)
			if(this.id){
				var _this = this;
				console.log(_this.voicemp3)
				wx.showLoading({
					title: '提交中',
				})
				wx.pro.request({
					url:  `${configs.card.apiBaseUrl}api/user/newcarddetail/`+_this.id,
					method: 'POST',
					header: {
						token:Auth.proxy.token.access_token
					},
					data:{
						address:e.mp.detail.value.address,
						desc:e.mp.detail.value.desc,
						emil:e.mp.detail.value.emil,
						phone:e.mp.detail.value.phone,
						voice:e.mp.detail.value.voice
					}

				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading ();
						wx.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 2000,
						})
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
					}else if(err.statusCode == 500){
						console.log(err)
						wx.hideLoading ();
						wx.showToast({
						  title: '系统错误',
						  icon: 'none',
						  duration: 2000
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
				if(_this.honor.length> 0){
					console.log(e)
					wx.pro.request({
						url:  `${configs.card.apiBaseUrl}api/user/newcardhonour/`+_this.id,
						method: 'POST',
						header: {
							token:Auth.proxy.token.access_token
						},
						data:{
							honour:_this.honor
						}

					})
					.then(d => {
						if(d.statusCode == 200){
							wx.hideLoading ();
							wx.showToast({
								title: '保存成功',
								icon: 'success',
								duration: 2000,
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
						}
						// 网络错误、或服务器返回 4XX、5XX
					})
				}
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
.home-detailed-component{
	.hr{
		width:95%;
		height:1px;
		background:#ddd;
		margin:15px auto;
	}
	.dl-tit{
		text-align:center;
		font-size:@fonttwo;
		color:@fontcolor;
		margin:15px 0;
	}
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
