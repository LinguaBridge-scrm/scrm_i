<template>
	<div class="customer-whatsapp">
		<cl-crud ref="Crud">
			<cl-row>
				<cl-refresh-btn />
				<cl-flex1 />
				<cl-filter :label="t('平台')">
					<cl-select
						:options="platformOptions"
						prop="platform"
						:width="150"
						clearable
						filterable
						allow-create
					/>
				</cl-filter>
				<cl-search-key :placeholder="t('搜索账号、手机号、昵称')" :width="260" />
				<cl-search ref="Search" />
			</cl-row>

			<cl-row>
				<cl-table ref="Table" />
			</cl-row>

			<cl-row>
				<cl-flex1 />
				<cl-pagination />
			</cl-row>
		</cl-crud>

		<cl-dialog
			v-model="chat.visible"
			:title="chat.account ? accountTitle(chat.account) : t('平台会话')"
			width="1120px"
			class="whatsapp-dialog"
			modal-class="whatsapp-dialog-overlay"
			padding="0"
			:scrollbar="false"
			:lock-scroll="true"
			align-center
			append-to-body
		>
			<div class="whatsapp-shell">
				<aside class="conversation-pane">
					<div class="pane-head">
						<div class="account-brief">
							<el-avatar :src="chat.account?.avatar" :size="38">
								{{ avatarText(chat.account) }}
							</el-avatar>
							<div class="account-text">
								<strong>
									{{ accountTitle(chat.account) }}
									<el-tag size="small" effect="plain">
										{{ platformLabel(chat.account?.platform) }}
									</el-tag>
								</strong>
								<span>{{
									chat.account?.phone || platformAccountId(chat.account) || '-'
								}}</span>
							</div>
						</div>
						<el-button :icon="Refresh" circle @click="loadConversations" />
					</div>

					<el-scrollbar class="conversation-scroll" v-loading="chat.loadingConversations">
						<button
							v-for="item in chat.conversations"
							:key="item.id"
							class="conversation-item"
							:class="{ active: chat.activeConversation?.id === item.id }"
							@click="selectConversation(item)"
						>
							<el-avatar :src="item.peerAvatar" :size="42">
								{{ avatarText(item, 'peerName') }}
							</el-avatar>
							<span class="conversation-main">
								<span class="conversation-title-row">
									<strong>{{ conversationTitle(item) }}</strong>
									<time>{{ shortTime(item.lastMessageTime) }}</time>
								</span>
								<span class="conversation-preview">
									<el-icon><chat-dot-round /></el-icon>
									{{
										item.lastMessagePreview ||
										messageTypeLabel(item.lastMessageType)
									}}
								</span>
							</span>
						</button>

						<el-empty
							v-if="!chat.loadingConversations && chat.conversations.length === 0"
							:description="t('暂无会话')"
						/>
					</el-scrollbar>
				</aside>

				<section class="chat-pane">
					<div v-if="!chat.activeConversation" class="chat-empty">
						<el-empty :description="t('请选择会话')" />
					</div>

					<template v-else>
						<header class="chat-head">
							<div class="chat-peer">
								<el-avatar :src="chat.activeConversation.peerAvatar" :size="38">
									{{ avatarText(chat.activeConversation, 'peerName') }}
								</el-avatar>
								<div>
									<strong>{{
										conversationTitle(chat.activeConversation)
									}}</strong>
									<span>
										{{
											chat.activeConversation.peerPhone ||
											chat.activeConversation.peerKey ||
											platformConversationId(chat.activeConversation)
										}}
									</span>
								</div>
							</div>
							<div class="chat-head-actions">
								<div class="translate-control">
									<span>{{ t('翻译') }}</span>
									<el-switch
										v-model="translation.enabled"
										:loading="translation.loading"
										@change="onTranslationToggle"
									/>
								</div>
								<el-select
									v-model="translation.targetLang"
									class="translate-lang"
									size="small"
									:disabled="!translation.enabled"
									:placeholder="t('译文语言')"
									@change="onTranslationTargetChange"
								>
									<el-option
										v-for="item in translationLanguageOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
								<el-tag
									size="small"
									:type="chat.activeConversation.chatType === 1 ? 'success' : 'info'"
								>
									{{
										chat.activeConversation.chatType === 1
											? t('群聊')
											: t('私聊')
									}}
								</el-tag>
							</div>
						</header>

						<el-scrollbar
							ref="MessageBody"
							class="message-body"
							v-loading="chat.loadingMessages"
						>
							<div class="message-list">
								<div class="load-older">
									<el-button
										v-if="!chat.messageFinished"
										:icon="ArrowUp"
										size="small"
										:loading="chat.loadingMessages"
										@click="loadMessages(true)"
									>
										{{ t('加载更早消息') }}
									</el-button>
									<span v-else>{{ t('没有更早消息') }}</span>
								</div>

								<div
									v-for="item in chat.messages"
									:key="item.id"
									class="message-row"
									:class="{ outgoing: item.direction === 1 }"
								>
									<div class="message-bubble">
										<div class="message-sender">
											{{
												item.direction === 1
													? t('我')
													: item.senderName ||
														item.senderPhone ||
														t('对方')
											}}
										</div>

										<div class="message-content">
											<template v-if="item.messageType === 0">
												<div>{{ item.textContent || '-' }}</div>
												<div
													v-if="translation.enabled"
													class="message-translation"
													:class="{ 'is-error': item.translationError }"
												>
													<span class="translation-label">
														{{ translationLabel(item) }}
													</span>
													<span>
														{{
															item.translationLoading
																? t('翻译中...')
																: item.translationError ||
																	item.translatedText ||
																	t('暂无译文')
														}}
													</span>
												</div>
											</template>

											<audio
												v-else-if="item.messageType === 1 && item.mediaUrl"
												:src="item.mediaUrl"
												controls
											/>

											<el-image
												v-else-if="item.messageType === 2 && item.mediaUrl"
												:src="item.mediaUrl"
												:preview-src-list="[item.mediaUrl]"
												fit="cover"
												class="message-image"
											/>

											<video
												v-else-if="item.messageType === 3 && item.mediaUrl"
												:src="item.mediaUrl"
												:poster="item.thumbnailUrl"
												controls
												class="message-video"
											/>

											<div v-else class="message-file">
												<el-icon>
													<component
														:is="messageIcon(item.messageType)"
													/>
												</el-icon>
												<div>
													<strong>{{
														messageTypeLabel(item.messageType)
													}}</strong>
													<pre>{{
														formatJson(item.rawPayload || item)
													}}</pre>
												</div>
											</div>
										</div>

										<div class="message-meta">
											<span>{{
												shortTime(item.sentTime || item.createTime)
											}}</span>
											<span v-if="item.direction === 1">{{
												messageStatusLabel(item.messageStatus)
											}}</span>
										</div>
									</div>
								</div>

								<el-empty
									v-if="!chat.loadingMessages && chat.messages.length === 0"
									:description="t('暂无消息')"
								/>
							</div>
						</el-scrollbar>
					</template>
				</section>
			</div>
		</cl-dialog>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-whatsapp'
});

