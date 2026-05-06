<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-filter :label="t('资源类型')">
				<cl-select :options="options.resourceType" prop="resourceType" :width="120" />
			</cl-filter>
			<cl-filter :label="t('状态')">
				<cl-select :options="options.status" prop="status" :width="120" />
			</cl-filter>
			<cl-search-key :placeholder="t('搜索套餐名称')" />
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
	name: 'customer-price-package'
});

import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { t } = useI18n();
const packageService = new BaseService('admin/customer/price-package');

const options = reactive({
	resourceType: [
		{ label: t('端口'), value: 0 },
		{ label: t('字符'), value: 1 }
	],
	status: [
		{ label: t('禁用'), value: 0 },
		{ label: t('启用'), value: 1 }
	],
	payChannels: [{ label: t('余额'), value: 0 }]
});

const Upsert = useUpsert({
	items: [
		{
			label: t('套餐名称'),
			prop: 'name',
			component: { name: 'el-input' },
			span: 24,
			required: true
		},
		{
			label: t('资源类型'),
			prop: 'resourceType',
			value: 0,
			component: { name: 'el-radio-group', options: options.resourceType },
			span: 12,
			required: true
		},
		{
			label: t('数量'),
			prop: 'count',
			hook: 'number',
			component: { name: 'el-input-number', props: { min: 1, precision: 0 } },
			span: 12,
			required: true
		},
		{
			label: t('价格'),
			prop: 'price',
			hook: 'number',
			component: { name: 'el-input-number', props: { min: 0, precision: 2 } },
			span: 12,
			required: true
		},
		{
			label: t('有效期天数'),
			prop: 'durationDays',
			hook: 'number',
			component: { name: 'el-input-number', props: { min: 1, precision: 0 } },
			span: 12
		},
		{
			label: t('状态'),
			prop: 'status',
			value: 1,
			component: { name: 'el-radio-group', options: options.status },
			span: 12,
			required: true
		},
		{
			label: t('排序'),
			prop: 'sort',
			value: 0,
			hook: 'number',
			component: { name: 'el-input-number', props: { min: 0, precision: 0 } },
			span: 12
		},
		{
			label: t('支付渠道'),
			prop: 'payChannels',
			value: 0,
			component: { name: 'el-radio-group', options: options.payChannels },
			span: 12,
			required: true
		},
		{
			label: t('备注'),
			prop: 'remark',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3 } },
			span: 24
		}
	]
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('套餐名称'), prop: 'name', minWidth: 180, showOverflowTooltip: true },
		{ label: t('资源类型'), prop: 'resourceType', minWidth: 110, dict: options.resourceType },
		{ label: t('数量'), prop: 'count', minWidth: 120, sortable: 'custom' },
		{
			label: t('价格'),
			prop: 'price',
			minWidth: 120,
			sortable: 'custom',
			formatter(row) {
				return `$${Number(row.price || 0).toFixed(2)}`;
			}
		},
		{ label: t('有效期天数'), prop: 'durationDays', minWidth: 120 },
		{ label: t('状态'), prop: 'status', minWidth: 100, dict: options.status },
		{ label: t('排序'), prop: 'sort', minWidth: 100, sortable: 'custom' },
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

const Crud = useCrud(
	{
		service: packageService
	},
	app => {
		app.refresh();
	}
);
</script>
