<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="t('搜索内容、账号、会话、消息ID')" :width="280" />
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-content="{ scope }">
					<div class="message-content-cell">
						<div
							v-if="scope.row.attribute || scope.row.action"
							class="message-content-cell__meta"
						>
							<el-tag
								v-if="scope.row.attribute"
								size="small"
								type="info"
								effect="plain"
							>
								{{ scope.row.attribute }}
							</el-tag>
							<el-tag
								v-if="scope.row.action"
								size="small"
								type="primary"
								effect="plain"
							>
								{{ scope.row.action }}
							</el-tag>
						</div>

						<div
							v-if="displayMessageText(scope.row)"
							class="message-content-cell__text"
							:title="displayMessageText(scope.row)"
						>
							{{ displayMessageText(scope.row) }}
						</div>

						<div
							v-if="scope.row.image || scope.row.video"
							class="message-content-cell__media"
						>
							<el-image
								v-if="scope.row.image"
								:src="scope.row.image"
								:preview-src-list="[scope.row.image]"
								preview-teleported
								fit="cover"
								class="message-content-cell__image"
							/>
							<el-link
								v-if="scope.row.video"
								:href="scope.row.video"
								target="_blank"
								type="primary"
								:underline="false"
							>
								{{ t('视频') }}
							</el-link>
						</div>

						<span v-if="!hasMessageContent(scope.row)" class="message-content-cell__empty">
							-
						</span>
					</div>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-message'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useBase } from '/@/modules/base';
import { useI18n } from 'vue-i18n';
import { computed, reactive } from 'vue';

const { service } = useCool();
const { user } = useBase();
const { t } = useI18n();
const isTenantAdmin = computed(() => !!user.info?.tenantId);

// 选项
const options = reactive({
	platform: [
		{ label: t('TG'), value: 0 },
		{ label: t('WhatsApp'), value: 1 },
		{ label: t('其他'), value: 2 }
	],
	messageType: [
		{ label: t('文本'), value: 0 },
		{ label: t('媒体'), value: 1 },
		{ label: t('交互'), value: 2 }
	],
	isException: [
		{ label: t('否'), value: 0, type: 'danger' },
		{ label: t('是'), value: 1, type: 'success' }
	]
});

const userPickerColumns = [
	{ label: t('用户名'), prop: 'username', minWidth: 180 },
	{ label: t('租户'), prop: 'tenantName', minWidth: 140 }
];

function displayMessageText(row: Eps.CustomerMessageEntity) {
	const content = String(row?.content || '').trim();
	const attribute = String(row?.attribute || '').trim();

	if ((row?.image || row?.video) && attribute && content === attribute) {
		return '';
	}

	return content;
}

function hasMessageContent(row: Eps.CustomerMessageEntity) {
	return Boolean(
		row?.attribute ||
			row?.action ||
			displayMessageText(row) ||
			row?.image ||
			row?.video
	);
}

