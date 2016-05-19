/**
 * @ignore  ====================================================================
 * @fileoverview side
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2015-11-27
 * @ignore  depend angular
 * @ignore  ====================================================================
 */
var resetPwdDialog = require('../tpl/login/pc/resetPwdDialog.html'),
	loginSuccess = require('../tpl/login/pc/loginSuccess.html'),
	bindPhoneDialog = require('../tpl/login/pc/bindPhoneDialog.html'),
	loginDialog = require('../tpl/login/pc/loginDialog.html'),
	loginNot = require('../tpl/login/pc/loginNot.html'),
	registNextDialog = require('../tpl/login/pc/registNextDialog.html');
$(function() {
	var tpl = {
		loginDialog:'<div class="login-dialog dialog">'+
						'<div class="login-close close"></div>'+
						'<div class="dialog-bg">'+
							'<div class="login-bg big-bg">'+
								'<span class="login-btn">登录</span>'+
							'</div>'+
							'<div class="regist-bg small-bg">'+
								'<span class="regist-btn">注册</span>'+
							'</div>'+
						'</div>'+
						'<div class="login-fill-card">'+
							'<div class="login-card card login-show">'+
								'<div class="inputs">'+
									'<div class="login-phone-input">'+
										'<input type="tel" pattern="^\d{11}$" class="login-phone input long-input" id="login-phone" placeholder="仅支持中国大陆手机号" maxlength="11">'+
										'<i class="phone-status-icon"></i>'+
									'</div>'+
									'<input type="password" class="password input long-input" id="password" placeholder="密码" autocomplete="off">'+
									'<div class="forget-tips">'+
										'<a href="javascript:void(0)" class="forget-password">忘记密码</a>'+
										'<div class="tips"></div>'+
									'</div>'+
									'<div class="login-submit submit">登录</div>'+
								'</div>'+
								'<div class="other-login">'+
									'<div>第三方网站账号登录</div>'+
									'<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx5d417cd26ae2f339&redirect_uri=https%3A%2F%2Fxfz.cn&response_type=code&scope=snsapi_login" class="wx-login"></a>'+
								'</div>'+
							'</div>'+
							'<div class="regist-card card">'+
								'<div class="inputs">'+
									'<div class="regist-phone-input">'+
										'<input type="tel" pattern="^\d{11}$" class="regist-phone input long-input" id="regist-phone" placeholder="仅支持中国大陆手机号" maxlength="11">'+
										'<i class="phone-status-icon"></i>'+
									'</div>'+
									'<div class="verify">'+
										'<input type="tel" pattern="^\d{4}$" class="verify-code input short-input" id="verify-code" placeholder="验证码" maxlength="4" validate="^\d{4}$">'+
										'<input type="button" class="send-verify-code input-button short-button" id="send-verify-code" send="false" value="发送验证码">'+
									'</div>'+
									'<div class="tips-container">'+
										'<div class="tips regist-tips"></div>'+
									'</div>'+
									'<div class="next-submit submit">下一步</div>'+
								'</div>'+
								'<div class="other-login">'+
								'<div>第三方网站账号登录</div>'+
									'<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx5d417cd26ae2f339&redirect_uri=https%3A%2F%2Fxfz.cn&response_type=code&scope=snsapi_login" class="wx-login"></a>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="slider"></div>'+
					'</div>',

    	registNextDialog:'<div class="regist-next-dialog dialog">'+
							'<div class="regist-next-close close"></div>'+
								'<div class="dialog-title-bg">'+
									'<span>就差这一步</span>'+
								'</div>'+
								'<div class="fill-card">'+
									'<input type="text" class="realname input long-input" id="realname" placeholder="真实姓名">'+
									'<input type="password" class="regist-password input long-input" id="regist-password" placeholder="密码" minlength="6" maxlength="20" autocomplete="off">'+
									'<div class="tips-container">'+
										'<div class="tips resist-next-tips"></div>'+
									'</div>'+
									'<div class="next-complete">'+
									'<div class="regist-prev-submit submit">上一步</div>'+
									'<div class="regist-complete-submit submit">完成注册</div>'+
								'</div>'+
							'</div>'+
						'</div>',

		bindPhoneDialog:'<div class="bind-phone-dialog dialog">'+
							'<div class="bind-phone-close close"></div>'+
								'<div class="dialog-title-bg">'+
									'<span>绑定手机号</span>'+
								'</div>'+
								'<div class="fill-card">'+
									'<div class="bind-phone-input">'+
										'<input type="text" class="bind-phone-num input long-input" id="bind-phone-num" placeholder="仅支持中国大陆手机号">'+
										'<i class="phone-status-icon"></i>'+
									'</div>'+
									'<div class="bind-verify">'+
										'<input type="text" class="bind-fill-verify input short-input" id="bind-fill-verify" placeholder="验证码">'+
										'<input type="button" class="bind-send-verify input-button short-button" id="bind-send-verify" value="发送验证码">'+
									'</div>'+
									'<div class="tips bind-tips"></div>'+
										'<div class="bind-btn-submit submit">绑定</div>'+
									'</div>'+
									'<div class="bind-tips-card fill-card">'+
										'<div class="bind-tips">'+
										'<div class="phone-tips"><span>18842650358</span><span>已注册小饭桌</span></div>'+
										'<div class="bind-tips">是否绑定该手机号</div>'+
									'</div>'+
									'<div class="next-bind">'+
									'<div class="bind-cancel-submit submit">取消</div>'+
									'<div class="continue-bind-submit submit">继续绑定</div>'+
								'</div>'+
							'</div>'+
						'</div>',

		resetPasswordDialog:'<div class="reset-password-dialog dialog">'+
								'<div class="reset-password-close close"></div>'+
								'<div class="dialog-title-bg">'+
									'<span>修改密码</span>'+
								'</div>'+
								'<div class="fill-card fill-card-long">'+
									'<div class="reset-phone-input">'+
										'<input type="tel" pattern="^\d{11}$" class="reset-phone input long-input" id="reset-phone" placeholder="仅支持中国大陆手机号" maxlength="11">'+
										'<i class="phone-status-icon"></i>'+
									'</div>'+
									'<div class="reset-verify-btn">'+
										'<input type="tel" pattern="^\d{4}$" class="fill-reset-verify input short-input" id="fill-reset-verify" placeholder="验证码" maxlength="4" validate="^\d{4}$">'+
										'<input type="button" class="reset-send-verify input-button short-button" id="reset-send-verify" value="发送验证码" send="false">'+
									'</div>'+
									'<input type="password" class="fill-new-password input long-input" id="fill-new-password" placeholder="输入新密码" autocomplete="off">'+
									'<div class="tips-container">'+
										'<div class="tips reset-tips"></div>'+
									'</div>'+
									'<div class="conform-reset-submit submit">确定修改</div>'+
								'</div>'+
							'</div>',
		loginSuccess : 	'<div class="login-success-wrapper">'+
							'<div class="photo">'+
								'<%if(loginSuccessData.photo) {%>'+
			                    	'<img src="<%=loginSuccessData.photo%>">'+
			                    '<%}else{%>'+
			                    '<%}%>'+
			                '</div>'+
			                '<div class="name"><%=loginSuccessData.name%></div>'+
			            '</div>',

		loginNot:  	'<div class="login-false-wrapper">'+
						'<i class="icon"></i>'+
						'<a href="javascript:void(0)" id="login-btn">登录</a>'+
						'<b>/</b>'+
						'<a href="javascript:void(0)" id="regist-btn">注册</a>'+
					'</div>',
	};
	var mobileTpl = {

		loginRegist:'<div class="mobile-dialog login-regist">'+
				        '<div class="login-close close"></div>'+
				        '<div class="tab">'+
				            '<div class="login-btn btn active">登录</div>'+
				            '<div class="regist-btn btn">注册</div>'+
				        '</div>'+
				        '<div class="login-card card" data-show="true">'+
				            '<div class="logo"></div>'+
				            '<div class="tips-container">'+
				                '<div class="tips"></div>'+
				            '</div>'+
				            '<div class="login-phone-input">'+
				                '<input type="tel" pattern="^d{11}$" class="login-phone input long-input" id="login-phone" placeholder="仅支持中国大陆手机号" maxlength="11">'+
				                '<i class="phone-status-icon"></i>'+
				            '</div>'+
				            '<input type="password" class="password input long-input" id="password" placeholder="密码" autocomplete="off" minlength="6" maxlength="20">'+
				            '<div class="foget-pwd">忘记密码</div>'+
				            '<div class="login-submit">登录</div>'+
				        '</div>'+
				        '<div class="regist-card card" data-show="false">'+
				            '<div class="logo"></div>'+
				            '<div class="tips-container">'+
				                '<div class="tips"></div>'+
				            '</div>'+
				            '<div class="login-phone-input">'+
				                '<input type="tel" pattern="^d{11}$" class="login-phone input long-input" id="login-phone" placeholder="仅支持中国大陆手机号" maxlength="11">'+
				                '<i class="phone-status-icon"></i>'+
				            '</div>'+
				            '<div class="verify">'+
				                '<input type="tel" pattern="^d{4}$" class="verify-code input short-input" id="verify-code" placeholder="验证码" maxlength="4" validate="^d{4}$">'+
				                '<input type="button" class="send-verify-code input-button short-button btn-disable" id="send-verify-code" send="false" value="发送验证码">'+
				            '</div>'+
				            '<div class="regist-next submit" id="regist-next">下一步</div>'+
				       '</div>'+
				    '</div>',

	    fillMsg:'<div class="mobile-dialog fill-msg">'+
			        '<div class="close"></div>'+
			        '<div class="text">就差这一步</div>'+
			        '<div class="fill-card">'+
			            '<div class="logo"></div>'+
			            '<div class="tips-container">'+
			                '<div class="tips"></div>'+
			            '</div>'+
			            '<input type="text" class="realname input long-input" id="realname" placeholder="真实姓名">'+
			            '<input type="password" class="regist-password input long-input" id="regist-password" placeholder="密码" minlength="6" maxlength="20" autocomplete="off">'+
			            '<div class="next-complete">'+
			                '<div class="regist-prev-submit submit">上一步</div>'+
			                '<div class="regist-complete-submit submit">完成注册</div>'+
			            '</div>'+
			        '</div>'+
			    '</div>',

	    resetPassword: 	'<div class="mobile-dialog reset-password">'+
					        '<div class="reset-password-close close"></div>'+
					        '<div class="text">修改密码</div>'+
					        '<div class="fill-card fill-card-long">'+
					            '<div class="tips-container">'+
					                '<div class="tips reset-tips"></div>'+
					            '</div>'+
					            '<div class="reset-phone-input">'+
					                '<input type="tel" pattern="^\d{11}$" class="reset-phone input long-input" id="reset-phone" placeholder="仅支持中国大陆手机号" maxlength="11">'+
					                '<i class="phone-status-icon"></i>'+
					            '</div>'+
					            '<div class="reset-verify-btn">'+
					                '<input type="tel" pattern="^\d{4}$" class="fill-reset-verify input short-input" id="fill-reset-verify" placeholder="验证码" maxlength="4" validate="^\d{4}$">'+
					                '<input type="button" class="reset-send-verify input-button short-button" id="reset-send-verify" value="发送验证码" send="false">'+
					            '</div>'+
					            '<input type="password" class="fill-new-password input long-input" id="fill-new-password" placeholder="输入新密码" autocomplete="off">'+
					            '<div class="conform-reset-submit submit">确定修改</div>'+
					        '</div>'+
					    '</div>'
	};
	
	// 注册登录公共逻辑
	var loginComm = {
		// 初始化
		init: function() {
			this.getInfo();
		},

		// pc获取登录状态
		getInfo: function() {
			var _this = this;
			$.ajax({
				url: '/api/website/user/info/',
				type: 'get',
				dataType: 'json',
				success: function(res) {
					if(res.code == "200") {
						var loginSuccessRender = template.compile(tpl.loginSuccess),
							loginSuccessHtml = loginSuccessRender({
								loginSuccessData: res.data
							});
						$('.login-container').append(loginSuccessHtml);
						loginComm.logOut();
					}else{
						var loginNotRender = template.compile(tpl.loginNot),
							loginNotHtml = loginNotRender({});
						$('.login-container').append(loginNotHtml);
						_this.bind();
					}
				}
			});
		},

		// 移动登录状态检查
		touchGetInfo: function() {
			var _this = this;
			$.ajax({
				url: '/api/website/user/info/',
				type: 'get',
				dataType: 'json',
				success: function(res) {
					if(res.code != "200") {
						commet.init();
						mobileFun.init();
					}else{
						_this.bind();
					}
				}
			});
		},

		// 关闭按钮
		close: function() {
			var $close = $('.close'),
				$mask  = $('.login-mask');
			$close.on('click', function() {
				var $self = $(this);
				$mask.fadeOut(200, function() {
					$self.parent().remove();
				});
			});
		},
		// logout and resetPwd
		logOut: function() {
			// 登录成功后，点击头像出现注销和修改密码
			$('.login-success-wrapper').on('click', function(e) {
				e.stopPropagation();
				$('#logout').fadeIn(200);
				logoutFun.init();
				resetPwd.resetPwdBtn();
			});

			// 点击mask取消注销和修改密码
			$(document).on('click', function() {
				$('#logout').fadeOut();
			});
		},
		// 注册登录卡片切换
		switchCard: function() {
			$('.dialog-bg').on('click', 'div', function() {
				var $self = $(this);
				if($self.hasClass('small-bg')) {
					if($self.hasClass('login-bg')) {
						$('.slider').removeClass('bg-right').addClass('bg-left');
						$('.login-card').removeClass('login-hide').addClass('login-show')
							.siblings().removeClass('regist-show').addClass('regist-hide');
						loginFun.init();
					}else{
						$('.slider').removeClass('bg-left').addClass('bg-right');
						$('.regist-card').removeClass('regist-hide').addClass('regist-show')
							.siblings().removeClass('login-show').addClass('login-hide');
						registFun.init();
					}
					$self.removeClass('small-bg').addClass('big-bg')
							.siblings().removeClass('big-bg').addClass('small-bg');
				}
			});
		},
		// 事件绑定
		bind: function() {
			var _this = this;
			var $loginBtn     = $('#login-btn'),
				$registBtn    = $('#regist-btn'),
				$mask         = $('.login-mask');

			// 登录按钮
			$loginBtn.off().on('click', function() {
				var render = template.compile(tpl.loginDialog),
					html = render({});
				$mask.fadeIn(200, function() {
					$(this).html(html);
					loginFun.init();
					_this.switchCard();
				});
			});

			// 注册按钮
			$registBtn.on('click', function() {
				var render = template.compile(tpl.loginDialog),
					html = render({});
				$mask.fadeIn(200, function() {
					$(this).html(html);
					registFun.init();
					_this.switchCard();
				});
			});
			// 是否通过微信登录
		}
	};
	// 登录
	var loginFun = {
		// 初始化
		init: function() {
			loginComm.close();
			loginComm.bind();
			this.resetPwd();
			this.bind();
		},
		resetPwd : function() {
			// 忘记密码按钮
			$('.forget-password').off().on('click', function() {
				var render = template.compile(tpl.resetPasswordDialog),
					html = render({});
				$('.login-mask').fadeIn(200, function() {
					$('.login-mask').html(html);
					resetPwd.init();
				});
			});
		},
		// 登录事件绑定
		bind: function() {
			var _this = this;
			var $phone       = $('#login-phone'),
				$password    = $('#password'),
				$forgetPwd   = $('.forget-password'),
				$submit      = $('.login-submit'),
				$tips        = $('.forget-tips .tips'),
				$mask        = $('.login-mask'),
				$loginDialog = $('.login-dialog'),
				token        = $('.login-container input').val(),
				phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/;

			// 输入框获得焦点的时候改变字体颜色
			$loginDialog.on('focus', '.input', function() {
				var $self = $(this);
				$self.css({color: '#6D85AC'});
			}).on('blur', '.input', function() {
				var $self = $(this);
				if($self.hasClass('login-phone')) {
					if(!phoneReg.test($.trim($phone.val()))) {
						$('.login-card .phone-status-icon').fadeIn(0, function() {
							$(this).removeClass('success').addClass('false');
							$tips.html('手机号码不正确!').css({background: '#FED6E1'});
						});
						return false;
					}else{
						$('.login-card .phone-status-icon').fadeIn(0, function() {
							$(this).removeClass('false').addClass('success');
							$tips.html('').css({background: '#fff'});
						});
					}
				}else if($self.hasClass('password')) {
					if($.trim($password.val()).length > 20 || $.trim($password.val()).length <6) {
						$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
						return false;
					}else{
						$tips.html('').css({background: '#fff'});
					}
				}
			});
			// 登录按钮
			$submit.off().on('click', function() {
				if(!phoneReg.test($.trim($phone.val()))) {
					$tips.html('手机号码不正确!').css({background: '#FED6E1'});
					return false;
				}else if($.trim($password.val()).length > 20 || $.trim($password.val()).length <6) {
					$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
					return false;
				}else{
					$tips.html('').css({background: '#fff'});
					$.ajax({
						url: '/api/website/user/login/',
						type: 'POST',
						dataType: 'json',
						data: {
							csrfmiddlewaretoken: token,
							phone: $.trim($phone.val()),
							password: $.trim($password.val())
						},
						success: function(res) {
							if(res.code == "200") {
								$tips.html('').css({background: '#fff'});
								var loginSuccessRender = template.compile(tpl.loginSuccess),
									loginSuccessHtml = loginSuccessRender({
										loginSuccessData: res.data
									});
								$mask.fadeOut(200, function() {
									$loginDialog.remove();
									$('.login-false-wrapper').fadeOut(200, function() {
										$('.login-container').append(loginSuccessHtml);
										loginComm.logOut();
									});
								});
							}else{
								$tips.html(res.data.message).css({background: '#FED6E1'});
							}
						}
					});
				}
			});
		}
	};
	// 登出
	var logoutFun = {
		init : function() {
			this.bind();
		},

		bind: function() {
			// 退出登录
			$('#logout-btn').on('click', function() {
				$.ajax({
					url: '/api/website/user/logout/',
					type: 'GET',
					dataType: 'json',
					success: function(res) {
						if(res.code == "200") {
							location.reload();
						}else{
							alert(res.message);
						}
					}
				});
				
			});
		}
	};
	// 注册
	var registFun = {
		init: function() {
			loginComm.close();
			loginComm.bind();
			this.bind();
		},

		bind: function() {
			var $phone  = $('#regist-phone'),
				$verify = $('#verify-code'),
				$send   = $('#send-verify-code'),
				$submit = $('.next-submit'),
				$tips   = $('.regist-tips'),
				$registDialog = $('.regist-card'),
				$mask        = $('.login-mask'),
				token        = $('.login-container input').val(),
				phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/,
				verifyReg    = /^\d{4}$/,
				counter = 60,
				timer,sms;

			$send.removeClass('btn-able').addClass('btn-disable');
			$('.slider').removeClass('bg-left').addClass('bg-right');
			$('.regist-card').removeClass('regist-hide').addClass('regist-show')
				             .siblings().removeClass('login-show').addClass('login-hide');
			$('.regist-bg').removeClass('small-bg').addClass('big-bg')
				           .siblings().removeClass('big-bg').addClass('small-bg');

			// 输入框获得焦点的时候改变字体颜色
			$registDialog.off().on('focus', '.input', function() {
				var $self = $(this);
				$self.css({color: '#6D85AC'});
			}).on('blur', '.input', function() {
				var $self = $(this);
				if($self.hasClass('regist-phone')) {
					if(!phoneReg.test($.trim($phone.val()))) {
						$('.regist-card .phone-status-icon').fadeIn(0, function() {
							$(this).removeClass('success').addClass('false');
							$tips.html('手机号码不正确!').css({background: '#FED6E1'});
						});
						return false;
					}else{
						$('.regist-card .phone-status-icon').fadeIn(0, function() {
							$(this).removeClass('false').addClass('success');
							$tips.html('').css({background: '#fff'});
						});
					}
				}else if($self.hasClass('verify-code')) {
					if(!verifyReg.test($.trim($verify.val()))) {
						$tips.html('验证码格式不正确!').css({background: '#FED6E1'});
						return false;
					}else{
						$tips.html('').css({background: '#fff'});
					}
				}
			});

			// 手机号码校验	
			$phone.off().on('input', function() {
				var $self = $(this);
				if($send.attr('send') == "true") {
					return false;
				}else{
					if(!phoneReg.test($.trim($self.val()))) {
						$send.removeClass('btn-able').addClass('btn-disable');
						return false;
					}else{
						$('.regist-card .phone-status-icon').fadeIn(0, function() {
							$(this).removeClass('false').addClass('success');
							$send.removeClass('btn-disable').addClass('btn-able');
						});
					}
				}
			});

			// 验证码按钮
			$send.off().on('click', function() {
				var $self = $(this);
				if($self.hasClass('btn-disable')) {
					return false;
				}
				if($self.attr('send') == "true") {
					return false;
				}
				$.ajax({
					url: '/api/website/sms_captcha/',
					type: 'POST',
					dataType: 'json',
					data: {
						csrfmiddlewaretoken: token,
						phone: $.trim($phone.val())
					},
					success: function(res) {
						if(res.code == "200") {
							timer = setInterval(function() {
								counter--;
								if(counter > 0) {
									$send.val('发送验证码('+counter+')');
									$send.attr('send', true).removeClass('btn-able').addClass('btn-disable');
								}else{
									$send.val('发送验证码');
									$send.attr('send', false).removeClass('btn-disable').addClass('btn-able');
									clearInterval(timer);
								}
							}, 1000);
							registFun.bind();
						}
					}
				});
			});

			// 下一步按钮
			$submit.off().on('click', function() {
				// if($send.attr('send') == "false") {
				// 	return false;
				// }
				if( !phoneReg.test($.trim($phone.val())) ) {
					$tips.html('手机号码不正确!').css({background: '#FED6E1'});
					return false;
				}else if( !verifyReg.test($.trim($verify.val())) ) {
					$tips.html('验证码格式不正确!').css({background: '#FED6E1'});
					return false;
				}else{
					$.ajax({
						url: '/api/website/sms_captcha_check/',
						type: 'POST',
						dataType: 'json',
						data: {
							csrfmiddlewaretoken: token,
							phone: $.trim($phone.val()),
							sms_captcha: $.trim($verify.val())
						},
						success: function(res) {
							if(res.code == "200") {
								var registNextDialogRender = template.compile(tpl.registNextDialog),
									registNextDialogHtml = registNextDialogRender({});
								$('.login-mask').html(registNextDialogHtml);
								$('.regist-next-dialog').fadeIn(200);
								$tips.html('').css({background: '#fff'});
								registNext.init($.trim($verify.val()),$.trim($phone.val()));
							}else{
								$tips.html('验证码不正确!').css({background: '#FED6E1'});
								return false;
							}
						}
					});
					
				}
			});
		}
	};
	// 重置密码
	var resetPwd = {
		// 初始化
		init: function() {
			loginComm.close();
			this.bind();
		},

		// 重置密码按钮
		resetPwdBtn: function() {
			var _this = this;
			$('#reset-pwd-btn').on('click', function() {
				var render = template.compile(tpl.resetPasswordDialog),
					html = render({});
				$('.login-mask').fadeIn(200, function() {
					$('.login-mask').html(html);
					_this.init();
				});
			})
		},

		// 重置密码事件绑定
		bind: function() {
			var _this = this;

			var $phone       = $('#reset-phone'),
				$send        = $('#reset-send-verify'),
				$fillVerfify = $('#fill-reset-verify'),
				$newPwd      = $('#fill-new-password'),
				$dialog      = $('.reset-password-dialog'),
				$tips        = $('.reset-tips'),
				$submit      = $('.conform-reset-submit'),
				$mask        = $('.login-mask'),
				token        = $('.login-container input').val(),
				phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/,
				verifyReg    = /^\d{4}$/,
				counter = 60,timer;
			$send.removeClass('btn-able').addClass('btn-disable');
			// 手机号码校验	
			$phone.off().on('input', function() {
				var $self = $(this);
				$self.css({color: '#6D85AC'});
				if($send.attr('send') == "true") {
					return false;
				}else{
					if(!phoneReg.test($.trim($self.val()))) {
						$send.removeClass('btn-able').addClass('btn-disable');
						return false;
					}else{
						$send.removeClass('btn-disable').addClass('btn-able');
					}
				}
			});

			// 验证码按钮
			$send.off().on('click', function() {
				var $self = $(this);
				if($self.hasClass('btn-disable')) {
					return false;
				}
				if($self.attr('send') == "true") {
					return false;
				}
				$.ajax({
					url: '/api/website/sms_captcha/',
					type: 'POST',
					dataType: 'json',
					data: {
						csrfmiddlewaretoken: token,
						phone: $.trim($phone.val())
					},
					success: function(res) {
						if(res.code == "200") {
							timer = setInterval(function() {
								counter--;
								if(counter > 0) {
									$send.val('发送验证码('+counter+')');
									$send.attr('send', true).removeClass('btn-able').addClass('btn-disable');
								}else{
									$send.val('发送验证码');
									$send.attr('send', false).removeClass('btn-disable').addClass('btn-able');
									clearInterval(timer);
								}
							}, 1000);
							resetPwd.bind();
						}
					}
				});
			});

			// 验证码是否输入
			$fillVerfify.off().on('input', function() {
				$(this).css({color: '#6D85AC'});
			});

			// 新密码验证
			$newPwd.off().on('input', function() {
				$(this).css({color: '#6D85AC'});
			});

			// 确定按钮
			$submit.off().on('click', function() {
				if( !phoneReg.test($.trim($phone.val())) ) {
					$tips.html('手机号码不正确!').css({background: '#FED6E1'});
					return false;
				}else if( !verifyReg.test($.trim($fillVerfify.val())) ) {
					$tips.html('验证码格式不正确!').css({background: '#FED6E1'});
					return false;
				}else if( $.trim($newPwd.val()).length > 20 || $.trim($newPwd.val()).length <4) {
					$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
					return false;
				}else{
					$tips.html('').css({background: '#fff'});
					$.ajax({
						url: '/api/website/user/update_password/',
						type: 'POST',
						dataType: 'json',
						data: {
							csrfmiddlewaretoken: token,
							phone: $.trim($phone.val()),
							sms_captcha: $.trim($fillVerfify.val()),
							password: $.trim($newPwd.val())
						},
						success: function(res) {
							if(res.code == "200") {
								$mask.fadeOut(200, function() {
									$dialog.remove();
								});
							}
						}
					});
				}
			});
		}
	};
	// 注册的下一步
	var registNext = {
		init : function(sms, phoneNum) {
			loginComm.close();
			loginComm.bind();
			this.bind(sms,phoneNum);
		},
		bind: function(sms, phoneNum) {
			var $realname    = $('#realname'),
				$password    = $('#regist-password'),
				$prev        = $('.regist-prev-submit'),
				$completeBtn = $('.regist-complete-submit'),
				$tips        = $('.fill-card .tips'),
				$dialog      = $('.regist-next-dialog'),
				token        = $('.login-container input').val();

			$dialog.off().on('focus', '.input', function() {
				var $self = $(this);
				$self.css({color: '#6D85AC'});
			}).on('blur', '.input', function() {
				var $self = $(this);
				if($self.hasClass('realname')) {
					if($.trim($realname.val()).length > 15 || $.trim($realname.val()).length < 2) {
						$tips.html('姓名不能包含空格，长度在2~15之间!').css({background: '#FED6E1'});
						return false;
					}else{
						$tips.html('').css({background: '#fff'});
					}
				}else if($self.hasClass('regist-password')) {
					if($.trim($password.val()).length > 20 || $.trim($password.val()).length <4) {
						$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
						return false;
					}else{
						$tips.html('').css({background: '#fff'});
					}
				}
			});
			// 上一步
			$prev.off().on('click', function() {
				var loginDialogRender = template.compile(tpl.loginDialog),
					loginDialogHtml = loginDialogRender({});
				$('.login-mask').html(loginDialogHtml);
				$('.regist-next-dialog').fadeIn(200);
				registFun.init();
				loginComm.switchCard();
			});
			// 完成注册
			$completeBtn.off().on('click', function() {
				if($.trim($password.val()).length > 15 || $.trim($realname.val()).length < 2) {
					$tips.html('姓名不能包含空格，长度在2~15之间!').css({background: '#FED6E1'});
					return false;
				}if($.trim($password.val()).length == 0) {
					$tips.html('请填写姓名!').css({background: '#FED6E1'});
					return false;
				}else if($.trim($password.val()).length > 20 || $.trim($password.val()).length <4) {
					$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
					return false; 
				}if( $.trim($password.val()).length == 0 ) {
					$tips.html('请填写密码!').css({background: '#FED6E1'});
					return false;
				}else{
					$tips.html('').css({background: '#fff'});
					$.ajax({
						url: '/api/website/user/sign_up/',
						type: 'POST',
						dataType: 'json',
						data: {
							csrfmiddlewaretoken: token,
							phone: phoneNum,
							sms_captcha: sms,
							name: $.trim($password.val()),
							password: $.trim($password.val())
						},
						success: function(res) {
							if(res.code == "200") {
								$('.login-mask').fadeOut(200, function() {
									$dialog.remove();
								});
							}
						}
					});
				}
			});

		}
	};

	var commet = {
		init: function() {
			var render = template.compile(mobileTpl.loginRegist),
				html = render({});


		}
	};
	// 移动端的注册登录事件
	var mobileFun = {
		init : function() {
			this.showLogin();
		},
		showLogin: function() {
			var _this = this;
			var render = template.compile(mobileTpl.loginRegist),
				html = render({});
			$('.login-mask').fadeIn(100, function() {
				$(this).html(html);
				$('.login-card').show().data('show', true);
				$('.regist-card').hide();
				_this.bind();
				loginComm.close();
			})
		},
		// 重置密码
		fogetPwdBtn : function() {
			var _this = this;
			// 忘记密码按钮
			$('.foget-pwd').off().on('click', function() {
				var render = template.compile(mobileTpl.resetPassword),
					html = render({});
				$('.login-mask').html(html);
				loginComm.close();
				_this.resetPwdBind();
			});
		},
		// 重置密码事件绑定
		resetPwdBind: function() {
			var _this = this;

			var $phone       = $('#reset-phone'),
				$send        = $('#reset-send-verify'),
				$fillVerfify = $('#fill-reset-verify'),
				$newPwd      = $('#fill-new-password'),
				$dialog      = $('.reset-password-dialog'),
				$tips        = $('.reset-tips'),
				$submit      = $('.conform-reset-submit'),
				$mask        = $('.login-mask'),
				token        = $('.login-container input').val(),
				phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/,
				verifyReg    = /^\d{4}$/,
				counter = 60,timer;
			$send.removeClass('btn-able').addClass('btn-disable');
			// 手机号码校验	
			$phone.off().on('input', function() {
				var $self = $(this);
				$self.css({color: '#6D85AC'});
				if($send.attr('send') == "true") {
					return false;
				}else{
					if(!phoneReg.test($.trim($self.val()))) {
						$send.removeClass('btn-able').addClass('btn-disable');
						return false;
					}else{
						$send.removeClass('btn-disable').addClass('btn-able');
					}
				}
			});

			// 验证码按钮
			$send.off().on('click', function() {
				var $self = $(this);
				if($self.hasClass('btn-disable')) {
					return false;
				}
				if($self.attr('send') == "true") {
					return false;
				}
				$.ajax({
					url: '/api/website/sms_captcha/',
					type: 'POST',
					dataType: 'json',
					data: {
						csrfmiddlewaretoken: token,
						phone: $.trim($phone.val())
					},
					success: function(res) {
						if(res.code == "200") {
							timer = setInterval(function() {
								counter--;
								if(counter > 0) {
									$send.val('发送验证码('+counter+')');
									$send.attr('send', true).removeClass('btn-able').addClass('btn-disable');
								}else{
									$send.val('发送验证码');
									$send.attr('send', false).removeClass('btn-disable').addClass('btn-able');
									clearInterval(timer);
								}
							}, 1000);
							resetPwd.bind();
						}
					}
				});
			});

			// 验证码是否输入
			$fillVerfify.off().on('input', function() {
				$(this).css({color: '#6D85AC'});
			});

			// 新密码验证
			$newPwd.off().on('input', function() {
				$(this).css({color: '#6D85AC'});
			});

			// 确定按钮
			$submit.off().on('click', function() {
				if( !phoneReg.test($.trim($phone.val())) ) {
					$tips.html('手机号码不正确!').css({background: '#FED6E1'});
					return false;
				}else if( !verifyReg.test($.trim($fillVerfify.val())) ) {
					$tips.html('验证码格式不正确!').css({background: '#FED6E1'});
					return false;
				}else if( $.trim($newPwd.val()).length > 20 || $.trim($newPwd.val()).length <4) {
					$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
					return false;
				}else{
					$tips.html('').css({background: '#fff'});
					$.ajax({
						url: '/api/website/user/update_password/',
						type: 'POST',
						dataType: 'json',
						data: {
							csrfmiddlewaretoken: token,
							phone: $.trim($phone.val()),
							sms_captcha: $.trim($fillVerfify.val()),
							password: $.trim($newPwd.val())
						},
						success: function(res) {
							if(res.code == "200") {
								$mask.fadeOut(200, function() {
									$dialog.remove();
								});
							}
						}
					});
				}
			});
		},
		// 登录事件绑定
		loginBind: function() {
			var _this = this;
			var $phone       = $('#login-phone'),
				$password    = $('#password'),
				$submit      = $('.login-submit'),
				$tips        = $('.login-card .tips'),
				$mask        = $('.login-mask'),
				$loginDialog = $('.mobile-dialog'),
				token        = $('.login-container input').val(),
				phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/;

			// 输入框获得焦点的时候改变字体颜色
			$loginDialog.on('focus', '.input', function() {
				var $self = $(this);
				$self.css({color: '#6D85AC'});
			}).on('blur', '.input', function() {
				var $self = $(this);
				if($self.hasClass('login-phone')) {
					if(!phoneReg.test($.trim($phone.val()))) {
						$('.login-card .phone-status-icon').fadeIn(0, function() {
							$(this).removeClass('success').addClass('false');
							$tips.html('手机号码不正确!').css({background: '#FED6E1'});
						});
						return false;
					}else{
						$('.login-card .phone-status-icon').fadeIn(0, function() {
							$(this).removeClass('false').addClass('success');
							$tips.html('').css({background: '#fff'});
						});
					}
				}else if($self.hasClass('password')) {
					if($.trim($password.val()).length > 20 || $.trim($password.val()).length <6) {
						$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
						return false;
					}else{
						$tips.html('').css({background: '#fff'});
					}
				}
			});
			// 登录按钮
			$submit.off().on('click', function() {
				if(!phoneReg.test($.trim($phone.val()))) {
					$tips.html('手机号码不正确!').css({background: '#FED6E1'});
					return false;
				}else if($.trim($password.val()).length > 20 || $.trim($password.val()).length <6) {
					$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
					return false;
				}else{
					$tips.html('').css({background: '#fff'});
					$.ajax({
						url: '/api/website/user/login/',
						type: 'POST',
						dataType: 'json',
						data: {
							csrfmiddlewaretoken: token,
							phone: $.trim($phone.val()),
							password: $.trim($password.val())
						},
						success: function(res) {
							if(res.code == "200") {
								$tips.html('').css({background: '#fff'});
								var loginSuccessRender = template.compile(tpl.loginSuccess),
									loginSuccessHtml = loginSuccessRender({
										loginSuccessData: res.data
									});
								$mask.fadeOut(200, function() {
									$loginDialog.remove();
									$('.login-false-wrapper').fadeOut(200, function() {
										$('.login-container').append(loginSuccessHtml);
										loginComm.logOut();
									});
								});
							}else{
								$tips.html(res.data.message).css({background: '#FED6E1'});
							}
						}
					});
				}
			});
		},
		bind: function() {
			var _this = this;
			$('.login-regist .tab').on('click', 'div', function() {
				if($(this).hasClass('login-btn')) {
					if(!$('.login-card').data('show')) {
						$('.login-btn').addClass('active').siblings().removeClass('active');
						$('.regist-card').fadeOut(100,function() {
							$('.login-card').fadeIn(500).data('show',true);
							_this.fogetPwdBtn();
							_this.loginBind();
						}).data('show',false);
					}
				}else{
					if(!$('.regist-card').data('show')) {
						$('.regist-btn').addClass('active').siblings().removeClass('active');
						$('.login-card').fadeOut(100, function() {
							$('.regist-card').fadeIn(500).data('show',true);
						}).data('show',false);
					}
				}
			})
		}
	};


	var isPhone = {
		init: function() {
        	if(!this.isPc()) {
        		loginComm.touchGetInfo();
        	}else{
        		loginComm.init();
				header.init();
				footer.init();
        	}
		},
		isPc : function ()  {  
           	var userAgentInfo = navigator.userAgent;  
           	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
           	var flag = true;
           	for (var v = 0; v < Agents.length; v++) {  
               if (userAgentInfo.indexOf(Agents[v]) > 0) { 
               		flag = false; 
               		break; 
               }  
           	}
           	return flag;  
		}
	};
	// 判断是不是移动端
	isPhone.init();
});


