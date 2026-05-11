import { type ModuleConfig } from '/@/cool';
import { t } from '/@/plugins/i18n';

export default (): ModuleConfig => {
	return {
		views: [
			{
				path: '/customer/whatsapp',
				meta: {
					label: t('WhatsApp')
				},
				component: () => import('./views/whatsapp.vue')
			}
		]
	};
};
