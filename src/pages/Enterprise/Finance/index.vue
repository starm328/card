<template>
	<div class="finace-warp">
		<div class="stm-cell finace-warp-list">
			<div class="cell-warp">
				<div class="cell-left finace-warp-tit">企业名称：</div>
				<div class="cell-main finace-warp-main">
					<input type="text" name="" placeholder="上海猫口袋信息科技有限公司" >
				</div>
			</div>
		</div>
		<div class="stm-cell finace-warp-list">
			<div class="cell-warp">
				<div class="cell-left finace-warp-tit">税务登记号：</div>
				<div class="cell-main finace-warp-main">
					<input type="text" name="" placeholder="请输入税务登记号" >
				</div>
			</div>
		</div>
		<div class="stm-cell finace-warp-list">
			<div class="cell-warp">
				<div class="cell-left finace-warp-tit">单位地址：</div>
				<div class="cell-main finace-warp-main">
					<input type="text" name="" placeholder="请输入单位地址" >
				</div>
			</div>
		</div>
		<div class="stm-cell finace-warp-list">
			<div class="cell-warp">
				<div class="cell-left finace-warp-tit">电话：</div>
				<div class="cell-main finace-warp-main">
					<input type="text" name="" placeholder="请输入电话" >
				</div>
			</div>
		</div>
		<div class="stm-cell finace-warp-list">
			<div class="cell-warp">
				<div class="cell-left finace-warp-tit">银行基本户账号：</div>
				<div class="cell-main finace-warp-main">
					<input type="text" name="" placeholder="请输入银行基本户账号" >
				</div>
			</div>
		</div>
		<div class="stm-cell finace-warp-list">
			<div class="cell-warp">
				<div class="cell-left finace-warp-tit">开户行：</div>
				<div class="cell-main finace-warp-main">
					<input type="text" name="" placeholder="请输入开户行" >
				</div>
			</div>
		</div>
		<div style="height:70px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="over"> 提交 </button>
		</div>
	</div>
</template>

<script>
export default {

  name: 'finace-warp',
  onLoad() {
  	wx.hideShareMenu();
  	wx.setNavigationBarTitle({
  	  title: '财务信息'
  	})
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../configs/cell.less';
@import '../../../configs/style.less';
@import '../../../configs/main.less';
.finace-warp{
	.finace-warp-list{
		font-size:@fonttwo;
		background:#fff;
		padding-left: 10px;
	}
}
</style>
