webpackJsonp([1],{

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(81);


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(82);
$(function () {
    document.oncontextmenu = function () {
        event.returnValue = false;
    };
    $('.btn-wrap').on('click', '.btn-item', function () {
        var id = $(this).attr('id'),
            index = '',
            tab = 0;
        switch (id) {
            case 'education':
                index = 0;
                tab = 1;
                break;
            case 'safe':
                index = 1;
                tab = 2;
                break;
            case 'show':
                index = 2;
                tab = 1;
                break;
            case 'industry':
                index = 3;
                tab = 1;
                break;
            case 'internet':
                index = 4;
                tab = 2;
                break;
            case 'cloud':
                index = 5;
                tab = 2;
                break;
            case 'agriculture':
                index = 6;
                tab = 1;
                break;
            case 'medical':
                index = 7;
                tab = 2;
                break;
            case 'politics':
                index = 8;
                tab = 2;
                break;
            case 'road':
                index = 9;
                tab = 2;
                break;
            default:
                break;
        }
        location.href = 'display.html?index=' + index + '&tab=' + tab;
    });
});

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[80]);