<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
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

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-crypto-wallet'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { t } = useI18n();
const walletService = new BaseService('admin/customer/crypto-wallet');
const usdtTokenContracts: Record<string, string> = {
	eth: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
	tron: 'TR7NHqjeKQxGTCi8q8ZY4pL8otGdZrFQf'
};

const options = reactive({
	chain: [
		{ label: 'USDT-ERC20', value: 'eth', type: 'success' },
		{ label: 'USDT-TRC20', value: 'tron', type: 'primary' }
	],
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	]
});

const Upsert = useUpsert({
	items: [
		{
			label: t('链类型'),
			prop: 'chain',
			component: {
				name: 'el-radio-group',
				options: options.chain,
				props: {
					onChange(value: string) {
						fillDefaultTokenContract(value);
					}
				}
			},
			value: 'eth',
			span: 12,
			required: true
		},
		{
			label: t('收款地址'),
			prop: 'address',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('RPC地址'),
			prop: 'rpcUrl',
			component: { name: 'el-input', props: { clearable: true } },
			required: true
		},
		{
			label: t('USDT合约地址'),
			prop: 'tokenContract',
			value: usdtTokenContracts.eth,
			component: {
				name: 'el-input',
				props: {
					clearable: true,
					placeholder: t('系统会按链类型自动填充默认USDT合约')
				}
			},
			required: true
		},
		{
			label: t('精度'),
			prop: 'decimals',
			hook: 'number',
			value: 6,
			component: { name: 'el-input-number', props: { min: 0, max: 18 } },
			span: 12,
			required: true
		},
		{
			label: t('确认块数'),
			prop: 'confirmationBlocks',
			hook: 'number',
			value: 12,
			component: { name: 'el-input-number', props: { min: 1 } },
			span: 12,
			required: true
		},
		{
			label: t('上次扫描区块'),
			prop: 'lastScannedBlock',
			hook: 'number',
			value: 0,
			component: { name: 'el-input-number', props: { min: 0 } },
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
			label: t('备注'),
			prop: 'remark',
			component: { name: 'el-input', props: { type: 'textarea', rows: 4 } }
		}
	],

	onOpened(data) {
		if (Upsert.value?.mode == 'add') {
			data.chain = data.chain || 'eth';
			fillDefaultTokenContract(data.chain, true);
		}
	},

	onSubmit(data, { next }) {
		next({
			...data,
			tokenContract: data.tokenContract || usdtTokenContracts[data.chain]
		});
	}
});

function fillDefaultTokenContract(chain: string, force = false) {
	const current = String(Upsert.value?.form?.tokenContract || '');
	const isDefault = Object.values(usdtTokenContracts).includes(current);
	if (force || !current || isDefault) {
		Upsert.value?.setForm('tokenContract', usdtTokenContracts[chain]);
	}
}

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('链类型'), prop: 'chain', minWidth: 120, dict: options.chain },
		{ label: t('收款地址'), prop: 'address', minWidth: 220, showOverflowTooltip: true },
		{ label: t('RPC地址'), prop: 'rpcUrl', minWidth: 220, showOverflowTooltip: true },
		{
			label: t('USDT合约地址'),
			prop: 'tokenContract',
			minWidth: 220,
			showOverflowTooltip: true
		},
		{ label: t('确认块数'), prop: 'confirmationBlocks', minWidth: 100 },
		{ label: t('上次扫描区块'), prop: 'lastScannedBlock', minWidth: 130 },
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.status
		},
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

const Search = useSearch({
	items: [
		{
			label: t('链类型'),
			prop: 'chain',
			component: { name: 'el-select', options: options.chain, props: { clearable: true } }
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
		service: walletService
	},
	app => {
		app.refresh();
	}
);
</script>
