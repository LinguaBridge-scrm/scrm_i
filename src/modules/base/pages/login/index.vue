<template>
	<div class="page-login">
		<div class="box" :class="{ 'is-register': authMode === 'register' }">
			<div class="logo">
				<div class="icon">
					<img src="/logo.png" alt="Logo" />
				</div>

				<span>{{ app.info.name }}</span>
			</div>

			<p class="desc">
				{{ $t('为您提供多平台的实时翻译，聚合，AI接管，客户追踪，内容监控') }}
			</p>

			<div class="mode-switch">
				<button
					type="button"
					:class="{ active: authMode === 'login' }"
					@click="switchMode('login')"
				>
					{{ $t('登录') }}
				</button>
				<button
					type="button"
					:class="{ active: authMode === 'register' }"
					@click="switchMode('register')"
				>
					{{ $t('租户注册') }}
				</button>
			</div>

			<div class="form">
				<el-form label-position="top" class="form" :disabled="saving || register.saving">
					<template v-if="authMode === 'login'">
						<el-form-item :label="$t('用户名')">
							<el-input
								v-model="form.username"
								:placeholder="$t('请输入用户名')"
								maxlength="20"
							/>
						</el-form-item>

						<el-form-item :label="$t('密码')">
							<el-input
								v-model="form.password"
								type="password"
								:placeholder="$t('请输入密码')"
								maxlength="20"
								show-password
								autocomplete="new-password"
							/>
						</el-form-item>

						<el-form-item :label="$t('验证码')">
							<el-input
								v-model="form.verifyCode"
								:placeholder="$t('验证码')"
								maxlength="4"
								@keyup.enter="toLogin"
							>
								<template #suffix>
									<pic-captcha
										:ref="setRefs('picCaptcha')"
										v-model="form.captchaId"
										@change="
											() => {
												form.verifyCode = '';
											}
										"
									/>
								</template>
							</el-input>
						</el-form-item>

						<div class="op">
							<el-button type="primary" :loading="saving" @click="toLogin">
								{{ $t('登录') }}
							</el-button>
							<el-button link :disabled="saving" @click="switchMode('register')">
								{{ $t('没有租户账号？立即注册') }}
							</el-button>
						</div>
					</template>

					<template v-else>
						<el-form-item :label="$t('登录账号')">
							<el-input
								v-model="register.form.username"
								:placeholder="$t('请输入4-30位字母、数字或下划线')"
								maxlength="30"
							/>
						</el-form-item>

						<el-form-item :label="$t('登录密码')">
							<el-input
								v-model="register.form.password"
								type="password"
								:placeholder="$t('请输入6-20位密码')"
								maxlength="20"
								show-password
								autocomplete="new-password"
							/>
						</el-form-item>

						<el-form-item :label="$t('确认密码')">
							<el-input
								v-model="register.form.confirmPassword"
								type="password"
								:placeholder="$t('请再次输入密码')"
								maxlength="20"
								show-password
								autocomplete="new-password"
							/>
						</el-form-item>

						<el-form-item :label="$t('计费方式')">
							<el-radio-group
								v-model="register.form.billingMode"
								class="billing-mode"
							>
								<el-radio-button :value="1">{{ $t('字符计费') }}</el-radio-button>
								<el-radio-button :value="0">{{ $t('端口计费') }}</el-radio-button>
							</el-radio-group>
						</el-form-item>

						<el-form-item :label="$t('验证码')">
							<el-input
								v-model="register.form.verifyCode"
								:placeholder="$t('验证码')"
								maxlength="4"
								@keyup.enter="submitRegister"
							>
								<template #suffix>
									<pic-captcha
										:ref="setRefs('registerPicCaptcha')"
										v-model="register.form.captchaId"
										@change="
											() => {
												register.form.verifyCode = '';
											}
										"
									/>
								</template>
							</el-input>
						</el-form-item>

						<div class="op">
							<el-button
								type="primary"
								:loading="register.saving"
								@click="submitRegister"
							>
								{{ $t('注册') }}
							</el-button>
							<el-button
								link
								:disabled="register.saving"
								@click="switchMode('login')"
							>
								{{ $t('已有账号？返回登录') }}
							</el-button>
						</div>
					</template>
				</el-form>
			</div>
		</div>

		<div class="bg">
			<cl-svg name="bg"></cl-svg>
		</div>

		<!--		<a href="https://cool-js.com" class="copyright"> Copyright © COOL </a>-->
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'login'
});

