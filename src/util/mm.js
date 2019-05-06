var Hogan = require('hogan.js'); // 引入hogan
var conf = {
    serverHost: ''
};

var _mm = {
    // 通用JS工具类封装（网络数据请求功能）, request是网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                // 0表示请求成功
                if (res.status === 0) {
                    // 判断param.success函数是否存在,存在就执行回调把数据传回去
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                // 10表示没有登陆状态,需要强制登陆
                else if (res.status === 10) {
                    _this.doLogin()
                }
                // 1表示请求数据错误,接口请求到了
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            // 请求404,503时的error处理
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam: function (name) {
        // 例如: 获取以下网址的keyword http://happymmall.com/product/list?keyword=xxx$page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 使用hogan组件(需安装hogan)渲染HTML模板,传入两个参数(模板, 数据),然后将模板和数据进行拼接
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate); // 编译
        var result = template.render(data); // 渲染
        return result;
    },
    // 成功提示
    successTips: function(msg) {
        alert(msg || '操作成功');
    },
    // 错误提示
    errorTips: function(msg) {
        alert(msg || '哪里不对了');
    },
    // validate(vt. 证实，验证；确认；使生效),字段的验证处理,传入(要验证的字符串, 类型)
    validate: function(value, type) {
        var value = $.trim(value);
        // 非空验证, 如果type === 'require' 表示必须有一个值
        if(type === 'require') {
            return !!value; // 将value强转成布尔型,空字符串是false,非空是true
        }
        // 手机号判断
        if(type === 'phone') {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if(type === 'email') {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
        }
    },
    // 统一登陆处理
    doLogin: function () {
        window.location.href = './login.html?redirect' + encodeURIComponent(window.location.href)
    },
    // 跳回zhuye
    goHome: function() {
        window.location.href = './index.html'
    }
};

module.exports = _mm;