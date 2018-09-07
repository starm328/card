<template>
	<div class="home-warp">
		<div class="home-index">
			<div class="card-top">
					<div class="card-top-warp">

						<div class="card-top-bg" v-if="bg == 1" style="background:linear-gradient(#d95940, #bc8d45)"></div>
						<div class="card-top-bg"  v-if="bg == 2" style="background: linear-gradient(#1d8ae7, #11c9eb)"></div>
						<div class="card-top-bg"  v-if="bg == 3" style="background: linear-gradient(#cc9b63, #e4c199)"></div>
						<div class="card-top-content">
							<div class="skin" @click="showSkin"><img src="../../../static/images/skin.png" ></div>
							<dl>
								<dt><open-data type="userAvatarUrl" class="img"></open-data></dt>
								<dd>
									<h5><open-data type="userNickName"></open-data></h5>
									<p>职务信息未填写<span><i class="iconfont icon-msnui-edit"></i></span></p>
								</dd>
							</dl>
							<div class="other">
								<p><i class="iconfont icon-dianhua"></i>暂无电话号码 </p>
								<p><i class="iconfont icon-location"></i>暂无地址信息<span @click="lookcard">展开名片</span></p>
							</div>
						</div>
					</div>
					<ul class="card-top-nav">
						<li @click="goimg">
							<i class="iconfont icon-tupian"></i>
							<p>名片图片</p>
						</li>
						<li @click="gocode">
							<i class="iconfont icon-xiaochengxu"></i>
							<p>名片码</p>
						</li>
						<li @click="gobanner">
							<i class="iconfont icon-guanggaowei"></i>
							<p>名片海报</p>
						</li>
					</ul>

			</div>
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="cardeit"> 创建名片 </button>
			<button type="primary"  class="stm-main-button stm-m20-rl stm-m10-t" open-type="share"> 发名片 </button>
			<div class="home-index-text">
				<p>个人名片：可以绑定多个企业模版
				<p>企业名片：一次建设全员能用</p>
				<p>团队管理：适合群主、
				民间组织/自发团队。可以管理多个团队
				</p>

			</div>
		</div>
		<div class="home-footer">已经有122222拥有了 “我的全能名片”</div>
		<div class="skin-warp" :class="[isShow ? 'show':'hidden']">
			<h5>更换名片风格<span @click="showSkin">确定</span></h5>
			<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
				<div class="scroll-view-item_H" style="background:linear-gradient(#d95940, #bc8d45)" @click="selectbg(1)"></div>
				<div class="scroll-view-item_H" style="background: linear-gradient(#1d8ae7, #11c9eb)"  @click="selectbg(2)"></div>
				<div class="scroll-view-item_H" style="background: linear-gradient(#cc9b63, #e4c199)"  @click="selectbg(3)"></div>
			</scroll-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home-warp',
	data () {
		return{
			userInfo:'',
			bg:1,
			isShow:false
		}
	},
	onLoad() {

		wx.setNavigationBarTitle({
		  title: '我的名片'
		})
		// 查看是否授权
		wx.getSetting({

		  success: function(res){
		    if (res.authSetting['scope.userInfo']) {
		      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
		      wx.getUserInfo({
		        success: function(res) {
		          console.log(res.userInfo)
		        }
		      })
		    }else{
		    }
		  }
		})
	},
	onShareAppMessage (res) {
	  if (res.from === 'button') {
	    // 来自页面内转发按钮
	    console.log(res.target)
	  }
	  return {
	    title: '魏金海邀请你体验全能名片',
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
	onHide() {
		this.isShow =  false
	},
	methods:{
		showSkin() {
			this.isShow = !this.isShow
		},
		selectbg(i) {
			this.bg = i
		},
		bindGetUserInfo(e) {
			console.log(e.mp.detail.userInfo)
			this.userInfo = e.mp.detail.userInfo
		},
		cardeit(){
			wx.navigateTo({
			  url: '/pages/Card/Edit/main'
			})
		},
		goimg(){
			wx.navigateTo({
			  url: '/pages/Card/Img/main'
			})
		},
		gocode(){
			wx.navigateTo({
			  url: '/pages/Card/Code/main'
			})
		},
		gobanner(){
			wx.navigateTo({
			  url: '/pages/Card/Banner/main'
			})
		},
		lookcard() {
			wx.navigateTo({
			  url: '/pages/Card/main'
			})
		},


	},
	created () {

	}
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
@import '../../configs/main.less';
@import '../../configs/cartop.less';
.home-warp{
	height:100%;
	.home-index{

		min-height:calc(100% - 25px);
		.home-index-text{
			font-size:@fontone;
			padding:0 20px;
			text-align:left;
			color:@fontcolor;
			margin-top:40px;
		}
		.skin{
			img{
				width:30px;
				height:30px;
			}
			position:absolute;
			right:10px;
			top:10px;
		}

	}
	.home-footer{
		font-size:@fontone;
		width:100%;
		line-height:25px;
		text-align:center;
		color:#999
	}
	.skin-warp{
		background:#fff;
		position:fixed;
		bottom:0;
		width:100%;
		height:0;
		transition:height 0.2s;
		box-shadow: 0px -2px 9px 0px rgba(0, 0, 0, 0.1607843137254902);
		&.show{
			height:180px;
		}
		&.hidden{
			height:0;
		}

		h5{
			text-align:center;
			font-size:@fonttwo;
			line-height:45px;
			position:relative;
			span{
				float:right;
				margin-right:20px;
				position:absolute;
				right:10px;
				top:0;
				color:@maincolor;
			}
		}
		.scroll-view_H{
			white-space: nowrap;
		}


		ul{
			li{
				width:60px;
				height:60px;
				background:#ccc;
				border-radius:5px;
				float:left;
			}
		}
	}
}

</style>
