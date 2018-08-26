<template>
	<div class="space-from-warp">

		<div class="stm-cell  space-from-list  stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">团队名称：</div>
				<div class="cell-main space-from-main">
					<input type="text" name="" placeholder="请输入领导人姓名">
				</div>
			</div>
		</div>

		<div class="stm-cell  space-from-list">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">团队介绍：</div>
				<div class="cell-main space-from-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<textarea placeholder="请输入你的介绍1000字内"></textarea>
				</div>
			</div>
		</div>
		<div class="stm-cell  space-from-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">团队图片：</div>
				<div class="cell-main space-from-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<img :src="item" class="tempFilePaths" v-for="(item,index) in banner" :key="index" @click="editchoosebanner(index)">
					<p class="opimg" @click="choosebanner" >添加海报图片</p>
				</div>
			</div>
			<div class="remind">(最多6张)图片尺寸：高600X480</div>
		</div>
		<div class="stm-cell  space-from-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">视频：</div>
				<div class="cell-main space-from-main">
					<input type="hidden" name="" style="width:0;min-height:0;height:0;">
					<p class="opimg" @click="chooseVideo"  >添加视频</p>

				</div>
			</div>
			<video :src="video" controls v-if="video !== ''" ></video>
			<div class="remind">视频不能超过一分钟</div>
		</div>
		<div class="length-100">
			<label>
				<checkbox value="" checked=""/>
				对外公开
			</label>
			<label >
				<checkbox value="" checked=""/>
				打开需要读取位置
			</label>
			<label >
				<checkbox value="" checked=""/>
				打卡记录对团队外公开
			</label>
			<label >
				<checkbox value="" checked=""/>
				队友名片团队公开
			</label>
		</div>
		<div class="stm-cell  space-from-list stm-m10-t">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">开通极速器：</div>
				<div class="cell-main space-from-main">
					<radio-group class="radio-group" @change="radioChange">
						<label><radio value="1" />通用计数器</label>
						<label><radio value="2" />定制计数器</label>
					</radio-group>
				</div>
			</div>
		</div>
		<div class="stm-cell  space-from-list ">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">计数器名字：</div>
				<div class="cell-main space-from-main">
					<input type="text" name="" placeholder="请输入计数器名字">
				</div>
			</div>
		</div>
		<div class="stm-cell  space-from-list ">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">计数器介绍：</div>
				<div class="cell-main space-from-main">
					<input type="text" name="" placeholder="请输入计数器介绍">
				</div>
			</div>
		</div>
		<div class="stm-cell  space-from-list" v-if="show == 1">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">计数器标题：</div>
				<div class="cell-main space-from-main">
					<input type="text" placeholder="计数栏">
				</div>
			</div>
		</div>
		<div class="stm-cell  space-from-list "  v-for="(item,index) in counting" :key="index" v-if="show == 2">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">计数器标题{{index + 1}}：</div>
				<div class="cell-main space-from-main">
					<input type="text" :placeholder="item.name" @input="countingput">
				</div>
			</div>
		</div>
		<div class="stm-cell  space-from-list " @click="addCounting">
			<div class="cell-warp">
				<div class="cell-left space-from-tit">+计算器栏目标题（最多3个）</div>
				<div class="cell-main space-from-main">

				</div>
			</div>
		</div>
		<div class="moban" v-if="show == 1">
			<ul>
				<li><p>人员</p><p>日期</p><p>XXX</p><p>备注</p></li>
				<li><p>参与人员</p><p></p><p></p><p></p></li>
				<li><p>参与人员</p><p></p><p></p><p></p></li>
				<li><p>参与人员</p><p></p><p></p><p></p></li>

			</ul>
		</div>
		<div class="moban" v-if="show == 2">
			<ul>
				<li><p>人员</p><p>日期</p><p v-for="(item,key) in counting" :key="key">{{item.name}}</p><p>备注</p></li>
				<li><p>参与人</p><p></p><p v-for="(item,key) in counting" :key="key"><p></p></li>
				<li><p>参与人</p><p></p><p v-for="(item,key) in counting" :key="key"><p></p></li>
				<li><p>参与人</p><p></p><p v-for="(item,key) in counting" :key="key"><p></p></li>

			</ul>
		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="over"> 完成 </button>
		</div>
	</div>
</template>

<script>
export default {

	name: 'space-from-warp',

	data () {
		return {
			MultiArray: [],
			banner:'',
			video:'',
			show:1,
			counting:[
				{
					id:0,
					name:'计数栏'
				}
			]
		}
	},

	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '团队空间'
		})
	},
	methods:{
		over() {
			wx.navigateTo({
			  url: '/pages/Team/Home/main'
			})

		},
		addCounting() {
			if(this.counting.length >= 3){
				wx.showToast({
					title: '最多只能添加三条',
					icon: 'none',
					duration: 2000
				})
			}else{
				this.counting.push({
					id:1,
					name:'计数栏'
				})
			}

		},
		countingput(e) {
			console.log(e)
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
		editchoosebanner() {
			var _this =this
			wx.chooseImage({
				count: 6, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.banner.splice(e,1);
					_this.banner.splice(e,0,res.tempFilePaths[0]);
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
		radioChange(e) {
			this.show = e.mp.detail.value
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/cell.less';
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
.space-from-warp{
	.length-100{
		display:block;
		padding:15px 20px;
		font-size:@fonttwo;
		background:#fff;
		label{
			width:50%;
			display:block;
			float:left;
			font-size:12px;
			margin-bottom:10px;

		}
		&:after{
			display:block;
			content:'';
			clear:both;
		}
	}
	.moban{
		width:90%;
		margin:20px auto;
		ul li{
			background:#fff;
			line-height:25px;
			border-bottom:1px solid #ccc;
			display:flex;
			&:after{
				clear:both;
				display:block;
				content:'';
			}
			p{
				border-right:1px solid #ccc;
				flex:1;
				height:25px;
				float:left;
				text-align:center;
				font-size:@fonttwo;
				&:last-child{
					border:0;
				}
			}

		}
	}
	.space-from-list{
		video{
			width:100%;
			margin:10px auto;
			display:block;
		}
		.space-from-main{
			.radio-group{
				width:100%;
				flex:1;
				display:block;
			}
			label{
				display:block;
				font-size:@fonttwo;
				margin-left:10px;
				float:left;
			}
			input{
				width:100%;
				font-size:@fonttwo;
			}
		}
		background:#fff;
		padding-left:20px;
		padding-right:20px;
		.space-from-tit{
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
