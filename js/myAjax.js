// JavaScript Document
//==============================================================================
/*				Ajax 公用错误回调函数,可以定义错误时的事件
	建档时间：2007-4-30
	最后修改时间：2007-4-30
	作者：玲玲	bbs.jkid.com.cn
	说明：
		在mynormalAjax(url,pars,div)函数中的onFailure事件和onSuccess事件中调用
		也可以自行调用
	建议：
		以下函数一般不要作任何修改
*///============================================================================
function reportError(request){
	alert('很抱歉，不能读取数据，请稍后再试！');
	setStatusBar("数据库连接失败...");
}
function reportSuccess(request){
	setStatusBar("数据更新成功~");
}
//==============================================================================
/*				Ajax  公用调用函数,一般情况下都可以使用
	建档时间：2007-4-30
	最后修改时间：2007-4-30
	作者：玲玲	bbs.jkid.com.cn
	说明：
		进行异步读取数据使用。只要传入3个参数即可
		url为数据来源的网页地址
		pars为需要传递的参数组成的字符串，格式和url地址栏参数一样
		（参数必须使用Ajaxaddpars_XXXX系列函数进行组合）
		div为DOM元素的id，用于装载返回数据的容器
	建议：
		以下函数一般不要作任何修改
*///============================================================================
function mynormalAjax(url,pars,div){
	setStatusBar("正在连接数据库......");
	var myAjax = new Ajax.Updater(
						{success: div},
						url,
						{
							method: 'post',
							parameters: pars,
							evalScripts: true,
							onFailure: reportError,
							onSuccess: reportSuccess
						}
					);
	return false;
}
//====================================================================================================
// ajax 添加参数专用 根据不同类型的对象取得相应的值
//====================================================================================================
//自动根据不同类型的对象取得相应的值(需要传入formname)
function ajaxaddpars_formInput(formname,argname,pars,target_id){
	var target_obj = $(target_id);
	if(target_obj){
		var inputType = target_obj.type;
		if(inputType){
			switch(inputType){
				case "text":
					pars = ajaxaddpars_formtext(argname,pars,target_id);
					break;
				case "select":
					pars = ajaxaddpars_formselect(argname,pars,target_id);
					break;
				case "checkbox":
					pars = ajaxaddpars_formcheckbox(argname,pars,target_id);
					break;
				case "radio":
					var targetname = target_obj.name;
					pars = ajaxaddpars_formradio(formname,argname,pars,targetname);
					break;
				default:
					pars = ajaxaddpars_formtext(argname,pars,target_id);
					break;
			}
		}else{
			pars = ajaxaddpars_formtext(argname,pars,target_id);
		}
	}
	return pars;
}

//--------------------------------------------------------------------------
//添加文本框（text/textarea）
function ajaxaddpars_formtext(argname,pars,target_id){
	if($(target_id)){
		if(pars!="") pars += "&";
		pars += argname + "=" + mycommonfilt(encodeURI($F(target_id)));
	}
	return pars;
}

//添加下拉菜单（select）(支持多选)
function ajaxaddpars_formselect(argname,pars,target_id){
	var target_obj = $(target_id);
	if(target_obj){
		for(var i = 0; i < target_obj.options.length; i++){
			if(target_obj.options[i].selected){
				if(pars!="") pars += "&";
				pars += argname + "=" + mycommonfilt(encodeURI(target_obj.options[i].value));
			}
		}
	}
	return pars;
}

//添加多选框（checkbox）
function ajaxaddpars_formcheckbox(argname,pars,target_id){
	if($(target_id) && $(target_id).checked){
		if(pars!="") pars += "&";
		pars += argname + "=" + mycommonfilt(encodeURI($F(target_id)));
	}
	return pars;
}

//添加单选框（radio）(必须传入form name)
function ajaxaddpars_formradio(formname,argname,pars,target_name){
	var form_obj = $(formname);
	if(form_obj){
		for(var i = 0; i < form_obj.elements.length; i++){
			if(form_obj.elements[i].name == target_name && 	form_obj.elements[i].checked){
				if(pars!="") pars += "&";
				pars += argname + "=" + mycommonfilt(encodeURI(form_obj.elements[i].value));
				break;	//找到一个后退出循环
			}
		}
	}
	return pars;
}
//--------------------------------------------------------------------------
//添加脚本变量的值
function ajaxaddpars_var(argname,pars,var_value){
	if(var_value!=null && var_value!=""){
		if(pars!="") pars += "&";
		pars += argname + "=" + mycommonfilt(encodeURI(var_value));
	}
	return pars;
}

//添加其他标签（div/span ...）
function ajaxaddpars_innerHTML(argname,pars,target_id){
	if($(target_id)){
		if(pars!="") pars += "&";
		pars += argname + "=" + mycommonfilt(encodeURI($(target_id).innerHTML));
	}
	return pars;
}

function mycommonfilt(str){
	str = str.replace(/\?/g,"%3f");
	str = str.replace(/&/g,"%26");
	str = str.replace(/#/g,"%23");
	str = str.replace(/=/g,"%3d");

	//	str = str.replace(/</g,"＜");
	//	str = str.replace(/>/g,"＞");
	return str;
}
//====================================================================================================
// ajax 添加参数专用 end
//====================================================================================================