// cl-upsert
const Upsert = useUpsert({
	items: [
		() => {
			return {
				label: t('租户'),
				prop: 'tenantId',
				hidden: isTenantAdmin.value,
				component: {
					name: 'cl-user-select',
					props: {
						labelKey: 'username',
						placeholder: t('请选择租户'),
						immediate: true
					}
				},
				span: 12,
				required: !isTenantAdmin.value
			};
		},
		{
			label: t('用户名'),
			prop: 'username',
			component: {
				name: 'el-input',
				props: { type: 'textarea' }
			},
			span: 12,
			required: true
		},
		{
			label: t('平台类型'),
			prop: 'platform',
			component: { name: 'el-radio-group', options: options.platform },
			value: 0,
			required: true
		},
		{
			label: t('消息类型'),
			prop: 'messageType',
			component: { name: 'el-radio-group', options: options.messageType },
			value: 0,
			required: true
		},
		{
			label: t('消息属性'),
			prop: 'attribute',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('消息行为'),
			prop: 'action',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('文本内容'),
			prop: 'content',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			}
		},
		{ label: t('图片'), prop: 'image', component: { name: 'cl-upload' } },
		{
			label: t('视频'),
			prop: 'video',
			component: { name: 'cl-upload', props: { type: 'file', limit: 1 } }
		},
		{
			label: t('对象昵称'),
			prop: 'targetNickName',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('选择对象'),
			prop: 'targetId',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('对象手机号'),
			prop: 'targetPhone',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('发送者昵称'),
			prop: 'senderNickName',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('选择发送者'),
			prop: 'senderId',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('发送者手机号'),
			prop: 'senderPhone',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('是否异常'),
			prop: 'isException',
			component: { name: 'el-radio-group', options: options.isException },
			value: 0,
			required: true
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('用户名'), prop: 'username', minWidth: 140 },
		{
			label: t('平台类型'),
			prop: 'platform',
			minWidth: 120,
			dict: options.platform
		},
		{ label: t('来源平台'), prop: 'sourcePlatform', minWidth: 120 },
		{
			label: t('来源账号'),
			prop: 'sourceAccountKey',
			showOverflowTooltip: true,
			minWidth: 180
		},
		{
			label: t('来源会话'),
			prop: 'sourceConversationKey',
			showOverflowTooltip: true,
			minWidth: 180
		},
		{
			label: t('来源消息ID'),
			prop: 'sourceMessageKey',
			showOverflowTooltip: true,
			minWidth: 220
		},
		{
			label: t('消息类型'),
			prop: 'messageType',
			minWidth: 120,
			dict: options.messageType
		},
		{ label: t('内容'), prop: 'content', minWidth: 320 },
		{ label: t('对象昵称'), prop: 'targetNickName', minWidth: 140 },
		{ label: t('对象ID'), prop: 'targetId', minWidth: 140 },
		{ label: t('对象手机号'), prop: 'targetPhone', minWidth: 140 },
		{ label: t('发送者昵称'), prop: 'senderNickName', minWidth: 140 },
		{ label: t('发送者ID'), prop: 'senderId', minWidth: 140 },
		{ label: t('发送者手机号'), prop: 'senderPhone', minWidth: 140 },
		{
			label: t('是否异常'),
			prop: 'isException',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.isException
		},
		{
			label: t('消息时间'),
			prop: 'messageTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('更新时间'),
			prop: 'updateTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

// cl-search
const Search = useSearch({
	items: [
		{
			label: t('文本内容'),
			prop: 'content',
			component: {
				name: 'el-input',
				props: {
					clearable: true,
					placeholder: t('文本内容')
				}
			}
		},
		{
			label: t('用户名'),
			prop: 'username',
			component: {
				name: 'cl-select-table',
				props: {
					title: t('选择用户'),
					placeholder: t('选择用户'),
					service: service.customer.user,
					columns: userPickerColumns,
					multiple: false,
					dict: {
						id: 'username',
						text: 'username'
					},
					pickerType: 'text'
				}
			}
		},
		{
			label: t('平台类型'),
			prop: 'platform',
			component: {
				name: 'cl-select',
				props: {
					clearable: true,
					options: options.platform
				}
			}
		},
		{
			label: t('消息类型'),
			prop: 'messageType',
			component: {
				name: 'cl-select',
				props: {
					clearable: true,
					options: options.messageType
				}
			}
		},
		{
			label: t('是否异常'),
			prop: 'isException',
			component: {
				name: 'cl-select',
				props: {
					clearable: true,
					options: options.isException
				}
			}
		}
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.customer.message
	},
	app => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>

<style lang="scss" scoped>
.message-content-cell {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	min-width: 0;
	gap: 6px;
	padding: 4px 0;

	&__meta,
	&__media {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
	}

	&__text {
		display: -webkit-box;
		width: 100%;
		overflow: hidden;
		line-height: 1.5;
		white-space: pre-wrap;
		word-break: break-word;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	&__image {
		width: 56px;
		height: 56px;
		border-radius: 6px;
	}

	&__empty {
		color: var(--el-text-color-placeholder);
	}
}
</style>
