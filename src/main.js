import Vue from 'vue'
import App from './App'
import wxpro from '@/utils/wx-pro.js';

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
	// 这个字段走 app.json
	config: {
	// 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
		pages: [
		'^pages/Home/index/main',
		'pages/Home/show/main',
		'pages/Home/share/main',
		'pages/Home/show/authentication/main',
		'pages/Home/show/authentication/identity/main',
		'pages/Home/show/authentication/enterprise/main',
		'pages/Home/show/authentication/legalperson/main',
		'pages/Home/show/authentication/bankcar/main',
		'pages/Home/basic/main',
		'pages/Home/Edit/basic/main',
		'pages/Home/billing/main',
		'pages/Home/detailed/main',
		'pages/Home/open/main',
		'pages/Home/jurisdiction/main',
		'pages/Home/authentication/main',
		'pages/Home/authentication/identity/main',
		'pages/Home/authentication/identity/form/main',
		'pages/Home/authentication/enterprise/main',
		'pages/Home/authentication/enterprise/form/main',
		'pages/Home/authentication/bankcard/main',
		'pages/Home/authentication/bankcard/form/main',
		'pages/Information/index/main',
		'pages/Information/exchange/main',
		'pages/index/main',
		'pages/Card/main',
		'pages/Card/Clip/main',
		'pages/Card/Code/main',
		'pages/Card/Img/main',
		'pages/Card/Banner/main',
		'pages/Card/Edit/main',
		'pages/Card/Share/main',
		'pages/Card/Share/Show/main',
		'pages/Card/Share/Item/main',
		'pages/Card/Edit/Personal/main',
		'pages/Enterprise/main',
		'pages/Enterprise/From/Basic/main',
		'pages/Enterprise/From/Photo/main',
		'pages/Enterprise/Show/main',
		'pages/Enterprise/Staff/main',
		'pages/Enterprise/Authorize/main',
		'pages/Enterprise/Clock/main',
		'pages/Enterprise/Meclock/main',
		'pages/Enterprise/Record/main',
		'pages/Enterprise/Finance/main',
		'pages/Enterprise/Template/main',
		'pages/Enterprise/Template/Introduce/main',
		'pages/Enterprise/Template/Product/main',
		'pages/Enterprise/AdmProduct/main',
		'pages/Enterprise/Template/Unlock/main',
		'pages/Enterprise/Template/Unlock/Upvideo/main',
		'pages/Card/Template/Build/main',
		'pages/Card/Template/main',
		'pages/Login/Code/main',
		'pages/Login/Name/main',
		'pages/Sign/main',
		'pages/Team/From/Basic/main',
		'pages/Team/From/Photo/main',
		'pages/Team/main',
		'pages/Team/Introduce/main',
		'pages/Team/Space/List/main',
		'pages/Team/Space/From/main',
		'pages/Team/Counter/main',
		'pages/Team/Counter/Statistics/main',
		'pages/Team/Joined/main',
		'pages/Team/Home/main',
		'pages/Activity/main',
		],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fa6b5b',
			navigationBarTitleText: '我的全能名片',
			navigationBarTextStyle: '#fff'
		},
		// tabBar:{
		// 	borderStyle: 'white',
		// 	selectedColor:'#fa6b5b',
		// 	// list:[
		// 	// 	// {
		// 	// 	// 	text:'我的名片',
		// 	// 	// 	pagePath:'pages/index/main',
		// 	// 	// 	iconPath:'static/images/mp.png',
		// 	// 	// 	selectedIconPath:'static/images/mp-active.png'
		// 	// 	// },
		// 	// 	// {
		// 	// 	// 	text:'名片夾',
		// 	// 	// 	pagePath:'pages/Card/Clip/main',
		// 	// 	// 	iconPath:'static/images/mpj.png',
		// 	// 	// 	selectedIconPath:'static/images/mpj-active.png'
		// 	// 	// },
		// 	// 	// {
		// 	// 	// 	text:'我的活动',
		// 	// 	// 	pagePath:'pages/Activity/main',
		// 	// 	// 	iconPath:'static/images/hd.png',
		// 	// 	// 	selectedIconPath:'static/images/hd-active.png'
		// 	// 	// },
		// 	// 	// {
		// 	// 	// 	text:'更多',
		// 	// 	// 	pagePath:'pages/Enterprise/main',
		// 	// 	// 	iconPath:'static/images/more.png',
		// 	// 	// 	selectedIconPath:'static/images/more-active.png'
		// 	// 	// }
		// 	// ]
		// }
	}
}
