<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="t('搜索文件名、MD5、租户')" :width="280" />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<template #column-url="{ scope }">
					<el-link :href="scope.row.url" target="_blank" type="primary">
						{{ t('打开直链') }}
					</el-link>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-file-resource'
});

import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const fileResourceService = new BaseService('admin/customer/file-resource');

const fileTypeOptions = [
	{ label: t('图片'), value: 'image', type: 'success' },
	{ label: t('视频'), value: 'video', type: 'primary' },
	{ label: t('音频'), value: 'audio', type: 'warning' },
	{ label: t('其他'), value: 'other', type: 'info' }
];

function formatSize(size?: number) {
	const value = Number(size || 0);
	if (value < 1024) {
		return `${value} B`;
	}
	if (value < 1024 * 1024) {
		return `${(value / 1024).toFixed(2)} KB`;
	}
	return `${(value / 1024 / 1024).toFixed(2)} MB`;
}

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('上传用户'), prop: 'customerUsername', minWidth: 120 },
		{
			label: t('原始文件名'),
			prop: 'originalName',
			minWidth: 220,
			showOverflowTooltip: true
		},
		{
			label: t('类型'),
			prop: 'fileType',
			minWidth: 100,
			dict: fileTypeOptions
		},
		{
			label: t('大小'),
			prop: 'fileSize',
			minWidth: 110,
			formatter: ({ fileSize }) => formatSize(fileSize)
		},
		{
			label: t('MD5'),
			prop: 'fileMd5',
			minWidth: 240,
			showOverflowTooltip: true
		},
		{
			label: t('直链'),
			prop: 'url',
			minWidth: 120
		},
		{
			label: t('上传次数'),
			prop: 'uploadCount',
			minWidth: 100
		},
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{ type: 'op', buttons: ['delete'] }
	]
});

const Search = useSearch({
	items: [
		{
			label: t('文件类型'),
			prop: 'fileType',
			component: { name: 'el-select', options: fileTypeOptions }
		}
	]
});

const Crud = useCrud(
	{
		service: fileResourceService
	},
	app => {
		app.refresh();
	}
);
</script>
