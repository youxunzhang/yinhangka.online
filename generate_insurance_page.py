import textwrap

regions = [
    {
        "id": "north-america",
        "title": "北美保险机构",
        "icon": "fas fa-flag-usa",
        "description": "涵盖美国与加拿大领先的寿险、财产险及健康险公司。"
    },
    {
        "id": "europe",
        "title": "欧洲保险集团",
        "icon": "fas fa-globe-europe",
        "description": "囊括法国、德国、英国、瑞士、意大利、西班牙及北欧的头部保险商。"
    },
    {
        "id": "asia-pacific",
        "title": "亚太保险巨头",
        "icon": "fas fa-earth-asia",
        "description": "覆盖中国、日本、韩国、印度、新加坡及澳大利亚的龙头保险品牌。"
    },
    {
        "id": "latin-america",
        "title": "拉丁美洲领先保险公司",
        "icon": "fas fa-earth-americas",
        "description": "精选巴西、墨西哥、智利及阿根廷等国家的代表性保险机构。"
    },
    {
        "id": "middle-east-africa",
        "title": "中东与非洲保险力量",
        "icon": "fas fa-earth-africa",
        "description": "展示中东湾区及非洲主要市场的高影响力保险公司。"
    },
    {
        "id": "reinsurance-specialty",
        "title": "全球再保险与专业险",
        "icon": "fas fa-building-shield",
        "description": "聚焦全球范围内提供再保险与专业险解决方案的领导者。"
    },
]

