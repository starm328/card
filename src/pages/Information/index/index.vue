<template>
	<div class="information-index">
		<dl>
			<dt class="visit">
				<div class="icon">
					<i class="iconfont icon-icon-test"></i>
					<span>27</span>
				</div>
			</dt>
			<dd>
				<h6>被访提醒</h6>
				<p>某某访问了你的名片</p>
			</dd>
		</dl>
		<dl @click="exchange">
			<dt class="exchange">
				<div class="icon">
					<i class="iconfont icon-jiaohuan"></i>
				</div>
			</dt>
			<dd>
				<h6>名片交换</h6>
				<p><em>系统</em>某某申请与我交换名片</p>
			</dd>
		</dl>
		<button open-type="contact">
		<dl>
			<dt class="service">
				<div class="icon">
					<i class="iconfont icon-kefu"></i>
				</div>
			</dt>
			<dd>
				<h6>官方客服</h6>
				<p><em>系统</em>某某访问了你的名片</p>
			</dd>
		</dl>
		<dl>
			<dt class="img">
				<open-data type="userAvatarUrl" class="img"></open-data>
			</dt>
			<dd>
				<h6><open-data type="userNickName"></open-data><span>昨天</span></h6>
				<p>感谢你收藏了我的名片，我是<open-data type="userNickName"></open-data></p>
			</dd>
		</dl>
		<dl>
			<dt class="img">
				<open-data type="userAvatarUrl" class="img"></open-data>
			</dt>
			<dd>
				<h6><open-data type="userNickName"></open-data><span>2018/08/08</span></h6>
				<p>感谢你收藏了我的名片，我是<open-data type="userNickName"></open-data></p>
			</dd>
		</dl>
		</button>
	</div>
</template>

<script>
export default {
	name: 'information-index',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '消息盒子'
		})
	},
	methods: {
		exchange() {
			wx.navigateTo({
				url: '/pages/Information/exchange/main',
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';

.information-index{
	min-height:100vh;
	background:#fff;
	dl{
		padding:20px 20px 0 20px;
		display:flex;
		dt{
			width:50px;
			height:50px;
			margin-right:10px;
			border-radius:5px;
			text-align:center;
			line-height:50px;
			i{
				font-size:@fontt16;
				color:#fff;
			}
			&.img{
				border-radius:5px;
				overflow:hidden;
			}
			.icon{
				position:relative;
				span{
					font-size: 12px;
					position: absolute;
					top:-4px;
					right:-4px;
					display: inline-block;
					border-radius: 1000px;
					line-height: 1;
					padding: 3px 6px;
					white-space: nowrap;
					color:#fff;
					background:@maincolor
				}
			}
			&.visit{
				background:#27b152;
			}
			&.exchange{
				background:#6866d1
			}
			&.service{
				background:#f56d5b
			}
		}
		dd{
			h6{
				font-size:@fontt16;
				span{
					float:right;
					color:@fontcolor;
					font-size:@fonttwo;
				}
			}
			p{
				font-size:@fonttwo;
				color:@fontcolor;
				margin-top:3px;
				display:flex;
				overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;
				em{
					color:@maincolor;
					border:1px solid @maincolor;
					font-size:@fonttwo;
					margin-right:4px;
					border-radius:3px;
					padding:0 3px;
					display:inline-block;
				}
			}
		}
	}
	button{
		pading:0;
		text-align:initial;
		border:0;
		background:none;
		line-height:initial;
		padding:0;
		margin:0;
		&:after{
			display:none;
		}
	}
}
</style>
