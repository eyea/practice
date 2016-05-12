/**
 * @ignore  ====================================================================
 * @fileoverview pc登录逻辑
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2016-04-16
 * @ignore  depend angular
 * @ignore  ====================================================================
 */

// 模板文件
var loginSuccessTpl = require('../tpl/login/pc/loginSuccess.html'),
	bindPhoneDialogTpl = require('../tpl/login/pc/bindPhoneDialog.html'),
	loginDialogTpl = require('../tpl/login/pc/loginDialog.html'),
	loginNotTpl = require('../tpl/login/pc/loginNot.html'),
	registNextDialogTpl = require('../tpl/login/pc/registNextDialog.html'),
	resetPwdDialogTpl = require('../tpl/login/pc/resetPwdDialog.html');

var loginComm = {
	// 初始化
	init: function() {
		var url = location.href;
		if(url.indexOf('code')>0) {
			this.getWxInfo();
		}else{
			this.getInfo();
		}
	},
	// 微信获取用户信息
	getWxInfo: function() {
		var _this = this;
		var code = _this.parseQueryString(location.href).code;
		$.ajax({
			url: '/api/website/weixin/check/',
			type: 'get',
			dataType: 'json',
			beforeSend: function() {
				$('.login-mask').fadeIn(300,function() {
					$(this).append('<div class="login-loading"></div>')
				});
			},
			data: {
				code: code
			},
			success: function(res) {
				if(res.code == "200") {
					if(!res.data.is_bind) {
						var loginNotRender = template.compile(loginNotTpl),
							loginNotHtml = loginNotRender({});
						$('.login-container').append(loginNotHtml);
						$('.open-comm .photo-name').hide();
						var render = template.compile(bindPhoneDialogTpl),
							html = render({});
						$('.login-mask').html(html);
						$('.bind-tips-card').fadeOut(50, function() {
							$('.is-bind-check').fadeIn(100);
						});
						_this.bind();
						bindPhone.init(code);
					}else{
						if(location.href.indexOf('code')) {
								location.href = "http://" + location.host;
							}else{
								location.href = location.href;
							}
					}
				}else{
					if(location.href.indexOf('code')) {
								location.href = "http://" + location.host;
							}else{
								location.href = location.href;
							}
				}
			}
		});
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
					var name = (res.data.name.length > 6) ? res.data.name.substring(0,6)+'...' : res.data.name;
					var loginSuccessRender = template.compile(loginSuccessTpl),
						loginSuccessHtml = loginSuccessRender({
							loginSuccessData: res.data,
							loginName : name
						});
					$('.login-container').append(loginSuccessHtml);
					if($('.open-comm .photo-name')) {
                		$('.open-comm .photo-name').show(0, function() {
	                        $('.photo-name-submit .photo img').attr('src', res.data.photo)
	                        $('.photo-name-submit .name').html(res.data.name);
	                    });
                	}
					_this.logOut();
					window.loginState = 1;
				}else{
					var loginNotRender = template.compile(loginNotTpl),
						loginNotHtml = loginNotRender({});
					$('.login-container').append(loginNotHtml);
					$('.open-comm .photo-name').hide();
					_this.bind();
					window.loginState = 0;
				}
			}
		});
	},
	parseQueryString : function(url) {  
	    var str = url.split("?")[1], items = str.split("&");  
	    var result = {};  
	    var arr;  
	    for (var i = 0; i < items.length; i++) {  
	        arr = items[i].split("=");  
	        result[arr[0]] = arr[1];  
	    }  
	    return result;  
	},
	// 显示登录
	showLogin: function() {
		var _this = this;
		var render = template.compile(loginDialogTpl),
			html = render({});
		$('.login-mask').fadeIn(200, function() {
			$(this).html(html);
			loginFun.init();
			_this.switchCard();
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
			resetPwdFun.resetPwdBtn();
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
			var render = template.compile(loginDialogTpl),
				html = render({});
			$mask.fadeIn(200, function() {
				$(this).html(html);
				loginFun.init();
				_this.switchCard();
			});
		});

		// 注册按钮
		$registBtn.on('click', function() {
			var render = template.compile(loginDialogTpl),
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
// 登录逻辑
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
			var render = template.compile(resetPwdDialogTpl),
				html = render({});
			$('.login-mask').fadeIn(200, function() {
				$('.login-mask').html(html);
				resetPwdFun.init();
			});
		});
	},
	// 登录事件绑定
	bind: function() {
		var _this = this;
		var $phone       = $('.login-phone'),
			$password    = $('.password'),
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
			$self.on('keyup', function() {
				$tips.html('').css({background: '#fff'});
			})
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
							var name = (res.data.name.length > 6) ? res.data.name.substring(0,6)+'...' : res.data.name;
							$tips.html('').css({background: '#fff'});
							var loginSuccessRender = template.compile(loginSuccessTpl),
								loginSuccessHtml = loginSuccessRender({
									loginSuccessData: res.data,
									loginName: name
								});
							$mask.fadeOut(200, function() {
								$loginDialog.remove();
								$('.login-false-wrapper').fadeOut(200, function() {
									$('.login-container').append(loginSuccessHtml);
									loginComm.logOut();
								});
							});
							if(location.href.indexOf('code') > 0) {
								location.href = "http://" + location.host;
							}else{
								location.href = location.href;
							}
							
							window.loginState = 1;
						}else{
							window.loginState = 0;
							$tips.html(res.data.message).css({background: '#FED6E1'});
						}
					}
				});
			}
		});
	}
};
// 登出逻辑
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
// 注册逻辑
var registFun = {
	init: function() {
		loginComm.close();
		loginComm.switchCard();
		loginComm.bind();
		this.bind();
	},

	bind: function() {
		var $phone  = $('.regist-phone'),
			$verify = $('.verify-code'),
			$send   = $('.send-verify-code'),
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
			$self.on('keyup', function() {
				$tips.html('').css({background: '#fff'});
			})
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
				url: '/api/website/user/check_phone/',
				type: 'get',
				dataType: 'json',
				data: {
					phone: $.trim($phone.val())
				},
				success: function(res) {
					if(res.code == "200") {
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
								}else{
									$tips.html(res.data.message).css({background: '#FED6E1'});
								}
							}
						});
					}else{
						$tips.html(res.data.message).css({background: '#FED6E1'});
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
							var registNextDialogRender = template.compile(registNextDialogTpl),
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
// 注册下一步
var registNext = {
	init : function(sms, phoneNum,from,code) {
		loginComm.close();
		loginComm.bind();
		this.bind(sms,phoneNum,from,code);
	},
	bind: function(sms, phoneNum,from,code) {
		var $realname    = $('.realname'),
			$password    = $('.regist-password'),
			$prev        = $('.regist-prev-submit'),
			$completeBtn = $('.regist-complete-submit'),
			$tips        = $('.fill-card .tips'),
			$dialog      = $('.regist-next-dialog'),
			token        = $('.login-container input').val();

		$dialog.off().on('focus', '.input', function() {
			var $self = $(this);
			$self.css({color: '#6D85AC'});
			$self.on('keyup', function() {
				$tips.html('').css({background: '#fff'});
			})
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
			var loginDialogRender = template.compile(loginDialogTpl),
				loginDialogHtml = loginDialogRender({});
			$('.login-mask').html(loginDialogHtml);
			$('.regist-next-dialog').fadeIn(200);
			registFun.init();
		});
		// 完成注册
		$completeBtn.off().on('click', function() {
			if($.trim($realname.val()).length > 15 || $.trim($realname.val()).length < 2) {
				$tips.html('姓名不能包含空格，长度在2~15之间!').css({background: '#FED6E1'});
				return false;
			}if($.trim($realname.val()).length == 0) {
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
						realname: $.trim($realname.val()),
						password: $.trim($password.val())
					},
					success: function(res) {
						if(res.code == "200") {
							if(from == 'bind') {
								$.ajax({
									url: '/api/website/weixin/bind/',
									type: 'post',
									dataType: 'json',
									data: {
										code: code,
										csrfmiddlewaretoken: token,
										phone: phoneNum,
										sms_captcha: sms
									},
									success: function(res) {
										if(res.code == "200") {
											$('.login-mask').fadeOut('400', function() {
												if(location.href.indexOf('code')) {
								location.href = "http://" + location.host;
							}else{
								location.href = location.href;
							}
											});
										}
									}
								});
							}
							$('.login-mask').fadeOut(200, function() {
								$dialog.remove();
							});
							if(location.href.indexOf('code')) {
								location.href = "http://" + location.host;
							}else{
								location.href = location.href;
							}
						}else{
							$tips.html(res.data.message).css({background: '#FED6E1'});
						}
					}
				});
			}
		});

	}
};
// 修改密码
var resetPwdFun = {
	// 初始化
	init: function() {
		loginComm.close();
		this.bind();
	},

	// 重置密码按钮
	resetPwdBtn: function() {
		var _this = this;
		$('#reset-pwd-btn').on('click', function() {
			var render = template.compile(resetPwdDialogTpl),
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

		var $phone       = $('.reset-phone'),
			$send        = $('.reset-send-verify'),
			$fillVerfify = $('.fill-reset-verify'),
			$newPwd      = $('.fill-new-password'),
			$dialog      = $('.reset-password-dialog'),
			$tips        = $('.reset-tips'),
			$submit      = $('.conform-reset-submit'),
			$mask        = $('.login-mask'),
			token        = $('.login-container input').val(),
			phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/,
			verifyReg    = /^\d{4}$/,
			counter = 60,timer;
		$send.removeClass('btn-able').addClass('btn-disable');
		// 输入框获得焦点的时候改变字体颜色
		$dialog.on('focus', '.input', function() {
			var $self = $(this);
			$self.css({color: '#6D85AC'});
			$self.on('keyup', function() {
				$tips.html('').css({background: '#fff'});
			})
		}).on('blur', '.input', function() {
			var $self = $(this);
			if($self.hasClass('reset-phone')) {
				if(!phoneReg.test($.trim($phone.val()))) {
					$('.fill-card-long .phone-status-icon').fadeIn(0, function() {
						$(this).removeClass('success').addClass('false');
						$tips.html('手机号码不正确!').css({background: '#FED6E1'});
					});
					return false;
				}else{
					$('.fill-card-long .phone-status-icon').fadeIn(0, function() {
						$(this).removeClass('false').addClass('success');
						$tips.html('').css({background: '#fff'});
					});
				}
			}else if($self.hasClass('fill-new-password')) {
				if($.trim($newPwd.val()).length > 20 || $.trim($newPwd.val()).length <6) {
					$tips.html('密码不能包含空格，长度在6～20之间!').css({background: '#FED6E1'});
					return false;
				}else{
					$tips.html('').css({background: '#fff'});
				}
			}else if($self.hasClass('fill-reset-verify')) {
				if(!verifyReg.test($.trim($fillVerfify.val()))) {
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
					$('.fill-card-long .phone-status-icon').fadeIn(0, function() {
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
				url: '/api/website/user/check_phone/',
				type: 'get',
				dataType: 'json',
				data: {
					phone: $.trim($phone.val())
				},
				success: function(res) {
					if(res.code != "200") {
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
									resetPwdFun.bind();
								}else{
									$send.removeClass('btn-able').addClass('btn-disable');
									$tips.html(res.data.message).css({background: '#FED6E1'});
								}
							}
						});
					}else{
						$tips.html('该手机号未注册！').css({background: '#FED6E1'});
						$send.removeClass('btn-able').addClass('btn-disable');
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
								if(location.href.indexOf('code')) {
								location.href = "http://" + location.host;
							}else{
								location.href = location.href;
							}
							});
						}
					}
				});
			}
		});
	}
};
// 绑定手机号
var bindPhone = {
	init: function(code) {
		loginComm.close();
		this.bind(code);
	},
	bind: function(code) {
		var _this = this;
		var $phone  = $('.bind-phone-num'),
			$verify = $('.bind-fill-verify'),
			$send   = $('.bind-send-verify'),
			$submit = $('.bind-btn-submit'),
			$tips   = $('.bind-phone-dialog .tips'),
			$bindDialog = $('.bind-phone-dialog'),
			$mask        = $('.login-mask'),
			token        = $('.login-container input').val(),
			phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/,
			verifyReg    = /^\d{4}$/,
			counter = 60,
			timer,sms;

		$send.removeClass('btn-able').addClass('btn-disable');
		// $('.slider').removeClass('bg-left').addClass('bg-right');
		// $('.regist-card').removeClass('regist-hide').addClass('regist-show')
		// 	             .siblings().removeClass('login-show').addClass('login-hide');
		// $('.regist-bg').removeClass('small-bg').addClass('big-bg')
		// 	           .siblings().removeClass('big-bg').addClass('small-bg');

		// 输入框获得焦点的时候改变字体颜色
		$bindDialog.off().on('focus', '.input', function() {
			var $self = $(this);
			$self.css({color: '#6D85AC'});
			$self.on('keyup', function() {
				$tips.html('').css({background: '#fff'});
			})
		}).on('blur', '.input', function() {
			var $self = $(this);
			if($self.hasClass('bind-phone-num')) {
				if(!phoneReg.test($.trim($phone.val()))) {
					$('.is-bind-check .phone-status-icon').fadeIn(0, function() {
						$(this).removeClass('success').addClass('false');
						$tips.html('手机号码不正确!').css({background: '#FED6E1'});
					});
					return false;
				}else{
					$('.is-bind-check .phone-status-icon').fadeIn(0, function() {
						$(this).removeClass('false').addClass('success');
						$tips.html('').css({background: '#fff'});
					});
				}
			}else if($self.hasClass('bind-fill-verify')) {
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
					$('.is-bind-check .phone-status-icon').fadeIn(0, function() {
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
					}else{
						$tips.html(res.data.message).css({background: '#FED6E1'});
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
					url: '/api/website/weixin/info/',
					type: 'get',
					dataType: 'json',
					data: {
						phone: $.trim($phone.val()),
						sms_captcha: $.trim($verify.val())
					},
					success: function(res) {
						if(res.code == "200") {
							if(res.data.is_exist) {
								$('.is-bind-check').fadeOut(50, function() {
									$('.bind-tips-card').fadeIn(100);
									$('.bind-tips-card .phone').html($.trim($phone.val()));
									$('.bind-tips-card img').attr('src',res.data.photo);
									_this.continueBind(code);
								});
							}else{
								var registNextDialogRender = template.compile(registNextDialogTpl),
									registNextDialogHtml = registNextDialogRender({});
								$('.login-mask').html(registNextDialogHtml);
								$('.regist-next-dialog').fadeIn(200);
								$tips.html('').css({background: '#fff'});
								registNext.init($.trim($verify.val()),$.trim($phone.val()),'bind',code);
							}
						}else{
							$tips.html('验证码不正确!').css({background: '#FED6E1'});
							return false;
						}
					}
				});
				
			}
		});
	},
	continueBind: function(code) {
		var _this = this;
		var token = $('.login-container input').val(),
			$phone  = $('.bind-phone-num'),
			$verify = $('.bind-fill-verify');
		$('.continue-bind-submit').on('click', function() {
			$.ajax({
				url: '/api/website/weixin/bind/',
				type: 'post',
				dataType: 'json',
				data: {
					code: code,
					csrfmiddlewaretoken: token,
					phone: $.trim($phone.val()),
					sms_captcha: $.trim($verify.val())
				},
				success: function(res) {
					if(res.code == "200") {
						$('.login-mask').fadeOut('400', function() {
							if(location.href.indexOf('code')) {
								location.href = "http://" + location.host;
							}else{
								location.href = location.href;
							}
						});
					}
				}
			});
		});
		$('.bind-cancel-submit').on('click', function() {
			$('.login-mask').fadeOut(400);
			if(location.href.indexOf('code')) {
				location.href = "http://" + location.host;
			}else{
				location.href = location.href;
			}
		})
	}
};

module.exports = loginComm;
