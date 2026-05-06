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
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-crypto-recharge-tx'
});

import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { t } = useI18n();
const txService = new BaseService('admin/customer/crypto-recharge-tx');

const options = reactive({
	chain: [
		{ label: 'USDT-ERC20', value: 'eth', type: 'success' },
		{ label: 'USDT-TRC20', value: 'tron', type: 'primary' }
	],
	status: [
		{ label: t('未匹配'), value: 0, type: 'info' },
		{ label: t('已匹配'), value: 1, type: 'warning' },
		{ label: t('已入账'), value: 2, type: 'success' },
		{ label: t('金额异常'), value: 3, type: 'danger' }
	]
});

const Table = useTable({
	columns: [
		{ label: t('链类型'), prop: 'chain', minWidth: 120, dict: options.chain },
		{
			label: t('金额'),
			prop: 'amount',
			minWidth: 120,
			formatter: row => Number(row.amount || 0).toFixed(6)
		},
		{ label: t('状态'), prop: 'status', minWidth: 110, dict: options.status },
		{ label: t('确认数'), prop: 'confirmations', minWidth: 90 },
		{ label: t('匹配订单'), prop: 'matchedOrderId', minWidth: 110 },
		{ label: t('交易哈希'), prop: 'txHash', minWidth: 230, showOverflowTooltip: true },
		{ label: t('付款地址'), prop: 'fromAddress', minWidth: 220, showOverflowTooltip: true },
		{ label: t('收款地址'), prop: 'toAddress', minWidth: 220, showOverflowTooltip: true },
		{ label: t('区块高度'), prop: 'blockNumber', minWidth: 120 },
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		}
	]
});

const Search = useSearch({
	items: [
		{
			label: t('链类型'),
			prop: 'chain',
			component: { name: 'el-select', options: options.chain }
		},
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'el-select', options: options.status }
		}
	]
});

const Crud = useCrud(
	{
		service: txService
	},
	app => {
		app.refresh();
	}
);
</script>
