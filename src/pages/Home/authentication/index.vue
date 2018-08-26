<template>
	<div class="authentication-index">
		<div class="authentication-index-box">
			<dl class="not" @click="open">
				<dt>
					<i class="iconfont icon-jinzhi"></i>
				</dt>
				<dd>
					<p>尚未开通</p>
				</dd>
			</dl>
		</div>
		<div class="authentication-index-box">
			<dl class="active" @click="identity">
				<dt>
					<i class="iconfont icon-renzhengyonghu"></i>
				</dt>
				<dd>
					<p>身份认证</p>
					<span>该项认证将证明您<br/>的真实身份</span>
					<div class="btn">
						已认证
					</div>
				</dd>
			</dl>
		</div>
		<div class="authentication-index-box">
			<dl @click="bankcard">
				<dt>
					<i class="iconfont icon-yinhangqia"></i>
				</dt>
				<dd>
					<p>银行卡认证</p>
					<span>该项认证将证明您是<br/>该银行卡的持有者</span>
					<div class="btn">
						立即认证
					</div>
				</dd>
			</dl>
		</div>
		<div class="authentication-index-box">
			<dl @click="enterprise">
				<dt>
					<i class="iconfont icon-qiyejianjie"></i>
				</dt>
				<dd>
					<p>企业法人、股东认证</p>
					<span>该项认证证明您是<br/>该企业的法人或股东</span>
					<div class="btn">
						立即认证
					</div>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
export default {

	name: 'authentication-index',
	onLoad() {
		wx.setNavigationBarTitle({
			title: '认证中心'
		})
	},
	data () {
		return {

		}
	},
	methods:{
		identity() {
			wx.navigateTo({
				url: '/pages/Home/authentication/identity/main',
			})
		},
		bankcard() {
			wx.navigateTo({
				url: '/pages/Home/authentication/bankcard/main',
			})
		},
		enterprise() {
			wx.navigateTo({
				url: '/pages/Home/authentication/enterprise/main',
			})
		},
		open(){
			wx.navigateTo({
				url: '/pages/Home/open/main',
			})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';

.authentication-index{
	.authentication-index-box{
		width:50%;
		float:left;
		&:nth-child(1){
			dl{
				background:@maincolor;
				color:#fff;
				dd{
					p{
						color:#fff;
					}
				}
			}
		}
		dl{
			width:90%;
			margin:0 auto;
			background:#fff;
			height:250px;
			border-radius:5px;
			margin-top:10%;
			text-align:center;
			&.active{
				dd{
					.btn{
						background:@maincolor;
					}
				}
			}
			&.not{
				dt{
					padding-top:60px;
					i{
						font-size:60px;
						margin-bottom:20px;
						color:#fff;
					}
				}
			}
			dt{
				width:100%;
				padding-top:30px;
				i{
					font-size:@fontsix;
					color:#ccc;
				}

			}
			dd{
				width:100%;
				p{
					margin:15px 0;
					font-size:@fontt16;
				}
				span{
					color:@fontcolor;
					font-size:@fonttwo;
					display:block;
				}
				.btn{
					font-size:@fonttwo;
					margin-top:30px;
					background:#ccc;
					color:#fff;
					display:inline-block;
					padding:5px 20px;
					border-radius:5px;
				}
			}
		}

	}
}
</style>
