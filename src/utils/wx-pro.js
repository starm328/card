//wx-pro.js
import Promise from 'es6-promise';
function promisify() {
	wx.pro = {} // wx.pro 下面挂载着返回 promise 的 wx.API
	wx.pro.request = options => {
		return new Promise((resolve, reject) => {
					wx.request({
						url: options.url,
						method: options.method || 'GET',
						data: options.data,
						header:options.header,
						success: res => {
							if (res.statusCode >= 400) {
								reject(res)
							}
							else {
								resolve(res) // unwrap data
							}
						},
						fail: err => {
							console.error('wx.request fail [network]', options, err)
							reject(err)
						}
					})
				})
	}
}
promisify()
export default promisify
