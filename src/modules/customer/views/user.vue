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
				<template #column-userSummary="{ scope }">
					<div class="user-summary">
						<div class="user-summary__head">
							<el-tooltip :content="scope.row.username" :disabled="!scope.row.username">
								<strong class="user-summary__name">{{ scope.row.username || '-' }}</strong>
							</el-tooltip>
							<el-tag
								:type="userStatusType(scope.row.status)"
								size="small"
								effect="light"
							>
								{{ userStatusLabel(scope.row.status) }}
							</el-tag>
						</div>

						<div class="user-summary__line">
							<span class="user-summary__label">{{ t('租户') }}</span>
							<el-tooltip :content="tenantText(scope.row)" :disabled="!tenantText(scope.row)">
								<span class="user-summary__value">{{ tenantText(scope.row) || '-' }}</span>
							</el-tooltip>
						</div>

						<div class="user-summary__line">
							<span class="user-summary__label">{{ t('密码') }}</span>
							<span class="user-summary__value user-summary__password">
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

						<el-tooltip :content="scope.row.remark" :disabled="!scope.row.remark">
							<div class="user-summary__remark">
								<span>{{ t('备注') }}</span>
								{{ scope.row.remark || '-' }}
							</div>
						</el-tooltip>
					</div>
				</template>

				<template #header-resourceSummary>
					<div class="aggregate-header">
						<span>{{ t('资源用量') }}</span>
						<el-dropdown trigger="click" @command="applyAggregateSort">
							<el-button link class="aggregate-header__sort" :title="t('排序')" @click.stop>
								<el-icon><sort /></el-icon>
							</el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item
										v-for="item in resourceSortOptions"
										:key="item.command"
										:command="item.command"
									>
										{{ item.label }}
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</template>

				<template #column-resourceSummary="{ scope }">
					<div class="resource-summary">
						<div class="resource-summary__item">
							<span>{{ t('字符') }}</span>
							<strong>{{ formatNumber(scope.row.consumedCharacters) }}</strong>
						</div>
						<div class="resource-summary__item">
							<span>{{ t('端口') }}</span>
							<strong>{{ formatNumber(scope.row.occupiedPorts) }}</strong>
						</div>
					</div>
				</template>

				<template #header-monitorSummary>
					<div class="aggregate-header">
						<span>{{ t('监控配置') }}</span>
						<el-dropdown trigger="click" @command="applyAggregateSort">
							<el-button link class="aggregate-header__sort" :title="t('排序')" @click.stop>
								<el-icon><sort /></el-icon>
							</el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item
										v-for="item in monitorSortOptions"
										:key="item.command"
										:command="item.command"
									>
										{{ item.label }}
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</template>

				<template #column-monitorSummary="{ scope }">
					<div class="monitor-summary">
						<div class="monitor-summary__item">
							<div class="monitor-summary__label">
								<span>{{ t('钱包') }}</span>
								<strong>{{ formatNumber(scope.row.walletMonitorTriggerCount) }}</strong>
							</div>
							<cl-switch
								v-model="scope.row.walletMonitorStatus"
								:scope="scope.row"
								:column="{ property: 'walletMonitorStatus' }"
							/>
						</div>

						<div class="monitor-summary__item">
							<div class="monitor-summary__label">
								<span>{{ t('关键词') }}</span>
								<strong>{{ formatNumber(scope.row.keywordMonitorTriggerCount) }}</strong>
							</div>
							<cl-switch
								v-model="scope.row.keywordMonitorStatus"
								:scope="scope.row"
								:column="{ property: 'keywordMonitorStatus' }"
							/>
						</div>

						<div class="monitor-summary__item">
							<span class="monitor-summary__plain-label">{{ t('全局开关') }}</span>
							<cl-switch
								v-model="scope.row.globalStatus"
								:scope="scope.row"
								:column="{ property: 'globalStatus' }"
							/>
						</div>

						<div class="monitor-summary__item">
							<span class="monitor-summary__plain-label">{{ t('拦截开关') }}</span>
							<cl-switch
								v-model="scope.row.interceptStatus"
								:scope="scope.row"
								:column="{ property: 'interceptStatus' }"
							/>
						</div>

						<div class="monitor-summary__item">
							<span class="monitor-summary__plain-label">{{ t('素材库') }}</span>
							<cl-switch
								v-model="scope.row.materialLibraryStatus"
								:scope="scope.row"
								:column="{ property: 'materialLibraryStatus' }"
							/>
						</div>
					</div>
				</template>

				<template #header-activitySummary>
					<div class="aggregate-header">
						<span>{{ t('活动信息') }}</span>
						<el-dropdown trigger="click" @command="applyAggregateSort">
							<el-button link class="aggregate-header__sort" :title="t('排序')" @click.stop>
								<el-icon><sort /></el-icon>
							</el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item
										v-for="item in activitySortOptions"
										:key="item.command"
										:command="item.command"
									>
										{{ item.label }}
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</template>

				<template #column-activitySummary="{ scope }">
					<div class="activity-summary">
						<div class="activity-summary__line" :title="formatDateText(scope.row.lastLoginTime)">
							<span>{{ t('最后登录时间') }}</span>
							<strong>{{ formatCompactDate(scope.row.lastLoginTime) }}</strong>
						</div>
						<div class="activity-summary__line" :title="formatDateText(scope.row.createTime)">
							<span>{{ t('创建时间') }}</span>
							<strong>{{ formatCompactDate(scope.row.createTime) }}</strong>
						</div>
						<div class="activity-summary__line" :title="formatDateText(scope.row.updateTime)">
							<span>{{ t('更新时间') }}</span>
							<strong>{{ formatCompactDate(scope.row.updateTime) }}</strong>
						</div>
						<el-tooltip :content="scope.row.loginInfo" :disabled="!scope.row.loginInfo">
							<div class="activity-summary__info">{{ scope.row.loginInfo || '-' }}</div>
						</el-tooltip>
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
import { Hide, Sort, View } from '@element-plus/icons-vue';

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

