<template>
	<div class="from-basic-warp">
		<div class="from-basic-from">
			<stm-input types="text" placeholder="组织名称" title="组织名称" required >
			</stm-input>
			<stm-input types="text" placeholder="用户名" title="用户名" required >
			</stm-input>
			<stm-input types="password" placeholder="密码" title="密码" required >
			</stm-input>
			<stm-input types="password" placeholder="重复密码" title="重复密码" required >
			</stm-input>
			<stm-input types="text" placeholder="邮箱" title="邮箱" required >
			</stm-input>
			<stm-input types="text" placeholder="负责人" title="负责人" required >
			</stm-input>
			<stm-input types="number" placeholder="负责人手机" title="负责人手机" required >
			</stm-input>
		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl"  @click="photo"> 提交 </button>
		</div>
	</div>
</template>

<script>
import Input from '@/components/input/index';
export default {
	name: 'from-basic-warp',
	components:{
		'stm-input': Input
	},
	data () {
		return {
			value:''
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title:'团队信息'
		})

	},
	created () {


	},
	methods: {
		photo(){
			wx.redirectTo({
			  url: '/pages/Team/From/Photo/main'
			})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
	.from-basic-warp{
		.from-basic-from{
			background:#fff;
			padding:0 20px;
			label{
				display:block;
				padding:15px 0;
				font-size:@fonttwo;
			}
		}
	}
</style>
