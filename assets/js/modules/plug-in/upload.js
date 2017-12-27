/**
 * Created by zhaohai1 on 2017/12/27.
 */
var load  = {
	init:function () {
		this.bindEvent();
		this.initUploadBtn('loadbtn2',function (file, src) {
			var _li = '<li filepath="' + src + '"><img style="width:50px;height:50px;" src="' + src + '" title="' + file.name + '"/>' +
				'<p><a onclick="delFile(this)"><i class="icon icon-close-md"></i></a></p></li>';
			$("#trafficFileList").append(_li);
		});
	},
	bindEvent:function () {

	},
	/* 上传附件 */
	initUploadBtn:function (btn, callback) {
		var _this = this;
		//实例化一个plupload上传对象
		var uploader = new plupload.Uploader({
			browse_button: btn //触发文件选择对话框的按钮，为那个元素id
			, url: '#' //服务器端的上传页面地址
			, flash_swf_url: '/assets/js/libs/plupload/Moxie.swf' //swf文件，当需要使用swf方式进行上传时需要配置该参数
			, silverlight_xap_url: '/assets/js/libs/plupload/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
			, filters: {
				max_file_size: '10mb',  //最大只能上传10M的文件
				mime_types: [   //只允许上传图片和zip文件
					{title: "Image files", extensions: "jpg,gif,png"},
					{title: "Zip files",extensions: "zip"}
				],
				prevent_duplicates: true //不允许选取重复文件
			}
			, multi_selection: false  //是否可以在文件浏览对话框中选择多个文件
			, resize: {     //对将要上传的图片进行压缩
				width: 100,     //压缩后图片的宽度
				height: 100,    //压缩后图片的高度
				crop: true,     //是否裁剪图片
				quality: 60,    //压缩后图片的质量，只对jpg格式的图片有效，默认为90
				preserve_headers: false     //是否保留图片的元数据,默认为true;
			}
			, unique_names: true    //当值为true时会为每个上传的文件生成一个唯一的文件名，并作为额外的参数post到服务器端，参数明为name,值为生成的文件名。
		});
		uploader.init();
		uploader.bind('FilesAdded', function (up, files) {    //成功向上传队列中添加文件时触发
			plupload.each(files, function (file) {
				//$('#' + btn).siblings('.upload-text').val(file.name);
				_this.previewImage(file, function(imgsrc) {
					callback && callback(file, imgsrc);
				})
			});
		});
	},
	//plupload(1.2)中为我们提供了mOxie对象
	//有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
	previewImage:function(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
		if (!file || !/image\//.test(file.type)) return;
		if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
			var fr = new mOxie.FileReader();
			fr.onload = function() {
				callback(fr.result);
				fr.destroy();
				fr = null;
			};
			fr.readAsDataURL(file.getSource());
		} else {
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				preloader.downsize(300, 300); //先压缩一下要预览的图片,宽300，高300
				var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
				callback && callback(imgsrc); //callback传入的参数为预览图片的url
				preloader.destroy();
				preloader = null;
			};
			preloader.load(file.getSource());
		}
	}
};