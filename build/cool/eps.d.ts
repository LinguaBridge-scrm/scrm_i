declare namespace Eps {
	interface BaseSysDepartmentEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerBillEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCharacterEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerClientUpdateEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCryptoRechargeOrderEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCryptoRechargeTxEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCryptoWalletEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerFileResourceEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerKeywordEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMaterialEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMessageDetectionEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMessageEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMonitorEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPlatformScriptPlatformEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPlatformScriptReleaseEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPlatformScriptEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPortOccupancyEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPortEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPricePackageEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPurchaseOrderEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerRuntimeSessionEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerTranslateServiceEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerTranslationMemoryEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerTranslationEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerUserEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhatsappAccountEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhatsappConversationEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhatsappMessageEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhitelistEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PluginInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface RecycleDataEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserAddressEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	type json = any;

	interface PagePagination {
		size: number;
		page: number;
		total: number;
		[key: string]: any;
	}

	interface PageResponse<T> {
		pagination: PagePagination;
		list: T[];
		[key: string]: any;
	}

	interface BaseSysLogPageResponse {
		pagination: PagePagination;
		list: BaseSysLogEntity[];
	}

	interface BaseSysMenuPageResponse {
		pagination: PagePagination;
		list: BaseSysMenuEntity[];
	}

	interface BaseSysParamPageResponse {
		pagination: PagePagination;
		list: BaseSysParamEntity[];
	}

	interface BaseSysRolePageResponse {
		pagination: PagePagination;
		list: BaseSysRoleEntity[];
	}

	interface BaseSysUserPageResponse {
		pagination: PagePagination;
		list: BaseSysUserEntity[];
	}

	interface CustomerBillPageResponse {
		pagination: PagePagination;
		list: CustomerBillEntity[];
	}

	interface CustomerCharacterPageResponse {
		pagination: PagePagination;
		list: CustomerCharacterEntity[];
	}

	interface CustomerClientUpdatePageResponse {
		pagination: PagePagination;
		list: CustomerClientUpdateEntity[];
	}

	interface CustomerCryptoRechargeOrderPageResponse {
		pagination: PagePagination;
		list: CustomerCryptoRechargeOrderEntity[];
	}

	interface CustomerCryptoRechargeTxPageResponse {
		pagination: PagePagination;
		list: CustomerCryptoRechargeTxEntity[];
	}

	interface CustomerCryptoWalletPageResponse {
		pagination: PagePagination;
		list: CustomerCryptoWalletEntity[];
	}

	interface CustomerFileResourcePageResponse {
		pagination: PagePagination;
		list: CustomerFileResourceEntity[];
	}

	interface CustomerKeywordPageResponse {
		pagination: PagePagination;
		list: CustomerKeywordEntity[];
	}

	interface CustomerMaterialPageResponse {
		pagination: PagePagination;
		list: CustomerMaterialEntity[];
	}

	interface CustomerMessageDetectionPageResponse {
		pagination: PagePagination;
		list: CustomerMessageDetectionEntity[];
	}

	interface CustomerMessagePageResponse {
		pagination: PagePagination;
		list: CustomerMessageEntity[];
	}

	interface CustomerMonitorPageResponse {
		pagination: PagePagination;
		list: CustomerMonitorEntity[];
	}

	interface CustomerPlatformScriptPlatformPageResponse {
		pagination: PagePagination;
		list: CustomerPlatformScriptPlatformEntity[];
	}

	interface CustomerPlatformScriptReleasePageResponse {
		pagination: PagePagination;
		list: CustomerPlatformScriptReleaseEntity[];
	}

	interface CustomerPlatformScriptPageResponse {
		pagination: PagePagination;
		list: CustomerPlatformScriptEntity[];
	}

	interface CustomerPortOccupancyPageResponse {
		pagination: PagePagination;
		list: CustomerPortOccupancyEntity[];
	}

	interface CustomerPortPageResponse {
		pagination: PagePagination;
		list: CustomerPortEntity[];
	}

	interface CustomerPricePackagePageResponse {
		pagination: PagePagination;
		list: CustomerPricePackageEntity[];
	}

	interface CustomerPurchaseOrderPageResponse {
		pagination: PagePagination;
		list: CustomerPurchaseOrderEntity[];
	}

	interface CustomerRuntimeSessionPageResponse {
		pagination: PagePagination;
		list: CustomerRuntimeSessionEntity[];
	}

	interface CustomerTranslateServicePageResponse {
		pagination: PagePagination;
		list: CustomerTranslateServiceEntity[];
	}

	interface CustomerTranslationMemoryPageResponse {
		pagination: PagePagination;
		list: CustomerTranslationMemoryEntity[];
	}

	interface CustomerTranslationPageResponse {
		pagination: PagePagination;
		list: CustomerTranslationEntity[];
	}

	interface CustomerUserPageResponse {
		pagination: PagePagination;
		list: CustomerUserEntity[];
	}

	interface CustomerWhatsappAccountPageResponse {
		pagination: PagePagination;
		list: CustomerWhatsappAccountEntity[];
	}

	interface CustomerWhatsappConversationPageResponse {
		pagination: PagePagination;
		list: CustomerWhatsappConversationEntity[];
	}

	interface CustomerWhatsappMessagePageResponse {
		pagination: PagePagination;
		list: CustomerWhatsappMessageEntity[];
	}

	interface CustomerWhitelistPageResponse {
		pagination: PagePagination;
		list: CustomerWhitelistEntity[];
	}

	interface DemoGoodsPageResponse {
		pagination: PagePagination;
		list: DemoGoodsEntity[];
	}

	interface DictInfoPageResponse {
		pagination: PagePagination;
		list: DictInfoEntity[];
	}

	interface DictTypePageResponse {
		pagination: PagePagination;
		list: DictTypeEntity[];
	}

	interface PluginInfoPageResponse {
		pagination: PagePagination;
		list: PluginInfoEntity[];
	}

	interface RecycleDataPageResponse {
		pagination: PagePagination;
		list: RecycleDataEntity[];
	}

	interface SpaceInfoPageResponse {
		pagination: PagePagination;
		list: SpaceInfoEntity[];
	}

	interface SpaceTypePageResponse {
		pagination: PagePagination;
		list: SpaceTypeEntity[];
	}

	interface TaskInfoPageResponse {
		pagination: PagePagination;
		list: TaskInfoEntity[];
	}

	interface UserAddressPageResponse {
		pagination: PagePagination;
		list: UserAddressEntity[];
	}

	interface UserInfoPageResponse {
		pagination: PagePagination;
		list: UserInfoEntity[];
	}

	interface BaseCoding {
		/**
		 * getModuleTree
		 */
		getModuleTree(data?: any): Promise<any>;

		/**
		 * createCode
		 */
		createCode(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { getModuleTree: string; createCode: string };

		/**
		 * 权限状态
		 */
		_permission: { getModuleTree: boolean; createCode: boolean };

		request: Request;
	}

	interface BaseComm {
		/**
		 * personUpdate
		 */
		personUpdate(data?: any): Promise<any>;

		/**
		 * uploadMode
		 */
		uploadMode(data?: any): Promise<any>;

		/**
		 * permmenu
		 */
		permmenu(data?: any): Promise<any>;

		/**
		 * program
		 */
		program(data?: any): Promise<any>;

		/**
		 * person
		 */
		person(data?: any): Promise<any>;

		/**
		 * upload
		 */
		upload(data?: any): Promise<any>;

		/**
		 * logout
		 */
		logout(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			personUpdate: string;
			uploadMode: string;
			permmenu: string;
			program: string;
			person: string;
			upload: string;
			logout: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			personUpdate: boolean;
			uploadMode: boolean;
			permmenu: boolean;
			program: boolean;
			person: boolean;
			upload: boolean;
			logout: boolean;
		};

		request: Request;
	}

	interface BaseOpen {
		/**
		 * register
		 */
		register(data?: any): Promise<any>;

		/**
		 * refreshToken
		 */
		refreshToken(data?: any): Promise<any>;

		/**
		 * captcha
		 */
		captcha(data?: any): Promise<any>;

		/**
		 * login
		 */
		login(data?: any): Promise<any>;

		/**
		 * html
		 */
		html(data?: any): Promise<any>;

		/**
		 * eps
		 */
		eps(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			register: string;
			refreshToken: string;
			captcha: string;
			login: string;
			html: string;
			eps: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			register: boolean;
			refreshToken: boolean;
			captcha: boolean;
			login: boolean;
			html: boolean;
			eps: boolean;
		};

		request: Request;
	}

	interface BaseSysDepartment {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * order
		 */
		order(data?: any): Promise<any>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; update: string; order: string; list: string; add: string };

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			order: boolean;
			list: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysLog {
		/**
		 * setKeep
		 */
		setKeep(data?: any): Promise<any>;

		/**
		 * getKeep
		 */
		getKeep(data?: any): Promise<any>;

		/**
		 * clear
		 */
		clear(data?: any): Promise<any>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysLogPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { setKeep: string; getKeep: string; clear: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { setKeep: boolean; getKeep: boolean; clear: boolean; page: boolean };

		request: Request;
	}

	interface BaseSysMenu {
		/**
		 * create
		 */
		create(data?: any): Promise<any>;

		/**
		 * export
		 */
		export(data?: any): Promise<any>;

		/**
		 * import
		 */
		import(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * parse
		 */
		parse(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysMenuPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			create: string;
			export: string;
			import: string;
			delete: string;
			update: string;
			parse: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			create: boolean;
			export: boolean;
			import: boolean;
			delete: boolean;
			update: boolean;
			parse: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysParam {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * html
		 */
		html(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysParamEntity>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysParamPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			html: string;
			info: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			html: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysRole {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysRolePageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface BaseSysUser {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * move
		 */
		move(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysUserEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<BaseSysUserPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			move: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			move: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerBill {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerBillEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerBillEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerBillPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerCharacter {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerCharacterEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerCharacterEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerCharacterPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerClientUpdate {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerClientUpdateEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerClientUpdateEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerClientUpdatePageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerCryptoRechargeOrder {
		/**
		 * scan
		 */
		scan(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerCryptoRechargeOrderEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerCryptoRechargeOrderEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerCryptoRechargeOrderPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { scan: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { scan: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerCryptoRechargeTx {
		/**
		 * info
		 */
		info(data?: any): Promise<CustomerCryptoRechargeTxEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerCryptoRechargeTxEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerCryptoRechargeTxPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerCryptoRecharge {
		/**
		 * create
		 */
		create(data?: any): Promise<any>;

		/**
		 * myPage
		 */
		myPage(data?: any): Promise<any>;

		/**
		 * myInfo
		 */
		myInfo(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { create: string; myPage: string; myInfo: string };

		/**
		 * 权限状态
		 */
		_permission: { create: boolean; myPage: boolean; myInfo: boolean };

		request: Request;
	}

	interface CustomerCryptoWallet {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerCryptoWalletEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerCryptoWalletEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerCryptoWalletPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerDashboard {
		/**
		 * globalSummary
		 */
		globalSummary(data?: any): Promise<any>;

		/**
		 * summary
		 */
		summary(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { globalSummary: string; summary: string };

		/**
		 * 权限状态
		 */
		_permission: { globalSummary: boolean; summary: boolean };

		request: Request;
	}

	interface CustomerFileResource {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerFileResourceEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerFileResourceEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerFileResourcePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { delete: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerKeyword {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerKeywordEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerKeywordEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerKeywordPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerMaterial {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerMaterialEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerMaterialEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerMaterialPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerMessageDetection {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerMessageDetectionEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerMessageDetectionEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerMessageDetectionPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { delete: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerMessage {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerMessageEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerMessageEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerMessagePageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerMonitor {
		/**
		 * testsend
		 */
		testsend(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerMonitorEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerMonitorEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerMonitorPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			testsend: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			testsend: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerPlatformScriptPlatform {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerPlatformScriptPlatformEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerPlatformScriptPlatformEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerPlatformScriptPlatformPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerPlatformScriptRelease {
		/**
		 * current
		 */
		current(data?: any): Promise<any>;

		/**
		 * publish
		 */
		publish(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerPlatformScriptReleaseEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerPlatformScriptReleaseEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerPlatformScriptReleasePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { current: string; publish: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: {
			current: boolean;
			publish: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface CustomerPlatformScript {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerPlatformScriptEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerPlatformScriptEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerPlatformScriptPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerPortOccupancy {
		/**
		 * forcereclaim
		 */
		forcereclaim(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerPortOccupancyEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerPortOccupancyEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerPortOccupancyPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { forcereclaim: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { forcereclaim: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerPort {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerPortEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerPortEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerPortPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerPricePackage {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerPricePackageEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerPricePackageEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerPricePackagePageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerPurchaseOrder {
		/**
		 * info
		 */
		info(data?: any): Promise<CustomerPurchaseOrderEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerPurchaseOrderEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerPurchaseOrderPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerPurchase {
		/**
		 * packages
		 */
		packages(data?: any): Promise<any>;

		/**
		 * create
		 */
		create(data?: any): Promise<any>;

		/**
		 * myPage
		 */
		myPage(data?: any): Promise<any>;

		/**
		 * myInfo
		 */
		myInfo(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { packages: string; create: string; myPage: string; myInfo: string };

		/**
		 * 权限状态
		 */
		_permission: { packages: boolean; create: boolean; myPage: boolean; myInfo: boolean };

		request: Request;
	}

	interface CustomerRuntimeSession {
		/**
		 * forceoffline
		 */
		forceoffline(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerRuntimeSessionEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerRuntimeSessionEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerRuntimeSessionPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { forceoffline: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { forceoffline: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerTranslateService {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerTranslateServiceEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerTranslateServiceEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerTranslateServicePageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerTranslationMemory {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerTranslationMemoryEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerTranslationMemoryEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerTranslationMemoryPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerTranslation {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerTranslationEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerTranslationEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerTranslationPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerUser {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerUserEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerUserEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerUserPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface CustomerWhatsappAccount {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerWhatsappAccountEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerWhatsappAccountEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerWhatsappAccountPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { delete: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerWhatsappConversation {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerWhatsappConversationEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerWhatsappConversationEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerWhatsappConversationPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { delete: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerWhatsappMessage {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerWhatsappMessageEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerWhatsappMessageEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerWhatsappMessagePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { delete: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { delete: boolean; info: boolean; list: boolean; page: boolean };

		request: Request;
	}

	interface CustomerWhitelist {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<CustomerWhitelistEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<CustomerWhitelistEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<CustomerWhitelistPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DemoGoods {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<DemoGoodsEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<DemoGoodsPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DemoTenant {
		/**
		 * noTenant
		 */
		noTenant(data?: any): Promise<any>;

		/**
		 * noUse
		 */
		noUse(data?: any): Promise<any>;

		/**
		 * use
		 */
		use(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { noTenant: string; noUse: string; use: string };

		/**
		 * 权限状态
		 */
		_permission: { noTenant: boolean; noUse: boolean; use: boolean };

		request: Request;
	}

	interface DictInfo {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * types
		 */
		types(data?: any): Promise<any>;

		/**
		 * data
		 */
		data(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<DictInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<DictInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<DictInfoPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			types: string;
			data: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			types: boolean;
			data: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface DictType {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<DictTypeEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<DictTypeEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<DictTypePageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface PluginInfo {
		/**
		 * install
		 */
		install(data?: any): Promise<any>;

		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<PluginInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<PluginInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<PluginInfoPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			install: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			install: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface RecycleData {
		/**
		 * restore
		 */
		restore(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<RecycleDataEntity>;

		/**
		 * page
		 */
		page(data?: any): Promise<RecycleDataPageResponse>;

		/**
		 * 权限标识
		 */
		permission: { restore: string; info: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: { restore: boolean; info: boolean; page: boolean };

		request: Request;
	}

	interface SpaceInfo {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<SpaceInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<SpaceInfoPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface SpaceType {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<SpaceTypeEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<SpaceTypePageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface TaskInfo {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * start
		 */
		start(data?: any): Promise<any>;

		/**
		 * once
		 */
		once(data?: any): Promise<any>;

		/**
		 * stop
		 */
		stop(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<TaskInfoEntity>;

		/**
		 * page
		 */
		page(data?: any): Promise<TaskInfoPageResponse>;

		/**
		 * log
		 */
		log(data?: any): Promise<any>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			start: string;
			once: string;
			stop: string;
			info: string;
			page: string;
			log: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			start: boolean;
			once: boolean;
			stop: boolean;
			info: boolean;
			page: boolean;
			log: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface UserAddress {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<UserAddressEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<UserAddressEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<UserAddressPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface UserInfo {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;

		/**
		 * update
		 */
		update(data?: any): Promise<any>;

		/**
		 * info
		 */
		info(data?: any): Promise<UserInfoEntity>;

		/**
		 * list
		 */
		list(data?: any): Promise<UserInfoEntity[]>;

		/**
		 * page
		 */
		page(data?: any): Promise<UserInfoPageResponse>;

		/**
		 * add
		 */
		add(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};

		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};

		request: Request;
	}

	interface RequestOptions {
		url: string;
		method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
		data?: any;
		params?: any;
		headers?: any;
		timeout?: number;
		[key: string]: any;
	}

	type Request = (options: RequestOptions) => Promise<any>;

	type Service = {
		request: Request;

		base: {
			coding: BaseCoding;
			comm: BaseComm;
			open: BaseOpen;
			sys: {
				department: BaseSysDepartment;
				log: BaseSysLog;
				menu: BaseSysMenu;
				param: BaseSysParam;
				role: BaseSysRole;
				user: BaseSysUser;
			};
		};
		customer: {
			bill: CustomerBill;
			character: CustomerCharacter;
			clientUpdate: CustomerClientUpdate;
			cryptoRechargeOrder: CustomerCryptoRechargeOrder;
			cryptoRechargeTx: CustomerCryptoRechargeTx;
			cryptoRecharge: CustomerCryptoRecharge;
			cryptoWallet: CustomerCryptoWallet;
			dashboard: CustomerDashboard;
			fileResource: CustomerFileResource;
			keyword: CustomerKeyword;
			material: CustomerMaterial;
			messageDetection: CustomerMessageDetection;
			message: CustomerMessage;
			monitor: CustomerMonitor;
			platformScriptPlatform: CustomerPlatformScriptPlatform;
			platformScriptRelease: CustomerPlatformScriptRelease;
			platformScript: CustomerPlatformScript;
			portOccupancy: CustomerPortOccupancy;
			port: CustomerPort;
			pricePackage: CustomerPricePackage;
			purchaseOrder: CustomerPurchaseOrder;
			purchase: CustomerPurchase;
			runtimeSession: CustomerRuntimeSession;
			translateService: CustomerTranslateService;
			translationMemory: CustomerTranslationMemory;
			translation: CustomerTranslation;
			user: CustomerUser;
			whatsappAccount: CustomerWhatsappAccount;
			whatsappConversation: CustomerWhatsappConversation;
			whatsappMessage: CustomerWhatsappMessage;
			whitelist: CustomerWhitelist;
		};
		demo: { goods: DemoGoods; tenant: DemoTenant };
		dict: { info: DictInfo; type: DictType };
		plugin: { info: PluginInfo };
		recycle: { data: RecycleData };
		space: { info: SpaceInfo; type: SpaceType };
		task: { info: TaskInfo };
		user: { address: UserAddress; info: UserInfo };
	};
}
