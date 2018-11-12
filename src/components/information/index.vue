<template>
	<div class="information-index" :style="'padding-top:'+navgationHeight+'px'">

		<dl @click="exchange">
			<dt class="exchange">
				<div class="icon">
					<i class="iconfont icon-jiaohuan"></i>
					<span v-if="message > 0">{{message}}</span>
				</div>
			</dt>
			<dd>
				<h6>名片交换</h6>
				<p>请留意你的名片交换消息</p>
			</dd>
		</dl>

		<button open-type="contact">
		<dl>
			<dt class="service">
				<div class="icon">
					<i class="iconfont icon-riji"></i>
				</div>
			</dt>
			<dd>
				<h6>官方客服</h6>
				<p><em>系统</em>联系在线客服</p>
			</dd>
		</dl>
		</button>

		<dl  @click="system">
			<dt class="visit">
				<div class="icon">
					<i class="iconfont  icon-xiaolaba"></i>
				</div>
			</dt>
			<dd>
				<h6>系统消息</h6>
				<p><em>系统</em></p>
			</dd>
		</dl>
	</div>
</template>

<script>
export default {
	name: 'information-index',
	data () {
		return {
			navgationHeight:'',
			message:0
		}
	},
	onLoad() {
			if(wx.getStorageSync('showrequest') > 0 ) {
				this.message = wx.getStorageSync('showrequest')
			}else {
				this.message = 0
			}
			let startBarHeight = 20
			let navgationHeight = 44
			let that = this
			wx.getSystemInfo({
			  success: function (res) {
				if (res.model == 'iPhone X'){
				  startBarHeight = 44
				}
				that.navgationHeight= navgationHeight+startBarHeight
			  }
			})
	},
	onShow() {
		if(wx.getStorageSync('showrequest') > 0 ) {
			this.message = wx.getStorageSync('showrequest')
		}else {
			this.message = 0

		}
	},
	methods: {
		exchange() {
			wx.navigateTo({
				url: '/pages/Information/exchange/main',
			})
		},

		system() {
			wx.navigateTo({
				url: '/pages/Information/list/main',
			})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
.information-index{
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
			&.collection{
				background:rgb(255,165,0)
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
