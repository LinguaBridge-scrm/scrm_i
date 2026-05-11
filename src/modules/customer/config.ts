import { type ModuleConfig } from '/@/cool';
import { t } from '/@/plugins/i18n';

export default (): ModuleConfig => {
	return {
		views: [
			{
				path: '/customer/whatsapp',
				meta: {
					label: t('消息记录')
				},
				component: () => import('./views/whatsapp.vue')
			},
			{
				path: '/customer/file-resource',
				meta: {
					label: t('文件资源')
				},
				component: () => import('./views/file-resource.vue')
			}
		]
	};
};
