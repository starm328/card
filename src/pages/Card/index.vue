<template>
	<div class="index-warp">
		<div class="card-index">
			<div class="card-top card-show">
					<div class="card-top-warp">
						<div class="card-top-bg"></div>
						<div class="card-top-content">
							<dl>
								<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
								<dd>
									<h5><open-data type="userNickName"></open-data></h5>
									<p>上海猫口袋信息科技有限公司 | 总经理</p>
									<p>互联网/电子商务 | 上海静安区</p>
								</dd>
							</dl>
							<ul>
								<li>
									<i class="iconfont icon-renqi"></i>
									<p>人气 2</p>
								</li>
								<li @click="Preservationbtn">
									<i class="iconfont icon-baocuntupian"></i>
									<p>保存 {{Preservation}}</p>
								</li>
								<li @click="Fabulousbtn">
									<i class="iconfont icon-shou"></i>
									<p>靠谱 {{Fabulous}}</p>
								</li>
							</ul>
						</div>
					</div>
			</div>
			<div class="card-main card-show-main">
				<div class="card-information">
					<h5 class="card-title">名片信息</h5>
					<div class="information-list">
						<ul :class="[isShow? 'show': 'hidden']">
							<li><i class="iconfont icon-dianhua"></i><span>18964941319</span></li>
							<li><i class="iconfont icon-location"></i><span>上海静安区</span></li>
						</ul>
						<p class="show-information" @click="showinformation" v-if="isShow">隐藏显示</p>
						<p class="show-information" @click="showinformation" v-else>展示全部</p>
					</div>
				</div>
				<div class="card-enterprise stm-m10-t">
					<h5 class="card-title">企业背景</h5>
					<div class="enterprise-main">
						<dl>
							<dt>
								<open-data type="userAvatarUrl" class="img"></open-data>
							</dt>
							<dd>
								<h5>上海猫口袋信息科技有限公司</h5>
								<ul>
									<li><i class="iconfont icon-wode"></i>51-100人 |</li>
									<li><i class="iconfont icon-wodezijin"></i>1000万人民币</li>
								</ul>
								<p class="content">上海猫口袋信息科技有限公司成立于2015年3月23日。上海猫口袋信息科技有限公司位于上海市长宁区</p>
							</dd>
						</dl>
						<p class="show-information" @click="lookshow"> 查看企业详情 ></p>
					</div>
				</div>
			</div>
			<div style="height:70px"></div>
			<div class="footer-nav">
				<button type="primary"  class="stm-main-button stm-m20-rl" open-type="share"> 发名片 </button>
			</div>
		</div>
	</div>
</template>

<script>
export default {

name: 'card-warp',

data () {
	return {
		isShow:false,
		Preservation:0,
		Fabulous:0,
	}
},
onShareAppMessage (res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: '1111',
    path: '/pages/Card/Share/main',
    success: function(res) {
      // 转发成功
      console.log('1')
    },
    fail: function(res) {
      // 转发失败
    }
  }
},
onLoad() {
	wx.hideShareMenu();
	wx.setNavigationBarTitle({
	  title: '我的名片'
	})
},
created () {


},
methods:{
	showinformation() {
		this.isShow = !this.isShow;
	},
	Preservationbtn() {
		this.Preservation++
	},
	Fabulousbtn() {
		this.Fabulous++
	},
	lookshow(){
		wx.navigateTo({
		  url: '/pages/Card/Share/Show/main'
		})
	},
}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
@import '../../configs/cartop.less';
.card-index{


}
</style>
