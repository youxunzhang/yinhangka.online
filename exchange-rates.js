// 汇率页面专用JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 初始化汇率页面
    initializeExchangeRates();
    
    // 设置自动刷新
    setInterval(updateExchangeRates, 60000); // 每分钟更新一次
});

// 汇率数据存储
let exchangeRates = {};
let lastUpdateTime = null;

// 初始化汇率页面
function initializeExchangeRates() {
    console.log('初始化汇率页面...');
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 加载初始数据
    loadExchangeRates();
    
    // 初始化图表
    initializeChart();
    
    // 加载新闻
    loadExchangeNews();
}

// 绑定事件监听器
function bindEventListeners() {
    // 货币转换器事件
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const swapBtn = document.getElementById('swap-currencies');
    
    amountInput.addEventListener('input', performConversion);
    fromCurrency.addEventListener('change', performConversion);
    toCurrency.addEventListener('change', performConversion);
    
    swapBtn.addEventListener('click', swapCurrencies);
    
    // 图表控制事件
    const chartCurrencyPair = document.getElementById('chart-currency-pair');
    const chartPeriod = document.getElementById('chart-period');
    
    chartCurrencyPair.addEventListener('change', updateChart);
    chartPeriod.addEventListener('change', updateChart);
}

// 加载汇率数据
async function loadExchangeRates() {
    try {
        showLoadingState();
        
        // 模拟API调用 - 实际项目中应该使用真实的汇率API
        const rates = await fetchExchangeRates();
        
        exchangeRates = rates;
        lastUpdateTime = new Date();
        
        // 更新汇率表
        updateRatesTable();
        
        // 更新转换器
        performConversion();
        
        // 更新最后更新时间
        updateLastUpdatedTime();
        
        hideLoadingState();
        
    } catch (error) {
        console.error('加载汇率数据失败:', error);
        showErrorMessage('加载汇率数据失败，请稍后重试');
        hideLoadingState();
    }
}

// 模拟获取汇率数据
async function fetchExchangeRates() {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟汇率数据
    return {
        'USDCNY': { buy: 7.25, sell: 7.27, mid: 7.26, change: 0.02, changePercent: 0.28 },
        'EURCNY': { buy: 7.85, sell: 7.87, mid: 7.86, change: -0.01, changePercent: -0.13 },
        'GBPCNY': { buy: 9.12, sell: 9.15, mid: 9.135, change: 0.05, changePercent: 0.55 },
        'JPYCNY': { buy: 0.048, sell: 0.049, mid: 0.0485, change: -0.001, changePercent: -2.02 },
        'HKDCNY': { buy: 0.92, sell: 0.925, mid: 0.9225, change: 0.002, changePercent: 0.22 },
        'KRWCNY': { buy: 0.0054, sell: 0.0055, mid: 0.00545, change: 0.0001, changePercent: 1.87 },
        'SGDCNY': { buy: 5.35, sell: 5.38, mid: 5.365, change: 0.01, changePercent: 0.19 },
        'AUDCNY': { buy: 4.75, sell: 4.78, mid: 4.765, change: -0.02, changePercent: -0.42 },
        'CADCNY': { buy: 5.35, sell: 5.38, mid: 5.365, change: 0.01, changePercent: 0.19 },
        'CHFCNY': { buy: 8.15, sell: 8.18, mid: 8.165, change: 0.03, changePercent: 0.37 },
        'NZDCNY': { buy: 4.45, sell: 4.48, mid: 4.465, change: -0.01, changePercent: -0.22 }
    };
}

