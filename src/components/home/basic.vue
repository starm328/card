<template>
	<div class="home-basic-component">
		<mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

		<mpvue-picker ref="address" :mode="mode" :deepLength=addLength :pickerValueDefault="addValueDefault"  @onChange="addConfirm" @onConfirm="addConfirm"  @pickerCancel="addCancel" :pickerValueArray="addValueArray"></mpvue-picker>
		<form @submit="formSubmit">
			<dl  class="upimg">
				<dd>
					<p>头像</p>
					<span>你的头像将会由超级AI人脸识别系统审核，请上传真实个人头像，不要使用产品、风景、动物、明显、色情、暴力、卡通人物等图片做为名片头像，否则无法保存。</span>
				</dd>
				<dt  @click="chooseimg" >
					<i class="iconfont icon-tianjia" v-if="!tempFilePaths"></i>
					<input type="text" name="img_url" :value="img_url" style="display:none;">
					<img :src="img_url"  mode="aspectFill" class="tempFilePaths" >
				</dt>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>姓名</p>
					<input type="text" name="name" placeholder="必填项" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd @click="screen">
					<p>性别</p>
					<input type="text" name="gender" :value="genderNumber" placeholder="必填项" placeholder-style="color:#888;" style="display:none">
					<input type="text"  :value="gender" placeholder="必填项" placeholder-style="color:#888;" disabled="">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>公司</p>
					<input type="text" name="company" placeholder="必填项" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>职务</p>
					<input type="text" name="position" placeholder="必填项" placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd class="after">
					<p>手机</p>
					<input type="number" name="phone" placeholder="必填项" placeholder-style="color:#888;">
				</dd>
				<div class="radio">
					<radio-group class="group" @change="radio">
						<label>
							<radio color='#d95940' checked value="1"></radio>
							隐私保护，仅相互交换了名片的用户可见。
						</label>
						<label>
							<radio color='#d95940' value="2"></radio>
							完全公开，手机号码对所有人可见。
						</label>
					</radio-group>
					<input type="test" name="phoneconfig" :value="phoneconfig" style="display:none;">
				</div>

			</dl>
			<dl class="dl-li">
				<dd>
					<p>行业</p>
					<input type="test" name="trade" :value="province !=  '' ? province.label +'|'+ city.label :''"  style="display:none">
					<input type="text" @click="showPicker" :placeholder="province !=  '' ?'' :'请选择行业'" :value="province !=  '' ? province.label +'|'+ city.label :''" disabled=""  placeholder-style="color:#888;">
				</dd>
			</dl>
			<dl class="dl-li">
				<dd>
					<p>地区</p>
					<input type="test" name="area" :value="adds != '' ? add.label + ','+ adds.label : ''"  style="display:none">
					<input @click="addPicker" type="text"  :placeholder="adds != '' ? '' : '请选择地区'" :value="adds != '' ? add.label + ','+ adds.label : ''" disabled=""  placeholder-style="color:#888;">
				</dd>
			</dl>

			<div class="hr"></div>
			<p class="dl-tit">
				高级选项(非必填)
			</p>
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
			<div style="width:96%;margin:0px auto;padding-bottom:20px;">
				<button type="primary" formType="submit" class="stm-main-button stm-m10-t">保存</button>
			</div>
		</form>
	</div>
</template>