import { nextTick, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCool } from '/@/cool';
import { useBase } from '/$/base';
import { storage } from '/@/cool/utils';
import { useI18n } from 'vue-i18n';
import PicCaptcha from './components/pic-captcha.vue';

const { refs, setRefs, router, service } = useCool();
const { user, app } = useBase();
const { t } = useI18n();

// 状态
const saving = ref(false);
const authMode = ref<'login' | 'register'>('login');

// 表单数据
const form = reactive({
	username: storage.get('username') || '',
	password: '',
	captchaId: '',
	verifyCode: ''
});

const register = reactive({
	saving: false,
	form: {
		username: '',
		password: '',
		confirmPassword: '',
		billingMode: 1,
		captchaId: '',
		verifyCode: ''
	}
});

// 演示模式
if (import.meta.env.MODE == 'demo') {
	form.username = 'admin';
	form.password = '123456';
}

// 登录
async function toLogin() {
	if (!form.username) {
		return ElMessage.error(t('用户名不能为空'));
	}

	if (!form.password) {
		return ElMessage.error(t('密码不能为空'));
	}

	if (!form.verifyCode) {
		return ElMessage.error(t('图片验证码不能为空'));
	}

	saving.value = true;

	try {
		// 登录
		await service.base.open.login(form).then(user.setToken);

		// token 事件
		await Promise.all(app.events.hasToken.map(e => e()));

		// 设置缓存
		storage.set('username', form.username);

		// 跳转首页
		router.push('/');
	} catch (err) {
		// 刷新验证码
		refs.picCaptcha.refresh();

		// 提示错误
		ElMessageBox.alert((err as Error).message, {
			title: t('提示'),
			type: 'error'
		});
	}

	saving.value = false;
}

async function switchMode(mode: 'login' | 'register') {
	if (authMode.value === mode) {
		return;
	}
	authMode.value = mode;
	if (mode === 'register') {
		resetRegisterForm();
	}
	await nextTick();
	if (mode === 'register') {
		refs.registerPicCaptcha?.refresh?.();
	} else {
		refs.picCaptcha?.refresh?.();
	}
}

function resetRegisterForm() {
	register.form.username = '';
	register.form.password = '';
	register.form.confirmPassword = '';
	register.form.billingMode = 1;
	register.form.captchaId = '';
	register.form.verifyCode = '';
}

function validateRegisterForm() {
	register.form.username = register.form.username.trim();
	register.form.verifyCode = register.form.verifyCode.trim();

	if (!/^[A-Za-z0-9_]{4,30}$/.test(register.form.username)) {
		return t('登录账号需为4-30位字母、数字或下划线');
	}
	if (register.form.password.length < 6 || register.form.password.length > 20) {
		return t('密码长度在6到20位之间');
	}
	if (register.form.password !== register.form.confirmPassword) {
		return t('两次输入的密码不一致');
	}
	if (![0, 1].includes(register.form.billingMode)) {
		return t('计费方式不正确');
	}
	if (!register.form.verifyCode) {
		return t('图片验证码不能为空');
	}
	return '';
}

async function submitRegister() {
	const message = validateRegisterForm();
	if (message) {
		return ElMessage.error(message);
	}

	register.saving = true;
	try {
		await service.base.open.request({
			url: '/tenant/register',
			method: 'POST',
			data: {
				...register.form,
				tenantName: register.form.username
			}
		});
		form.username = register.form.username;
		authMode.value = 'login';
		await nextTick();
		ElMessage.success(t('注册成功，请使用账号登录'));
		refs.picCaptcha?.refresh?.();
	} catch (err) {
		refs.registerPicCaptcha?.refresh?.();
		ElMessageBox.alert((err as Error).message, {
			title: t('提示'),
			type: 'error'
		});
	} finally {
		register.saving = false;
	}
}
</script>

