<template>
	<div class="about"  :style="'padding-top:'+navgationHeight+'px;min-height:100vh;'">
		<stm-nav></stm-nav>
		<h6>走进一生名片</h6>
		<div class="main">
			  一生名片，历时3年倾力打造，致力于给每一位创业者及企业打造一张互联网身份证，以生态社交为核心，前期基于小程序+AI技术开发，颠覆传统名片和企业官网，彻底打通企业管理者、销售与客户之间的关系，全方位提升企业销售及销售管理能力。为传统中小微企业及创业者量身打造，适用于所有创新品牌及传统实体。并为传统门店赋能，量身打造门店版名片电商，深入了解传统门店的销售模式痛点，通过“一张名片”赋能传统门店，为门店深度聚合线上线下流量，全方位破解传统门店获客、转化、运营难题，有效促成交易，提升销售业绩。<br/>
	一生名片能帮你实现三大价值：提升形象、推广品牌、拓展生意，特别适合连锁品牌、电商、传统零售、贸易、服务、制造、新农业、教育、咨询、创意、新媒体等企业或个人。以名片为入口、以移动互联网为载体的超级生意平台，超级个人和企业的流量自媒体分发平台，让你通过手机与全世界的人做生意。<br/>

一生名片为用户倾心打造的最in的名片商务社交工具！具有名片展示、名片设计、名片交换、云名片管理、企业版+门店版系统管理、AI智能分析数据管理、同步、分享以及人脉云端管理等等功能！优越的用户体验，便捷的手势操作，给手机用户以全新、愉悦、超in的超级自媒体AI智能名片。“针对商务人士移动互联的社交需求，全球独创的融合五大功能：“真实名片交换”、“轨迹浏览追踪”、“商务名片统一”、“名片DIY设计”“人脉云端管理”，通过独具匠心的用户体验，给手机用户以独特的享受。 <br/>
在互联网发展的前二十年中，我国的互联网行业处于由BAT把控主要命脉的消费互联网时代。然而随着虚拟化进程逐渐从个人转向企业，以价值经济为主要盈利模式的产业互联网将逐渐兴起。产业互联网的到来意味着各行业如酒店、旅游、制造、医疗、农业、交通、运输、教育的互联网化。产业互联网的商业模式有别于消费互联网的“眼球经济”，而是以“价值经济”为主，即通过传统企业与互联网的融合，寻求全新的管理与服务模式，为消费者提供更好的服务体验，创造出不仅限于流量的更高价值的产业形态。一生名片做为一家目标远大的创新企业，致力于成为中国最优秀的产业互联网+消费互联网生态运营商。

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
			title:'走进一生名片'
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
		color:#999
	}
}
</style>
