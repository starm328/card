<template>
	<div class="phone-compone">
		<div class="phone-bg"></div>
		<div class="phone-form">
			<div class="phone-top">

				<i class="iconfont icon-guanbi" @click="log"></i>
				<h5 v-if="hasCode && count !== 0">请输入验证码</h5>
				<h5 v-else-if="!hasCode && count == 0">请输入手机号码</h5>
				<p class="timeold" v-if="hasCode && count !== 0">{{count}}秒后重新发送</p>
				<p class="getCode" v-if="count == 0 && show" @click="_getCode">获取验证码</p>
				<div class="phone" v-if="!hasCode">
					<input type="hidden" name="phone" v-model="phone" style="display:none;">
					<p>{{phone}}</p>
				</div>
				<div class="code" v-if="hasCode">
					<ul>
						<input type="hidden" name="code" :value="Inputcode" style="display:none;">
						<li v-for="(item,i) in code" :key="i"><p>{{item}}</p></li>
					</ul>
				</div>
			</div>
			<div class="keyboard">
				<ul @click.stop='_handleKeyPress'>
					<li data-num='1'><p data-num='1' :class="[active[1]? 'active':'']" @touchstart="typing('1')">1</p></li>
					<li data-num='2'><p data-num='2' :class="[active[2]? 'active':'']" @touchstart="typing('2')">2</p></li>
					<li data-num='3'><p data-num='3' :class="[active[3]? 'active':'']" @touchstart="typing('3')">3</p></li>
					<li data-num='4'><p data-num='4' :class="[active[4]? 'active':'']" @touchstart="typing('4')">4</p></li>
					<li data-num='5'><p data-num='5' :class="[active[5]? 'active':'']" @touchstart="typing('5')">5</p></li>
					<li data-num='6'><p data-num='6' :class="[active[6]? 'active':'']" @touchstart="typing('6')">6</p></li>
					<li data-num='7'><p data-num='7' :class="[active[7]? 'active':'']" @touchstart="typing('7')">7</p></li>
					<li data-num='8'><p data-num='8' :class="[active[8]? 'active':'']" @touchstart="typing('8')">8</p></li>
					<li data-num='9'><p data-num='9' :class="[active[9]? 'active':'']" @touchstart="typing('9')">9</p></li>
					<li data-num='C'><span data-num='C' class="confirms">重输</span></li>
					<li data-num='0'><p data-num='0' :class="[active[0]? 'active':'']" @touchstart="typing('0')">0</p></li>
					<li data-num='S' v-if="phone.length == 11 && !hasCode"><span class="confirm" data-num='S'>确认</span></li>
					<li data-num='S' v-if="code.length == 4 && hasCode"><span class="confirm" data-num='S'>确认</span></li>
					<li data-num='D' v-if="phone.length !== 11 && !hasCode"><span class="confirm" data-num='D'>删除</span></li>
					<li data-num='D' v-if="code.length !== 4 && hasCode"><span class="confirm" data-num='D'>删除</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/utils/Auth';
import configs from '@/utils/configs';

