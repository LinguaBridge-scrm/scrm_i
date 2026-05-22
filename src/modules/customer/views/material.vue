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
	name: 'customer-material'
});

import { useCrud, useSearch, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { service } = useCool();
const { t } = useI18n();

const materialService = (service.customer as any).material;

const options = reactive({
	type: [
		{ label: t('图片'), value: 0, type: 'primary' },
		{ label: t('视频'), value: 1, type: 'success' }
	],
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	]
});

function normalizeUrls(urls?: string[] | string) {
	return Array.isArray(urls) ? urls : urls ? [urls] : [];
}

const Upsert = useUpsert({
	items: [
		{
			label: t('素材标题'),
			prop: 'title',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('素材类型'),
			prop: 'type',
			component: { name: 'el-radio-group', options: options.type },
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('图片素材'),
			prop: 'imageUrls',
			hidden: ({ scope }) => scope.type !== 0,
			component: {
				name: 'cl-upload',
				props: { multiple: true, draggable: true, accept: 'image/*' }
			}
		},
		{
			label: t('视频素材'),
			prop: 'videoUrls',
			hidden: ({ scope }) => scope.type !== 1,
			component: {
				name: 'cl-upload',
				props: {
					type: 'file',
					multiple: true,
					draggable: true,
					accept: 'video/*',
					text: t('选择视频')
				}
			}
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
			label: t('备注'),
			prop: 'remark',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			}
		}
	],

	onOpened(data) {
		const urls = normalizeUrls(data.urls);
		data.imageUrls = data.type === 1 ? [] : urls;
		data.videoUrls = data.type === 1 ? urls : [];
	},

	onSubmit(data, { next }) {
		const urls =
			data.type === 1 ? normalizeUrls(data.videoUrls) : normalizeUrls(data.imageUrls);
		const { imageUrls, videoUrls, ...payload } = data;

		next({
			...payload,
			urls,
			cover: urls[0] || ''
		});
	}
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('租户'), prop: 'tenantName', minWidth: 120 },
		{ label: t('素材标题'), prop: 'title', minWidth: 160, showOverflowTooltip: true },
		{
			label: t('素材类型'),
			prop: 'type',
			minWidth: 110,
			dict: options.type
		},
		{
			label: t('封面'),
			prop: 'cover',
			minWidth: 100,
			component: { name: 'cl-image', props: { size: 60 } }
		},
		{
			label: t('素材数量'),
			prop: 'urls',
			minWidth: 100,
			formatter: ({ urls }) => normalizeUrls(urls).length
		},
		{
			label: t('启用状态'),
			prop: 'status',
			minWidth: 100,
			component: { name: 'cl-switch' },
			dict: options.status
		},
		{
			label: t('备注'),
			prop: 'remark',
			minWidth: 200,
			showOverflowTooltip: true
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
			label: t('素材类型'),
			prop: 'type',
			component: { name: 'el-select', options: options.type, props: { clearable: true } }
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
		service: materialService
	},
	app => {
		app.refresh();
	}
);

function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
