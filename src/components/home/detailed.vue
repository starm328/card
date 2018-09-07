<template>
	<div class="home-detailed-component" >
		<form @submit="formSubmit">
			<dl class="dl-li">
				<dd>
					<p>电话</p>
					<input type="number" name="phone" placeholder="请输入" placeholder-style="color:#888;" v-model="carddetailed.phone">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>邮箱</p>
					<input type="text" name="email" placeholder="请输入" placeholder-style="color:#888;" v-model="carddetailed.email">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>地址</p>
					<input type="text" name="address" placeholder="请输入" placeholder-style="color:#888;" v-model="carddetailed.address">
				</dd>
			</dl>
			<p class="dl-tit">
				个性化展示
			</p>
			<dl class="dl-li">
				<dd>
					<input type="text" name="voice" v-model="voicemp3" style="display:none;">
					<p v-if="voicemp3" @click="playaudio" class="play">播放</p>
					<audio :src="voicemp3" id="myAudio"></audio>
					<div class="weui-grid__label"  @longpress="handleRecordStart" @touchmove="handleTouchMove" @touchend="handleRecordStop">{{record.text}}</div>
				</dd>
			</dl>
			<dl class="dl-li">
				<dd class="btn"  @click="groupingShow = true" >
					<p>所获荣誉</p>
					<i class="iconfont icon-arrow-right-copy-copy-copy right"></i>
				</dd>
				<div class="form" v-for="(item,i) in honor" :key="i">
					<i class="iconfont icon-guanbi" @click="delet(i,item)"></i>
					<input type="text" name="title" placeholder="荣誉名称" :value="item.title" placeholder-style="color:#888;" v-model="item.title" disabled="">
					<input type="text" name="organization" placeholder="颁发单位名称(非必填)" :value="item.organization"  placeholder-style="color:#888;" v-model="item.organization" disabled="">
				</div>

			</dl>
			<dl class="dl-li">
				<p class="dl-tit">
					个性签名
				</p>
				<textarea placeholder="签名" name="desc" v-model="carddetailed.desc" v-if="!groupingShow"/>
			</dl>
			<div style="width:96%;margin:0 auto 10px auto">
				<button  type="primary" formType="submit" class="stm-main-button stm-m10-t">保存</button>
			</div>
			<div class="grouping"  v-if="groupingShow">
				<div class="bg" @click="groupingShow = false"></div>
				<div class="main">
					<div class="title">添加荣誉</div>
					<scroll-view scroll-y style="height: 200px;">
						<div class="form">
							<input type="text" name="title" placeholder="荣誉名称" placeholder-style="color:#888;" v-model="honourtitle">
							<input type="text" name="organization" placeholder="颁发单位名称(非必填)"  placeholder-style="color:#888;" v-model="honourorganization">
						</div>
						<button  class="stm-main-button stm-m10-t" @click="honorBTn" style="color:#fff;">保存</button>
					</scroll-view>
				</div>
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
			honourtitle:'',
			honourorganization:'',
			id:'',
			voicemp3:'',
			tempFilePath:'',
			carddetailed:'',
			stopp:true,
			groupingShow:false,


			record: {
				text: "长按录音",
				type: "record",
				handler: this.handleRecordStart
			}, //与录音相关的数据结构
			recorderManager: wx.getRecorderManager(), //录音管理上下文
			startPoint: {}, //记录长按录音开始点信息,用于后面计算滑动距离。
			sendLock: true, //发送锁，当为true时上锁，false时解锁发送
			catchtouchmove:false

		}
	},
	onReady: function (e) {
		// 使用 wx.createAudioContext 获取 audio 上下文 context
		this.audioCtx = wx.createAudioContext('myAudio')
	  },
	onLoad(option) {

		if(option.id){
			console.log(option.id)
			this.id = option.id
		}
		if(option.id){
			var _this = this;
			console.log('1')
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showcard/`+option.id,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					_this.carddetailed = d.data.detail
					if(d.data.detail.voice){
						_this.tempFilePath = d.data.detail.voice
						_this.voicemp3 = d.data.detail.voice
						_this.honor = d.data.honour
					}
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					wx.hideLoading ();
					wx.removeStorageSync('token')
					// if(Auth.proxy.token.access_token){
					// 	Auth.refresh(Auth.proxy.token.access_token);
					// 	this.getdata();
					// }
				}else if(err.statusCode == 500){
					wx.hideLoading ();
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
	methods: {
		playaudio(){
			var _this = this;
			_this.audioCtx.play()

		},
		handleRecordStart(e) {

			//longpress时触发
			 this.startPoint = e.touches[0];//记录长按时开始点信息，后面用于计算上划取消时手指滑动的距离。
			 this.record = {//修改录音数据结构，此时录音按钮样式会发生变化。
				  text: "松开发送",
				 type: "recording",
					 handler: this.handleRecordStart
				};
				const options = {
					format: 'mp3',
					duration: 60000
				}
				this.recorderManager.start(options);
				wx.showToast({
				  title: "正在录音，上划取消发送",
				  icon: "none",
				  duration: 60000//先定义个60秒，后面可以手动调用wx.hideToast()隐藏
				});
				this.sendLock = false;//长按时是不上锁的。
				this.catchtouchmove = true
		},
		handleRecordStop() {
			// touchend(手指松开)时触发
			this.record = {//复原在start方法中修改的录音的数据结构
			  text: "长按录音",
			  type: "record",
			  handler: this.handleRecordStart
			};
			wx.hideToast();//结束录音、隐藏Toast提示框
			this.recorderManager.stop();//结束录音
			var _this = this;
			this.recorderManager.onStop(res => {
			  if (this.sendLock) {
				//上锁不发送
			  } else {//解锁发送，发送网络请求
				if (res.duration < 1000){
					wx.showToast({
						title: "录音时间太短",
						icon: "none",
						duration: 1000
					});
				}else{
					console.log(res)
					wx.uploadFile({
						url: `${configs.card.apiBaseUrl}api/user/upload`,
						filePath: res.tempFilePath,
						name: 'url',
						header: {
							token: Auth.proxy.token.access_token,
							"Content-Type": "multipart/form-data"
						},
						success: function (res) {
							console.log(res)
							//服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
							if(res.statusCode == 404){
								wx.showToast({
									title: '登录失效，重新上传',
									icon: 'none',
									success: function (res) {
										Auth.refresh(Auth.proxy.token.access_token)
									}
								})
							}else if(res.statusCode == 200){
								console.log(JSON.parse(res.data).data)
								_this.voicemp3 = JSON.parse(res.data).data
							}
						},
						fail: function (res) {
							wx.showToast({
								title: '录音失败，重新录音',
								icon: 'none',
							})
						}
					});
				}

			  }
			});
		},
		handleTouchMove(e) {
			  //touchmove时触发
			  var moveLenght = e.touches[e.touches.length - 1].clientY - this.startPoint.clientY; //移动距离
			  if (Math.abs(moveLenght) > 50) {
				wx.showToast({
					  title: "松开手指,取消发送",
					  icon: "none",
					  duration: 60000
				});
				this.sendLock = true;//触发了上滑取消发送，上锁
				this.catchtouchmove = false
			  } else {
				wx.showToast({
					  title: "正在录音，上划取消发送",
					  icon: "none",
					  duration: 60000
				});
				this.sendLock = false;//上划距离不足，依然可以发送，不上锁
				this.catchtouchmove = true
			  }
		},
		delet(i,item) {
			this.honor.splice(i,1)
			if(item.id){
				wx.pro.request({
					url:`${configs.card.apiBaseUrl}api/user/delcardhonour/`+item.id,
					method: 'GET',
					header: {
						token:Auth.proxy.token.access_token
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.showToast({
							title: '删除成功',
							mask:true,
							icon: 'success',
							duration: 2000,
						})
					}
					// 2XX, 3XX
				})
				.catch(err => {
					if(err.statusCode == 404){
						wx.hideLoading ();
						wx.removeStorageSync('token')
						// if(Auth.proxy.token.access_token){
						// 	Auth.refresh(Auth.proxy.token.access_token);
						// 	this.getdata();
						// }
					}else if(err.statusCode == 500){
						wx.hideLoading ();
						wx.showToast({
							title: '系统错误',
							mask:true,
							icon: 'none',
							duration: 2000,
						})
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
			}
		},
		addhonor() {
			this.honor.splice(0,0,{title:'',organization:''})
		},


		honorBTn() {
			var _this = this;
			var honors = new Array();
			for(var i = 0; i< _this.honor.length; i++){
				var hons = {title:_this.honor[i].title,organization:_this.honor[i].organization}
				honors.push(hons)
			}
			wx.pro.request({
				url:  `${configs.card.apiBaseUrl}api/user/newcardhonour/`+_this.id,
				method: 'POST',
				header: {
					token:Auth.proxy.token.access_token
				},
				data:{
					honour:[{title:_this.honourtitle,organization:_this.honourorganization}]
				}

			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					wx.showToast({
						title: '保存成功',
						icon: 'success',
						duration: 2000,
						success:()=>{
							_this.honor.push({title:_this.honourtitle,organization:_this.honourorganization})
							_this.honourtitle = ''
							_this.honourorganization=''
							_this.groupingShow = false
						}
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
						email:e.mp.detail.value.email,
						phone:e.mp.detail.value.phone,
						voice:_this.voicemp3
					}

				})
				.then(d => {
					if(d.statusCode == 200){
						console.log(e)
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
	padding-top:10px;
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
			.play{
				flex:1;
				text-align:center;
			}
			.weui-grid__label{
				flex:1;
				text-align:center;
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
			border-radius:5px;
			border:1px solid #ccc;
			padding:5px;
			position:relative;
			margin:20px 0;
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
	.grouping{
		.bg{
			position:fixed;
			bottom:0;
			width:100%;
			height:100%;
			z-index:99;
			background:rgba(000,000,000,0.5)
		}
		.main{
			position:fixed;
			bottom:0;
			background:#fff;
			border-top-left-radius:10px;
			border-top-right-radius:10px;
			overflow:hidden;
			width:100%;
			z-index:100;
			.title{
				width:100%;
				height:40px;
				line-height:40px;
				text-indent:10px;
				color:#000;
				background:#f1f1f1;
				display:flex;
				i{
					flex:1;
					text-align:right;
				}
			}
			scroll-view{
				width:calc(100% - 20px);
				margin:10px;
			}
			.form{
				border-radius:5px;
				border:1px solid #ccc;
				padding:5px;
				position:relative;
				margin:20px 0;
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
}

</style>
