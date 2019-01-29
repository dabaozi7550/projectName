require.config({
    paths: {
        "jquery": "./jquery-3.3.1",
        "fitremtaobao": "./fitremtaobao",
        "text": "./text",
        "head": "../pages/head.html",
        "footer": "../pages/footer.html"
    }
})
require(['jquery', 'fitremtaobao', 'sMethods', 'Interface', 'text', 'text!head', 'text!footer'], function (jquery, fitremtaobao, sMethods, Interface, text, head, footer) {
    $(function () {
        $("#head").html(head);
        $("#footer").html(footer);
        sMethods.showToast("test");
        Interface.getTest(function () { });
    })
})


