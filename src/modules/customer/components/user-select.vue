<template>
	<cl-select-table
		v-model="value"
		:title="t('选择用户列表')"
		:service="service.customer.user"
		:columns="columns"
		:multiple="multiple"
		:dict="{ text: 'username' }"
		pickerType="text"
	/>
</template>

<script setup lang="ts">
defineOptions({
	name: "customer-user-select",
});

import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { CrudProps } from "/#/crud";
import { reactive, ref, useModel } from "vue";

const props = defineProps({
	...CrudProps,
	modelValue: null,
	multiple: Boolean,
});

const { service } = useCool();
const { t } = useI18n();

const value = useModel(props, "modelValue");

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

const columns = ref([
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
	{ label: t("状态"), prop: "status", minWidth: 120, dict: options.status },
	{
		label: t("钱包监控开关"),
		prop: "walletMonitorStatus",
		minWidth: 100,
		component: { name: "cl-switch" },
		dict: options.walletMonitorStatus,
	},
	{
		label: t("关键词监控开关"),
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
		label: t("登录信息"),
		prop: "loginInfo",
		showOverflowTooltip: true,
		minWidth: 200,
	},
	{
		label: t("最后登录时间"),
		prop: "lastLoginTime",
		minWidth: 170,
		sortable: "custom",
		component: { name: "cl-date-text" },
	},
]);
</script>