import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { nextTick, reactive, ref } from 'vue';
import {
	ArrowUp,
	ChatDotRound,
	Document,
	Microphone,
	Picture,
	Refresh,
	VideoPlay
} from '@element-plus/icons-vue';

const { t } = useI18n();
const accountService = new BaseService('admin/customer/whatsapp-account');
const conversationService = new BaseService('admin/customer/whatsapp-conversation');
const messageService = new BaseService('admin/customer/whatsapp-message');

const MessageBody = ref<any>();

type TagType = 'success' | 'info' | 'warning' | 'danger';

const accountStatusOptions: Array<{ label: string; value: number; type: TagType }> = [
	{ label: t('离线'), value: 0, type: 'info' },
	{ label: t('在线'), value: 1, type: 'success' },
	{ label: t('异常'), value: 2, type: 'danger' }
];

const platformOptions: Array<{ label: string; value: string; type: TagType }> = [
	{ label: 'WhatsApp', value: 'whatsapp', type: 'success' },
	{ label: 'Telegram', value: 'telegram', type: 'info' },
	{ label: t('其他'), value: 'other', type: 'warning' }
];

const messageTypeOptions = [
	{ label: t('文本'), value: 0 },
	{ label: t('语音'), value: 1 },
	{ label: t('图片'), value: 2 },
	{ label: t('视频'), value: 3 },
	{ label: t('其他'), value: 4 }
];

