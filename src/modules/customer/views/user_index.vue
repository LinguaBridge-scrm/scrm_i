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
							<el-button
								v-if="item.prop === 'balance'"
								type="primary"
								link
								@click="openRecharge"
							>
								{{ t('余额充值') }}
							</el-button>
						</div>
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="10">
				<el-col :lg="24" :xs="24">
					<div class="card purchase-card" v-loading="packageLoading">
						<div class="card__header">
							<div class="purchase-card__title">
								<span class="label">{{ t('资源套餐购买') }}</span>
								<el-tag size="small" effect="plain">{{ billingModeLabel }}</el-tag>
							</div>
							<el-button
								type="primary"
								link
								:loading="packageLoading"
								@click="loadPackages"
							>
								{{ t('刷新套餐') }}
							</el-button>
						</div>

						<div class="purchase-card__body">
							<el-tabs v-model="activePurchaseType">
								<el-tab-pane :label="t('端口套餐')" :name="0">
									<div class="package-grid">
										<button
											v-for="item in packageGroups.port"
											:key="item.id"
											class="package-item"
											type="button"
											:disabled="summary.billingMode !== 0 || purchaseLoading"
											@click="buyPackage(item)"
										>
											<span class="package-item__name">{{ item.name }}</span>
											<strong
												>{{ formatNumber(item.count) }}
												{{ t('个端口') }}</strong
											>
											<em>{{ durationText(item) }}</em>
											<span class="package-item__price"
												>${{ formatAmount(item.price) }}</span
											>
										</button>
										<el-empty
											v-if="!packageGroups.port.length"
											:description="t('暂无端口套餐')"
											:image-size="80"
										/>
									</div>
								</el-tab-pane>

								<el-tab-pane :label="t('字符套餐')" :name="1">
									<div class="package-grid">
										<button
											v-for="item in packageGroups.character"
											:key="item.id"
											class="package-item"
											type="button"
											:disabled="summary.billingMode !== 1 || purchaseLoading"
											@click="buyPackage(item)"
										>
											<span class="package-item__name">{{ item.name }}</span>
											<strong
												>{{ formatNumber(item.count) }}
												{{ t('字符') }}</strong
											>
											<em>{{ durationText(item) }}</em>
											<span class="package-item__price"
												>${{ formatAmount(item.price) }}</span
											>
										</button>
										<el-empty
											v-if="!packageGroups.character.length"
											:description="t('暂无字符套餐')"
											:image-size="80"
										/>
									</div>
								</el-tab-pane>
							</el-tabs>
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

		<el-dialog
			v-model="recharge.visible"
			class="recharge-dialog"
			:title="t('💰 余额充值')"
			width="min(940px, 96vw)"
		>
			<div class="recharge-shell">
				<div class="recharge-hero">
					<div>
						<div class="recharge-hero__label">{{ t('当前余额') }}</div>
						<div class="recharge-hero__balance">
							{{ formatAmount(summary.balance) }}
						</div>
					</div>
					<div class="recharge-hero__meta">
						<el-tag type="success" effect="plain">{{ currentChainLabel }}</el-tag>
						<span>{{ t('USDT 自动匹配入账') }}</span>
					</div>
				</div>

				<el-steps class="recharge-steps" :active="orderStep" simple>
					<el-step :title="t('创建订单')" />
					<el-step :title="t('钱包转账')" />
					<el-step :title="t('确认入账')" />
				</el-steps>

				<div class="recharge-grid">
					<div class="recharge-panel recharge-create">
						<div class="recharge-panel__head">
							<div>
								<div class="recharge-panel__title">{{ t('选择充值方式') }}</div>
								<div class="recharge-panel__desc">
									{{ t('订单金额会增加随机尾数用于自动匹配') }}
								</div>
							</div>
						</div>

						<div class="recharge-network">
							<button
								v-for="item in chainOptions"
								:key="item.value"
								class="recharge-network__item"
								:class="{ 'is-active': recharge.form.chain === item.value }"
								type="button"
								@click="recharge.form.chain = item.value"
							>
								<span class="recharge-network__icon">{{ item.icon }}</span>
								<span>
									<strong>{{ item.name }}</strong>
									<em>{{ item.desc }}</em>
								</span>
							</button>
						</div>

						<div class="recharge-amount">
							<div class="recharge-panel__desc">{{ t('充值金额') }}</div>
							<el-input-number
								v-model="recharge.form.amount"
								:min="1"
								:precision="2"
								:step="10"
								:step-strictly="false"
								controls-position="right"
							/>
							<div class="recharge-amount__quick">
								<el-button
									v-for="amount in quickAmounts"
									:key="amount"
									plain
									@click="recharge.form.amount = amount"
								>
									{{ amount }} USDT
								</el-button>
							</div>
						</div>

						<el-button
							type="primary"
							size="large"
							:loading="recharge.creating"
							@click="createRecharge"
						>
							{{ t('生成充值订单') }}
						</el-button>
					</div>

					<div class="recharge-panel recharge-order">
						<template v-if="recharge.currentOrder">
							<div class="recharge-order__head">
								<div>
									<div class="recharge-panel__title">{{ t('充值订单') }}</div>
									<div class="recharge-order__no">
										{{ recharge.currentOrder.orderNo || '-' }}
									</div>
								</div>
								<div class="recharge-order__state">
									<el-tag
										:type="orderStatusType(recharge.currentOrder.status)"
										effect="light"
									>
										{{ orderStatusLabel(recharge.currentOrder.status) }}
									</el-tag>
									<span v-if="recharge.polling">
										<el-icon class="is-loading"><loading /></el-icon>
										{{ t('状态同步中') }}
									</span>
								</div>
							</div>

							<div class="recharge-pay">
								<div class="recharge-qr">
									<div class="recharge-qr__image">
										<el-skeleton v-if="recharge.qrLoading" animated :rows="5" />
										<img
											v-else-if="recharge.qrCodeUrl"
											:src="recharge.qrCodeUrl"
										/>
									</div>
									<div class="recharge-qr__title">{{ t('📷 扫码转账') }}</div>
								</div>

								<div class="recharge-detail">
									<div class="recharge-detail__amount">
										<span>{{ t('实际支付金额') }}</span>
										<strong
											>{{
												formatAmount(recharge.currentOrder.payAmount)
											}}
											USDT</strong
										>
										<el-button
											type="primary"
											plain
											:icon="CopyDocument"
											@click="
												copy(formatAmount(recharge.currentOrder.payAmount))
											"
										>
											{{ t('复制金额') }}
										</el-button>
									</div>

									<div class="recharge-info-grid">
										<div class="recharge-info">
											<span>{{ t('充值网络') }}</span>
											<strong>{{
												chainLabel(recharge.currentOrder.chain)
											}}</strong>
										</div>
										<div class="recharge-info">
											<span>{{ t('创建时间') }}</span>
											<strong>{{
												displayTime(recharge.currentOrder.createTime)
											}}</strong>
										</div>
										<div class="recharge-info">
											<span>{{ t('过期时间') }}</span>
											<strong>{{
												displayTime(recharge.currentOrder.expireTime)
											}}</strong>
										</div>
										<div class="recharge-info">
											<span>{{ t('到账金额') }}</span>
											<strong
												>{{
													formatAmount(recharge.currentOrder.baseAmount)
												}}
												USDT</strong
											>
										</div>
									</div>

									<div class="recharge-address">
										<span>{{ t('收款地址') }}</span>
										<div>
											<strong>{{
												recharge.currentOrder.address || '-'
											}}</strong>
											<el-button
												type="primary"
												link
												:icon="CopyDocument"
												@click="copy(recharge.currentOrder.address)"
											>
												{{ t('复制地址') }}
											</el-button>
										</div>
									</div>
								</div>
							</div>
						</template>

						<el-empty
							v-else
							:description="t('创建充值订单后显示转账二维码')"
							:image-size="92"
						/>
					</div>
				</div>
			</div>
		</el-dialog>
	</el-scrollbar>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-user-index'
});

