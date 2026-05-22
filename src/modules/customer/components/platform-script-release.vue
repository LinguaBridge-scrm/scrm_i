<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<el-button type="primary" :loading="publishLoading" @click="openPublish">
				{{ $t('发布脚本包') }}
			</el-button>
			<cl-flex1 />
			<cl-search-key :placeholder="$t('搜索包版本、Hash')" />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-form ref="PublishForm" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-platform-script-release'
});

import { useCrud, useForm, useSearch, useTable } from '@cool-vue/crud';
import { BaseService } from '/@/cool';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const publishLoading = ref(false);
const releaseService = new BaseService('admin/customer/platform-script-release');

const options = reactive({
	releaseStatus: [
		{ label: t('历史'), value: 0, type: 'info' },
		{ label: t('当前'), value: 1, type: 'success' }
	]
});

const Table = useTable({
	autoHeight: false,
	columns: [
		{ label: t('包版本'), prop: 'packageVersion', minWidth: 120 },
		{ label: t('最低客户端版本'), prop: 'minClientVersion', minWidth: 140 },
		{
			label: t('包Hash'),
			prop: 'payloadHash',
			minWidth: 260,
			showOverflowTooltip: true
		},
		{ label: t('发布状态'), prop: 'status', minWidth: 110, dict: options.releaseStatus },
		{
			label: t('发布时间'),
			prop: 'publishTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{ label: t('发布人ID'), prop: 'publisherId', minWidth: 110 },
		{
			label: t('更新时间'),
			prop: 'updateTime',
			minWidth: 170,
			component: { name: 'cl-date-text' }
		}
	]
});

const Search = useSearch({
	items: [
		{
			label: t('发布状态'),
			prop: 'status',
			component: { name: 'el-select', options: options.releaseStatus, props: { clearable: true } }
		}
	]
});

const Crud = useCrud(
	{
		service: releaseService
	},
	app => {
		app.refresh();
	}
);

const PublishForm = useForm();

function openPublish() {
	PublishForm.value?.open({
		title: t('发布脚本包'),
		width: '520px',
		items: [
			{
				label: t('包版本'),
				prop: 'packageVersion',
				component: { name: 'el-input', props: { clearable: true } },
				value: '1.0.0',
				required: true
			},
			{
				label: t('最低客户端版本'),
				prop: 'minClientVersion',
				component: { name: 'el-input', props: { clearable: true } },
				value: '1.0.0',
				required: true
			},
			{
				label: t('备注'),
				prop: 'remark',
				component: { name: 'el-input', props: { type: 'textarea', rows: 3 } }
			}
		],
		on: {
			async submit(data, { close }) {
				publishLoading.value = true;
				try {
					await releaseService.request({
						url: '/publish',
						method: 'POST',
						data
					});
					ElMessage.success(t('发布成功'));
					close();
					Crud.value?.refresh();
				} catch (err: any) {
					ElMessage.error(err?.message || t('发布失败'));
				} finally {
					publishLoading.value = false;
				}
			}
		}
	});
}
</script>
