<template>
	<div class="team-space-list-warp">

		<div class="team-space-list-list">
			<ul class="pro-li">
				<li v-for="(item,index) in pro" :key="index" >
					<p v-if="item.lock"  >
						添加图1
						<i class="iconfont icon-suo"></i>
					</p>
					<p  @click="gofrom" v-if="!item.lock && item.src == ''">
						ABc社团
					</p>
					<p v-if="item.src !== ''" @click="gofrom">某某團隊</p>
					<span  v-if="item.lock ">待上传</span>
					<span  v-if="!item.lock && item.src == ''">待上传</span>
					<span  v-if="item.src != ''">修改 删除</span>
				</li>
			</ul>

		</div>


	</div>
</template>

<script>
export default {

	name: 'team-space-list-warp',

	data () {
		return {

			pro:[
				{
					src:'11',
					lock:false
				},
				{
					src:'',
					lock:true
				},
				{
					src:'',
					lock:true
				},
				{
					src:'',
					lock:true
				},
				{
					src:'',
					lock:true
				},
				{
					src:'',
					lock:true
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
		gofrom() {
			wx.navigateTo({
			  url: '/pages/Team/Space/From/main'
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/cell.less';
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
.team-space-list-warp{
	.team-space-list-list{
		.pro-li{
			padding:20px 0;
			li{
				width:33.3%;
				float:left;
				text-align:center;
				span{
					font-size:@fonttwo;
					line-height:40px;
				}
				p,img{
					width:60px;
					height:60px;
					margin:0 auto;
					background:@auxiliary;
					line-height:60px;
					font-size:@fonttwo;
					color:#fff;
					border-radius:5px;
					display:block;
					position:relative;
					i{
						position:absolute;
						right:0;
						top:0;
						color:@maincolor;
						line-height:0;
						display:inline-block;
					}
				}
			}
			&:after{
				content:'';
				display:block;
				clear:both;
			}
		}
		background:#fff;
		padding-left:20px;
		padding-right:20px;

	}
}
</style>
