define(function () {
    var URL = "";//接口公共部分
    function getTest(callBack){
        if(callBack){
            console.log(1111)
        }
    }

    return {
        getTest:getTest,
    }
})