const messageStatusOptions = [
	{ label: t('未知'), value: 0 },
	{ label: t('已发送'), value: 1 },
	{ label: t('已送达'), value: 2 },
	{ label: t('已读'), value: 3 },
	{ label: t('失败'), value: 4 }
];

const translationLanguageOptions = [
	{ label: t('中文'), value: 'zh-CN' },
	{ label: 'English', value: 'en' },
	{ label: 'Tiếng Việt', value: 'vi' },
	{ label: 'ไทย', value: 'th' },
	{ label: 'Bahasa Indonesia', value: 'id' },
	{ label: 'Español', value: 'es' },
	{ label: 'Português', value: 'pt' },
	{ label: 'العربية', value: 'ar' },
	{ label: 'हिन्दी', value: 'hi' },
	{ label: '日本語', value: 'ja' },
	{ label: '한국어', value: 'ko' },
	{ label: 'Русский', value: 'ru' },
	{ label: 'Français', value: 'fr' },
	{ label: 'Deutsch', value: 'de' }
];

const chat = reactive({
	visible: false,
	account: null as any,
	conversations: [] as any[],
	activeConversation: null as any,
	messages: [] as any[],
	messagePage: 1,
	messageSize: 20,
	messageFinished: false,
	loadingConversations: false,
	loadingMessages: false
});

const translation = reactive({
	enabled: false,
	targetLang: 'zh-CN',
	loading: false
});

function accountTitle(row: any) {
	return row?.displayName || row?.phone || platformAccountId(row) || t('平台账号');
}

function platformLabel(value: any) {
	const platform = String(value || 'whatsapp').toLowerCase();
	return platformOptions.find(e => e.value === platform)?.label || platform;
}

function conversationTitle(row: any) {
	return (
		row?.peerName ||
		row?.peerPhone ||
		row?.peerKey ||
		platformConversationId(row) ||
		t('未命名会话')
	);
}

function avatarText(row: any, key = 'displayName') {
	return String(row?.[key] || row?.phone || platformAccountId(row) || 'P')
		.slice(0, 1)
		.toUpperCase();
}

function platformAccountId(row: any) {
	return row?.platformAccountId || row?.accountKey || row?.accountId;
}

function platformConversationId(row: any) {
	return row?.platformConversationId || row?.conversationKey || row?.conversationId;
}

function shortTime(value: any) {
	if (!value) {
		return '-';
	}
	const text = String(value);
	return text.length > 16 ? text.slice(5, 16) : text;
}

function messageTypeLabel(value: number) {
	return messageTypeOptions.find(e => e.value === Number(value))?.label || t('其他');
}

function messageStatusLabel(value: number) {
	return messageStatusOptions.find(e => e.value === Number(value))?.label || t('未知');
}

function translationLabel(item: any) {
	const lang = item.translationTargetLang || translation.targetLang;
	const option = translationLanguageOptions.find(e => e.value === lang);
	return option ? option.label : lang;
}

function messageIcon(type: number) {
	if (type === 1) {
		return Microphone;
	}
	if (type === 2) {
		return Picture;
	}
	if (type === 3) {
		return VideoPlay;
	}
	return Document;
}

function formatJson(data: any) {
	try {
		return JSON.stringify(data, null, 2);
	} catch {
		return String(data || '');
	}
}

function pageList(res: any) {
	return Array.isArray(res) ? res : res?.list || [];
}

function opRow(options: any) {
	return options?.scope?.row || options?.row || {};
}

function scrollMessageToBottom() {
	const wrap = MessageBody.value?.wrapRef;
	MessageBody.value?.setScrollTop(wrap?.scrollHeight || 0);
}

