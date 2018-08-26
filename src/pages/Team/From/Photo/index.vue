<template>
	<div class="team-photo-warp">
		<div class="up-phpto">
			<ul>
				<li>
					<img :src="tempFilePaths" class="img" mode="widthFix" @click="chooseimg" v-if="tempFilePaths">
					<p @click="chooseimg" v-else class="getphoto">身份证正面</p>
				</li>
				<li>
					<img :src="carimg" class="img" mode="widthFix" @click="choosecar" v-if="carimg">
					<p @click="choosecar" v-else class="getphoto">身份证反面</p>
				</li>
			</ul>
		</div>
		<div class="text">
			<p>要求*<span> 1）手持身份证照片</span></p>
			<p><span>2）拍照上传</span></p>

		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary" class="stm-main-button stm-m20-rl" @click="show" >下一步</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'team-photo-warp',
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
			title:'团队认证'
		})

	},
	data () {
		return {
			tempFilePaths:'',
			carimg:''
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
		choosecar() {
			var _this =this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					_this.carimg = res.tempFilePaths[0]
				}
			})
		},
		show(){
			wx.redirectTo({
			  url: '/pages/Team/main'
			})
		},

	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
.team-photo-warp{
	.up-phpto{
		ul{
			display:flex;
			li{
				flex:1;
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
			}
		}
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
