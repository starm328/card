<template>
	<div class="adm-product">
		<div class="adm-product-list" style="padding-top:20px;">
			<ul class="pro-li">
				<li v-for="(item,index) in pro" :key="index" >
					<p v-if="item.lock" @click="unlock">
						添加图1
						<i class="iconfont icon-suo"></i>
					</p>
					<p  @click="product" v-if="!item.lock && item.src == ''">
						添加图2
					</p>
					<span  v-if="item.lock ">待上传</span>
					<span  v-if="!item.lock && item.src == ''">待上传</span>
					<span  v-if="item.src != ''">修改 删除</span>
				</li>
			</ul>

		</div>
	</div>
</template>

<script>
export default {

  name: 'adm-product',
  onLoad() {
  	wx.hideShareMenu();
  	wx.setNavigationBarTitle({
  	  title: '产品管理'
  	})
  },
  data () {
    return {
    	pro:[
    		{
    			src:'',
    			lock:false
    		},
    		{
    			src:'',
    			lock:true
    		},
    		{
    			src:'',
    			lock:true
    		},
    		{
    			src:'',
    			lock:true
    		},
    		{
    			src:'',
    			lock:true
    		},
    		{
    			src:'',
    			lock:true
    		}
    	]
    }
  },
  methods: {
  		product() {
  			wx.redirectTo({
  				url: '/pages/Enterprise/Template/Product/main'
  			})
  		}
  }
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
.adm-product{
	.adm-product-list{
		background:#fff;
	}
	.pro-li{
		li{
			width:33.3%;
			float:left;
			text-align:center;
			p,img{
				width:60px;
				height:60px;
				margin:0 auto;
				background:@auxiliary;
				line-height:60px;
				font-size:@fonttwo;
				color:#fff;
				border-radius:5px;
				display:block;
				position:relative;
				i{
					position:absolute;
					right:0;
					top:0;
					color:@maincolor;
					line-height:0;
					display:inline-block;
				}
			}
			span{
				font-size:@fonttwo;
				line-height:35px;
			}
		}
		&:after{
			content:'';
			display:block;
			clear:both;
		}
	}
}

</style>
