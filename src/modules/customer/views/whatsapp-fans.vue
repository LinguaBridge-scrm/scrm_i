<template>
	<div class="customer-whatsapp-fans" v-loading="loading">
		<div class="filter-bar">
			<el-date-picker
				v-model="filters.dateRange"
				type="daterange"
				value-format="YYYY-MM-DD"
				:start-placeholder="t('开始日期')"
				:end-placeholder="t('结束日期')"
				:range-separator="t('至')"
				clearable
			/>

			<el-input
				v-model="filters.clientId"
				:placeholder="t('客户标识')"
				clearable
				class="filter-input"
			/>

			<el-input
				v-model="filters.accountId"
				:placeholder="t('账号标识')"
				clearable
				class="filter-input"
			/>

			<el-select
				v-model="filters.timezone"
				filterable
				allow-create
				class="timezone-select"
				:placeholder="t('时区')"
			>
				<el-option
					v-for="item in timezoneOptions"
					:key="item"
					:label="item"
					:value="item"
				/>
			</el-select>

			<el-button type="primary" :icon="Search" @click="load">
				{{ t('查询') }}
			</el-button>
			<el-button :icon="Refresh" @click="reset">
				{{ t('重置') }}
			</el-button>
		</div>

		<div class="summary-grid">
			<div class="summary-item">
				<span>{{ t('总新粉') }}</span>
				<strong>{{ summary.totalNewFans }}</strong>
			</div>
			<div class="summary-item">
				<span>{{ t('账号数') }}</span>
				<strong>{{ summary.accounts.length }}</strong>
			</div>
			<div class="summary-item">
				<span>{{ t('客户数') }}</span>
				<strong>{{ summary.clients.length }}</strong>
			</div>
			<div class="summary-item">
				<span>{{ t('统计时区') }}</span>
				<strong>{{ summary.timezone }}</strong>
			</div>
		</div>

		<div class="content-grid">
			<section class="panel">
				<div class="panel-head">
					<strong>{{ t('按日统计') }}</strong>
				</div>
				<el-table :data="summary.days" height="280" stripe>
					<el-table-column prop="date" :label="t('统计日期')" min-width="140" />
					<el-table-column prop="newFans" :label="t('新粉数')" min-width="120" />
				</el-table>
			</section>

			<section class="panel">
				<div class="panel-head">
					<strong>{{ t('按账号统计') }}</strong>
				</div>
				<el-table :data="summary.accounts" height="280" stripe>
					<el-table-column prop="accountId" :label="t('账号标识')" min-width="220" />
					<el-table-column prop="newFans" :label="t('新粉数')" min-width="100" />
				</el-table>
			</section>
		</div>

		<section class="panel detail-panel">
			<div class="panel-head">
				<strong>{{ t('进粉明细') }}</strong>
			</div>
			<el-table :data="summary.rows" stripe>
				<el-table-column prop="date" :label="t('统计日期')" min-width="130" />
				<el-table-column prop="clientId" :label="t('客户标识')" min-width="160" />
				<el-table-column prop="accountId" :label="t('账号标识')" min-width="220" />
				<el-table-column prop="newFans" :label="t('新粉数')" min-width="100" />
			</el-table>
		</section>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-whatsapp-fans'
});

import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { Refresh, Search } from '@element-plus/icons-vue';
import { BaseService } from '/@/cool';
import { useI18n } from 'vue-i18n';

interface FanAccount {
	accountId: string;
	newFans: number;
}

interface FanClient {
	clientId: string;
	newFans: number;
}

interface FanDay {
	date: string;
	newFans: number;
	accounts: FanAccount[];
}

interface FanRow {
	date: string;
	clientId: string;
	accountId: string;
	newFans: number;
}

const { t } = useI18n();
const fanService = new BaseService('admin/customer/whatsapp-fans');
const loading = ref(false);
const timezoneOptions = ['Asia/Shanghai', 'UTC', 'Asia/Dubai', 'Europe/London', 'America/New_York'];

const filters = reactive({
	dateRange: [today(), today()] as string[],
	clientId: '',
	accountId: '',
	timezone: 'Asia/Shanghai'
});

const summary = reactive({
	platform: 'whatsapp',
	timezone: 'Asia/Shanghai',
	startDate: today(),
	endDate: today(),
	totalNewFans: 0,
	accounts: [] as FanAccount[],
	clients: [] as FanClient[],
	days: [] as FanDay[],
	rows: [] as FanRow[]
});

load();

function today() {
	return dayjs().format('YYYY-MM-DD');
}

function requestParams() {
	const [startDate, endDate] = filters.dateRange || [];
	return {
		startDate,
		endDate,
		timezone: filters.timezone || 'Asia/Shanghai',
		clientId: filters.clientId || undefined,
		accountId: filters.accountId || undefined
	};
}

async function load() {
	const params = requestParams();
	if (!params.startDate || !params.endDate) {
		ElMessage.warning(t('请选择日期范围'));
		return;
	}

	loading.value = true;
	try {
		const data: any = await fanService.request({
			url: '/daily',
			method: 'GET',
			params
		});
		Object.assign(summary, {
			platform: data?.platform || 'whatsapp',
			timezone: data?.timezone || params.timezone,
			startDate: data?.startDate || params.startDate,
			endDate: data?.endDate || params.endDate,
			totalNewFans: Number(data?.totalNewFans || 0),
			accounts: Array.isArray(data?.accounts) ? data.accounts : [],
			clients: Array.isArray(data?.clients) ? data.clients : [],
			days: Array.isArray(data?.days) ? data.days : [],
			rows: Array.isArray(data?.rows) ? data.rows : []
		});
	} catch (err: any) {
		ElMessage.error(err?.message || t('获取每日进粉统计失败'));
	} finally {
		loading.value = false;
	}
}

function reset() {
	filters.dateRange = [today(), today()];
	filters.clientId = '';
	filters.accountId = '';
	filters.timezone = 'Asia/Shanghai';
	load();
}
</script>

<style lang="scss" scoped>
.customer-whatsapp-fans {
	padding: 12px;
	display: flex;
	flex-direction: column;
	gap: 12px;

	.filter-bar {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
		padding: 12px;
		background: var(--el-bg-color);
		border: 1px solid var(--el-border-color-lighter);
		border-radius: 6px;
	}

	.filter-input {
		width: 210px;
	}

	.timezone-select {
		width: 180px;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(160px, 1fr));
		gap: 12px;
	}

	.summary-item {
		min-height: 84px;
		padding: 14px 16px;
		background: var(--el-bg-color);
		border: 1px solid var(--el-border-color-lighter);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		span {
			color: var(--el-text-color-secondary);
			font-size: 13px;
		}

		strong {
			font-size: 24px;
			line-height: 1.1;
			font-weight: 650;
			color: var(--el-text-color-primary);
			word-break: break-word;
		}
	}

	.content-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 12px;
	}

	.panel {
		background: var(--el-bg-color);
		border: 1px solid var(--el-border-color-lighter);
		border-radius: 6px;
		overflow: hidden;
	}

	.panel-head {
		height: 44px;
		display: flex;
		align-items: center;
		padding: 0 14px;
		border-bottom: 1px solid var(--el-border-color-lighter);
	}

	.detail-panel {
		min-height: 320px;
	}
}

@media (max-width: 960px) {
	.customer-whatsapp-fans {
		.summary-grid,
		.content-grid {
			grid-template-columns: 1fr;
		}

		.filter-input,
		.timezone-select {
			width: 100%;
		}
	}
}
</style>
