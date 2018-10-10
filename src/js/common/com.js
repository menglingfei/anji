var Common = {};

/**
 * 添加按钮倒计时效果
 *
 * @param el {DOM element} 倒计时的dom元素
 * @param sec {number} 倒计时的秒数
 * @param bWaiting {boolean} 当前是否处于等待状态
 * @param fn {function} 回调函数
 */
Common.countDown = function( el, sec, bWaiting, fn ) {
    if ( !el[0].nodeType || el[0].nodeType !== 1 ) {
        return;
    }
    if ( !bWaiting ) {
        bWaiting = true;
    }
    countDownPerseconds(sec, el, bWaiting, fn);
};
//公告栏
/*
 Common.bulletin = function () {
 textScroll();
 };
 function textScroll() {
 alert('a');
 // 滚动步长(步长越大速度越快)
 var step_len = 60;
 var this_obj = $( '.notice-content' );
 var child = this_obj.children();
 var this_width = this_obj.width();
 var child_width = child.width();
 var continue_speed = undefined;// 暂停后恢复动画速度

 // 初始文字位置
 child.css({
 left: this_width
 });

 // 初始动画速度speed
 var init_speed = (child_width + this_width) / step_len * 1000;

 // 滚动动画
 function scroll_run(continue_speed) {
 var speed = (continue_speed == undefined ? init_speed : continue_speed);
 child.animate({
 left: -child_width
 }, speed, "linear", function() {
 $(this).css({
 left: this_width
 });
 scroll_run();
 });
 }

 // 鼠标动作
 child.on({
 mouseenter: function() {
 var current_left = $(this).position().left;
 $(this).stop();
 continue_speed = (-(-child_width - current_left) / step_len) * 1000;
 },
 mouseleave: function() {
 scroll_run(continue_speed);
 continue_speed = undefined;
 }
 });

 // 启动滚动
 scroll_run();
 }
 */
function countDownPerseconds(seconds, el, bWaiting, fn) {
    var timeID;
    var text = "获取中(" + ((seconds < 10) ? "0" + seconds : seconds) + ")";
    el.attr( 'class', 'send-testify testify-unable' );
    el.text( text );
    timeID = setTimeout( function() {
        countDownPerseconds(--seconds, el, bWaiting, fn);
    }, 1000 );
    if ( 0 === seconds ) {
        clearTimeout( timeID );
        el.attr( 'class', 'send-testify testify-able' );
        el.text( "获取验证码" );
        fn && fn();
    }
}
module.exports = Common;