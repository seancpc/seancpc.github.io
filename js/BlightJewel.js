// 回到頂端
$(function () {
    $('#BackTop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 333);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('#BackTop').fadeIn(300);
        } else {
            $('#BackTop').stop().fadeOut(444);
        }
    }).scroll();
});

// 聯想字
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
var countries = ["鑽石", "紅寶石", "藍寶石", "戒指", "GIA鑽石", "珠寶", "吊飾",
    "墜飾", "對戒", "鑽飾", "黃寶石", "手鍊", "項鍊", "耳環", "婚戒", "訂婚戒指",
    "婚禮珠寶", "珍珠母貝", "綠松石", "孔雀石", "紅玉髓", "虎眼石", "黑瑪瑙",
    "手鐲", "冠冕", "碎鑽", "鑲鑽", "璀璨", "典雅珠寶", "高級珠寶", "5克拉鑽戒", "10克拉鑽戒",];
autocomplete(document.getElementById("myInput"), countries);

