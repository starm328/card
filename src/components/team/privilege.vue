<template>
	<div class="privilege"  :style="'min-height:100vh;'">
		<div class="user-top">
			<div class="yd-step yd-step-theme2">
				<ul class="yd-step-content" style="color: #ff4c43;">
					<li class="yd-step-item" v-for="(item,i) in commission" :key="i" :class="[userid == item.id ? 'yd-step-item-current':'']" @click="getid(item.id)">
						<em></em>
						<div class="yd-step-item-top">
							<div class="yd-step-item-top-text">
								<span>
									<span>{{item.label}}</span>
								</span>
							</div>
						</div>
					</li>
				</ul>

			</div>
		</div>
		<div class="text" :key="i" v-if="userid == 97">
				<p>1、拥有Vip特权外，赠送1~3折商城运营资格  </p>
				<p>2、获得同等价值产品</p>
				3、直接分享收益的30%及裂变红包收益的10%
		</div>
		<div class="text" :key="i" v-else-if="userid == 96">
				<p>1、随意定制5张不同身份的超级自媒体名片 .蹭送2个私人定制带个人名片二维码的手机壳 </p>
				<p>2、拥有AI智能后台分析管理功能，能随时追踪用户的浏览轨迹及CRM管理系统 </p>
				<p>3、 共享平台千万商脉圈</p>
				<p>4、分享收益：直接分享一个Vip奖励70%佣金</p>
				<p>5、拥有升级联盟大使的资格 </p>
		</div>
		<div class="text" :key="i" v-else-if="userid == 95">
				<p>1、免费注册就可以随意定制5张不同身份的超级自媒体名片 </p>
				2、共享平台千万商脉圈
		</div>
	</div>
</template>

<script>

export default {
	name: 'privilege',
	data () {
		return {
			navgationHeight:'',
			commission:wx.getStorageSync('commission'),
			userid:'',
			id:''
		}
	},
	onLoad() {
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
		var commission = wx.getStorageSync('commission')
		var node = wx.getStorageSync('nodes')

		commission.forEach(exploitee=>{
			node.find(x=>{
				var data= commission.filter(function(item){
					return item.id == x.role;
				})
				that.userid = data[0].id
			})

		})
	},
	methods: {
		getid(id) {
			this.userid = id
		}
	}
}
</script>

<style lang="less" scoped>
.privilege{
	.text{
		padding:20px;
		color:#000;
		font-size:14px;
		p{
			margin-bottom:5px;
		}
	}
	.user-top {
		background: linear-gradient(#ff4c43, #fc8752);
		padding-top:90px;
		margin-bottom:10px;
		position:relative;
		.yd-step-theme2 .yd-step-content {
			padding: 42px 0;
		}
		.yd-step-content {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;

		}
		.yd-step-item {
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			-ms-flex: 1;
			flex: 1;
			position: relative;
			font-size:14px;

		}
		.yd-step-theme2 .yd-step-item-current>em {
			background-color: currentColor;
		}
		.yd-step-theme2 .yd-step-item>em {
			width: 10px;
			height: 10px;
			margin-left: -5px;
			margin-top: -5px;
		}
		.yd-step-item>em {
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: #fff;
		}
		.yd-step-theme2 .yd-step-item-top {
			bottom: 15px;
		}

		.yd-step-theme2 .yd-step-item-current .yd-step-item-top-text {
			display: inline-block;
			background-color: currentColor;
			padding: 5px 11px 3px;
			border-radius: 100px;
			position: relative;
			z-index: 1;
		}
		.yd-step-item-top {
			position: absolute;
			left: 0;
			text-align: center;
			white-space: nowrap;
			text-overflow: ellipsis;
			width: 100%;
			padding: 0 4px;
		}
		.yd-step-item-top-text>span {
			color: #fff;
		}
		.yd-step-theme2 .yd-step-item-bottom {
			top: 15px;
		}
		.yd-step-item-top {
			position: absolute;
			left: 0;
			text-align: center;
			white-space: nowrap;
			text-overflow: ellipsis;
			width: 100%;
			padding: 0 4px;
		}
		.yd-step-theme2 .yd-step-item:not(:first-child):before {
			width: 80%;
			left: -40%;
		}

		.yd-step-item:not(:first-child):before {
			content: "";
			height: 2px;
			position: absolute;
			top: -1px;
			background-color: #fff;
		}
		.yd-step-theme2 .yd-step-item-current>em:after {
			content: "";
			width: 0;
			height: 0;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-top: 6px solid currentColor;
			position: absolute;
			top: -10px;
			left: 50%;
			margin-left: -6px;
		}
	}
}
</style>
