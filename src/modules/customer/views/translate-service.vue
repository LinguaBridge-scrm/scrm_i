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
	name: "customer-translate-service",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useBase } from "/@/modules/base";
import { useI18n } from "vue-i18n";
import { computed, reactive } from "vue";

const { service } = useCool();
const { user } = useBase();
const { t } = useI18n();
const isTenantAdmin = computed(() => !!user.info?.tenantId);

// 选项
const options = reactive({
	status: [
		{ label: t("禁用"), value: 0, type: "danger" },
		{ label: t("启用"), value: 1, type: "success" },
	],
});

function maskSecret(value?: string) {
	if (!value) return "-";
	if (value.length <= 8) return value;
	return `${value.slice(0, 4)}****${value.slice(-4)}`;
}

// cl-upsert
const Upsert = useUpsert({
	items: [
		() => {
			return {
				label: t("租户"),
				prop: "tenantId",
				hidden: isTenantAdmin.value,
				component: {
					name: "cl-user-select",
					props: {
						labelKey: "username",
						placeholder: t("请选择租户"),
						immediate: true,
					},
				},
				span: 12,
				required: !isTenantAdmin.value,
			};
		},
		{
			label: t("服务类型"),
			prop: "serviceType",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("AK"),
			prop: "ak",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("SK"),
			prop: "sk",
			component: {
				name: "el-input",
				props: { clearable: true, showPassword: true },
			},
			span: 12,
		},
		{
			label: t("API地址"),
			prop: "apiUrl",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("翻译模型"),
			prop: "model",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("启用状态"),
			prop: "status",
			component: { name: "el-radio-group", options: options.status },
			value: 1,
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("租户"), prop: "tenantName", minWidth: 120 },
		{ label: t("服务类型"), prop: "serviceType", minWidth: 120 },
		{
			label: t("AK"),
			prop: "ak",
			minWidth: 160,
			showOverflowTooltip: true,
			formatter: ({ ak }) => maskSecret(ak),
		},
		{
			label: t("SK"),
			prop: "sk",
			minWidth: 160,
			showOverflowTooltip: true,
			formatter: ({ sk }) => maskSecret(sk),
		},
		{
			label: t("API地址"),
			prop: "apiUrl",
			minWidth: 220,
			showOverflowTooltip: true,
		},
		{
			label: t("翻译模型"),
			prop: "model",
			minWidth: 140,
			showOverflowTooltip: true,
		},
		{
			label: t("启用状态"),
			prop: "status",
			minWidth: 120,
			dict: options.status,
		},
		{
			label: t("创建时间"),
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" },
		},
		{
			label: t("更新时间"),
			prop: "updateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.customer.translateService,
	},
	(app) => {
		app.refresh();
	},
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
