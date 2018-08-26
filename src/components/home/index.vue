<template>
	<div class="home-index-component">
		<swiper :indicator-dots="indicatorDots"
		:duration="duration" previous-margin="40px" next-margin="40px" @change="bindchange"  v-if="loding">
			<block>
				<swiper-item item-id="dd" :class="[swiperCurrent == showcards.length -(showcards.length +1)? 'active' : '']">
					<div class="swiper-box">
						<div class="box-main">
							<div class="clip box">
								<div class="title">
									<p>名片夹</p>
									<span>新世界<br/>从此无边界</span>
								</div>
								<div class="content">
									<p>共13位</p>
									<dl>
										<dt>
											<open-data type="userAvatarUrl" class="img" mode="widthFix"></open-data>
										</dt>
										<dd>
											<open-data type="userAvatarUrl" class="img" mode="widthFix"></open-data>
											<open-data type="userAvatarUrl" class="img" mode="widthFix"></open-data>
											<open-data type="userAvatarUrl" class="img" mode="widthFix"></open-data>
											<open-data type="userAvatarUrl" class="img" mode="widthFix"></open-data>
										</dd>
									</dl>
								</div>
							</div>
							<div class="box">
								<!-- <h5>我的活动</h5> -->
								<div class="li">
									<p @click="navigateTo">
										<i class="iconfont icon-nav_activity"></i>参与的活动
									</p>
									<p @click="navigateTo">
										<i class="iconfont icon-huodong"></i>发布的活动
									</p>
								</div>

							</div>
							<div class="m-nav">
								<ul>
									<li @click="information">
										<i class="iconfont icon-icon-test"></i>
										<p>消息</p>
									</li>
									<li @click="clockbtn">
										<i class="iconfont icon-kaoqindaqia"></i>
										<p>打卡</p>
									</li>
									<li @click="RecordisShowbtn">
										<i class="iconfont icon-riji"></i>
										<p>日记</p>
									</li>
									<li  @click="taggpiao">
										<i class="iconfont icon-kaipiaoguanli"></i>
										<p>开票</p>
									</li>
								</ul>
							</div>
							<div class="box" @click="more">
								<h5>我的更多...</h5>
							</div>
						</div>
					</div>
				</swiper-item>
			</block>
			<block v-for="(item,i) in showcards" :key="i">
				<swiper-item item-id="dd" :class="[swiperCurrent == i ? 'active' : '']">
					<div class="swiper-content" @click="card(item.id)">
						<img :src="item.img_url" class="img" mode="aspectFill">
						<h5>{{item.name}}</h5>
						<p>{{item.company}}</p>
						<span>{{item.position}}</span>
					</div>
				</swiper-item>
			</block>
			<block>
				<swiper-item item-id="dd" :class="[showcards.length == swiperCurrent? 'active' : '']">
					<div class="swiper-content" @click="newcard">
							<div class="imgno">
								<open-data type="userAvatarUrl" class="img"></open-data>
							</div>

							<i class="iconfont icon-tianjia"></i>
							<h6>创建新名片</h6>
					</div>
				</swiper-item>
			</block>
		</swiper>
		<div class="dots">
			<p v-for="(item,i) in dots" :class="[showcards.length -(showcards.length +1) == swiperCurrent? 'active' : '']" :key="i">
			</p>
			<p v-for="(item,i) in showcards" :class="[ swiperCurrent == i? 'active' : '']" :key="i">
			</p>
			<p v-for="(item,i) in dots" :class="[swiperCurrent == showcards.length? 'active' : '']" :key="i">
			</p>
		</div>
		<div class="share-card" >
			<p v-for="(item,i) in showcards" :key="i" v-if="swiperCurrent == i">
				<i class="iconfont icon-navicon-dxfs" @click="shareS(i)"></i>
				<span>发名片</span>
			</p>
		</div>
		<div class="share-card-main" v-if="share !== ''">
			<div class="swiper-content">
				<img :src="showcards[share].img_url" class="img" mode="aspectFill">
				<h5>{{showcards[share].name}}</h5>
				<p>{{showcards[share].company}}</p>
				<span>{{showcards[share].position}}</span>
			</div>
			<div class="nave">
				<h5>
					<i class="iconfont icon-tianjia"  @click="shareH"></i>
					<p>关闭</p>
				</h5>
				<ul>
					<li>
						<button open-type="share" :data-id="showcards[share].id" :data-name="showcards[share].name" :data-img="showcards[share].img_url"><i class="iconfont icon-huiyuan21"></i></button>
						<p>发名片</p>
					</li>
					<li @click="gocode">
						<i class="iconfont icon-xiaochengxu"></i>
						<p>名片码</p>
					</li>
					<li @click="gobanner">
						<i class="iconfont icon-guanggaowei"></i>
						<p>海报</p>
					</li>
				</ul>
			</div>
		</div>

		<clock-dialog :isShow="isShow" @close="clockbtn" v-if="isShow"></clock-dialog>
		<record-dialog :isShow="RecordisShow" @close="RecordisShowbtn" v-if="RecordisShow"></record-dialog>
		<div class="dialog-main clock-dialog enterprise-dialog" :class="{clockshow:piaoShow}">
			<div class="dialog-bg" @click="taggpiao"></div>
			<div class="dialog-content clock-content">
				<div class="title">开票/转账信息 <i @click="taggpiao" class="iconfont icon-guanbi"></i></div>
				<div class="main">
					<div class="stm-cell  edit-personal-list">
						<div class="cell-warp">
							<div class="cell-left edit-personal-tit">企业名称： </div>
							<div class="cell-main edit-personal-main">
								上海猫口袋信息科技有限公司
							</div>
						</div>
					</div>
					<div class="stm-cell  edit-personal-list">
						<div class="cell-warp">
							<div class="cell-left edit-personal-tit">税务登记号： </div>
							<div class="cell-main edit-personal-main">
								4324324234234
							</div>
						</div>
					</div>
					<div class="stm-cell  edit-personal-list">
						<div class="cell-warp">
							<div class="cell-left edit-personal-tit">单位地址： </div>
							<div class="cell-main edit-personal-main">
								上海市杨浦区带饭饭路29号
							</div>
						</div>
					</div>
					<div class="stm-cell  edit-personal-list">
						<div class="cell-warp">
							<div class="cell-left edit-personal-tit">电话： </div>
							<div class="cell-main edit-personal-main">
								021-55710889
							</div>
						</div>
					</div>
					<div class="stm-cell  edit-personal-list">
						<div class="cell-warp">
							<div class="cell-left edit-personal-tit">银行基本户账号： </div>
							<div class="cell-main edit-personal-main">
								34234234324324
							</div>
						</div>
					</div>
					<div class="stm-cell  edit-personal-list">
						<div class="cell-warp">
							<div class="cell-left edit-personal-tit">开户行： </div>
							<div class="cell-main edit-personal-main">
								中国建设银行上海徐汇分行
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import ClockDialog from '@/components/clock/index';
import RecordDialog from '@/components/record/index';
import configs from '@/utils/configs';
export default {
	name: 'home-index-component',
	components:{
		'clock-dialog': ClockDialog,
		'record-dialog': RecordDialog
	},
	data () {
		return {
			showcards:[],
			dots:[
				''
			],
			indicatorDots: false,
			duration: 500,
			swiperCurrent: -1,
			share:'',
			auth:Auth,
			isShow:false,
			RecordisShow:false,
			piaoShow:false,
			auther:false,
			loding:false,
		}
	},
	onLoad() {
		this.getcards()
	},
	onShow() {
		this.getcards()
	},
	onHide() {
	},

	methods: {
		shareS(i) {
			this.share = i;
		},
		shareH() {
			this.share = ''
		},
		getcards() {
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showcards`,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					this.showcards = d.data.data
					console.log(d)
					if(wx.getStorageSync('swiperCurrent') && wx.getStorageSync('swiperCurrent') != this.showcards.length) {
						this.swiperCurrent = -1
						wx.removeStorageSync('swiperCurrent')
					}else{
					}
					this.loding = true

				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 404){
					wx.hideLoading ();
					Auth.proxy.token = ''
					wx.removeStorageSync('token')
					// Auth.RefreshToken();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		gocode(){
			wx.navigateTo({
			  url: '/pages/Card/Code/main'
			})
						wx.removeStorageSync('swiperCurrent')

		},
		gobanner(){
			wx.navigateTo({
			  url: '/pages/Card/Banner/main'
			})
						wx.removeStorageSync('swiperCurrent')


		},
		bindchange(e){
			console.log(e)
			this.swiperCurrent = e.target.current - 1;
		},
		card(e){
			wx.navigateTo({
				url: '/pages/Home/show/main?id='+e,
			})
						wx.removeStorageSync('swiperCurrent')

		},
		newcard(){
			if(this.auth.proxy.token.is_new){
				 wx.navigateTo({
					url: '/pages/Home/basic/main',
				})
				wx.setStorageSync('swiperCurrent',this.showcards.length)
			}

		},
		navigateTo() {
			wx.navigateTo({
			  url: '/pages/Activity/main'
			})
						wx.removeStorageSync('swiperCurrent')

		},
		getLogin() {
			Auth.login();
		},
		more() {
			wx.navigateTo({
				url: '/pages/Enterprise/main',
			})
						wx.removeStorageSync('swiperCurrent')


		},
		clockbtn() {
			this.isShow =  !this.isShow;
		},
		information() {
			wx.navigateTo({
				url: '/pages/Information/index/main',
			})
						wx.removeStorageSync('swiperCurrent')


		},
		RecordisShowbtn() {
			this.RecordisShow = !this.RecordisShow
		},
		taggpiao() {
			this.piaoShow = !this.piaoShow
		},
	}
}
</script>

<style lang="less" scoped>
</style>
