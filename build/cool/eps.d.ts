declare namespace Eps {
	interface BaseSysDepartmentEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 部门名称
		 */
		name?: string;

		/**
		 * 创建者ID
		 */
		userId?: number;

		/**
		 * 上级部门ID
		 */
		parentId?: number;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 行为
		 */
		action?: string;

		/**
		 * ip
		 */
		ip?: string;

		/**
		 * 参数
		 */
		params?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 姓名
		 */
		name?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 父菜单ID
		 */
		parentId?: number;

		/**
		 * 菜单名称
		 */
		name?: string;

		/**
		 * 菜单地址
		 */
		router?: string;

		/**
		 * 权限标识
		 */
		perms?: string;

		/**
		 * 类型 0-目录 1-菜单 2-按钮
		 */
		type?: number;

		/**
		 * 图标
		 */
		icon?: string;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 视图地址
		 */
		viewPath?: string;

		/**
		 * 路由缓存
		 */
		keepAlive?: boolean;

		/**
		 * 是否显示
		 */
		isShow?: boolean;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 键
		 */
		keyName?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 数据
		 */
		data?: string;

		/**
		 * 数据类型 0-字符串 1-富文本 2-文件
		 */
		dataType?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 角色标签
		 */
		label?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 数据权限是否关联上下级
		 */
		relevance?: boolean;

		/**
		 * 菜单权限
		 */
		menuIdList?: any;

		/**
		 * 部门权限
		 */
		departmentIdList?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysTenantRegisterGiftEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 注册IP
		 */
		registerIp?: string;

		/**
		 * 租户用户ID
		 */
		userId?: number;

		/**
		 * 租户用户名
		 */
		username?: string;

		/**
		 * 计费模式 0-端口计费 1-字符计费
		 */
		billingMode?: number;

		/**
		 * 赠送类型 0-端口 1-字符
		 */
		giftType?: number;

		/**
		 * 赠送数量
		 */
		giftCount?: number;

		/**
		 * 赠送资源记录ID
		 */
		giftRecordId?: number;

		/**
		 * 赠送时间
		 */
		grantTime?: Date;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 部门ID
		 */
		departmentId?: number;

		/**
		 * 创建者ID
		 */
		userId?: number;

		/**
		 * 姓名
		 */
		name?: string;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 密码
		 */
		password?: string;

		/**
		 * 密码版本, 作用是改完密码，让原来的token失效
		 */
		passwordV?: number;

		/**
		 * 昵称
		 */
		nickName?: string;

		/**
		 * 头像
		 */
		headImg?: string;

		/**
		 * 手机
		 */
		phone?: string;

		/**
		 * 邮箱
		 */
		email?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 余额
		 */
		balance?: number;

		/**
		 * 计费模式
		 */
		billingMode?: number;

		/**
		 * socketId
		 */
		socketId?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerBillEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 类型
		 */
		type?: number;

		/**
		 * 金额
		 */
		amount?: number;

		/**
		 * 渠道
		 */
		channel?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCharacterEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 数量
		 */
		count?: number;

		/**
		 * 价格
		 */
		price?: number;

		/**
		 * 生效时间
		 */
		startDate?: Date;

		/**
		 * 剩余数量
		 */
		remainingCount?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 支付渠道
		 */
		payChannels?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerClientUpdateEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 版本号
		 */
		version?: string;

		/**
		 * 客户端文件名
		 */
		fileName?: string;

		/**
		 * 文件存储Key
		 */
		fileKey?: string;

		/**
		 * 下载地址
		 */
		downloadUrl?: string;

		/**
		 * 是否强制更新 0-否 1-是
		 */
		forceUpdate?: number;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 更新内容-简体中文
		 */
		updateContentZhCn?: string;

		/**
		 * 更新内容-繁体中文
		 */
		updateContentZhTw?: string;

		/**
		 * 更新内容-英文
		 */
		updateContentEn?: string;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCryptoRechargeOrderEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 订单号
		 */
		orderNo?: string;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 钱包ID
		 */
		walletId?: number;

		/**
		 * 链类型 eth-以太坊 tron-波场
		 */
		chain?: string;

		/**
		 * 币种
		 */
		currency?: string;

		/**
		 * 收款地址
		 */
		address?: string;

		/**
		 * 充值基础金额
		 */
		baseAmount?: number;

		/**
		 * 随机尾数
		 */
		randomTail?: number;

		/**
		 * 实际支付金额
		 */
		payAmount?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 交易哈希
		 */
		txHash?: string;

		/**
		 * 付款地址
		 */
		fromAddress?: string;

		/**
		 * 区块高度
		 */
		blockNumber?: number;

		/**
		 * 确认数
		 */
		confirmations?: number;

		/**
		 * 过期时间
		 */
		expireTime?: Date;

		/**
		 * 支付时间
		 */
		paidTime?: Date;

		/**
		 * 确认时间
		 */
		confirmTime?: Date;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 用户名
		 */
		tenantName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCryptoRechargeTxEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 钱包ID
		 */
		walletId?: number;

		/**
		 * 链类型 eth-以太坊 tron-波场
		 */
		chain?: string;

		/**
		 * 币种
		 */
		currency?: string;

		/**
		 * 交易哈希
		 */
		txHash?: string;

		/**
		 * 日志序号
		 */
		logIndex?: number;

		/**
		 * 付款地址
		 */
		fromAddress?: string;

		/**
		 * 收款地址
		 */
		toAddress?: string;

		/**
		 * 链上金额
		 */
		amount?: number;

		/**
		 * 区块高度
		 */
		blockNumber?: number;

		/**
		 * 确认数
		 */
		confirmations?: number;

		/**
		 * 匹配订单ID
		 */
		matchedOrderId?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerCryptoWalletEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 链类型 eth-以太坊 tron-波场
		 */
		chain?: string;

		/**
		 * 币种
		 */
		currency?: string;

		/**
		 * 收款地址
		 */
		address?: string;

		/**
		 * RPC地址
		 */
		rpcUrl?: string;

		/**
		 * USDT合约地址
		 */
		tokenContract?: string;

		/**
		 * 币种精度
		 */
		decimals?: number;

		/**
		 * 确认块数
		 */
		confirmationBlocks?: number;

		/**
		 * 上次扫描区块
		 */
		lastScannedBlock?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerFileResourceEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 客户用户ID
		 */
		userId?: number;

		/**
		 * 原始文件名
		 */
		originalName?: string;

		/**
		 * 存储文件名
		 */
		fileName?: string;

		/**
		 * 文件MD5
		 */
		fileMd5?: string;

		/**
		 * 扩展名
		 */
		extension?: string;

		/**
		 * 文件类型
		 */
		fileType?: string;

		/**
		 * MIME类型
		 */
		mimeType?: string;

		/**
		 * 文件大小
		 */
		fileSize?: number;

		/**
		 * 存储模式
		 */
		storageMode?: string;

		/**
		 * 文件存储Key
		 */
		fileKey?: string;

		/**
		 * 直链地址
		 */
		url?: string;

		/**
		 * 上传次数
		 */
		uploadCount?: number;

		/**
		 * 最后上传时间
		 */
		lastUploadTime?: Date;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 原始文件信息
		 */
		rawInfo?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 用户名
		 */
		customerUsername?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerKeywordEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 内容
		 */
		content?: string;

		/**
		 * 正则开关
		 */
		isRegex?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMaterialEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 素材标题
		 */
		title?: string;

		/**
		 * 素材类型
		 */
		type?: number;

		/**
		 * 素材地址列表
		 */
		urls?: any;

		/**
		 * 封面地址
		 */
		cover?: string;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMessageDetectionEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 平台
		 */
		platform?: string;

		/**
		 * 消息类型
		 */
		messageType?: string;

		/**
		 * 消息内容
		 */
		content?: string;

		/**
		 * 钱包监控开关
		 */
		walletMonitorStatus?: number;

		/**
		 * 关键词监控开关
		 */
		keywordMonitorStatus?: number;

		/**
		 * 拦截开关
		 */
		interceptStatus?: number;

		/**
		 * 是否检测到钱包地址
		 */
		walletDetected?: number;

		/**
		 * 是否命中钱包监控
		 */
		walletMatched?: number;

		/**
		 * 是否命中关键词
		 */
		keywordMatched?: number;

		/**
		 * 是否匹配
		 */
		matched?: number;

		/**
		 * 是否拦截
		 */
		intercepted?: number;

		/**
		 * 钱包地址列表
		 */
		walletAddresses?: any;

		/**
		 * 命中关键词列表
		 */
		matchedKeywords?: any;

		/**
		 * 无效正则关键词列表
		 */
		invalidRegexKeywords?: any;

		/**
		 * 命中类型
		 */
		hitTypes?: any;

		/**
		 * 客户端ID
		 */
		clientId?: string;

		/**
		 * 页面ID
		 */
		pageId?: string;

		/**
		 * 关联网页ID
		 */
		webpageId?: string;

		/**
		 * 对象ID
		 */
		targetId?: string;

		/**
		 * 发送者ID
		 */
		senderId?: string;

		/**
		 * 附加元数据
		 */
		meta?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 用户名
		 */
		customerUsername?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMessageEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 平台类型
		 */
		platform?: number;

		/**
		 * 消息类型
		 */
		messageType?: number;

		/**
		 * 消息属性
		 */
		attribute?: string;

		/**
		 * 消息行为
		 */
		action?: string;

		/**
		 * 文本内容
		 */
		content?: string;

		/**
		 * 图片
		 */
		image?: string;

		/**
		 * 视频
		 */
		video?: string;

		/**
		 * 对象昵称
		 */
		targetNickName?: string;

		/**
		 * 对象ID
		 */
		targetId?: string;

		/**
		 * 对象手机号
		 */
		targetPhone?: string;

		/**
		 * 发送者昵称
		 */
		senderNickName?: string;

		/**
		 * 发送者ID
		 */
		senderId?: string;

		/**
		 * 发送者手机号
		 */
		senderPhone?: string;

		/**
		 * 是否异常
		 */
		isException?: number;

		/**
		 * 来源唯一键
		 */
		sourceKey?: string;

		/**
		 * 来源平台
		 */
		sourcePlatform?: string;

		/**
		 * 来源账号标识
		 */
		sourceAccountKey?: string;

		/**
		 * 来源会话标识
		 */
		sourceConversationKey?: string;

		/**
		 * 来源消息标识
		 */
		sourceMessageKey?: string;

		/**
		 * 消息时间
		 */
		messageTime?: Date;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerMonitorEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 电报ID
		 */
		tgId?: string;

		/**
		 * 密钥
		 */
		secretKey?: string;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPlatformScriptPlatformEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 平台Key
		 */
		platformKey?: string;

		/**
		 * 平台名称
		 */
		name?: string;

		/**
		 * 平台脚本版本
		 */
		version?: string;

		/**
		 * 排序
		 */
		sortNum?: number;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPlatformScriptReleaseEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 脚本包版本
		 */
		packageVersion?: string;

		/**
		 * 最低客户端版本
		 */
		minClientVersion?: string;

		/**
		 * 发布包JSON快照
		 */
		payloadJson?: longtext;

		/**
		 * 发布包SHA256
		 */
		payloadHash?: string;

		/**
		 * 状态 0-历史 1-当前
		 */
		status?: number;

		/**
		 * 发布时间
		 */
		publishTime?: string;

		/**
		 * 发布人ID
		 */
		publisherId?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPlatformScriptEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 平台Key
		 */
		platformKey?: string;

		/**
		 * 脚本名称
		 */
		name?: string;

		/**
		 * 脚本版本
		 */
		version?: string;

		/**
		 * 注入顺序
		 */
		injectOrder?: number;

		/**
		 * 脚本来源 0-文本 1-文件
		 */
		sourceType?: number;

		/**
		 * 脚本内容
		 */
		content?: longtext;

		/**
		 * 上传文件Key
		 */
		fileKey?: string;

		/**
		 * 上传文件名
		 */
		fileName?: string;

		/**
		 * 脚本下载地址
		 */
		downloadUrl?: string;

		/**
		 * 脚本内容SHA256
		 */
		sha256?: string;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPortOccupancyEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 客户端ID
		 */
		clientId?: string;

		/**
		 * 页面ID
		 */
		pageId?: string;

		/**
		 * 分配槽位
		 */
		slotNo?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 占用时间
		 */
		occupyTime?: Date;

		/**
		 * 释放时间
		 */
		releaseTime?: Date;

		/**
		 * 最后心跳时间
		 */
		lastHeartbeatTime?: Date;

		/**
		 * 预计过期时间
		 */
		expireTime?: Date;

		/**
		 * 释放原因
		 */
		releaseReason?: string;

		/**
		 * IP
		 */
		ip?: string;

		/**
		 * 客户端信息
		 */
		userAgent?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 组织用户名
		 */
		tenantName?: string;

		/**
		 * 用户名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPortEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 数量
		 */
		count?: number;

		/**
		 * 价格
		 */
		price?: number;

		/**
		 * 生效时间
		 */
		startDate?: Date;

		/**
		 * 到期时间
		 */
		endDate?: Date;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 支付渠道
		 */
		payChannels?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPricePackageEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 套餐名称
		 */
		name?: string;

		/**
		 * 资源类型
		 */
		resourceType?: number;

		/**
		 * 数量
		 */
		count?: number;

		/**
		 * 价格
		 */
		price?: number;

		/**
		 * 有效期天数
		 */
		durationDays?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 排序
		 */
		sort?: number;

		/**
		 * 支付渠道
		 */
		payChannels?: any;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerPurchaseOrderEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 订单号
		 */
		orderNo?: string;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 套餐ID
		 */
		packageId?: number;

		/**
		 * 套餐名称
		 */
		packageName?: string;

		/**
		 * 资源类型
		 */
		resourceType?: number;

		/**
		 * 数量
		 */
		count?: number;

		/**
		 * 套餐价格
		 */
		price?: number;

		/**
		 * 订单金额
		 */
		amount?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 支付渠道
		 */
		payChannel?: number;

		/**
		 * 支付时间
		 */
		paidTime?: Date;

		/**
		 * 发放记录ID
		 */
		grantRecordId?: number;

		/**
		 * 发放时间
		 */
		grantTime?: Date;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerRuntimeSessionEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 客户端ID
		 */
		clientId?: string;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 心跳间隔(秒)
		 */
		heartbeatInterval?: number;

		/**
		 * 心跳超时(秒)
		 */
		heartbeatTimeout?: number;

		/**
		 * 心跳次数
		 */
		heartbeatCount?: number;

		/**
		 * 上线时间
		 */
		onlineTime?: Date;

		/**
		 * 离线时间
		 */
		offlineTime?: Date;

		/**
		 * 最后心跳时间
		 */
		lastHeartbeatTime?: Date;

		/**
		 * 最后活跃时间
		 */
		lastActiveTime?: Date;

		/**
		 * 预计过期时间
		 */
		expireTime?: Date;

		/**
		 * IP
		 */
		ip?: string;

		/**
		 * 客户端信息
		 */
		userAgent?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 组织用户名
		 */
		tenantName?: string;

		/**
		 * 用户名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerSiteMessageEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 站内信标题
		 */
		title?: string;

		/**
		 * 站内信内容
		 */
		content?: string;

		/**
		 * 接收范围
		 */
		targetType?: number;

		/**
		 * 指定员工ID列表
		 */
		userIds?: any;

		/**
		 * 优先级
		 */
		priority?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 发布时间
		 */
		publishTime?: Date;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerTranslateServiceEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 服务类型 openai-OpenAI兼容大模型 google-Google翻译
		 */
		serviceType?: string;

		/**
		 * API Key
		 */
		ak?: string;

		/**
		 * OpenAI兼容API地址
		 */
		apiUrl?: string;

		/**
		 * 翻译模型
		 */
		model?: string;

		/**
		 * 大模型翻译提示词
		 */
		prompt?: string;

		/**
		 * 启用状态
		 */
		status?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerTranslationMemoryEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 翻译服务类型
		 */
		serviceType?: string;

		/**
		 * 源语言
		 */
		sourceLang?: string;

		/**
		 * 目标语言
		 */
		targetLang?: string;

		/**
		 * 原文Hash
		 */
		originalHash?: string;

		/**
		 * 原文
		 */
		originalText?: string;

		/**
		 * 译文
		 */
		translatedText?: string;

		/**
		 * 命中次数
		 */
		hitCount?: number;

		/**
		 * 最后命中时间
		 */
		lastUsedTime?: Date;

		/**
		 * 来源翻译记录ID
		 */
		sourceRecordId?: number;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerTranslationEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 翻译服务类型
		 */
		serviceType?: string;

		/**
		 * 翻译服务配置ID
		 */
		translateServiceId?: number;

		/**
		 * 翻译库ID
		 */
		memoryId?: number;

		/**
		 * 原文Hash
		 */
		originalHash?: string;

		/**
		 * 是否复用翻译库 0-否 1-是
		 */
		cacheHit?: number;

		/**
		 * 原文
		 */
		originalText?: string;

		/**
		 * 译文
		 */
		translatedText?: string;

		/**
		 * 源语言
		 */
		sourceLang?: string;

		/**
		 * 目标语言
		 */
		targetLang?: string;

		/**
		 * 消耗字符数
		 */
		characterCount?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerUserEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 用户名
		 */
		username?: string;

		/**
		 * 密码
		 */
		password?: string;

		/**
		 * 密码版本, 修改密码后用于让历史token失效
		 */
		passwordV?: number;

		/**
		 * 消耗字符数
		 */
		consumedCharacters?: number;

		/**
		 * 占用端口数
		 */
		occupiedPorts?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 钱包监控开关
		 */
		walletMonitorStatus?: number;

		/**
		 * 关键词监控开关
		 */
		keywordMonitorStatus?: number;

		/**
		 * 全局开关
		 */
		globalStatus?: number;

		/**
		 * 拦截开关
		 */
		interceptStatus?: number;

		/**
		 * 素材库开关
		 */
		materialLibraryStatus?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 登录信息
		 */
		loginInfo?: string;

		/**
		 * 最后登录时间
		 */
		lastLoginTime?: Date;

		/**
		 * 在线状态
		 */
		onlineStatus?: number;

		/**
		 * 最后活跃时间
		 */
		lastActiveTime?: Date;

		/**
		 * 心跳过期时间
		 */
		heartbeatExpireTime?: Date;

		/**
		 * 当前客户端ID
		 */
		currentClientId?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhatsappAccountEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 客户用户ID
		 */
		userId?: number;

		/**
		 * 平台
		 */
		platform?: string;

		/**
		 * 平台账号标识
		 */
		accountKey?: string;

		/**
		 * 手机号
		 */
		phone?: string;

		/**
		 * 显示名称
		 */
		displayName?: string;

		/**
		 * 头像
		 */
		avatar?: string;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 最后同步时间
		 */
		lastSyncTime?: Date;

		/**
		 * 最后消息时间
		 */
		lastMessageTime?: Date;

		/**
		 * 原始账号信息
		 */
		rawProfile?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 用户名
		 */
		customerUsername?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhatsappConversationEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 平台账号记录ID
		 */
		accountId?: number;

		/**
		 * 平台
		 */
		platform?: string;

		/**
		 * 平台会话标识
		 */
		conversationKey?: string;

		/**
		 * 会话类型
		 */
		chatType?: number;

		/**
		 * 对方标识
		 */
		peerKey?: string;

		/**
		 * 对方手机号
		 */
		peerPhone?: string;

		/**
		 * 对方名称
		 */
		peerName?: string;

		/**
		 * 对方头像
		 */
		peerAvatar?: string;

		/**
		 * 最后消息ID
		 */
		lastMessageId?: number;

		/**
		 * 最后消息标识
		 */
		lastMessageKey?: string;

		/**
		 * 最后消息摘要
		 */
		lastMessagePreview?: string;

		/**
		 * 最后消息类型
		 */
		lastMessageType?: number;

		/**
		 * 最后消息时间
		 */
		lastMessageTime?: Date;

		/**
		 * 未读数
		 */
		unreadCount?: number;

		/**
		 * 是否置顶
		 */
		isPinned?: number;

		/**
		 * 是否归档
		 */
		isArchived?: number;

		/**
		 * 原始会话信息
		 */
		rawConversation?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 平台账号标识
		 */
		accountKey?: string;

		/**
		 * 手机号
		 */
		accountPhone?: string;

		/**
		 * 显示名称
		 */
		accountName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhatsappMessageEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 平台账号记录ID
		 */
		accountId?: number;

		/**
		 * 平台会话记录ID
		 */
		conversationId?: number;

		/**
		 * 平台
		 */
		platform?: string;

		/**
		 * 平台消息标识
		 */
		messageKey?: string;

		/**
		 * 消息方向
		 */
		direction?: number;

		/**
		 * 发送者标识
		 */
		senderKey?: string;

		/**
		 * 发送者手机号
		 */
		senderPhone?: string;

		/**
		 * 发送者名称
		 */
		senderName?: string;

		/**
		 * 接收者标识
		 */
		receiverKey?: string;

		/**
		 * 接收者手机号
		 */
		receiverPhone?: string;

		/**
		 * 接收者名称
		 */
		receiverName?: string;

		/**
		 * 消息类型
		 */
		messageType?: number;

		/**
		 * 文本内容
		 */
		textContent?: string;

		/**
		 * 媒体地址
		 */
		mediaUrl?: string;

		/**
		 * 缩略图地址
		 */
		thumbnailUrl?: string;

		/**
		 * MIME类型
		 */
		mimeType?: string;

		/**
		 * 文件名
		 */
		fileName?: string;

		/**
		 * 文件大小
		 */
		fileSize?: number;

		/**
		 * 时长(秒)
		 */
		duration?: number;

		/**
		 * 消息状态
		 */
		messageStatus?: number;

		/**
		 * 发送时间
		 */
		sentTime?: Date;

		/**
		 * 原始消息内容
		 */
		rawPayload?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 平台账号标识
		 */
		accountKey?: string;

		/**
		 * 手机号
		 */
		accountPhone?: string;

		/**
		 * 显示名称
		 */
		accountName?: string;

		/**
		 * 平台会话标识
		 */
		conversationKey?: string;

		/**
		 * 对方名称
		 */
		peerName?: string;

		/**
		 * 对方手机号
		 */
		peerPhone?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CustomerWhitelistEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 组织用户名
		 */
		orgUsername?: string;

		/**
		 * 组织用户ID
		 */
		orgUserId?: number;

		/**
		 * 地址
		 */
		address?: string;

		/**
		 * 类型
		 */
		type?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 标题
		 */
		title?: string;

		/**
		 * 价格
		 */
		price?: number;

		/**
		 * 描述
		 */
		description?: string;

		/**
		 * 主图
		 */
		mainImage?: string;

		/**
		 * 分类
		 */
		type?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 示例图
		 */
		exampleImages?: any;

		/**
		 * 库存
		 */
		stock?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 昵称
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 类型ID
		 */
		typeId?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 值
		 */
		value?: string;

		/**
		 * 排序
		 */
		orderNum?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 父ID
		 */
		parentId?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 标识
		 */
		key?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface PluginInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * 简介
		 */
		description?: string;

		/**
		 * Key名
		 */
		keyName?: string;

		/**
		 * Hook
		 */
		hook?: string;

		/**
		 * 描述
		 */
		readme?: string;

		/**
		 * 版本
		 */
		version?: string;

		/**
		 * Logo(base64)
		 */
		logo?: string;

		/**
		 * 作者
		 */
		author?: string;

		/**
		 * 状态 0-禁用 1-启用
		 */
		status?: number;

		/**
		 * 内容
		 */
		content?: any;

		/**
		 * ts内容
		 */
		tsContent?: any;

		/**
		 * 插件的plugin.json
		 */
		pluginJson?: any;

		/**
		 * 配置
		 */
		config?: any;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface RecycleDataEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 表
		 */
		entityInfo?: any;

		/**
		 * 操作人
		 */
		userId?: number;

		/**
		 * 被删除的数据
		 */
		data?: any;

		/**
		 * 请求的接口
		 */
		url?: string;

		/**
		 * 请求参数
		 */
		params?: any;

		/**
		 * 删除数据条数
		 */
		count?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 姓名
		 */
		userName?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 地址
		 */
		url?: string;

		/**
		 * 类型
		 */
		type?: string;

		/**
		 * 分类ID
		 */
		classifyId?: number;

		/**
		 * 文件id
		 */
		fileId?: string;

		/**
		 * 文件名
		 */
		name?: string;

		/**
		 * 文件大小
		 */
		size?: number;

		/**
		 * 文档版本
		 */
		version?: number;

		/**
		 * 文件位置
		 */
		key?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 类别名称
		 */
		name?: string;

		/**
		 * 父分类ID
		 */
		parentId?: number;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 任务ID
		 */
		jobId?: string;

		/**
		 * 任务配置
		 */
		repeatConf?: string;

		/**
		 * 名称
		 */
		name?: string;

		/**
		 * cron
		 */
		cron?: string;

		/**
		 * 最大执行次数 不传为无限次
		 */
		limit?: number;

		/**
		 * 每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效
		 */
		every?: number;

		/**
		 * 备注
		 */
		remark?: string;

		/**
		 * 状态 0-停止 1-运行
		 */
		status?: number;

		/**
		 * 开始时间
		 */
		startDate?: Date;

		/**
		 * 结束时间
		 */
		endDate?: Date;

		/**
		 * 数据
		 */
		data?: string;

		/**
		 * 执行的service实例ID
		 */
		service?: string;

		/**
		 * 状态 0-系统 1-用户
		 */
		type?: number;

		/**
		 * 下一次执行时间
		 */
		nextRunTime?: Date;

		/**
		 * 状态 0-cron 1-时间间隔
		 */
		taskType?: number;

		/**
		 * undefined
		 */
		lastExecuteTime?: Date;

		/**
		 * undefined
		 */
		lockExpireTime?: Date;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserAddressEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 用户ID
		 */
		userId?: number;

		/**
		 * 联系人
		 */
		contact?: string;

		/**
		 * 手机号
		 */
		phone?: string;

		/**
		 * 省
		 */
		province?: string;

		/**
		 * 市
		 */
		city?: string;

		/**
		 * 区
		 */
		district?: string;

		/**
		 * 地址
		 */
		address?: string;

		/**
		 * 是否默认
		 */
		isDefault?: boolean;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * ID
		 */
		id?: number;

		/**
		 * 登录唯一ID
		 */
		unionid?: string;

		/**
		 * 头像
		 */
		avatarUrl?: string;

		/**
		 * 昵称
		 */
		nickName?: string;

		/**
		 * 手机号
		 */
		phone?: string;

		/**
		 * 性别
		 */
		gender?: number;

		/**
		 * 状态
		 */
		status?: number;

		/**
		 * 登录方式
		 */
		loginType?: number;

		/**
		 * 密码
		 */
		password?: string;

		/**
		 * 介绍
		 */
		description?: string;

		/**
		 * 创建时间
		 */
		createTime?: string;

		/**
		 * 更新时间
		 */
		updateTime?: string;

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

	interface BaseSysTenantRegisterGiftPageResponse {
		pagination: PagePagination;
		list: BaseSysTenantRegisterGiftEntity[];
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

	interface CustomerSiteMessagePageResponse {
		pagination: PagePagination;
		list: CustomerSiteMessageEntity[];
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
		 * 获取模块目录结构
		 */
		getModuleTree(data?: any): Promise<any>;

		/**
		 * 创建代码
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
		 * 修改个人信息
		 */
		personUpdate(data?: any): Promise<any>;

		/**
		 * 文件上传模式
		 */
		uploadMode(data?: any): Promise<any>;

		/**
		 * 权限与菜单
		 */
		permmenu(data?: any): Promise<any>;

		/**
		 * 编程
		 */
		program(data?: any): Promise<any>;

		/**
		 * 个人信息
		 */
		person(data?: any): Promise<any>;

		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;

		/**
		 * 退出
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
		 * 租户注册
		 */
		register(data?: any): Promise<any>;

		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;

		/**
		 * 验证码
		 */
		captcha(data?: any): Promise<any>;

		/**
		 * 登录
		 */
		login(data?: any): Promise<any>;

		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;

		/**
		 * 实体信息与路径
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 排序
		 */
		order(data?: any): Promise<any>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;

		/**
		 * 新增
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
		 * 日志保存时间
		 */
		setKeep(data?: any): Promise<any>;

		/**
		 * 获得日志保存时间
		 */
		getKeep(data?: any): Promise<any>;

		/**
		 * 清理
		 */
		clear(data?: any): Promise<any>;

		/**
		 * 分页查询
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
		 * 创建代码
		 */
		create(data?: any): Promise<any>;

		/**
		 * 导出
		 */
		export(data?: any): Promise<any>;

		/**
		 * 导入
		 */
		import(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 解析
		 */
		parse(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysMenuPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysParamEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysParamPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysRolePageResponse>;

		/**
		 * 新增
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

	interface BaseSysTenantRegisterGift {
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysTenantRegisterGiftEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysTenantRegisterGiftEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysTenantRegisterGiftPageResponse>;

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

	interface BaseSysUser {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 移动部门
		 */
		move(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysUserEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<BaseSysUserPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerBillEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerBillEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerBillPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerCharacterEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerCharacterEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerCharacterPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerClientUpdateEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerClientUpdateEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerClientUpdatePageResponse>;

		/**
		 * 新增
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
		 * 手动扫描充值订单
		 */
		scan(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerCryptoRechargeOrderEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerCryptoRechargeOrderEntity[]>;

		/**
		 * 分页查询
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
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerCryptoRechargeTxEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerCryptoRechargeTxEntity[]>;

		/**
		 * 分页查询
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
		 * 创建租户充值订单
		 */
		create(data?: any): Promise<any>;

		/**
		 * 我的充值订单分页
		 */
		myPage(data?: any): Promise<any>;

		/**
		 * 我的充值订单详情
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerCryptoWalletEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerCryptoWalletEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerCryptoWalletPageResponse>;

		/**
		 * 新增
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
		 * 全站翻译运营汇总
		 */
		globalSummary(data?: any): Promise<any>;

		/**
		 * 租户资源看板汇总
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerFileResourceEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerFileResourceEntity[]>;

		/**
		 * 分页查询
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerKeywordEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerKeywordEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerKeywordPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerMaterialEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerMaterialEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerMaterialPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerMessageDetectionEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerMessageDetectionEntity[]>;

		/**
		 * 分页查询
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerMessageEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerMessageEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerMessagePageResponse>;

		/**
		 * 新增
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
		 * 测试发送Telegram消息
		 */
		testsend(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerMonitorEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerMonitorEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerMonitorPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerPlatformScriptPlatformEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerPlatformScriptPlatformEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerPlatformScriptPlatformPageResponse>;

		/**
		 * 新增
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
		 * 当前发布版本
		 */
		current(data?: any): Promise<any>;

		/**
		 * 发布脚本包
		 */
		publish(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerPlatformScriptReleaseEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerPlatformScriptReleaseEntity[]>;

		/**
		 * 分页查询
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerPlatformScriptEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerPlatformScriptEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerPlatformScriptPageResponse>;

		/**
		 * 新增
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
		 * 强制回收端口
		 */
		forcereclaim(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerPortOccupancyEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerPortOccupancyEntity[]>;

		/**
		 * 分页查询
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerPortEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerPortEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerPortPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerPricePackageEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerPricePackageEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerPricePackagePageResponse>;

		/**
		 * 新增
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
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerPurchaseOrderEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerPurchaseOrderEntity[]>;

		/**
		 * 分页查询
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
		 * 启用套餐列表
		 */
		packages(data?: any): Promise<any>;

		/**
		 * 余额购买套餐
		 */
		create(data?: any): Promise<any>;

		/**
		 * 我的购买订单分页
		 */
		myPage(data?: any): Promise<any>;

		/**
		 * 我的购买订单详情
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
		 * 强制下线会话
		 */
		forceoffline(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerRuntimeSessionEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerRuntimeSessionEntity[]>;

		/**
		 * 分页查询
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerTranslateServiceEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerTranslateServiceEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerTranslateServicePageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerTranslationMemoryEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerTranslationMemoryEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerTranslationMemoryPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerTranslationEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerTranslationEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerTranslationPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerUserEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerUserEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerUserPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerWhatsappAccountEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerWhatsappAccountEntity[]>;

		/**
		 * 分页查询
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerWhatsappConversationEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerWhatsappConversationEntity[]>;

		/**
		 * 分页查询
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

	interface CustomerWhatsappFans {
		/**
		 * WhatsApp每日进粉统计
		 */
		daily(data?: any): Promise<any>;

		/**
		 * 权限标识
		 */
		permission: { daily: string };

		/**
		 * 权限状态
		 */
		_permission: { daily: boolean };

		request: Request;
	}

	interface CustomerWhatsappMessage {
		/**
		 * 批量翻译平台消息
		 */
		translate(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerWhatsappMessageEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerWhatsappMessageEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerWhatsappMessagePageResponse>;

		/**
		 * 权限标识
		 */
		permission: { translate: string; delete: string; info: string; list: string; page: string };

		/**
		 * 权限状态
		 */
		_permission: {
			translate: boolean;
			delete: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
		};

		request: Request;
	}

	interface CustomerWhitelist {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerWhitelistEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerWhitelistEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerWhitelistPageResponse>;

		/**
		 * 新增
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

	interface CustomerSiteMessage {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<CustomerSiteMessageEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<CustomerSiteMessageEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<CustomerSiteMessagePageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DemoGoodsPageResponse>;

		/**
		 * 新增
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
		 * 局部不使用多租户
		 */
		noTenant(data?: any): Promise<any>;

		/**
		 * 不使用多租户
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 获得所有字典类型
		 */
		types(data?: any): Promise<any>;

		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DictInfoPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictTypeEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictTypeEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<DictTypePageResponse>;

		/**
		 * 新增
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
		 * 安装插件
		 */
		install(data?: any): Promise<any>;

		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<PluginInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<PluginInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<PluginInfoPageResponse>;

		/**
		 * 新增
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
		 * 恢复数据
		 */
		restore(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<RecycleDataEntity>;

		/**
		 * 分页查询
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SpaceInfoPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceTypeEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<SpaceTypePageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 开始
		 */
		start(data?: any): Promise<any>;

		/**
		 * 执行一次
		 */
		once(data?: any): Promise<any>;

		/**
		 * 停止
		 */
		stop(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TaskInfoEntity>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<TaskInfoPageResponse>;

		/**
		 * 日志
		 */
		log(data?: any): Promise<any>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserAddressEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserAddressEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<UserAddressPageResponse>;

		/**
		 * 新增
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
		 * 删除
		 */
		delete(data?: any): Promise<any>;

		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;

		/**
		 * 单个信息
		 */
		info(data?: any): Promise<UserInfoEntity>;

		/**
		 * 列表查询
		 */
		list(data?: any): Promise<UserInfoEntity[]>;

		/**
		 * 分页查询
		 */
		page(data?: any): Promise<UserInfoPageResponse>;

		/**
		 * 新增
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

	type DictKey = string;

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
				tenantRegisterGift: BaseSysTenantRegisterGift;
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
			whatsappFans: CustomerWhatsappFans;
			whatsappMessage: CustomerWhatsappMessage;
			whitelist: CustomerWhitelist;
			siteMessage: CustomerSiteMessage;
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
