<template>
	<div class="card-banner">
		<stm-poster-item v-for="(item,i) in bill" :key="i" :bill="item" :i="i" :cardData="cardData">

		</stm-poster-item>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';
import Item from '@/components/poster/item'

export default {

	name: 'card-banner',
	components: {
		'stm-poster-item': Item,
	},
	onLoad(option) {
		this.id = option.id
		this.getdata()

	},
	onSHow () {
		this.getdata()
	},

	data () {
		return {
			cardData:'',
			bill:'',
			dots:[
				''
			],
			swiperCurrent:0

		}
	},
	methods: {
		bindchange(e){
			if(e.target.source == 'touch'){
				this.swiperCurrent = e.target.current;
			}
		},
		getdata() {
			var _this = this;
			wx.showLoading({
			  title: '加载中',
			})
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/showcard/`+this.id,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading()
					console.log(d.data)
					_this.cardData = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading()
				if(err.statusCode == 404){
					wx.removeStorageSync('token')
					// if(Auth.proxy.token.access_token){
					// 	Auth.refresh(Auth.proxy.token.access_token);
					// 	this.getdata();
					// }
				}else if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})

			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/cardfirm/`+this.id,
				method: 'GET',
				header: {
					token:Auth.proxy.token.access_token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading()
					console.log(d.data)
					_this.bill = d.data[0].bill.split(',')
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading()
				if(err.statusCode == 404){
					wx.removeStorageSync('token')
					// if(Auth.proxy.token.access_token){
					// 	Auth.refresh(Auth.proxy.token.access_token);
					// 	this.getdata();
					// }
				}else if(err.statusCode == 500){
					wx.showToast({
						title: '系统错误',
						icon: 'none',
						duration: 2000,
					})
				}
				// 网络错误、或服务器返回 4XX、5XX
			})

		},

	}
}
</script>

<style lang="less" scoped>
.dots{
	position: absolute;
	width: 100%;
	z-index: 2;
	left: 0;
	top: 20px;
	pointer-events: none;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: end;
	-ms-flex-align: end;
	align-items: flex-end;
	-webkit-animation: slider-pagination-opacity .3s linear .4s forwards;
	animation: slider-pagination-opacity .3s linear .4s forwards;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	p{
		width:8px;
		height:8px;
		border-radius:50%;
		background:#eee;
		float:left;
		margin:0 4px;
		&.active{
			background:#3a4254;
		}
	}
}
</style>
