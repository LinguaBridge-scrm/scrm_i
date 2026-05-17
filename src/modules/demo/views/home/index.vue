<template>
	<el-scrollbar>
		<div v-loading="loading" class="demo-home">
			<div class="metrics">
				<div v-for="item in metricCards" :key="item.label" class="metric-card">
					<div class="metric-card__meta">
						<span>{{ item.label }}</span>
						<cl-svg :name="item.icon" class="metric-card__icon" />
					</div>

					<div class="metric-card__value">
						<cl-number :value="item.value" />
						<small>{{ item.unit }}</small>
					</div>

					<div class="metric-card__desc">{{ item.desc }}</div>
				</div>
			</div>

			<div class="content-grid">
				<section class="panel panel--chart">
					<div class="panel__header">
						<div>
							<h3>{{ $t('24小时翻译调用量') }}</h3>
							<p>{{ $t('基于小时聚合表统计，避免首页扫描明细记录') }}</p>
						</div>

						<el-button :loading="loading" size="small" @click="refresh">
							{{ $t('刷新') }}
						</el-button>
					</div>

					<v-chart :option="chartOption" autoresize />
				</section>

				<section class="panel">
					<div class="panel__header">
						<div>
							<h3>{{ $t('资源与损耗') }}</h3>
							<p>{{ $t('端口占用、字符消耗与翻译库复用情况') }}</p>
						</div>
					</div>

					<div class="resource-list">
						<div v-for="item in resourceStats" :key="item.label" class="resource-item">
							<div>
								<span>{{ item.label }}</span>
								<small>{{ item.desc }}</small>
							</div>
							<strong>{{ formatNumber(item.value) }}</strong>
						</div>
					</div>
				</section>
			</div>
		</div>
	</el-scrollbar>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'home'
});

import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useDark } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { useCool } from '/@/cool';
import { useTheme } from '/#/theme';

type HourlyStat = {
	hour: string;
	callCount: number;
	characterCount: number;
};

const { service } = useCool();
const { t } = useI18n();
const isDark = useDark();
const theme = useTheme();
const loading = ref(false);

const summary = reactive({
	tenantCount: 0,
	todayCallCount: 0,
	last24hCallCount: 0,
	totalCallCount: 0,
	activePorts: 0,
	totalCharacterCount: 0,
	todayCharacterCount: 0,
	last24hCharacterCount: 0,
	cacheHitCount: 0,
	externalCallCount: 0,
	hourly: [] as HourlyStat[]
});

const metricCards = computed(() => [
	{
		label: t('总租户数量'),
		value: summary.tenantCount,
		unit: t('个'),
		desc: t('全站已接入租户'),
		icon: 'team'
	},
	{
		label: t('当日翻译API调用次数'),
		value: summary.todayCallCount,
		unit: t('次'),
		desc: t('今日自然日累计'),
		icon: 'order'
	},
	{
		label: t('24小时内翻译调用量'),
		value: summary.last24hCallCount,
		unit: t('次'),
		desc: t('滚动24小时累计'),
		icon: 'trend'
	},
	{
		label: t('总调用量'),
		value: summary.totalCallCount,
		unit: t('次'),
		desc: t('历史累计调用'),
		icon: 'amount'
	}
]);

const resourceStats = computed(() => [
	{
		label: t('当前端口占用'),
		value: summary.activePorts,
		desc: t('全站用户运行态快照')
	},
	{
		label: t('今日字符消耗'),
		value: summary.todayCharacterCount,
		desc: t('今日翻译计费字符')
	},
	{
		label: t('24小时字符消耗'),
		value: summary.last24hCharacterCount,
		desc: t('滚动24小时计费字符')
	},
	{
		label: t('累计字符消耗'),
		value: summary.totalCharacterCount,
		desc: t('历史翻译计费字符')
	},
	{
		label: t('翻译库复用次数'),
		value: summary.cacheHitCount,
		desc: t('未调用外部服务的命中')
	},
	{
		label: t('外部服务调用次数'),
		value: summary.externalCallCount,
		desc: t('Google/OpenAI 实际损耗')
	}
]);