companies = [
    # North America
    {
        "name": "State Farm",
        "country": "美国",
        "region": "north-america",
        "category": "财产险/个人险",
        "description": "美国最大的汽车与房屋个人险提供商，服务网点遍布全美。",
        "website": "https://www.statefarm.com",
        "icon": "https://www.statefarm.com/favicon.ico",
        "fallback": "SF"
    },
    {
        "name": "Berkshire Hathaway (GEICO)",
        "country": "美国",
        "region": "north-america",
        "category": "多元财产险",
        "description": "沃伦·巴菲特旗下GEICO品牌，专注于个人车险与多元财产险。",
        "website": "https://www.geico.com",
        "icon": "https://www.geico.com/favicon.ico",
        "fallback": "GE"
    },
    {
        "name": "Progressive",
        "country": "美国",
        "region": "north-america",
        "category": "车险/财产险",
        "description": "美国前三大汽车保险公司之一，同时提供房屋与商业险。",
        "website": "https://www.progressive.com",
        "icon": "https://www.progressive.com/favicon.ico",
        "fallback": "PR"
    },
    {
        "name": "Allstate",
        "country": "美国",
        "region": "north-america",
        "category": "综合财产险",
        "description": "提供家庭、车险及小企业保障的综合性保险集团。",
        "website": "https://www.allstate.com",
        "icon": "https://www.allstate.com/favicon.ico",
        "fallback": "AS"
    },
    {
        "name": "Travelers",
        "country": "美国",
        "region": "north-america",
        "category": "商业财产险",
        "description": "领先的商业财产险及责任险提供者，覆盖多种行业。",
        "website": "https://www.travelers.com",
        "icon": "https://www.travelers.com/favicon.ico",
        "fallback": "TR"
    },
    {
        "name": "Liberty Mutual",
        "country": "美国",
        "region": "north-america",
        "category": "财产险/工险",
        "description": "全球十大财产险集团之一，涵盖工伤、责任与个人险。",
        "website": "https://www.libertymutual.com",
        "icon": "https://www.libertymutual.com/favicon.ico",
        "fallback": "LM"
    },
    {
        "name": "Nationwide",
        "country": "美国",
        "region": "north-america",
        "category": "综合保险",
        "description": "提供从个人寿险、车险到农险的多元化保险集团。",
        "website": "https://www.nationwide.com",
        "icon": "https://www.nationwide.com/favicon.ico",
        "fallback": "NW"
    },
    {
        "name": "USAA",
        "country": "美国",
        "region": "north-america",
        "category": "军人专属保险",
        "description": "为军人及家庭提供保险、银行及投资服务的互助组织。",
        "website": "https://www.usaa.com",
        "icon": "https://www.usaa.com/favicon.ico",
        "fallback": "US"
    },
    {
        "name": "Prudential Financial",
        "country": "美国",
        "region": "north-america",
        "category": "寿险/退休",
        "description": "美国领先的寿险及退休金管理机构，服务全球客户。",
        "website": "https://www.prudential.com",
        "icon": "https://www.prudential.com/favicon.ico",
        "fallback": "PF"
    },
    {
        "name": "MetLife",
        "country": "美国",
        "region": "north-america",
        "category": "寿险/员工福利",
        "description": "全球寿险与员工福利方案提供商，覆盖50多个国家。",
        "website": "https://www.metlife.com",
        "icon": "https://www.metlife.com/favicon.ico",
        "fallback": "ML"
    },
    {
        "name": "New York Life",
        "country": "美国",
        "region": "north-america",
        "category": "互助寿险",
        "description": "美国历史最悠久的互助寿险公司，专注家庭财富规划。",
        "website": "https://www.newyorklife.com",
        "icon": "https://www.newyorklife.com/favicon.ico",
        "fallback": "NY"
    },
    {
        "name": "MassMutual",
        "country": "美国",
        "region": "north-america",
        "category": "互助寿险",
        "description": "专注寿险、年金及退休规划的互助保险公司。",
        "website": "https://www.massmutual.com",
        "icon": "https://www.massmutual.com/favicon.ico",
        "fallback": "MM"
    },
    {
        "name": "Guardian Life",
        "country": "美国",
        "region": "north-america",
        "category": "寿险/牙科",
        "description": "提供寿险、残疾险及员工口腔保健计划的互助公司。",
        "website": "https://www.guardianlife.com",
        "icon": "https://www.guardianlife.com/favicon.ico",
        "fallback": "GL"
    },
    {
        "name": "Principal Financial Group",
        "country": "美国",
        "region": "north-america",
        "category": "退休与福利",
        "description": "退休金、资产管理与员工福利解决方案的领先供应商。",
        "website": "https://www.principal.com",
        "icon": "https://www.principal.com/favicon.ico",
        "fallback": "PF"
    },
    {
        "name": "Mutual of Omaha",
        "country": "美国",
        "region": "north-america",
        "category": "寿险/医保",
        "description": "专注寿险、医疗及年金的百年保险品牌。",
        "website": "https://www.mutualofomaha.com",
        "icon": "https://www.mutualofomaha.com/favicon.ico",
        "fallback": "MO"
    },
    {
        "name": "The Hartford",
        "country": "美国",
        "region": "north-america",
        "category": "商业险",
        "description": "以中小企业财产险与责任险见长的综合保险公司。",
        "website": "https://www.thehartford.com",
        "icon": "https://www.thehartford.com/favicon.ico",
        "fallback": "HT"
    },
    {
        "name": "American International Group (AIG)",
        "country": "美国",
        "region": "north-america",
        "category": "全球财产险",
        "description": "覆盖商业、个人及特殊风险的跨国保险集团。",
        "website": "https://www.aig.com",
        "icon": "https://www.aig.com/etc/designs/aig/homepage/favicon.ico",
        "fallback": "AI"
    },
    {
        "name": "UnitedHealth Group",
        "country": "美国",
        "region": "north-america",
        "category": "健康险",
        "description": "全球最大的医疗健康保险与服务公司。",
        "website": "https://www.unitedhealthgroup.com",
        "icon": "https://www.unitedhealthgroup.com/etc/clientlibs/uhg/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "UH"
    },
    {
        "name": "Elevance Health",
        "country": "美国",
        "region": "north-america",
        "category": "健康险",
        "description": "原Anthem，专注于医疗保险与健康管理。",
        "website": "https://www.elevancehealth.com",
        "icon": "https://www.elevancehealth.com/etc.clientlibs/elv/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "EH"
    },
    {
        "name": "Humana",
        "country": "美国",
        "region": "north-america",
        "category": "医保/老年护理",
        "description": "美国领先的Medicare Advantage健康险提供商。",
        "website": "https://www.humana.com",
        "icon": "https://www.humana.com/etc.clientlibs/humana/clientlibs/clientlib-site/resources/img/favicon.ico",
        "fallback": "HU"
    },
    {
        "name": "Cigna Healthcare",
        "country": "美国",
        "region": "north-america",
        "category": "全球健康险",
        "description": "专注国际医疗与企业健康计划的跨国保险商。",
        "website": "https://www.cigna.com",
        "icon": "https://www.cigna.com/etc.clientlibs/cigna/clientlibs/clientlib-site/resources/favicon.ico",
        "fallback": "CI"
    },
    {
        "name": "Manulife",
        "country": "加拿大",
        "region": "north-america",
        "category": "寿险/财富管理",
        "description": "加拿大最大的寿险及资产管理集团，全球品牌John Hancock。",
        "website": "https://www.manulife.com",
        "icon": "https://www.manulife.com/etc.clientlibs/manulife/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "MA"
    },
    {
        "name": "Sun Life",
        "country": "加拿大",
        "region": "north-america",
        "category": "寿险/资产管理",
        "description": "全球寿险、健康险及资产管理方案提供商。",
        "website": "https://www.sunlife.com",
        "icon": "https://www.sunlife.com/etc.clientlibs/sunlife/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "SL"
    },
    {
        "name": "Great-West Lifeco",
        "country": "加拿大",
        "region": "north-america",
        "category": "寿险/退休",
        "description": "旗下Canada Life品牌，专注寿险、年金与员工福利。",
        "website": "https://www.greatwestlifeco.com",
        "icon": "https://www.greatwestlifeco.com/content/dam/gwlco/icons/favicon.ico",
        "fallback": "GW"
    },
    {
        "name": "Intact Financial",
        "country": "加拿大",
        "region": "north-america",
        "category": "财产险",
        "description": "加拿大最大的财产与意外保险集团，旗下Belair、RSA等品牌。",
        "website": "https://www.intactfc.com",
        "icon": "https://www.intactfc.com/favicon.ico",
        "fallback": "IF"
    },
    {
        "name": "Desjardins Group",
        "country": "加拿大",
        "region": "north-america",
        "category": "互助金融/保险",
        "description": "北美最大信用合作社之一，提供全面保险与金融服务。",
        "website": "https://www.desjardins.com",
        "icon": "https://www.desjardins.com/favicon.ico",
        "fallback": "DE"
    },
    {
        "name": "Co-operators",
        "country": "加拿大",
        "region": "north-america",
        "category": "互助财产险",
        "description": "加拿大领先的互助制财产险公司，覆盖农业与社区。",
        "website": "https://www.cooperators.ca",
        "icon": "https://www.cooperators.ca/favicon.ico",
        "fallback": "CO"
    },
    # Europe
    {
        "name": "AXA",
        "country": "法国",
        "region": "europe",
        "category": "全球综合险",
        "description": "全球最大保险集团之一，提供寿险、财产险及资产管理。",
        "website": "https://www.axa.com",
        "icon": "https://www.axa.com/themes/custom/axa_theme/favicon.ico",
        "fallback": "AX"
    },
    {
        "name": "CNP Assurances",
        "country": "法国",
        "region": "europe",
        "category": "寿险/储蓄",
        "description": "法国领先的寿险与养老金提供商，服务欧洲与南美市场。",
        "website": "https://www.cnp.fr",
        "icon": "https://www.cnp.fr/etc.clientlibs/cnp/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "CNP"
    },
    {
        "name": "Groupama",
        "country": "法国",
        "region": "europe",
        "category": "互助综合险",
        "description": "覆盖农业、个人及企业保险的互助集团。",
        "website": "https://www.groupama.com",
        "icon": "https://www.groupama.com/wp-content/uploads/2021/09/cropped-favicon-32x32.png",
        "fallback": "GR"
    },
    {
        "name": "MAIF",
        "country": "法国",
        "region": "europe",
        "category": "互助财产险",
        "description": "法国知名互助保险公司，专注个人财产与责任保障。",
        "website": "https://www.maif.fr",
        "icon": "https://www.maif.fr/etc.clientlibs/maif/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "MF"
    },
    {
        "name": "Allianz",
        "country": "德国",
        "region": "europe",
        "category": "全球综合险",
        "description": "全球保险与资产管理巨头，服务超过一亿客户。",
        "website": "https://www.allianz.com",
        "icon": "https://www.allianz.com/etc/designs/allianzcom/clientlibs_renewed/resources/favicon.ico",
        "fallback": "AL"
    },
    {
        "name": "Munich Re",
        "country": "德国",
        "region": "europe",
        "category": "再保险",
        "description": "世界领先的再保险集团，提供复杂风险解决方案。",
        "website": "https://www.munichre.com",
        "icon": "https://www.munichre.com/etc/designs/munichre/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "MR"
    },
    {
        "name": "Talanx",
        "country": "德国",
        "region": "europe",
        "category": "商业保险",
        "description": "德国第三大保险集团，旗下HDI、Hannover Re等品牌。",
        "website": "https://www.talanx.com",
        "icon": "https://www.talanx.com/favicon.ico",
        "fallback": "TX"
    },
    {
        "name": "ERGO Group",
        "country": "德国",
        "region": "europe",
        "category": "个人与商业险",
        "description": "Munich Re旗下，提供寿险、健康险和财产险。",
        "website": "https://www.ergo.com",
        "icon": "https://www.ergo.com/etc.clientlibs/ergo/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "ER"
    },
    {
        "name": "Hannover Re",
        "country": "德国",
        "region": "europe",
        "category": "再保险",
        "description": "全球第三大再保险公司，覆盖寿险与非寿险。",
        "website": "https://www.hannover-re.com",
        "icon": "https://www.hannover-re.com/favicon.ico",
        "fallback": "HR"
    },
    {
        "name": "Generali",
        "country": "意大利",
        "region": "europe",
        "category": "寿险/财产险",
        "description": "欧洲历史最悠久的保险集团之一，覆盖全球50多个国家。",
        "website": "https://www.generali.com",
        "icon": "https://www.generali.com/etc/designs/generali/clientlibs/base/resources/favicon.ico",
        "fallback": "GE"
    },
    {
        "name": "UnipolSai",
        "country": "意大利",
        "region": "europe",
        "category": "财产险/健康险",
        "description": "意大利领先的综合保险公司，专长汽车与健康保障。",
        "website": "https://www.unipolsai.com",
        "icon": "https://www.unipolsai.com/themes/custom/unipolsai/favicon.ico",
        "fallback": "US"
    },
    {
        "name": "Poste Vita",
        "country": "意大利",
        "region": "europe",
        "category": "寿险/年金",
        "description": "意大利邮政旗下寿险与养老金业务，服务全国客户。",
        "website": "https://www.poste.it",
        "icon": "https://www.poste.it/etc.clientlibs/poste/clientlibs/clientlib-site/resources/favicon.ico",
        "fallback": "PV"
    },
    {
        "name": "Intesa Sanpaolo Vita",
        "country": "意大利",
        "region": "europe",
        "category": "银保寿险",
        "description": "意大利最大银行集团旗下的寿险与储蓄业务。",
        "website": "https://www.intesasanpaolovita.it",
        "icon": "https://www.intesasanpaolovita.it/etc.clientlibs/intesasanpaolovita/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "IS"
    },
    {
        "name": "Zurich Insurance",
        "country": "瑞士",
        "region": "europe",
        "category": "全球综合险",
        "description": "瑞士领先的综合保险集团，服务215个国家与地区。",
        "website": "https://www.zurich.com",
        "icon": "https://www.zurich.com/etc.clientlibs/zurich/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "ZU"
    },
    {
        "name": "Swiss Re",
        "country": "瑞士",
        "region": "europe",
        "category": "再保险",
        "description": "全球第二大再保险集团，专注风险分散与资本解决方案。",
        "website": "https://www.swissre.com",
        "icon": "https://www.swissre.com/favicon.ico",
        "fallback": "SR"
    },
    {
        "name": "Swiss Life",
        "country": "瑞士",
        "region": "europe",
        "category": "寿险/养老金",
        "description": "瑞士最大的寿险与养老产品供应商。",
        "website": "https://www.swisslife.com",
        "icon": "https://www.swisslife.com/etc.clientlibs/swisslife/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "SL"
    },
    {
        "name": "Helvetia",
        "country": "瑞士",
        "region": "europe",
        "category": "财产险/寿险",
        "description": "瑞士综合保险集团，提供个人与企业全方位保障。",
        "website": "https://www.helvetia.com",
        "icon": "https://www.helvetia.com/etc.clientlibs/helvetia/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "HV"
    },
    {
        "name": "Prudential plc",
        "country": "英国",
        "region": "europe",
        "category": "寿险/财富",
        "description": "总部伦敦，业务重心覆盖英国、美国与亚洲。",
        "website": "https://www.prudentialplc.com",
        "icon": "https://www.prudentialplc.com/content/dam/prudential-plc/favicon.ico",
        "fallback": "PP"
    },
    {
        "name": "Aviva",
        "country": "英国",
        "region": "europe",
        "category": "综合险",
        "description": "英国历史悠久的综合保险商，提供寿险与财产险。",
        "website": "https://www.aviva.com",
        "icon": "https://www.aviva.com/etc.clientlibs/aviva/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "AV"
    },
    {
        "name": "Legal & General",
        "country": "英国",
        "region": "europe",
        "category": "退休/资产管理",
        "description": "英国最大的养老金与资产管理机构之一。",
        "website": "https://www.legalandgeneral.com",
        "icon": "https://www.legalandgeneral.com/etc.clientlibs/legal-and-general/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "LG"
    },
    {
        "name": "Admiral Group",
        "country": "英国",
        "region": "europe",
        "category": "数字车险",
        "description": "以线上车险著称的英国保险科技集团。",
        "website": "https://www.admiral.com",
        "icon": "https://www.admiral.com/sites/all/themes/admiral/favicon.ico",
        "fallback": "AD"
    },
    {
        "name": "Lloyd's of London",
        "country": "英国",
        "region": "europe",
        "category": "专业险市场",
        "description": "全球最具影响力的承保市场，聚焦特殊风险。",
        "website": "https://www.lloyds.com",
        "icon": "https://www.lloyds.com/etc.clientlibs/lloyds/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "LL"
    },
    {
        "name": "Mapfre",
        "country": "西班牙",
        "region": "europe",
        "category": "全球综合险",
        "description": "西班牙最大的保险集团，业务遍及拉美与欧洲。",
        "website": "https://www.mapfre.com",
        "icon": "https://www.mapfre.com/media/favicons/favicon.ico",
        "fallback": "MP"
    },
    {
        "name": "Mutua Madrileña",
        "country": "西班牙",
        "region": "europe",
        "category": "互助财产险",
        "description": "西班牙最大的互助车险公司，拓展至健康与寿险。",
        "website": "https://www.mutua.es",
        "icon": "https://www.mutua.es/favicon.ico",
        "fallback": "MM"
    },
    {
        "name": "VidaCaixa",
        "country": "西班牙",
        "region": "europe",
        "category": "寿险/养老金",
        "description": "CaixaBank旗下，专注寿险与退休储蓄。",
        "website": "https://www.vidacaixa.es",
        "icon": "https://www.vidacaixa.es/etc.clientlibs/vidacaixa/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "VC"
    },
    {
        "name": "NN Group",
        "country": "荷兰",
        "region": "europe",
        "category": "寿险/资产管理",
        "description": "荷兰领先的寿险与养老金提供商，业务覆盖欧洲与日本。",
        "website": "https://www.nn-group.com",
        "icon": "https://www.nn-group.com/favicon.ico",
        "fallback": "NN"
    },
    {
        "name": "Aegon",
        "country": "荷兰",
        "region": "europe",
        "category": "寿险/退休",
        "description": "荷兰跨国寿险公司，旗下美国品牌Transamerica。",
        "website": "https://www.aegon.com",
        "icon": "https://www.aegon.com/etc.clientlibs/aegon/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "AE"
    },
    {
        "name": "Achmea",
        "country": "荷兰",
        "region": "europe",
        "category": "互助保险",
        "description": "荷兰最大的互助保险集团，涵盖健康、车险及养老。",
        "website": "https://www.achmea.nl",
        "icon": "https://www.achmea.nl/favicon.ico",
        "fallback": "AC"
    },
    {
        "name": "Tryg",
        "country": "丹麦",
        "region": "europe",
        "category": "北欧财产险",
        "description": "北欧领先的财产与意外保险公司。",
        "website": "https://www.tryg.com",
        "icon": "https://www.tryg.com/favicon.ico",
        "fallback": "TG"
    },
    {
        "name": "Sampo Group",
        "country": "芬兰",
        "region": "europe",
        "category": "北欧综合险",
        "description": "控股If P&C与Hastings等品牌，覆盖北欧及英国。",
        "website": "https://www.sampo.fi",
        "icon": "https://www.sampo.com/favicon.ico",
        "fallback": "SA"
    },
    {
        "name": "Gjensidige",
        "country": "挪威",
        "region": "europe",
        "category": "财产险",
        "description": "挪威领先的财产险与农险提供商。",
        "website": "https://www.gjensidige.no",
        "icon": "https://www.gjensidige.no/favicon.ico",
        "fallback": "GJ"
    },
    # Asia-Pacific
    {
        "name": "中国平安",
        "country": "中国",
        "region": "asia-pacific",
        "category": "综合金融",
        "description": "亚洲市值最大的综合金融与保险集团。",
        "website": "https://www.pingan.com",
        "icon": "https://www.pingan.com/favicon.ico",
        "fallback": "平安"
    },
    {
        "name": "中国人寿",
        "country": "中国",
        "region": "asia-pacific",
        "category": "寿险/养老",
        "description": "中国最大的寿险与养老金提供商。",
        "website": "https://www.chinalife.com.cn",
        "icon": "https://www.chinalife.com.cn/favicon.ico",
        "fallback": "国寿"
    },
    {
        "name": "中国太平洋保险",
        "country": "中国",
        "region": "asia-pacific",
        "category": "综合保险",
        "description": "以财产险与寿险并重的综合性保险集团。",
        "website": "https://www.cpic.com.cn",
        "icon": "https://www.cpic.com.cn/favicon.ico",
        "fallback": "太保"
    },
    {
        "name": "中国人民保险集团",
        "country": "中国",
        "region": "asia-pacific",
        "category": "财产险",
        "description": "新中国首家保险公司，财产险市场份额领先。",
        "website": "https://www.picc.com",
        "icon": "https://www.picc.com/favicon.ico",
        "fallback": "人保"
    },
    {
        "name": "新华保险",
        "country": "中国",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "中国前五大寿险公司之一，专注个人与团体保障。",
        "website": "https://www.newchinalife.com",
        "icon": "https://www.newchinalife.com/favicon.ico",
        "fallback": "新华"
    },
    {
        "name": "泰康保险集团",
        "country": "中国",
        "region": "asia-pacific",
        "category": "寿险/康养",
        "description": "寿险、养老社区与医疗健康一体化的综合集团。",
        "website": "https://www.taikang.com",
        "icon": "https://www.taikang.com/favicon.ico",
        "fallback": "泰康"
    },
    {
        "name": "日本生命",
        "country": "日本",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "日本最大的寿险公司，拥有庞大代理人网络。",
        "website": "https://www.nissay.co.jp",
        "icon": "https://www.nissay.co.jp/favicon.ico",
        "fallback": "日生"
    },
    {
        "name": "第一生命",
        "country": "日本",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "日本第二大寿险集团，积极布局海外市场。",
        "website": "https://www.dai-ichi-life.co.jp",
        "icon": "https://www.dai-ichi-life.co.jp/favicon.ico",
        "fallback": "第一"
    },
    {
        "name": "明治安田生命",
        "country": "日本",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "日本前四大寿险公司之一，专注个人保障与企业年金。",
        "website": "https://www.meijiyasuda.co.jp",
        "icon": "https://www.meijiyasuda.co.jp/favicon.ico",
        "fallback": "明治"
    },
    {
        "name": "住友生命",
        "country": "日本",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "日本主要互助寿险公司之一，注重家庭保障。",
        "website": "https://www.sumitomolife.co.jp",
        "icon": "https://www.sumitomolife.co.jp/favicon.ico",
        "fallback": "住友"
    },
    {
        "name": "日本邮政保险",
        "country": "日本",
        "region": "asia-pacific",
        "category": "寿险/储蓄",
        "description": "日本邮政集团旗下寿险业务，覆盖全国邮局渠道。",
        "website": "https://www.jp-life.japanpost.jp",
        "icon": "https://www.jp-life.japanpost.jp/favicon.ico",
        "fallback": "邮保"
    },
    {
        "name": "东京海上日动",
        "country": "日本",
        "region": "asia-pacific",
        "category": "财产险",
        "description": "Tokio Marine集团，亚洲领先的财产与特殊风险保险。",
        "website": "https://www.tokiomarinehd.com",
        "icon": "https://www.tokiomarinehd.com/favicon.ico",
        "fallback": "东海"
    },
    {
        "name": "MS&AD保险集团",
        "country": "日本",
        "region": "asia-pacific",
        "category": "综合财产险",
        "description": "由三井住友与Aioi Nissay合并，提供多元财产险。",
        "website": "https://www.ms-ad-hd.com",
        "icon": "https://www.ms-ad-hd.com/favicon.ico",
        "fallback": "MS"
    },
    {
        "name": "Sompo控股",
        "country": "日本",
        "region": "asia-pacific",
        "category": "财产险/护理",
        "description": "专注综合财产险，并延伸至养老护理服务。",
        "website": "https://www.sompo-hd.com",
        "icon": "https://www.sompo-hd.com/favicon.ico",
        "fallback": "Som"
    },
    {
        "name": "三星生命",
        "country": "韩国",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "韩国最大寿险公司，提供保险与资产管理服务。",
        "website": "https://www.samsunglife.com",
        "icon": "https://www.samsunglife.com/favicon.ico",
        "fallback": "SL"
    },
    {
        "name": "韩华生命",
        "country": "韩国",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "韩国知名寿险品牌，积极扩展海外业务。",
        "website": "https://www.hanwhalife.com",
        "icon": "https://www.hanwhalife.com/favicon.ico",
        "fallback": "HW"
    },
    {
        "name": "教保生命",
        "country": "韩国",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "韩国三大寿险之一，专注教育与家庭保障产品。",
        "website": "https://www.kyobo.com",
        "icon": "https://www.kyobo.com/resources/favicon.ico",
        "fallback": "KB"
    },
    {
        "name": "现代海上保险",
        "country": "韩国",
        "region": "asia-pacific",
        "category": "财产险",
        "description": "韩国领先的财产与车险公司，服务个人及企业。",
        "website": "https://www.hi.co.kr",
        "icon": "https://www.hi.co.kr/favicon.ico",
        "fallback": "HY"
    },
    {
        "name": "DB保险",
        "country": "韩国",
        "region": "asia-pacific",
        "category": "财产险/寿险",
        "description": "提供车险、企业险及寿险等全方位产品。",
        "website": "https://www.idbins.com",
        "icon": "https://www.idbins.com/favicon.ico",
        "fallback": "DB"
    },
    {
        "name": "AIA友邦",
        "country": "中国香港",
        "region": "asia-pacific",
        "category": "寿险/健康险",
        "description": "亚太领先的寿险与健康管理公司，业务遍布18个市场。",
        "website": "https://www.aia.com",
        "icon": "https://www.aia.com/etc.clientlibs/aia/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "AIA"
    },
    {
        "name": "FWD富卫",
        "country": "中国香港",
        "region": "asia-pacific",
        "category": "数字寿险",
        "description": "以数字化体验著称的新一代寿险与健康险集团。",
        "website": "https://www.fwd.com",
        "icon": "https://www.fwd.com/etc.clientlibs/fwd/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "FWD"
    },
    {
        "name": "大东方",
        "country": "新加坡",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "新加坡历史最悠久的寿险公司，遍及马来西亚与文莱。",
        "website": "https://www.greateasternlife.com",
        "icon": "https://www.greateasternlife.com/etc.clientlibs/greateastern/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "GE"
    },
    {
        "name": "NTUC Income",
        "country": "新加坡",
        "region": "asia-pacific",
        "category": "互助保险",
        "description": "新加坡最大的互助保险社，为个人与家庭提供保障。",
        "website": "https://www.income.com.sg",
        "icon": "https://www.income.com.sg/themes/custom/income/favicon.ico",
        "fallback": "IN"
    },
    {
        "name": "保诚新加坡",
        "country": "新加坡",
        "region": "asia-pacific",
        "category": "寿险/健康险",
        "description": "英国保诚集团在新加坡的寿险与健康险品牌。",
        "website": "https://www.prudential.com.sg",
        "icon": "https://www.prudential.com.sg/etc.clientlibs/prudential/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "PS"
    },
    {
        "name": "印度人寿保险公司",
        "country": "印度",
        "region": "asia-pacific",
        "category": "国有寿险",
        "description": "印度市场份额最高的国有寿险公司（LIC）。",
        "website": "https://licindia.in",
        "icon": "https://licindia.in/favicon.ico",
        "fallback": "LIC"
    },
    {
        "name": "HDFC Life",
        "country": "印度",
        "region": "asia-pacific",
        "category": "私营寿险",
        "description": "印度领先的私营寿险公司，主打数字化渠道。",
        "website": "https://www.hdfclife.com",
        "icon": "https://www.hdfclife.com/favicon.ico",
        "fallback": "HL"
    },
    {
        "name": "ICICI保诚",
        "country": "印度",
        "region": "asia-pacific",
        "category": "银保寿险",
        "description": "由ICICI银行与英国保诚合资的寿险公司。",
        "website": "https://www.iciciprulife.com",
        "icon": "https://www.iciciprulife.com/favicon.ico",
        "fallback": "IP"
    },
    {
        "name": "SBI Life",
        "country": "印度",
        "region": "asia-pacific",
        "category": "银行系寿险",
        "description": "印度国家银行与法国安盛合资的寿险公司。",
        "website": "https://www.sbilife.co.in",
        "icon": "https://www.sbilife.co.in/favicon.ico",
        "fallback": "SB"
    },
    {
        "name": "新印度保险",
        "country": "印度",
        "region": "asia-pacific",
        "category": "国有财产险",
        "description": "印度最大的国有财产与意外保险公司。",
        "website": "https://www.newindia.co.in",
        "icon": "https://www.newindia.co.in/portal/resources/images/favicon.ico",
        "fallback": "NI"
    },
    {
        "name": "Bajaj Allianz",
        "country": "印度",
        "region": "asia-pacific",
        "category": "综合保险",
        "description": "印度领先的合资保险品牌，覆盖寿险与财产险。",
        "website": "https://www.bajajallianz.com",
        "icon": "https://www.bajajallianz.com/favicon.ico",
        "fallback": "BA"
    },
    {
        "name": "QBE Insurance",
        "country": "澳大利亚",
        "region": "asia-pacific",
        "category": "全球财产险",
        "description": "澳大利亚最大的国际财产险集团，业务遍布全球。",
        "website": "https://www.qbe.com",
        "icon": "https://www.qbe.com/favicon.ico",
        "fallback": "QBE"
    },
    {
        "name": "Insurance Australia Group",
        "country": "澳大利亚",
        "region": "asia-pacific",
        "category": "个人与商业险",
        "description": "澳洲最大财产险集团，旗下NRMA、SGIO等品牌。",
        "website": "https://www.iag.com.au",
        "icon": "https://www.iag.com.au/themes/custom/iag/favicon.ico",
        "fallback": "IAG"
    },
    {
        "name": "Suncorp Group",
        "country": "澳大利亚",
        "region": "asia-pacific",
        "category": "综合金融",
        "description": "提供银行、保险与财富管理服务的综合集团。",
        "website": "https://www.suncorpgroup.com.au",
        "icon": "https://www.suncorpgroup.com.au/etc.clientlibs/suncorp/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "SC"
    },
    {
        "name": "TAL保险",
        "country": "澳大利亚",
        "region": "asia-pacific",
        "category": "寿险",
        "description": "澳大利亚寿险市场份额领先，隶属日本第一生命。",
        "website": "https://www.tal.com.au",
        "icon": "https://www.tal.com.au/favicon.ico",
        "fallback": "TAL"
    },
    {
        "name": "Medibank",
        "country": "澳大利亚",
        "region": "asia-pacific",
        "category": "健康险",
        "description": "澳大利亚最大的私人医疗保险提供商。",
        "website": "https://www.medibank.com.au",
        "icon": "https://www.medibank.com.au/favicon.ico",
        "fallback": "MB"
    },
    {
        "name": "NIB Holdings",
        "country": "澳大利亚",
        "region": "asia-pacific",
        "category": "健康险",
        "description": "提供个人与国际学生医疗保险的领先品牌。",
        "website": "https://www.nib.com.au",
        "icon": "https://www.nib.com.au/favicon.ico",
        "fallback": "NIB"
    },
    # Latin America
    {
        "name": "Porto Seguro",
        "country": "巴西",
        "region": "latin-america",
        "category": "综合财产险",
        "description": "巴西最大的综合保险与金融服务集团之一。",
        "website": "https://www.portoseguro.com.br",
        "icon": "https://www.portoseguro.com.br/favicon.ico",
        "fallback": "PS"
    },
    {
        "name": "Bradesco Seguros",
        "country": "巴西",
        "region": "latin-america",
        "category": "寿险/健康险",
        "description": "巴西第二大私人保险集团，隶属布拉德斯科银行。",
        "website": "https://www.bradescoseguros.com.br",
        "icon": "https://www.bradescoseguros.com.br/favicon.ico",
        "fallback": "BS"
    },
    {
        "name": "SulAmérica",
        "country": "巴西",
        "region": "latin-america",
        "category": "健康险/资产管理",
        "description": "巴西历史最悠久的综合保险公司之一。",
        "website": "https://www.sulamerica.com.br",
        "icon": "https://www.sulamerica.com.br/favicon.ico",
        "fallback": "SA"
    },
    {
        "name": "Caixa Seguradora",
        "country": "巴西",
        "region": "latin-america",
        "category": "银行系保险",
        "description": "巴西联邦储蓄银行旗下的综合保险平台。",
        "website": "https://www.caixaseguradora.com.br",
        "icon": "https://www.caixaseguradora.com.br/favicon.ico",
        "fallback": "CS"
    },
    {
        "name": "Grupo Nacional Provincial",
        "country": "墨西哥",
        "region": "latin-america",
        "category": "综合保险",
        "description": "墨西哥最大的本土保险集团，简称GNP。",
        "website": "https://www.gnp.com.mx",
        "icon": "https://www.gnp.com.mx/favicon.ico",
        "fallback": "GNP"
    },
    {
        "name": "AXA México",
        "country": "墨西哥",
        "region": "latin-america",
        "category": "综合保险",
        "description": "法国安盛在墨西哥的子公司，覆盖寿险与财产险。",
        "website": "https://www.axa.mx",
        "icon": "https://www.axa.mx/favicon.ico",
        "fallback": "AX"
    },
    {
        "name": "Seguros Banorte",
        "country": "墨西哥",
        "region": "latin-america",
        "category": "银行系保险",
        "description": "墨西哥Banorte银行旗下寿险与财产险业务。",
        "website": "https://www.segurosbanorte.com.mx",
        "icon": "https://www.segurosbanorte.com.mx/favicon.ico",
        "fallback": "BN"
    },
    {
        "name": "MetLife México",
        "country": "墨西哥",
        "region": "latin-america",
        "category": "寿险/健康险",
        "description": "美国大都会人寿在墨西哥的子公司，服务全国客户。",
        "website": "https://www.metlife.com.mx",
        "icon": "https://www.metlife.com.mx/favicon.ico",
        "fallback": "ML"
    },
    {
        "name": "Consorcio Seguros",
        "country": "智利",
        "region": "latin-america",
        "category": "综合保险",
        "description": "智利领先的保险与金融服务集团。",
        "website": "https://www.consorcio.cl",
        "icon": "https://www.consorcio.cl/favicon.ico",
        "fallback": "CO"
    },
    {
        "name": "BCI Seguros",
        "country": "智利",
        "region": "latin-america",
        "category": "财产险",
        "description": "智利大型财产险公司，隶属BCI金融集团。",
        "website": "https://www.bciseguros.cl",
        "icon": "https://www.bciseguros.cl/favicon.ico",
        "fallback": "BCI"
    },
    {
        "name": "Sancor Seguros",
        "country": "阿根廷",
        "region": "latin-america",
        "category": "互助保险",
        "description": "阿根廷最大的互助保险集团之一，覆盖农业与人身险。",
        "website": "https://www.sancorseguros.com.ar",
        "icon": "https://www.sancorseguros.com.ar/favicon.ico",
        "fallback": "SC"
    },
    {
        "name": "Zurich Argentina",
        "country": "阿根廷",
        "region": "latin-america",
        "category": "综合保险",
        "description": "瑞士苏黎世保险在阿根廷的子公司，提供商业与个人险。",
        "website": "https://www.zurich.com.ar",
        "icon": "https://www.zurich.com.ar/favicon.ico",
        "fallback": "ZA"
    },
    # Middle East & Africa
    {
        "name": "Discovery",
        "country": "南非",
        "region": "middle-east-africa",
        "category": "健康险/寿险",
        "description": "以健康激励计划Vitality闻名的南非保险创新者。",
        "website": "https://www.discovery.co.za",
        "icon": "https://www.discovery.co.za/favicon.ico",
        "fallback": "DS"
    },
    {
        "name": "Old Mutual",
        "country": "南非",
        "region": "middle-east-africa",
        "category": "寿险/财富管理",
        "description": "拥有170余年历史的非洲综合金融集团。",
        "website": "https://www.oldmutual.co.za",
        "icon": "https://www.oldmutual.co.za/favicon.ico",
        "fallback": "OM"
    },
    {
        "name": "Sanlam",
        "country": "南非",
        "region": "middle-east-africa",
        "category": "寿险/投资",
        "description": "非洲最大的寿险与投资集团之一。",
        "website": "https://www.sanlam.co.za",
        "icon": "https://www.sanlam.co.za/favicon.ico",
        "fallback": "SL"
    },
    {
        "name": "Momentum Metropolitan",
        "country": "南非",
        "region": "middle-east-africa",
        "category": "寿险/健康险",
        "description": "南非领先的寿险与健康险集团，旗下Momentum与Metropolitan品牌。",
        "website": "https://www.momentummetropolitan.co.za",
        "icon": "https://www.momentummetropolitan.co.za/favicon.ico",
        "fallback": "MM"
    },
    {
        "name": "Absa Life",
        "country": "南非",
        "region": "middle-east-africa",
        "category": "银行系寿险",
        "description": "Absa集团旗下的寿险与财富管理业务。",
        "website": "https://www.absa.co.za",
        "icon": "https://www.absa.co.za/etc.clientlibs/absa/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "AB"
    },
    {
        "name": "Jubilee Insurance",
        "country": "肯尼亚",
        "region": "middle-east-africa",
        "category": "综合保险",
        "description": "东非地区规模最大的保险集团，业务遍及多个国家。",
        "website": "https://www.jubileeinsurance.com",
        "icon": "https://www.jubileeinsurance.com/favicon.ico",
        "fallback": "JB"
    },
    {
        "name": "AIICO Insurance",
        "country": "尼日利亚",
        "region": "middle-east-africa",
        "category": "寿险/财产险",
        "description": "尼日利亚领先的寿险与综合保险提供商。",
        "website": "https://www.aiicoplc.com",
        "icon": "https://www.aiicoplc.com/favicon.ico",
        "fallback": "AI"
    },
    {
        "name": "Wafa Assurance",
        "country": "摩洛哥",
        "region": "middle-east-africa",
        "category": "综合保险",
        "description": "摩洛哥最大保险公司，隶属Attijariwafa银行集团。",
        "website": "https://www.wafaassurance.ma",
        "icon": "https://www.wafaassurance.ma/favicon.ico",
        "fallback": "WA"
    },
    {
        "name": "Misr Insurance",
        "country": "埃及",
        "region": "middle-east-africa",
        "category": "国有综合险",
        "description": "埃及历史最悠久的国有综合保险公司。",
        "website": "https://www.misrinsurance.com",
        "icon": "https://www.misrinsurance.com/favicon.ico",
        "fallback": "MI"
    },
    {
        "name": "The Oriental Insurance Co.",
        "country": "肯尼亚",
        "region": "middle-east-africa",
        "category": "商业财产险",
        "description": "总部肯尼亚的区域性商业财产险公司。",
        "website": "https://www.oriental-kenya.co.ke",
        "icon": "https://www.oriental-kenya.co.ke/favicon.ico",
        "fallback": "OR"
    },
    {
        "name": "Qatar Insurance Company",
        "country": "卡塔尔",
        "region": "middle-east-africa",
        "category": "综合保险",
        "description": "中东地区最大的综合保险集团之一。",
        "website": "https://www.qic.qa",
        "icon": "https://www.qic.qa/favicon.ico",
        "fallback": "QIC"
    },
    {
        "name": "Gulf Insurance Group",
        "country": "科威特",
        "region": "middle-east-africa",
        "category": "区域综合险",
        "description": "覆盖中东与北非13国的保险集团。",
        "website": "https://www.gig.com.kw",
        "icon": "https://www.gig.com.kw/favicon.ico",
        "fallback": "GIG"
    },
    {
        "name": "Tawuniya",
        "country": "沙特阿拉伯",
        "region": "middle-east-africa",
        "category": "综合保险",
        "description": "沙特最大的合作制保险公司。",
        "website": "https://www.tawuniya.com.sa",
        "icon": "https://www.tawuniya.com.sa/favicon.ico",
        "fallback": "TW"
    },
    {
        "name": "Bupa Arabia",
        "country": "沙特阿拉伯",
        "region": "middle-east-africa",
        "category": "健康险",
        "description": "沙特领先的医疗健康保险提供商。",
        "website": "https://www.bupa.com.sa",
        "icon": "https://www.bupa.com.sa/favicon.ico",
        "fallback": "BA"
    },
    {
        "name": "Oman Insurance Company",
        "country": "阿联酋",
        "region": "middle-east-africa",
        "category": "综合保险",
        "description": "总部迪拜的综合保险公司，提供寿险与财产险。",
        "website": "https://www.omaninsurance.ae",
        "icon": "https://www.omaninsurance.ae/favicon.ico",
        "fallback": "OIC"
    },
    {
        "name": "Abu Dhabi National Insurance Company",
        "country": "阿联酋",
        "region": "middle-east-africa",
        "category": "商业财产险",
        "description": "阿联酋领先的商业与个人保险服务商。",
        "website": "https://www.adnic.ae",
        "icon": "https://www.adnic.ae/favicon.ico",
        "fallback": "AD"
    },
    {
        "name": "Dubai Islamic Insurance & Reinsurance",
        "country": "阿联酋",
        "region": "middle-east-africa",
        "category": "伊斯兰保险",
        "description": "阿联酋首家上市的伊斯兰保险公司，也称Aman。",
        "website": "https://www.amaninsurance.ae",
        "icon": "https://www.amaninsurance.ae/favicon.ico",
        "fallback": "AMAN"
    },
    # Reinsurance & Specialty
    {
        "name": "SCOR",
        "country": "法国",
        "region": "reinsurance-specialty",
        "category": "全球再保险",
        "description": "全球前五大再保险公司之一，提供寿险与非寿险再保。",
        "website": "https://www.scor.com",
        "icon": "https://www.scor.com/sites/default/files/favicon.ico",
        "fallback": "SC"
    },
    {
        "name": "Reinsurance Group of America",
        "country": "美国",
        "region": "reinsurance-specialty",
        "category": "寿险再保险",
        "description": "全球领先的寿险再保险专家，简称RGA。",
        "website": "https://www.rgare.com",
        "icon": "https://www.rgare.com/favicon.ico",
        "fallback": "RGA"
    },
    {
        "name": "PartnerRe",
        "country": "百慕大",
        "region": "reinsurance-specialty",
        "category": "多元再保险",
        "description": "提供财产险、寿险及特殊险再保解决方案。",
        "website": "https://www.partnerre.com",
        "icon": "https://www.partnerre.com/favicon.ico",
        "fallback": "PR"
    },
    {
        "name": "Axis Capital",
        "country": "百慕大",
        "region": "reinsurance-specialty",
        "category": "专业险/再险",
        "description": "百慕大领先的专业险与再保险承保商。",
        "website": "https://www.axiscapital.com",
        "icon": "https://www.axiscapital.com/favicon.ico",
        "fallback": "AX"
    },
    {
        "name": "Arch Capital Group",
        "country": "百慕大",
        "region": "reinsurance-specialty",
        "category": "再保险/专业险",
        "description": "专注于财产险、专业险及抵押保险的全球公司。",
        "website": "https://www.archgroup.com",
        "icon": "https://www.archgroup.com/favicon.ico",
        "fallback": "AR"
    },
    {
        "name": "RenaissanceRe",
        "country": "百慕大",
        "region": "reinsurance-specialty",
        "category": "巨灾再保险",
        "description": "以巨灾风险与特殊再保险见长的全球保险集团。",
        "website": "https://www.renre.com",
        "icon": "https://www.renre.com/favicon.ico",
        "fallback": "RR"
    },
    {
        "name": "Everest Re",
        "country": "百慕大",
        "region": "reinsurance-specialty",
        "category": "多线再保险",
        "description": "提供财产与寿险再保，同时经营特种险。",
        "website": "https://www.everestre.com",
        "icon": "https://www.everestre.com/etc.clientlibs/everest/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "EV"
    },
    {
        "name": "Hiscox",
        "country": "百慕大",
        "region": "reinsurance-specialty",
        "category": "特种保险",
        "description": "以伦敦劳合社为中心的专业险承保商。",
        "website": "https://www.hiscoxgroup.com",
        "icon": "https://www.hiscoxgroup.com/sites/all/themes/custom/hiscox/favicon.ico",
        "fallback": "HX"
    },
    {
        "name": "Lloyd's Syndicates",
        "country": "英国",
        "region": "reinsurance-specialty",
        "category": "劳合社辛迪加",
        "description": "劳合社旗下承担特殊风险的辛迪加组织。",
        "website": "https://www.lloyds.com/market-directory",
        "icon": "https://www.lloyds.com/etc.clientlibs/lloyds/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "LS"
    },
    {
        "name": "Swiss Re Corporate Solutions",
        "country": "瑞士",
        "region": "reinsurance-specialty",
        "category": "特种商业险",
        "description": "Swiss Re旗下提供企业大额风险保障的业务单元。",
        "website": "https://corporatesolutions.swissre.com",
        "icon": "https://corporatesolutions.swissre.com/etc.clientlibs/corporatesolutions/clientlibs/clientlib-base/resources/favicon.ico",
        "fallback": "CS"
    },
    {
        "name": "Mapfre Re",
        "country": "西班牙",
        "region": "reinsurance-specialty",
        "category": "全球再保险",
        "description": "Mapfre集团旗下再保险公司，为全球客户提供服务。",
        "website": "https://www.mapfrere.com",
        "icon": "https://www.mapfrere.com/favicon.ico",
        "fallback": "MR"
    },
    {
        "name": "Korean Re",
        "country": "韩国",
        "region": "reinsurance-specialty",
        "category": "亚洲再保险",
        "description": "亚洲领先的再保险公司，提供财产与寿险再保。",
        "website": "https://www.koreanre.co.kr",
        "icon": "https://www.koreanre.co.kr/favicon.ico",
        "fallback": "KR"
    },
]

