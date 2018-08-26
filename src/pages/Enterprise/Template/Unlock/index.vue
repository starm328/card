<template>
	<div class="pro-unlock-warp">
		<radio-group class="radio-group">
			<label>
			<div class="stm-cell  pro-unlock-list stm-m10-t">
				<div class="cell-warp">
						<div class="cell-left pro-unlock-tit">
								<radio value="A" name="unlock" checked="checked"/>
						</div>
						<div class="cell-main pro-unlock-main">
							<p><span>A套餐</span><span>99.99元/终身</span></p>
							<p><span>10个员工</span><span @click="upvideo" class="upvideo">上传视频免费激活</span></p>
						</div>
				</div>
			</div>
			</label>
			<label>
			<div class="stm-cell  pro-unlock-list stm-m10-t">
				<div class="cell-warp">
						<div class="cell-left pro-unlock-tit">
								<radio value="A" name="unlock"/>
						</div>
						<div class="cell-main pro-unlock-main">
							<p><span>B套餐</span><span>300元/年</span></p>
							<p><span>10个员工</span></p>
						</div>
				</div>
			</div>
			</label>
			<label>
			<div class="stm-cell  pro-unlock-list stm-m10-t">
				<div class="cell-warp">
						<div class="cell-left pro-unlock-tit">
								<radio value="A" name="unlock" />

						</div>
						<div class="cell-main pro-unlock-main">
							<p><span>C套餐</span><span>600元/年</span></p>
							<p><span>10个员工</span></p>
						</div>
				</div>
			</div>
			</label>
		</radio-group>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="over"> 支付 </button>
		</div>
	</div>
</template>

<script>
export default {

  name: 'pro-unlock-warp',

  data () {
    return {

    }
  },
  onLoad() {
  	wx.hideShareMenu();
  	wx.setNavigationBarTitle({
  	  title: '解锁'
  	})
  },
  methods: {
  	upvideo() {
  		wx.navigateTo({
  		  url: '/pages/Enterprise/Template/Unlock/Upvideo/main'
  		})
  	}
  }
}
</script>

<style lang="less" scoped>
@import '../../../../configs/cell.less';
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
.pro-unlock-warp{
	label{
		display:block;
		position:relative;
		.pro-unlock-list{
			padding-left:20px;
			padding-right:20px;
			background:#fff;
			.pro-unlock-main{
				display:block;
				font-size:@fonttwo;
				p{
					span{
						width:50%;
						display:block;
						float:left;
						&.upvideo{
							color:@maincolor;
						}
					}
					&:after{
						clear:both;
						display:block;
						content:''
					}
				}

			}

		}
		&:last-child:after{
			display:none;
		}
		&:after{
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			height:1px;
			background:#e8e8e8;
			width:100%;
		}
	}
}
</style>
