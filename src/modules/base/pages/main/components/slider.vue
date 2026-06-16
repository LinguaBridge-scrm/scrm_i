<template>
	<div
		class="app-slider"
		:class="{
			'is-collapse': app.isFold
		}"
	>
		<div class="app-slider__logo">
			<img src="/logo.png" />
			<span v-if="!app.isFold || browser.isMini">{{ app.info.name }}</span>
		</div>

		<div class="app-slider__search">
			<el-input
				v-model="keyWord"
				:placeholder="$t('搜索关键字')"
				clearable
				@focus="app.fold(false)"
			>
				<template #prefix>
					<cl-svg name="search" :size="16" />
				</template>
			</el-input>
		</div>

		<div class="app-slider__container">
			<el-scrollbar>
				<b-menu :keyWord="keyWord" />
			</el-scrollbar>
		</div>

		<div class="app-slider__download">
			<el-tooltip
				:content="$t('下载最新客户端')"
				placement="right"
				:disabled="!app.isFold || browser.isMini"
			>
				<button
					class="client-download-entry"
					type="button"
					:disabled="!clientDownload.downloadUrl || clientDownload.loading"
					:aria-label="$t('下载最新客户端')"
					@click="downloadClient"
				>
					<span class="client-download-entry__icon">
						<el-icon><download /></el-icon>
					</span>

					<span class="client-download-entry__body">
						<span class="client-download-entry__title">
							<span>{{ $t('客户端下载') }}</span>
							<em class="client-download-entry__tag">
								{{
									clientDownload.loading
										? $t('获取中')
										: clientDownload.version || $t('暂无版本')
								}}
							</em>
						</span>
						<span class="client-download-entry__desc">
							{{
								clientDownload.downloadUrl
									? $t('点击下载最新客户端')
									: $t('暂无下载地址')
							}}
						</span>
					</span>
				</button>
			</el-tooltip>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'app-slider'
});

import { Download } from '@element-plus/icons-vue';
import { useBase, useClientDownload } from '/$/base';
import { useBrowser } from '/@/cool';
import BMenu from './bmenu';
import { onMounted, ref } from 'vue';

const { browser } = useBrowser();
const { app } = useBase();
const { clientDownload, loadClientDownload, downloadClient } = useClientDownload();

const keyWord = ref('');

onMounted(() => {
	loadClientDownload();
});
</script>

<style lang="scss">
.app-slider {
	$slider-menu-height: 50px;
	--slider-bg-color: #2c3147;
	--slider-text-color: #e5eaf3;

	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: var(--slider-bg-color);
	border-right: 1px solid var(--el-border-color-extra-light);

	&__logo {
		display: flex;
		align-items: center;
		height: 66px;
		padding: 0 21px;
		user-select: none;

		img {
			height: 24px;
			width: 24px;
		}

		span {
			color: #fff;
			font-weight: bold;
			font-size: 20px;
			margin-left: 10px;
			white-space: nowrap;
			letter-spacing: 1px;
		}
	}

	&__search {
		margin: 0 10px 10px 10px;
		overflow: hidden;
		border-radius: 6px;

		.el-input__wrapper {
			background-color: rgba(200, 200, 200, 0.1);
			box-shadow: none;
			height: 36px;
			padding: 0 14px;

			.el-input__inner {
				color: var(--slider-text-color);
			}
		}
	}

	&__container {
		flex: 1;
		min-height: 0;
	}

	&__download {
		flex-shrink: 0;
		padding: 12px;
	}

	&__menu {
		user-select: none;

		.b-menu__badge {
			display: flex;
			align-items: center;
			justify-content: center;
			height: $slider-menu-height;
			font-size: 10px;
			height: 14px;
			min-width: 14px;
			padding: 0 3px;
			border-radius: 4px;
			background-color: rgba(255, 255, 255, 0.2);
			font-weight: bold;
			color: #fff;
			transition: background-color 0.3s;
		}

		.el-menu {
			width: 100%;
			border-right: 0;
			background-color: transparent;

			&--popup {
				border-radius: 6px;
				padding: 5px;

				&-container {
					padding: 0;
				}

				.el-menu-item,
				.el-sub-menu__title {
					height: $slider-menu-height;
					border-radius: 6px;

					&:hover {
						background-color: var(--el-fill-color-light);
					}
				}
			}

			&:not(&--popup) {
				--el-menu-base-level-padding: 23px;

				.el-menu-item,
				.el-sub-menu__title {
					height: $slider-menu-height;
					color: var(--slider-text-color);

					.cl-svg {
						flex-shrink: 0;
					}

					&.is-active,
					&:hover {
						background-color: rgba(0, 0, 0, 0.25);
						color: #fff;
					}

					&.is-active {
						background-color: var(--el-color-primary);
					}
				}
			}
		}
	}

	&.is-collapse {
		.app-slider__search {
			.el-input__inner {
				opacity: 0;
			}
		}

		.app-slider__download {
			padding: 10px;
		}

		.app-slider__menu {
			.el-sub-menu {
				&.is-active {
					background-color: rgba(0, 0, 0, 0.25);
				}
			}
		}

		.client-download-entry {
			justify-content: center;
			min-height: 44px;
			padding: 0;

			&__icon {
				width: 40px;
				height: 40px;
			}

			&__body {
				display: none;
			}
		}
	}
}

.client-download-entry {
	display: flex;
	align-items: center;
	width: 100%;
	min-height: 68px;
	padding: 12px;
	border: 0;
	border-radius: 8px;
	background: linear-gradient(135deg, #4f6ff2 0%, #18a999 100%);
	color: #fff;
	cursor: pointer;
	text-align: left;
	box-shadow: inset 0 1px 0 rgb(255 255 255 / 24%);
	transition:
		filter 0.18s ease,
		transform 0.18s ease;

	&:hover:not(:disabled) {
		filter: brightness(1.05);
		transform: translateY(-1px);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:focus-visible {
		outline: 2px solid rgb(255 255 255 / 92%);
		outline-offset: 2px;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.72;
		filter: grayscale(0.1);
	}

	&__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		margin-right: 10px;
		border-radius: 8px;
		background-color: rgb(255 255 255 / 18%);
		font-size: 20px;
	}

	&__body {
		flex: 1;
		min-width: 0;
	}

	&__title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		font-size: 14px;
		font-weight: 700;
		line-height: 1.25;
	}

	&__tag {
		flex-shrink: 0;
		max-width: 82px;
		height: 20px;
		padding: 0 6px;
		overflow: hidden;
		border-radius: 5px;
		background-color: rgb(255 255 255 / 18%);
		color: rgb(255 255 255 / 94%);
		font-size: 11px;
		font-style: normal;
		font-weight: 700;
		line-height: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__desc {
		display: block;
		margin-top: 6px;
		overflow: hidden;
		color: rgb(255 255 255 / 86%);
		font-size: 12px;
		line-height: 1.45;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

@media (prefers-reduced-motion: reduce) {
	.client-download-entry {
		transition: none;

		&:hover:not(:disabled) {
			transform: none;
		}
	}
}
</style>
