<template>
	<div class="stm-input">
		<div class="input-cell">
			<div class="input-title" v-if="title"><span v-if="required">*</span>{{title}} :</div>
			<div class="input-value">
				<input :type="types" name="" :placeholder="'请输入'+placeholder" @input="getinput">
			</div>
			<div class="input-right" v-if="right"><i class="iconfont icon-arrow-right-copy-copy-copy"></i></div>
			<div class="input-right-slot" @click="code">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'input',
  props:{
  	right:{
  		type:Boolean,
  		default:false
  	},
  	title:{
  		type:Boolean,
  		default:false
  	},
  	placeholder:{
  		type:String,
  		default:''
  	},
  	required:{
  		type:Boolean,
  		default:false
  	},
  	types:{
  		type:String,
  		default:''
  	}
  },
  data () {
    return {
    }
  },

  methods: {
  	getinput(e) {
  		this.$emit('input',e)
  	},
  	code() {
  		this.$emit('code')
  	},
  	bindKeyInput(e) {
  		console.log(e)
  	}
  }
}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
.stm-input{
	position:relative;
	.input-cell{
		display:flex;
		position:relative;
		padding:15px 0;
		align-items:center;
		.input-title{
			margin-right:10px;
			font-size:@fonttwo;
			span{
				color:@noticefontcolor;
			}
		}
		.input-value{
			font-size:@fonttwo;
			flex:1;
			margin-right:25px;
		}
		.input-right{
			position:absolute;
			right:10px;
			i{
				color:@fontcolor;
			}
		}

	}
	&:last-child:after{
		display:none;
	}
	&:after{
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		height:1px;
		background:#e8e8e8;
		width:100%;
	}
}
</style>
