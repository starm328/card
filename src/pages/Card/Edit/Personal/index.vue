<template>
	<div class="card-edit-personal">
		<mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<div class="edit-personal-warp">
			<stm-input types="text" placeholder="职务" title="职务" >
			</stm-input>
			<stm-input types="text" placeholder="邮箱" title="邮箱" >
			</stm-input>
			<div class="stm-cell  edit-personal-list">
				<div class="cell-warp">
					<div class="cell-left edit-personal-tit">选择地址：</div>
					<div class="cell-main edit-personal-main">
						<input @click="showPicker" :placeholder="province !=  '' ? province.label + city.label +area.label :'请选择地址'" disabled="" style="flex:1;">
					</div>
				</div>
			</div>
			<stm-input types="text" placeholder="详细地址" title="地址" >
			</stm-input>
			<stm-input types="text" placeholder="微信号" title="微信号" >
			</stm-input>
			<div class="stm-cell  edit-personal-list">
				<div class="cell-warp">
					<div class="cell-left edit-personal-tit">微信二维码：</div>
					<div class="cell-main edit-personal-main">
						<input type="hidden" name="" style="width:0;min-height:0;height:0;">
						<img :src="tempFilePaths" class="tempFilePaths" v-if="tempFilePaths" @click="chooseimg">
						<p class="opimg" @click="chooseimg" v-else>添加二维码图</p>
					</div>
				</div>
			</div>
			<div class="stm-cell  edit-personal-list">
				<div class="cell-warp">
					<div class="cell-left edit-personal-tit">语音介绍：</div>
					<div class="cell-main edit-personal-main">
						<input type="hidden" name="" style="width:0;min-height:0;height:0;">
						<p @click="startRecordMp3" v-if="start" class="music-start">点击录制60秒</p>
						<p @click="stopRecord" v-if="stop" class="music-start">结束</p>
						<p @click="playRecord" v-if="play" class="music-start">试听</p>
						<p @click="deletebtn" v-if="play" class="delete">刪除</p>
					</div>
				</div>
			</div>
			<div class="stm-cell  edit-personal-list">
				<div class="cell-warp">
					<div class="cell-left edit-personal-tit">个人介绍：</div>
					<div class="cell-main edit-personal-main">
						<input type="hidden" name="" style="width:0;min-height:0;height:0;">
						<textarea placeholder="请输入你的介绍500字内"></textarea>
					</div>
				</div>
			</div>
		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"   class="stm-main-button  stm-m20-rl" @click="over"> 完成 </button>
			<button type="primary" plain class="stm-m20-rl" >跳过</button>
		</div>
	</div>
</template>

<script>
import Input from '@/components/input/index';
import mpvuePicker from 'mpvue-picker';
export default {
	name: 'card-personal',
	components:{
		'stm-input': Input,
		'mpvue-picker': mpvuePicker
	},
	data() {
		return {
			tempFilePaths:'',
			src:'',
			start:true,
			stop:false,
			play:false,
			province:'',
			city:'',
			area:'',
			mulLinkageThreePicker: [
			  {
			    label: '上海',
			    value: 0,
			    children: [
			      {
			        label: '上海',
			        value: 1,
			        children: [{
			          label: '普陀',
			          value: 1
			        },
			        {
			          label: '浦东',
			          value: 2
			        }, {
			          label: '杨浦',
			          value: 3
			        }]
			      }
			    ]
			  },
			  {
			    label: '江苏',
			    value: 0,
			    children: [
			      {
			        label: '江苏',
			        value: 1,
			        children: [{
			          label: '苏州',
			          value: 1
			        },
			        {
			          label: '苏州',
			          value: 2
			        }, {
			          label: '苏州',
			          value: 3
			        }]
			      }
			    ]
			  },

			],
			pickerValueDefault: [0,0,0]
		};
	  },
	methods: {
		showPicker() {
			this.pickerValueArray = this.mulLinkageThreePicker;
			this.mode = 'multiLinkageSelector';
			this.deepLength = 3;
			this.pickerValueDefault = [0, 0, 0];
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			console.log(e[1])
			this.province = this.mulLinkageThreePicker[e[0]]
			this.city = this.mulLinkageThreePicker[e[0]].children[e[1]]
			this.area = this.mulLinkageThreePicker[e[0]].children[e[1]].children[e[2]]
		},
		over() {
			wx.switchTab({
			  url: '/pages/Enterprise/main'
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
		},
		tip (msg) {
		  wx.showModal({
		    title: '提示',
		    content: msg,
		    showCancel: false
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
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title:'完善个人信息'
		});
		var that = this;
		this.recorderManager = wx.getRecorderManager();
		this.recorderManager.onError(function(){
			that.tip("录音失败！")
		});
		this.recorderManager.onStop(function(res){
			that.src= res.tempFilePath
			console.log(res.tempFilePath )
			// that.tip("录音完成！")
		});

		this.innerAudioContext = wx.createInnerAudioContext();
		this.innerAudioContext.onError((res) => {
			// that.tip("播放录音失败！")
		})

	},
	created () {


	},
}
</script>

<style lang="less" scoped>
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
@import '../../../../configs/cell.less';
.card-edit-personal{
	.edit-personal-warp{
		background:#fff;
		padding:0 10px;
		.edit-personal-list{
			.edit-personal-main{
				input{
					font-size:@fonttwo
				}
			}
			.edit-personal-tit{
				font-size:@fonttwo
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
				font-size:@fonttwo;
			}
			.delete{
				font-size:@fonttwo;
				margin-left:20px;
			}
			._textarea{
				font-size:@fonttwo;
				height:90px;
				width:100%;
			}
		}

	}
}

</style>
