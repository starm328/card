<template>
	<div class="from-basic-warp">
		<mpvue-picker ref="mpvuePicker" :pickerValueArray="pickerValueArray" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
		<div class="from-basic-from">
			<stm-input types="text" placeholder="公司名称（提交后不可修改）" title="公司名称" required >
			</stm-input>
			<div class="stm-cell  team-introduct-list">
				<div class="cell-warp">
					<div class="cell-left team-introduct-tit">人数规模：</div>
					<div class="cell-main team-introduct-main">
						<input @click="showPicker" :placeholder="prick != '' ? prick : '请选择人数规模'" disabled="" style="flex:1;">
					</div>
				</div>
			</div>
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
			<stm-input types="number" placeholder="手机号" title="手机号" required >
			</stm-input>
			<label>
				<checkbox value="" checked=""/>
				微课/微商/直销公司/培训 (大惊喜)
			</label>
		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl"  @click="photo"> 提交 </button>
		</div>
	</div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
import Input from '@/components/input/index';
export default {
	name: 'from-basic-warp',
	components:{
		'stm-input': Input,
		'mpvue-picker': mpvuePicker

	},
	data () {
		return {
			value:'',
			prick:'',
			pickerValueArray: ['5人以下', '5~10人', '10~20人', '20~50人', '50~100人'],
			pickerValueDefault: [1]
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title:'完善企业账号资料'
		})

	},
	created () {


	},
	methods: {
		showPicker() {
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			this.prick = this.pickerValueArray[e[0]]
		},
		photo(){
			wx.redirectTo({
			  url: '/pages/Enterprise/From/Photo/main'
			})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/style.less';
@import '../../../../configs/main.less';
@import '../../../../configs/cell.less';
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
		.team-introduct-tit{
			font-size:@fonttwo;
		}
		.team-introduct-main{
			font-size:@fonttwo
		}
	}
</style>
