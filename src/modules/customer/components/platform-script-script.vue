<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="$t('搜索脚本、平台、Hash')" />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<template #column-downloadUrl="{ scope }">
					<el-link
						v-if="scope.row.downloadUrl"
						:href="scope.row.downloadUrl"
						target="_blank"
						type="primary"
					>
						{{ $t('下载') }}
					</el-link>
					<span v-else>-</span>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-platform-script-script'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { ElMessage } from 'element-plus';
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const scriptFileMaxSizeMb = 20;
const platformService = new BaseService('admin/customer/platform-script-platform');
const scriptService = new BaseService('admin/customer/platform-script');
const platformOptions = reactive<any[]>([]);

const options = reactive({
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	],
	sourceType: [
		{ label: t('JS文本'), value: 0, type: 'success' },
		{ label: t('JS文件'), value: 1, type: 'primary' }
	]
});

async function loadPlatforms(showTip = false) {
	const list = (await platformService.list({})) as unknown as any[];
	platformOptions.splice(
		0,
		platformOptions.length,
		...(list || []).map(item => ({
			label: `${item.name} (${item.platformKey})`,
			value: item.platformKey
		}))
	);
	syncPlatformOptions();

	if (showTip && platformOptions.length === 0) {
		ElMessage.warning(t('请先在平台管理新增平台'));
	}
}

function platformName(platformKey: string) {
	return platformOptions.find(item => item.value === platformKey)?.label || platformKey;
}

function syncPlatformOptions() {
	Upsert.value?.setOptions('platformKey', platformOptions);
	Search.value?.setOptions('platformKey', platformOptions);
}

const Upsert = useUpsert({
	items: [
		{
			label: t('平台'),
			prop: 'platformKey',
			component: {
				name: 'el-select',
				options: platformOptions,
				props: { filterable: true, placeholder: t('请先选择平台') }
			},
			span: 12,
			required: true
		},
		{
			label: t('脚本名称'),
			prop: 'name',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('脚本版本'),
			prop: 'version',
			component: { name: 'el-input', props: { clearable: true } },
			value: '1.0.0',
			span: 12,
			required: true
		},
		{
			label: t('注入顺序'),
			prop: 'injectOrder',
			component: { name: 'el-input-number', props: { min: 0, precision: 0 } },
			value: 10,
			span: 12,
			required: true
		},
		{
			label: t('脚本来源'),
			prop: 'sourceType',
			component: { name: 'el-radio-group', options: options.sourceType },
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'el-radio-group', options: options.status },
			value: 1,
			span: 12,
			required: true
		},
		{
			label: t('JS脚本文本'),
			prop: 'content',
			hidden: ({ scope }) => scope.sourceType !== 0,
			component: { name: 'el-input', props: { type: 'textarea', rows: 14 } },
			required: true
		},
		{
			label: t('JS脚本文件'),
			prop: 'downloadUrl',
			hidden: ({ scope }) => scope.sourceType !== 1,
			component: {
				name: 'cl-upload',
				props: {
					type: 'file',
					limit: 1,
					limitSize: scriptFileMaxSizeMb,
					accept: '.js',
					text: t('上传JS脚本')
				}
			},
			required: true
		},
		{
			label: t('备注'),
			prop: 'remark',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3 } }
		}
	],
	onOpen() {
		loadPlatforms(true);
	},
	onOpened(data) {
		data.sourceType = Number(data.sourceType || 0);
		syncPlatformOptions();
	},
	async onSubmit(data, { next }) {
		await next(data);
		await loadPlatforms();
	}
});

const Table = useTable({
	autoHeight: false,
	columns: [
		{ type: 'selection' },
		{
			label: t('平台'),
			prop: 'platformKey',
			minWidth: 180,
			formatter: row => platformName(row.platformKey)
		},
		{ label: t('脚本名称'), prop: 'name', minWidth: 150 },
		{ label: t('脚本版本'), prop: 'version', minWidth: 120 },
		{ label: t('注入顺序'), prop: 'injectOrder', minWidth: 110, sortable: 'custom' },
		{
			label: t('脚本来源'),
			prop: 'sourceType',
			minWidth: 110,
			dict: options.sourceType
		},
		{
			label: t('文件名'),
			prop: 'fileName',
			minWidth: 180,
			showOverflowTooltip: true
		},
		{
			label: t('下载地址'),
			prop: 'downloadUrl',
			minWidth: 120
		},
		{
			label: t('脚本Hash'),
			prop: 'sha256',
			minWidth: 260,
			showOverflowTooltip: true
		},
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 100,
			dict: options.status,
			component: { name: 'cl-switch' }
		},
		{
			label: t('更新时间'),
			prop: 'updateTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

const Search = useSearch({
	items: [
		{
			label: t('平台'),
			prop: 'platformKey',
			component: {
				name: 'el-select',
				options: platformOptions,
				props: { clearable: true, filterable: true }
			}
		},
		{
			label: t('脚本来源'),
			prop: 'sourceType',
			component: { name: 'el-select', options: options.sourceType, props: { clearable: true } }
		},
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'el-select', options: options.status, props: { clearable: true } }
		}
	]
});

const Crud = useCrud(
	{
		service: scriptService
	},
	app => {
		app.refresh();
	}
);

onMounted(() => {
	loadPlatforms();
});
</script>
