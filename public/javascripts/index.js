var url = window.location.href;
var indexReg = /index/;
var detailReg = /detail/;
var ruleReg = /rule/;
var registerReg = /register/;
var searchReg = /search/;

var str = '';
if (indexReg.test(url)) {
    $.ajax({
        url: '/vote/index/data?limit=10&offset=0',
        type: 'GET',
        success: function (data) {
            data = JSON.parse(data);
            var result = data.data.objects;
            console.log(data.data);
            for (var i = 0; i < result.length; i++) {
                str += '<li>\
                    <div class="head">\
                    <a href="/vote/detail/' + result[i].id + '">\
                    <img src="' + result[i].head_icon + '" alt="">\
                    </a>\
                    </div>\
                    <div class="up">\
                    <div class="vote">\
                    <span>' + result[i].vote + '票</span>\
                    </div>\
                    <div class="btn" onclick="btn(' + result[i].id + ')" id=' + result[i].id + '>\
                    投TA一票\
                    </div>\
                    </div>\
                    <div class="descr">\
                    <a href="/vote/detail/' + result[i].id + '">\
                    <div>\
                    <span>' + result[i].username + '</span>\
                    <span>|</span>\
                    <span>编号#' + result[i].id + '</span>\
                    </div>\
                    <p>' + result[i].description + '</p>\
                    </a>\
                    </div>\
                    </li>';
            }
            $('.coming').html(str);
        }
    });
    function btn(id) {
        $.ajax({
            method: 'GET',
            url: '/vote/index/poll?id=' + id + '&voterId=300',
            success: function (data) {
                data = JSON.parse(data);
                if (data.errno == 0) {
                    window.location.href = window.location.href;
                } else {
                    alert(data.msg)
                }
            }
        })
    }

    $('.search span').click(function () {
        var content = $('.search input').val();
        $.ajax({
            type: 'GET',
            url: '/vote/index/search?content=' + content,
            success: function (data) {
                //data = JSON.parse(data);
                window.location.href = '/vote/search?data=' + data;

            }
        })
    });

    $('.sign_in').click(function () {

        var sendData = {
            password: '',
            id: ''
        };
        $.ajax({
            method: 'POST',
            url: '/vote/index/info',
            data: sendData
        })
    })


} else if (detailReg.test(url)) {

    var reg = /detail\/(\d+)/;
    var id = url.match(reg)[1];

    $.ajax({
        url: '/vote/all/detail/data?id=' + id,
        type: 'GET',
        success: function (data) {
            data = JSON.parse(data);
            data = data.data;
            console.log(data);
            console.log(data.vfriend);

            str += `<div class="pl">
                <div class="head">
                    <img src="${data.head_icon}" alt="">
                </div>
                <div class="p_descr">
                    <p>${data.username}</p>

                    <p>编号${data.id}</p>
                </div>
            </div>
            <div class="pr">
                <div class="p_descr pr_descr">
                    <p>${data.rank}</p>

                    <p>${data.vote}</p>
                </div>
            </div>
            <div class="motto">
                ${data.description}
            </div>`;
            $('.personal').html(str);

            str = '';
            for (var i = 0; i < data.vfriend.length; i++) {

                str += `<li>
                <div class="head">
                    <a href="#"><img src="${data.vfriend[i].head_icon}" alt=""></a>
                </div>
                <div class="up">
                    <div class="vote">
                        <span>投了一票</span>
                    </div>
                </div>
                <div class="descr">
                    <h3>${data.vfriend[i].username}</h3>

                    <p>编号#${data.vfriend[i].id}</p>
                </div>
            </li>`;
            }
            $('.vflist').html(str);
        }
    });
} else if (registerReg.test(url)) {

    console.log($('.gender input').eq(0).attr('checked'));
    var sendData = {
        username: $('reinput').val,
        mobie: $('reinput').val,
        description: $('reinput').val,
        gender: $('gender').name,
        password: $('password').val
    };
    if ($('.initial_password').val() == $('.confirm_password').val()) {
        $('.rebtn').click(function () {
            $.ajax({
                url: '/vote/register/data',
                type: 'POST',
                data: sendData
            });
            window.location.href = 'http://localhost:8080/vote/index';
        });
    } else {
        alert('请输入密码');
    }
} else if (searchReg.test(url)) {
    var reg = /\?data=(.+)/;
    var content = JSON.parse(decodeURIComponent(reg.exec(url)[1]));
    content = content.data;
    //console.log(content);
    str = '';
    for (var i = 0; i < content.length; i++) {
        str += `<li>
            <div class="head">
            <a href="#"><img src="${content[i].head_icon}" alt=""></a>
            </div>
            <div class="up">
            <div class="vote">
            <span>${content[i].vote}</span>
        </div>
        <div class="btn">
            投TA一票
            </div>
            </div>
            <div class="descr">
            <h3>${content[i].username}</h3>
            <p>${content[i].description}？</p>
        </div>
        </li>`;
    }
    $('.coming').html(str);
}


































































