<template>
	<!-- 记录 -->
	<div class="dialog-main clock-dialog record-dialog " :class="{recordshow:isShow}">
		<div class="dialog-bg" @click="clockhidden"></div>
		<div class="dialog-content clock-content">
			<div class="title">生活事件记录 <i @click="clockhidden" class="iconfont icon-guanbi"></i></div>
			<form @submit="formSubmit">
				<div class="main">
					<p>当前时间：<stm-time :time="newtime"></stm-time></p>
					<p>当前地址：<span v-if="address">{{address}}</span><span v-else>暂无</span></p>
					<div><span>备注记录：</span><textarea placeholder="输入备注限500字内"></textarea></div>
					<div>
						<input type="text" name="audio" v-model="audio" style="opactiy:0;width:0;height:0">
						<p @click="startRecordMp3" v-if="start" class="music-start">点击录制60秒</p>
						<p @click="stopRecord" v-if="stop" class="music-start">结束</p>
						<p @click="playRecord" v-if="play" class="music-start">试听</p>
						<p @click="deletebtn" v-if="play" class="delete">刪除</p>
					</div>
					<div class="img">
						<ul>
							<li v-for="(item,index) in tempFilePaths" :key="index">
									<input type="text" :name="'img'+[index]" :value="item" style="opactiy:0;width:0;height:0">
									<img :src="item" class="tempFilePaths" @click="editchooseimg(index)">
							</li>
						</ul>

						<p class="opimg" @click="chooseimg" >添加二维码图</p>
					</div>
					<button type="primary"  class="stm-main-button stm-m20-rl stm-m10-t" formType="submit"> 提交 </button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Time from '@/components/time/index'
var QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
export default {
	name: 'record',
	components: {
		'stm-time': Time,
	},
	created () {
		this.getTime();
	},
	onLoad() {
		qqmapsdk = new QQMapWX({
			key: '5VHBZ-XUP6S-MK4OD-6Y63R-5SIAZ-T3FH7'
		})
		var _this = this;
		wx.getLocation({
			type:'wgs84',
			success(res) {
				// 调用接口
				qqmapsdk.reverseGeocoder({
						location: {
								latitude: res.latitude,
								longitude:  res.longitude
						},
						success: function (res) {
								_this.address = res.result.address
						},
						fail: function (res) {
								console.log(res);
						},
					complete: function (res) {
					}
				})
			}
		})
		this.recorderManager = wx.getRecorderManager();
		this.recorderManager.onError(function(){
			_this.tip("录音失败！")
		});
		this.recorderManager.onStop(function(res){
			_this.audio= res.tempFilePath
			_this.stop = false
			_this.start = false
			_this.play = true
			// _this.tip("录音完成！")
		});

		this.innerAudioContext = wx.createInnerAudioContext();
		this.innerAudioContext.onError((res) => {
			// _this.tip("播放录音失败！")
		})
	},
	props:{
		isShow:Boolean,
	},
	data () {
		return {
			address:'',
			start:true,
			stop:false,
			play:false,
			tempFilePaths:[],
			newtime:'',
			audio:''
		}
	},
	methods: {
		getTime() {
			var _this = this
			var date = new Date();
			_this.newtime = date;
		},
		formSubmit(e){
			console.log(e)
		},
		clockhidden(e) {
			this.$emit('close')
		},
		chooseimg() {
			var _this =this
			wx.chooseImage({
				count: 3, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.tempFilePaths = res.tempFilePaths
					console.log(res.tempFilePaths)
				}
			})

		},
		editchooseimg(e) {
			var _this =this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
								console.log( _this.tempFilePaths[e],res.tempFilePaths[0])
								_this.tempFilePaths.splice(e,1);
								_this.tempFilePaths.splice(e,0,res.tempFilePaths[0]);
					console.log(res.tempFilePaths)
				}
			})
		},
		/**
		 * 录制mp3音频
		*/
		 startRecordMp3 () {
			this.recorderManager.start({
				format: 'mp3',
				duration: 60000
			});
			this.stop = true
			this.start = false


		},

		/**
		 * 停止录音
		 */
		stopRecord(){
			this.recorderManager.stop();
			this.stop = false
			this.start = false
			this.play = true
		},

		/**
		 * 播放录音
		 */
		 playRecord(){
			var that = this;
			var src = this.src;
			if (src == '') {
				this.tip("请先录音！")
				return;
			}
			this.innerAudioContext.src = this.src;
			this.innerAudioContext.play()
		},
		/**
		*刪除录音
		**/
		deletebtn() {
			this.src = '',
			this.stop = false
			this.start = true
			this.play = false
		},

	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
.record-dialog{
		&.recordshow{
			display:block;
		}
	.main{
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
		}
		.tempFilePaths{
			width:70px;
			height:70px;
		}
		.music-start{
			border-radius:20px;
			background:@auxiliary;
			display:inline-block;
			float:left;
			color:#fff;
			padding:4px 15px;
			margin-right:10px;
			font-size:@fonttwo;
		}
		.delete{
			font-size:@fonttwo;
			margin-left:20px;
		}
		font-size:@fonttwo;
		padding:20px;
		p{
			margin:4px 0;
		}
		div{
			width:100%;
			display:flex;
			textarea{
				width:100%;
				flex:1;
				height:90px;
				max-height:90px;
			}
		}
	}
}
</style>
