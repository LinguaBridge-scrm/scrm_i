<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="$t('搜索平台、名称、版本')" />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
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
	name: 'customer-platform-script-platform'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const platformService = new BaseService('admin/customer/platform-script-platform');

const options = reactive({
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	]
});

const Upsert = useUpsert({
	items: [
		{
			label: t('平台Key'),
			prop: 'platformKey',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('平台名称'),
			prop: 'name',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('平台版本'),
			prop: 'version',
			component: { name: 'el-input', props: { clearable: true } },
			value: '1.0.0',
			span: 12,
			required: true
		},
		{
			label: t('排序'),
			prop: 'sortNum',
			component: { name: 'el-input-number', props: { min: 0, precision: 0 } },
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
			label: t('备注'),
			prop: 'remark',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3 } }
		}
	],
	onSubmit(data, { next }) {
		return next(data);
	}
});

const Table = useTable({
	autoHeight: false,
	columns: [
		{ type: 'selection' },
		{ label: t('平台Key'), prop: 'platformKey', minWidth: 130 },
		{ label: t('平台名称'), prop: 'name', minWidth: 150 },
		{ label: t('平台版本'), prop: 'version', minWidth: 120 },
		{ label: t('排序'), prop: 'sortNum', minWidth: 90, sortable: 'custom' },
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
			label: t('状态'),
			prop: 'status',
			component: { name: 'el-select', options: options.status }
		}
	]
});

const Crud = useCrud(
	{
		service: platformService
	},
	app => {
		app.refresh();
	}
);
</script>
