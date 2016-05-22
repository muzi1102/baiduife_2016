/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};
var chartWrap = document.getElementById('aqi-chart-wrap');
var city_select = document.getElementById('city-select');
var form_gra_time = document.getElementById('form-gra-time');
var nowCityData = {};
// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(chartData) {
    var html = "";
    for (var i in chartData) {
        html += '<div style="background-color:' + getRandColorValue() + ';height:' + chartData[i] + "px" + ';width:10px" ></div>';
    }
    chartWrap.innerHTML = html;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(dateSelect) {
    // 确定是否选项发生了变化 
    if (pageState.nowGraTime == dateSelect) {
        return false;
    } else {
        pageState.nowGraTime = dateSelect
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart(chartData);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(place) {
    // 确定是否选项发生了变化 
    if (pageState.nowSelectCity == place) {
        return false;
    } else {
        pageState.nowSelectCity = place
    }
    // 设置对应数据
    nowCityData = aqiSourceData[pageState.nowSelectCity];
    chartData = nowCityData;
    // 调用图表渲染函数
    renderChart(chartData)
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    // change
    form_gra_time.onclick = function(e) {
        if (e.target && e.target.nodeName == "INPUT") {
            graTimeChange(e.target.valuet)
        }
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    initAqiChartData();
    renderChart(chartData)
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city_select.onchange = function() {
        citySelectChange(this.value);
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    nowCityData = aqiSourceData[pageState.nowSelectCity];
    // 处理好的数据存到 chartData 中
    if (pageState.nowGraTime == "day") {
        chartData = nowCityData;
    }
    if (pageState.nowGraTime == "week") {
        chartData = {};
        var countSum = 0,
            daySum = 0,
            week = 0;
        for (var i in nowCityData) {
            daySum++
            countSum += nowCityData[i]
            if (new Date(i).getDay() == 6) {
                week++;
                chartData['第' + week + '周'] = Math.floor(countSum / daySum);
                countSum = 0, daySum = 0;
            }
        }
        if (daySum != 0) {
            week++;
            chartData['第' + week + '周'] = Math.floor(countSum / daySum);
        }
    }
    if (pageState.nowGraTime == 'month') {
        chartData = {};
        var countSum = 0,
            daySum = 0,
            month = 0;
        for (var i in nowCityData) {
            daySum++;
            countSum += nowCityData[i]
            if ((new Date(i).getMonth()) != month) {
                month++;
                chartData['第' + month + '月'] = Math.floor(countSum / daySum);
                countSum = 0, daySum = 0;
            }
        }
        if (daySum != 0) {
            month++;
            chartData['第' + month + '月'] = Math.floor(countSum / daySum);
        }
    }
}
// 随机颜色函数
function getRandColorValue() {
    var str = Math.ceil(Math.random() * 16777215).toString(16);
    while (str.length < 6) {
        str = '0' + str;
    }
    return "#" + str;
}
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
