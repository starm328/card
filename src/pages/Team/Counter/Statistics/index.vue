<template>
	<div class="staistics-warp">
		<div class="staistics-Total">
			<h4>43434<p>参与人数</p></h4>
			<ul>
				<li>4344<p>参与次数</p></li>
				<li>4344<p>统计结果</p></li>
			</ul>
		</div>
		<div class="yd-preview">
			<div class="yd-preview-header">
				<div>人员</div>
				<div>某某人</div>
			</div>
			<div class="yd-preview-item">
				<div>标题</div>
				<div>某某标题</div>
			</div>
			<div class="yd-preview-item">
				<div>备注</div>
				<div>某某</div>
			</div>
			<div class="yd-preview-item">
				<div>时间</div>
				<div>1885</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'staistics-warp',

  data () {
    return {

    }
  },
  onLoad() {
  	wx.hideShareMenu();
  	wx.setNavigationBarTitle({
  	  title: '计数器统计 '
  	})
  },
}
</script>

<style lang="less" scoped>
@import '../../../../configs/yd-preview.less';
@import '../../../../configs/style.less';
.staistics-warp{
	.staistics-Total{
		background:@maincolor;
		h4{
			text-align:center;
			font-size:@fontfive;
			color:#fff;
			p{
				font-size:@fonttwo;
				opacity:0.5
			}
		}
		ul{
			margin-top:20px;
			padding-bottom:10px;
			li{
				width:calc(50% - 2px);
				float:left;
				text-align:center;
				font-size:@fonttwo;
				color:#fff;
				position:relative;
				p{
					opacity:0.5
				}
				&:first-child:after{
					position:absolute;
					content:'';
					display:block;
					right:0;
					top:10px;
					width:1px;
					height:20px;
					background:rgba(255,255,255,.3);
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
</style>
