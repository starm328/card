<template>
	<div class="enterprise-template-product-warp stm-warp">
		<form @submit="formSubmit">
			<!-- <div class="stm-cell  enterprise-template-product-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-template-product-tit">产品归属：</div>
					<input type="hidden" name="type" style="height:0;width:0;min-height:0;" :value="multiArray[0][multiIndex[0]] + multiArray[1][multiIndex[1]]">
					<picker  mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						 <view class="picker">
							{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
						  </view>
					</picker>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div> -->

			<div class="stm-cell  enterprise-template-product-list stm-m10-t">
				<div class="cell-warp">
					<div class="cell-left enterprise-template-product-tit">产品名称：</div>
					<div class="cell-main enterprise-template-product-main">
						<input type="text" name="name" placeholder="请输入产品名称" >
					</div>
				</div>
			</div>
			<div class="stm-cell  enterprise-template-product-list stm-m10-t">
				<div class="cell-warp">
					<div class="cell-left enterprise-template-product-tit">产品介绍：</div>
					<div class="cell-main enterprise-template-product-main">
						<input type="hidden" name="" style="width:0;min-height:0;height:0;">
						<textarea placeholder="请输入你的介绍1000字内" name="desc" maxlength="-1" v-if="!cropper"></textarea>
					</div>
				</div>
			</div>
			<div class="stm-cell  enterprise-template-product-list stm-m10-t">
				<div class="cell-warp">
					<div class="cell-left enterprise-template-product-tit">产品图片：</div>
					<div class="cell-main enterprise-template-product-main">
						<img :src="item" class="tempFilePaths" v-for="(item,index) in img_url" :key="index" @click="editchoosebanner(index)" style="float:left" >
						<p class="opimg" @click="choosebanner" v-if="img_url.length <5 ">添加海报图片</p>
					</div>
				</div>
				<div class="remind">(最多5张)图片尺寸：高600X480</div>
			</div>
			<div class="stm-cell  enterprise-template-product-list stm-m10-t">
				<div class="cell-warp">
					<div class="cell-left enterprise-template-product-tit">产品视频：</div>
					<div class="cell-main enterprise-template-product-main">
						<input type="hidden" name="video" :value="video" style="width:0;min-height:0;height:0;">
						<p class="opimg" @click="chooseVideo"  >添加视频</p>

					</div>
				</div>
				<video :src="video" controls v-if="video !== ''" ></video>
				<div class="remind">视频不能超过一分钟</div>
			</div>

			<div style="height:70px"></div>
			<div class="footer-nav">
				<button  type="primary" formType="submit"  class="stm-main-button stm-m20-rl" > 完成 </button>
			</div>
		</form>
		<div class="mpvue-cropper" v-if="cropper">
		  <mpvue-cropper
			ref="cropper"
			:option="cropperOpt"
			@ready="cropperReady"
			@beforeDraw="cropperBeforeDraw"
			@beforeImageLoad="cropperBeforeImageLoad"
			@beforeLoad="cropperLoad"
			></mpvue-cropper>
			<div class="cropper-buttons">
				<div
					class="upload"
					@tap="uploadTap">
					选择图片
				</div>
				<div
					class="getCropperImage"
					@tap="getCropperImage">
					上传图片
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
import MpvueCropper from 'mpvue-cropper'
let wecropper

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
export default {

	name: 'enterprise-template-product-warp',
	components:{
		'mpvue-cropper': MpvueCropper
	},
	data () {
		return {
			multiIndex: [0, 0],
			multiArray: [['IT', '医疗'], [ '前端开发', '后端开发', 'IOS开发', '安卓开发']],
			MultiArray: [],
			img_url:[],
			banner:[],
			video:'',
			id:'',
			cropperOpt: {
				id: 'cropper',
				width,
				height,
				scale: 2.5,
				zoom: 8,
				cut: {
					x: (width - 300) / 2,
					y: (height - 300) / 2,
					width: 300,
					height: 300
				}
			},
			cropper:false

		}
	},
	onLoad(option) {
		if(option.id){
			console.log(option.id)
			this.id = option.id
		}
		wx.setNavigationBarTitle({
		  title: '产品编辑'
		})
	},
	onUnload() {
		this.img_url = [],
		this.banner = [],
		this.video = '',
		this.cropper = false
	},
	methods:{
		formSubmit(e) {
				var _this = this;
				wx.showLoading({
					title: '提交中',
				})
				wx.pro.request({
					url:  `${configs.card.apiBaseUrl}api/user/createproduct/`+_this.id,
					method: 'POST',
					header: {
						token:Auth.proxy.token.access_token
					},
					data:{
						name:e.mp.detail.value.name,
						desc:e.mp.detail.value.desc,
						img:_this.img_url,
						video: _this.video,
						type:'归属'
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

		},
		cropperReady (...args) {
		  console.log('cropper ready!')
		},
		cropperBeforeImageLoad (...args) {
		  console.log('before image load')
		},
		cropperLoad (...args) {
		  console.log('image loaded')
		},
		cropperBeforeDraw (...args) {
		  // Todo: 绘制水印等等
		},
		uploadTap () {
			this.cropper = true
		  wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: (res) => {
				const src = res.tempFilePaths[0]
				//  获取裁剪图片资源后，给data添加src属性及其值
				// console.log(res)
				this.$refs.cropper.pushOrigin(src)
			}
		  })
		},

		getCropperImage () {
			var _this = this;
			wx.showToast({
				title: '正在上传...',
				icon: 'loading',
				mask: true,
				duration: 10000
			})
		   _this.$refs.cropper.getCropperImage()
			.then((src) => {
				wx.uploadFile({
					url: `${configs.card.apiBaseUrl}api/user/upload`,
					filePath: src,
					name: 'url',
					formData: {
						'imgIndex': 'src'
					},
					header: {
						token: Auth.proxy.token.access_token,
						"Content-Type": "multipart/form-data"
					},
					success: function (res) {
						//服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
						if(res.statusCode == 404){
							wx.hideToast();
							wx.showModal({
								title: '错误提示',
								content: '登录失效，重新上传',
								showCancel: false,
								success: function (res) {
									if(Auth.proxy.token.access_token){
										Auth.refresh(Auth.proxy.token.access_token);
									}
								}
							})

						}else if(res.statusCode == 200){
							wx.hideToast();
							_this.img_url.push(JSON.parse(res.data).data)
							_this.cropper = false
						}else if(res.statusCode == 500){
							wx.hideToast();
							wx.showModal({
								title: '错误提示',
								content: '系统错误',
								showCancel: false,

							})
						}
					},
					fail: function (res) {
						console.log(res)
						wx.hideToast();
						wx.showModal({
						  title: '错误提示',
						  content: '上传图片失败',
						  showCancel: false,
						  success: function (res) { }
						})
					}
				});
			})
			.catch(e => {
			  console.error('获取图片失败')
			})
		},
		choosebanner() {
			var _this =this
			_this.uploadTap()
		},
		editchoosebanner(e) {
			var _this = this
			wx.showModal({
				title: '提示',
				content: '删除这个图片',
				success: function(res) {
					if (res.confirm) {
						_this.banner.splice(e,1);
						_this.img_url.splice(e,1);
					} else if (res.cancel) {

					}
				}
			})


		},


		chooseVideo() {
			var _this = this
			wx.chooseVideo({
				sourceType:['album', 'camera'],
				maxDuration:60,
				success(res){
					_this.video =res.tempFilePath;
					var tempFilePaths = res.tempFilePath
					wx.uploadFile({
						url: `${configs.card.apiBaseUrl}api/user/upload`,
						filePath: tempFilePaths,
						name: 'url',
						formData: {
							'imgIndex': 'video'
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
										if(Auth.proxy.token.access_token){
											Auth.refresh(Auth.proxy.token.access_token);
											_this.chooseVideo();
										}
									}
								})

							}else if(res.statusCode == 200){
								_this.video = JSON.parse(res.data).data;
								wx.hideToast();
								// wx.showToast({
								// 	title: '上传成功',
								// 	icon: 'success',
								// 	duration: 2000
								// })
							}else if(err.statusCode == 500){
								wx.showModal({
									title: '错误提示',
									content: '系统错误',
									showCancel: false,

								})
							}

						},
						fail: function (res) {
							console.log(res)
							wx.hideToast();
							wx.showModal({
							  title: '错误提示',
							  content: '上传失败',
							  showCancel: false,
							  success: function (res) { }
							})
						}
					});
				},
			})
		},
		bindMultiPickerChange: function (e) {
			console.log('picker发送选择改变，携带值为', e.mp.detail.value)
			this.multiIndex = e.mp.detail.value
		},
		bindMultiPickerColumnChange: function (e) {
			console.log(e);
			var data = {
				multiArray: this.multiArray,
				multiIndex: this.multiIndex
			};
			data.multiIndex[e.mp.detail.column] = e.mp.detail.value;
			switch (e.mp.detail.column) {
				case 0:
					switch (data.multiIndex[0]) {
					  case 0:
						data.multiArray[1] = ['前端开发', '后端开发', 'IOS开发', '安卓开发', '节肢动物'];
						break;
					  case 1:
						data.multiArray[1] = ['护士', '外科', '内科'];
						break;
					}
					data.multiIndex[1] = 0;
					break;
			}
				this.multiArray = data.multiArray
				this.multiIndex = data.multiIndex
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/cell.less';
@import '../../../configs/style.less';
@import '../../../configs/main.less';
.enterprise-template-product-warp{
	.mpvue-cropper{
		background:rgba(0,0,0,.8);
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		z-index:99;
		.cropper-buttons{
			background:#fff;
			display:flex;
			height:calc(100% - 454px);
			line-height:50px;
			div{
				flex:1;
				text-align:center;
			}
		}
	}
	.enterprise-template-product-list{

		video{
			width:100%;
			margin:10px auto;
			display:block;
		}
		.enterprise-template-product-main{

			input{
				width:100%;
				font-size:@fonttwo;
			}
		}
		background:#fff;
		padding-left:20px;
		padding-right:20px;
		.enterprise-template-product-tit{
			font-size:@fonttwo;
		}
		._picker{
			flex:1;
			font-size:@fonttwo;
		}
		i{

			text-align:right;
			color:@fontcolor;
		}
		.opimg{
			width:50px;
			height:50px;
			display:flex;
			padding:10px;
			background:@auxiliary;
			text-align:center;
			align-items:center;
			font-size:@fonttwo;
			color:#fff;
			margin-left:10px;
		}
		.tempFilePaths{
			width:70px;
			height:70px;
			margin-left:10px;
		}
		.remind{
			font-size:@fonttwo;
			color:@fontcolor;
			margin-top:3px;
		}
		._textarea{
			font-size:@fonttwo;
			height:90px;
			width:100%;
			flex:1;
		}
	}
}
</style>
