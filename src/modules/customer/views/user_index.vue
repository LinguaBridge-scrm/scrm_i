<template>
	<el-scrollbar>
		<div class="customer-dashboard">
			<el-row :gutter="10">
				<el-col v-for="item in cards" :key="item.prop" :lg="6" :md="12" :xs="24">
					<div class="card" v-loading="loading">
						<div class="card__header">
							<span class="label">{{ item.label }}</span>
							<el-icon class="icon">
								<component :is="item.icon" />
							</el-icon>
						</div>

						<div class="card__container">
							<span class="num">{{ item.value }}</span>
							<span v-if="item.suffix" class="suffix">{{ item.suffix }}</span>
						</div>

						<div class="card__footer">
							<span>{{ item.desc }}</span>
						</div>
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="10">
				<el-col :lg="24" :xs="24">
					<div class="card ranking-card">
						<div class="card__header">
							<span class="label">{{ t('当前实时占用端口排名') }}</span>
							<el-button type="primary" link :loading="loading" @click="refresh">
								{{ t('刷新') }}
							</el-button>
						</div>

						<div class="card__container ranking-card__container">
							<el-skeleton v-if="loading" :rows="6" animated />
							<el-table
								v-else
								:data="summary.portRankings"
								height="100%"
								:empty-text="t('暂无数据')"
							>
								<el-table-column type="index" :label="t('排名')" width="80" />
								<el-table-column
									prop="username"
									:label="t('用户')"
									min-width="140"
								/>
								<el-table-column
									prop="activePorts"
									:label="t('实时占用端口数')"
									min-width="150"
								/>
								<el-table-column
									prop="currentClientId"
									:label="t('客户端ID')"
									min-width="180"
									show-overflow-tooltip
								/>
								<el-table-column
									prop="lastActiveTime"
									:label="t('最后活跃时间')"
									min-width="180"
								>
									<template #default="{ row }">
										{{ row.lastActiveTime || '-' }}
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</el-scrollbar>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-user-index'
});

import { Coin, Connection, DataLine, Document } from '@element-plus/icons-vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';

type PortRanking = {
	userId: number;
	username: string;
	activePorts: number;
	currentClientId?: string;
	lastActiveTime?: string;
};

type DashboardSummary = {
	balance: number;
	usedPorts: number;
	availablePorts: number;
	availableCharacters: number;
	portRankings: PortRanking[];
};

const { service } = useCool();
const { t } = useI18n();

const loading = ref(false);
const summary = reactive<DashboardSummary>({
	balance: 0,
	usedPorts: 0,
	availablePorts: 0,
	availableCharacters: 0,
	portRankings: []
});

const cards = computed(() => [
	{
		prop: 'balance',
		label: t('当前登录租户余额'),
		value: formatAmount(summary.balance),
		suffix: '',
		desc: t('后台账户余额'),
		icon: Coin
	},
	{
		prop: 'usedPorts',
		label: t('使用端口数'),
		value: formatNumber(summary.usedPorts),
		suffix: t('个'),
		desc: t('租户下用户占用端口合计'),
		icon: Connection
	},
	{
		prop: 'availablePorts',
		label: t('可用端口数'),
		value: formatNumber(summary.availablePorts),
		suffix: t('个'),
		desc: t('生效端口额度合计'),
		icon: DataLine
	},
	{
		prop: 'availableCharacters',
		label: t('可用字符数'),
		value: formatNumber(summary.availableCharacters),
		suffix: t('字'),
		desc: t('生效字符剩余数量合计'),
		icon: Document
	}
]);

function formatAmount(value: number) {
	return Number(value || 0).toFixed(2);
}

function formatNumber(value: number) {
	return Number(value || 0).toLocaleString();
}

async function refresh() {
	loading.value = true;

	try {
		const data = await service.request({
			url: 'admin/customer/dashboard/summary',
			method: 'GET'
		});

		summary.balance = Number(data?.balance || 0);
		summary.usedPorts = Number(data?.usedPorts || 0);
		summary.availablePorts = Number(data?.availablePorts || 0);
		summary.availableCharacters = Number(data?.availableCharacters || 0);
		summary.portRankings = Array.isArray(data?.portRankings) ? data.portRankings : [];
	} catch (err: any) {
		ElMessage.error(err?.message || t('获取租户资源看板失败'));
		summary.portRankings = [];
	} finally {
		loading.value = false;
	}
}

onMounted(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.customer-dashboard {
	overflow-x: hidden;

	.card {
		border-radius: 10px;
		margin-bottom: 10px;
		border: 1px solid var(--el-border-color-extra-light);
		background-color: var(--el-bg-color);
		color: var(--el-text-color-primary);
		user-select: none;

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 20px;
			min-height: 50px;

			.label {
				font-size: 15px;
			}

			.icon {
				font-size: 30px;
				background-color: var(--el-fill-color-light);
				padding: 5px;
				border-radius: 6px;
			}
		}

		&__container {
			padding: 0 20px;
			min-height: 50px;

			.num {
				font-size: 32px;
				line-height: 1.2;
			}

			.suffix {
				margin-left: 6px;
				color: var(--el-text-color-secondary);
			}
		}

		&__footer {
			display: flex;
			align-items: center;
			height: 50px;
			margin: 0 5px;
			padding: 0 15px;
			box-sizing: border-box;
			font-size: 12px;
			color: var(--el-text-color-secondary);
		}
	}

	.ranking-card {
		padding-bottom: 20px;

		&__container {
			height: 420px;
			padding: 0 20px;
		}
	}
}
</style>
