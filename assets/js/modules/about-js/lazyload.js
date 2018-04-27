/**
 * Created by zhaohai1 on 2018/4/27.
 */
//判断图片是否要进入浏览器可视区域
function ifIntoSight(el) {
    var imgDistance = el.getBoundingClientRect().top;   //获取图片顶部到可视区域顶部的距离
    var screenHeight = window.innerHeight;   //获取浏览器可视区域的高度
    return imgDistance <= screenHeight + 100;    //+100是为了提前加载
}

//遍历所有图片，判断是否在可视区域
function initImage() {
    var imgList = document.querySelectorAll('.myImage');
    imgList.forEach(function (el, index, arr) {
        if (ifIntoSight(el)) {
            loadImg(el);
        }
    })
}

//加载图片
function loadImg(element) {
    if (!element.src) {

    }
}