<template>
	<!-- 打卡 -->
	<div class="dialog-main template-dialog">
		<div class="dialog-bg" @click="clockhidden"></div>
		<div class="dialog-content clock-content">
			<div class="title">添加团队</div>
			<div class="main">
				<p>输入加入团队口令</p>
				<input type="text" name="company" placeholder="输入口令" placeholder-style="color:#fff;"><button class="submit">查询</button>
				<p>世界健康团队</p>
				<button type="primary"  class="stm-main-button stm-m10-t" @click="clockhidden"> 申请加入 </button>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'dialog-template',

  data () {
    return {

    }
  },
  methods: {
  	clockhidden(){
  		this.$emit('clock')
  	}
  }
}
</script>

<style lang="less" scoped>
@import '../../configs/main.less';
@import '../../configs/dialog.less';
.template-dialog{
	.title{
		line-height:45px;
		font-size:@fontthree;
		text-align:center;
		border-bottom:1px dashed #ccc;
	}
	.main{
		font-size:@fonttwo;
		padding:20px;
		p{
			margin:4px 0;
		}
		input{
			background:@auxiliary;
			color:#fff;
			padding:5px;
			height:30px;
			border-radius:5px;
			display:inline-block;
			float:left;

		}
		.submit{
			width:80px;
			display:inline-block;
			margin-left:20px;
			height:40px;
		}
		div{
			width:100%;
			display:flex;
			textarea{
				width:100%;
				flex:1;
				height:90px;
				max-height:90px;
			}
		}
	}
}
</style>
