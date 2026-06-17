type TranslateFn = (key: string) => string;
type TranslateExistsFn = (key: string) => boolean;

interface LabelSource {
	meta?: {
		label?: any;
		[key: string]: any;
	};
	name?: any;
	path?: any;
}

export function getI18nLabel(item: LabelSource, t: TranslateFn, te: TranslateExistsFn) {
	const label = String(item.meta?.label || item.name || item.path || '');

	return label && te(label) ? t(label) : label;
}
