<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key :placeholder="t('搜索标题、内容、备注')" :width="260" />
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
	name: 'customer-site-message'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { useBase } from '/@/modules/base';
import { useI18n } from 'vue-i18n';
import { computed, reactive } from 'vue';
import UserSelect from '/$/customer/components/user-select.vue';

const { user } = useBase();
const { t } = useI18n();
const isTenantAdmin = computed(() => !!user.info?.tenantId);
const siteMessageService = new BaseService('admin/customer/site-message');

const options = reactive({
	targetType: [
		{ label: t('全部员工'), value: 0, type: 'primary' },
		{ label: t('指定员工'), value: 1, type: 'success' }
	],
	priority: [
		{ label: t('普通'), value: 0, type: 'info' },
		{ label: t('重要'), value: 1, type: 'warning' }
	],
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	]
});

function normalizeUserIds(userIds?: any) {
	const values = Array.isArray(userIds) ? userIds : userIds ? [userIds] : [];

	return Array.from(
		new Set(
			values
				.map(item => (typeof item === 'object' ? item?.id : item))
				.map(item => Number(item))
				.filter(item => Number.isInteger(item) && item > 0)
		)
	);
}

const Upsert = useUpsert({
	items: [
		() => {
			return {
				label: t('租户'),
				prop: 'tenantId',
				hidden: isTenantAdmin.value,
				component: {
					name: 'cl-user-select',
					props: {
						labelKey: 'username',
						placeholder: t('请选择租户'),
						immediate: true
					}
				},
				span: 12,
				required: !isTenantAdmin.value
			};
		},
		{
			label: t('站内信标题'),
			prop: 'title',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('接收范围'),
			prop: 'targetType',
			component: { name: 'el-radio-group', options: options.targetType },
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('指定员工'),
			prop: 'userIds',
			hidden: ({ scope }) => scope.targetType !== 1,
			component: {
				name: 'customer-user-select',
				vm: UserSelect,
				props: { multiple: true }
			},
			required: true
		},
		{
			label: t('站内信内容'),
			prop: 'content',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 5 }
			},
			required: true
		},
		{
			label: t('优先级'),
			prop: 'priority',
			component: { name: 'el-radio-group', options: options.priority },
			value: 0,
			span: 12,
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
			label: t('发布时间'),
			prop: 'publishTime',
			component: {
				name: 'el-date-picker',
				props: {
					type: 'datetime',
					valueFormat: 'YYYY-MM-DD HH:mm:ss',
					clearable: true
				}
			},
			span: 12
		},
		{
			label: t('备注'),
			prop: 'remark',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 3 }
			}
		}
	],

	onOpened(data) {
		data.userIds = normalizeUserIds(data.userIds);
	},

	onSubmit(data, { next }) {
		next({
			...data,
			userIds: data.targetType === 1 ? normalizeUserIds(data.userIds) : []
		});
	}
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{
			label: t('站内信标题'),
			prop: 'title',
			showOverflowTooltip: true,
			minWidth: 180
		},
		{
			label: t('接收范围'),
			prop: 'targetType',
			minWidth: 120,
			dict: options.targetType
		},
		{
			label: t('指定员工数'),
			prop: 'userIds',
			minWidth: 110,
			formatter: ({ userIds }) => normalizeUserIds(userIds).length
		},
		{
			label: t('优先级'),
			prop: 'priority',
			minWidth: 100,
			dict: options.priority
		},
		{
			label: t('启用状态'),
			prop: 'status',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.status
		},
		{
			label: t('发布时间'),
			prop: 'publishTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('站内信内容'),
			prop: 'content',
			showOverflowTooltip: true,
			minWidth: 240
		},
		{
			label: t('备注'),
			prop: 'remark',
			showOverflowTooltip: true,
			minWidth: 180
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
			label: t('接收范围'),
			prop: 'targetType',
			component: { name: 'el-select', options: options.targetType, props: { clearable: true } }
		},
		{
			label: t('优先级'),
			prop: 'priority',
			component: { name: 'el-select', options: options.priority, props: { clearable: true } }
		},
		{
			label: t('启用状态'),
			prop: 'status',
			component: { name: 'el-select', options: options.status, props: { clearable: true } }
		}
	]
});

const Crud = useCrud(
	{
		service: siteMessageService
	},
	app => {
		app.refresh();
	}
);

function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
