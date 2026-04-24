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

		<cl-dialog v-model="detailVisible" :title="t('端口详情')" width="600px">
			<el-descriptions v-loading="detailLoading" :column="2" border>
				<el-descriptions-item :label="t('租户')">
					{{ detailData.tenantName || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('用户')">
					{{ detailData.userName || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('客户端ID')">
					{{ detailData.clientId || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('页面ID')">
					{{ detailData.pageId || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('关联网页ID')">
					{{ detailData.webpageId || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('槽位号')">
					{{ detailData.slotNo ?? '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('状态')">
					<el-tag :type="statusTagType(detailData.status)" size="small">
						{{ statusLabel(detailData.status) }}
					</el-tag>
				</el-descriptions-item>
				<el-descriptions-item :label="t('占用时间')">
					{{ detailData.occupyTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('最后心跳')">
					{{ detailData.lastHeartbeatTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('过期时间')">
					{{ detailData.expireTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item v-if="detailData.status !== 1" :label="t('释放时间')">
					{{ detailData.releaseTime || '-' }}
				</el-descriptions-item>
				<el-descriptions-item v-if="detailData.status !== 1" :label="t('释放原因')">
					{{ detailData.releaseReason || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('IP')">
					{{ detailData.ip || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('客户端信息')" :span="2">
					{{ detailData.userAgent || '-' }}
				</el-descriptions-item>
				<el-descriptions-item v-if="detailData.meta" :label="t('元数据')" :span="2">
					<pre class="meta-json">{{ formatJson(detailData.meta) }}</pre>
				</el-descriptions-item>
			</el-descriptions>
		</cl-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-port-occupancy'
});

import { useCrud, useTable, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const { service } = useCool();
const { t } = useI18n();

type TagType = 'success' | 'info' | 'warning' | 'danger';

type StatusOption = {
	label: string;
	value: number;
	type: TagType;
};

const statusOptions: StatusOption[] = [
	{ label: t('占用中'), value: 1, type: 'success' },
	{ label: t('主动释放'), value: 2, type: 'info' },
	{ label: t('超时释放'), value: 3, type: 'warning' },
	{ label: t('强制回收'), value: 4, type: 'danger' }
];

function statusLabel(status: number) {
	return statusOptions.find(e => e.value === status)?.label || '-';
}

function statusTagType(status: number): TagType {
	return statusOptions.find(e => e.value === status)?.type || 'info';
}

function formatJson(data: any) {
	try {
		return JSON.stringify(data, null, 2);
	} catch {
		return data;
	}
}

const detailVisible = ref(false);
const detailLoading = ref(false);
const detailData = ref<any>({});

function recordId(row: any) {
	return row?.id || row?.a_id;
}

function opRow(options: any) {
	return options?.scope?.row || options?.row || {};
}

async function showDetail(row: any) {
	detailVisible.value = true;
	detailLoading.value = true;
	detailData.value = { ...row };

	try {
		const id = recordId(row);
		if (!id) {
			return;
		}
		const info = await service.customer.portOccupancy.info({ id });

		detailData.value = {
			...row,
			...info,
			tenantName: info.tenantName || row.tenantName,
			userName: info.userName || row.userName
		};
	} catch (err: any) {
		detailVisible.value = false;
		ElMessage.error(err?.message || t('获取端口详情失败'));
	} finally {
		detailLoading.value = false;
	}
}

async function forceReclaim(row: any) {
	const id = recordId(row);
	if (!id && (!row?.userId || !row?.clientId || !row?.pageId)) {
		ElMessage.error(t('端口占用记录不存在'));
		return;
	}

	try {
		await ElMessageBox.confirm(
			t('确认强制回收该端口？此操作将立即释放该端口占用。'),
			t('提示'),
			{
				confirmButtonText: t('确定'),
				cancelButtonText: t('取消'),
				type: 'warning'
			}
		);

		await service.customer.portOccupancy.request({
			url: '/force-reclaim',
			method: 'POST',
			data: {
				id,
				userId: row.userId,
				clientId: row.clientId,
				pageId: row.pageId,
				reclaimSession: false,
				reason: 'admin_force_reclaim'
			}
		});

		ElMessage.success(t('回收成功'));
		Crud.value?.refresh();
	} catch (err: any) {
		if (err !== 'cancel' && err !== 'close') {
			ElMessage.error(err?.message || t('回收失败'));
		}
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
			label: t('页面ID'),
			prop: 'pageId',
			minWidth: 120,
			showOverflowTooltip: true
		},
		{
			label: t('关联网页ID'),
			prop: 'webpageId',
			minWidth: 140,
			showOverflowTooltip: true
		},
		{ label: t('槽位'), prop: 'slotNo', minWidth: 80, sortable: 'custom' },
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 110,
			dict: statusOptions
		},
		{
			label: t('占用时间'),
			prop: 'occupyTime',
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
			label: t('释放原因'),
			prop: 'releaseReason',
			minWidth: 140,
			showOverflowTooltip: true
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
					onClick(options: any) {
						showDetail(opRow(options));
					}
				},
				{
					label: t('回收'),
					type: 'danger',
					show(options: any) {
						const row = opRow(options);

						return row.status === 1;
					},
					onClick(options: any) {
						forceReclaim(opRow(options));
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
			component: { name: 'el-select', options: statusOptions }
		},
		{
			label: t('槽位'),
			prop: 'slotNo',
			component: { name: 'el-input' }
		}
	]
});

const Crud = useCrud(
	{
		service: service.customer.portOccupancy
	},
	app => {
		app.refresh();
	}
);
</script>

<style scoped>
.meta-json {
	margin: 0;
	font-size: 12px;
	line-height: 1.5;
	white-space: pre-wrap;
	word-break: break-all;
	max-height: 200px;
	overflow-y: auto;
}
</style>
