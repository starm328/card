<template>
	<div class="me-clock-warp">
		<div class="nav">
			<ul>
				<li :class="[nav == 1 ? 'active' : '']" @click="navbtn(1)">本月</li>
				<li :class="[nav == 2 ? 'active' : '']" @click="navbtn(2)">历史记录</li>
			</ul>
		</div>
		<div class="month" v-if="nav == 1">
			<div class="yd-preview" @click="RecordisShowbtn">
				<div class="yd-preview-item">
					<div>地点</div>
					<div>中国上海</div>
				</div>
				<div class="yd-preview-item">
					<div>备注</div>
					<div class="text-over">某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某</div>
				</div>
				<div class="yd-preview-item">
					<div>图片有  语音有 </div>
					<div>时间 2018-05-21 00:00</div>
				</div>
			</div>
		</div>

		<div class="history" v-if="nav ==2 ">
			<div class="yd-preview" @click="RecordisShowbtn">
				<div class="yd-preview-item">
					<div>地点</div>
					<div>中国上海</div>
				</div>
				<div class="yd-preview-item">
					<div>备注</div>
					<div class="text-over">某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某</div>
				</div>
				<div class="yd-preview-item">
					<div>图片有  语音有 </div>
					<div>时间 2018-05-21 00:00</div>
				</div>
			</div>
		</div>
		<div class="dialog-main clock-dialog enterprise-dialog" :class="{clockshow:RecordisShow}">
			<div class="dialog-bg" @click="RecordisShowhidden"></div>
			<div class="dialog-content clock-content">
				<div class="title">备注 <i @click="RecordisShowhidden" class="iconfont icon-guanbi"></i></div>
				<div class="main">
					<p>地址：上海</p>
					<div><p>备注信息：</p>xinx</div>
					<p class="voice">播放语音</p>
					<ul>
						<li @click="previewImage"><open-data type="userAvatarUrl" class="img"></open-data></li>
						<li @click="previewImage"><open-data type="userAvatarUrl" class="img"></open-data></li>
						<li @click="previewImage"><open-data type="userAvatarUrl" class="img"></open-data></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'me-clock-warp',
  onLoad() {
  	wx.hideShareMenu();
  	wx.setNavigationBarTitle({
  	  title: '我的打卡记录'
  	})
  },
  data () {
    return {
    	RecordisShow:false,
    	nav:1,
    }
  },
  methods: {
  	navbtn(i) {
  		this.nav = i
  	},
  	RecordisShowbtn() {
  		this.RecordisShow = !this.RecordisShow;
  	},
  	RecordisShowhidden() {
  		this.RecordisShow = !this.RecordisShow
  	},
  	previewImage() {
  		wx.previewImage({
  		  current: '', // 当前显示图片的http链接
  		  urls: ['https://inedia.web.mallkd.com/code.jpg'] // 需要预览的图片http链接列表
  		})
  	}
  }
}
</script>

<style lang="less" scoped>
@import '../../../configs/yd-preview.less';
@import '../../../configs/dialog.less';
@import '../../../configs/main.less';
@import '../../../configs/style.less';
.me-clock-warp{
	.yd-preview{
		padding-top:4px;
	}
	.nav{
		ul{
			display:flex;
			margin-bottom:10px;
			li{
				flex:1;
				text-align:center;
				line-height:35px;
				font-size:@fonttwo;
				background:#fff;
				&.active{
					border-bottom:2px solid @maincolor;
				}
			}
		}
	}
	.clock-content{

		.main{
			font-size:@fonttwo;
			padding:20px;
		}
		.voice{
			margin:10px 0;
			display:inline-block;
			padding:2px 10px;
			background:@maincolor;
			color:#fff;
			border-radius:30px;
		}
		ul{
			display:flex;
			li{
				flex:1;
				margin:5px;
				img{
					width:40px;

				}
			}
		}
	}
	.clock-dialog{
		display:none;
	}
	.clockshow{
		display:block;
	}
	.text-over{
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

}
</style>