remove_names = {
    "Guardian Life",
    "Mutual of Omaha",
    "The Hartford",
    "Desjardins Group",
    "Co-operators",
    "MAIF",
    "ERGO Group",
    "Helvetia",
    "Admiral Group",
    "Mutua Madrileña",
    "Achmea",
    "Tryg",
    "Sampo Group",
    "Gjensidige",
    "泰康保险集团",
    "住友生命",
    "日本邮政保险",
    "DB保险",
    "NTUC Income",
    "Bajaj Allianz",
    "Medibank",
    "NIB Holdings",
    "MetLife México",
    "Zurich Argentina",
    "Momentum Metropolitan",
    "Absa Life",
    "Misr Insurance",
    "The Oriental Insurance Co.",
    "Oman Insurance Company",
    "Abu Dhabi National Insurance Company",
    "Dubai Islamic Insurance & Reinsurance",
    "Axis Capital",
    "Hiscox",
    "Lloyd's Syndicates",
    "Mapfre Re",
}

companies = [c for c in companies if c["name"] not in remove_names]
assert len(companies) == 100, f"Expected 100 companies, got {len(companies)}"

region_map = {r["id"]: r for r in regions}

section_html = []
for region_id in [r["id"] for r in regions]:
    region = region_map[region_id]
    section_html.append(f"            <section class=\"banks-section\" id=\"{region_id}\">")
    section_html.append("                <h3 class=\"section-title\">")
    section_html.append(f"                    <i class=\"{region['icon']}\"></i>")
    section_html.append(f"                    {region['title']}")
    section_html.append("                </h3>")
    section_html.append(f"                <p class=\"section-description\">{region['description']}</p>")
    section_html.append("                <div class=\"banks-grid\">")
    for company in [c for c in companies if c["region"] == region_id]:
        section_html.append("                    <div class=\"bank-card\">")
        section_html.append("                        <div class=\"bank-icon\">")
        section_html.append(f"                            <img class=\"favicon-img\" src=\"{company['icon']}\" alt=\"{company['name']}\" data-fallback=\"{company['fallback']}\">")
        section_html.append(f"                            <span class=\"fallback-text\">{company['fallback']}</span>")
        section_html.append("                        </div>")
        section_html.append(f"                        <h4 class=\"bank-name\">{company['name']}</h4>")
        section_html.append("                        <ul class=\"bank-meta\">")
        section_html.append(f"                            <li><i class=\"fas fa-location-dot\"></i> {company['country']}</li>")
        section_html.append(f"                            <li><i class=\"fas fa-layer-group\"></i> {company['category']}</li>")
        section_html.append("                        </ul>")
        section_html.append(f"                        <p class=\"bank-description\">{company['description']}</p>")
        section_html.append(f"                        <a href=\"{company['website']}\" target=\"_blank\" class=\"bank-link\">访问官网 <i class=\"fas fa-external-link-alt\"></i></a>")
        section_html.append("                    </div>")
    section_html.append("                </div>")
    section_html.append("            </section>")

