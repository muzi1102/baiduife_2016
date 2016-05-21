$(function() {
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    var aqiData = {};
    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        //值不能为空，不能非法
        var aqi_city = $("#aqi-city-input").val(),
            aqi_value = $("#aqi-value-input").val();
        // console.log(/^[\u4e00-\u9fa5a-zA-Z\s]+$/.test(aqi_city));
        if (!/^[\u4e00-\u9fa5a-zA-Z\s*]+$/.test(aqi_city)) {
            alert("城市必须为中英文");
        }
        if (!/^[1-9]\d*\s*$/.test(aqi_value)) {
            alert("空气质量必须为正整数");
        }

        if (/^[\u4e00-\u9fa5a-zA-Z\s*]+$/.test(aqi_city) && /^[1-9]\d*\s*$/.test(aqi_value)) {
            aqiData[aqi_city] = aqi_value;
        }
    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        var html = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        if ($.isEmptyObject(aqiData)) {
        	html="";
        } else {
            for (var i in aqiData) {
                html += '<tr><td>' + i + '</td><td>' + aqiData[i] + '</td><td><button>删除</button></td><tr>'
            }
        }
        $("#aqi-table").html(html);
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle() {
        // do sth.remove sth for aqi-data;
        renderAqiList();
    }

    function init() {

        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        $("#add-btn").click(function() {
                addBtnHandle();
                $("#aqi-city-input").val('');
                $("#aqi-value-input").val('');
            })
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        $("#aqi-table").on("click", function(e) {
            if (e.target && e.target.nodeName=="BUTTON") {
            	var key=$(e.target).parent().siblings().eq(0).html();
            	 delete aqiData[key];
            }
            delBtnHandle();
        })

    }

    init();
})
