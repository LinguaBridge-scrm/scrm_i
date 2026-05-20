<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="$t('搜索版本号、文件名、下载地址')" />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<template #column-downloadUrl="{ scope }">
					<el-link :href="scope.row.downloadUrl" target="_blank" type="primary">
						{{ $t('下载') }}
					</el-link>
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
	name: 'customer-client-update'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { t } = useI18n();
const clientUpdateService = new BaseService('admin/customer/client-update');
const clientPackageMaxSizeMb = 1024;

const options = reactive({
	bool: [
		{ label: t('否'), value: 0, type: 'info' },
		{ label: t('是'), value: 1, type: 'danger' }
	],
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	]
});

const Upsert = useUpsert({
	items: [
		{
			label: t('版本号'),
			prop: 'version',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('是否强制更新'),
			prop: 'forceUpdate',
			component: { name: 'el-radio-group', options: options.bool },
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('客户端文件'),
			prop: 'downloadUrl',
			component: {
				name: 'cl-upload',
				props: {
						type: 'file',
						limit: 1,
						limitSize: clientPackageMaxSizeMb,
						accept: '.zip,.exe,.msi,.dmg,.pkg,.apk,.appimage',
						text: t('上传客户端（最大 1GB）')
					}
				},
			required: true
		},
		{
			label: t('启用状态'),
			prop: 'status',
			component: { name: 'el-radio-group', options: options.status },
			value: 1,
			span: 12,
			required: true
		},
		{
			label: t('更新内容（简体中文）'),
			prop: 'updateContentZhCn',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			}
		},
		{
			label: t('更新内容（繁体中文）'),
			prop: 'updateContentZhTw',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			}
		},
		{
			label: t('更新内容（英文）'),
			prop: 'updateContentEn',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			}
		},
		{
			label: t('备注'),
			prop: 'remark',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 3 }
			}
		}
	]
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('版本号'), prop: 'version', minWidth: 120 },
		{
			label: t('是否强制更新'),
			prop: 'forceUpdate',
			minWidth: 120,
			dict: options.bool
		},
		{
			label: t('客户端文件名'),
			prop: 'fileName',
			minWidth: 220,
			showOverflowTooltip: true
		},
		{
			label: t('下载地址'),
			prop: 'downloadUrl',
			minWidth: 120
		},
		{
			label: t('更新内容（简体中文）'),
			prop: 'updateContentZhCn',
			minWidth: 240,
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

const Search = useSearch({
	items: [
		{
			label: t('是否强制更新'),
			prop: 'forceUpdate',
			component: { name: 'el-select', options: options.bool }
		},
		{
			label: t('启用状态'),
			prop: 'status',
			component: { name: 'el-select', options: options.status }
		}
	]
});

const Crud = useCrud(
	{
		service: clientUpdateService
	},
	app => {
		app.refresh();
	}
);
</script>