import {
	Coin,
	Connection,
	CopyDocument,
	DataLine,
	Document,
	Loading
} from '@element-plus/icons-vue';
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { toDataURL } from 'qrcode';

type PortRanking = {
	userId: number;
	username: string;
	activePorts: number;
	currentClientId?: string;
	lastActiveTime?: string;
};

type DashboardSummary = {
	balance: number;
	billingMode: number;
	billingModeName: string;
	portUnlimited: boolean;
	usedPorts: number;
	availablePorts: number | null;
	availableCharacters: number;
	portRankings: PortRanking[];
};

type ResourcePackage = {
	id: number;
	name: string;
	resourceType: number;
	count: number;
	price: number | string;
	durationDays?: number;
	remark?: string;
};

const { service } = useCool();
const { t } = useI18n();

const loading = ref(false);
const packageLoading = ref(false);
const purchaseLoading = ref(false);
const activePurchaseType = ref<0 | 1>(0);
const summary = reactive<DashboardSummary>({
	balance: 0,
	billingMode: 0,
	billingModeName: '端口计费',
	portUnlimited: false,
	usedPorts: 0,
	availablePorts: 0,
	availableCharacters: 0,
	portRankings: []
});
const packageGroups = reactive({
	port: [] as ResourcePackage[],
	character: [] as ResourcePackage[]
});
const recharge = reactive({
	visible: false,
	loading: false,
	creating: false,
	polling: false,
	qrLoading: false,
	qrCodeUrl: '',
	form: {
		chain: 'tron',
		amount: 100
	},
	currentOrder: null as any
});
let rechargePollingTimer: ReturnType<typeof setInterval> | null = null;
let refreshedOrderId = 0;
const quickAmounts = [100, 500, 1000, 5000];
const chainOptions = [
	{
		value: 'tron',
		icon: '⚡',
		name: t('波场 USDT'),
		desc: t('TRC20 网络')
	},
	{
		value: 'eth',
		icon: '💠',
		name: t('以太坊 USDT'),
		desc: t('ERC20 网络')
	}
];
const currentChainLabel = computed(() => chainLabel(recharge.form.chain));
const billingModeLabel = computed(() => t(summary.billingModeName || ''));
const orderStep = computed(() => {
	const status = Number(recharge.currentOrder?.status);
	if (!recharge.currentOrder) {
		return 0;
	}
	if (status === 1) {
		return 2;
	}
	if (status === 2) {
		return 3;
	}
	return 1;
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
		value: summary.portUnlimited ? t('无限制') : formatNumber(summary.availablePorts || 0),
		suffix: summary.portUnlimited ? '' : t('个'),
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

function formatAmount(value: number | string) {
	return Number(value || 0).toFixed(2);
}

function formatNumber(value: number) {
	return Number(value || 0).toLocaleString();
}

function durationText(item: ResourcePackage) {
	const days = Number(item.durationDays || 0);
	if (Number(item.resourceType) === 0) {
		return days > 0 ? `${days}${t('天有效')}` : t('长期有效');
	}
	return days > 0 ? `${days}${t('天有效')}` : t('购买后立即到账');
}

function chainLabel(chain: string) {
	return chain === 'eth' ? `💠 ${t('以太坊 USDT')}` : `⚡ ${t('波场 USDT')}`;
}

function orderStatusLabel(status: number) {
	const map: Record<number, string> = {
		0: t('待支付'),
		1: t('已匹配'),
		2: t('已确认'),
		3: t('已过期'),
		4: t('金额异常'),
		5: t('链上异常')
	};
	return map[Number(status)] || '-';
}

function orderStatusType(status: number) {
	const map: Record<number, 'info' | 'success' | 'warning' | 'danger'> = {
		0: 'warning',
		1: 'info',
		2: 'success',
		3: 'info',
		4: 'danger',
		5: 'danger'
	};
	return map[Number(status)] || 'info';
}

function displayTime(value?: string) {
	return value || '-';
}

async function copy(value: string) {
	try {
		await navigator.clipboard.writeText(value);
		ElMessage.success(t('复制成功'));
	} catch {
		ElMessage.error(t('复制失败'));
	}
}

async function openRecharge() {
	recharge.visible = true;
	if (recharge.currentOrder) {
		await renderRechargeQr(recharge.currentOrder);
		startRechargePolling(recharge.currentOrder);
	}
}

async function createRecharge() {
	recharge.creating = true;
	try {
		const data = await service.request({
			url: 'admin/customer/crypto-recharge/create',
			method: 'POST',
			data: {
				chain: recharge.form.chain,
				amount: recharge.form.amount
			}
		});
		recharge.currentOrder = data;
		await renderRechargeQr(data);
		startRechargePolling(data);
		ElMessage.success(t('充值订单已创建'));
	} catch (err: any) {
		ElMessage.error(err?.message || t('创建充值订单失败'));
	} finally {
		recharge.creating = false;
	}
}

function startRechargePolling(order: any) {
	stopRechargePolling();
	if (!order?.id || isTerminalOrder(order.status)) {
		return;
	}

	recharge.polling = true;
	pollRechargeOrder(order.id);
	rechargePollingTimer = setInterval(() => {
		pollRechargeOrder(order.id);
	}, 5000);
}

function stopRechargePolling() {
	if (rechargePollingTimer) {
		clearInterval(rechargePollingTimer);
		rechargePollingTimer = null;
	}
	recharge.polling = false;
}

async function pollRechargeOrder(id: number) {
	try {
		const data = await service.request({
			url: 'admin/customer/crypto-recharge/myInfo',
			method: 'GET',
			params: { id }
		});
		recharge.currentOrder = {
			...recharge.currentOrder,
			...data
		};

		if (Number(data?.status) === 2 && refreshedOrderId !== Number(data.id)) {
			refreshedOrderId = Number(data.id);
			refresh();
		}
		if (isTerminalOrder(data?.status)) {
			stopRechargePolling();
		}
	} catch {
		stopRechargePolling();
	}
}

function isTerminalOrder(status: number) {
	return [2, 3, 4, 5].includes(Number(status));
}

async function renderRechargeQr(order: any) {
	const address = String(order?.address || '').trim();
	recharge.qrCodeUrl = '';
	if (!address) {
		return;
	}

	recharge.qrLoading = true;
	try {
		recharge.qrCodeUrl = await toDataURL(address, {
			errorCorrectionLevel: 'M',
			margin: 2,
			width: 220,
			color: {
				dark: '#111827',
				light: '#ffffff'
			}
		});
	} catch {
		ElMessage.error(t('生成充值二维码失败'));
	} finally {
		recharge.qrLoading = false;
	}
}

async function loadPackages() {
	packageLoading.value = true;
	try {
		const data = await service.request({
			url: 'admin/customer/purchase/packages',
			method: 'GET'
		});
		const list = Array.isArray(data) ? data : [];
		packageGroups.port = list.filter(item => Number(item.resourceType) === 0);
		packageGroups.character = list.filter(item => Number(item.resourceType) === 1);
	} catch (err: any) {
		ElMessage.error(err?.message || t('获取套餐失败'));
		packageGroups.port = [];
		packageGroups.character = [];
	} finally {
		packageLoading.value = false;
	}
}

async function buyPackage(item: ResourcePackage) {
	if (summary.billingMode !== Number(item.resourceType)) {
		ElMessage.warning(t('当前租户计费模式不支持该套餐'));
		return;
	}

	try {
		await ElMessageBox.confirm(`${t('确认使用余额购买')}“${item.name}”？`, t('购买确认'), {
			type: 'warning',
			confirmButtonText: t('确认购买'),
			cancelButtonText: t('取消')
		});
	} catch {
		return;
	}

	purchaseLoading.value = true;
	try {
		await service.request({
			url: 'admin/customer/purchase/create',
			method: 'POST',
			data: {
				packageId: item.id
			}
		});
		ElMessage.success(t('购买成功'));
		refresh();
	} catch (err: any) {
		ElMessage.error(err?.message || t('购买失败'));
	} finally {
		purchaseLoading.value = false;
	}
}

async function refresh() {
	loading.value = true;

	try {
		const data = await service.request({
			url: 'admin/customer/dashboard/summary',
			method: 'GET'
		});

		summary.balance = Number(data?.balance || 0);
		summary.billingMode = Number(data?.billingMode || 0);
		summary.billingModeName =
			data?.billingModeName || (summary.billingMode === 1 ? '字符计费' : '端口计费');
		summary.portUnlimited = !!data?.portUnlimited || summary.billingMode === 1;
		activePurchaseType.value = summary.billingMode === 1 ? 1 : 0;
		summary.usedPorts = Number(data?.usedPorts || 0);
		summary.availablePorts =
			data?.availablePorts === null ? null : Number(data?.availablePorts || 0);
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
	loadPackages();
});

watch(
	() => recharge.visible,
	visible => {
		if (!visible) {
			stopRechargePolling();
		}
	}
);

onBeforeUnmount(() => {
	stopRechargePolling();
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
			justify-content: space-between;
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

	.purchase-card {
		&__title {
			display: flex;
			align-items: center;
			gap: 10px;
		}

		&__body {
			padding: 0 20px 18px;
		}
	}
}

.package-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
	gap: 12px;
	min-height: 132px;
}

.package-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6px;
	min-height: 124px;
	padding: 14px;
	text-align: left;
	cursor: pointer;
	border: 1px solid var(--el-border-color-light);
	border-radius: 8px;
	background: var(--el-fill-color-blank);
	color: var(--el-text-color-primary);
	transition:
		border-color 0.2s,
		background-color 0.2s;

	&:not(:disabled):hover {
		border-color: var(--el-color-primary);
		background: var(--el-color-primary-light-9);
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.55;
	}

	&__name {
		max-width: 100%;
		font-size: 13px;
		color: var(--el-text-color-secondary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	strong {
		font-size: 20px;
		line-height: 1.2;
		word-break: break-word;
	}

	em {
		font-size: 12px;
		font-style: normal;
		color: var(--el-text-color-secondary);
	}

	&__price {
		margin-top: auto;
		font-size: 18px;
		font-weight: 700;
		color: var(--el-color-primary);
	}
}

:deep(.recharge-dialog .el-dialog__body) {
	padding-top: 8px;
}

.recharge-shell {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.recharge-hero {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 14px 16px;
	border: 1px solid var(--el-border-color-light);
	border-radius: 8px;
	background: var(--el-fill-color-extra-light);

	&__label {
		font-size: 12px;
		color: var(--el-text-color-secondary);
	}

	&__balance {
		margin-top: 4px;
		font-size: 26px;
		font-weight: 700;
		line-height: 1.2;
		color: var(--el-text-color-primary);
	}

	&__meta {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--el-text-color-secondary);
	}
}

.recharge-steps {
	border-radius: 8px;
}

.recharge-grid {
	display: grid;
	grid-template-columns: 280px minmax(0, 1fr);
	gap: 14px;
}

.recharge-panel {
	min-width: 0;
	padding: 14px;
	border: 1px solid var(--el-border-color-light);
	border-radius: 8px;
	background: var(--el-bg-color);

	&__head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	&__title {
		font-size: 15px;
		font-weight: 700;
		color: var(--el-text-color-primary);
	}

	&__desc {
		margin-top: 4px;
		font-size: 12px;
		line-height: 1.5;
		color: var(--el-text-color-secondary);
	}
}

.recharge-create {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.recharge-network {
	display: flex;
	flex-direction: column;
	gap: 10px;

	&__item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 12px;
		text-align: left;
		cursor: pointer;
		border: 1px solid var(--el-border-color-light);
		border-radius: 8px;
		background: var(--el-fill-color-blank);
		color: var(--el-text-color-primary);
		transition:
			border-color 0.2s,
			background-color 0.2s;

		&.is-active {
			border-color: var(--el-color-primary);
			background: var(--el-color-primary-light-9);
		}

		strong,
		em {
			display: block;
			font-style: normal;
		}

		em {
			margin-top: 2px;
			font-size: 12px;
			color: var(--el-text-color-secondary);
		}
	}

	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: var(--el-fill-color-light);
		font-size: 18px;
		flex: 0 0 auto;
	}
}

.recharge-amount {
	:deep(.el-input-number) {
		width: 100%;
	}

	&__quick {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
		margin-top: 10px;
	}
}

.recharge-order {
	min-height: 420px;

	&__head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
	}

	&__state {
		display: flex;
		align-items: center;
		gap: 8px;
		white-space: nowrap;

		span {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			font-size: 12px;
			color: var(--el-text-color-secondary);
		}
	}

	&__no {
		max-width: 420px;
		margin-top: 4px;
		font-size: 12px;
		color: var(--el-text-color-secondary);
		word-break: break-all;
	}
}

.recharge-pay {
	display: grid;
	grid-template-columns: 210px minmax(0, 1fr);
	gap: 14px;
	padding: 14px;
	border-radius: 8px;
	background: var(--el-fill-color-extra-light);
}

.recharge-qr {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 12px;
	border-radius: 8px;
	background: #fff;

	&__title {
		font-weight: 600;
		color: var(--el-text-color-primary);
	}

	&__image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 190px;
		height: 190px;
		border: 1px solid var(--el-border-color-extra-light);
		border-radius: 8px;
		background: #fff;

		img {
			width: 190px;
			height: 190px;
		}
	}
}

