require("../../css/page/display.styl");
import axios from 'axios';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
$( function () {
    let index = 0,
        mySwiper1,
        mySwiper2,
        myPlayer1,
        myPlayer2,
        // tab1 当前播放的任务的序号
        currentTaskNo1 = 0,
        // tab2 当前播放的任务的序号
        currentTaskNo2 = 0,
        // 仅用于轮播图中，在监听轮播图的滑动事件时，区分改时间的触发是否来自于下拉列表被点击
        nameListElclicked = false;
    axios.defaults.headers.common['Authorization'] = _TOKEN;
    window.addEventListener('message', function (e) {
        if (e.data.type === 'coursewareH5Close') {
            coursewareH5Close();
        }
    }, false);
    function coursewareH5Close() {
        let iframe = '<iframe id="iframe" src="" width="300" height="400"></iframe>'
        $('#iframe').remove();
        $('#h5SourceShow').css('display','none').html(iframe);
    }
    $('.tab-wrap').on('click', 'li', function () {
        if ($('.tab-wrap').children('li').length === 1 || $(this).hasClass('am-active')) {
            return;
        }
        addDataNameList($(this).attr('data-index'));
    });
    $('.back').on('click', function () {
        axios.post(`${_URL}/api/ctrl_cmd/goto_task`, {
            task_name: '首页',
            play: 0
        })
        .then(function(res){
            location.href = 'index.html';
        })
        .catch(function(err){
            location.href = 'index.html';
        });

    });
    $('.prev').on('click', function () {
        nameListElclicked = true;
        if (0 === currentTaskNo1) {
            currentTaskNo1 = $('.jNameList li').length - 1;
        } else {
            currentTaskNo1--;
        }
        let _tab = $($($('.jNameList li')[currentTaskNo1]).children('a')[0]).attr('data-tab');
        showCurrentSource(_tab, 0, $(`.jNameList li:eq(${currentTaskNo1})`));
    });
    $('.next').on('click', function () {
        nameListElclicked = true;
        if ($('.jNameList li').length - 1 == currentTaskNo1) {
            currentTaskNo1 = 0;
        } else {
            currentTaskNo1++;
        }
        let _tab = $($($('.jNameList li')[currentTaskNo1]).children('a')[0]).attr('data-tab');
        showCurrentSource(_tab, 0, $(`.jNameList li:eq(${currentTaskNo1})`));
    });
    $('body').on('click', '.play', function () {
        autoPlayStart();
    });
    $('body').on('click', '.pause', function () {
        autoPlayStop();
    });
    function autoPlayStart() {
        let _tab = getCurrentTab();
        $('.play').hide();
        $('.pause').show();
        if (1 == _tab) {
            mySwiper1.autoplay.start();
        } else if (2 == _tab) {
            mySwiper2.autoplay.start();
        }
    }
    function autoPlayStop() {
        let _tab = getCurrentTab();
        $('.pause').hide();
        $('.play').show();
        if (1 == _tab) {
            mySwiper1.autoplay.stop();
        } else if (2 == _tab) {
            mySwiper2.autoplay.stop();
        }
    }
    function getCurrentTab() {
        return $($('.jNameList li').children('a')[0]).attr('data-tab');
    }
    function getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    function addTab(num) {
        if (num !== '1') {
            $('.tab-wrap').append('<li class="am-active" data-index="1"><a href="[data-tab-panel-0]">屏幕1</a></li><li class="" data-index="2"><a href="[data-tab-panel-0]">屏幕2</a></li>');
            $('.content-wrap').append(
                `<div data-tab-panel-0 class="am-tab-panel am-active">
                    <div id="swiper1" class="swiper-container jSwiper" style="width: 100%;height: 100%;display: none">
                        <div class="swiper-wrapper" id="swiperWrapper1">
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                    <video autoplay muted id="video1" style="width: 100%;height: 100%;display: none" class="video-js jVideo vjs-big-play-centered" data-setup='{}'></video>
                    <iframe id="iframe1" style="width: 100%;height: 100%;display: none" class="jIframe"></iframe>
                </div>
                <div data-tab-panel-1 class="am-tab-panel">
                     <div id="swiper2" class="swiper-container jSwiper" style="width: 100%;height: 100%;display: none">
                         <div class="swiper-wrapper" id="swiperWrapper2">
                         </div>
                         <div class="swiper-pagination"></div>
                     </div>
                     <video autoplay muted id="video2" style="width: 100%;height: 100%;display: none" class="video-js jVideo vjs-big-play-centered" data-setup='{}'></video>
                     <iframe id="iframe2" style="width: 100%;height: 100%;display: none" class="jIframe"></iframe>
                </div>`
            );
        } else {
            $('.tab-wrap').append('<li class="am-active" data-index="1"><a href="[data-tab-panel-0]">屏幕</a></li>');
            $('.content-wrap').append(
                `<div data-tab-panel-0 class="am-tab-panel am-active">
                    <div id="swiper1" class="swiper-container jSwiper" style="width: 100%;height: 100%;display: none">
                        <div class="swiper-wrapper" id="swiperWrapper1">
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                    <video autoplay muted id="video1" style="width: 100%;height: 100%;display: none" class="video-js jVideo vjs-big-play-centered" data-setup='{}'></video>
                    <iframe id="iframe1" style="width: 100%;height: 100%;display: none" class="jIframe"></iframe>
			    </div>`
            );
        }
        $('.tab-component').tabs('refresh');
    }
    function renderSourceWraps(tab = 1) {
        //mySwiper && mySwiper.destroy(false);
        // 如果同一tab下包含了image和其他文件类型，则不能这么写
        if ($(`#swiperWrapper${tab}`).children('.swiper-slide').length !== 0) {
            nameListElclicked = false;
            $(`#swiperWrapper${tab}`).children('.swiper-slide').each(function (index) {
                if ($(this).hasClass('swiper-slide-active')) {
                    currentTaskNo1 = index;
                }
            });
        }

        $('.jNameList li').each(function () {
            let el =  $(this).children('a')[0],
                dataType = $(el).attr('data-type');
            if (dataType === 'image') {
                $(`#swiperWrapper${tab}`).append(`<div class="swiper-slide"><img class="" src="${$(el).attr('data-url')}" /></div>`);
            } else if (dataType === 'video') {
            } else if (dataType === 'html') {
            }
        });
        if ($(`#swiperWrapper1`).children('div').length !== 0 && !mySwiper1) {
            mySwiper1 = newSwiper('1');
        }
        if ($(`#swiperWrapper2`).children('div').length !== 0 && !mySwiper2) {
            mySwiper2 = newSwiper('2');
        }
        showCurrentSource(tab, 1);
    }
    function newSwiper(_tab) {
        return new Swiper(`#swiper${_tab}`, {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            on: {
                slideChange: function () {
                    let _name = $($($('.jNameList li')[this.activeIndex]).children('a')[0]).text();
                    if ($('.jNameList li').length - 1 == currentTaskNo1) {
                        currentTaskNo1 = nameListElclicked ? currentTaskNo1 : 0;
                    } else {
                        currentTaskNo1 = nameListElclicked ? currentTaskNo1 : currentTaskNo1 + 1;
                    }
                    nameListElclicked = false;
                    sendCurrentTask(_name, 0);
                },
            },
            //loop: true,
            pagination: {
                el: '.swiper-pagination'
            }
        })
    }
    function newPlayer(_tab, _src, _name) {
        return videojs(`video${_tab}`, {
            controls: true,
            preload: 'auto',
            sources: [{
                src: _src,
                type: 'video/mp4'
            }]
        }, function () {
            let that = this;
            that.on('ended', function () {
                videojs.log('end');
            });
            that.on('pause', function () {
                sendCurrentTask(_name, 0);
            });
            that.on('play', function () {
                sendCurrentTask(_name, 1);
            });
            /*
            that.on('timeupdate', function() {
                if ($(".vjs-remaining-time-display").html() != '0:00' && initLoadPage) { //判断视频真正开始播放 和 重新播放
                    console.log('开始播放');
                    $(`#video${_tab}`).removeAttr('muted');
                    $(`#video${_tab}_html5_api`).removeAttr('muted');
                    initLoadPage = false;
                }
            });
            */
            that.controlBar.volumePanel.volumeControl.on('mouseup', function () {
                sendVolume(parseInt(that.volume() * 100));
            });
            that.controlBar.volumePanel.volumeControl.on('touchend', function () {
                sendVolume(parseInt(that.volume() * 100));
            });
            that.controlBar.volumePanel.muteToggle.on('mouseup', function () {
                muteToggle();
            });
            that.controlBar.volumePanel.muteToggle.on('touchend', function () {
                muteToggle();
            });
        });
    }
    function muteToggle() {
        let mute = $('.vjs-mute-control').attr('title');
        if (mute === 'Mute') {
            sendVolume(0);
        } else if (mute === 'Unmute') {
            sendVolume(100);
        }
    }
    //播放当前资源
    function showCurrentSource(_tab, _first, _el = $('.jNameList li:eq(0)')) {
        let _taskEl = $($(_el).children('a')[0]),
            _type = _taskEl.attr('data-type'),
            _src = _taskEl.attr('data-url'),
            _index = parseInt(_taskEl.attr('data-index')),
            _currentTaskName = _taskEl.text(),
            _sendRequest = 1;
        switch (_type) {
            case 'video':
                if (_tab == 1) {
                    if (!myPlayer1) {
                        myPlayer1 = newPlayer(_tab, _src, _currentTaskName);
                        /*
                        setTimeout(function () {
                            var test = document.getElementById('video1_html5_api');
                            test.muted = false;
                        }, 2000);
                        */
                    } else {
                        if ( $('#video1 video').attr('src') != _src) {
                            $('#video1 video').attr('src', _src);
                            /*
                            setTimeout(function () {
                                var test = document.getElementById('video1_html5_api');
                                test.muted = false;
                            }, 2000);
                            */
                        } else {
                            _sendRequest = 0;
                        }
                    }
                } else if (_tab == 2) {
                    if (!myPlayer2) {
                        myPlayer2 = newPlayer(_tab, _src, _currentTaskName);
                        // document.getElementById('video2_html5_api').muted = false;
                    } else {
                        if ( $('#video2 video').attr('src') != _src) {
                            $('#video2 video').attr('src', _src);
                            // document.getElementById('video2_html5_api').muted = false;
                        } else {
                            _sendRequest = 0;
                        }
                    }
                }
                $('.playIcon').hide();
                break;
            case 'image':
                if (!_first) {
                    if (_tab == 1) {
                        mySwiper1.slideTo(_index, 1000, false);
                    } else if (_tab == 2) {
                        mySwiper2.slideTo(_index, 1000, false);
                    }
                }
                $('.playIcon').show();
                break;
            case 'html':
                $(`#iframe${_tab}`).attr('src', _src);
                $('.playIcon').hide();
                break;
            default:
                break;
        }
        switchContentWrap(_type, _tab);
        if (_sendRequest) {
            sendCurrentTask(_currentTaskName, 0);
        }
    }
    function switchContentWrap(_type, tab) {
        switch (_type) {
            case 'video':
                $('.jSwiper').hide();
                $('.jIframe').hide();
                $('.jVideo').show();
                $(`#video${tab} video`).show();
                break;
            case 'image':
                $('.jVideo').hide();
                $('.jIframe').hide();
                $(`#swiper${tab}`).show();
                break;
            case 'html':
                $('.jVideo').hide();
                $('.jSwiper').hide();
                $('.jIframe').show();
                break;
            default:
                break;
        }
    }
    function sendCurrentTask(_name, _play) {
        axios.post(`${_URL}/api/ctrl_cmd/goto_task`, {
            task_name: _name,
            play: _play
        })
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        });
    }
    function sendVolume(_volume) {
        axios.post(`${_URL}/api/ctrl_cmd/set_volume`, {
            volume: _volume,
            // 待修改
            area_id: 45
        })
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        });
    }
    function addDataNameList(tab = 1) {
        let arrName;
        if (tab == 1) {
            arrName = dataName[index].left;
        } else if (tab == 2) {
            arrName = dataName[index].right;
        }
        renderNameList(arrName, tab);
    }
    function renderNameList(arr, tab) {
        $('.jNameList li').remove();
        for (let i = 0; i < arr.length; i++) {
            $('.jNameList').append(`<li><a href="javascript:void(0)" data-tab="${tab}" data-index="${i}" data-type="${arr[i].type}" data-url="${arr[i].url}">${arr[i].name}</a></li>`);
        }
        $('.jNameList li').on('click', function () {
            let _tab = $($(this).children('a')[0]).attr('data-tab');
            // 当前被点击的人物名字的序号
            let _index = $($(this).children('a')[0]).attr('data-index');
            nameListElclicked = true;
            currentTaskNo1 = parseInt(_index);
            showCurrentSource(_tab, 0, this);
            $('.am-dropdown-flip').dropdown('close');
        });
        renderSourceWraps(tab);
    }
    function init() {
        let tabNum = getQueryString('tab');
        // 禁用右键
        document.oncontextmenu = function(){
            event.returnValue = false;
        };
        index = getQueryString('index');
        addTab(tabNum);
        addDataNameList();
    }
    init();
});