// 更新汇率表
function updateRatesTable() {
    const tableBody = document.getElementById('rates-table-body');
    tableBody.innerHTML = '';
    
    const currencyPairs = [
        { pair: 'USD/CNY', key: 'USDCNY', name: '美元/人民币' },
        { pair: 'EUR/CNY', key: 'EURCNY', name: '欧元/人民币' },
        { pair: 'GBP/CNY', key: 'GBPCNY', name: '英镑/人民币' },
        { pair: 'JPY/CNY', key: 'JPYCNY', name: '日元/人民币' },
        { pair: 'HKD/CNY', key: 'HKDCNY', name: '港币/人民币' },
        { pair: 'KRW/CNY', key: 'KRWCNY', name: '韩元/人民币' },
        { pair: 'SGD/CNY', key: 'SGDCNY', name: '新加坡元/人民币' },
        { pair: 'AUD/CNY', key: 'AUDCNY', name: '澳元/人民币' },
        { pair: 'CAD/CNY', key: 'CADCNY', name: '加元/人民币' },
        { pair: 'CHF/CNY', key: 'CHFCNY', name: '瑞士法郎/人民币' },
        { pair: 'NZD/CNY', key: 'NZDCNY', name: '新西兰元/人民币' }
    ];
    
    currencyPairs.forEach(currency => {
        const rate = exchangeRates[currency.key];
        if (rate) {
            const row = document.createElement('tr');
            const changeClass = rate.change >= 0 ? 'positive' : 'negative';
            const changeSymbol = rate.change >= 0 ? '+' : '';
            
            row.innerHTML = `
                <td>
                    <div class="currency-pair">
                        <span class="pair-code">${currency.pair}</span>
                        <span class="pair-name">${currency.name}</span>
                    </div>
                </td>
                <td>${rate.buy.toFixed(4)}</td>
                <td>${rate.sell.toFixed(4)}</td>
                <td>${rate.mid.toFixed(4)}</td>
                <td class="change ${changeClass}">
                    ${changeSymbol}${rate.change.toFixed(4)} (${changeSymbol}${rate.changePercent.toFixed(2)}%)
                </td>
                <td>${formatTime(lastUpdateTime)}</td>
            `;
            
            tableBody.appendChild(row);
        }
    });
}

// 执行货币转换
function performConversion() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (amount <= 0) {
        updateConversionResult(0, toCurrency);
        return;
    }
    
    // 获取汇率
    const rate = getExchangeRate(fromCurrency, toCurrency);
    
    if (rate) {
        const convertedAmount = amount * rate;
        updateConversionResult(convertedAmount, toCurrency);
        updateRateInfo(amount, fromCurrency, toCurrency, rate);
    } else {
        updateConversionResult(0, toCurrency);
    }
}

// 获取汇率
function getExchangeRate(from, to) {
    if (from === to) return 1;
    
    // 构建汇率键
    const rateKey = `${from}${to}`;
    const reverseRateKey = `${to}${from}`;
    
    if (exchangeRates[rateKey]) {
        return exchangeRates[rateKey].mid;
    } else if (exchangeRates[reverseRateKey]) {
        return 1 / exchangeRates[reverseRateKey].mid;
    }
    
    // 通过CNY作为中间货币计算
    if (from !== 'CNY' && to !== 'CNY') {
        const fromToCNY = getExchangeRate(from, 'CNY');
        const cnyToTo = getExchangeRate('CNY', to);
        if (fromToCNY && cnyToTo) {
            return fromToCNY * cnyToTo;
        }
    }
    
    return null;
}

// 更新转换结果
function updateConversionResult(amount, currency) {
    const resultAmount = document.querySelector('.result-amount');
    const resultCurrency = document.querySelector('.result-currency');
    
    resultAmount.textContent = amount.toFixed(2);
    resultCurrency.textContent = currency;
}

// 更新汇率信息
function updateRateInfo(amount, from, to, rate) {
    const rateInfo = document.getElementById('exchange-rate-info');
    rateInfo.textContent = `汇率: ${amount} ${from} = ${(amount * rate).toFixed(2)} ${to}`;
}

// 交换货币
function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    performConversion();
}

// 更新最后更新时间
function updateLastUpdatedTime() {
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdateTime) {
        lastUpdated.textContent = `最后更新: ${formatTime(lastUpdateTime)}`;
    }
}