function formatCompactDate(value: any) {
	return value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-';
}

function formatNumber(value: any) {
	const number = Number(value || 0);
	return Number.isFinite(number) ? number.toLocaleString() : '0';
}

function tenantText(row: Eps.CustomerUserEntity) {
	return String(row.tenantName || row.orgUsername || '');
}

function userStatusLabel(value: any) {
	return Number(value) === 1 ? t('启用') : t('禁用');
}

function userStatusType(value: any) {
	return Number(value) === 1 ? 'success' : 'danger';
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

const resourceSortOptions = computed(() => [
	{ label: `${t('消耗字符数')} ↓`, command: 'consumedCharacters:desc' },
	{ label: `${t('消耗字符数')} ↑`, command: 'consumedCharacters:asc' },
	{ label: `${t('占用端口数')} ↓`, command: 'occupiedPorts:desc' },
	{ label: `${t('占用端口数')} ↑`, command: 'occupiedPorts:asc' }
]);

const monitorSortOptions = computed(() => [
	{ label: `${t('钱包监控触发次数')} ↓`, command: 'walletMonitorTriggerCount:desc' },
	{ label: `${t('钱包监控触发次数')} ↑`, command: 'walletMonitorTriggerCount:asc' },
	{ label: `${t('关键词监控触发次数')} ↓`, command: 'keywordMonitorTriggerCount:desc' },
	{ label: `${t('关键词监控触发次数')} ↑`, command: 'keywordMonitorTriggerCount:asc' }
]);

const activitySortOptions = computed(() => [
	{ label: `${t('最后登录时间')} ↓`, command: 'lastLoginTime:desc' },
	{ label: `${t('最后登录时间')} ↑`, command: 'lastLoginTime:asc' },
	{ label: `${t('创建时间')} ↓`, command: 'createTime:desc' },
	{ label: `${t('创建时间')} ↑`, command: 'createTime:asc' },
	{ label: `${t('更新时间')} ↓`, command: 'updateTime:desc' },
	{ label: `${t('更新时间')} ↑`, command: 'updateTime:asc' }
]);

function applyAggregateSort(command: string) {
	const [prop, order] = command.split(':');
	Crud.value?.refresh({
		page: 1,
		prop,
		order
	});
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
	defaultSort: {
		prop: 'createTime',
		order: 'descending'
	},
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
		{ type: 'selection', width: 46 },
		{ label: t('用户信息'), prop: 'userSummary', minWidth: 280, headerAlign: 'left' },
		{ label: t('资源用量'), prop: 'resourceSummary', minWidth: 180, headerAlign: 'left' },
		{ label: t('监控配置'), prop: 'monitorSummary', minWidth: 500, headerAlign: 'left' },
		{ label: t('活动信息'), prop: 'activitySummary', minWidth: 290, headerAlign: 'left' },
		{ type: 'op', width: 150, buttons: ['edit', 'delete'] }
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
.aggregate-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 4px;
	width: 100%;

	&__sort {
		width: 28px;
		height: 28px;
		padding: 0;
		color: var(--el-text-color-secondary);

		&:hover,
		&:focus-visible {
			color: var(--el-color-primary);
		}
	}
}

.user-summary {
	display: grid;
	gap: 5px;
	min-width: 0;
	padding: 4px 0;

	&__head,
	&__line {
		display: flex;
		align-items: center;
		min-width: 0;
	}

	&__head {
		justify-content: space-between;
		gap: 8px;
	}

	&__name {
		display: block;
		min-width: 0;
		overflow: hidden;
		color: var(--el-text-color-primary);
		font-size: 14px;
		font-weight: 600;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__line {
		gap: 6px;
		font-size: 12px;
		line-height: 20px;
	}

	&__label {
		flex: 0 0 34px;
		color: var(--el-text-color-secondary);
	}

	&__value {
		min-width: 0;
		overflow: hidden;
		color: var(--el-text-color-regular);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__password {
		flex: 1;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	}

	&__remark {
		overflow: hidden;
		color: var(--el-text-color-secondary);
		font-size: 12px;
		line-height: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;

		span {
			margin-right: 6px;
			color: var(--el-text-color-placeholder);
		}
	}
}

.resource-summary {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 8px;

	&__item {
		display: grid;
		gap: 4px;
		min-width: 0;

		span {
			color: var(--el-text-color-secondary);
			font-size: 12px;
		}

		strong {
			overflow: hidden;
			color: var(--el-text-color-primary);
			font-size: 15px;
			font-variant-numeric: tabular-nums;
			font-weight: 600;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}

.monitor-summary {
	display: grid;
	grid-template-columns: repeat(5, minmax(74px, 1fr));
	gap: 8px;

	&__item {
		display: grid;
		align-content: center;
		justify-items: start;
		gap: 6px;
		min-width: 0;
	}

	&__label {
		display: flex;
		align-items: center;
		gap: 5px;
		max-width: 100%;
		color: var(--el-text-color-secondary);
		font-size: 12px;

		span {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		strong {
			min-width: 24px;
			padding: 1px 6px;
			border-radius: 999px;
			background: var(--el-fill-color-light);
			color: var(--el-text-color-primary);
			font-size: 12px;
			font-variant-numeric: tabular-nums;
			font-weight: 600;
			line-height: 18px;
			text-align: center;
		}
	}

	&__plain-label {
		overflow: hidden;
		max-width: 100%;
		color: var(--el-text-color-secondary);
		font-size: 12px;
		line-height: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.activity-summary {
	display: grid;
	gap: 4px;
	padding: 2px 0;

	&__line {
		display: grid;
		grid-template-columns: 76px minmax(0, 1fr);
		gap: 8px;
		font-size: 12px;
		line-height: 20px;

		span {
			color: var(--el-text-color-secondary);
		}

		strong {
			overflow: hidden;
			color: var(--el-text-color-regular);
			font-variant-numeric: tabular-nums;
			font-weight: 500;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	&__info {
		overflow: hidden;
		color: var(--el-text-color-secondary);
		font-size: 12px;
		line-height: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
