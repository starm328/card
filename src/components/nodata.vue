<template>
	<div class="no-data-components">
		<i :class="['iconfont',icon]"></i>
		<em>{{content}}</em>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'no-data-components',
	props: {
		content:{
			type:String,
			default:'暂无相关数据',
		},
		icon:{
			type:String,
			default:'icon-kaipiaoguanli'
		},
	},
	data () {
		return {

		}
	}
}
</script>

<style lang="less" scoped>
.no-data-components{   padding-top: 40%;width: 100%;text-align: center;overflow: hidden;
	i{display: inline-block;font-size: 48px;width: 110px;height: 110px;line-height: 110px;background-color: #fff;border-radius: 100%;color: #ccc;}
	em{display: block;font-size: 16px;color: #666;margin:10px auto 0 auto;}
	p {display: block;padding: 10px 20px;font-size: 13px;color: #333;line-height: 16px;}
}
</style>
