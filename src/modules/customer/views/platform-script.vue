<template>
	<div class="platform-script">
		<el-tabs v-model="activeTab">
			<el-tab-pane :label="$t('平台管理')" name="platform">
				<platform-script-platform v-if="activeTab === 'platform'" />
			</el-tab-pane>

			<el-tab-pane :label="$t('脚本管理')" name="script">
				<platform-script-script v-if="activeTab === 'script'" />
			</el-tab-pane>

			<el-tab-pane :label="$t('发布管理')" name="release">
				<platform-script-release v-if="activeTab === 'release'" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'customer-platform-script'
});

import { ref } from 'vue';
import PlatformScriptPlatform from '../components/platform-script-platform.vue';
import PlatformScriptScript from '../components/platform-script-script.vue';
import PlatformScriptRelease from '../components/platform-script-release.vue';

const activeTab = ref('platform');
</script>

<style lang="scss" scoped>
.platform-script {
	padding: 0 10px;
}
</style>
