var reqApi = {},
	bDev = true;
	
var DataType = {
	xml : 'xml',
	html : 'html',
	script : 'script',
	json  : 'json',
	jsonp : 'jsonp',
	text  : 'text'
};


var ajaxRequest = function(settings){
	var defaultOpts = {
		url: '',
		async  : true,
		beforeSend:function(){},
		contentType : 'application/x-www-form-urlencoded',
		data : '',
		dataType : DataType.json,
		type : 'POST',
		timeout: 30000,
		success : function(){},
		error : function(){},
		complete:function(){},
		onProgress:null
	};

	for (var key in settings) {
		defaultOpts[key] = settings[key];
	}
	
    return $.ajax(defaultOpts);
};

var isReqestParamsValide = function(settings){
	if(!$.isPlainObject(settings)){
		throw new Error("请求参数错误");	
		return false;
	}
	
	if ((null===settings.url) || (''===settings.url)){
		throw new Error("请求的地址不能为空");	
		return false;
	}
	
	return true;
};

reqApi.post = function(settings){
	if (isReqestParamsValide(settings)){
		return ajaxRequest(settings);
	}
};

reqApi.uploadFile = function(settings){
	if (isReqestParamsValide(settings)){
		if(settings["onProgress"]!=="" && 
		   settings["onProgress"]!==undefined &&
		   typeof(settings["onProgress"])==="function"){
		   	
		   settings["xhr"] = function(){
		   		var xhr = $.ajaxSettings.xhr();
				if (xhr.upload){
					xhr.upload.onprogress = settings["onProgress"];
				}
				
				return xhr;
		   };
		   
		   settings["contentType"]= false;
		   settings["processData"] = false;
		   settings["cache"] = false;

		}
		   
		return ajaxRequest(settings);
	}
};

module.exports = reqApi;