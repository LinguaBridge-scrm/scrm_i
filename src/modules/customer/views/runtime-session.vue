<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-flex1 />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-dialog v-model="detailVisible" :title="t('会话详情')" width="600px">
			<el-descriptions :column="2" border>
				<el-descriptions-item :label="t('租户')">
					{{ detailData.tenantName || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('用户')">
					{{ detailData.userName || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('客户端ID')">
					{{ detailData.clientId || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('状态')">
					<el-tag :type="sessionStatusTagType(detailData.status)" size="small">
						{{ sessionStatusLabel(detailData.status) }}
					</el-tag>
				</el-descriptions-item>
				<el-descriptions-item :label="t('心跳间隔')">
					{{ detailData.heartbeatInterval ? `${detailData.heartbeatInterval}s` : '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('心跳超时')">
					{{ detailData.heartbeatTimeout ? `${detailData.heartbeatTimeout}s` : '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('心跳次数')">
					{{ detailData.heartbeatCount ?? '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('上线时间')">
					{{ detailData.onlineTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('最后活跃')">
					{{ detailData.lastActiveTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('最后心跳')">
					{{ detailData.lastHeartbeatTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('过期时间')">
					{{ detailData.expireTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item v-if="detailData.status !== 1" :label="t('离线时间')">
					{{ detailData.offlineTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('IP')">
					{{ detailData.ip || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('客户端信息')" :span="2">
					{{ detailData.userAgent || '-' }}
				</el-descriptions-item>
			</el-descriptions>
		</cl-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-runtime-session'
});

import { useCrud, useTable, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const { service } = useCool();
const { t } = useI18n();

type TagType = 'success' | 'info' | 'warning';

type SessionStatusOption = {
	label: string;
	value: number;
	type: TagType;
};

const sessionStatusOptions: SessionStatusOption[] = [
	{ label: t('离线'), value: 0, type: 'info' },
	{ label: t('在线'), value: 1, type: 'success' },
	{ label: t('心跳超时'), value: 2, type: 'warning' }
];

function sessionStatusLabel(status: number) {
	return sessionStatusOptions.find(e => e.value === status)?.label || '-';
}

function sessionStatusTagType(status: number): TagType {
	return sessionStatusOptions.find(e => e.value === status)?.type || 'info';
}

const detailVisible = ref(false);
const detailData = ref<any>({});

function showDetail(row: any) {
	detailData.value = row;
	detailVisible.value = true;
}

async function forceReclaimSession(row: any) {
	try {
		await ElMessageBox.confirm(
			t('确认强制回收该会话及所有端口？此操作将立即下线该客户端。'),
			t('提示'),
			{
				confirmButtonText: t('确定'),
				cancelButtonText: t('取消'),
				type: 'warning'
			}
		);

		await service.customer.runtimeSession.request({
			url: '/force-offline',
			method: 'POST',
			data: {
				userId: row.userId,
				tenantId: row.tenantId,
				clientId: row.clientId,
				reason: 'admin_force_offline'
			}
		});

		ElMessage.success(t('回收成功'));
		Crud.value?.refresh();
	} catch {
		//
	}
}

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('用户'), prop: 'userName', minWidth: 120 },
		{
			label: t('客户端ID'),
			prop: 'clientId',
			minWidth: 180,
			showOverflowTooltip: true
		},
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 110,
			dict: sessionStatusOptions
		},
		{
			label: t('心跳次数'),
			prop: 'heartbeatCount',
			minWidth: 100,
			sortable: 'custom'
		},
		{
			label: t('上线时间'),
			prop: 'onlineTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('最后心跳'),
			prop: 'lastHeartbeatTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('过期时间'),
			prop: 'expireTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('IP'),
			prop: 'ip',
			minWidth: 130
		},
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{
			type: 'op',
			width: 200,
			buttons: [
				{
					label: t('详情'),
					type: 'primary',
					onClick({ row }: any) {
						showDetail(row);
					}
				},
				{
					label: t('下线'),
					type: 'danger',
					show({ row }: any) {
						return row.status === 1;
					},
					onClick({ row }: any) {
						forceReclaimSession(row);
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
			component: { name: 'el-select', options: sessionStatusOptions }
		}
	]
});

const Crud = useCrud(
	{
		service: service.customer.runtimeSession
	},
	app => {
		app.refresh();
	}
);

function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
