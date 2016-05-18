/**
 * @ignore  ====================================================================
 * @fileoverview 手机登录逻辑
 * @author  dongjie@xfz.cn
 * @version 1.0.0
 * @ignore  created in 2016-04-16
 * @ignore  depend angular
 * @ignore  ====================================================================
 */

var fillMsgTpl = require('../tpl/login/mobile/fillMsg.html'),
	loginRegistTpl = require('../tpl/login/mobile/loginRegist.html'),
	resetPwdTpl = require('../tpl/login/mobile/resetPwd.html');

var loginComm = {
	init: function() {
  		var _this = this;
  		$('body').append('<script type="text/javascript" src="http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js"></script>');
  		$.ajax({
            url: '/api/website/user/info/',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                if(res.code == "200") {
                	window.loginState = 1;
                	if($('.photo-name')) {
                		$('.photo-name').show(0, function() {
	                        $('.photo-name-submit .photo img').attr('src', res.data.photo)
	                        $('.photo-name-submit .name').html(res.data.name);
	                    });
                	}
                }else{
                	window.loginState = 0;
                }
            }
        });
	},
	showLogin: function() {
		var render = template.compile(loginRegistTpl),
            html = render({});
        $('.login-mask').fadeIn(100, function() {
            $(this).html(html);
            $('.login-card').show().data('show', true);
            $('.regist-card').hide();
            loginFun.init();
        })
	},
	// 关闭按钮
	close: function() {
		var $close = $('.close'),
			$mask  = $('.login-mask');
		function preventDefault(e) {
            e = e || window.event;
            e.preventDefault && e.preventDefault();
            e.returnValue = false;
        }

        function stopPropagation(e){
			e = e || window.event;
			e.stopPropagation && e.stopPropagation();
			e.cancelBubble = false;
        }

        function innerScroll(e){
        	// 阻止冒泡到document
        	// document上已经preventDefault
        	stopPropagation(e);

			var delta = e.wheelDelta || e.detail || 0;
			var box = $(this).get(0);

			if($(box).height() + box.scrollTop >= box.scrollHeight){
				if(delta < 0) {
					preventDefault(e);
					return false;
				}
			}
			if(box.scrollTop === 0){
				if(delta > 0) {
					preventDefault(e);
					return false;
				}
			}
			// 会阻止原生滚动
			// return false;
        }

		var disableScroll = function(){
			$(document).on('mousewheel', preventDefault);
			$(document).on('touchmove', preventDefault);
		};

		var enableScroll = function(){
			$(document).off('mousewheel', preventDefault);
			$(document).off('touchmove', preventDefault);
		};

		disableScroll();

		$close.on('click', function() {
			var $self = $(this);
			$mask.fadeOut(200, function() {
				$self.parent().remove();
			});
			enableScroll();
		});
	},
	// 注册登录卡片切换
	switchCard: function() {
		$('.login-regist .tab').on('click', 'div', function() {
			if($(this).hasClass('login-btn')) {
				if(!$('.login-card').data('show')) {
					$('.login-btn').addClass('active').siblings().removeClass('active');
					$('.regist-card').fadeOut(100,function() {
						$('.login-card').fadeIn(500).data('show',true);
						$('.regist-card .tips').html('').css({background: '#fff'});
						$('.phone-status-icon').hide();
						loginFun.init();
					}).data('show',false);
				}
			}else{
				if(!$('.regist-card').data('show')) {
					$('.regist-btn').addClass('active').siblings().removeClass('active');
					$('.login-card').fadeOut(100, function() {
						$('.regist-card').fadeIn(500).data('show',true);
						$('.login-card .tips').html('').css({background: '#fff'});
						$('.phone-status-icon').hide();
						registFun.init();
					}).data('show',false);
				}
			}
		});
	}
};
// 登录逻辑
var loginFun = {
	// 初始化
	init: function() {
		loginComm.close();
		loginComm.switchCard();
		this.resetPwd();
		this.bind();
	},
	// 忘记密码按钮
	resetPwd : function() {
		var _this = this;
		$('.foget-pwd').off().on('click', function() {
			var render = template.compile(resetPwdTpl),
				html = render({});
			$('.login-mask').html(html);
			resetPwdFun.init();
		});
	},
	// 登录事件绑定
	bind: function() {
		var _this = this;
		var $phone       = $('.login-phone'),
			$password    = $('.password'),
			$forgetPwd   = $('.forget-password'),
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
							$tips.html('').css({background: '#fff'});
							$('.login-mask').fadeOut(200, function() {
								$loginDialog.remove();
								$('.photo-name').show(0, function() {
									$('.photo-name-submit .photo img').attr('src', res.data.photo)
									$('.photo-name-submit .name').html(res.data.name);
								});
								window.loginState = 1;
								location.href = location.href;
								// location.reload();
							});
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
// 忘记密码逻辑
var resetPwdFun = {
	// 初始化
	init: function() {
		loginComm.close();
		this.bind();
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
											$send.html('发送验证码('+counter+')');
											$send.attr('send', true).removeClass('btn-able').addClass('btn-disable');
										}else{
											$send.val('发送验证码');
											$send.attr('send', false).removeClass('btn-disable').addClass('btn-able');
											clearInterval(timer);
										}
									}, 1000);
									resetPwdFun.bind();
								}else{
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
							});
							location.reload();
						}
					}
				});
			}
		});
	}
};
// 注册逻辑
var registFun = {
	init: function(from) {
		loginComm.close();
		loginComm.switchCard();
		this.bind(from);
	},

	bind: function(from) {
		var $phone  = $('.regist-phone'),
			$verify = $('.verify-code'),
			$send   = $('.send-verify-code'),
			$submit = $('.regist-next'),
			$tips   = $('.regist-card .tips'),
			$registDialog = $('.regist-card'),
			$mask        = $('.login-mask'),
			token        = $('.login-container input').val(),
			phoneReg     = /^1[3|4|5|7|8|][0-9]{9}$/,
			verifyReg    = /^\d{4}$/,
			counter = 60,
			timer,sms;
		if(from == "registNext") {
			$send.removeClass('btn-able').addClass('btn-disable');
			$('.regist-btn').addClass('active').siblings().removeClass('active');
			$('.login-card').fadeOut(100, function() {
				$('.regist-card').fadeIn(500).data('show',true);
				$('.login-card .tips').html('').css({background: '#fff'});
				$('.phone-status-icon').hide();
				registFun.init();
			}).data('show',false);
		}

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
											$send.html('发送验证码('+counter+')');
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
							var registNextDialogRender = template.compile(fillMsgTpl),
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
// 注册下一步逻辑
var registNext = {
	init : function(sms, phoneNum) {
		loginComm.close();
		this.bind(sms,phoneNum);
	},
	bind: function(sms, phoneNum) {
		var $realname    = $('.real-name'),
			$password    = $('.regist-password'),
			$prev        = $('.regist-prev-submit'),
			$completeBtn = $('.regist-complete-submit'),
			$tips        = $('.fill-msg .tips'),
			$dialog      = $('.fill-msg'),
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
			var loginDialogRender = template.compile(loginRegistTpl),
				loginDialogHtml = loginDialogRender({});
			$('.login-mask').html(loginDialogHtml);
			$('.regist-next-dialog').fadeIn(200);
			registFun.init('registNext');
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
							$('.login-mask').fadeOut(200, function() {
								$dialog.remove();
							});
							location.reload();
						}else{
							$tips.html(res.data.message).css({background: '#FED6E1'});
						}
					}
				});
			}
		});

	}
};
module.exports = loginComm;