const chartOption = computed(() => {
	const axisColor = isDark.value ? '#d1d5db' : '#6b7280';
	const splitColor = isDark.value ? 'rgba(255,255,255,0.08)' : '#eef1f6';
	const labels = summary.hourly.map(item => item.hour.slice(11));

	return {
		color: [theme.color, '#d97706'],
		grid: {
			left: 24,
			right: 24,
			top: 36,
			bottom: 30,
			containLabel: true
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			top: 0,
			right: 0,
			textStyle: {
				color: axisColor
			}
		},
		xAxis: {
			type: 'category',
			data: labels,
			axisTick: { show: false },
			axisLine: { lineStyle: { color: splitColor } },
			axisLabel: { color: axisColor }
		},
		yAxis: [
			{
				type: 'value',
				name: t('调用'),
				splitLine: { lineStyle: { color: splitColor } },
				axisLabel: { color: axisColor }
			},
			{
				type: 'value',
				name: t('字符'),
				splitLine: { show: false },
				axisLabel: { color: axisColor }
			}
		],
		series: [
			{
				name: t('调用次数'),
				type: 'bar',
				barWidth: 14,
				data: summary.hourly.map(item => item.callCount),
				itemStyle: {
					borderRadius: [4, 4, 0, 0]
				}
			},
			{
				name: t('字符消耗'),
				type: 'line',
				yAxisIndex: 1,
				smooth: true,
				showSymbol: false,
				data: summary.hourly.map(item => item.characterCount)
			}
		]
	};
});

function formatNumber(value: number) {
	return Number(value || 0).toLocaleString();
}

function assignSummary(data: any) {
	summary.tenantCount = Number(data?.tenantCount || 0);
	summary.todayCallCount = Number(data?.todayCallCount || 0);
	summary.last24hCallCount = Number(data?.last24hCallCount || 0);
	summary.totalCallCount = Number(data?.totalCallCount || 0);
	summary.activePorts = Number(data?.activePorts || 0);
	summary.totalCharacterCount = Number(data?.totalCharacterCount || 0);
	summary.todayCharacterCount = Number(data?.todayCharacterCount || 0);
	summary.last24hCharacterCount = Number(data?.last24hCharacterCount || 0);
	summary.cacheHitCount = Number(data?.cacheHitCount || 0);
	summary.externalCallCount = Number(data?.externalCallCount || 0);
	summary.hourly = Array.isArray(data?.hourly) ? data.hourly : [];
}

async function refresh() {
	loading.value = true;
	try {
		const data = await service.customer.dashboard.globalSummary();
		assignSummary(data);
	} catch (err: any) {
		ElMessage.error(err?.message || t('获取全站翻译统计失败'));
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	refresh();
});
</script>

<style lang="scss">
.demo-home {
	min-height: 100%;
	padding: 14px;
	overflow-x: hidden;

	.metrics {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
		margin-bottom: 12px;
	}

	.metric-card,
	.panel {
		border: 1px solid var(--el-border-color-extra-light);
		background-color: var(--el-bg-color);
		color: var(--el-text-color-primary);
		box-shadow: 0 10px 28px rgba(15, 23, 42, 0.04);
	}

	.metric-card {
		min-height: 150px;
		padding: 18px;
		border-radius: 8px;

		&__meta {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			font-size: 14px;
			color: var(--el-text-color-regular);
		}

		&__icon {
			width: 32px;
			height: 32px;
			padding: 7px;
			border-radius: 8px;
			color: var(--el-color-primary);
			background-color: var(--el-color-primary-light-9);
		}

		&__value {
			display: flex;
			align-items: baseline;
			gap: 6px;
			margin-top: 18px;

			.cl-number {
				font-size: 32px;
				font-weight: 700;
				line-height: 1;
			}

			small {
				font-size: 13px;
				color: var(--el-text-color-secondary);
			}
		}

		&__desc {
			margin-top: 14px;
			font-size: 13px;
			color: var(--el-text-color-secondary);
		}
	}

	.content-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 360px;
		gap: 12px;
	}

	.panel {
		border-radius: 8px;
		padding: 18px;

		&__header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 12px;
			margin-bottom: 12px;

			h3 {
				margin: 0;
				font-size: 17px;
				font-weight: 700;
			}

			p {
				margin: 6px 0 0;
				font-size: 13px;
				color: var(--el-text-color-secondary);
			}
		}

		&--chart {
			min-height: 460px;

			.echarts {
				height: 380px;
				width: 100%;
			}
		}
	}

	.resource-list {
		display: grid;
		gap: 10px;
	}

	.resource-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 0;
		border-bottom: 1px solid var(--el-border-color-lighter);

		&:last-child {
			border-bottom: 0;
		}

		div {
			display: grid;
			gap: 5px;
			min-width: 0;
		}

		span {
			font-size: 14px;
			color: var(--el-text-color-primary);
		}

		small {
			font-size: 12px;
			color: var(--el-text-color-secondary);
		}

		strong {
			font-size: 20px;
			white-space: nowrap;
		}
	}

	@media (max-width: 1180px) {
		.metrics {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.content-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		padding: 10px;

		.metrics {
			grid-template-columns: 1fr;
		}

		.metric-card {
			min-height: 130px;
		}
	}
}
</style>
