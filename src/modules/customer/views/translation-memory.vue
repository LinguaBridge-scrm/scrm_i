<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="$t('搜索原文、译文、Hash')" />
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
	name: 'customer-translation-memory'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { service } = useCool();
const { t } = useI18n();

const options = reactive({
	serviceType: [
		{ label: t('Google翻译'), value: 'google', type: 'primary' },
		{ label: t('OpenAI兼容大模型'), value: 'openai', type: 'success' }
	],
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	]
});

const Upsert = useUpsert({
	items: [
		{
			label: t('服务类型'),
			prop: 'serviceType',
			component: { name: 'el-radio-group', options: options.serviceType },
			value: 'google',
			span: 12,
			required: true
		},
		{
			label: t('源语言'),
			prop: 'sourceLang',
			component: { name: 'el-input', props: { clearable: true } },
			value: 'auto',
			span: 12,
			required: true
		},
		{
			label: t('目标语言'),
			prop: 'targetLang',
			component: { name: 'el-input', props: { clearable: true } },
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
			label: t('原文'),
			prop: 'originalText',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 5 }
			},
			required: true
		},
		{
			label: t('译文'),
			prop: 'translatedText',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 5 }
			},
			required: true
		}
	]
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{
			label: t('服务类型'),
			prop: 'serviceType',
			minWidth: 150,
			dict: options.serviceType
		},
		{ label: t('源语言'), prop: 'sourceLang', minWidth: 110 },
		{ label: t('目标语言'), prop: 'targetLang', minWidth: 110 },
		{
			label: t('原文'),
			prop: 'originalText',
			showOverflowTooltip: true,
			minWidth: 240
		},
		{
			label: t('译文'),
			prop: 'translatedText',
			showOverflowTooltip: true,
			minWidth: 240
		},
		{
			label: t('原文Hash'),
			prop: 'originalHash',
			showOverflowTooltip: true,
			minWidth: 220
		},
		{ label: t('命中次数'), prop: 'hitCount', minWidth: 110, sortable: 'custom' },
		{
			label: t('最后命中时间'),
			prop: 'lastUsedTime',
			minWidth: 170,
			component: { name: 'cl-date-text' }
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
			label: t('服务类型'),
			prop: 'serviceType',
			component: { name: 'el-select', options: options.serviceType }
		},
		{
			label: t('源语言'),
			prop: 'sourceLang',
			component: { name: 'el-input', props: { clearable: true } }
		},
		{
			label: t('目标语言'),
			prop: 'targetLang',
			component: { name: 'el-input', props: { clearable: true } }
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
		service: service.customer.translationMemory
	},
	app => {
		app.refresh();
	}
);

function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
