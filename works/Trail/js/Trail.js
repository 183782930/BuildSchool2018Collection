var Calculation = function()
{
    var _loanAmount;//貸款本金
    var _annualRate;//年利率
    var _monthRate;//月利率
    var _month;//月數
    var _amortizationRate;//每月應付本息金額之平均攤還率

    //貸款本金屬性
    this.getloanAmount = function()
    {
        return _loanAmount;
    };
    this.setloanAmount = function(LoanAmount)
    {
        _loanAmount = LoanAmount;
    };
    
    //年利率屬性
    this.getannualRate = function()
    {
        return _annualRate;
    };
    this.setannualRate = function(AnnualRate)
    {
        _annualRate = AnnualRate;
    };

    this.getmonth = function()
    {
        return _month;
    };
    this.setmonth = function(Month)
    {
        _month = Month;
    };
    
    function data()
    {   
        _monthRate = _annualRate/12;
        _amortizationRate = ((Math.pow(1 + _monthRate,_month))*_monthRate)/((Math.pow(1 + _monthRate,_month))-1);
    }
    //每月應攤付本息金額
    this.amortizationAmount = function(){
        data();
        return Math.floor(_loanAmount * _amortizationRate);
    };
    //應付總本息
    this.totalAmount = function(){
        return Math.floor(this.amortizationAmount() * _month);
    };
    //每月利息費用
    this.monthlyPayRateAmount = function(){
        return Math.floor(this.amortizationAmount() - _loanAmount / _month);
    };
};

document.getElementById("compute").onclick = function()
{
    var item = new Calculation();
    item.setloanAmount(parseFloat(document.getElementById("inputAmount").value));
    item.setmonth(parseFloat(document.getElementById("inputMonth").value));
    item.setannualRate(parseFloat(document.getElementById("inputRate").value));
    document.getElementById("outputAmount").value = item.amortizationAmount();
    document.getElementById("outputTotalAmount").value = item.totalAmount();
    document.getElementById("outputInterest").value = item.monthlyPayRateAmount();
};