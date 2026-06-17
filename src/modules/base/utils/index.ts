export function revisePath(path: string) {
	if (!path) {
		return '';
	}

	return path.startsWith('/') ? path : `/${path}`;
}

export * from './client-download';
export * from './i18n-label';
export * from './permission';