function isTranslatableMessage(item: any) {
	return Number(item?.messageType) === 0 && !!item?.id && !!String(item?.textContent || '').trim();
}

function onTranslationToggle(value: string | number | boolean) {
	if (value) {
		translateMessages(chat.messages);
	}
}

function onTranslationTargetChange() {
	if (translation.enabled) {
		translateMessages(chat.messages, true);
	}
}

async function translateMessages(messages: any[] = chat.messages, force = false) {
	if (!translation.enabled) {
		return;
	}

	const targetLang = translation.targetLang;
	const pending = messages.filter(item => {
		if (!isTranslatableMessage(item) || item.translationLoading) {
			return false;
		}
		return (
			force ||
			item.translationTargetLang !== targetLang ||
			(!item.translatedText && !item.translationError)
		);
	});

	if (pending.length === 0) {
		return;
	}

	translation.loading = true;
	pending.forEach(item => {
		item.translationLoading = true;
		item.translationError = '';
	});

	try {
		const res = await messageService.request({
			url: '/translate',
			method: 'POST',
			data: {
				ids: pending.map(item => item.id),
				sourceLang: 'auto',
				targetLang
			}
		});
		const data: any = res;
		const resultMap = new Map((data?.items || []).map((item: any) => [item.id, item]));

		pending.forEach(item => {
			const result: any = resultMap.get(item.id);
			item.translationLoading = false;
			item.translationTargetLang = targetLang;
			if (result?.translatedText) {
				item.translatedText = result.translatedText;
				item.translationError = '';
			} else {
				item.translatedText = '';
				item.translationError = result?.error || t('暂无译文');
			}
		});
	} catch (err: any) {
		pending.forEach(item => {
			item.translationLoading = false;
			item.translationTargetLang = targetLang;
			item.translatedText = '';
			item.translationError = err?.message || t('翻译失败');
		});
	} finally {
		translation.loading = false;
	}
}

async function openAccount(row: any) {
	chat.account = row;
	chat.visible = true;
	chat.activeConversation = null;
	chat.messages = [];
	await loadConversations();
}

async function loadConversations() {
	if (!chat.account?.id) {
		return;
	}
	chat.loadingConversations = true;
	try {
		const res = await conversationService.page({
			page: 1,
			size: 50,
			platform: chat.account.platform,
			accountId: chat.account.id
		});
		chat.conversations = pageList(res);
		if (chat.conversations.length > 0) {
			await selectConversation(chat.conversations[0]);
		}
	} finally {
		chat.loadingConversations = false;
	}
}

async function selectConversation(row: any) {
	chat.activeConversation = row;
	chat.messages = [];
	chat.messagePage = 1;
	chat.messageFinished = false;
	await loadMessages(false);
}

async function loadMessages(loadOlder = false) {
	if (!chat.activeConversation?.id || chat.loadingMessages) {
		return;
	}
	chat.loadingMessages = true;
	try {
		const page = loadOlder ? chat.messagePage + 1 : 1;
		const res = await messageService.page({
			page,
			size: chat.messageSize,
			platform: chat.account.platform,
			accountId: chat.account.id,
			conversationId: chat.activeConversation.id
		});
		const list = pageList(res).reverse();
		chat.messageFinished = list.length < chat.messageSize;
		chat.messagePage = page;
		chat.messages = loadOlder ? [...list, ...chat.messages] : list;
		if (translation.enabled) {
			translateMessages(list);
		}
		if (!loadOlder) {
			await nextTick();
			scrollMessageToBottom();
		}
	} finally {
		chat.loadingMessages = false;
	}
}

