<template>
	<div class="build-template-warp">
		<mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<div class="stm-cell  build-template-list">
			<div class="cell-warp">
				<div class="cell-left build-template-tit">所属行业：</div>
				<input @click="showPicker" :placeholder="province !=  '' ? province.label + city.label :'请选择地址'" disabled="" style="flex:1;">
				<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
			</div>
		</div>
		<div class="stm-cell  build-template-list">
			<div class="cell-warp">
				<div class="cell-left build-template-tit">业务名称：</div>
				<input name="" placeholder="请输入业务名称">
			</div>
		</div>
		<div class="stm-cell  build-template-list">
			<div class="cell-warp">
				<div class="cell-left build-template-tit">我的logo：</div>
				<div class="cell-main build-template-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in tempFilePaths" :key="index" @click="chooseimg" >
					<p class="opimg" @click="chooseimg" >添加二维码图</p>
				</div>
			</div>
			<div class="remind">图片尺寸：高200X200</div>
		</div>
		<div class="stm-cell  build-template-list">
			<div class="cell-warp">
				<div class="cell-left build-template-tit">海报图片：</div>
				<div class="cell-main build-template-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in banner" :key="index" @click="editchoosebanner(index)" >
					<p class="opimg" @click="choosebanner" >添加海报图片</p>
				</div>
			</div>
			<div class="remind">(最多两张)图片尺寸：高600X480</div>
		</div>
		<div class="stm-cell  build-template-list">
			<div class="cell-warp">
				<div class="cell-left build-template-tit">业务介绍：</div>
				<div class="cell-main build-template-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<textarea placeholder="请输入你的介绍500字内"></textarea>
				</div>
			</div>
		</div>
		<div class="stm-cell  build-template-list">
			<div class="cell-warp">
				<div class="cell-left build-template-tit">业务图片：</div>
				<div class="cell-main build-template-main" style="display:block;">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in business" :key="index" @click="eidtchoosebusiness(index)">
					<p class="opimg" @click="choosebusiness" >添加业务图片</p>
				</div>
			</div>
			<div class="remind">(最多9张)图片尺寸：高600X480</div>
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
	name: 'build-template-warp',
	components:{
		'mpvue-picker': mpvuePicker
	},

	data () {
		return {
			multiIndex: [0, 0],
			MultiArray: '',
			tempFilePaths:'',
			banner:'',
			business:'',
			province:'',
			city:'',
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
			pickerValueDefault: [0,0]
		}
	},

	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '自建模板'
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
			this.province = this.mulLinkageThreePicker[e[0]]
			this.city = this.mulLinkageThreePicker[e[0]].children[e[1]]
		},
		over() {
			console.log(this.multiArray ='111' )
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
		choosebusiness() {
			var _this =this
			wx.chooseImage({
				count: 9, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.business = res.tempFilePaths
				}
			})
		},
		eidtchoosebusiness(e) {
			var _this =this
			wx.chooseImage({
				count: 9, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.business.splice(e,1);
					_this.business.splice(e,0,res.tempFilePaths[0]);
				}
			})
		},

	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/cell.less';
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
.build-template-warp{
	.build-template-list{

		input{
			font-size:@fonttwo
		}
		background:#fff;
		padding:15px 20px;
		margin-bottom:10px;
		.build-template-tit{
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
