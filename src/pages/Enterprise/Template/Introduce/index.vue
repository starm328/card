<template>
	<div class="enterprise-template-Introduce-warp">
		<div class="stm-cell  enterprise-template-Introduce-list">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-Introduce-tit">所属行业：</div>
				<input type="hidden" name="" style="height:0;width:0;min-height:0;">
				<picker  mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					 <view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
					  </view>
				</picker>
				<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</div>
		</div>
		<div class="stm-cell  enterprise-template-Introduce-list">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-Introduce-tit">企业介绍：</div>
				<div class="cell-main enterprise-template-Introduce-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<textarea placeholder="请输入你的介绍1000字内"></textarea>
				</div>
			</div>
		</div>
		<div class="stm-cell  enterprise-template-Introduce-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-Introduce-tit">图片：</div>
				<div class="cell-main enterprise-template-Introduce-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in banner" :key="index" @click="editchoosebanner(index)">
					<p class="opimg" @click="choosebanner" >添加图片</p>
				</div>
			</div>
			<div class="remind">(最多6张)图片尺寸：高600X480</div>
		</div>

		<div class="stm-cell enterprise-template-Introduce-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-Introduce-tit">海报图片：</div>
				<div class="cell-main build-template-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in haibao" :key="index" @click="editchoosehaibao(index)" >
					<p class="opimg" @click="choosehaibao" >添加海报图片</p>
				</div>
			</div>
			<div class="remind">(最多两张)图片尺寸：高600X480</div>
		</div>
		<div class="stm-cell enterprise-template-Introduce-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-Introduce-tit">视频标题：</div>
				<div class="cell-main enterprise-template-Introduce-main">
					<input type="number" name="" placeholder="请输入视频标题">

				</div>
			</div>
		</div>
		<div class="stm-cell  enterprise-template-Introduce-list">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-Introduce-tit">视频：</div>
				<div class="cell-main enterprise-template-Introduce-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<p class="opimg" @click="chooseVideo">添加视频</p>

				</div>
			</div>
			<video :src="video" controls v-if="video !== ''" ></video>
			<div class="remind">视频不能超过一分钟</div>
		</div>

		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="over"> 完成 </button>
		</div>
	</div>
</template>

<script>
export default {

	name: 'enterprise-template-Introduce-warp',

	data () {
		return {
			multiIndex: [0, 0],
			multiArray: [['IT', '医疗'], [ '前端开发', '后端开发', 'IOS开发', '安卓开发']],
			MultiArray: [],
			banner:'',
			haibao:'',
			video:''
		}
	},

	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '企业介绍'
		})
	},
	methods:{
		over(){
			wx.redirectTo({
			  url: '/pages/Enterprise/Show/main'
			})
		},
		choosebanner() {
			var _this =this
			wx.chooseImage({
				count: 6, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.banner = res.tempFilePaths
				}
			})
		},
		choosehaibao() {
			var _this =this
			wx.chooseImage({
				count: 2, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.haibao = res.tempFilePaths
				}
			})
		},
		editchoosebanner(e) {
			var _this =this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.banner.splice(e,1);
					_this.banner.splice(e,0,res.tempFilePaths[0]);
				}
			})
		},
		editchoosehaibao(e) {
			var _this =this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.haibao.splice(e,1);
					_this.haibao.splice(e,0,res.tempFilePaths[0]);
				}
			})
		},
		chooseVideo() {
			var _this = this
			wx.chooseVideo({
				sourceType:['album', 'camera'],
				maxDuration:60,
				success(res){
					_this.video =res.tempFilePath
				},
				fail(res){
					wx.showToast({
					  title: '失败',
					  icon: 'success',
					  duration: 2000
					})
				}
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
@import '../../../../configs/cell.less';
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
.enterprise-template-Introduce-warp{
	.enterprise-template-Introduce-list{
		video{
			width:100%;
			margin:10px auto;
			display:block;
		}
		.enterprise-template-Introduce-main{

			input{
				width:100%;
				font-size:@fonttwo;
			}
		}
		background:#fff;
		padding-left:20px;
		padding-right:20px;
		.enterprise-template-Introduce-tit{
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
