<template>
	<div class="share-warp">
		<div class="share-index">
			<div class="card-top card-share">
					<div class="card-top-warp">
						<div class="card-top-bg"></div>
						<div class="card-top-content">
							<dl>
								<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
								<dd>
									<h5><open-data type="userNickName"></open-data></h5>
									<p>上海猫口袋信息科技有限公司 </p>
									<p>互联网/电子商务 | 总经理</p>
								</dd>
							</dl>
							<div class="other">
								<p><i class="iconfont icon-dianhua"></i>暂无电话号码 </p>
								<p><i class="iconfont icon-location"></i>暂无地址信息</p>
							</div>
							<div class="save" v-if="save">已存</div>
							<div class="save" @click="savebtn" v-else>保存</div>
							<div class="play"><i class="iconfont icon-bofang"></i>38</div>
						</div>
					</div>
					<ul>
						<li>
							<i class="iconfont  icon-renqi"></i>
							<span>人气 2</span>
						</li>
						<li>
							<i class="iconfont icon-baocuntupian"></i>
							<span>保存 2</span>
						</li>
						<li>
							<i class="iconfont icon-shou"></i>
							<span>靠谱 2</span>
						</li>
					</ul>

			</div>
			<div class="card-main">
				<div class="card-enterprise">
					<h5 class="card-title">上海猫口袋信息科技有限公司</h5>
					<div class="enterprise-main">
						<dl>
							<dt>
								<open-data type="userAvatarUrl" class="img"></open-data>
							</dt>
							<dd>
								<ul>
									<li><i class="iconfont icon-dianhua"></i>51-100人 |</li>
									<li><i class="iconfont icon-dianhua"></i>1000万人民币</li>
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
				<i class="iconfont icon-79" @click="gohome"></i>
				<button type="primary"  plain class="stm-m20-rl" @click="cardeit"> 创建我的名片 </button>
				<button type="primary"  class="stm-main-button stm-m20-rl" @click="Preservation">存入通讯录</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	name: 'card-share',

	data () {
		return {
			save:true
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '某某的名片'
		})
	},
	created () {


	},
	methods:{
		save() {
			wx.showToast({
			  title: '已储存',
			  icon: 'success',
			  duration: 2000
			})
		},
		gohome() {
			wx.switchTab({
			  url: '/pages/index/main'
			})
		},
		cardeit(){
			wx.navigateTo({
			  url: '/pages/Card/Edit/main'
			})
		},
		lookshow(){
			wx.navigateTo({
			  url: '/pages/Card/Share/Show/main'
			})
		},
		Preservation(){
			wx.addPhoneContact({
				firstName: '王呵呵',   //名字
				mobilePhoneNumber: '123',    //手机号
				success(){
					wx.showToast({
					  title: '储存成功',
					  icon: 'success',
					  duration: 2000
					})
				},
				fail(){
					wx.showToast({
					  title: '储存失败',
					  icon: 'none',
					  duration: 2000
					})
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
@import '../../../configs/main.less';
@import '../../../configs/cartop.less';
.share-index{
	.card-top{
		.play{
			position:absolute;
			right:0;
			bottom:20px;
			background:@maincolor;
			border-radius:40px;
			padding:4px 20px 4px 4px;
			color:#fff;
			font-size:@fonttwo;
			line-height:30px;
			border-top-right-radius:0;
			border-bottom-right-radius:0;
			i{
				float:left;
				font-size:25px;
				color:#fff;
				margin-right:10px
			}
		}
		ul{
			padding-top:200px;
			margin-bottom:10px;
			li{
				i{
					font-size:@fonttwo;
					margin-right:10px;
				}
			}
		}
	}
	.card-main{
		padding-top:0;
	}
	.footer-nav i{
		font-size:30px;
		color:@maincolor;
		margin-left:10px;

	}
	.card-top-content {
		position:relative;
		.save{
			position:absolute;
			top:0;
			right:0;
			background:@maincolor;
			color:#fff;
			font-size:@fonttwo;
			padding:4px 10px;
			border-bottom-left-radius:9px;
		}
	}

}
</style>
