<template>
	<div class="enterprise-template-warp">
		<mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

		<mpvue-picker ref="addressPicker" :mode="mode" :deepLength=AdddeepLength :AddpickerValueDefault="AddpickerValueDefault" @onChange="onChange" @onConfirm="AddonConfirm" @pickerCancel="pickerCancel" :pickerValueArray="AddpickerValueArray"></mpvue-picker>

		<div class="stm-cell  enterprise-template-list">
			<div class="cell-warp">
				<div class="cell-left build-template-tit">所属行业：</div>
				<input @click="showPicker" :placeholder="Industry1 !=  '' ? Industry1.label + Industry2.label :'选择行业'" disabled="" style="flex:1;">
				<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</div>
		</div>
		<div class="stm-cell  enterprise-template-list">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-tit">公司电话：</div>
				<div class="cell-main enterprise-template-main">
					<input type="number" name="" placeholder="请输入公司电话">

				</div>
			</div>
		</div>
		<div class="stm-cell enterprise-template-list">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-tit">公司网站：</div>
				<div class="cell-main enterprise-template-main">
					<input type="text" name="" placeholder="请输入公司网站">

				</div>
			</div>
		</div>
		<div class="stm-cell enterprise-template-list">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-tit">选择地址：</div>
				<div class="cell-main enterprise-template-main">
					<input @click="AddshowPicker" :placeholder="province !=  '' ? province.label + city.label +area.label :'请选择地址'" disabled="" style="flex:1;">
				</div>
				<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</div>
		</div>
		<div class="stm-cell  enterprise-template-list">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-tit">详细地址：</div>
				<div class="cell-main enterprise-template-main">
					<input type="text" name="" placeholder="请输入详细地址">

				</div>
			</div>
		</div>

		<div class="stm-cell  enterprise-template-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-tit">公司logo：</div>
				<div class="cell-main enterprise-template-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in tempFilePaths" :key="index" @click="editchooseimg(index)">
					<p class="opimg" @click="chooseimg" >添加图</p>
				</div>
			</div>
			<div class="remind">图片尺寸：高200X200</div>
		</div>
		<div class="stm-cell  enterprise-template-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left enterprise-template-tit">海报图片：</div>
				<div class="cell-main enterprise-template-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in banner" :key="index" @click="editchoosebanner(index)">
					<p class="opimg" @click="choosebanner" >添加海报图片</p>
				</div>
			</div>
			<div class="remind">(最多两张)图片尺寸：高600X480</div>
		</div>

		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="over"> 完成 </button>
		</div>
	</div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
export default {

	name: 'enterprise-template-warp',
	components:{
		'mpvue-picker': mpvuePicker
	},

	data () {
		return {
			Industry1:'',
			Industry2:'',
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
			pickerValueDefault: [0,0],


			province:'',
			city:'',
			area:'',
			AddmulLinkageThreePicker: [
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
			AddpickerValueDefault: [0,0,0],
			tempFilePaths:'',
			banner:'',
		}
	},

	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '基本信息'
		})
	},
	methods:{
		showPicker() {
			this.pickerValueArray = this.mulLinkageThreePicker;
			this.mode = 'multiLinkageSelector';
			this.deepLength = 2;
			this.pickerValueDefault = [0, 0];
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			console.log(e[0])
			this.Industry1 = this.mulLinkageThreePicker[e[0]]
			this.Industry2 = this.mulLinkageThreePicker[e[0]].children[e[1]]
		},

		AddshowPicker() {
			this.AddpickerValueArray = this.AddmulLinkageThreePicker;
			this.mode = 'multiLinkageSelector';
			this.AdddeepLength = 3;
			this.AddpickerValueDefault = [0, 0, 0];
			this.$refs.addressPicker.show();
		},
		AddonConfirm(e) {
			this.province = this.AddmulLinkageThreePicker[e[0]]
			this.city = this.AddmulLinkageThreePicker[e[0]].children[e[1]]
			this.area = this.AddmulLinkageThreePicker[e[0]].children[e[1]].children[e[2]]
		},
		over() {
			wx.redirectTo({
			  url: '/pages/Enterprise/Template/Introduce/main'
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
					_this.tempFilePaths = res.tempFilePaths
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
					_this.tempFilePaths.splice(e,1);
					_this.tempFilePaths.splice(e,0,res.tempFilePaths[0]);
				}
			})
		},
		choosebanner() {
			var _this =this
			wx.chooseImage({
				count: 2, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.banner = res.tempFilePaths
				}
			})
		},
		editchoosebanner(e) {
			var _this =this
			wx.chooseImage({
				count: 2, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.banner.splice(e,1);
					_this.banner.splice(e,0,res.tempFilePaths[0]);
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
@import '../../../configs/cell.less';
@import '../../../configs/style.less';
@import '../../../configs/main.less';
.enterprise-template-warp{
	.enterprise-template-list{
		input{
				width:100%;
				font-size:@fonttwo;
			}
		.build-template-tit{
			font-size:@fonttwo;
		}
		background:#fff;
		padding-left: 20px;
		padding-right: 20px;
		.enterprise-template-tit{
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