const Table = useTable({
	columns: [
		{
			label: t('平台'),
			prop: 'platform',
			minWidth: 110,
			dict: platformOptions
		},
		{
			label: t('账号'),
			prop: 'displayName',
			minWidth: 180,
			showOverflowTooltip: true,
			formatter(row) {
				return accountTitle(row);
			}
		},
		{ label: t('手机号'), prop: 'phone', minWidth: 140, showOverflowTooltip: true },
		{
			label: t('平台账号标识'),
			prop: 'platformAccountId',
			minWidth: 220,
			showOverflowTooltip: true,
			formatter(row) {
				return platformAccountId(row);
			}
		},
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('客户用户'), prop: 'customerUsername', minWidth: 120 },
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 100,
			dict: accountStatusOptions
		},
		{
			label: t('最后同步'),
			prop: 'lastSyncTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('最后消息'),
			prop: 'lastMessageTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{
			type: 'op',
			width: 130,
			buttons: [
				{
					label: t('查看对话'),
					type: 'primary',
					onClick(options: any) {
						openAccount(opRow(options));
					}
				}
			]
		}
	]
});

const Search = useSearch({
	items: [
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'el-select', options: accountStatusOptions, props: { clearable: true } }
		}
	]
});

const Crud = useCrud(
	{
		service: accountService
	},
	app => {
		app.refresh();
	}
);
</script>

<style lang="scss" scoped>
.customer-whatsapp {
	height: 100%;
}

:global(.whatsapp-dialog-overlay .el-overlay-dialog) {
	display: flex;
	box-sizing: border-box;
	padding: 24px;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

:global(.whatsapp-dialog.el-dialog) {
	max-height: calc(100vh - 48px);
	max-width: calc(100vw - 48px);
	margin: 0 !important;
}

:global(.whatsapp-dialog.el-dialog.is-fullscreen) {
	height: auto !important;
	border-radius: 8px;
}

:global(.whatsapp-dialog .el-dialog__body) {
	min-height: 0;
	overflow: hidden;
}

:global(.whatsapp-dialog .cl-dialog__default) {
	height: 100%;
	min-height: 0;
	overflow: hidden;
}

.whatsapp-shell {
	display: grid;
	grid-template-columns: 320px minmax(0, 1fr);
	height: min(76vh, 760px);
	min-height: 0;
	overflow: hidden;
	border: 1px solid var(--el-border-color-light);
	border-radius: 8px;
	background: var(--el-bg-color);
}

.conversation-pane {
	display: flex;
	min-height: 0;
	min-width: 0;
	overflow: hidden;
	border-right: 1px solid var(--el-border-color-light);
	flex-direction: column;
	background: #fbfcfd;
}

.pane-head,
.chat-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 64px;
	padding: 0 14px;
	border-bottom: 1px solid var(--el-border-color-light);
	background: var(--el-bg-color);
}

.chat-head {
	height: auto;
	min-height: 64px;
	gap: 12px;
}

.chat-head-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 8px;
	flex-wrap: wrap;
}

.translate-control {
	display: flex;
	align-items: center;
	gap: 6px;
	color: var(--el-text-color-secondary);
	font-size: 12px;
	white-space: nowrap;
}

.translate-lang {
	width: 132px;
}

.account-brief,
.chat-peer {
	display: flex;
	align-items: center;
	min-width: 0;
	gap: 10px;
}

.account-text,
.chat-peer > div {
	display: flex;
	min-width: 0;
	flex-direction: column;
}

