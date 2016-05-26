window.onload = function() {
    var data = [];
    var chart = document.getElementById('chart');
    var num = document.getElementById('number');
    var leftInBtn = document.getElementById('left-in');
    var rightInBtn = document.getElementById('right-in');
    var leftOutBtn = document.getElementById('left-out');
    var rightOutBtn = document.getElementById('right-out');
    var randomSortBtn = document.getElementById('random');
    var sortBtn = document.getElementById('sort');
    var Num;

    function isEmpty() {
        if (data.length > 0) {
            return false;
        }
        return true;
    }

    function leftIn() {
        if (validate(Num)) {
            data.unshift(Num);
            render();
        } else {
            alert('数据有误');
        }
    }

    function rightIn() {
        if (validate(Num)) {
            data.push(Num);
            console.log(data);
            render();
        } else {
            alert('数据有误');
        }
    }

    function leftOut() {
        if (!isEmpty()) {
            alert(data.shift())
            render();
        } else {
            alert('没有数据啦');
        }
    }

    function rightOut() {
        if (!isEmpty()) {
            alert(data.pop())
            render();
        } else {
            alert('没有数据啦');
        }
    }

    function randomSort() {
        data = [];
        buildInitData();
        render();
    }

    function bubbleSort() {
        var swapped;
        do {
            swapped = false;
            for (var i = 0; i < data.length - 1; i++) {
                if (data[i] > data[i + 1]) {
                    var temp = data[i + 1];
                    data[i + 1] = data[i];
                    data[i] = temp;
					render();
					swapped=true;
                }
            }
        } while (swapped)

    }

    function validate(num) {
        return /^\d+$/.test(num) && (num > 10 && num < 100);
    }

    function buildInitData() {
        for (var i = 0; i < 40; i++) {
            var num = parseInt((Math.random() * 200)) + 10;
            data.push(num);
        }
        return data;
    }

    function render() {
        if ((data.length > 60)) {
            alert('总数量不能超过60');
            return;
        }
        var html = "";
        data.map(function(item) {
            html += '<div style="background-color:' + getRandColorValue() + ';height:' + item + 'px"></div>'
        })

        chart.innerHTML = html;
    }

    function getRandColorValue() {
        var str = Math.ceil(Math.random() * 16777215).toString(16);
        while (str.length < 6) {
            str = '0' + str;
        }
        return "#" + str;
    }

    function init() {
        buildInitData();
        render();
    }
    init();
    // 点击事件
    leftInBtn.onclick = function() {
        Num = parseInt(num.value);
        leftIn();
    }
    rightInBtn.onclick = function() {
        Num = parseInt(num.value);
        rightIn();
    }
    leftOutBtn.onclick = function() {
        leftOut();
    }
    rightOutBtn.onclick = function() {
        rightOut();
    }
    randomSortBtn.onclick = function() {
        randomSort();
    }
    sortBtn.onclick = function() {
        // setInterval(sort,50);
        bubbleSort();
    }
}