<script>
import mpvuePicker from 'mpvue-picker';
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
export default {

	name: 'home-basic-component',
	components:{
		'mpvue-picker': mpvuePicker
	},

	data () {
		return {
			img_url:'',
			province:'',
			city:'',
			add:'',
			adds:'',
			cardid:'',
			id:'',
			pageid:'',
			gender:'',
			genderNumber:'',
			phoneconfig:'1',
			mulLinkageThreePicker: [
			  {
				label: 'IT',
				value: 0,
				children: [
				  {
					label: '网页设计',
					value: 1,
				  },{
					label: 'IOS开发',
					value: 1,
				  }
				]
			  },
			  {
				label: '医疗',
				value: 0,
				children: [
				  {
					label: '护士',
					value: 1,
				  },{
					label: '外科',
					value: 1,
				  }
				]
			  },

			],

			addThreePicker: [
			  {
				label: '上海',
				value: 0,
				children: [
				  {
					label: '浦东',
					value: 1,
				  },{
					label: '杨浦',
					value: 1,
				  }
				]
			  },
			  {
				label: '浙江',
				value: 0,
				children: [
				  {
					label: '杭州',
					value: 1,
				  },{
					label: '江苏',
					value: 1,
				  }
				]
			  },
			],
			pickerValueDefault: [0,0],
			addValueDefault: [0,0],
			tempFilePaths:'',
		}
	},
	onLoad(option) {
		wx.setNavigationBarTitle({
		  title: '添加名片'
		})
		if(option){
			this.pageid = option.id
		}
	},


	methods: {
		screen() {
			var _this = this;
			wx.showActionSheet({
				itemList: ['保密', '男', '女'],
				success: function(res) {
					_this.genderNumber = res.tapIndex
					if(res.tapIndex == 0){
						_this.gender = '保密'
					}else if(res.tapIndex == 1){
						_this.gender = '男'
					}else{
						_this.gender = '女'
					}
				},
				fail: function(res) {
					console.log(res.errMsg)
				}
			})
		},
		radio(e) {
			this.phoneconfig = e.mp.detail.value
		},
		jurisdiction() {
			wx.navigateTo({
				url:this.pageid ? '/pages/Home/jurisdiction/main?id='+this.pageid :'/pages/Home/jurisdiction/main?id='+this.cardid,
			})
		},
		billing() {
			wx.navigateTo({
				url:this.pageid ? '/pages/Home/billing/main?id='+this.pageid :'/pages/Home/billing/main?id='+this.cardid,
			})
		},

		detailed(){
			wx.navigateTo({
				url:this.pageid ? '/pages/Home/detailed/main?id='+this.pageid :'/pages/Home/detailed/main?id='+this.cardid,
			})
		},
		showPicker() {
			this.pickerValueArray = this.mulLinkageThreePicker;
			this.mode = 'multiLinkageSelector';
			this.deepLength = 2;
			this.pickerValueDefault = [0, 0];
			this.$refs.mpvuePicker.show();
		},

		addPicker() {
			this.addValueArray = this.addThreePicker;
			this.mode = 'multiLinkageSelector';
			this.deepLength = 2;
			this.addValueDefault = [0, 0];
			this.$refs.address.show();
		},

		onConfirm(e) {
			this.province = this.mulLinkageThreePicker[e[0]]
			this.city = this.mulLinkageThreePicker[e[0]].children[e[1]]
		},

		addConfirm(e) {
			this.add = this.addThreePicker[e[0]]
			this.adds = this.addThreePicker[e[0]].children[e[1]]
		},
		chooseimg() {
			var _this =this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.tempFilePaths = res.tempFilePaths
					var tempFilePaths = res.tempFilePaths;
					wx.showToast({
						title: '正在上传...',
						icon: 'loading',
						mask: true,
						duration: 10000
					})
					var uploadImgCount = 0;
					for (var i = 0, h = tempFilePaths.length; i < h; i++) {
						wx.uploadFile({
							url: `${configs.card.apiBaseUrl}api/user/upload`,
							filePath: tempFilePaths[i],
							name: 'url',
							formData: {
								'imgIndex': i
							},
							header: {
								token: Auth.proxy.token.access_token,
								"Content-Type": "multipart/form-data"
							},
							success: function (res) {
								uploadImgCount++;
								//服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
								if(res.statusCode == 404){
									wx.showModal({
										title: '错误提示',
										content: '登录失效，重新上传',
										showCancel: false,
										success: function (res) {
											if(Auth.proxy.token.access_token){
												Auth.refresh(Auth.proxy.token.access_token);
												this.chooseimg();
											}
										}
									})

								}else if(res.statusCode == 200){
									_this.img_url = JSON.parse(res.data).data
									wx.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 2000
									})
								}
								//如果是最后一张,则隐藏等待中
								if (uploadImgCount == tempFilePaths.length) {
									wx.hideToast();
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
					}
				}
			})
		},
		formSubmit(e) {
			var _this = this;
			console.log(_this.pageid)
			wx.showLoading({
				title: '提交中',
			})
			wx.pro.request({
				url: _this.pageid ? `${configs.card.apiBaseUrl}api/user/`+ 'updatecard/'+_this.pageid : `${configs.card.apiBaseUrl}api/user/newcard`,
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
								this.chooseimg();
							}
						}
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';

.home-basic-component{
	.upimg{
		width:calc(100% - 45px);
		margin:10px auto;
		display:flex;
		background:#fff;
		border-radius:5px;
		box-shadow: 0px 3px 12px 0px rgba(206, 206, 206, 0.5);
		padding:15px;
		dt{
			width:140px;
			height:140px;
			background:#eee;
			text-align:center;
			margin:10px 0 10px 15px;
			line-height:140px;
			overflow:hidden;
			i{
				color:#fff;
				font-size:@fontsix;
			}
			img{
				width:100%;
			}
		}
		dd{
			flex:1;
			line-height:20px;
			p{
				font-size:@fontthree;
			}
			span{
				font-size:@font12;
				color:@fontcolor;
				line-height:16px;
			}

		}
	}
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
}
</style>