<style lang="scss" scoped>
$color: #2c3142;

.page-login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: relative;
	background-color: #fff;
	color: $color;

	.bg {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 90%;
		pointer-events: none;
		transform: rotate(180deg) scaleY(-1);

		.cl-svg {
			height: 100%;
			width: 100%;
		}
	}

	.copyright {
		position: absolute;
		bottom: 15px;
		left: 0;
		text-align: center;
		width: 100%;
		color: var(--el-color-info);
		font-size: 14px;
		user-select: none;
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		width: 50%;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 9;
		box-sizing: border-box;
		padding: clamp(44px, 11vh, 110px) 0 36px;
		overflow-y: auto;

		.logo {
			height: 50px;
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			user-select: none;

			.icon {
				border-radius: 8px;
				padding: 5px;
				margin-right: 10px;
				background-color: $color;

				img {
					height: 36px;
				}
			}

			span {
				font-size: 38px;
				font-weight: bold;
				line-height: 1;
				letter-spacing: 3px;
			}
		}

		.desc {
			font-size: 15px;
			letter-spacing: 1px;
			margin-bottom: 50px;
			user-select: none;
			max-width: 80%;
			text-align: center;
		}

		.mode-switch {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: 340px;
			max-width: calc(100vw - 48px);
			box-sizing: border-box;
			padding: 4px;
			margin-bottom: 24px;
			border-radius: 8px;
			background-color: #f1f3f7;

			button {
				height: 36px;
				border: 0;
				border-radius: 6px;
				background-color: transparent;
				color: var(--el-text-color-secondary);
				cursor: pointer;
				font-size: 14px;
				white-space: nowrap;

				&.active {
					background-color: #fff;
					color: $color;
					font-weight: 600;
					box-shadow: 0 2px 8px rgb(44 49 66 / 8%);
				}
			}
		}

		.form {
			width: 340px;
			max-width: calc(100vw - 48px);

			:deep(.el-form) {
				.el-form-item {
					margin-bottom: 20px;
				}

				.el-form-item__label {
					color: var(--el-color-info);
					padding-left: 5px;
					user-select: none;
				}

				.el-input {
					box-sizing: border-box;
					font-size: 15px;
					border: 0;
					border-radius: 0;
					background-color: #f8f8f8;
					padding: 0 5px;
					border-radius: 8px;
					position: relative;

					&__wrapper {
						box-shadow: none;
						background-color: transparent;
					}

					&__inner {
						height: 45px;
						color: #333;
					}

					&:-webkit-autofill {
						-webkit-box-shadow: 0 0 0 1000px #f8f8f8 inset;
						box-shadow: 0 0 0 1000px #f8f8f8 inset;
					}
				}

				.billing-mode {
					width: 100%;

					.el-radio-button {
						width: 50%;

						&__inner {
							width: 100%;
							height: 42px;
							line-height: 40px;
							padding: 0;
						}
					}
				}
			}

			:deep(.pic-captcha) {
				position: absolute;
				right: -5px;
				top: 0;
			}
		}

		.op {
			display: flex;
			flex-direction: column;
			gap: 12px;
			justify-content: center;
			margin-top: 40px;

			:deep(.el-button) {
				height: 45px;
				width: 100%;
				font-size: 16px;
				border-radius: 8px;
				letter-spacing: 1px;
				margin-left: 0;
			}

			:deep(.el-button.is-link) {
				height: auto;
				font-size: 14px;
				letter-spacing: 0;
			}
		}

		&.is-register {
			.op {
				margin-top: 24px;
			}
		}
	}
}

@media screen and (max-width: 1024px) {
	.page-login {
		.box {
			width: 100%;
		}
	}
}
</style>
