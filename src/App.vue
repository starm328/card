<script>
export default {
  created () {
  }
}
</script>

<style lang="css">
@import '../static/fonts/font.css';
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
page{
	height:100%;
	font-family: '微软雅黑'
}
.stm-warp{
	background:#eee;
	min-height: 100vh;
	padding-top:80px;
}
button.form_button{background-color:transparent;padding:0;margin:0;display:inline;position:static;border:0;padding-left:0;padding-right:0;border-radius:0;font-size:0rpx;color:transparent;text-align:inherit;}
button.form_button::after{content:'';width:0;height:0;-webkit-transform:scale(1);transform:scale(1);display:none;background-color:transparent;}
</style>
