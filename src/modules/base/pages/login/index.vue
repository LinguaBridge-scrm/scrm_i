<template>
	<div class="page-login">
		<div class="intro">
			<div class="intro__content">
				<h1>{{ $t('把翻译、会话、环境和监控统一进一个工作台') }}</h1>

				<p class="intro__lead">
					{{
						$t(
							'为您提供多平台的实时翻译，聚合，AI接管，客户追踪，内容监控'
						)
					}}
				</p>

				<div class="intro-visual">
					<div class="intro-visual__panel">
						<div class="intro-visual__head">
							<span></span>
							{{ $t('Realtime AI Router') }}
						</div>

						<div class="intro-visual__body">
							<div class="flow flow--input">
								<el-icon><chat-dot-round /></el-icon>
								<span>{{ $t('客户消息') }}</span>
							</div>
							<div class="flow flow--ai">
								<el-icon><cpu /></el-icon>
								<span>{{ $t('AI翻译') }}</span>
							</div>
							<div class="flow flow--risk">
								<el-icon><aim /></el-icon>
								<span>{{ $t('监控命中') }}</span>
							</div>
						</div>

						<div class="scan-line"></div>
					</div>

					<div class="intro-visual__rail intro-visual__rail--one"></div>
					<div class="intro-visual__rail intro-visual__rail--two"></div>
				</div>

				<div class="capability-grid">
					<div
						v-for="(item, index) in capabilities"
						:key="item.title"
						class="capability"
						:style="{ animationDelay: `${index * 0.12 + 0.35}s` }"
					>
						<div class="capability__icon">
							<el-icon>
								<component :is="item.icon" />
							</el-icon>
						</div>
						<div class="capability__text">
							<strong>{{ $t(item.title) }}</strong>
							<span>{{ $t(item.desc) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="box" :class="{ 'is-register': authMode === 'register' }">
			<div class="login-panel">
				<div class="login-visual" aria-hidden="true">
					<img :src="LoginAiVisual" alt="" />
					<span class="login-visual__chip login-visual__chip--two">{{
						$t('多平台同步')
					}}</span>
				</div>

				<div class="logo">
					<div class="icon">
						<img src="/logo.png" alt="Logo" />
					</div>

					<span>{{ app.info.name }}</span>
				</div>

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
						<span class="mode-switch__register">
							{{ $t('租户注册') }}
							<span class="mode-switch__badge">{{ $t('赠送') }}</span>
						</span>
					</button>
				</div>

				<div class="form">
					<el-form
						label-position="top"
						class="form"
						:disabled="saving || register.saving"
					>
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
							<div class="register-gift">
								<div class="register-gift__badge">
									<span>🎁</span>
									{{ $t('新租户注册礼') }}
								</div>
								<div class="register-gift__title">
									✨
									{{
										$t(
											'注册即领：字符计费送10万字符（无时间限制），端口计费送5个端口（一月）'
										)
									}}
								</div>
							</div>

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
									<el-radio-button :value="1">{{
										$t('字符计费')
									}}</el-radio-button>
									<el-radio-button :value="0">{{
										$t('端口计费')
									}}</el-radio-button>
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

				<div v-if="authMode === 'login'" class="client-download">
					<div class="client-download__icon">
						<el-icon><download /></el-icon>
					</div>

					<div class="client-download__body">
						<div class="client-download__title">
							<span>{{ $t('客户端下载') }}</span>
							<em v-if="clientDownload.loading">{{ $t('获取中') }}</em>
							<em v-else-if="clientDownload.version">
								{{ $t('最新版本') }} {{ clientDownload.version }}
							</em>
							<em v-else>{{ $t('暂无版本') }}</em>
						</div>
						<div
							class="client-download__url"
							:title="clientDownload.downloadUrl || $t('暂无下载地址')"
						>
							{{ clientDownload.downloadUrl || $t('暂无下载地址') }}
						</div>
					</div>

					<el-tooltip :content="$t('立即下载')" placement="top">
						<el-button
							circle
							:disabled="!clientDownload.downloadUrl || clientDownload.loading"
							:loading="clientDownload.loading"
							@click="downloadClient"
						>
							<el-icon><download /></el-icon>
						</el-button>
					</el-tooltip>
				</div>
			</div>
		</div>

		<a
			class="telegram-contact"
			:href="telegramContact.url"
			target="_blank"
			rel="noopener noreferrer"
			:title="`${$t('TG客服')} ${telegramContact.account}`"
			:aria-label="`${$t('TG客服')} ${telegramContact.account}`"
		>
			<span class="telegram-contact__icon">
				<el-icon><promotion /></el-icon>
			</span>
			<span class="telegram-contact__label">{{ $t('TG客服') }}</span>
			<span class="telegram-contact__account">{{ telegramContact.account }}</span>
		</a>

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

import { nextTick, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
	Aim,
	ChatDotRound,
	Connection,
	Cpu,
	Download,
	Lock,
	Monitor,
	Promotion
} from '@element-plus/icons-vue';
import { useCool } from '/@/cool';
import { useBase } from '/$/base';
import { storage } from '/@/cool/utils';
import { useI18n } from 'vue-i18n';
import PicCaptcha from './components/pic-captcha.vue';
import LoginAiVisual from './static/login-ai-visual.png';

const { refs, setRefs, router, service } = useCool();
const { user, app } = useBase();
const { t, locale } = useI18n();

// 状态
const saving = ref(false);
const authMode = ref<'login' | 'register'>('login');

const capabilities = [
	{
		title: 'AI智能翻译',
		desc: 'OpenAI兼容大模型与翻译服务统一接入',
		icon: Cpu
	},
	{
		title: '多平台聚合',
		desc: '账号、会话、消息按平台归集同步',
		icon: Connection
	},
	{
		title: '指纹运行态',
		desc: '客户端、页面、端口占用独立识别',
		icon: Lock
	},
	{
		title: '消息监控',
		desc: '钱包、关键词、白名单与拦截规则留痕',
		icon: Monitor
	}
];

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

const clientDownload = reactive({
	loading: false,
	version: '',
	downloadUrl: '',
	fileName: ''
});

const telegramContact = {
	account: '@zhonghe785',
	url: 'https://t.me/zhonghe785'
};

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

async function loadClientDownload() {
	clientDownload.loading = true;

	try {
		const data = await service.request({
			url: 'app/customer/client-update/latest',
			method: 'GET',
			params: {
				lang: locale.value
			},
			NProgress: false
		});

		clientDownload.version = data?.version || '';
		clientDownload.downloadUrl = normalizeClientDownloadUrl(data?.downloadUrl || '');
		clientDownload.fileName = data?.fileName || '';
	} catch {
		clientDownload.version = '';
		clientDownload.downloadUrl = '';
		clientDownload.fileName = '';
	} finally {
		clientDownload.loading = false;
	}
}

function normalizeClientDownloadUrl(url: string) {
	const value = String(url || '').trim();

	if (window.location.protocol === 'https:' && /^http:\/\//i.test(value)) {
		return value.replace(/^http:\/\//i, 'https://');
	}

	return value;
}

function downloadClient() {
	if (!clientDownload.downloadUrl) {
		ElMessage.warning(t('暂无可下载客户端'));
		return;
	}

	const link = document.createElement('a');
	link.href = clientDownload.downloadUrl;
	link.download = clientDownload.fileName || '';
	link.rel = 'noopener noreferrer';
	link.style.display = 'none';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

onMounted(() => {
	loadClientDownload();
});
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
	overflow: hidden;
	background:
		linear-gradient(115deg, #eef6f6 0%, #f7f8fc 46%, #fff 100%),
		linear-gradient(90deg, rgb(18 124 111 / 7%) 0 1px, transparent 1px 100%);
	color: $color;

	.bg {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 90%;
		pointer-events: none;
		transform: rotate(180deg) scaleY(-1);
		contain: strict;
		will-change: transform;

		.cl-svg {
			height: 100%;
			width: 100%;
		}
	}

	.intro {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
		display: flex;
		align-items: center;
		width: 55%;
		height: 100%;
		box-sizing: border-box;
		padding: 56px 56px 56px 72px;
		pointer-events: none;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background-image:
				linear-gradient(rgb(255 255 255 / 6%) 1px, transparent 1px),
				linear-gradient(90deg, rgb(255 255 255 / 6%) 1px, transparent 1px);
			background-size: 52px 52px;
			mask-image: linear-gradient(90deg, #000 0%, transparent 82%);
		}

		&__content {
			position: relative;
			z-index: 2;
			width: min(640px, 100%);
			margin-top: clamp(-56px, -5vh, -36px);
			animation: intro-rise 0.75s ease-out both;
		}

		h1 {
			width: min(620px, 100%);
			margin: 0 0 18px;
			color: #fff;
			font-size: 52px;
			font-weight: 800;
			line-height: 1.12;
			text-shadow: 0 12px 32px rgb(0 0 0 / 18%);
		}

		&__lead {
			width: min(560px, 100%);
			margin: 0;
			color: rgb(226 233 242 / 88%);
			font-size: 17px;
			line-height: 1.8;
		}
	}

	.intro-visual {
		position: relative;
		width: min(560px, 100%);
		height: 230px;
		margin: 34px 0 26px;
		contain: layout paint;

		&__panel {
			position: absolute;
			left: 0;
			top: 18px;
			width: 420px;
			max-width: 74%;
			height: 184px;
			box-sizing: border-box;
			overflow: hidden;
			border: 1px solid rgb(44 49 66 / 10%);
			border-radius: 8px;
			background-color: rgb(255 255 255 / 84%);
			box-shadow: 0 26px 60px rgb(35 52 75 / 12%);
			animation: panel-float 5.5s ease-in-out infinite;
			will-change: transform;
		}

		&__head {
			display: flex;
			align-items: center;
			height: 44px;
			padding: 0 18px;
			border-bottom: 1px solid rgb(44 49 66 / 8%);
			color: #526071;
			font-size: 13px;
			font-weight: 700;

			span {
				width: 10px;
				height: 10px;
				margin-right: 9px;
				border-radius: 50%;
				background-color: #ef6f6c;
				box-shadow:
					18px 0 0 #f6bd60,
					36px 0 0 #18a999;
			}
		}

		&__body {
			position: relative;
			height: 140px;
			padding: 20px 22px;
			box-sizing: border-box;
		}

		&__rail {
			position: absolute;
			right: 16px;
			width: 178px;
			height: 42px;
			border-radius: 8px;
			border: 1px solid rgb(24 169 153 / 18%);
			background-color: rgb(255 255 255 / 70%);
			box-shadow: 0 16px 34px rgb(35 52 75 / 10%);

			&::before {
				content: '';
				position: absolute;
				left: 14px;
				top: 13px;
				width: 52px;
				height: 8px;
				border-radius: 8px;
				background-color: #18a999;
				box-shadow:
					70px 0 0 rgb(44 49 66 / 14%),
					0 16px 0 rgb(44 49 66 / 12%),
					48px 16px 0 rgb(239 111 108 / 55%);
			}

			&--one {
				top: 0;
				animation: rail-drift 4.2s ease-in-out infinite;
				will-change: transform;
			}

			&--two {
				bottom: 12px;
				border-color: rgb(239 111 108 / 18%);
				animation: rail-drift 4.8s ease-in-out infinite reverse;
				will-change: transform;
			}
		}

		.flow {
			position: absolute;
			display: inline-flex;
			align-items: center;
			height: 36px;
			padding: 0 12px;
			border-radius: 8px;
			background-color: #f4f7fb;
			color: #344054;
			font-size: 13px;
			font-weight: 700;

			.el-icon {
				margin-right: 7px;
				font-size: 16px;
			}

			&::after {
				content: '';
				position: absolute;
				right: -54px;
				top: 17px;
				width: 42px;
				height: 2px;
				background-color: rgb(44 49 66 / 18%);
				animation: stream-line 1.8s linear infinite;
			}

			&--input {
				left: 22px;
				top: 26px;
				color: #1c7b71;
			}

			&--ai {
				left: 156px;
				top: 62px;
				color: #a05a00;
				background-color: #fff7e8;
				animation: flow-pulse 2.6s ease-in-out infinite;
			}

			&--risk {
				left: 282px;
				top: 28px;
				color: #bf4342;
				background-color: #fff1f0;

				&::after {
					display: none;
				}
			}
		}

		.scan-line {
			position: absolute;
			left: 0;
			top: 44px;
			width: 100%;
			height: 1px;
			background-color: rgb(24 169 153 / 42%);
			box-shadow: 0 0 16px rgb(24 169 153 / 35%);
			animation: scan 3.4s ease-in-out infinite;
			will-change: transform, opacity;
		}
	}

	.capability-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
		width: min(600px, 100%);
	}

	.capability {
		display: flex;
		align-items: flex-start;
		min-height: 96px;
		box-sizing: border-box;
		padding: 16px;
		border: 1px solid rgb(44 49 66 / 8%);
		border-radius: 8px;
		background-color: rgb(255 255 255 / 72%);
		box-shadow: 0 16px 38px rgb(20 40 60 / 8%);
		opacity: 0;
		transform: translateY(14px);
		animation: capability-in 0.55s ease-out forwards;

		&__icon {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 0 0 38px;
			width: 38px;
			height: 38px;
			margin-right: 12px;
			border-radius: 8px;
			background-color: #202634;
			color: #fff;

			.el-icon {
				font-size: 19px;
			}
		}

		&:nth-child(2) .capability__icon {
			background-color: #1c7b71;
		}

		&:nth-child(3) .capability__icon {
			background-color: #a05a00;
		}

		&:nth-child(4) .capability__icon {
			background-color: #bf4342;
		}

		&__text {
			display: flex;
			flex-direction: column;
			min-width: 0;

			strong {
				color: #202634;
				font-size: 15px;
				line-height: 1.3;
			}

			span {
				margin-top: 7px;
				color: #6b7585;
				font-size: 13px;
				line-height: 1.55;
			}
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

	.telegram-contact {
		position: fixed;
		right: 18px;
		top: 50%;
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 54px;
		height: 164px;
		box-sizing: border-box;
		padding: 10px 7px 14px;
		border: 1px solid rgb(255 255 255 / 44%);
		border-right: 0;
		border-radius: 8px 0 0 8px;
		background: linear-gradient(180deg, #202634, #1c7b71);
		box-shadow: 0 18px 38px rgb(24 38 52 / 18%);
		color: #fff;
		text-decoration: none;
		transform: translateY(-50%);
		transition:
			box-shadow 0.2s,
			transform 0.2s;

		&:hover,
		&:focus {
			color: #fff;
			box-shadow: 0 20px 42px rgb(24 169 153 / 28%);
			transform: translateY(-50%) translateX(-3px);
		}

		&__icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 34px;
			height: 34px;
			border-radius: 8px;
			background-color: rgb(255 255 255 / 16%);
			box-shadow: inset 0 1px 0 rgb(255 255 255 / 28%);

			.el-icon {
				font-size: 18px;
			}
		}

		&__label {
			margin-top: 8px;
			font-size: 12px;
			font-weight: 700;
			line-height: 1.25;
			text-align: center;
			white-space: nowrap;
		}

		&__account {
			position: absolute;
			left: 50%;
			top: 108px;
			width: 108px;
			color: rgb(255 255 255 / 86%);
			font-size: 12px;
			font-style: normal;
			line-height: 1;
			letter-spacing: 0;
			text-align: center;
			transform: translateX(-50%) rotate(90deg);
			transform-origin: center;
			white-space: nowrap;
		}
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 45%;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 9;
		box-sizing: border-box;
		padding: 36px clamp(30px, 4.2vw, 72px);
		overflow-y: auto;

		.login-panel {
			position: relative;
			flex: 0 0 auto;
			width: min(430px, 100%);
			box-sizing: border-box;
			padding: 38px 44px 28px;
			overflow: hidden;
			border: 1px solid rgb(255 255 255 / 78%);
			border-radius: 8px;
			background:
				linear-gradient(180deg, rgb(255 255 255 / 88%), rgb(255 255 255 / 72%)),
				linear-gradient(135deg, rgb(24 169 153 / 10%), rgb(53 91 219 / 10%));
			box-shadow:
				0 32px 80px rgb(32 38 52 / 14%),
				inset 0 1px 0 rgb(255 255 255 / 80%);
			backdrop-filter: blur(18px);
			animation: login-panel-in 0.68s ease-out both;
			contain: layout paint;
			transform: translateZ(0);

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				z-index: 1;
				width: 45%;
				height: 100%;
				background: linear-gradient(
					90deg,
					transparent,
					rgb(255 255 255 / 44%),
					transparent
				);
				transform: translate3d(-89%, 0, 0) skewX(-16deg);
				animation: panel-sheen 5.2s ease-in-out infinite;
				will-change: transform, opacity;
			}

			&::after {
				content: '';
				position: absolute;
				inset: 0;
				z-index: 0;
				background-image:
					linear-gradient(rgb(44 49 66 / 4%) 1px, transparent 1px),
					linear-gradient(90deg, rgb(44 49 66 / 4%) 1px, transparent 1px);
				background-size: 34px 34px;
				opacity: 0.58;
			}
		}

		.login-visual {
			position: absolute;
			right: -136px;
			top: -126px;
			z-index: 1;
			width: 390px;
			pointer-events: none;
			contain: layout paint;

			img {
				display: block;
				width: 100%;
				opacity: 0.72;
				filter: drop-shadow(0 22px 42px rgb(36 50 78 / 16%));
				animation: login-art-float 6.2s ease-in-out infinite;
				will-change: transform;
			}

			&__chip {
				position: absolute;
				display: inline-flex;
				align-items: center;
				height: 28px;
				padding: 0 11px;
				border: 1px solid rgb(24 169 153 / 16%);
				border-radius: 8px;
				background-color: rgb(255 255 255 / 82%);
				color: #1c7b71;
				font-size: 12px;
				font-weight: 700;
				box-shadow: 0 12px 28px rgb(32 38 52 / 12%);

				&::before {
					content: '';
					width: 6px;
					height: 6px;
					margin-right: 7px;
					border-radius: 50%;
					background-color: #18a999;
					box-shadow: 0 0 0 5px rgb(24 169 153 / 12%);
				}

				&--two {
					right: 26px;
					top: 198px;
					color: #355bdb;
					border-color: rgb(53 91 219 / 16%);
					animation: login-chip-float 5.2s ease-in-out infinite reverse;
					will-change: transform;

					&::before {
						background-color: #355bdb;
						box-shadow: 0 0 0 5px rgb(53 91 219 / 12%);
					}
				}
			}
		}

		.logo,
		.mode-switch,
		.form,
		.client-download {
			position: relative;
			z-index: 2;
		}

		.logo {
			height: 50px;
			margin-bottom: 18px;
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

		.mode-switch {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: 340px;
			max-width: calc(100vw - 48px);
			box-sizing: border-box;
			padding: 4px;
			margin-bottom: 24px;
			border-radius: 8px;
			background-color: rgb(233 238 247 / 80%);
			box-shadow: inset 0 1px 0 rgb(255 255 255 / 82%);

			button {
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				height: 36px;
				border: 0;
				border-radius: 6px;
				background-color: transparent;
				color: var(--el-text-color-secondary);
				cursor: pointer;
				font-size: 14px;
				white-space: nowrap;
				transition:
					color 0.2s,
					background-color 0.2s,
					box-shadow 0.2s,
					transform 0.2s;

				&.active {
					background-color: #fff;
					color: $color;
					font-weight: 600;
					box-shadow: 0 2px 8px rgb(44 49 66 / 8%);
					transform: translateY(-1px);
				}
			}

			&__register {
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				line-height: 1;
			}

			&__badge {
				position: absolute;
				top: -15px;
				right: -24px;
				padding: 1px 5px;
				border-radius: 999px;
				background: linear-gradient(135deg, #ff6b35 0%, #ff3d71 100%);
				color: #fff;
				font-size: 10px;
				font-weight: 700;
				line-height: 15px;
				box-shadow: 0 3px 8px rgb(255 92 74 / 28%);
				pointer-events: none;
				transform: scale(0.9);
				transform-origin: right bottom;
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
					background-color: rgb(244 247 251 / 92%);
					padding: 0 5px;
					border-radius: 8px;
					position: relative;
					transition:
						background-color 0.2s,
						box-shadow 0.2s,
						transform 0.2s;

					&:hover {
						background-color: #fff;
						box-shadow: 0 0 0 1px rgb(53 91 219 / 8%);
					}

					&:focus-within {
						background-color: #fff;
						box-shadow:
							0 0 0 1px rgb(53 91 219 / 18%),
							0 10px 24px rgb(53 91 219 / 8%);
						transform: translateY(-1px);
					}

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

			.register-gift {
				box-sizing: border-box;
				margin-bottom: 18px;
				padding: 13px 14px;
				border: 1px solid rgb(24 169 153 / 24%);
				border-radius: 8px;
				background:
					linear-gradient(135deg, rgb(24 169 153 / 14%), rgb(53 91 219 / 10%)),
					rgb(255 255 255 / 78%);
				box-shadow:
					0 14px 28px rgb(24 169 153 / 10%),
					inset 0 1px 0 rgb(255 255 255 / 86%);

				&__badge {
					display: inline-flex;
					align-items: center;
					height: 24px;
					padding: 0 9px;
					border-radius: 8px;
					background-color: #202634;
					color: #fff;
					font-size: 12px;
					font-weight: 700;
					line-height: 24px;
					white-space: nowrap;

					span {
						margin-right: 5px;
					}
				}

				&__title {
					margin-top: 9px;
					color: #202634;
					font-size: 14px;
					font-weight: 800;
					line-height: 1.45;
					word-break: break-word;
				}
			}
		}

		.op {
			display: flex;
			flex-direction: column;
			gap: 12px;
			justify-content: center;
			margin-top: 28px;

			:deep(.el-button) {
				height: 45px;
				width: 100%;
				font-size: 16px;
				border-radius: 8px;
				letter-spacing: 1px;
				margin-left: 0;
			}

			:deep(.el-button--primary) {
				position: relative;
				overflow: hidden;
				border: 0;
				background: linear-gradient(135deg, #355bdb, #18a999);
				box-shadow: 0 16px 34px rgb(53 91 219 / 24%);
				transition:
					box-shadow 0.2s,
					transform 0.2s;

				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					width: 28%;
					height: 100%;
					background: linear-gradient(
						90deg,
						transparent,
						rgb(255 255 255 / 48%),
						transparent
					);
					transform: translate3d(-136%, 0, 0) skewX(-16deg);
					animation: button-shine 3.8s ease-in-out infinite;
					will-change: transform, opacity;
				}

				&:hover {
					box-shadow: 0 18px 38px rgb(24 169 153 / 28%);
					transform: translateY(-1px);
				}
			}

			:deep(.el-button.is-link) {
				height: auto;
				font-size: 14px;
				letter-spacing: 0;
			}
		}

		.client-download {
			display: grid;
			grid-template-columns: 38px minmax(0, 1fr) 34px;
			align-items: center;
			gap: 12px;
			width: 340px;
			max-width: calc(100vw - 48px);
			box-sizing: border-box;
			margin-top: 14px;
			padding: 10px 12px;
			border: 1px solid rgb(53 91 219 / 10%);
			border-radius: 8px;
			background-color: rgb(255 255 255 / 72%);
			box-shadow: inset 0 1px 0 rgb(255 255 255 / 78%);

			&__icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 38px;
				height: 38px;
				border-radius: 8px;
				background-color: #202634;
				color: #fff;

				.el-icon {
					font-size: 18px;
				}
			}

			&__body {
				min-width: 0;
			}

			&__title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 10px;
				min-width: 0;

				span {
					color: #202634;
					font-size: 14px;
					font-weight: 700;
					white-space: nowrap;
				}

				em {
					overflow: hidden;
					color: #1c7b71;
					font-size: 12px;
					font-style: normal;
					font-weight: 700;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			&__url {
				overflow: hidden;
				margin-top: 6px;
				color: #6b7585;
				font-size: 12px;
				line-height: 1.4;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			:deep(.el-button) {
				width: 34px;
				height: 34px;
				border: 0;
				background-color: #18a999;
				color: #fff;
				box-shadow: 0 10px 22px rgb(24 169 153 / 20%);

				&:hover,
				&:focus {
					background-color: #159a8c;
					color: #fff;
				}

				&.is-disabled {
					background-color: #d8dee8;
					box-shadow: none;
					color: #fff;
				}
			}
		}

		&.is-register {
			.login-panel {
				padding-top: 42px;
				padding-bottom: 34px;
			}

			.login-visual {
				opacity: 0.52;
			}

			.op {
				margin-top: 24px;
			}

			.client-download {
				margin-top: 14px;
			}
		}
	}
}

@media screen and (max-width: 1024px) {
	.page-login {
		.intro {
			display: none;
		}

		.bg {
			width: 100%;
			opacity: 0.35;
		}

		.box {
			width: 100%;
			background-color: rgb(255 255 255 / 92%);

			.login-panel {
				width: min(360px, calc(100vw - 48px));
				padding: 40px 30px 34px;
			}

			.login-visual {
				display: none;
			}

			.logo {
				max-width: calc(100vw - 48px);

				.icon {
					padding: 4px;
					margin-right: 8px;

					img {
						height: 32px;
					}
				}

				span {
					font-size: 30px;
					letter-spacing: 1px;
					white-space: nowrap;
				}
			}

			.mode-switch,
			.form,
			.client-download {
				width: 100%;
				max-width: 280px;
			}
		}

		.telegram-contact {
			top: auto;
			right: 16px;
			bottom: 16px;
			flex-direction: row;
			gap: 8px;
			width: auto;
			height: 44px;
			padding: 8px 12px;
			border-right: 1px solid rgb(255 255 255 / 44%);
			border-radius: 8px;
			transform: none;

			&:hover,
			&:focus {
				transform: translateY(-2px);
			}

			&__icon {
				width: 28px;
				height: 28px;

				.el-icon {
					font-size: 16px;
				}
			}

			&__label {
				margin-top: 0;
			}

			&__account {
				position: static;
				width: auto;
				transform: none;
			}
		}
	}
}

@media screen and (max-width: 480px) {
	.page-login {
		.box {
			padding: 78px 24px 32px;

			.login-panel {
				width: min(320px, 100%);
				padding: 34px 20px 30px;
			}

			.logo {
				max-width: 100%;
				margin-bottom: 16px;

				span {
					font-size: 26px;
				}
			}

			.mode-switch,
			.form,
			.client-download {
				width: 100%;
				max-width: 280px;
			}
		}
	}
}

@media screen and (max-width: 1360px) {
	.page-login {
		.intro {
			padding-left: 44px;

			h1 {
				font-size: 42px;
			}
		}

		.intro-visual {
			width: 500px;
		}
	}
}

@keyframes intro-rise {
	from {
		opacity: 0;
		transform: translateY(24px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes login-panel-in {
	from {
		opacity: 0;
		transform: translateY(26px) scale(0.98);
	}

	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

@keyframes panel-sheen {
	0%,
	48% {
		transform: translate3d(-102%, 0, 0) skewX(-16deg);
		opacity: 0;
	}

	58% {
		opacity: 1;
	}

	76%,
	100% {
		transform: translate3d(262%, 0, 0) skewX(-16deg);
		opacity: 0;
	}
}

@keyframes login-art-float {
	0%,
	100% {
		transform: translateY(0) rotate(-1deg);
	}

	50% {
		transform: translateY(12px) rotate(1deg);
	}
}

@keyframes login-chip-float {
	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-8px);
	}
}

@keyframes button-shine {
	0%,
	52% {
		transform: translate3d(-136%, 0, 0) skewX(-16deg);
		opacity: 0;
	}

	62% {
		opacity: 1;
	}

	86%,
	100% {
		transform: translate3d(421%, 0, 0) skewX(-16deg);
		opacity: 0;
	}
}

@keyframes panel-float {
	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-10px);
	}
}

@keyframes rail-drift {
	0%,
	100% {
		transform: translateX(0);
	}

	50% {
		transform: translateX(-14px);
	}
}

@keyframes flow-pulse {
	0%,
	100% {
		box-shadow: 0 0 0 0 rgb(246 189 96 / 0%);
	}

	50% {
		box-shadow: 0 0 0 8px rgb(246 189 96 / 16%);
	}
}

@keyframes stream-line {
	0% {
		transform: scaleX(0);
		transform-origin: left;
	}

	45%,
	100% {
		transform: scaleX(1);
		transform-origin: left;
	}
}

@keyframes scan {
	0%,
	100% {
		transform: translateY(0);
		opacity: 0;
	}

	15%,
	70% {
		opacity: 1;
	}

	75% {
		transform: translateY(138px);
		opacity: 0;
	}
}

@keyframes capability-in {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
