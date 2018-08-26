<template>
	<div class="from-photo-warp">
		<img :src="tempFilePaths" class="img" mode="widthFix" @click="chooseimg" v-if="tempFilePaths">
		<p @click="chooseimg" v-else class="getphoto">上传营业执照</p>
		<div class="text">
			<p>要求*<span> 1）营业执照复印件</span></p>
			<p><span>2）盖章写上申请我的全能名片用</span></p>
			<p><span>3）拍照上传</span></p>

		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary" class="stm-main-button stm-m20-rl" @click="show"> 提交 </button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'from-photo-warp',
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
			title:'上传认证资料'
		})

	},
	data () {
		return {
			tempFilePaths:''
		}
	},
	methods: {
		chooseimg() {
			var _this =this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.tempFilePaths = res.tempFilePaths[0]
				}
			})
		},
		show(){
			wx.redirectTo({
			  url: '/pages/Enterprise/Show/main'
			})
		},

	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
.from-photo-warp{
	.getphoto{
		width:40px;
		margin:20px auto;
		background:@auxiliary;
		font-size:@fonttwo;
		text-align:center;
		padding:20px 30px 20px 30px;
		color:#fff;
		border-radius:5px;
	}
	img{
		width:100px;
		display:block;
		margin:20px auto;
		height:auto
	}
	.text{
		background:#fff;
		font-size:@fonttwo;
		padding:20px;
		p{
			span{
				padding-left:38px;
			}
			&:first-child{
				span{
					padding:0;
				}
			}
		}
	}
}
</style>
