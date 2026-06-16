import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useCool } from '/@/cool';

export function useClientDownload() {
	const { service } = useCool();
	const { t, locale } = useI18n();

	const clientDownload = reactive({
		loading: false,
		version: '',
		downloadUrl: '',
		fileName: ''
	});

	async function loadClientDownload() {
		clientDownload.loading = true;

		try {
			const data = await service.request({
				url: 'app/customer/client-update/latest',
				method: 'GET',
				params: {
					lang: locale.value
				},
				NProgress: false
			});

			clientDownload.version = data?.version || '';
			clientDownload.downloadUrl = normalizeClientDownloadUrl(data?.downloadUrl || '');
			clientDownload.fileName = data?.fileName || '';
		} catch {
			clientDownload.version = '';
			clientDownload.downloadUrl = '';
			clientDownload.fileName = '';
		} finally {
			clientDownload.loading = false;
		}
	}

	function downloadClient() {
		if (!clientDownload.downloadUrl) {
			ElMessage.warning(t('暂无可下载客户端'));
			return;
		}

		const link = document.createElement('a');
		link.href = clientDownload.downloadUrl;
		link.download = clientDownload.fileName || '';
		link.rel = 'noopener noreferrer';
		link.style.display = 'none';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	return {
		clientDownload,
		loadClientDownload,
		downloadClient
	};
}

function normalizeClientDownloadUrl(url: string) {
	const value = String(url || '').trim();

	if (window.location.protocol === 'https:' && /^http:\/\//i.test(value)) {
		return value.replace(/^http:\/\//i, 'https://');
	}

	return value;
}
