<template>
	<div class="about"  :style="'padding-top:'+navgationHeight+'px;min-height:100vh;'">
		<stm-nav></stm-nav>
		<div class="main">
			<div class="guize">
				<h5>一生联盟</h5>
				什么是“一生联盟商家”？<br/>
<br/>
				“一生联盟商家”是指：商家或企业的创始人己成为一生名片的联盟大使，且同意其所经<br/>营的商家或企业加入一生名片会员指定消费场所计划，同意给予一生名片会员以VIP礼遇、优惠政策、协议折扣等，同意在场地醒目位置张贴、悬挂、安装“一生名片会员VIP礼遇合作商家”宣传物料及灯箱。（宣传物料成本由合作商企自行承担，一生名片总部提供标准统一制成品，具体价格标准后续会发布）<br/>
<br/>
				加入“一生联盟合作商企”计划可获得以下权益：<br/>
<br/>
				1、商家免费加入一生名片平台指定合作商企目录，获得一生名片平台持续免费曝光推荐<br/>。<br/>
				2、获得一生名片平台在每座城市的高价值客户资源，帮助商家拓展客户，吸引人流。<br/>
				3、客户通过合作商家的店内二维码购买一生名片或平台产品，可获得利润分成。<br/>
				4、未来可优先加入“千城万店互联计划”，共享平台提供的各类合作赢利模式。<br/>
				5、未来所有一生名片的会员不管是线上还是线下所有的吃、住、行都可通过一生名片去<br/>消费享有折扣，积分置换消费，分享可获得利润分成，让所有的分享更有价值！<br/>
				运营中心有区域盟主、城市盟主、行业盟主席位等候社会各界人士前来抢占共谋发展！<br/>
<br/>
				1、如何成为城市区域盟主（城市区域合伙人）？<br/>
				   ①联盟大使直推100个联盟大使（当地城市）！<br/>
				   ②一线城市10万（赠送100个999联盟大使名额=99900元）<br/>
				           （赠送100个199VIP会员名额=19900元） <br/>
				             99900+19900=119800元（回本多赚19800元）<br/>
				   ③二线以下5万（赠送50个999联盟大使名额=49950元）（赠送50个199VIP会员名<br/>额=9950元）<br/>
				               49950+9950=59900元（回本多赚9900元）<br/>
				2、城市区域盟主奖励<br/>
				   当地城市区域总招商业绩的5%岗位津贴奖励。（VIP会员、联盟大使总销售总额）<br/>
<br/>
				3、城市盟主奖励<br/>
				   城市盟主是由各城市区域盟主PK，最优秀的1名会被评为当选城市盟主，按每月区域<br/>月绩考核为准，连续3个月蝉联冠军者可获得公司总部颁发的纯金微章1枚，并获得整个城市销售总额的3%的岗位津贴奖励。<br/>
<br/>
				4、城市盟主职责<br/>
				授予成立城市工作站，并授权担任盟主职务，协助总部拓展当地市场、管理团队、服务客<br/>户，并全面负责一生互推联盟在当地的落地事务。<br/>
				一、授权资格：<br/>
				* 一生名片城市工作站盟主<br/>
				* 一生互推联盟城市工作站盟主<br/>
				* 开展团队组建及代理商招募<br/>
				* 代表总部与当地政企开展交流合作<br/>
				* 其它与业务合作相关事务<br/>
				* 可指定13位区域盟主协助你工作<br/>
				* 可直接跨城市发起品牌互推活动<br/>
				* 可直接推举重要客户进入名人堂<br/>
				* 可在当地开展线下沙龙活动<br/>
				* 可直接参与总部重大发布会、年会<br/>
				二、特别权益<br/>
				凡是发生在你所在城市的零售订单，你可获得3%特别分成收益，客户归属城市的确认方<br/>式以客户使用的手机号码归属地为准。<br/>
				区域盟主权益：<br/>
				*获总部直接授权、授牌<br/>
				*拥有参与城市巿场管理的权力<br/>
				*获得城市区域片区总零售额5%分成（客户归属城市片区的确认方式以客户注册时填写<br/>区域为准（如：上海市，浦东新区）<br/>
				*可跨城市发起平台活动<br/>
				*可申请其它城市共同发起<br/>
				三、资格要求：<br/>
				1、有能力完成50/100位代理商招募<br/>
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
