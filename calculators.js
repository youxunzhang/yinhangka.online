// 计算器功能脚本
// 该文件在贷款利率和信用卡分期计算器页面中使用

document.addEventListener('DOMContentLoaded', () => {
    const currencyFormatter = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const decimalFormatter = new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const integerFormatter = new Intl.NumberFormat('zh-CN', {
        maximumFractionDigits: 0
    });

    const generalNumberFormatter = new Intl.NumberFormat('zh-CN', {
        maximumFractionDigits: 12,
        useGrouping: true
    });

    const sanitizeNumber = (value, fallback = 0) => (Number.isFinite(value) ? value : fallback);
    const clampToZero = (value) => {
        if (!Number.isFinite(value)) {
            return 0;
        }

        return value < 0 ? 0 : value;
    };

    const formatCurrency = (value) => currencyFormatter.format(sanitizeNumber(value));
    const formatPercent = (value) => `${decimalFormatter.format(sanitizeNumber(value))}%`;
    const formatInteger = (value) => integerFormatter.format(sanitizeNumber(value));
    const formatGeneralNumber = (value) => {
        if (!Number.isFinite(value)) {
            return '—';
        }

        const absValue = Math.abs(value);

        if (absValue !== 0 && (absValue >= 1e12 || absValue < 1e-6)) {
            return value.toExponential(6).replace('+', '');
        }

        return generalNumberFormatter.format(value);
    };

    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (match) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[match]);

    const renderError = (container, message) => {
        container.innerHTML = `
            <div class="error-text">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                <span>${message}</span>
            </div>
        `;
    };

    // 贷款利率计算器
    const loanForm = document.getElementById('loan-calculator-form');
    const loanResults = document.getElementById('loan-results');

    if (loanForm && loanResults) {
        const amountInput = document.getElementById('loan-amount');
        const rateInput = document.getElementById('loan-rate');
        const termInput = document.getElementById('loan-term');
        const termUnitSelect = document.getElementById('loan-term-unit');

        let hasCalculated = false;

        const calculateLoan = () => {
            const principal = parseFloat(amountInput.value);
            const annualRate = parseFloat(rateInput.value);
            const termValue = parseFloat(termInput.value);
            const termUnit = termUnitSelect ? termUnitSelect.value : 'years';

            if (!Number.isFinite(principal) || principal <= 0) {
                renderError(loanResults, '请输入有效的贷款总额。');
                return;
            }

            if (!Number.isFinite(annualRate) || annualRate < 0) {
                renderError(loanResults, '请输入正确的年化利率。');
                return;
            }

            if (!Number.isFinite(termValue) || termValue <= 0) {
                renderError(loanResults, '请输入正确的贷款期限。');
                return;
            }

            const totalMonthsRaw = termUnit === 'months' ? termValue : termValue * 12;
            const totalMonths = Math.round(totalMonthsRaw);

            if (!Number.isFinite(totalMonths) || totalMonths <= 0) {
                renderError(loanResults, '贷款期限需要大于 0。');
                return;
            }

            const monthlyRate = annualRate / 12 / 100;
            const isZeroRate = Math.abs(monthlyRate) < 1e-8;

            let monthlyPayment;

            if (isZeroRate) {
                monthlyPayment = principal / totalMonths;
            } else {
                const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
                monthlyPayment = principal * monthlyRate * compoundFactor / (compoundFactor - 1);
            }

            const totalPayment = monthlyPayment * totalMonths;
            const totalInterest = totalPayment - principal;
            const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

            const monthsToDisplay = Math.min(totalMonths, 12);
            const amortizationRows = [];
            let remainingPrincipal = principal;

            for (let month = 1; month <= monthsToDisplay; month += 1) {
                const interestPayment = isZeroRate ? 0 : remainingPrincipal * monthlyRate;
                let principalPayment = monthlyPayment - interestPayment;

                if (principalPayment > remainingPrincipal) {
                    principalPayment = remainingPrincipal;
                }

                remainingPrincipal = clampToZero(remainingPrincipal - principalPayment);

                amortizationRows.push({
                    month,
                    payment: monthlyPayment,
                    interest: interestPayment,
                    principal: principalPayment,
                    remaining: remainingPrincipal
                });
            }

            const firstMonthInterest = amortizationRows.length
                ? amortizationRows[0].interest
                : monthlyPayment - (principal / totalMonths);

            const termYears = Math.floor(totalMonths / 12);
            const termMonthsRemainder = totalMonths % 12;
            let termDescription = `${formatInteger(totalMonths)} 期`;

            if (termYears > 0) {
                termDescription += '（约 ';
                termDescription += `${termYears} 年`;

                if (termMonthsRemainder > 0) {
                    termDescription += ` ${termMonthsRemainder} 个月`;
                }

                termDescription += '）';
            }

            const rowsHtml = amortizationRows.map((row) => `
                <tr>
                    <td>${row.month}</td>
                    <td>${formatCurrency(row.payment)}</td>
                    <td>${formatCurrency(row.interest)}</td>
                    <td>${formatCurrency(row.principal)}</td>
                    <td>${formatCurrency(row.remaining)}</td>
                </tr>
            `).join('');

            loanResults.innerHTML = `
                <div class="result-summary">
                    <div class="result-item">
                        <span class="result-label">预计每月还款</span>
                        <span class="result-value">${formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">总计利息支出</span>
                        <span class="result-value">${formatCurrency(totalInterest)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">累计还款总额</span>
                        <span class="result-value">${formatCurrency(totalPayment)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">首月利息</span>
                        <span class="result-value">${formatCurrency(firstMonthInterest)}</span>
                    </div>
                </div>
                <div class="result-breakdown">
                    <p class="result-note">共 ${termDescription}，利息支出约占总还款的 ${formatPercent(interestRatio)}。当前计算默认采用等额本息还款方式。</p>
                    <h4>前 ${monthsToDisplay} 期还款计划预览</h4>
                    <div class="result-table-wrapper">
                        <table class="result-table">
                            <thead>
                                <tr>
                                    <th>期数</th>
                                    <th>每期应还</th>
                                    <th>其中利息</th>
                                    <th>其中本金</th>
                                    <th>剩余本金</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                    ${totalMonths > monthsToDisplay ? `<p class="result-note">剩余 ${formatInteger(totalMonths - monthsToDisplay)} 期将继续以相同月供偿还，利息占比逐月下降。</p>` : ''}
                    <p class="result-note">提示：实际月供可能因银行四舍五入规则存在微小差异，请以银行出具的还款计划为准。</p>
                </div>
            `;
        };

        loanForm.addEventListener('submit', (event) => {
            event.preventDefault();
            hasCalculated = true;
            calculateLoan();
        });

        loanForm.addEventListener('input', () => {
            if (hasCalculated) {
                calculateLoan();
            }
        });
    }

    // 60 年期房贷计算器
    const mortgage60Form = document.getElementById('mortgage-60-form');
    const mortgage60Results = document.getElementById('mortgage-60-results');

    if (mortgage60Form && mortgage60Results) {
        const priceInput = document.getElementById('mortgage-property-price');
        const downPaymentInput = document.getElementById('mortgage-down-payment');
        const annualRateInput = document.getElementById('mortgage-annual-rate');

        let hasCalculated = false;

        const calculateMortgage60 = () => {
            const propertyPrice = parseFloat(priceInput.value);
            const downPaymentRate = parseFloat(downPaymentInput.value);
            const annualRate = parseFloat(annualRateInput.value);

            if (!Number.isFinite(propertyPrice) || propertyPrice <= 0) {
                renderError(mortgage60Results, '请输入有效的房屋总价。');
                return;
            }

            if (!Number.isFinite(downPaymentRate) || downPaymentRate < 0 || downPaymentRate >= 100) {
                renderError(mortgage60Results, '首付比例需在 0% 至 99% 之间。');
                return;
            }

            if (!Number.isFinite(annualRate) || annualRate < 0) {
                renderError(mortgage60Results, '请输入正确的贷款年化利率。');
                return;
            }

            const downPaymentAmount = propertyPrice * (downPaymentRate / 100);
            const principal = propertyPrice - downPaymentAmount;

            if (!Number.isFinite(principal) || principal <= 0) {
                renderError(mortgage60Results, '首付比例过高或房屋总价过低，无法形成有效贷款本金。');
                return;
            }

            const totalMonths = 60 * 12;
            const monthlyRate = annualRate / 12 / 100;
            const isZeroRate = Math.abs(monthlyRate) < 1e-8;

            let monthlyPayment;

            if (isZeroRate) {
                monthlyPayment = principal / totalMonths;
            } else {
                const compoundFactor = Math.pow(1 + monthlyRate, totalMonths);
                monthlyPayment = principal * monthlyRate * compoundFactor / (compoundFactor - 1);
            }

            const totalPayment = monthlyPayment * totalMonths;
            const totalInterest = totalPayment - principal;
            const totalCost = totalPayment + downPaymentAmount;
            const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

            const monthsToDisplay = Math.min(totalMonths, 12);
            const amortizationRows = [];
            let remainingPrincipal = principal;

            for (let month = 1; month <= monthsToDisplay; month += 1) {
                const interestPayment = isZeroRate ? 0 : remainingPrincipal * monthlyRate;
                let principalPayment = monthlyPayment - interestPayment;

                if (principalPayment > remainingPrincipal) {
                    principalPayment = remainingPrincipal;
                }

                remainingPrincipal = clampToZero(remainingPrincipal - principalPayment);

                amortizationRows.push({
                    month,
                    payment: monthlyPayment,
                    interest: interestPayment,
                    principal: principalPayment,
                    remaining: remainingPrincipal,
                });
            }

            const rowsHtml = amortizationRows.map((row) => `
                <tr>
                    <td>${row.month}</td>
                    <td>${formatCurrency(row.payment)}</td>
                    <td>${formatCurrency(row.interest)}</td>
                    <td>${formatCurrency(row.principal)}</td>
                    <td>${formatCurrency(row.remaining)}</td>
                </tr>
            `).join('');

            mortgage60Results.innerHTML = `
                <div class="result-summary">
                    <div class="result-item">
                        <span class="result-label">贷款本金</span>
                        <span class="result-value">${formatCurrency(principal)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">预计每月还款</span>
                        <span class="result-value">${formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">累计利息支出</span>
                        <span class="result-value">${formatCurrency(totalInterest)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">累计还款总额</span>
                        <span class="result-value">${formatCurrency(totalPayment)}</span>
                    </div>
                </div>
                <div class="result-breakdown">
                    <p class="result-note">方案基于 60 年（720 期）等额本息还款，利息约占总还款的 ${formatPercent(interestRatio)}。首付金额约为 ${formatCurrency(downPaymentAmount)}，整体购房总成本约 ${formatCurrency(totalCost)}。</p>
                    <h4>前 ${monthsToDisplay} 期还款计划预览</h4>
                    <div class="result-table-wrapper">
                        <table class="result-table">
                            <thead>
                                <tr>
                                    <th>期数</th>
                                    <th>每期应还</th>
                                    <th>其中利息</th>
                                    <th>其中本金</th>
                                    <th>剩余本金</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                    <p class="result-note">剩余 ${formatInteger(totalMonths - monthsToDisplay)} 期仍将按照相同月供偿还，本金占比会随着期数增加逐步提升。</p>
                    <p class="result-note">提示：实际批贷利率、首付比例以及银行四舍五入规则可能导致结果存在差异，请以银行出具的还款计划为准。</p>
                </div>
            `;
        };

        mortgage60Form.addEventListener('submit', (event) => {
            event.preventDefault();
            hasCalculated = true;
            calculateMortgage60();
        });

        mortgage60Form.addEventListener('input', () => {
            if (hasCalculated) {
                calculateMortgage60();
            }
        });
    }

    // 信用卡分期计算器
    const installmentForm = document.getElementById('installment-calculator-form');
    const installmentResults = document.getElementById('installment-results');

    if (installmentForm && installmentResults) {
        const amountInput = document.getElementById('installment-amount');
        const monthsInput = document.getElementById('installment-months');
        const feeRateInput = document.getElementById('installment-fee-rate');

        let hasCalculated = false;

        const calculateInstallment = () => {
            const amount = parseFloat(amountInput.value);
            const months = parseInt(monthsInput.value, 10);
            const feeRate = parseFloat(feeRateInput.value);

            if (!Number.isFinite(amount) || amount <= 0) {
                renderError(installmentResults, '请输入有效的分期总金额。');
                return;
            }

            if (!Number.isFinite(months) || months <= 0) {
                renderError(installmentResults, '请输入正确的分期期数。');
                return;
            }

            if (!Number.isFinite(feeRate) || feeRate < 0) {
                renderError(installmentResults, '请输入正确的手续费率。');
                return;
            }

            const monthlyFeeRate = feeRate / 100;
            const basePrincipal = amount / months;
            const monthlyFee = amount * monthlyFeeRate;
            const monthlyPayment = basePrincipal + monthlyFee;
            const totalFee = monthlyFee * months;
            const totalPayment = amount + totalFee;
            const annualizedRate = months > 0 ? (totalFee / amount) / (months / 12) * 100 : 0;

            const scheduleRows = [];
            let accumulatedPrincipal = 0;

            for (let period = 1; period <= months; period += 1) {
                let principalPayment = basePrincipal;

                if (period === months) {
                    principalPayment = amount - accumulatedPrincipal;
                }

                accumulatedPrincipal += principalPayment;
                const remainingPrincipal = clampToZero(amount - accumulatedPrincipal);
                const payment = principalPayment + monthlyFee;

                scheduleRows.push({
                    period,
                    payment,
                    principal: principalPayment,
                    fee: monthlyFee,
                    remaining: remainingPrincipal
                });
            }

            const rowsHtml = scheduleRows.map((row) => `
                <tr>
                    <td>${row.period}</td>
                    <td>${formatCurrency(row.payment)}</td>
                    <td>${formatCurrency(row.principal)}</td>
                    <td>${formatCurrency(row.fee)}</td>
                    <td>${formatCurrency(row.remaining)}</td>
                </tr>
            `).join('');

            installmentResults.innerHTML = `
                <div class="result-summary">
                    <div class="result-item">
                        <span class="result-label">每期应还金额</span>
                        <span class="result-value">${formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">每期手续费</span>
                        <span class="result-value">${formatCurrency(monthlyFee)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">累计手续费</span>
                        <span class="result-value">${formatCurrency(totalFee)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">折算年化费率</span>
                        <span class="result-value">${formatPercent(annualizedRate)}</span>
                    </div>
                </div>
                <div class="result-breakdown">
                    <p class="result-note">共 ${formatInteger(months)} 期分期，假设手续费按每期固定比例收取且不提前还清。</p>
                    <div class="result-table-wrapper">
                        <table class="result-table">
                            <thead>
                                <tr>
                                    <th>期数</th>
                                    <th>每期应还</th>
                                    <th>其中本金</th>
                                    <th>分期手续费</th>
                                    <th>剩余本金</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                    <p class="result-note">说明：部分银行可能一次性收取手续费，实际费率以发卡行公布信息为准。</p>
                </div>
            `;
        };

        installmentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            hasCalculated = true;
            calculateInstallment();
        });

        installmentForm.addEventListener('input', () => {
            if (hasCalculated) {
                calculateInstallment();
            }
        });
    }

    // 通用科学计算器
    const generalCalculatorElement = document.querySelector('[data-calculator]');

    if (generalCalculatorElement) {
        const expressionElement = generalCalculatorElement.querySelector('[data-expression]');
        const previewElement = generalCalculatorElement.querySelector('[data-preview]');
        const statusElement = generalCalculatorElement.querySelector('[data-calculator-status]');
        const utilitiesElement = generalCalculatorElement.querySelector('.general-calculator__utilities');
        const historyList = generalCalculatorElement.closest('.calculator-card')
            ? generalCalculatorElement.closest('.calculator-card').querySelector('[data-calculator-history]')
            : null;

        let expression = '';
        let previewValue = 0;
        let lastAction = 'input';
        const history = [];

        const isOperator = (value) => ['+', '-', '*', '/'].includes(value);

        const formatDisplayExpression = (value) => value
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/\(/g, '（')
            .replace(/\)/g, '）');

        const clearStatus = () => {
            if (statusElement) {
                statusElement.textContent = '';
                statusElement.className = 'general-calculator__status';
            }
        };

        const showStatus = (message, variant = 'info') => {
            if (!statusElement) {
                return;
            }

            statusElement.textContent = message;
            statusElement.className = `general-calculator__status general-calculator__status--${variant}`;
        };

        const updateDisplay = () => {
            if (expressionElement) {
                expressionElement.textContent = expression || '0';
            }
        };

        const evaluateExpression = (rawExpression) => {
            const normalized = rawExpression.replace(/\s+/g, '');

            if (!normalized) {
                return 0;
            }

            if (!/^[0-9+\-*/().%]*$/.test(normalized)) {
                throw new Error('表达式包含非法字符。');
            }

            const percentConverted = normalized.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
            // eslint-disable-next-line no-new-func
            const result = Function(`"use strict"; return (${percentConverted});`)();

            if (!Number.isFinite(result)) {
                throw new Error('结果无效，请检查输入。');
            }

            return result;
        };

        const updatePreview = () => {
            if (!previewElement) {
                return;
            }

            if (!expression) {
                previewValue = 0;
                previewElement.textContent = '预览：0';
                clearStatus();
                return;
            }

            try {
                const value = evaluateExpression(expression);
                previewValue = value;
                previewElement.textContent = `预览：${formatGeneralNumber(value)}`;
                clearStatus();
            } catch (error) {
                previewValue = null;
                previewElement.textContent = '预览：--';
            }
        };

        const recordHistory = (raw, result, displayOverride = null) => {
            if (!historyList) {
                return;
            }

            const displayExpression = displayOverride || formatDisplayExpression(raw);
            const historyItem = {
                raw,
                display: displayExpression,
                result
            };

            history.unshift(historyItem);

            if (history.length > 10) {
                history.pop();
            }

            if (!history.length) {
                historyList.innerHTML = '<li class="calc-history__placeholder">暂无历史记录，开始输入查看结果吧。</li>';
                return;
            }

            const historyHtml = history.map((item) => {
                const encodedExpression = encodeURIComponent(item.raw);
                const encodedResult = Number.isFinite(item.result)
                    ? Number(item.result).toString()
                    : '0';

                return `
                    <li class="calc-history__item" data-history-item data-expression="${encodedExpression}" data-result="${encodedResult}">
                        <span class="calc-history__expression">${escapeHtml(item.display)}</span>
                        <span class="calc-history__equals">=</span>
                        <span class="calc-history__result">${formatGeneralNumber(item.result)}</span>
                        <button type="button" class="calc-history__copy" data-history-copy aria-label="复制结果">
                            <i class="fas fa-copy" aria-hidden="true"></i>
                        </button>
                    </li>
                `;
            }).join('');

            historyList.innerHTML = historyHtml || '<li class="calc-history__placeholder">暂无历史记录，开始输入查看结果吧。</li>';
        };

        const copyToClipboard = async (text) => {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                    return true;
                }
            } catch (error) {
                // 忽略错误并尝试后备方案
            }

            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', 'readonly');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);

            let succeeded = false;

            try {
                textarea.select();
                succeeded = document.execCommand('copy');
            } catch (error) {
                succeeded = false;
            }

            textarea.remove();

            return succeeded;
        };

        const resetCalculator = () => {
            expression = '';
            previewValue = 0;
            lastAction = 'input';
            updateDisplay();
            updatePreview();
        };

        const handleAppendValue = (value) => {
            if (!value) {
                return;
            }

            if (lastAction === 'evaluate' && !isOperator(value) && value !== ')' && value !== '%') {
                expression = '';
            }

            lastAction = 'input';

            if (value === '.') {
                const parts = expression.split(/[+\-*/()%]/);
                const lastPart = parts[parts.length - 1];

                if (lastPart && lastPart.includes('.')) {
                    return;
                }

                if (!expression || /[()+\-*/]$/.test(expression)) {
                    expression += '0.';
                } else {
                    expression += '.';
                }

                updateDisplay();
                updatePreview();
                return;
            }

            if (value === '(') {
                if (!expression || /[+\-*/(]$/.test(expression)) {
                    expression += '(';
                } else {
                    expression += '*(';
                }

                updateDisplay();
                updatePreview();
                return;
            }

            if (value === ')') {
                const openCount = (expression.match(/\(/g) || []).length;
                const closeCount = (expression.match(/\)/g) || []).length;
                const lastChar = expression.slice(-1);

                if (openCount > closeCount && !isOperator(lastChar) && lastChar !== '(') {
                    expression += ')';
                    updateDisplay();
                    updatePreview();
                }

                return;
            }

            if (isOperator(value)) {
                if (!expression) {
                    if (value === '-') {
                        expression = '-';
                    }
                } else if (isOperator(expression.slice(-1))) {
                    expression = `${expression.slice(0, -1)}${value}`;
                } else {
                    expression += value;
                }

                updateDisplay();
                updatePreview();
                return;
            }

            if (value === '%') {
                const lastChar = expression.slice(-1);

                if (!lastChar || /[+\-*/(]/.test(lastChar)) {
                    showStatus('请在数字或右括号后使用百分比。', 'error');
                    return;
                }

                if (lastChar === '%') {
                    showStatus('请勿连续输入百分号。', 'error');
                    return;
                }

                expression += '%';
                updateDisplay();
                updatePreview();
                return;
            }

            if (expression === '0' && value !== '.') {
                expression = value;
            } else {
                expression += value;
            }

            updateDisplay();
            updatePreview();
        };

        const handleDelete = () => {
            if (!expression) {
                return;
            }

            expression = expression.slice(0, -1);
            lastAction = 'input';
            updateDisplay();
            updatePreview();
        };

        const handleEquals = () => {
            if (!expression) {
                showStatus('请输入需要计算的表达式。', 'error');
                return;
            }

            try {
                const displayExpression = formatDisplayExpression(expression);
                const result = evaluateExpression(expression);
                const normalized = Number(result.toPrecision(12));
                expression = Number.isFinite(normalized) ? normalized.toString() : '0';
                previewValue = normalized;
                lastAction = 'evaluate';
                updateDisplay();
                updatePreview();
                recordHistory(expression, normalized, displayExpression);
                showStatus('计算完成，结果已更新。', 'success');
            } catch (error) {
                showStatus(error.message || '计算失败，请检查输入。', 'error');
            }
        };

        const applyUnaryOperation = (operation) => {
            if (!Number.isFinite(previewValue)) {
                showStatus('表达式不完整，无法执行该操作。', 'error');
                return;
            }

            const baseDisplay = expression ? formatDisplayExpression(expression) : formatGeneralNumber(previewValue);
            let result;
            let displayLabel;
            let successMessage;

            if (operation === 'negate') {
                result = -previewValue;
                displayLabel = `±(${baseDisplay})`;
                successMessage = '已取相反数。';
            } else if (operation === 'square') {
                result = previewValue * previewValue;
                displayLabel = `${baseDisplay}²`;
                successMessage = '平方计算完成。';
            } else if (operation === 'sqrt') {
                if (previewValue < 0) {
                    showStatus('负数无法开平方，请检查输入。', 'error');
                    return;
                }

                result = Math.sqrt(previewValue);
                displayLabel = `√(${baseDisplay})`;
                successMessage = '平方根计算完成。';
            } else if (operation === 'reciprocal') {
                if (previewValue === 0) {
                    showStatus('0 没有倒数，请先输入其他数值。', 'error');
                    return;
                }

                result = 1 / previewValue;
                displayLabel = `1/(${baseDisplay})`;
                successMessage = '倒数计算完成。';
            } else {
                return;
            }

            if (!Number.isFinite(result)) {
                showStatus('结果无效，请检查输入。', 'error');
                return;
            }

            const normalized = Number(result.toPrecision(12));
            expression = normalized.toString();
            previewValue = normalized;
            lastAction = 'evaluate';
            updateDisplay();
            updatePreview();
            recordHistory(expression, normalized, displayLabel);
            showStatus(successMessage, 'success');
        };

        const handleCopy = () => {
            if (!Number.isFinite(previewValue)) {
                showStatus('暂无可复制的结果，请先完成计算。', 'error');
                return;
            }

            const text = Number(previewValue.toPrecision(12)).toString();

            copyToClipboard(text).then((succeeded) => {
                if (succeeded) {
                    showStatus('结果已复制到剪贴板。', 'success');
                } else {
                    showStatus('复制失败，请手动选择文本。', 'error');
                }
            });
        };

        const clearHistoryRecords = () => {
            history.length = 0;

            if (historyList) {
                historyList.innerHTML = '<li class="calc-history__placeholder">暂无历史记录，开始输入查看结果吧。</li>';
            }

            showStatus('历史记录已清空。', 'info');
        };

        generalCalculatorElement.addEventListener('click', (event) => {
            const button = event.target.closest('.calc-btn');

            if (!button) {
                return;
            }

            const { action } = button.dataset;
            const { value } = button.dataset;

            if (action === 'clear') {
                resetCalculator();
                showStatus('已清空表达式。', 'info');
                return;
            }

            if (action === 'delete') {
                handleDelete();
                return;
            }

            if (action === 'equals') {
                handleEquals();
                return;
            }

            if (action === 'negate' || action === 'square' || action === 'sqrt' || action === 'reciprocal') {
                applyUnaryOperation(action);
                return;
            }

            if (action === 'percent') {
                handleAppendValue('%');
                return;
            }

            if (typeof value === 'string') {
                handleAppendValue(value);
            }
        });

        if (utilitiesElement) {
            utilitiesElement.addEventListener('click', (event) => {
                const button = event.target.closest('.calc-utility');

                if (!button) {
                    return;
                }

                if (button.dataset.action === 'copy') {
                    handleCopy();
                } else if (button.dataset.action === 'clear-history') {
                    clearHistoryRecords();
                }
            });
        }

        if (historyList) {
            historyList.addEventListener('click', (event) => {
                const copyButton = event.target.closest('[data-history-copy]');

                if (copyButton) {
                    const item = copyButton.closest('[data-history-item]');

                    if (!item) {
                        return;
                    }

                    const value = Number(item.dataset.result);
                    const text = Number.isFinite(value) ? Number(value.toPrecision(12)).toString() : '0';

                    copyToClipboard(text).then((succeeded) => {
                        if (succeeded) {
                            showStatus('结果已复制到剪贴板。', 'success');
                        } else {
                            showStatus('复制失败，请手动选择文本。', 'error');
                        }
                    });

                    event.stopPropagation();
                    return;
                }

                const item = event.target.closest('[data-history-item]');

                if (!item) {
                    return;
                }

                try {
                    const rawExpression = decodeURIComponent(item.dataset.expression || '');

                    if (rawExpression) {
                        expression = rawExpression;
                        lastAction = 'history';
                        updateDisplay();
                        updatePreview();
                        showStatus('已载入历史记录，可继续编辑。', 'info');
                    }
                } catch (error) {
                    showStatus('历史记录解析失败，请手动输入。', 'error');
                }
            });
        }

        document.addEventListener('keydown', (event) => {
            const activeElement = document.activeElement;

            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable)) {
                return;
            }

            if (event.key >= '0' && event.key <= '9') {
                handleAppendValue(event.key);
                return;
            }

            if (['+', '-', '*', '/'].includes(event.key)) {
                handleAppendValue(event.key);
                event.preventDefault();
                return;
            }

            if (event.key === 'Enter') {
                handleEquals();
                event.preventDefault();
                return;
            }

            if (event.key === 'Backspace') {
                handleDelete();
                return;
            }

            if (event.key === 'Escape') {
                resetCalculator();
                showStatus('已清空表达式。', 'info');
                return;
            }

            if (event.key === '.') {
                handleAppendValue('.');
            } else if (event.key === '(' || event.key === ')') {
                handleAppendValue(event.key);
            } else if (event.key === '%') {
                handleAppendValue('%');
            }
        });

        // 初始化显示
        resetCalculator();

        if (historyList) {
            historyList.innerHTML = '<li class="calc-history__placeholder">暂无历史记录，开始输入查看结果吧。</li>';
        }
    }
});
