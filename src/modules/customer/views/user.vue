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
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-password="{ scope }">
					<div class="password-cell">
						<span class="password-cell__text">
							{{ isPasswordVisible(scope.row) ? passwordText(scope.row.password) : passwordMask(scope.row.password) }}
						</span>
						<el-button
							link
							type="primary"
							size="small"
							:icon="isPasswordVisible(scope.row) ? Hide : View"
							:title="isPasswordVisible(scope.row) ? t('隐藏密码') : t('显示密码')"
							@click.stop="togglePassword(scope.row)"
							@dblclick.stop
						/>
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

		<cl-dialog
			v-model="accountDialog.visible"
			:title="accountDialog.user ? `${accountDialog.user.username} - ${t('登陆平台账号')}` : t('登陆平台账号')"
			width="980px"
			:scrollbar="false"
		>
			<el-table
				v-loading="accountDialog.loading"
				:data="accountDialog.list"
				border
				height="520"
				:empty-text="t('暂无平台账号')"
			>
				<el-table-column :label="t('头像')" width="86" align="center">
					<template #default="{ row }">
						<el-avatar :src="row.avatar" :size="36">
							{{ avatarText(row) }}
						</el-avatar>
					</template>
				</el-table-column>

				<el-table-column :label="t('平台')" prop="platform" width="110">
					<template #default="{ row }">
						<el-tag size="small" effect="plain">{{ platformLabel(row.platform) }}</el-tag>
					</template>
				</el-table-column>

				<el-table-column
					:label="t('账号')"
					prop="displayName"
					min-width="160"
					show-overflow-tooltip
				>
					<template #default="{ row }">
						{{ accountTitle(row) }}
					</template>
				</el-table-column>

				<el-table-column
					:label="t('手机号')"
					prop="phone"
					min-width="130"
					show-overflow-tooltip
				/>

				<el-table-column :label="t('在线状态')" prop="status" width="110">
					<template #default="{ row }">
						<el-tag :type="accountStatusType(row.status)" size="small">
							{{ accountStatusLabel(row.status) }}
						</el-tag>
					</template>
				</el-table-column>

				<el-table-column
					:label="t('最后消息')"
					prop="lastMessageTime"
					min-width="160"
				>
					<template #default="{ row }">
						{{ formatDateText(row.lastMessageTime) }}
					</template>
				</el-table-column>

				<el-table-column
					:label="t('最后同步')"
					prop="lastSyncTime"
					min-width="160"
				>
					<template #default="{ row }">
						{{ formatDateText(row.lastSyncTime) }}
					</template>
				</el-table-column>

				<el-table-column
					:label="t('平台账号标识')"
					prop="accountKey"
					min-width="220"
					show-overflow-tooltip
				/>
			</el-table>
		</cl-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-user'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useBase } from '/@/modules/base';
import { useI18n } from 'vue-i18n';
import { computed, reactive } from 'vue';
import dayjs from 'dayjs';
import { Hide, View } from '@element-plus/icons-vue';

const { service } = useCool();
const { user } = useBase();
const { t } = useI18n();
const isTenantUser = computed(() => !!user.info?.tenantId);

// 选项
const options = reactive({
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	],
	walletMonitorStatus: [
		{ label: t('关'), value: 0, type: 'danger' },
		{ label: t('开'), value: 1, type: 'success' }
	],
	keywordMonitorStatus: [
		{ label: t('关'), value: 0, type: 'danger' },
		{ label: t('开'), value: 1, type: 'success' }
	],
	globalStatus: [
		{ label: t('关'), value: 0, type: 'danger' },
		{ label: t('开'), value: 1, type: 'success' }
	],
	interceptStatus: [
		{ label: t('关'), value: 0, type: 'danger' },
		{ label: t('开'), value: 1, type: 'success' }
	],
	materialLibraryStatus: [
		{ label: t('关'), value: 0, type: 'danger' },
		{ label: t('开'), value: 1, type: 'success' }
	]
});

const accountStatusOptions: Array<{ label: string; value: number; type: 'success' | 'info' | 'danger' }> = [
	{ label: t('离线'), value: 0, type: 'info' },
	{ label: t('在线'), value: 1, type: 'success' },
	{ label: t('异常'), value: 2, type: 'danger' }
];

const platformOptions = [
	{ label: 'WhatsApp', value: 'whatsapp' },
	{ label: 'Telegram', value: 'telegram' },
	{ label: t('其他'), value: 'other' }
];

const accountDialog = reactive({
	visible: false,
	loading: false,
	user: null as Eps.CustomerUserEntity | null,
	list: [] as Eps.CustomerWhatsappAccountEntity[]
});

