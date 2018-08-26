<template>
	<div class="information-exchange">
		<div class="list">
			<dl>
				<dt>
					<open-data type="userAvatarUrl" class="img"></open-data>
				</dt>
				<dd>
					<h6>
						<open-data type="userNickName"></open-data>
					</h6>
					<div class="company"><p>上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司</p><div class="img"><open-data type="userAvatarUrl"></open-data></div></div>
					<p>申请与我交换名片</p>
				</dd>
				<div class="btn" @click="grouping">
					<span>交换</span>
				</div>
			</dl>
			<dl>
				<dt>
					<open-data type="userAvatarUrl" class="img"></open-data>
				</dt>
				<dd>
					<h6>
						<open-data type="userNickName"></open-data>
					</h6>
					<div class="company"><p>上海猫口袋信息科技有限公司上海猫口袋信息科技有限公司</p><div class="img"><open-data type="userAvatarUrl"></open-data></div></div>
					<p>申请与我交换名片</p>
				</dd>
				<div class="btn over">
					<span>已交换</span>
				</div>
			</dl>
		</div>
		<div class="grouping"  v-if="groupingShow">
			<div class="bg" @click="groupingShow = false"></div>
			<div class="main">
				<div class="title">移动至</div>
				<scroll-view scroll-y style="height: 200px;">
					<dl>
						<dt>
							<i class="iconfont icon-tianjia"></i>
						</dt>
						<dd>
							<p>新建分组</p>
							<span>0</span>
						</dd>
					</dl>
					<dl>
						<dt>
							<open-data type="userAvatarUrl" class="img"></open-data>
						</dt>
						<dd>
							<p>默认分组</p>
							<span>13</span>
						</dd>
					</dl>
				</scroll-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'information-exchange',
	data () {
		return {
			groupingShow:false
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '名片交换'
		})
	},
	methods: {
		grouping() {
			this.groupingShow = true
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';

.information-exchange{
	.list{
		dl{
			width:80%;
			border-radius:10px;
			background:#fff;
			margin:20px auto 0 auto;
			display:flex;
			padding:15px;
			dt{
				width:60px;
				height:60px;
				border-radius:5px;
				overflow:hidden;
				margin-right:10px;
				.img{
					width:100%;
				}
			}
			dd{
				flex:1;
				h6{
					font-size:@fontt16;
				}
				.company{
					margin:2px 0;
					font-size:@fonttwo;
					display:flex;
					p{
						flex:1;
						overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
						font-size:@fonttwo;
						color:@fontcolor;
					}
					.img{
						width:20px;
						height:20px;
						border-radius:5px;
						overflow:hidden;
					}
				}
				p{
					overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
					font-size:@fonttwo;
					color:@fontcolor;

				}
			}
			.btn{
				width:90px;
				span{
					float:right;
					display:inline-block;
					border-radius:5px;
					text-align:center;
					font-size:@fonttwo;
					width:60px;
					line-height:30px;
					height:30px;
					background:@maincolor;
					color:#fff;
					margin-top:15px;
				}
				&.over{
					span{
						background:none;
						color:@maincolor
					}
				}
			}
		}
	}
	.grouping{
		.bg{
			position:fixed;
			bottom:0;
			width:100%;
			height:100%;
			background:rgba(000,000,000,0.5)
		}
		.main{
			position:fixed;
			bottom:0;
			background:#fff;
			border-top-left-radius:10px;
			border-top-right-radius:10px;
			overflow:hidden;
			width:100%;
			.title{
				width:100%;
				height:40px;
				line-height:40px;
				text-indent:10px;
				color:#000;
				background:#f1f1f1;
			}
			dl{
				display:flex;
				padding:5px;
				position:relative;
				border-bottom:1px solid #f1f1f1;
				dt{
					margin:10px;
					width:60px;
					height:60px;
					background:#f1f1f1;
					border-radius:10px;
					overflow:hidden;
					text-align:center;
					line-height:60px;
					i{
						color:@maincolor;
					}
				}
				dd{
					margin-top:10px;
					font-size:@fontthree;
					span{
						color:@fontcolor;
					}
				}
			}
		}
	}

}
</style>
