//lấy giá trị từ localStorage chuyển thành mảng của object
var users = JSON.parse(localStorage.getItem('users'));
if( users == null ){
        users = [];
}
console.log(users);
// tạo object để lưu thông tin 1 tài khoản
var user = {

}
var layoutLogin = document.querySelector('.login-container');
var layoutSignup = document.querySelector('.signup-container');
var showSignup = document.querySelector('#show-signup');
var showLogin = document.querySelector('#show-login');
var btnLogin = document.querySelector('#btn-login');
var toLogin = document.querySelector('.to-login');
var logout = document.querySelector('.logout');

window.addEventListener('load',function(){
    localStorage.setItem('null','0');
})
toLogin.addEventListener('click',function(){
    window.location.href = "./login.html";
})
logout.addEventListener('click',function(){
    localStorage.setItem('null','0');
    window.location.href = "./login.html";
})
document.querySelector('.close-all').addEventListener('click',function(){ //đóng tất cả
    layoutLogin.classList.add('closeSignup');
    layoutSignup.classList.add('closeSignup');
    document.querySelector('.btn-close').classList.add('close-x');
})
showSignup.addEventListener('click',show2);
showLogin.addEventListener('click',show1);
btnLogin.addEventListener('click',function(){
    show1();
    document.querySelector('.btn-close').classList.remove('close-x');
});
function show1() // đóng đk
{
    layoutLogin.classList.remove('closeSignup');
    console.log('đóng đk');
    closeSignup();
}
function show2() // mở đk
{
    layoutSignup.classList.remove('closeSignup');
    console.log('mở đk');
    closeLogin();
}
function closeLogin(){
    layoutLogin.classList.add('closeSignup');
}
function closeSignup(){
    layoutSignup.classList.add('closeSignup');
}
var signup = document.getElementById('SignUp');
// ĐĂNG KÝ TÀI KHOẢN
if( signup != null ){

    signup.addEventListener('click', function(event){
        //lấy giá trị của người nhập
        var name = document.getElementById('name');
        var password = document.getElementById('password');
        // 1 tài khoản
        user = {
            Name: name.value,
            Password: password.value,
            coin: 10000    //Cấp Vốn
        };
        var kt = false;
        users.forEach((items, index) =>{
            //Nếu có rồi thì hiện lên thông báo
            if( items.Name == user.Name && items.Password == user.Password ){
                kt = true;
                alert('Tài Khoản đã có người đăng kí');
            }
            // sau khi kiểm tra nếu chưa có thì sẽ thêm vào
            if( index == (users.length-1) && kt == false ){
                Add( user );
            }
        })
        //nếu trong localStorage chưa có gì thì thêm vào luôn
        if( users.length == 0 ){
            Add( user );
        }
        //event.preventDefault();
    })
}
//add
function Add( user ){                 //đăng kí xong thì đóng đk mở đăng nhập
    users.push(user);
    localStorage.setItem('users',JSON.stringify(users));
    show1();
    localStorage.setItem('null','0');
    alert('Đăng kí thành công');
    /* window.location.href = "./baucua.html"; */
}
// Đăng Nhập
var login = document.querySelector('#LogIn');
if( login != null ){

    login.addEventListener( 'click', function(event){
        //lấy giá trị của người nhập
        var name1 = document.getElementById('name1').value;
        var password1 = document.getElementById('password1').value;
        var kt = false;
        users.forEach((items,index) => {
            console.log(index);
            //Nếu đăng nhập đúng thì cho vào
            if( items.Name == name1 && items.Password == password1 ){
                kt = true;
                // khi đăng nhập thì đăng thông tin tk lên localStorage
                localStorage.setItem('player',JSON.stringify(items));   // đăng nhập xong thì đóng hết
                // đăng kí thành công thì chuyển sang trang bầu cua
                closeLogin();
                document.querySelector('.btn-close').classList.add('close-x');
                localStorage.setItem('null','1');
                window.location.href = "./baucua.html"; 
            }
            // sau khi chạy hết mảng mà vẫn sai thì cho out
            if( index == (users.length-1) && kt == false ){
                alert('Đăng Nhập Thất Bại');
            }
        });
        //nếu chưa có tài khoản nào mà đăng nhập thì cho đi luôn
        if( users.length == 0 ){
            alert('Đăng Nhập Thất Bại');
            localStorage.setItem('null','0');
        }
        //event.preventDefault();
    })
}


