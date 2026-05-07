<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<el-button v-if="!isTenantAdmin" type="primary" :loading="scanLoading" @click="scan">
				{{ t('手动扫描') }}
			</el-button>
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
	name: 'customer-crypto-recharge-order'
});

import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useBase } from '/@/modules/base';
import { useI18n } from 'vue-i18n';
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

const { t } = useI18n();
const { user } = useBase();
const orderService = new BaseService('admin/customer/crypto-recharge-order');
const scanLoading = ref(false);
const isTenantAdmin = computed(() => !!user.info?.tenantId);

const options = reactive({
	chain: [
		{ label: 'USDT-ERC20', value: 'eth', type: 'success' },
		{ label: 'USDT-TRC20', value: 'tron', type: 'primary' }
	],
	status: [
		{ label: t('待支付'), value: 0, type: 'info' },
		{ label: t('已匹配'), value: 1, type: 'warning' },
		{ label: t('已确认'), value: 2, type: 'success' },
		{ label: t('已过期'), value: 3, type: 'danger' },
		{ label: t('金额异常'), value: 4, type: 'danger' },
		{ label: t('链上异常'), value: 5, type: 'danger' }
	]
});

function amount(value: any, precision = 2) {
	return Number(value || 0).toFixed(precision);
}

const Table = useTable({
	columns: [
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('订单号'), prop: 'orderNo', minWidth: 190, showOverflowTooltip: true },
		{ label: t('链类型'), prop: 'chain', minWidth: 120, dict: options.chain },
		{
			label: t('充值金额'),
			prop: 'baseAmount',
			minWidth: 120,
			formatter: row => amount(row.baseAmount)
		},
		{
			label: t('实付金额'),
			prop: 'payAmount',
			minWidth: 120,
			formatter: row => amount(row.payAmount)
		},
		{ label: t('状态'), prop: 'status', minWidth: 110, dict: options.status },
		{ label: t('确认数'), prop: 'confirmations', minWidth: 90 },
		{ label: t('收款地址'), prop: 'address', minWidth: 220, showOverflowTooltip: true },
		{ label: t('交易哈希'), prop: 'txHash', minWidth: 220, showOverflowTooltip: true },
		{
			label: t('过期时间'),
			prop: 'expireTime',
			minWidth: 170,
			component: { name: 'cl-date-text' }
		},
		{
			label: t('确认时间'),
			prop: 'confirmTime',
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
		service: orderService
	},
	app => {
		app.refresh();
	}
);

async function scan() {
	scanLoading.value = true;
	try {
		const data: any = await orderService.request({
			url: '/scan',
			method: 'POST'
		});
		ElMessage.success(
			t('扫描完成') +
				`：tx=${data?.txCount || 0}, matched=${data?.matchedCount || 0}, confirmed=${data?.confirmedCount || 0}`
		);
		Crud.value?.refresh();
	} catch (err: any) {
		ElMessage.error(err?.message || t('扫描失败'));
	} finally {
		scanLoading.value = false;
	}
}
</script>
