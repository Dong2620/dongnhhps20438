var arrsp = new Array;
document.getElementById("showcart").style.display="none";

function themvaogiohang(x) {
    var arrGH = new Array();
    var gh_str = sessionStorage.getItem("ssgiohang");
    if (gh_str != null) arrGH =JSON.parse(gh_str);
    var countsp = sessionStorage.getItem("countsp");
    if(countsp == null) countsp = 0;
    var boxsp = x.parentElement.children;
    var hinh = boxsp[0].children[0].src;
    var gia = boxsp[1].children[0].innerText;
    var tensp = boxsp[2].innerText;
    var soluong = parseInt(boxsp[3].value);
    var sp = new Array(hinh, tensp, gia,soluong);
    var coroi = 0;
    for (let i = 0; i < arrGH.length; i++) {
        if(arrGH[i][1]== tensp){
            var sl = arrGH[i][3];
            sl += soluong;
            arrGH[i][3] = sl;
            coroi = 1;
            break;
        }
    }
    if (coroi == 0){
        arrGH.push(sp);
        countsp++;
    }
    sessionStorage.setItem("ssgiohang",JSON.stringify(arrGH));
    sessionStorage.setItem("countsp",countsp);
    showcountsp();
}

function showcart(){
    var x = document.getElementById('showcart');
    if (x.style.display == 'none'){
        x.style.display = 'block';
    }else {
        x.style.display = 'none';
    }
    laydon();
}

function showcountsp(){
    var countsp = sessionStorage.getItem("countsp");
    if(countsp == null) countsp =0;
    document.getElementById("countsp").innerHTML = countsp;
}

function laydon(){
    var gh_str =sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    var ttgh = "";
    var tong = 0;
    for(let i = 0; i < giohang.length; i++){
        var tt = giohang[i][2]*giohang[i][3];
        tong += tt;
        ttgh += `
        <tr>
            <td>${i+1}</td>
            <td><img src ="${giohang[i][0]}" alt=""></td>
            <td>${giohang[i][1]}</td>
            <td>${giohang[i][2]}</td>
            <td><input type ="number" min="0" max="10" value="${giohang[i][3]}"
                                                    onchange="tinhlaidon(this);"></td>
            <td>${tt}</td>
            </tr>
        `
    }
    ttgh +=`
    <tr>
        <th colspan="5">Tổng Đơn Hàng</th>
        <th id="tongtien">${tong}</th>
    </tr>    
    `
    document.getElementById("mycart").innerHTML= ttgh;
}

function tinhlaidon(x) {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var arrGH = JSON.parse(gh_str);
    var tr = x.parentElement.parentElement;
    var dg = parseInt(tr.children[3].innerHTML);
    var sl = x.value;
    var tt = parseInt(tr.children[5].innerHTML);
    var tongdon = document.getElementById("tongtien").innerText;
    tongdon -= tt;
    var tensp = tr.children[2].innerText;
    if (sl == 0) {
        dongy = confirm("Số lượng sẽ xóa sản phẩm khỏi giỏ hàng.");
        if (dongy == true) tr.remove();
        for (let i = 0; i < arrGH.length; i++) {
            if (arrGH[i][1] == tensp) {
                arrGH.splice(i, 1);
            }
        }
        var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
        sessionStorage.setItem("countsp", countsp);
    } else {
        for (let i = 0; i < arrGH.length; i++) {
            if (arrGH[i][1] == tensp) {
                arrGH[i][3] = sl;
            }
        }
        tt = dg * sl;
        tr.children[5].innerHTML = tt;
        tongdon += tt;
    }
    document.getElementById('tongtien').innerHTML = tongdon;
    sessionStorage.setItem("ssgiohang", JSON.stringify(arrGH));
}
