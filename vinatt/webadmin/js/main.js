/**
 * Created by XUONG on 9/13/2016.
 */
var urlLocal="https://www.nongsansachvinhlong.vn:8899/";
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    showGoiDichVu("");
});

var queryDataClient=function(url,dataSend,callback){
        $.ajax({
            type: 'POST',
            url: urlLocal+url,
            data: dataSend,
            async: true,
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json',
            success: function (data) {
                if(data.code==9998){
                    window.location.href = "../login.html";
                }
                else{
                    callback(data);
                }
            }
        });
};
$("#register").on("click",".dangky",function () {
    var 	detailname=$(".hoten").val();
    var 	gender=$(".gioitinh").val();
    var 	address=$(".diachi").val();
    var 	phone=$(".sdt").val();
    var 	email=$(".email").val();
    var 	identity_card=$(".socmnd").val();
    var 	passport=$(".passport").val();
    var 	username=$(".username").val();
    var 	password=$(".password").val();
    var idpack=$(".goidv").val();
    var v = grecaptcha.getResponse();
    var d=new Date();

    if(idpack===""){
        alert("Chọn gói");
        return;
    }
    if(detailname===""){
        alert("Nhập họ tên");
        $(".hoten").focus();
        return;
    }  if(address===""){
        alert("Nhập địa chỉ");
        $(".diachi").focus();
        return;
    }if(phone==="" || !validateFeedback(phone)){
        alert("Nhập số điện thoại");
        $(".sdt").focus();
        $(".sdt").val("");
        return;
    }if(email==="" || !validateEmail(email)){
        alert("Nhập email");
        $(".email").focus();
        $(".email").val("");
        return;
    }if(v.length ===0){
        alert("Xác nhận không phải robot");
        return;
    }if(username !="" && (username.length <6 || username.length>40) ){
        alert("Độ dài tên tài khoản sai");
        $(".username").focus();
        return;
    }if(password !="" && (password.length <6 || password.length>40) ){
        alert("Độ dài mật khẩu sai");
        $(".password").focus();
        return;
    }
    var dataSend={
        detailname:detailname,
        gender:gender,
        address:address,
        phone:phone,
        email:email,
        identity_card:identity_card,
        passport:passport,
        username:username,
        password:password,
        createat: d.getTime(),
        idpack:idpack
    };
    // console.log(dataSend);
    queryDataClient("users/register",dataSend,function (data) {
        if(data.code == 1000){
            alert("Đăng ký thành công");
            resetFormDangKy();
        }
    });
});
$("#register").on("click",".huy_dangky",function () {
    resetFormDangKy();
});
function resetFormDangKy() {
   $(".hoten").val("");
   $(".gioitinh").val("1");
   $(".diachi").val("");
   $(".sdt").val("");
   $(".email").val("");
   $(".socmnd").val("");
   $(".passport").val("");
   $(".username").val("");
   $(".password").val("");
    grecaptcha.reset();
}
//process contact
$("#support").on("click",".gui_lienhe",function () {
    var 	name=$(".hoten_lh").val();
    var 	address=$(".diachi_lh").val();
    var 	phone=$(".sdt_lh").val();
    var 	email=$(".email_lh").val();
    var 	info=$(".ghichu_lh").val();
    var v = grecaptcha.getResponse();
    var d=new Date();

    if(name===""){
        alert("Nhập họ tên");
        $(".hoten_lh").focus();
        return;
    }  if(address===""){
        alert("Nhập địa chỉ");
        $(".diachi_lh").focus();
        return;
    }if(phone==="" || !validateFeedback(phone)){
        alert("Nhập số điện thoại");
        $(".sdt_lh").focus();
        $(".sdt_lh").val("");
        return;
    }if(email==="" || !validateEmail(email)){
        alert("Nhập email");
        $(".email_lh").focus();
        $(".email_lh").val("");
        return;
    }if(info===""){
        alert("Nhập nội dung liện hệ");
        $(".ghichu_lh").focus();
        $(".ghichu_lh").val("");
        return;
    }if(checkCaptchaLienHe.length ===0){
        alert("Xác nhận không phải robot");
        return;
    }
    var dataSend={
        name:name,
        address:address,
        phone:phone,
        email:email,
        info:info,
        createat: d.getTime()
    };
    // console.log(dataSend);
    queryDataClient("contact/add",dataSend,function (data) {
        // console.log(data.code);
        if(data.code == 1000){
            alert("Đã gửi");
            resetFormLienHe();
        }
    });
});
$("#support").on("click",".huy_lienhe",function () {
    resetFormLienHe();
});
function resetFormLienHe() {
    $(".hoten_lh").val("");
    $(".diachi_lh").val("");
    $(".sdt_lh").val("");
    $(".email_lh").val("");
    $(".ghichu_lh").val("");
    grecaptcha.reset(recaptcha2);
}
var checkCaptchaLienHe="";
var verifyCallback = function(response) {
    checkCaptchaLienHe=response;
};
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateFeedback(phone) {
    var length = phone.length;
    if(phone.length<10||phone==""){
        return false;
    }
    chk1="1234567890()-+ ";
    for(i=0;i<length;i++) {
        ch1=phone.charAt(i);
        rtn1=chk1.indexOf(ch1);
        if(rtn1==-1)
            return false;
    }
    return true;
}
//checkbox
function showGoiDichVu(v){

    // console.log("servicepackage");
    $(".goidv").html("");
    queryDataClient("servicepackage/get",{},function (res) {
        // console.log(res);
        buidHTMLShowGoiDV(res,v);
        loadGoiDV(res);
    });

}
function buidHTMLShowGoiDV(res,v) {
        var items = res.items;
        var html="<option value='' >Chọn gói</option>";
        for(i in items){
            if(v==items[i].idpack){
                html = html + '<option value="' + items[i].idpack + '" selected>' + items[i].packname + '</option>';
            }
            else {

                html = html + '<option value="' + items[i].idpack + '">' + items[i].packname + '</option>';
            }
        }
        $(".goidv").html(html);

}
//end checkbox
//load goi dich vu
loadhinhgoidv=false;
function loadGoiDV (data) {
    // console.log(data);
        var listgoidv= "";
        var listtx=data.items;
        console.log(listtx);
        // for(i in listtx){
        //     listgoidv+= '<div class=""><div class="panel price panel-green"><div class="panel-heading arrow_box text-center"><h3 style="height: 25px">'+arr[i].packname+'</h3></div><div class="panel-body text-center"><p class="lead" style="font-size:25px; height: 70px"><strong>'+formatNumber(arr[i].price,".",",")+' / '+arr[i].unit+' </strong></p></div><div class="panel-footer"><a class="btn btn-lg btn-block btn-success" href="#register">Đăng ký ngay</a></div></div></div>';
        // }
        // console.log(listgoidv)
        // $(".showgoidichvu").html(listgoidv);
        // loadhinhgoidv=true;
        // loaded();
}
function loaded() {
    if(loadhinhgoidv==true){
        $(document).ready(function() {
            appMaster.smoothScroll();

            appMaster.reviewsCarousel();

            appMaster.screensCarousel();

            appMaster.animateScript();

            appMaster.revSlider();

            appMaster.scrollMenu();

            appMaster.placeHold();
        });
    }
}
function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}
//end load goi dich vu