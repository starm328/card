<template>
	<div class="show-authentication-box">
		<ul>
			<li @click="indentity">
				<p>已通过身份认证</p>
				<i class="iconfont icon-huiyuan21">
					<em class="iconfont icon-renzheng"></em>
				</i>
			</li>
			<li @click="bankcar">
				<p>已通过银行卡认证</p>
				<i class="iconfont icon-yinhangqia">
					<em class="iconfont icon-renzheng"></em>
				</i>
			</li>
			<li @click="enterprise">
				<p>已通过企业认证</p>
				<i class="iconfont icon-qiyejianjie">
					<em class="iconfont icon-renzheng"></em>
				</i>
			</li>
			<li @click="legalperson">
				<p>已通过企业法人认证</p>
				<i class="iconfont icon-renzheng">
					<em class="iconfont icon-renzheng"></em>
				</i>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'show-authentication-box',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'认证'
		})

	},
	methods:{
		indentity(){
			wx.navigateTo({
			  url: '/pages/Home/show/authentication/identity/main'
			})
		},
		bankcar(){
			wx.navigateTo({
			  url: '/pages/Home/show/authentication/bankcar/main'
			})
		},
		enterprise(){
			wx.navigateTo({
			  url: '/pages/Home/show/authentication/enterprise/main'
			})
		},
		legalperson(){
			wx.navigateTo({
			  url: '/pages/Home/show/authentication/legalperson/main'
			})
		},

	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/style.less';

.show-authentication-box{
	background:#242b35;
	min-height:100vh;
	ul{
		margin:0 20px;
		padding:20px 0;
		li{
			p{
				flex:1;
				font-size:@fonttwo;
				color:#fff;
				line-height:40px;
				text-indent:20px;
			}
			display:flex;
			width:100%;
			background:@maincolor;
			margin:20px auto;
			padding-top:80px;
			border-radius:5px;
			padding-bottom:5px;
			i{
				flex:1;
				text-align:right;
				margin-right:20px;
				font-size:@fontfive;
				position:relative;
				color:#fff;
				em{
					position:absolute;
					right:-1px;
					bottom:15px;
					font-size:13px;
					z-index:2;
					color:#fff;
					background:@maincolor;
					border-radius:50%;
				}
			}
			&:nth-child(2){
				background:#c28e40;
				em{
					background:#c28e40
				}
			}
			&:nth-child(3){
				background:#7f81bc;
				em{
					background:#7f81bc
				}
			}
			&:nth-child(4){
				background:#2fd2b1;
				em{
					background:#2fd2b1
				}
			}
		}
	}
}
</style>
