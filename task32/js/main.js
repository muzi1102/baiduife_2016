//点击改变radio的checked的值
function clickChecked(child,target,callback) {
    $(target).onclick = function(e) {
        if (e.target && e.target.nodeName == "INPUT" && e.target.className!=="TextName") {
            var arrRadio = $(child, target);
            for (var i = 0; i < arrRadio.length; i++) {
                arrRadio[i].checked = false;
            }
            e.target.checked = true;
            callback && callback();
            // console.log(getJsonData());
        }
    }
}
clickChecked('input','.type_select',function(){
	if (getCheckedClass('input','.type_select')=="text") {
		$('.TextName').value=getCheckedValue('input','.rules');
		return
	}
	$('.TextName').value=getCheckedValue('input','.type_select')
});
clickChecked('input','.isRequired')
clickChecked('input','.rules',function(){
	$('.TextName').value=getCheckedValue('input','.rules')	
})
//addBtn
function addBtn() {
	return getJsonData();
}
//addBtn click
$('.addBtn').onclick=function(){
	console.log(addBtn());
}
// 初始化函数
function init() {
	$('.TextName').value="文字"
}
init();