.recharge-detail {
	min-width: 0;

	&__amount {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 8px 12px;
		align-items: center;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--el-border-color-extra-light);

		span {
			grid-column: 1 / -1;
			font-size: 12px;
			color: var(--el-text-color-secondary);
		}

		strong {
			font-size: 28px;
			line-height: 1.2;
			color: var(--el-color-danger);
			word-break: break-all;
		}
	}
}

.recharge-info-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 10px;
	margin-top: 12px;
}

.recharge-info {
	padding: 10px;
	border-radius: 8px;
	background: var(--el-bg-color);

	span,
	strong {
		display: block;
	}

	span {
		font-size: 12px;
		color: var(--el-text-color-secondary);
	}

	strong {
		margin-top: 4px;
		font-weight: 600;
		word-break: break-all;
	}
}

.recharge-address {
	margin-top: 12px;
	padding: 10px;
	border-radius: 8px;
	background: var(--el-bg-color);

	> span {
		display: block;
		margin-bottom: 6px;
		font-size: 12px;
		color: var(--el-text-color-secondary);
	}

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	strong {
		min-width: 0;
		font-weight: 500;
		word-break: break-all;
	}
}

@media (max-width: 820px) {
	.recharge-hero {
		align-items: flex-start;
		flex-direction: column;
	}

	.recharge-grid,
	.recharge-pay {
		grid-template-columns: 1fr;
	}

	.recharge-info-grid {
		grid-template-columns: 1fr;
	}
}
</style>
