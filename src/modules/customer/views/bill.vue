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
	name: "customer-bill",
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
	type: [
		{ label: t("消费"), value: 0 },
		{ label: t("充值"), value: 1 },
		{ label: t("退款"), value: 2 },
	],
	channel: [
		{ label: t("系统赠送"), value: 0 },
		{ label: t("Tron"), value: 1 },
		{ label: t("Eth"), value: 2 },
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
			label: t("类型"),
			prop: "type",
			component: { name: "el-radio-group", options: options.type },
			value: 1,
			required: true,
		},
		{
			label: t("金额"),
			prop: "amount",
			hook: "number",
			component: {
				name: "el-input-number",
				props: { min: 0, precision: 2, step: 0.01, stepStrictly: true },
			},
			span: 12,
			required: true,
		},
		{
			label: t("渠道"),
			prop: "channel",
			component: { name: "el-radio-group", options: options.channel },
			value: 0,
			required: true,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("租户"), prop: "tenantName", minWidth: 120 },
		{ label: t("类型"), prop: "type", minWidth: 120, dict: options.type },
		{
			label: t("金额"),
			prop: "amount",
			minWidth: 140,
			sortable: "custom",
			formatter(row) {
				return `$${Number(row.amount || 0).toFixed(2)}`;
			},
		},
		{
			label: t("渠道"),
			prop: "channel",
			minWidth: 120,
			dict: options.channel,
		},
		{
			label: t("备注"),
			prop: "remark",
			showOverflowTooltip: true,
			minWidth: 200,
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
		service: service.customer.bill,
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
