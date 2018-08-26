<template>
	<div class="enterprise-index">
		<div class="enterprise-index-car">
			<!-- <dl>
				<dt>姓名：也之用</dt>
				<dt>贡献值：232323</dt>
				<dt>绑定模板：3个</dt>
				<dt>绑定群团队：5个</dt>
			</dl>
			<p>当前激活：上海猫口袋信息科技有限公司</p>
			<dl>
				<dt>被访问量：1个</dt>
				<dt>活动数量：1个</dt>
				<dt>当前活跃活动：1个</dt>
				<dt>参与人数：44人</dt>
			</dl> -->
			<div class="stm-cell  enterprise-top-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">
						<p>我的打卡<span @click="meclock">记录</span></p>
					</div>
					<div class="right-btn" @click="clockbtn">打卡</div>
				</div>
			</div>
			<div class="stm-cell  enterprise-top-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">
						<p>我的生活事件<span @click="record">记录</span></p>
					</div>
					<div class="right-btn" @click="RecordisShowbtn">记录</div>
				</div>
			</div>
			<!-- <div class="piao" @click="taggpiao"><i class="iconfont icon-fapiaoguanli"></i></div> -->
		</div>
		<clock-dialog :isShow="isShow" @close="clockbtn" v-if="isShow"></clock-dialog>
		<record-dialog :isShow="RecordisShow" @close="RecordisShowbtn" v-if="RecordisShow"></record-dialog>

		<!-- <div class="enterprise-menu">
			<ul>
				<li @click="BuildTemplate">自建模板</li>
				<li @click="dialogTempla">添加模板</li>
				<li  @click="Template">模板中心</li>
				<li>个人信息</li>
				<li @click="Enterprise">企业帐号</li>
				<li @click="Team">团队帐号</li>
			</ul>
		</div> -->
		<div class="enterprise-nav">
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp" @click="detailed">
					<div class="cell-left enterprise-tit">个人信息</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp" @click="enterprise">
					<div class="cell-left enterprise-tit">绑定企业</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp" @click="authentication">
					<div class="cell-left enterprise-tit">认证中心</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp" @click="JoinedTeam">
					<div class="cell-left enterprise-tit">团队管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">我的人脉</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list" >
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">账户管理</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
			<div class="stm-cell  enterprise-nav-list">
				<div class="cell-warp">
					<div class="cell-left enterprise-tit">帮助中心</div>
					<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
				</div>
			</div>
		</div>
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


		<dialog-template @clock="dialogTempla" v-if="show"></dialog-template>
		<button type="primary"  bindtap="primary" class="stm-main-button stm-m20-rl stm-m10-t" @click="cardeit"> 资助感恩父母行动联盟 </button>
	</div>
</template>

<script>
import Time from '@/components/time/index'
import DialogTempla from '@/components/dialogTemplate/index'
import ClockDialog from '@/components/clock/index'
import RecordDialog from '@/components/record/index'
var QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
export default {

	name: 'enterprise-warp',
	components: {
		'stm-time': Time,
		'dialog-template':DialogTempla,
		'clock-dialog': ClockDialog,
		'record-dialog': RecordDialog
	},
	data () {
		return {
			isShow:false,
			RecordisShow:false,
			piaoShow:false,
			newtime:'',
			show:'',
			address:''

		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '会员中心'
		})
	},
	created () {
		this.getTime();
	},
	methods:{
		taggpiao() {
			this.piaoShow = !this.piaoShow
		},
		record() {
			wx.navigateTo({
				url:'/pages/Enterprise/Record/main'
			})
		},
		meclock() {
			wx.navigateTo({
				url:'/pages/Enterprise/Meclock/main'
			})
		},
		dialogTempla() {
			this.show = !this.show
		},
		Enterprise(){
			wx.navigateTo({
			  url: '/pages/Enterprise/From/Basic/main'
			})
		},
		Team(){
			wx.navigateTo({
			  url: '/pages/Team/From/Basic/main'
			})
		},
		JoinedTeam(){
			wx.navigateTo({
			  url: '/pages/Team/Joined/main'
			})
		},
		authentication() {
			wx.navigateTo({
				url: '/pages/Home/authentication/main',
			})
		},
		detailed(){
			wx.navigateTo({
				url: '/pages/Home/detailed/main',
			})
		},
		enterprise() {
			wx.navigateTo({
				url: '/pages/Home/authentication/enterprise/main',
			})
		},

		Template(){
			wx.navigateTo({
			  url: '/pages/Card/Template/main'
			})
		},
		BuildTemplate(){
			wx.navigateTo({
			  url: '/pages/Card/Template/Build/main'
			})
		},
		clockbtn() {
			this.isShow =  !this.isShow;
		},
		RecordisShowbtn() {
			this.RecordisShow = !this.RecordisShow
		},
		getTime() {
			var _this = this
			var date = new Date();
			_this.newtime = date;
		},
	}
}
</script>

<style lang="less">
@import '../../configs/style.less';
@import '../../configs/main.less';
@import '../../configs/cell.less';
@import '../../configs/fonts.css';
@import '../../configs/dialog.less';
.enterprise-index{
	.main{
		.img{
			ul{
				display:flex;
				li{
					input{
						min-height:0;
					}
					flex:1;
					margin:0 5px;
					img{
						width:50px;

					}
				}
			}
		}
	}
	.clockshow{
		display:block;
		.stm-cell {
			font-size:@fonttwo;
			padding-left:10px;
		}
	}
	.record-dialog{
		display:none
	}
	.recordshow{
		display:block;
	}

	.enterprise-index-car{
		position:relative;

		.enterprise-top-list{
			margin:10px 0;
			position:relative;
			border-top:1px dashed #fff;
			padding:10px 0 0 0 ;
			.right-btn{
				position:absolute;
				right:0;
				top:50%;
				margin-top:-7px;
				background:@auxiliary;
				padding:4px 10px;
				font-size:@fonttwo;
				color:#fff;
				border-radius:5px;
			}
			&:after{
				display:none;
			}
			&:first-child{
					border:0;
			}

		}
		.piao{
			position:absolute;
			top:10px;
			right:10px;
			color:#fff;
			i{
				font-size:30px;
			}
		}
		width:90%;
		margin:10px auto;
		background:@maincolor;
		border-radius:4px;
		box-shadow:2px 12px 2px -10px @auxiliary;
		padding:10px;
		dl{
			dt{
				width:50%;
				float:left;
				color:#fff;
				font-size:@fonttwo;
			}
			&:after{
				clear:both;
				content:'';
				display:block;
			}
		}
		p{
			color:#fff;
			font-size:@fonttwo;
		}
	}
	.enterprise-nav{
		.enterprise-nav-list{
			background:#fff;
			padding:12px 0;
			position:relative;
			.enterprise-tit{
				font-size:@fonttwo;
				text-indent:20px;
			}
			i{
				display:block;
				flex:1;
				text-align:right;
				padding-right:20px;
				color:@fontcolor;
			}
		}
	}
	.enterprise-menu{
		background:#fff;
		margin-bottom:10px;
		padding:10px 0;
		ul{
			li{
				width:33.3%;
				float:left;
				text-align:center;
				font-size:@fonttwo;
				line-height:40px;
				position:relative;
				&:after{
					content:'|';
					position:absolute;
					right:0;
					color:@fontcolor;
				}
				&:nth-child(3n):after{
					display:none;
				}
			}
			&::after{
				clear:both;
				content:'';
				display:block;
			}
		}
	}
}

</style>
