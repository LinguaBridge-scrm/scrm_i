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
	name: "customer-port",
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
		{ label: t("已失效"), value: 0 },
		{ label: t("生效中"), value: 1 },
		{ label: t("已过期"), value: 2 },
	],
	payChannels: [
		{ label: t("系统赠送"), value: 0 },
		{ label: t("Tron"), value: 1 },
		{ label: t("Eth"), value: 2 },
		{ label: t("系统购买"), value: 3 },
	],
});

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
			label: t("数量"),
			prop: "count",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("价格"),
			prop: "price",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("日期范围"),
			prop: "date",
			component: {
				name: "el-date-picker",
				props: {
					type: "daterange",
					valueFormat: "YYYY-MM-DD 00:00:00",
					defaultTime: [
						"2000-01-31T16:00:00.000Z",
						"2000-02-01T15:59:59.000Z",
					],
				},
			},
			span: 12,
			hook: "datetimeRange",
		},
		{
			label: t("状态"),
			prop: "status",
			component: { name: "el-radio-group", options: options.status },
			value: 1,
			required: true,
		},
		{
			label: t("支付渠道"),
			prop: "payChannels",
			value: 0,
			component: { name: "el-radio-group", options: options.payChannels },
			span: 12,
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("租户"), prop: "tenantName", minWidth: 120 },
		{ label: t("数量"), prop: "count", minWidth: 140, sortable: "custom" },
		{
			label: t("价格"),
			prop: "price",
			minWidth: 140,
			sortable: "custom",
			formatter(row) {
				return `$${Number(row.price || 0).toFixed(2)}`;
			},
		},
		{
			label: t("生效时间"),
			prop: "startDate",
			minWidth: 140,
			sortable: "custom",
			component: {
				name: "cl-date-text",
				props: { format: "YYYY-MM-DD" },
			},
		},
		{
			label: t("到期时间"),
			prop: "endDate",
			minWidth: 140,
			sortable: "custom",
			component: {
				name: "cl-date-text",
				props: { format: "YYYY-MM-DD" },
			},
		},
		{
			label: t("状态"),
			prop: "status",
			minWidth: 120,
			dict: options.status,
		},
		{
			label: t("支付渠道"),
			prop: "payChannels",
			minWidth: 180,
			formatter(row) {
				const value = Array.isArray(row.payChannels)
					? row.payChannels[0]
					: row.payChannels;
				return options.payChannels.find(e => e.value === value)?.label || "-";
			},
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
		service: service.customer.port,
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
