const creditCardCategories = [
  {
    id: "china",
    name: "中国信用卡",
    icon: "fas fa-flag-china",
    description: "精选国内主要银行的明星信用卡产品，覆盖旅行、购物与生活场景。",
    cards: [
      {
        slug: "icbc-global-travel",
        name: "工银环球旅行信用卡",
        bank: "中国工商银行",
        image: "https://dummyimage.com/600x360/0b5ea4/ffffff&text=ICBC+环球旅行卡",
        description: "境外消费双倍积分，涵盖多重旅行保障，是出境旅行的得力伙伴。",
        highlights: [
          "境外消费双倍积分累计",
          "附带旅行延误及行李保险"
        ]
      },
      {
        slug: "cmb-classic-platinum",
        name: "招行经典白金信用卡",
        bank: "招商银行",
        image: "https://dummyimage.com/600x360/cc1f2f/ffffff&text=CMB+经典白金",
        description: "经典白金卡专属尊享礼遇，覆盖机场贵宾、酒店餐饮等高端权益。",
        highlights: [
          "全年指定机场贵宾厅服务",
          "积分可兑换海量航空及酒店权益"
        ]
      },
      {
        slug: "abc-elite-platinum",
        name: "农行精粹白金信用卡",
        bank: "中国农业银行",
        image: "https://dummyimage.com/600x360/3d9b35/ffffff&text=ABC+精粹白金",
        description: "专为高端生活打造，提供全球机场礼遇和高额保险保障。",
        highlights: [
          "高额旅行意外与医疗保险",
          "积分兑换高端礼品与服务"
        ]
      },
      {
        slug: "ccb-global-shopping",
        name: "建行龙卡全球热购卡",
        bank: "中国建设银行",
        image: "https://dummyimage.com/600x360/005bbb/ffffff&text=CCB+全球热购",
        description: "海淘消费汇率优惠，海外线上线下购物皆享积分回馈。",
        highlights: [
          "海淘消费返现与汇率优惠",
          "热门电商平台专属折扣"
        ]
      },
      {
        slug: "boc-greatwall",
        name: "中银长城环球通信用卡",
        bank: "中国银行",
        image: "https://dummyimage.com/600x360/d6182a/ffffff&text=BOC+环球通",
        description: "全球消费无忧，具备多币种结算与旅行增值服务。",
        highlights: [
          "多币种自动结算，免外汇手续费",
          "全球紧急替换卡与取现服务"
        ]
      },
      {
        slug: "spdb-amex-platinum",
        name: "浦发AE白金信用卡",
        bank: "上海浦东发展银行",
        image: "https://dummyimage.com/600x360/5631a6/ffffff&text=SPDB+AE白金",
        description: "美国运通白金卡联盟权益，涵盖全球机场贵宾与酒店礼遇。",
        highlights: [
          "美国运通环球酒店计划",
          "精选餐饮消费返现"
        ]
      },
      {
        slug: "citic-young-color",
        name: "中信颜卡信用卡",
        bank: "中信银行",
        image: "https://dummyimage.com/600x360/f36f21/ffffff&text=CITIC+颜卡",
        description: "多款个性化卡面可选，年轻人专属的潮流消费优惠。",
        highlights: [
          "热门品牌消费享受折扣",
          "支持自定义卡面设计"
        ]
      },
      {
        slug: "cmbc-lady-flower",
        name: "民生女人花信用卡",
        bank: "中国民生银行",
        image: "https://dummyimage.com/600x360/ff7b9c/ffffff&text=CMBC+女人花",
        description: "女性专属美丽计划，美容、购物与体检全面覆盖。",
        highlights: [
          "女性健康与美容商户分期优惠",
          "购物险与延保服务"
        ]
      },
      {
        slug: "cib-airline",
        name: "兴业银行行卡信用卡",
        bank: "兴业银行",
        image: "https://dummyimage.com/600x360/005b8f/ffffff&text=CIB+行卡",
        description: "航空里程累积专家，常旅客专属加速累积里程。",
        highlights: [
          "多家航司里程自由兑换",
          "旅行意外险最高百万元保障"
        ]
      },
      {
        slug: "ceb-lifestyle",
        name: "光大福信用卡",
        bank: "中国光大银行",
        image: "https://dummyimage.com/600x360/ffd447/333333&text=CEB+福卡",
        description: "日常消费高回馈，餐饮购物皆可享受积分与优惠。",
        highlights: [
          "精选餐饮商户折扣",
          "积分兑换生活礼品"
        ]
      },
      {
        slug: "cgb-true-emotion",
        name: "广发真情信用卡",
        bank: "广发银行",
        image: "https://dummyimage.com/600x360/f04e98/ffffff&text=CGB+真情卡",
        description: "女性关爱专属卡片，提供健康检查与购物优惠。",
        highlights: [
          "女性健康体检补贴",
          "热门百货购物返现"
        ]
      },
      {
        slug: "pingan-youni",
        name: "平安由你信用卡",
        bank: "平安银行",
        image: "https://dummyimage.com/600x360/ff6f00/ffffff&text=PINGAN+由你卡",
        description: "可自选三大消费类别享3倍积分，打造个性化回馈体验。",
        highlights: [
          "消费类别自选，积分翻倍",
          "航旅出行权益灵活兑换"
        ]
      },
      {
        slug: "hxb-yidajin",
        name: "华夏易达金信用卡",
        bank: "华夏银行",
        image: "https://dummyimage.com/600x360/cc1b4f/ffffff&text=HXB+易达金",
        description: "积分永不过期，多场景分期费率优惠，适合家庭日常消费。",
        highlights: [
          "积分永久有效",
          "现金分期费率优惠"
        ]
      },
      {
        slug: "psbc-classic",
        name: "邮储银行信用卡",
        bank: "中国邮政储蓄银行",
        image: "https://dummyimage.com/600x360/2a8f2a/ffffff&text=PSBC+信用卡",
        description: "覆盖城乡网点，提供日常消费优惠与生活缴费积分。",
        highlights: [
          "全国邮储网点便捷服务",
          "生活缴费积分享折扣"
        ]
      },
      {
        slug: "czbank-yongle",
        name: "浙商银行永乐信用卡",
        bank: "浙商银行",
        image: "https://dummyimage.com/600x360/005f73/ffffff&text=CZBANK+永乐卡",
        description: "消费分期优惠多，打造生活与出行一体化的权益组合。",
        highlights: [
          "消费分期手续费折扣",
          "合作商户积分加速"
        ]
      }
    ]
  },
  {
    id: "usa",
    name: "美国信用卡",
    icon: "fas fa-flag-usa",
    description: "美国热门信用卡，兼顾旅行、现金回馈与日常消费。",
    cards: [
      {
        slug: "chase-sapphire-preferred",
        name: "Chase Sapphire Preferred",
        bank: "Chase",
        image: "https://dummyimage.com/600x360/0f3d62/ffffff&text=Chase+Sapphire",
        description: "旅行奖励信用卡，提供灵活的Ultimate Rewards积分兑换。",
        highlights: [
          "旅行与餐饮消费享5倍积分",
          "积分可1:1转入多家航司酒店"
        ]
      },
      {
        slug: "amex-platinum",
        name: "Amex Platinum Card",
        bank: "American Express",
        image: "https://dummyimage.com/600x360/9e9e9e/333333&text=Amex+Platinum",
        description: "高端旅行信用卡，尊享全球机场贵宾室与酒店会籍。",
        highlights: [
          "覆盖1400+机场贵宾室",
          "赠送希尔顿与万豪酒店会籍"
        ]
      },
      {
        slug: "citi-double-cash",
        name: "Citi Double Cash",
        bank: "Citi",
        image: "https://dummyimage.com/600x360/1a9bd7/ffffff&text=Citi+Double+Cash",
        description: "2%现金回馈卡，适合日常无类别消费累积现金返还。",
        highlights: [
          "消费即得1%返现，还款再得1%",
          "无年费，现金返还灵活"
        ]
      },
      {
        slug: "capitalone-venture",
        name: "Capital One Venture",
        bank: "Capital One",
        image: "https://dummyimage.com/600x360/14213d/ffffff&text=Venture+Miles",
        description: "旅行里程奖励卡，所有消费2倍里程，兑换灵活。",
        highlights: [
          "所有消费2X里程",
          "里程可用于清算旅行消费"
        ]
      },
      {
        slug: "boa-travel-rewards",
        name: "BofA Travel Rewards",
        bank: "Bank of America",
        image: "https://dummyimage.com/600x360/1a4c8b/ffffff&text=BofA+Travel",
        description: "无年费旅行卡，旅行与餐饮消费积分更高。",
        highlights: [
          "旅行餐饮消费3X积分",
          "无外汇交易手续费"
        ]
      },
      {
        slug: "discover-it-cashback",
        name: "Discover it Cash Back",
        bank: "Discover",
        image: "https://dummyimage.com/600x360/f7931e/ffffff&text=Discover+it",
        description: "季度轮换5%现金回馈，第一年返现翻倍。",
        highlights: [
          "季度指定类别5%返现",
          "首年现金返还双倍奖励"
        ]
      },
      {
        slug: "wells-fargo-active-cash",
        name: "Wells Fargo Active Cash",
        bank: "Wells Fargo",
        image: "https://dummyimage.com/600x360/005f56/ffffff&text=Active+Cash",
        description: "无限2%现金回馈，无需分类更省心。",
        highlights: [
          "所有消费2%现金回馈",
          "无年费且支持手机钱包"
        ]
      },
      {
        slug: "usbank-altitude-go",
        name: "US Bank Altitude Go",
        bank: "U.S. Bank",
        image: "https://dummyimage.com/600x360/8a1538/ffffff&text=Altitude+Go",
        description: "餐饮外卖4倍积分，影音娱乐也有额外奖励。",
        highlights: [
          "餐饮外卖4X积分",
          "流媒体娱乐2X积分"
        ]
      },
      {
        slug: "barclays-arrival-plus",
        name: "Barclays Arrival Plus",
        bank: "Barclays US",
        image: "https://dummyimage.com/600x360/00558c/ffffff&text=Arrival+Plus",
        description: "旅行消费2倍里程，赎回旅行消费更享额外奖励。",
        highlights: [
          "所有消费2X里程累计",
          "赎回旅行消费返还5%里程"
        ]
      },
      {
        slug: "synchrony-premier",
        name: "Synchrony Premier",
        bank: "Synchrony",
        image: "https://dummyimage.com/600x360/0a9396/ffffff&text=Synchrony+Premier",
        description: "2%现金回馈无上限，适合日常家庭消费。",
        highlights: [
          "所有消费2%现金回馈",
          "无年费且附带手机保护计划"
        ]
      }
    ]
  },
  {
    id: "uk",
    name: "英国信用卡",
    icon: "fas fa-flag",
    description: "覆盖英国主要银行的热门信用卡，兼顾0利率分期与旅行奖励。",
    cards: [
      {
        slug: "hsbc-premier-world-elite",
        name: "HSBC Premier World Elite",
        bank: "HSBC UK",
        image: "https://dummyimage.com/600x360/022c43/ffffff&text=HSBC+Premier",
        description: "全球旅行权益丰富，适合高端客户的里程信用卡。",
        highlights: [
          "年度旅行消费赠送Avios里程",
          "Priority Pass机场贵宾室"
        ]
      },
      {
        slug: "barclaycard-platinum",
        name: "Barclaycard Platinum",
        bank: "Barclays UK",
        image: "https://dummyimage.com/600x360/1b4965/ffffff&text=Barclaycard+Platinum",
        description: "提供长达29个月0%消费分期，适合大额消费规划。",
        highlights: [
          "0%年利率分期长达29个月",
          "附带旅行与购物保障"
        ]
      },
      {
        slug: "lloyds-avios-rewards",
        name: "Lloyds Avios Rewards",
        bank: "Lloyds Bank",
        image: "https://dummyimage.com/600x360/5fa8d3/ffffff&text=Lloyds+Avios",
        description: "英航里程累积卡，适合常飞英国航空的旅客。",
        highlights: [
          "消费累积Avios里程",
          "英国国内旅行保险"
        ]
      },
      {
        slug: "natwest-reward",
        name: "NatWest Reward Credit Card",
        bank: "NatWest",
        image: "https://dummyimage.com/600x360/05668d/ffffff&text=NatWest+Reward",
        description: "英国高街消费返现高达1%，可用于抵扣账户费用。",
        highlights: [
          "指定零售商最高1%返现",
          "返现可直接抵扣银行费用"
        ]
      },
      {
        slug: "virgin-atlantic-reward-plus",
        name: "Virgin Atlantic Reward+",
        bank: "Virgin Money",
        image: "https://dummyimage.com/600x360/d1495b/ffffff&text=Virgin+Reward+",
        description: "专为维珍航空旅客打造的高级里程卡。",
        highlights: [
          "消费累积Virgin Points",
          "达标可获同行票或舱位升级"
        ]
      }
    ]
  },
  {
    id: "canada",
    name: "加拿大信用卡",
    icon: "fas fa-flag-canada",
    description: "覆盖加拿大主要银行的旅行与现金回馈信用卡。",
    cards: [
      {
        slug: "rbc-avion-visa-infinite",
        name: "RBC Avion Visa Infinite",
        bank: "Royal Bank of Canada",
        image: "https://dummyimage.com/600x360/003f88/ffffff&text=RBC+Avion",
        description: "旅行奖励信用卡，Avion积分可灵活兑换航班。",
        highlights: [
          "航班兑换无淡旺季限制",
          "附带全球旅行保险"
        ]
      },
      {
        slug: "td-aeroplan-visa-infinite",
        name: "TD Aeroplan Visa Infinite",
        bank: "TD Canada Trust",
        image: "https://dummyimage.com/600x360/007f5f/ffffff&text=TD+Aeroplan",
        description: "Aeroplan合作卡，为加航旅客提供多重礼遇。",
        highlights: [
          "加航购票赚取额外Aeroplan点数",
          "免费托运行李与优先登机"
        ]
      },
      {
        slug: "scotia-gold-amex",
        name: "Scotia Gold American Express",
        bank: "Scotiabank",
        image: "https://dummyimage.com/600x360/f4a259/ffffff&text=Scotia+Gold",
        description: "餐饮娱乐5倍积分，旅行保障完善。",
        highlights: [
          "餐饮娱乐5X Scene+积分",
          "旅行取消与医疗保险"
        ]
      },
      {
        slug: "bmo-world-elite-mastercard",
        name: "BMO World Elite Mastercard",
        bank: "Bank of Montreal",
        image: "https://dummyimage.com/600x360/2a9d8f/ffffff&text=BMO+World+Elite",
        description: "提供旅行保险、贵宾厅和积分奖励的高端卡。",
        highlights: [
          "赠送LoungeKey机场贵宾厅",
          "旅行消费额外积分"
        ]
      },
      {
        slug: "cibc-dividend-visa-infinite",
        name: "CIBC Dividend Visa Infinite",
        bank: "CIBC",
        image: "https://dummyimage.com/600x360/8d0801/ffffff&text=CIBC+Dividend",
        description: "现金回馈型信用卡，日常消费返现丰厚。",
        highlights: [
          "杂货店与油站最高4%返现",
          "内含购物与手机保险"
        ]
      }
    ]
  },
  {
    id: "australia",
    name: "澳大利亚信用卡",
    icon: "fas fa-flag",
    description: "澳大利亚主流银行旅行与奖励信用卡精选。",
    cards: [
      {
        slug: "commbank-ultimate-awards",
        name: "CommBank Ultimate Awards",
        bank: "Commonwealth Bank",
        image: "https://dummyimage.com/600x360/f49f0a/ffffff&text=CommBank+Ultimate",
        description: "综合奖励计划，积分可兑换航司、购物卡或现金。",
        highlights: [
          "海外消费免货币转换费",
          "提供国际旅行保险"
        ]
      },
      {
        slug: "westpac-altitude-black",
        name: "Westpac Altitude Black",
        bank: "Westpac",
        image: "https://dummyimage.com/600x360/0b132b/ffffff&text=Altitude+Black",
        description: "高端旅行卡，拥有多种航空与酒店兑换合作。",
        highlights: [
          "年赠Priority Pass贵宾厅次数",
          "旅行与购物保险覆盖"
        ]
      },
      {
        slug: "anz-frequent-flyer-black",
        name: "ANZ Frequent Flyer Black",
        bank: "ANZ",
        image: "https://dummyimage.com/600x360/1c2541/ffffff&text=ANZ+FF+Black",
        description: "Qantas常旅客专属卡，赚取加速里程。",
        highlights: [
          "Qantas消费额外里程",
          "每年享国内同行机票"
        ]
      },
      {
        slug: "nab-rewards-signature",
        name: "NAB Rewards Signature",
        bank: "National Australia Bank",
        image: "https://dummyimage.com/600x360/2a4d69/ffffff&text=NAB+Signature",
        description: "灵活积分兑换，多平台旅行合作。",
        highlights: [
          "积分可转至亚航、国泰等里程",
          "免费旅行保险"
        ]
      },
      {
        slug: "suncorp-clear-options",
        name: "Suncorp Clear Options",
        bank: "Suncorp",
        image: "https://dummyimage.com/600x360/e36414/ffffff&text=Suncorp+Clear",
        description: "低利率与低年费兼备，适合日常消费。",
        highlights: [
          "低年费低利率",
          "提供价格保护与购物保障"
        ]
      }
    ]
  },
  {
    id: "singapore",
    name: "新加坡信用卡",
    icon: "fas fa-flag",
    description: "涵盖新加坡主要银行的里程与生活权益信用卡。",
    cards: [
      {
        slug: "dbs-altitude-visa",
        name: "DBS Altitude Visa Signature",
        bank: "DBS Bank",
        image: "https://dummyimage.com/600x360/003459/ffffff&text=DBS+Altitude",
        description: "里程累积专家，适合频繁出境旅行者。",
        highlights: [
          "海外消费里程加速累计",
          "赠送旅行综合保险"
        ]
      },
      {
        slug: "ocbc-90n",
        name: "OCBC 90°N Card",
        bank: "OCBC",
        image: "https://dummyimage.com/600x360/1e5f74/ffffff&text=OCBC+90°N",
        description: "在线消费高回馈，里程兑换灵活。",
        highlights: [
          "线上旅行消费8倍里程",
          "里程可兑换多家航司"
        ]
      },
      {
        slug: "uob-prvi-miles",
        name: "UOB PRVI Miles",
        bank: "UOB",
        image: "https://dummyimage.com/600x360/247ba0/ffffff&text=UOB+PRVI",
        description: "海外消费3.2倍里程，航空酒店优惠多。",
        highlights: [
          "海外消费3.2X里程",
          "附带酒店和租车折扣"
        ]
      },
      {
        slug: "citi-premiermiles-sg",
        name: "Citi PremierMiles",
        bank: "Citibank Singapore",
        image: "https://dummyimage.com/600x360/006494/ffffff&text=Citi+PremierMiles",
        description: "无里程到期限制，覆盖全球航司兑换。",
        highlights: [
          "里程永久有效",
          "Priority Pass贵宾厅"
        ]
      },
      {
        slug: "maybank-horizon",
        name: "Maybank Horizon Visa Signature",
        bank: "Maybank",
        image: "https://dummyimage.com/600x360/f25f5c/ffffff&text=Maybank+Horizon",
        description: "旅行专属权益，餐饮、加油与的士消费里程提升。",
        highlights: [
          "旅行相关消费5X里程",
          "赠送旅行保险"
        ]
      }
    ]
  },
  {
    id: "japan",
    name: "日本信用卡",
    icon: "fas fa-torii-gate",
    description: "精选日本本土人气信用卡，覆盖积分、购物与旅行场景。",
    cards: [
      {
        slug: "jcb-card-w",
        name: "JCB Card W",
        bank: "JCB",
        image: "https://dummyimage.com/600x360/4f5d75/ffffff&text=JCB+Card+W",
        description: "39岁以下专属高回馈卡，网络购物积分翻倍。",
        highlights: [
          "全年积分常规2倍",
          "亚马逊等合作商户积分加倍"
        ]
      },
      {
        slug: "rakuten-card",
        name: "楽天カード",
        bank: "Rakuten",
        image: "https://dummyimage.com/600x360/c41e3a/ffffff&text=楽天カード",
        description: "乐天生态系统积分互通，电商购物回馈高。",
        highlights: [
          "乐天市场购物3倍积分",
          "积分可抵扣乐天各类服务"
        ]
      },
      {
        slug: "mitsui-sumitomo-gold",
        name: "三井住友カード ゴールド",
        bank: "三井住友カード",
        image: "https://dummyimage.com/600x360/6a994e/ffffff&text=三井住友Gold",
        description: "经典金卡，支持Visa的全球旅行服务。",
        highlights: [
          "指定店铺积分最高10倍",
          "提供旅行与购物保险"
        ]
      },
      {
        slug: "aeon-select",
        name: "イオンセレクトカード",
        bank: "AEON",
        image: "https://dummyimage.com/600x360/ffd166/333333&text=AEON+Select",
        description: "永旺精选卡，适合在永旺商场购物的家庭。",
        highlights: [
          "每月20、30日5%折扣",
          "免年费，支持电费水费自动扣款"
        ]
      },
      {
        slug: "epos-card",
        name: "エポスカード",
        bank: "EPOS",
        image: "https://dummyimage.com/600x360/8338ec/ffffff&text=EPOS+Card",
        description: "丸井集团发行的多功能卡，覆盖购物优惠与旅游折扣。",
        highlights: [
          "丸井百货分期免手续费",
          "全国约10,000家合作店铺折扣"
        ]
      }
    ]
  },
  {
    id: "europe",
    name: "欧洲信用卡",
    icon: "fas fa-euro-sign",
    description: "欧洲数字银行与传统银行的热门信用卡产品。",
    cards: [
      {
        slug: "n26-metal",
        name: "N26 Metal Card",
        bank: "N26",
        image: "https://dummyimage.com/600x360/212529/ffffff&text=N26+Metal",
        description: "德国数字银行高端金属卡，提供旅行保险与全球支付。",
        highlights: [
          "全球支付免外汇手续费",
          "旅行医疗与行李保险"
        ]
      },
      {
        slug: "revolut-metal",
        name: "Revolut Metal",
        bank: "Revolut",
        image: "https://dummyimage.com/600x360/1e272e/ffffff&text=Revolut+Metal",
        description: "全球多币种账户，金属卡支持现金返现与旅行特权。",
        highlights: [
          "现金返现最高1%",
          "加密货币与股票交易特权"
        ]
      },
      {
        slug: "ing-visa",
        name: "ING Visa Card",
        bank: "ING 德国",
        image: "https://dummyimage.com/600x360/f77f00/ffffff&text=ING+Visa",
        description: "免年费Visa信用卡，全球取现便捷。",
        highlights: [
          "免年费与免外币手续费",
          "全球自动取款机免费取现"
        ]
      },
      {
        slug: "bnp-visa-premier",
        name: "BNP Paribas Visa Premier",
        bank: "法国巴黎银行",
        image: "https://dummyimage.com/600x360/005f73/ffffff&text=BNP+Premier",
        description: "旅行保险全面，适合欧洲旅行爱好者。",
        highlights: [
          "旅行取消、医疗、行李全覆盖",
          "海外消费积分加速"
        ]
      },
      {
        slug: "curve-black",
        name: "Curve Black Card",
        bank: "Curve",
        image: "https://dummyimage.com/600x360/9d4edd/ffffff&text=Curve+Black",
        description: "可整合多张银行卡的智能卡，消费分类清晰。",
        highlights: [
          "合并多张银行卡一键切换",
          "海外消费免手续费"
        ]
      }
    ]
  }
];

window.creditCardCategories = creditCardCategories;
