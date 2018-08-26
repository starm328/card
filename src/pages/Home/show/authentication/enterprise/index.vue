<template>
	<div class="show-indentity">
		<ul>
			<li>
				<p>已通企业认证</p>
				<i class="iconfont icon-qiyejianjie">
					<em class="iconfont icon-renzheng"></em>
				</i>
			</li>
		</ul>
		<dl>
			<dt>上海启烨网络安全技术有限公司</dt>
			<dd>注册资金：50.00万人民币</dd>
			<dd>成立时间：2011年08月17日</dd>
		</dl>
		<dl>
			<dt>注册号</dt>
			<dd>310115001864330</dd>
		</dl>
		<dl>
			<dt>社会信用代码</dt>
			<dd>91310115580613996X</dd>
		</dl>
		<dl>
			<dt>机构类型</dt>
			<dd>有限责任公司（自然人投资或控股）</dd>
		</dl>
		<dl>
			<dt>经营范围</dt>
			<dd>网络安全技术领域内的技术咨询、技术开发、技术转让、技术服务，网络工程、信息系统工程、电子科技的技术开发和技术服务，电子商务（不得从事增值电信、金融业务），电子产品、通讯设备、日用百货的销售，从事货物与技术的进出口业务。</dd>
		</dl>
		<dl>
			<dt>注册地址</dt>
			<dd>浦东新区联名路598-1号8幢106室</dd>
		</dl>
	</div>
</template>

<script>
export default {
	name: 'show-indentity',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'企业认证'
		})

	},
}
</script>

<style lang="less" scoped>
@import '../../../../../configs/style.less';

.show-indentity{
	min-height:100%;
	background:#fff;
	ul{
		margin:0 20px;
		padding-top:20px;
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
			background:#7f81bc;
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
					background:#7f81bc;
					border-radius:50%;
				}
			}

		}

	}
	dl{
		padding:20px;
		dt{
			font-size:@fonttwo;
			font-weight:bold;
			margin-bottom:5px;
		}
		dd{
			font-size:@fontone;
			color:@fontcolor;
		}
	}
}
</style>
