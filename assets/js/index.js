$(function () {
    //1.获取用户信息
    getUserInfo();
    //2.实现退出功能
    var layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm('是否确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //3.删除本地存储
            localStorage.removeItem('token')
            //4.跳转到login页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
});
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        //headers: {
        //    Authorization: localStorage.getItem('token') || ''
        //},
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        //complete: function (res) {
        //    //console.log(res);
        //    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //        localStorage.removeItem('token')
        //        location.href = '/login.html';
        //    }
        //}
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $(".welcome").html("欢迎&nbsp&nbsp" + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $('.user-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user-avatar').show().html(text);
    }
}