// 格式化时间
function formatTime(date) {
    return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// 初始化图表
function initializeChart() {
    const chartContainer = document.getElementById('exchange-chart');
    
    // 创建简单的图表占位符
    chartContainer.innerHTML = `
        <div class="chart-placeholder-content">
            <div class="chart-mock">
                <div class="chart-header">
                    <h4>USD/CNY 汇率走势</h4>
                    <span class="chart-period">最近1天</span>
                </div>
                <div class="chart-area">
                    <div class="chart-line">
                        <div class="line-point" style="left: 10%; bottom: 20%;"></div>
                        <div class="line-point" style="left: 25%; bottom: 35%;"></div>
                        <div class="line-point" style="left: 40%; bottom: 25%;"></div>
                        <div class="line-point" style="left: 55%; bottom: 45%;"></div>
                        <div class="line-point" style="left: 70%; bottom: 40%;"></div>
                        <div class="line-point" style="left: 85%; bottom: 50%;"></div>
                        <div class="line-point" style="left: 95%; bottom: 55%;"></div>
                    </div>
                </div>
                <div class="chart-footer">
                    <div class="chart-stats">
                        <span class="stat-item">
                            <label>开盘:</label>
                            <span>7.24</span>
                        </span>
                        <span class="stat-item">
                            <label>最高:</label>
                            <span>7.28</span>
                        </span>
                        <span class="stat-item">
                            <label>最低:</label>
                            <span>7.22</span>
                        </span>
                        <span class="stat-item">
                            <label>收盘:</label>
                            <span>7.26</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 更新图表
function updateChart() {
    const currencyPair = document.getElementById('chart-currency-pair').value;
    const period = document.getElementById('chart-period').value;
    
    console.log(`更新图表: ${currencyPair}, 周期: ${period}`);
    
    // 这里应该调用真实的图表API
    // 目前使用模拟数据
    initializeChart();
}

// 加载汇率新闻
async function loadExchangeNews() {
    const newsContainer = document.getElementById('exchange-news');
    
    // 模拟新闻数据
    const news = [
        {
            title: "美联储维持利率不变，美元指数小幅上涨",
            summary: "美联储在最新会议上决定维持基准利率不变，市场对此反应积极...",
            time: "2小时前",
            source: "财经网"
        },
        {
            title: "人民币汇率企稳，央行释放稳定信号",
            summary: "中国人民银行表示将继续保持人民币汇率在合理均衡水平上的基本稳定...",
            time: "4小时前",
            source: "央行官网"
        },
        {
            title: "欧元区经济数据向好，欧元兑美元走强",
            summary: "最新公布的欧元区PMI数据显示经济复苏势头良好，推动欧元上涨...",
            time: "6小时前",
            source: "路透社"
        },
        {
            title: "日本央行政策调整预期升温，日元波动加大",
            summary: "市场对日本央行可能调整超宽松货币政策的预期增强，日元汇率波动明显...",
            time: "8小时前",
            source: "日经新闻"
        }
    ];
    
    newsContainer.innerHTML = news.map(item => `
        <div class="news-item">
            <div class="news-header">
                <h4 class="news-title">${item.title}</h4>
                <span class="news-time">${item.time}</span>
            </div>
            <p class="news-summary">${item.summary}</p>
            <div class="news-footer">
                <span class="news-source">${item.source}</span>
                <button class="read-more-btn">阅读更多</button>
            </div>
        </div>
    `).join('');
}

// 更新汇率数据
async function updateExchangeRates() {
    console.log('自动更新汇率数据...');
    await loadExchangeRates();
}

// 显示加载状态
function showLoadingState() {
    const loadingElements = document.querySelectorAll('.loading-indicator');
    loadingElements.forEach(el => el.style.display = 'block');
}

// 隐藏加载状态
function hideLoadingState() {
    const loadingElements = document.querySelectorAll('.loading-indicator');
    loadingElements.forEach(el => el.style.display = 'none');
}

// 显示错误消息
function showErrorMessage(message) {
    // 使用主页面已有的错误处理函数
    if (typeof showErrorMessage === 'function') {
        showErrorMessage(message);
    } else {
        console.error(message);
        alert(message);
    }
}

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
    console.log('汇率页面即将卸载');
});