sections = "\n".join(section_html)

page_html = f"""<!DOCTYPE html>
<html lang=\"zh-CN\">
<head>
<script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8794607118520437\" crossorigin=\"anonymous\"></script>
        <meta name=\"google-adsense-account\" content=\"ca-pub-8794607118520437\">
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>全球保险公司大全 - 领先保险机构导航</title>
    <meta name=\"description\" content=\"全球100家顶级保险公司大全，按地区与类别分类，涵盖寿险、健康险、财产险与再保险机构。\">
    <link rel=\"stylesheet\" href=\"style.css\">
    <link href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css\" rel=\"stylesheet\">
</head>
<body>
    <header class=\"header\">
        <div class=\"container\">
            <nav class=\"nav-menu\">
                <a href=\"index.html\" class=\"nav-link\">
                    <i class=\"fas fa-home\"></i>
                    <span>国内银行</span>
                </a>
                <a href=\"global-banks.html\" class=\"nav-link\">
                    <i class=\"fas fa-globe\"></i>
                    <span>全球银行</span>
                </a>
                <a href=\"global-brokers.html\" class=\"nav-link\">
                    <i class=\"fas fa-briefcase\"></i>
                    <span>全球券商</span>
                </a>
                <a href=\"global-insurance.html\" class=\"nav-link active\">
                    <i class=\"fas fa-shield-heart\"></i>
                    <span>全球保险</span>
                </a>
                <a href=\"credit-cards.html\" class=\"nav-link\">
                    <i class=\"fas fa-credit-card\"></i>
                    <span>信用卡</span>
                </a>
                <a href=\"exchange-rates.html\" class=\"nav-link\">
                    <i class=\"fas fa-exchange-alt\"></i>
                    <span>实时汇率</span>
                </a>
                <a href=\"loan-interest-calculator.html\" class=\"nav-link\">
                    <i class=\"fas fa-coins\"></i>
                    <span>贷款利率</span>
                </a>
                <a href=\"credit-card-installment-calculator.html\" class=\"nav-link\">
                    <i class=\"fas fa-calculator\"></i>
                    <span>信用卡分期</span>
                </a>
                <a href=\"calculators.html\" class=\"nav-link\">
                    <i class=\"fas fa-tools\"></i>
                    <span>计算工具</span>
                </a>
                <a href=\"math-calculator.html\" class=\"nav-link\">
                    <i class=\"fas fa-square-root-variable\"></i>
                    <span>多功能计算</span>
                </a>
                <a href=\"rmb-uppercase.html\" class=\"nav-link\">
                    <i class=\"fas fa-yen-sign\"></i>
                    <span>人民币大写</span>
                </a>
                <a href=\"card-bin-lookup.html\" class=\"nav-link\">
                    <i class=\"fas fa-magnifying-glass\"></i>
                    <span>BIN 查询</span>
                </a>
            </nav>
        </div>
    </header>

    <main class=\"main\">
        <div class=\"container\">
            <section class=\"hero\">
                <h1 class=\"hero-title\">全球保险公司精选</h1>
                <p class=\"hero-description\">
                    汇总全球100家顶级保险机构，按地区与业务类别分类，覆盖寿险、健康险、财产险、再保险
                    及专业险，助您快速了解国际保险版图。
                </p>
                <div class=\"hero-actions\">
                    <a href=\"#north-america\" class=\"btn btn-primary\">北美</a>
                    <a href=\"#europe\" class=\"btn\">欧洲</a>
                    <a href=\"#asia-pacific\" class=\"btn\">亚太</a>
                    <a href=\"#latin-america\" class=\"btn\">拉美</a>
                    <a href=\"#middle-east-africa\" class=\"btn\">中东非洲</a>
                    <a href=\"#reinsurance-specialty\" class=\"btn\">再保险/专业险</a>
                </div>
            </section>

{sections}

        </div>
    </main>

    <footer class=\"footer\">
        <div class=\"container\">
            <p>© {2024} yinhangka.online. 本站精选全球保险机构信息，便于跨境金融对接与规划。</p>
            <nav class=\"footer-links\">
                <a href=\"terms.html\">服务条款</a>
                <a href=\"faq.html\">常见问题</a>
                <a href=\"robots.txt\" target=\"_blank\">robots</a>
            </nav>
        </div>
    </footer>

    <script src=\"script.js\"></script>
</body>
</html>
"""

with open("global-insurance.html", "w", encoding="utf-8") as f:
    f.write(page_html)
