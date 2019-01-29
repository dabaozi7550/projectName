define(function () {
    /*消息提示弹框*/
    function showToast(text, duration, icon, callback) {
        var _box = '<div class="showModal_box">' + text + '</div>';
        if (icon) {
            var _iconType = 'icon-weibiaoti14';
            if (icon == "loading") {
                _iconType = 'icon-jiazaizhong';
            }
            _box = '<div class="showModalBox iconBox">' +
                '<i class="iconfont ' + _iconType + '"></i>' +
                '<p>' + text + '</p>' +
                '</div>';
        }
        var _str = '<div id="showModal">' + _box + '</div>';
        $("body").append(_str);
        if (icon && duration === "none") {
            return;
        }
        setTimeout(function () {
            $("#showModal").css("zIndex", 9999).fadeOut(400, function () {
                $("#showModal").remove();
                if (callback) {
                    callback();
                }
            });
        }, duration ? duration : 1500);
    }

    /*确认取消弹框*/
    function confirmModal(text, str, cancel, isCancel, confirm, opacity, callback) {//确认取消框
        var _isCancel;
        if (!isCancel) {
            _isCancel = 'style="color:#555;"'
        }
        var _str = '<div id="confirmModal" style="background: rgba(0,0,0,' + opacity + ');">' +
            '<div class="confirmModalBox">' +
            '<h3>' + text + '</h3>' +
            '<p>' + str + '</p>' +
            '<div class="button">' +
            '<div class="cancel" ' + _isCancel + '>' + cancel + '</div>' +
            '<div class="confirm">' + confirm + '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("body").append(_str);
        $("#confirmModal .cancel").on("click", function () {
            if (!isCancel) {
                return;
            }
            $("#confirmModal").fadeOut(100, function () {
                $("#confirmModal").remove();
                return callback(false);
            });
        })
        $("#confirmModal .confirm").on("click", function () {
            $("#confirmModal").fadeOut(100, function () {
                $("#confirmModal").remove();
                return callback(true);
            });
        })
    }

    //导航特效
    function direction_judge(hover, popup, duration) {
        $("body").delegate(hover, "mouseenter mouseleave", function (e) {
            var _ele = $(this).find(popup);
            var _eleW = _ele.width() + 'px';
            var _eleH = _ele.height() + 'px';
            var w = $(this).width();
            var h = $(this).height();
            var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
            var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
            var eventType = e.type;
            if (e.type == 'mouseenter') {
                if (direction == 0) {
                    _ele.css({left: 0, top: '-' + _eleH}).stop().animate({top: 0}, duration);
                } else if (direction == 1) {
                    _ele.css({left: _eleW, top: 0}).stop().animate({left: 0}, duration);
                } else if (direction == 2) {
                    _ele.css({left: 0, top: _eleH}).stop().animate({top: 0}, duration);
                } else if (direction == 3) {
                    _ele.css({left: '-' + _eleW, top: 0}).stop().animate({left: 0}, duration);
                }
            } else {
                if (direction == 0) {
                    _ele.stop().animate({top: '-' + _eleH}, duration);
                } else if (direction == 1) {
                    _ele.stop().animate({left: _eleW}, duration);
                } else if (direction == 2) {
                    _ele.stop().animate({top: _eleH}, duration);
                } else if (direction == 3) {
                    _ele.stop().animate({left: '-' + _eleW}, duration);
                }
            }
        });
    }

    /*倒计时(秒)*/
    function countDown(ele, second, callback) {
        $(ele).html(second);
        var auto_count_down = setInterval(function () {
            var _num = parseInt($(ele).html());
            if (_num <= 1) {
                clearInterval(auto_count_down);
                callback();
            }
            setTimeout(function () {
                $(ele).html(_num - 1);
            }, 300);
        }, 1000);
    }

    /*从地址栏获取传参*/
    function getUrlParameter(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var URL = decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if (r != null) {
            //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
            return decodeURI(r[2]);
        }
        ;
        return null;
    }

    /*当前时间、时间戳(秒)、毫秒转换*/
    function formatTime(date, types, connect, connect2, connect3) {
        if (types === 's') {
            date = new Date(date * 1000);
        } else if (types === 'ms') {
            date = new Date(date);
        } else {
            date = new Date();
        }
        connect = connect || '/';
        connect2 = connect2 || ' ';
        connect3 = connect3 || ':';
        var _year = date.getFullYear();
        var _month = date.getMonth() + 1;
        var _day = date.getDate();
        var _hour = date.getHours();
        var _minute = date.getMinutes();
        var _second = date.getSeconds();
        return [_year, _month, _day].map(formatNumber).join(connect) + connect2 + [_hour, _minute, _second].map(formatNumber).join(connect3);
    }

    /*个位数自动在前面添加0*/
    function formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    /*保留固定小数,不足补0*/
    function retainedDecimal(x, n, math) {
        n = n || 2;
        math = math || 'round';
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
            return 0;
        }
        var _n = '1';
        for (var i = 0; i < n; i++) {
            _n += '0';
        }
        _n = Number(_n);
        if (math == 'none') {
            f_x = parseInt(x * _n) / _n;
        } else if (math == 'round') {
            f_x = Math.round(x * _n) / _n;
        } else if (math == 'floor') {
            f_x = Math.floor(x * _n) / _n;
        }
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.')
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + n) {
            s_x += '0';
        }
        return s_x;
    }

    /*js浮点数精度--两数相加*/
    function accAdd(num1, num2) {
        var r1, r2, m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return Math.round(num1 * m + num2 * m) / m;
    }

    /*js浮点数精度--两数相减*/
    function accSub(num1, num2) {
        var r1, r2, m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    }

    /*js浮点数精度--两数相乘*/
    function accMul(num1, num2) {
        var m = 0, s1 = num1.toString(), s2 = num2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        ;
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        ;
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

    /*js浮点数精度--两数相除*/
    function accDiv(num1, num2) {
        var t1, t2, r1, r2;
        try {
            t1 = num1.toString().split('.')[1].length;
        } catch (e) {
            t1 = 0;
        }
        try {
            t2 = num2.toString().split(".")[1].length;
        } catch (e) {
            t2 = 0;
        }
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }

    /*图片自适应宽高*/
    function autowidthheight(elements) {
        $(elements).each(function (index, ele) {
            if (ele.width / ele.height < 1) {
                $(ele).css({"width": "auto", "height": "100%"});
            }
        })
    }

    /*生成二维码*/
    function qr_code(ele, data, width, height, color, color2) {
        for (var i = 0; i < $(ele).length; i++) {
            var _self = $(ele)[i];
            var qrcode = new QRCode(_self, {
                text: $(_self).data(data),
                width: width,
                height: height,
                colorDark: color,
                colorLight: color2,
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    /*图片上传*/
    function imgUpLoad(inputFile, upLoadUrl, showImg, callBack) {
        var _file = document.getElementById(inputFile);
        if (showImg != 'none') {
            var _preview = document.getElementById(showImg);
        }
        var _FileReader = new FileReader();
        var xhr = new XMLHttpRequest();
        _FileReader.addEventListener("load", function () {
            if (showImg != 'none') {
                _preview.src = _FileReader.result;
                console.log(_preview.width);
                console.log(_preview.height);
            }
            //console.log(_FileReader.result);
        }, false);
        _file.addEventListener('change', function () {
            var filePath = upLoadUrl;
            var form = new FormData();
            console.log(_file.files[0]);
            console.log(_file.files[0].name);
            form.append(_file, _file.files[0]);
            if (_file.files[0]) {
                _FileReader.readAsDataURL(_file.files[0]);
            }
            xhr.open("post", filePath, true);
            xhr.send(form);
        });
        xhr.addEventListener('progress', function (res) {
            _file.value = '';
            callBack(res);
        })
    }

    /*退出微信浏览器*/
    function closeWindow() {
        //这个可以关闭安卓系统的手机
        document.addEventListener('WeixinJSBridgeReady', function () {
            WeixinJSBridge.call('closeWindow');
        }, false);
        //这个可以关闭ios系统的手机
        try {
            WeixinJSBridge.call('closeWindow');
        }
        catch (error) {
            console.log(error);
            console.log("请在微信浏览器上测试~");
        }
    }

    /*h5生成图片*/
    function canvasImg(options, callback) {
        var P_W = window.innerWidth;
        var P_H = window.innerHeight;
        var PSD_W = options.psd_w;
        var PSD_H = options.psd_h;
        var canvas = document.getElementById(options.canvasId);
        var ctx = canvas.getContext("2d");
        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
        var ratio = devicePixelRatio / backingStoreRatio;
        canvas.width = P_W * ratio;
        canvas.height = P_H * ratio;
        canvas.style.width = P_W + "px";
        canvas.style.height = P_H + "px";
        ctx.scale(ratio, ratio);
        if (options.bgImg) {
            options.imgList.unshift({url: options.bgImg, imgW: PSD_W, imgH: PSD_H, imgX: 0, imgY: 0});
        }
        var vars = {};
        for (var m in options.imgList) {
            vars["newImg" + m] = new Image();
            vars["newImg" + m].setAttribute("crossOrigin", 'anonymous');
            vars["newImg" + m].src = options.imgList[m].url;
        }
        var progress = 0;
        for (var z in options.imgList) {
            vars["newImg" + z].onload = function () {
                progress += 2520 / options.imgList.length;
                if (progress === 2520) {
                    startDraw();
                }
            }
        }

        function addRoundRectFunc() {
            CanvasRenderingContext2D.prototype.roundRect =
                function (x, y, width, height, radius, fill, stroke) {
                    if (typeof stroke == "undefined") {
                        stroke = false;
                    }
                    if (typeof radius === "undefined") {
                        radius = 5;
                    }
                    this.beginPath();
                    this.moveTo(x + radius, y);
                    this.lineTo(x + width - radius, y);
                    this.quadraticCurveTo(x + width, y, x + width, y + radius);
                    this.lineTo(x + width, y + height - radius);
                    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                    this.lineTo(x + radius, y + height);
                    this.quadraticCurveTo(x, y + height, x, y + height - radius);
                    this.lineTo(x, y + radius);
                    this.quadraticCurveTo(x, y, x + radius, y);
                    this.closePath();
                    if (stroke) {
                        this.stroke();
                    }
                    if (fill) {
                        this.fill();
                    }
                };
        }

        function startDraw() {
            //绘制图片
            for (var n in options.imgList) {
                if (!options.imgList[n].radius) {
                    drawImg();
                } else if (options.imgList[n].radius == "50%") {
                    ctx.save();
                    var r = P_W * (options.imgList[n].imgW / PSD_W) * .5;
                    ctx.arc(P_W * (options.imgList[n].imgX / PSD_W) + r, P_H * (options.imgList[n].imgY / PSD_H) + r, r, 0, 2 * Math.PI);
                    ctx.clip();
                    ctx.fill();
                    drawImg(true);
                    ctx.restore();
                } else {
                    ctx.save();
                    addRoundRectFunc();
                    ctx.roundRect(P_W * (options.imgList[n].imgX / PSD_W), P_H * (options.imgList[n].imgY / PSD_H), P_W * (options.imgList[n].imgW / PSD_W), P_H * (options.imgList[n].imgH / PSD_H), options.imgList[n].radius, true);
                    ctx.globalCompositeOperation = 'source-in';
                    ctx.clip();
                    drawImg();
                    ctx.restore();
                }

                function drawImg(arc) {
                    ctx.drawImage(vars["newImg" + n], 0, 0, vars["newImg" + n].width, vars["newImg" + n].height, P_W * (options.imgList[n].imgX / PSD_W), P_H * (options.imgList[n].imgY / PSD_H), P_W * (options.imgList[n].imgW / PSD_W), arc ? P_W * (options.imgList[n].imgW / PSD_W) : P_H * (options.imgList[n].imgH / PSD_H));
                }
            }

            //绘制文字
            function drawFont() {
                var fonts = options.textList;
                for (var k in fonts) {
                    ctx.fillStyle = fonts[k].color;
                    ctx.font = fonts[k].fontSize + ' ' + fonts[k].fontFamily;
                    ctx.textBaseline = 'hanging';
                    isSystem(function (res) {
                        if (res.isiOS) {
                            fonts[k].textY -= 10;
                        }
                    });
                    if (fonts[k].vel) {
                        for (var z in fonts[k].string) {
                            ctx.fillText(fonts[k].string[z], P_W * (fonts[k].textX / PSD_W), P_H * (fonts[k].textY / PSD_H) + z * (parseInt(fonts[k].fontSize) + fonts[k].vel));
                        }
                    } else {
                        ctx.fillText(fonts[k].string, P_W * (fonts[k].textX / PSD_W), P_H * (fonts[k].textY / PSD_H));
                    }
                }
            }

            drawFont();
            callback(canvas.toDataURL("image/png"));
        }
    }

    /*判断当前手机系统（Android/ios）*/
    function isSystem(callback) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        callback({isAndroid: isAndroid, isiOS: isiOS});
    }

    return {
        showToast: showToast,
        confirmModal: confirmModal,
        countDown: countDown,
        getUrlParameter: getUrlParameter,
        formatTime: formatTime,
        formatNumber: formatNumber,
        retainedDecimal: retainedDecimal,
        accAdd: accAdd,
        accSub: accSub,
        accMul: accMul,
        accDiv: accDiv,
        autowidthheight: autowidthheight,
        qr_code: qr_code,
        imgUpLoad: imgUpLoad,
        closeWindow: closeWindow,
        canvasImg: canvasImg,
        isSystem: isSystem
    }
})