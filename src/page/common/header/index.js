require('./index.css');
var _mm = require('util/mm.js');

// 通用页面头部
var header = {
    init: function () {
        this.bindEvent();
    },
    onLoad: function() {
        var keyword = _mm.getUrlParam('keyword');
        // 如果keyword存在,则回填输入框
        if(keyword) {
            $('#search-input').val(keyword)
        }
    },
    bindEvent: function () {
        var _this = this;
        // 点击搜索按钮以后,做搜索提交
        $('#search-btn').click(function() {
            _this.searchSubmit();
        })
        // 按下回车后,做搜索提交
        $('#search-input').keyup(function(e) {
            // 13代表回车键的keyCode
            if(e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        // 如果提交时有keyword,正常跳转到list页
        if(keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }
        // 如果keyword为空,直接返回首页 
        else {
            _mm.goHome();
        }
    }
};

// header不需要对外输出什么,方法都是内部的,不需要外部调用
header.init()