<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="t('搜索注册IP、租户用户名')" :width="280" />
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
	name: 'sys-tenant-register-gift'
});

import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const giftService = new BaseService('admin/base/sys/tenant-register-gift');

const billingModeOptions = [
	{ label: t('端口计费'), value: 0, type: 'primary' },
	{ label: t('字符计费'), value: 1, type: 'success' }
];

const giftTypeOptions = [
	{ label: t('端口赠送'), value: 0, type: 'primary' },
	{ label: t('字符赠送'), value: 1, type: 'success' }
];

const Table = useTable({
	contextMenu: ['refresh'],
	columns: [
		{ type: 'index', label: '#', width: 60 },
		{
			label: t('注册IP'),
			prop: 'registerIp',
			minWidth: 150,
			showOverflowTooltip: true
		},
		{
			label: t('租户用户名'),
			prop: 'username',
			minWidth: 140,
			showOverflowTooltip: true
		},
		{ label: t('租户ID'), prop: 'tenantId', minWidth: 100 },
		{ label: t('用户ID'), prop: 'userId', minWidth: 100 },
		{
			label: t('计费模式'),
			prop: 'billingMode',
			minWidth: 120,
			dict: billingModeOptions
		},
		{
			label: t('赠送类型'),
			prop: 'giftType',
			minWidth: 120,
			dict: giftTypeOptions
		},
		{
			label: t('赠送数量'),
			prop: 'giftCount',
			minWidth: 120
		},
		{
			label: t('赠送记录ID'),
			prop: 'giftRecordId',
			minWidth: 120
		},
		{
			label: t('赠送时间'),
			prop: 'grantTime',
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
			label: t('计费模式'),
			prop: 'billingMode',
			component: {
				name: 'el-select',
				options: billingModeOptions,
				props: { clearable: true }
			}
		},
		{
			label: t('赠送类型'),
			prop: 'giftType',
			component: {
				name: 'el-select',
				options: giftTypeOptions,
				props: { clearable: true }
			}
		}
	]
});

const Crud = useCrud(
	{
		service: giftService
	},
	app => {
		app.refresh();
	}
);
</script>
