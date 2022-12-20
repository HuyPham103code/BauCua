var btn = document.querySelector('.btn');
var Play_img = document.querySelector('.play__image')
var btn_bet = document.querySelectorAll('.image div');
var plus = document.querySelectorAll('.plus');
var minus = document.querySelectorAll('.minus');
var Cur_money; // cấp số tiền trong localStorage
var Bet = [0, 0 , 0, 0, 0, 0];
var bet_coin = 0; // tổng số tiền đặt
var x,y,z;
var s = [ 'huou', 'bau', 'ga','ca', 'cua', 'tom'];
//hoàn thành bước lấy giá trị từ localStorage về
//lấy giá trị từ localStorage chuyển thành mảng của object
var yet = JSON.parse(localStorage.getItem('null'));
console.log(yet)
if( yet == 1 ){
var users = JSON.parse(localStorage.getItem('users')); // tất cả các tài khoản
var player = JSON.parse(localStorage.getItem('player')); // tài khoản đang đăng nhập
document.getElementById('Money').innerHTML = player.coin;
Cur_money = player.coin;
}

//chuyển tiền lại localStorage
function ss(){
        users.forEach((items,index) =>{
                if( items.Name == player.Name && items.Password == player.Password ){
                        items.coin = Cur_money;
                        localStorage.setItem('player',JSON.stringify(items));
                        localStorage.setItem('users',JSON.stringify(users));
                }
        })
}
//Lắc và tính tiền
btn.addEventListener('click', function Play(){
        x = Math.floor(Math.random() * 6);
        y = Math.floor(Math.random() * 6);
        z = Math.floor(Math.random() * 6);
        /* Lắc */
        if( bet_coin > 0  ){ // kiểm tra nếu đặt thì mới cho lắc
                Play_img.innerHTML =  `<img src="./${s[x]}.png" id="img1" alt="">`+
                                `<img src="./${s[y]}.png" id="img2" alt="">` +
                                `<img src="./${s[z]}.png" id="img3" alt="">`;
                document.getElementById('img1').style.animation = "change 1s ease";
                document.getElementById('img2').style.animation = "change 1s ease";
                document.getElementById('img3').style.animation = "change 1s ease";
                console.log(s[x] + ' ' + s[y] + ' ' + s[z]);
                for( var i = 0; i < 6; i++ ){
                        //nếu đặt thì mới xét
                        if( Bet[i] > 0 ){
                                // đúng thì vào kiểm tra
                                if( s[i] == s[x] || s[i] == s[y] || s[i] == s[z]  ){ 
                                        if( s[i] == s[x] )
                                                Cur_money = Cur_money + Bet[i];
                                        if( s[i] == s[y] )
                                                Cur_money = Cur_money + Bet[i];
                                        if( s[i] == s[z] )
                                                Cur_money = Cur_money + Bet[i];
                                        Cur_money += Bet[i];
                                }
                                Bet[i] = 0;
                                document.getElementById('Money').innerHTML = Cur_money;
                                ss();// cập nhật lại tiền trên localstorage
                        }
                }       
        }
        bet_coin = 0;
})
plus.forEach((item, index) =>{
        item.addEventListener('click', function(){
                if( Cur_money > 0 ){
                        Bet[index] += 2000;
                        Cur_money -=2000;
                        bet_coin += 2000;
                        document.getElementById('Money').innerHTML = Cur_money;
                }
        })
});
minus.forEach((item, index) =>{
        item.addEventListener('click', function(){
                if( Bet[index] > 0 ){
                        Cur_money +=2000;
                        document.getElementById('Money').innerHTML = Cur_money;
                        Bet[index] -= 2000;
                        bet_coin -= 2000;
                }
        })
});