export default {
	name: 'phone-compone',
	data () {
		return {
			phone:'',
			hasCode:false,
			code:[],
			Inputcode:'',
			count: '',
			timer: null,
			show:false,
			auth:Auth,
			active:[0,0,0,0,0,0,0,0,0,0,0,0,0],
		}
	},
	watch: {
		code(Newval,Oldval) {
			this.Inputcode = Oldval.join('')
		}
	},
	methods:{
		log() {
			this.$emit('log');
			this.phone= '';
			this.code=[];
			this.hasCode = false
		},
		/*输入*/
		typing(val) {
			this.active[val]=1
			setTimeout(()=>{
				this.active[val]=0
			},60)
		},
		_handleKeyPress(e) {
			let num = e.target.dataset.num;
			//不同按键处理逻辑
			// -1 代表无效按键，直接返回
			if (num == -1) return false;
			switch (String(num)) {
				//删除键
				case 'D':
					this._handleDeleteKey();
					break;
				//清空键
				case 'C':
					this._handleClearKey();
					break;
				//确认键
				case 'S':
					this._handleConfirmKey();
					break;
				default:
					if(num.length == 1){
						this._handleNumberKey(num);
					}
					break;
			}
		},
		_handleNumberKey(num) {
			if(this.hasCode){
				if(this.code.length < 4){
					this.code.push(num)
				}
			}else{
				var S = this.phone;
				if(this.phone.length < 11){
					this.phone = S+num
				}

			}
		},
		_handleClearKey() {
			if(this.hasCode){
				this.code = []
			}else{
				this.phone = ''
			}
		},
		//处理删除键
		_handleDeleteKey() {
			if(this.hasCode){
				let S = this.code;
				//如果没有输入，直接返回
				if (!S.length) return false;
				//否则删除最后一个
				// this.code = S.splice(S.length - 1, 1);
				this.code.splice(S.length - 1, 1)
			}else{
				let S = this.phone;
				//如果没有输入，直接返回
				if (!S.length) return false;
				//否则删除最后一个
				this.phone = S.substring(0, S.length - 1);
			}
		},
		_handleConfirmKey() {
			if(this.hasCode){
				wx.showLoading({
				  title: '注册中',
				  mask:true
				})
				var _this = this;
				wx.pro.request({
					url:  `${configs.card.apiBaseUrl}api/login/register`,
					method: 'POST',
					data: {
						phone: _this.phone,
						vcode: _this.Inputcode,
						access_token:_this.auth.proxy.token.access_token,
						// pass:'123456',
						pid:wx.getStorageSync('pid')?wx.getStorageSync('pid'):''
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading()
						wx.showToast({
							title: '注册成功',
							icon: 'success',
							duration: 2000,
							success:()=>{
								this.log()
							}
						})
					}
					// 2XX, 3XX
				})
				.catch(err => {
					wx.hideLoading()
					if(err.statusCode == 404){
						wx.showToast({
							mask: true,
							title: '登录超时',
							icon: 'none',
							duration: 2000,
							success:()=>{
								this.auth.proxy.token = ''
								wx.removeStorageSync('token')
							}
						})
						// Auth.RefreshToken();
					}else if(err.statusCode == 500){
						wx.showToast({
							mask: true,
							title: '系统错误',
							icon: 'none',
							duration: 2000,
						})
						// Auth.RefreshToken();
					}else if(err.statusCode == 403){
						wx.showToast({
							mask: true,
							title:err.data.message,
							icon: 'none',
							duration: 2000,
						})
						// Auth.RefreshToken();
					}else if(err.statusCode == 401){
						wx.showToast({
							mask: true,
							title:err.data.message,
							icon: 'none',
							duration: 2000,
						})
						// Auth.RefreshToken();
					}
					// 网络错误、或服务器返回 4XX、5XX
				})
				// wx.navigateTo({
				// 	url: '/pages/Home/basic/main',
				// })
			}else{
				this._getCodeto();
			}
		},
		_getCode(){
			this._getCodeto()

		},
		_getCodeto() {
			wx.showLoading({
			  title: '发送中',
			  mask:true
			})
			wx.pro.request({
				url:  `${configs.MobileEnd.apiBaseUrl}send-code`,
				method: 'POST',
				data: {
					mobile:this.phone,
					title:'一生名片'
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					  wx.hideLoading()
					this.hasCode = true;
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							 this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
							}
						}, 1000)
					}
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading()
				if(err.statusCode == 404){
					wx.showToast({
						mask: true,
						title: '登录超时',
						icon: 'none',
						duration: 2000,
						success:()=>{
							this.auth.proxy.token = ''
							wx.removeStorageSync('token')
						}
					})
					// Auth.RefreshToken();
				}else if(err.statusCode == 422){
					wx.showToast({
						mask: true,
						title: err.data.errors.mobile[0],
						icon: 'none',
						duration: 2000,
					})
					// Auth.RefreshToken();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	}

}
</script>

<style lang="less" scoped>
@import '../../configs/style.less';
.phone-compone{
	position:fixed;
	width:100%;
	height:100%;
	top:0;
	left:0;
	z-index:9999;
	.phone-bg{
		position:fixed;
		width:100%;
		height:100%;
		background:rgba(000,000,000,0.6);
	}
	.phone-form{
		width:80%;
		background:#fff;
		position:fixed;
		left:50%;
		margin-left:-40%;
		top:85px;
		border-radius:5px;
		.phone-top{
			position:relative;
			text-align:center;
			i{
				position:absolute;
				right:10px;
				top:10px;
				font-size:@fontfive;
				color:@fontcolor;
			}
			h5{
				padding-top:30px;
				font-size:@fontfive;
				text-align:center;

			}
			.timeold{
				text-align:center;
				background:#eee;
				display:inline-block;
				margin:0 auto;
				padding:3px 10px;
				font-size:@fontone;
				color:#999;
			}
			.getCode{
				background:@maincolor;
				color:#fff;
				border-radius:5px;
				display:inline-block;
				font-size:@fonttwo;
				padding:6px 10px;
				margin-top:50px;
			}
			.phone{
				p{
					height:50px;
					line-height:50px;
					font-size:30px;
					color:@maincolor;
					margin:20px 0;
				}
			}
			.code{
				ul{
					width:90%;
					margin:10px auto;
					height:50px;
					&:after{
						clear:both;
						display:block;
						content:'';
					}
					li{
						width:25%;
						float:left;
						text-align:center;
						height:50px;
						line-height:50px;
						p{
							width:40px;
							margin:0 auto;
							color:@maincolor;
							font-size:30px;
							border-bottom:2px solid #000;
						}
					}
				}
			}

		}
		.keyboard{
			ul{
				width:90%;
				margin:0 auto;
				padding:30px 0;
				&:after{
					clear:both;
					display:block;
					content:''
				}
				li{
					width:33.3%;
					float:left;
					text-align:center;
					margin-bottom:10px;
					p{
						width:65px;
						height:65px;
						border:1px solid #000;
						text-align:center;
						line-height:65px;
						font-size:@fontfive;
						margin:0 auto;
						border-radius:50%;
						&.active{
							background:#000;
						}
					}
					span{
						width:55px;
						height:55px;
						line-height:55px;
						font-size:@fonttwo;
						&.confirm{
							font-size:@fontfive;
							color:@maincolor
						}
						&.confirms{
							font-size:@fontfive;
						}
					}
				}
			}
		}
	}
}
</style>
