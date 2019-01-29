require.config({
  paths: {
    "jquery": "./jquery-3.3.1",
    "fitremtaobao": "./fitremtaobao",
    "text": "./text",
    "head": "../pages/head.html",
    "footer": "../pages/footer.html"
  }
})
require(['jquery', 'fitremtaobao', 'sMethods', 'text', 'text!head', 'text!footer'], function (jquery, fitremtaobao, sMethods, text, head, footer) {
  $(function () {
    $("#head").html(head);
    $("#footer").html(footer);
    $("#showToast").on("click", function () {
      sMethods.showToast("用户名不能为空");
    })
    $("#showToast2").on("click", function () {
      sMethods.showToast("密码不能为空", "none", true, function () {
        console.log("消息提示框提示完成");
      });
    })
    $("#confirm").on("click", function () {
      sMethods.confirmModal('确认', '您确认要删除该商品？', '取消', true, '确认', '.6', function (res) {
        if (res) {
          sMethods.showToast("删除成功");
        }
      })
    })
    $("#confirm2").on("click", function () {
      sMethods.confirmModal('账号异常', '您的账号存在异常，已被暂时冻结，如有疑问请联系客服。<br/><span style="color: #ff6c00;"><span id="count_down"></span>s</span>后将自动退出...', '取消', false, '退出', '.6', function (res) {
        if (res) {
          sMethods.closeWindow();
        }
      })
      sMethods.countDown("#count_down", 10, function () {
        sMethods.closeWindow();
      })
    })
    var isCountDown = false;
    $("#countDown").on("click", function () {
      if (isCountDown) { return; }
      isCountDown = true;
      sMethods.countDown("#_countDown", 10, function () {
        sMethods.showToast("倒计时完毕");
        isCountDown = false;
      })
    })
    console.log(sMethods.getUrlParameter("id"));
    console.log(sMethods.formatTime(new Date(), 'new'));
    console.log(sMethods.formatTime(1532922962, 's'));
    console.log(sMethods.formatTime(1532922962000, 'ms'));
    var _num = 3, _num2 = 3.1, _num3 = 3.14, _num4 = 3.148
    console.log('￥' + _num + '-->￥' + sMethods.retainedDecimal(_num));
    console.log('￥' + _num2 + '-->￥' + sMethods.retainedDecimal(_num2));
    console.log('￥' + _num3 + '-->￥' + sMethods.retainedDecimal(_num3));
    console.log('￥' + _num4 + '-->￥' + sMethods.retainedDecimal(_num4));
    console.log('￥' + _num + '-->￥' + sMethods.retainedDecimal(_num, 3));
    console.log('￥' + _num3 + '-->￥' + sMethods.retainedDecimal(_num3, 3));
    console.log('￥' + _num4 + '-->￥' + sMethods.retainedDecimal(_num4, 2));
    console.log('￥' + _num4 + '-->￥' + sMethods.retainedDecimal(_num4, 2, 'floor'));
    console.log('￥' + _num4 + '-->￥' + sMethods.retainedDecimal(_num4, 2, 'none'));
    console.log(0.1 + 0.7);
    console.log(sMethods.accAdd(0.1, 0.7));
    console.log(1.01 - 1.02);
    console.log(sMethods.accSub(1.01, 1.02));
    console.log(0.012345 * 0.000001);
    console.log(sMethods.accMul(0.012345, 0.000001));
    console.log(0.000001 / 0.0001);
    console.log(sMethods.accDiv(0.000001, 0.0001));
    /*sMethods.qr_code("#qrcode ul li", "codeurl", 100, 100, '#000', '#fff'); */
    sMethods.imgUpLoad("my_file", "api/uploadimg.php", "showImg", function (res) {
      console.log(res);
    });
    $("#generateImg").on("click", function () {
      sMethods.showToast("绘制生成中", "none", "loading", function () { });
      sMethods.canvasImg({
        canvasId: 'canvas',
        psd_w: 750,
        psd_h: 1334 - 100,
        //bgImg: '../images/img_01.jpg',
        imgList: [
          { url: '../images/img_03.png', imgW: 648, imgH: 598, imgX: 103, imgY: 388 },
          { url: '../images/img_02.png', imgW: 750, imgH: 1334, imgX: 0, imgY: 0 },
          { url: '../images/head.jpg', imgW: 200, imgH: 200, imgX: 20, imgY: 20 },
          { url: '../images/head.jpg', imgW: 200, imgH: 200, imgX: 500, imgY: 20, radius: "50%" },
          { url: '../images/head.jpg', imgW: 200, imgH: 200, imgX: 260, imgY: 20, radius: 15 }
        ],
        textList: [
          { string: '扬帆', color: '#333', fontSize: '20px', fontFamily: 'Arial', textX: 350, textY: 270 },
          { string: '水平方向的普通文字', color: '#D12815', fontSize: '23px', fontFamily: 'Arial', textX: 200, textY: 320 },
          { string: '竖向文字', color: 'purple', fontSize: '24px', fontFamily: 'Arial', textX: 25, textY: 300, vel: 5 }
        ]
      }, function (res) {
        //console.log("生成的截屏图片地址为：");
        //console.log(res);
        $("#img").fadeIn(200).attr("src", res);
        $("#close").fadeIn(200);
        $("#showModal").css("zIndex", 9999).fadeOut(400, function () { $("#showModal").remove(); });
      });
    });
    $("#close").on("click", function () {
      $("#img, #close").fadeOut(100);
    });
  })
})