.account-text strong,
.chat-peer strong {
	overflow: hidden;
	font-size: 14px;
	line-height: 20px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.account-text span,
.chat-peer span {
	overflow: hidden;
	color: var(--el-text-color-secondary);
	font-size: 12px;
	line-height: 18px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.conversation-scroll {
	flex: 1;
	min-height: 0;
}

.conversation-item {
	display: grid;
	grid-template-columns: 42px minmax(0, 1fr);
	width: 100%;
	min-height: 72px;
	padding: 12px;
	align-items: center;
	gap: 10px;
	border: 0;
	border-bottom: 1px solid var(--el-border-color-lighter);
	background: transparent;
	color: var(--el-text-color-primary);
	text-align: left;
	cursor: pointer;
}

.conversation-item:hover,
.conversation-item.active {
	background: #eef7f3;
}

.conversation-main,
.conversation-title-row,
.conversation-preview {
	min-width: 0;
}

.conversation-main {
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.conversation-title-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}

.conversation-title-row strong {
	overflow: hidden;
	font-size: 14px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.conversation-title-row time {
	color: var(--el-text-color-secondary);
	font-size: 12px;
	white-space: nowrap;
}

.conversation-preview {
	display: flex;
	align-items: center;
	gap: 4px;
	overflow: hidden;
	color: var(--el-text-color-secondary);
	font-size: 12px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.chat-pane {
	display: flex;
	min-height: 0;
	min-width: 0;
	overflow: hidden;
	flex-direction: column;
	background: #f6f7f9;
}

.chat-empty {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;
}

.message-body {
	flex: 1;
	min-height: 0;
	overflow: hidden;
}

.message-list {
	min-height: 100%;
	padding: 14px 18px;
}

.load-older {
	display: flex;
	height: 34px;
	align-items: center;
	justify-content: center;
	color: var(--el-text-color-secondary);
	font-size: 12px;
}

.message-row {
	display: flex;
	margin: 8px 0;
	justify-content: flex-start;
}

.message-row.outgoing {
	justify-content: flex-end;
}

.message-bubble {
	max-width: min(68%, 560px);
	padding: 8px 10px 6px;
	border: 1px solid var(--el-border-color-lighter);
	border-radius: 8px;
	background: var(--el-bg-color);
	box-shadow: 0 1px 2px rgb(31 35 41 / 5%);
}

.message-row.outgoing .message-bubble {
	border-color: #cfe9d9;
	background: #e7f6ec;
}

.message-sender {
	margin-bottom: 4px;
	color: var(--el-text-color-secondary);
	font-size: 12px;
	line-height: 16px;
}

.message-content {
	color: var(--el-text-color-primary);
	font-size: 14px;
	line-height: 1.55;
	white-space: pre-wrap;
	word-break: break-word;
}

.message-translation {
	margin-top: 8px;
	padding-top: 8px;
	border-top: 1px dashed var(--el-border-color);
	color: var(--el-text-color-regular);
	font-size: 13px;
	line-height: 1.55;
}

.message-translation.is-error {
	color: var(--el-color-danger);
}

.translation-label {
	display: inline-block;
	margin-right: 6px;
	color: var(--el-text-color-secondary);
	font-size: 12px;
}

.message-content audio {
	width: min(280px, 56vw);
}

.message-image,
.message-video {
	display: block;
	width: min(320px, 58vw);
	max-height: 360px;
	border-radius: 6px;
	background: #111827;
	object-fit: contain;
}

.message-file {
	display: flex;
	min-width: 260px;
	max-width: 520px;
	gap: 10px;
}

.message-file .el-icon {
	margin-top: 2px;
	color: #198754;
	font-size: 18px;
}

.message-file pre {
	max-height: 180px;
	margin: 6px 0 0;
	padding: 8px;
	overflow: auto;
	border-radius: 6px;
	background: rgb(31 35 41 / 6%);
	font-size: 12px;
	line-height: 1.45;
	white-space: pre-wrap;
	word-break: break-all;
}

.message-meta {
	display: flex;
	margin-top: 4px;
	justify-content: flex-end;
	gap: 8px;
	color: var(--el-text-color-secondary);
	font-size: 11px;
	line-height: 16px;
}

@media (max-width: 900px) {
	:global(.whatsapp-dialog-overlay .el-overlay-dialog) {
		padding: 16px;
	}

	:global(.whatsapp-dialog.el-dialog) {
		max-height: calc(100vh - 32px);
		max-width: calc(100vw - 32px);
	}

	.whatsapp-shell {
		grid-template-columns: 1fr;
		height: calc(100vh - 96px);
		min-height: 0;
	}

	.conversation-pane {
		height: 220px;
		border-right: 0;
		border-bottom: 1px solid var(--el-border-color-light);
	}

	.message-bubble {
		max-width: 86%;
	}

	.chat-head {
		align-items: flex-start;
		flex-direction: column;
		padding: 10px 14px;
	}

	.chat-head-actions {
		width: 100%;
		justify-content: flex-start;
	}
}
</style>
