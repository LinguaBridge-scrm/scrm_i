<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-translation'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';
import UserSelect from '/$/customer/components/user-select.vue';

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	serviceType: [
		{ label: t('Google翻译'), value: 'google', type: 'primary' },
		{ label: t('OpenAI兼容大模型'), value: 'openai', type: 'success' }
	],
	cacheHit: [
		{ label: t('外部调用'), value: 0, type: 'info' },
		{ label: t('复用翻译库'), value: 1, type: 'success' }
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('选择用户'),
			prop: 'userId',
			component: { name: 'customer-user-select', vm: UserSelect },
			span: 12,
			required: true
		},
		{
			label: t('服务类型'),
			prop: 'serviceType',
			component: { name: 'el-radio-group', options: options.serviceType },
			value: 'google',
			required: true
		},
		{
			label: t('服务配置ID'),
			prop: 'translateServiceId',
			component: {
				name: 'el-input-number',
				props: { min: 0, controlsPosition: 'right' }
			},
			span: 12
		},
		{
			label: t('原文'),
			prop: 'originalText',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			},
			required: true
		},
		{
			label: t('译文'),
			prop: 'translatedText',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			},
			required: true
		},
		{
			label: t('源语言'),
			prop: 'sourceLang',
			component: { name: 'el-input', props: { clearable: true } },
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
			label: t('消耗字符数'),
			prop: 'characterCount',
			component: {
				name: 'el-input-number',
				props: { min: 0, controlsPosition: 'right' }
			},
			value: 0,
			span: 12
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('用户名'), prop: 'username', minWidth: 140 },
		{
			label: t('服务类型'),
			prop: 'serviceType',
			minWidth: 150,
			dict: options.serviceType
		},
		{
			label: t('服务配置ID'),
			prop: 'translateServiceId',
			minWidth: 120
		},
		{
			label: t('调用来源'),
			prop: 'cacheHit',
			minWidth: 120,
			dict: options.cacheHit
		},
		{
			label: t('翻译库ID'),
			prop: 'memoryId',
			minWidth: 110
		},
		{
			label: t('原文'),
			prop: 'originalText',
			showOverflowTooltip: true,
			minWidth: 200
		},
		{
			label: t('译文'),
			prop: 'translatedText',
			showOverflowTooltip: true,
			minWidth: 200
		},
		{ label: t('源语言'), prop: 'sourceLang', minWidth: 120 },
		{ label: t('目标语言'), prop: 'targetLang', minWidth: 120 },
		{ label: t('消耗字符数'), prop: 'characterCount', minWidth: 120 },
		{
			label: t('原文Hash'),
			prop: 'originalHash',
			showOverflowTooltip: true,
			minWidth: 220
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

// cl-search
const Search = useSearch({
	items: [
		{
			label: t('用户名'),
			prop: 'username',
			component: { name: 'el-input', props: { clearable: true } }
		},
		{
			label: t('服务类型'),
			prop: 'serviceType',
			component: { name: 'el-select', options: options.serviceType, props: { clearable: true } }
		},
		{
			label: t('调用来源'),
			prop: 'cacheHit',
			component: { name: 'el-select', options: options.cacheHit, props: { clearable: true } }
		}
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.customer.translation
	},
	app => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
