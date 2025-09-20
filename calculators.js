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
});
