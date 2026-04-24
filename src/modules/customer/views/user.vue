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
	name: "customer-user",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useBase } from "/@/modules/base";
import { useI18n } from "vue-i18n";
import { computed, reactive } from "vue";
import dayjs from "dayjs";

const { service } = useCool();
const { user } = useBase();
const { t } = useI18n();
const isTenantUser = computed(() => !!user.info?.tenantId);

// 选项
const options = reactive({
	status: [
		{ label: t("禁用"), value: 0, type: "danger" },
		{ label: t("启用"), value: 1, type: "success" },
	],
	walletMonitorStatus: [
		{ label: t("关"), value: 0, type: "danger" },
		{ label: t("开"), value: 1, type: "success" },
	],
	keywordMonitorStatus: [
		{ label: t("关"), value: 0, type: "danger" },
		{ label: t("开"), value: 1, type: "success" },
	],
	globalStatus: [
		{ label: t("关"), value: 0, type: "danger" },
		{ label: t("开"), value: 1, type: "success" },
	],
	interceptStatus: [
		{ label: t("关"), value: 0, type: "danger" },
		{ label: t("开"), value: 1, type: "success" },
	],
});

function getCurrentDateTime() {
	return dayjs().format("YYYY-MM-DD HH:mm:ss");
}

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("用户名"),
			prop: "username",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("密码"),
			prop: "password",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		() => {
			return {
			label: t("消耗字符数"),
			prop: "consumedCharacters",
			hook: "number",
			value: 0,
			component: {
				name: "el-input-number",
				props: {
					min: 0,
					disabled: isTenantUser.value,
				},
			},
			span: 12,
			required: true,
			};
		},
		() => {
			return {
			label: t("占用端口"),
			prop: "occupiedPorts",
			hook: "number",
			value: 0,
			component: {
				name: "el-input-number",
				props: {
					min: 0,
					disabled: isTenantUser.value,
				},
			},
			span: 12,
			required: true,
			};
		},
		{
			label: t("状态"),
			prop: "status",
			component: { name: "el-radio-group", options: options.status },
			value: 1,
			required: true,
		},
		{
			label: t("钱包监控"),
			prop: "walletMonitorStatus",
			component: {
				name: "el-radio-group",
				options: options.walletMonitorStatus,
			},
			value: 0,
			required: true,
		},
		{
			label: t("关键词监控"),
			prop: "keywordMonitorStatus",
			component: {
				name: "el-radio-group",
				options: options.keywordMonitorStatus,
			},
			value: 0,
			required: true,
		},
		{
			label: t("全局开关"),
			prop: "globalStatus",
			component: {
				name: "el-radio-group",
				options: options.globalStatus,
			},
			value: 0,
			required: true,
		},
		{
			label: t("拦截开关"),
			prop: "interceptStatus",
			component: {
				name: "el-radio-group",
				options: options.interceptStatus,
			},
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
		{
			label: t("最后登录信息"),
			prop: "loginInfo",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4, disabled: true },
			},
		},
		{
			label: t("最后登录时间"),
			prop: "lastLoginTime",
			value: getCurrentDateTime(),
			component: {
				name: "el-date-picker",
				props: {
					type: "datetime",
					valueFormat: "YYYY-MM-DD HH:mm:ss",
					disabled: true,
				},
			},
			span: 12,
		},
	],

	onOpened(data) {
		if (Upsert.value?.mode == "add") {
			data.consumedCharacters = 0;
			data.occupiedPorts = 0;
			data.lastLoginTime = data.lastLoginTime || getCurrentDateTime();
		}
	},
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("租户"), prop: "tenantName", minWidth: 120 },
		{ label: t("用户名"), prop: "username", minWidth: 140 },
		{ label: t("密码"), prop: "password", minWidth: 140 },
		{
			label: t("消耗字符数"),
			prop: "consumedCharacters",
			minWidth: 140,
			sortable: "custom",
		},
		{
			label: t("占用端口数"),
			prop: "occupiedPorts",
			minWidth: 140,
			sortable: "custom",
		},
		{
			label: t("状态"),
			prop: "status",
			minWidth: 120,
			dict: options.status,
		},
		{
			label: t("钱包监控"),
			prop: "walletMonitorStatus",
			minWidth: 100,
			component: { name: "cl-switch" },
			dict: options.walletMonitorStatus,
		},
		{
			label: t("关键词监控"),
			prop: "keywordMonitorStatus",
			minWidth: 100,
			component: { name: "cl-switch" },
			dict: options.keywordMonitorStatus,
		},
		{
			label: t("全局开关"),
			prop: "globalStatus",
			minWidth: 100,
			component: { name: "cl-switch" },
			dict: options.globalStatus,
		},
		{
			label: t("拦截开关"),
			prop: "interceptStatus",
			minWidth: 100,
			component: { name: "cl-switch" },
			dict: options.interceptStatus,
		},
		{
			label: t("备注"),
			prop: "remark",
			showOverflowTooltip: true,
			minWidth: 200,
		},
		{
			label: t("最后登录信息"),
			prop: "loginInfo",
			showOverflowTooltip: true,
			minWidth: 220,
		},
		{
			label: t("最后登录时间"),
			prop: "lastLoginTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
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
		service: service.customer.user,
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
