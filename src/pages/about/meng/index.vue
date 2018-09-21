<template>
	<div class="about"  :style="'padding-top:'+navgationHeight+'px;min-height:100vh;'">
		<stm-nav></stm-nav>
		<div class="main">
			<div class="guize">
				<h5>一生联盟</h5>
				城市盟主<br/>
				授予成立城市工作站，并授权担任盟主职务，协助总部拓展当地市场、管理团队、服务客户<br/>，并全面负责一生互推联盟在当地的落地事务。<br/>
				一、授权资格：<br/>
				* 一生名片城市工作站盟主<br/>
				* 一生互推联盟城市工作站盟主<br/>
				* 开展团队组建及代理商招募<br/>
				* 代表总部与当地政企开展交流合作<br/>
				* 其它与业务合作相关事务<br/>
				* 可指定13位副盟主协助你工作（城市区域片区负责人）<br/>
				* 可直接跨城市发起品牌互推活动<br/>
				* 可直接推举重要客户进入名人堂<br/>
				* 可在当地开展线下沙龙活动<br/>
				* 可直接参与总部重大发布会、年会<br/>
				二、特别权益<br/>
				凡是发生在你所在城市的零售订单，你可获得1%特别分成收益，客户归属城市的确认方式以客户使用的手机号码归属地为准。<br/>
				副盟主权益：<br/>
				*获总部直接授权、授牌<br/>
				*拥有参与城市巿场管理的权力<br/>
				*获得城市区域片区总零售额1%分成（客户归属城市片区的确认方式以客户注册时填写区域为准（如：上海市，浦东新区）<br/>
				*可跨城市发起平台活动<br/>
				*可申请其它城市共同发起<br/>
				三、资格要求：<br/>
				1、有能力完成5/10位代理商招募<br/>
				2、团队意识强，服从领导<br/>
				3、有较好的人脉及口碑<br/>
				4、有拿下本城市市场决心<br/>
				5、行动力执行力强<br/>
			</div>

		</div>
	</div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
	name: 'about',
	components: {
		'stm-nav':Nav
	},
	data () {
		return {
			navgationHeight:''
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'升级规则'
		})
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
	}
}
</script>

<style lang="less" scoped>
.about{
	img{
		width:100px;
		display:block;
		margin:0 auto;
	}
	h6{
		text-align:center;
		line-height:35px;
		font-size:18px;
		margin-top:10px;
	}
	.main{
		padding:20px;
		line-height:30px;
		font-size:15px;
		color:#999;
		.guize{
			background:#fff;
			margin-top:10px;
			padding:20px;
			h5{
				text-align:center;
				height:35px;
				line-height:35px;
				margin-bottom:20px;
				font-size:20px;
			}
			p{
				font-size:15px;
				margin-bottom:20px;
				line-height:20px;
				color:rgba(000,000,000,0.6)
			}
			span{
				font-size:15px;
				color:red;
			}
		}
	}
}
</style>
