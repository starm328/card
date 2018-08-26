<template>
	<div class="open-index">
		<div class="open-main">
			<div class="top">
				<i class="iconfont icon-renzhengyonghu"></i>
				<p>第三方认证费用</p>
				<h5>￥10.00</h5>
				<span>该费用已涵盖三个认证项目<br/>支持多手机号、多家企业、多张银行卡认证，<br/>
					后续更改认证不再收取费用
				</span>
			</div>
			<ul>
				<li>
					<p>
						<i class="iconfont icon-huiyuan21">
							<em class="iconfont icon-renzheng"></em>
						</i>
					</p>
				</li>
				<li>
					<p>
						<i class="iconfont icon-yinhangqia">
							<em class="iconfont icon-renzheng"></em>
						</i>
					</p>
				</li>
				<li>
					<p>
						<i class="iconfont icon-qiyejianjie">
							<em class="iconfont icon-renzheng"></em>
						</i>
					</p>
				</li>
			</ul>
			<div class="other">
				为了防止虚假身份欺诈，让你拥有安全的商务社交环境，平台为用户提供了实名身份认证功能，经过实名认证的用户，在名片上会醒目标识出认证图标，获得认证的名片可获得系统平台优先推荐，可使用更高级的商务功能及交易权限，平台鼓励用户已经过身份验证的用户交流感情、建立合作、开展业务。
			</div>
		</div>
		<div style="height:90px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="over">马上开通</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'open-index',
	data () {
		return {

		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/main.less';
@import '../../../configs/style.less';
.open-index{
	background:#212121;
	min-height:100%;
	.footer-nav{
		background:#000;
		box-shadow:0 -10px 13px #000;
	}
	.open-main{
		.top{
			text-align:center;
			padding-top:30px;
			i{
				color:#fff;
				font-size:60px;
				margin:0 auto 30px auto;
			}
			p{
				font-size:@fontone;
				color:#acb0bb
			}
			h5{
				color:@maincolor;
				font-size:@fontsix;
				line-height:80px;
			}
			span{
				font-size:@fontone;
				color:#acb0bb;
			}

		}
		ul {
			display:flex;
			width:70%;
			margin:30px auto;
			li{
				flex:1;
				text-align:center;
				&:nth-child(1) {
					i{
						color:@maincolor;
					}
				}
				&:nth-child(2) {
					i{
						color:#6e97db
					}
				}
				&:nth-child(3) {
					i{
						color:#2fd2b1
					}
				}
				i{
					color:#fff;
					font-size:@fontfive;
					position:relative;
					em{
						position:absolute;
						right:29px;bottom:-2px;
						font-size:@fontthree;
						z-index:2;
						background:#212121;
						border-radius:50%;
					}

				}
			}
		}
		.other{
			width:90%;
			margin:0 auto;
			color:#acb0bb;
			font-size:@fontone;
		}
	}
}
</style>