function getCurrentDateTime() {
	return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

function platformLabel(value: any) {
	const platform = String(value || 'whatsapp').toLowerCase();
	return platformOptions.find(e => e.value === platform)?.label || platform;
}

function accountTitle(row: Eps.CustomerWhatsappAccountEntity) {
	return row.displayName || row.phone || row.accountKey || t('平台账号');
}

function avatarText(row: Eps.CustomerWhatsappAccountEntity) {
	return String(accountTitle(row)).slice(0, 1).toUpperCase();
}

function accountStatusLabel(value: any) {
	return accountStatusOptions.find(e => e.value === Number(value))?.label || t('未知');
}

function accountStatusType(value: any) {
	return accountStatusOptions.find(e => e.value === Number(value))?.type || 'warning';
}

function formatDateText(value: any) {
	return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-';
}

const visiblePasswordRows = reactive<Record<string, boolean>>({});

function passwordRowKey(row: Eps.CustomerUserEntity) {
	return String(row?.id || row?.username || '');
}

function isPasswordVisible(row: Eps.CustomerUserEntity) {
	const key = passwordRowKey(row);
	return !!key && !!visiblePasswordRows[key];
}

function togglePassword(row: Eps.CustomerUserEntity) {
	const key = passwordRowKey(row);
	if (key) {
		visiblePasswordRows[key] = !visiblePasswordRows[key];
	}
}

function passwordText(value: any) {
	return value ? String(value) : '-';
}

function passwordMask(value: any) {
	return value ? '••••••••' : '-';
}

async function openPlatformAccounts(row: Eps.CustomerUserEntity) {
	if (!row?.id) {
		return;
	}

	accountDialog.user = row;
	accountDialog.visible = true;
	accountDialog.loading = true;
	accountDialog.list = [];

	try {
		accountDialog.list = await service.customer.whatsappAccount.list({
			userId: row.id
		});
	} finally {
		accountDialog.loading = false;
	}
}

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('用户名'),
			prop: 'username',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('密码'),
			prop: 'password',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		() => {
			return {
				label: t('消耗字符数'),
				prop: 'consumedCharacters',
				hook: 'number',
				value: 0,
				component: {
					name: 'el-input-number',
					props: {
						min: 0,
						disabled: isTenantUser.value
					}
				},
				span: 12,
				required: true
			};
		},
		() => {
			return {
				label: t('占用端口'),
				prop: 'occupiedPorts',
				hook: 'number',
				value: 0,
				component: {
					name: 'el-input-number',
					props: {
						min: 0,
						disabled: isTenantUser.value
					}
				},
				span: 12,
				required: true
			};
		},
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'el-radio-group', options: options.status },
			value: 1,
			required: true
		},
		{
			label: t('钱包监控'),
			prop: 'walletMonitorStatus',
			component: {
				name: 'el-radio-group',
				options: options.walletMonitorStatus
			},
			value: 0,
			required: true
		},
		{
			label: t('关键词监控'),
			prop: 'keywordMonitorStatus',
			component: {
				name: 'el-radio-group',
				options: options.keywordMonitorStatus
			},
			value: 0,
			required: true
		},
		{
			label: t('全局开关'),
			prop: 'globalStatus',
			component: {
				name: 'el-radio-group',
				options: options.globalStatus
			},
			value: 0,
			required: true
		},
		{
			label: t('拦截开关'),
			prop: 'interceptStatus',
			component: {
				name: 'el-radio-group',
				options: options.interceptStatus
			},
			value: 0,
			required: true
		},
		{
			label: t('素材库'),
			prop: 'materialLibraryStatus',
			component: {
				name: 'el-radio-group',
				options: options.materialLibraryStatus
			},
			value: 0,
			required: true
		},
		{
			label: t('备注'),
			prop: 'remark',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			}
		},
		{
			label: t('最后登录信息'),
			prop: 'loginInfo',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4, disabled: true }
			}
		},
		{
			label: t('最后登录时间'),
			prop: 'lastLoginTime',
			value: getCurrentDateTime(),
			component: {
				name: 'el-date-picker',
				props: {
					type: 'datetime',
					valueFormat: 'YYYY-MM-DD HH:mm:ss',
					disabled: true
				}
			},
			span: 12
		}
	],

	onOpened(data) {
		if (Upsert.value?.mode == 'add') {
			data.consumedCharacters = 0;
			data.occupiedPorts = 0;
			data.lastLoginTime = data.lastLoginTime || getCurrentDateTime();
		}
	}
});

// cl-table
const Table = useTable({
	on: {
		onRowDblclick(row: Eps.CustomerUserEntity) {
			openPlatformAccounts(row);
		}
	},
	props: {
		rowStyle: {
			cursor: 'pointer'
		}
	},
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('用户名'), prop: 'username', minWidth: 140 },
		{ label: t('密码'), prop: 'password', minWidth: 140 },
		{
			label: t('消耗字符数'),
			prop: 'consumedCharacters',
			minWidth: 140,
			sortable: 'custom'
		},
		{
			label: t('占用端口数'),
			prop: 'occupiedPorts',
			minWidth: 140,
			sortable: 'custom'
		},
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 120,
			dict: options.status
		},
		{
			label: t('钱包监控'),
			prop: 'walletMonitorStatus',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.walletMonitorStatus
		},
		{
			label: t('钱包监控触发次数'),
			prop: 'walletMonitorTriggerCount',
			minWidth: 160,
			align: 'center',
			sortable: 'custom'
		},
		{
			label: t('关键词监控'),
			prop: 'keywordMonitorStatus',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.keywordMonitorStatus
		},
		{
			label: t('关键词监控触发次数'),
			prop: 'keywordMonitorTriggerCount',
			minWidth: 170,
			align: 'center',
			sortable: 'custom'
		},
		{
			label: t('全局开关'),
			prop: 'globalStatus',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.globalStatus
		},
		{
			label: t('拦截开关'),
			prop: 'interceptStatus',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.interceptStatus
		},
		{
			label: t('素材库'),
			prop: 'materialLibraryStatus',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.materialLibraryStatus
		},
		{
			label: t('备注'),
			prop: 'remark',
			showOverflowTooltip: true,
			minWidth: 200
		},
		{
			label: t('最后登录信息'),
			prop: 'loginInfo',
			showOverflowTooltip: true,
			minWidth: 220
		},
		{
			label: t('最后登录时间'),
			prop: 'lastLoginTime',
			minWidth: 170,
			sortable: 'custom',
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
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.customer.user
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
.password-cell {
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 0;

	&__text {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
