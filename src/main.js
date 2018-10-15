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
		'pages/Home/product/main',
		'pages/Home/enterprise/main',
		'pages/Home/translate/main',
		'pages/Home/show/authentication/main',
		'pages/Home/show/authentication/identity/main',
		'pages/Home/show/authentication/enterprise/main',
		'pages/Home/show/authentication/legalperson/main',
		'pages/Home/show/authentication/bankcar/main',
		'pages/Home/basic/main',
		'pages/Home/senior/main',
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
		//消息
		'pages/Information/index/main',
		'pages/Information/list/main',
		'pages/Information/exchange/main',
		'pages/Information/system/main',
		'pages/Information/collection/main',
		'pages/Information/apply/main',
		'pages/Information/chat/main',
		'pages/Information/bonus/main',
		'pages/Information/member/main',
		'pages/Information/popularity/main',
		'pages/Information/reliable/main',
		'pages/Information/upgrade/main',
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
		'pages/Sign/main',
		'pages/Activity/main',
		//团队管理
		'pages/Team/main',
		'pages/Team/exploitees/main',
		'pages/Team/referress/main',
		'pages/Team/privilege/main',
		// 名片组
		'pages/group/collection/main',
		'pages/group/default/main',
		//人脉圈
		'pages/people/main',
		// 关于一生名片
		'pages/about/main',
		'pages/about/enter/main',
		'pages/about/guize/main',
		'pages/about/video/main',
		'pages/about/jieda/main',
		'pages/agreement/main'

		],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fa6b5b',
			navigationBarTitleText: '一生名片',
			navigationBarTextStyle: '#fff',
			navigationStyle:'custom'
		},
	}
}
