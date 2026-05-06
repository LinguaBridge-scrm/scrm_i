<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-flex1 />
			<cl-filter :label="t('资源类型')">
				<cl-select :options="options.resourceType" prop="resourceType" :width="120" />
			</cl-filter>
			<cl-filter :label="t('状态')">
				<cl-select :options="options.status" prop="status" :width="120" />
			</cl-filter>
			<cl-search-key :placeholder="t('搜索订单号、套餐')" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-purchase-order'
});

import { useCrud, useTable } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { t } = useI18n();
const orderService = new BaseService('admin/customer/purchase-order');

const options = reactive({
	resourceType: [
		{ label: t('端口'), value: 0 },
		{ label: t('字符'), value: 1 }
	],
	status: [
		{ label: t('待支付'), value: 0 },
		{ label: t('已支付'), value: 1 },
		{ label: t('已取消'), value: 2 },
		{ label: t('已退款'), value: 3 }
	]
});

const Table = useTable({
	columns: [
		{ label: t('订单号'), prop: 'orderNo', minWidth: 190, showOverflowTooltip: true },
		{ label: t('租户'), prop: 'tenantName', minWidth: 130 },
		{ label: t('套餐'), prop: 'packageName', minWidth: 180, showOverflowTooltip: true },
		{ label: t('资源类型'), prop: 'resourceType', minWidth: 110, dict: options.resourceType },
		{ label: t('数量'), prop: 'count', minWidth: 120 },
		{
			label: t('金额'),
			prop: 'amount',
			minWidth: 120,
			formatter(row) {
				return `$${Number(row.amount || 0).toFixed(2)}`;
			}
		},
		{ label: t('状态'), prop: 'status', minWidth: 100, dict: options.status },
		{ label: t('发放记录ID'), prop: 'grantRecordId', minWidth: 120 },
		{
			label: t('支付时间'),
			prop: 'paidTime',
			minWidth: 170,
			component: { name: 'cl-date-text' }
		},
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		}
	]
});

const Crud = useCrud(
	{
		service: orderService
	},
	app => {
		app.refresh();
	}
);
</script>
