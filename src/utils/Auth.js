import configs from '@/utils/configs';
class AuthManager
{
	// 放在组件里用的
	proxy= {

		// 是否完成加载
		loaded: false,

		// 是否登录
		logined: false,

		// 平台用户
		user: undefined,

		// 主登录令牌
		token: undefined,

		// 所有登录令牌
		tokens: [],
	};
	constructor()
	{
		if(wx.getStorageSync('token') ) {
			this.proxy.token = wx.getStorageSync('token');
			this.proxy.loaded = true
			this.proxy.logined = true
		// 如果token过期刷新token
		}else{
			this.proxy.loaded = true
		}

	}

	login (e){
		wx.showLoading({
			mask: true,
			title: '加载中',
		})
		var _this = this;
		if(wx.getStorageSync('token')){
			this.refresh(wx.getStorageSync('token').access_token)
			wx.hideLoading();
		}else{
			wx.login({
				success: function(res) {
					wx.pro.request({
						url:  `${configs.card.apiBaseUrl}api/login/login/${res.code}/2`,
						method: 'POST',
						data: {
							iv:e.iv,
							data:e.encryptedData,
							userInfo:e.userInfo
						}
					})
					.then(d => {
						if(d.statusCode == 200){
							wx.hideLoading();
							_this.proxy.loaded =true
							_this.proxy.logined =true
							_this.proxy.token = d.data.data
							wx.setStorageSync('token',d.data.data)
						}
						// 2XX, 3XX
					})
					.catch(err => {
						wx.hideLoading();
						if(err.statusCode == 401){
							wx.hideLoading();
							wx.showToast({
								mask: true,
								title: '授权过期，重新登录',
								icon: 'none',
								duration: 2000
							})
						}else{
							wx.hideLoading();
							wx.showToast({
								mask: true,
								title: '登录失败重新登录',
								icon: 'none',
								duration: 2000
							})
						}

						// 网络错误、或服务器返回 4XX、5XX
					})

				}
			})
		}

	}

	refresh() {
		var _this = this;
		wx.pro.request({
			url:`${configs.card.apiBaseUrl}api/login/refresh/${wx.getStorageSync('token').access_token}`,
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == 200){
				_this.proxy.loaded =true
				_this.proxy.logined =true
				_this.proxy.token = d.data.data
				wx.setStorageSync('token',d.data.data)
			}
			// 2XX, 3XX
		})
		.catch(err => {
			if(err.statusCode == 404){
				wx.removeStorageSync('token')
				_this.proxy.token = ''
				_this.proxy.loaded =true
				_this.proxy.logined =false
			}
			// 网络错误、或服务器返回 4XX、5XX
		})
	}

	// 发送模板消息
	formid (formId) {
		var _this = this;
		if(_this.proxy.token.access_token){
			wx.pro.request({
				url:`${configs.card.apiBaseUrl}api/user/formid`,
				method: 'POST',
				data: {
					form_id:formId,
				},
				header: {
					token:_this.proxy.token.access_token
				}
			})
			.then(res => {
				console.log(res)
			})
			.catch(err=>{
				console.log(err)
			})
		}

	}
}
export default new AuthManager();
