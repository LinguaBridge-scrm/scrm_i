<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
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

		<cl-dialog v-model="detailVisible" :title="t('检测记录详情')" width="760px">
			<el-descriptions v-loading="detailLoading" :column="2" border>
				<el-descriptions-item :label="t('租户')">
					{{ detailData.tenantName || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('用户')">
					{{ detailData.customerUsername || detailData.username || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('平台')">
					{{ detailData.platform || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('消息类型')">
					{{ detailData.messageType || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('是否匹配')">
					<el-tag :type="yesNoTagType(detailData.matched)" size="small">
						{{ yesNoLabel(detailData.matched) }}
					</el-tag>
				</el-descriptions-item>
				<el-descriptions-item :label="t('是否拦截')">
					<el-tag :type="interceptTagType(detailData.intercepted)" size="small">
						{{ yesNoLabel(detailData.intercepted) }}
					</el-tag>
				</el-descriptions-item>
				<el-descriptions-item :label="t('钱包监控')">
					{{ switchLabel(detailData.walletMonitorStatus) }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('关键词监控')">
					{{ switchLabel(detailData.keywordMonitorStatus) }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('拦截开关')">
					{{ switchLabel(detailData.interceptStatus) }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('命中类型')">
					<template v-if="normalizeList(detailData.hitTypes).length">
						<el-tag
							v-for="item in normalizeList(detailData.hitTypes)"
							:key="item"
							size="small"
							class="inline-tag"
						>
							{{ hitTypeLabel(item) }}
						</el-tag>
					</template>
					<span v-else>-</span>
				</el-descriptions-item>
				<el-descriptions-item :label="t('消息内容')" :span="2">
					<div class="content-text">{{ detailData.content || '-' }}</div>
				</el-descriptions-item>
				<el-descriptions-item :label="t('钱包地址')" :span="2">
					<pre class="meta-json">{{ formatJson(detailData.walletAddresses || []) }}</pre>
				</el-descriptions-item>
				<el-descriptions-item :label="t('命中关键词')" :span="2">
					<pre class="meta-json">{{ formatJson(detailData.matchedKeywords || []) }}</pre>
				</el-descriptions-item>
				<el-descriptions-item
					v-if="normalizeList(detailData.invalidRegexKeywords).length"
					:label="t('无效正则')"
					:span="2"
				>
					<pre class="meta-json">{{ formatJson(detailData.invalidRegexKeywords) }}</pre>
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
				<el-descriptions-item :label="t('对象ID')">
					{{ detailData.targetId || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('发送者ID')">
					{{ detailData.senderId || '-' }}
				</el-descriptions-item>
				<el-descriptions-item :label="t('创建时间')">
					{{ detailData.createTime || '-' }}
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
	name: 'customer-message-detection'
});

import { useCrud, useTable, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const { service } = useCool();
const { t } = useI18n();

type TagType = 'success' | 'info' | 'warning' | 'danger';

const yesNoOptions = [
	{ label: t('否'), value: 0, type: 'info' },
	{ label: t('是'), value: 1, type: 'success' }
];

const interceptOptions = [
	{ label: t('否'), value: 0, type: 'info' },
	{ label: t('是'), value: 1, type: 'danger' }
];

const switchOptions = [
	{ label: t('关'), value: 0, type: 'info' },
	{ label: t('开'), value: 1, type: 'success' }
];

function yesNoLabel(value: number) {
	return yesNoOptions.find(e => e.value === Number(value))?.label || '-';
}

function yesNoTagType(value: number): TagType {
	return (yesNoOptions.find(e => e.value === Number(value))?.type || 'info') as TagType;
}

function interceptTagType(value: number): TagType {
	return (interceptOptions.find(e => e.value === Number(value))?.type || 'info') as TagType;
}

function switchLabel(value: number) {
	return switchOptions.find(e => e.value === Number(value))?.label || '-';
}

function hitTypeLabel(value: string) {
	const labels: Record<string, string> = {
		wallet: t('钱包'),
		keyword: t('关键词')
	};

	return labels[value] || value;
}

function normalizeList(value: any) {
	return Array.isArray(value) ? value : [];
}

function formatJson(data: any) {
	try {
		return JSON.stringify(data, null, 2);
	} catch {
		return data;
	}
}

function recordId(row: any) {
	return row?.id || row?.a_id;
}

function opRow(options: any) {
	return options?.scope?.row || options?.row || {};
}

const detailVisible = ref(false);
const detailLoading = ref(false);
const detailData = ref<any>({});

async function showDetail(row: any) {
	detailVisible.value = true;
	detailLoading.value = true;
	detailData.value = { ...row };

	try {
		const id = recordId(row);
		if (!id) {
			return;
		}
		const info = await service.customer.messageDetection.info({ id });

		detailData.value = {
			...row,
			...info,
			tenantName: row.tenantName,
			customerUsername: row.customerUsername
		};
	} catch (err: any) {
		detailVisible.value = false;
		ElMessage.error(err?.message || t('获取检测记录详情失败'));
	} finally {
		detailLoading.value = false;
	}
}

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('用户'), prop: 'customerUsername', minWidth: 120 },
		{
			label: t('平台'),
			prop: 'platform',
			minWidth: 110,
			showOverflowTooltip: true
		},
		{
			label: t('消息内容'),
			prop: 'content',
			minWidth: 240,
			showOverflowTooltip: true
		},
		{
			label: t('是否匹配'),
			prop: 'matched',
			minWidth: 100,
			dict: yesNoOptions
		},
		{
			label: t('是否拦截'),
			prop: 'intercepted',
			minWidth: 100,
			dict: interceptOptions
		},
		{
			label: t('钱包命中'),
			prop: 'walletMatched',
			minWidth: 100,
			dict: yesNoOptions
		},
		{
			label: t('关键词命中'),
			prop: 'keywordMatched',
			minWidth: 110,
			dict: yesNoOptions
		},
		{
			label: t('命中类型'),
			prop: 'hitTypes',
			minWidth: 120,
			formatter(row) {
				return normalizeList(row.hitTypes).map(hitTypeLabel).join('、') || '-';
			}
		},
		{
			label: t('客户端ID'),
			prop: 'clientId',
			minWidth: 160,
			showOverflowTooltip: true
		},
		{
			label: t('页面ID'),
			prop: 'pageId',
			minWidth: 160,
			showOverflowTooltip: true
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
			width: 160,
			buttons: [
				{
					label: t('详情'),
					type: 'primary',
					onClick(options: any) {
						showDetail(opRow(options));
					}
				},
				'delete'
			]
		}
	]
});

const Search = useSearch({
	items: [
		{
			label: t('平台'),
			prop: 'platform',
			component: { name: 'el-input' }
		},
		{
			label: t('是否匹配'),
			prop: 'matched',
			component: { name: 'el-select', options: yesNoOptions }
		},
		{
			label: t('是否拦截'),
			prop: 'intercepted',
			component: { name: 'el-select', options: interceptOptions }
		},
		{
			label: t('钱包命中'),
			prop: 'walletMatched',
			component: { name: 'el-select', options: yesNoOptions }
		},
		{
			label: t('关键词命中'),
			prop: 'keywordMatched',
			component: { name: 'el-select', options: yesNoOptions }
		}
	]
});

const Crud = useCrud(
	{
		service: service.customer.messageDetection
	},
	app => {
		app.refresh();
	}
);

function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>

<style scoped>
.content-text {
	line-height: 1.6;
	white-space: pre-wrap;
	word-break: break-all;
	max-height: 160px;
	overflow-y: auto;
}

.meta-json {
	margin: 0;
	font-size: 12px;
	line-height: 1.5;
	white-space: pre-wrap;
	word-break: break-all;
	max-height: 220px;
	overflow-y: auto;
}

.inline-tag {
	margin: 2px 4px 2px 0;
}
</style>
