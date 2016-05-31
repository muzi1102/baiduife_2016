
function getJsonData() {
	// 根据checked的到值
	var data={}
	if (isText('input','.type_select')) {
		data.type='text';
		data.isRequired=getCheckedClass('input','.isRequired');
		data.name=getCheckedValue('input','.type_select')
		data.rule=getCheckedClass('input','.rules');
		data.len=getTextLen('input','.limitLen');
	}else{
		data.type=getCheckedClass('input','.type_select');
		data.options=getOption();
		data.isRequired=getCheckedClass('input','.isRequired');
		data.name=getCheckedValue('input','.type_select')
	}
	return data;
}
// console.log(getJsonData());
// 获取长度限制的2个value值
function getTextLen(childs,parent) {
	var arrLen=[]
	var len=$(childs,parent);
	for (var i = 0; i < len.length; i++) {
		arrLen.push(len[i].value)
	}
	return arrLen;
}
// 获取下拉框的选项

function $(selector,parent) {
	return parent?document.querySelector(parent).querySelectorAll(selector):document.querySelector(selector);
}
/**
 * [getCheckedClass 得到checked元素的类型]
 * @param  {[type]} childs [子元素]
 * @param  {[type]} parent [夫元素]
 * @return {[String]}        [type]
 */
function getCheckedClass(childs,parent) {
	 var arr=$(childs,parent);
	 for (var i = 0; i < arr.length; i++) {
	 	if (arr[i].checked) {
	 		return arr[i].className;
	 	}
	 }
}
/**
 * [isText 判断当前选中的radio是否为text的类型]
 * @param  {[type]}  childs [子元素]
 * @param  {[type]}  parent [父元素]
 * @return {Boolean}        [boolean]
 */
function isText(childs,parent) {
	if (getCheckedClass(childs,parent)=='text') {
		return true
	}
	return false
}
// 获取选中元素的textContent
function getCheckedValue(childs,parent) {
	 var arr=$(childs,parent);
	 for (var i = 0; i < arr.length; i++) {
	 	if (arr[i].checked) {
	 		return arr[i].parentNode.textContent.trim();
	 	}
	 }
}
// option 
var ops=[];
$('.option').onchange=function(){
	if (/^[0-9a-zA-Z\u4E00-\u9FA5]+$/) {
		console.log('aaa')
	    ops.push(this.value)
	    renderOp(ops)
	}
	return false
}
function renderOp(data) {
	var html="";
	    data.map(function(item){
	    	html+='<span>'+item+'</span>'
		})
		$('.options').innerHTML=html;
}
