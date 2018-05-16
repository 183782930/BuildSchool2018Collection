var slotarray = [];
var pointTable =[];
var CurrentPosition = 0;
var Step = 0;
var currentDeg = 0;

var fruit ={
    seven:100,
    star : 50,
    pineapple :30,
    watermelon :30,
    grapes : 30,
    peach : 30,
    pear : 20,
    cherry : 20
};
newGame();

function GetId() {
    for (var i = 1; i <= 32; i++) {
        slotarray.push(document.getElementById("i" + i));
    }
}

function GetValue(){
    $("#btn1").attr("value",fruit.seven);
    $("#btn2").attr("value",fruit.star);
    $("#btn3").attr("value",fruit.pineapple);
    $("#btn4").attr("value",fruit.watermelon);
    $("#btn5").attr("value",fruit.grapes);
    $("#btn6").attr("value",fruit.peach);
    $("#btn7").attr("value",fruit.pear);
    $("#btn8").attr("value",fruit.cherry);
}
document.getElementById("start").onclick = function () {
    Step = slotarray.length * 4 + Math.floor(Math.random() * (slotarray.length - 1));
    CompleteAmount();
};

function Run() {
    slotarray[CurrentPosition].className = "";

    CurrentPosition++;
    if (CurrentPosition >= slotarray.length) {
        CurrentPosition = 0;
    }

    slotarray[CurrentPosition].className += "active";
    currentDeg = Step;
    if (--Step != 0) {
        var rad = degreeToRadius(currentDeg - 90);
        var a = Math.abs(Math.tan(rad));

        var speed = Math.max(10, Math.min(250, 30 * a));
        setTimeout(Run, speed);
    } else {
        slotarray[CurrentPosition].className += " last";
        CompleteWinPoint(slotarray[CurrentPosition].id);
        // console.log(slotarray[CurrentPosition].id);
    }

    function degreeToRadius(deg) {
        return deg * Math.PI / 180;
    }
}

function newGame() {
    document.getElementById("source").value = 0;
    document.getElementById("totalAmount").value = 5000;
    document.getElementById("bet").value = 0;
    GetId();
    GetValue();
    CreatePointTable();
}
//單點
$(".btn-bet").on("click", function () {
    var $totalBetAmount = parseFloat($("#bet").val()) + parseFloat(this.value);
    $("#bet").val($totalBetAmount);
    var count = parseFloat($("#b" + this.id.split("btn")[1]).text()) + 1;
    $("#b" + this.id.split("btn")[1]).text(count);
});
//全加
$("#alladd").on("click", function () {
    var $totalBetAmount = parseFloat($("#bet").val());
    $.each($(".btn-bet"), function (index, item) {
        $totalBetAmount += parseFloat(item.value);
        var count = parseFloat($("#b" + (index + 1)).text()) + 1;
        $("#b" + (index + 1)).text(count);
    });
    $("#bet").val($totalBetAmount);
});
//全減
$("#allless").on("click", function () {
    var $totalBetAmount = parseFloat($("#bet").val());
    var allMoreThanZero = true;
    $.each($(".card-span:odd"), function (index, item) {
        if (parseFloat(item.innerText) - 1 < 0) {
            alert("不能再減了");
            allMoreThanZero = false;
            return false;
        }
    });
    if (allMoreThanZero) {
        $.each($(".btn-bet"), function (index, item) {
            $totalBetAmount -= parseFloat(item.value);
            var count = parseFloat($("#b" + (index + 1)).text()) - 1;
            $("#b" + (index + 1)).text(count);
        });
        $("#bet").val($totalBetAmount);
    }
});
//全清除
$("#alldelete").on("click", function () {
    $("#bet").val("0");
    var n = 1;

    while (true) {
        var $item = $("#b" + n);

        if ($item.length <= 0) {
            break;
        }
        $item.text("0");
        n++;
    }
});
function CreatePointTable() {
        pointTable = [
        {id: "i1",bid:"b7",value: fruit.pear},
        {id: "i2",bid:"b1",value: fruit.seven},
        {id: "i3",bid:"b8",value: fruit.cherry},
        {id: "i4",bid:"b7",value: fruit.pear},
        {id: "i5",bid:"b5",value: fruit.grapes},
        {id: "i6",bid:"b4",value: fruit.watermelon},
        {id: "i7",bid:"b8",value: fruit.cherry},
        {id: "i8",bid:"b3",value: fruit.pineapple},
        {id: "i9",bid:"b7",value: fruit.pear},
        {id: "i10",bid:"b5",value: fruit.grapes},
        {id: "i11",bid:"b8",value: fruit.cherry},
        {id: "i12",bid:"b2",value: fruit.star},
        {id: "i13",bid:"b6",value: fruit.peach},
        {id: "i14",bid:"b8",value: fruit.cherry},
        {id: "i15",bid:"b4",value: fruit.watermelon},
        {id: "i16",bid:"b7",value: fruit.pear},
        {id: "i17",bid:"b6",value: fruit.peach},
        {id: "i18",bid:"b4",value: fruit.watermelon},
        {id: "i19",bid:"b1",value: fruit.seven},
        {id: "i20",bid:"b3",value: fruit.pineapple},
        {id: "i21",bid:"b7",value: fruit.pear},
        {id: "i22",bid:"b4",value: fruit.watermelon},
        {id: "i23",bid:"b5",value: fruit.grapes},
        {id: "i24",bid:"b3",value: fruit.pineapple},
        {id: "i25",bid:"b8",value: fruit.cherry},
        {id: "i26",bid:"b7",value: fruit.pear},
        {id: "i27",bid:"b6",value: fruit.peach},
        {id: "i28",bid:"b2",value: fruit.star},
        {id: "i29",bid:"b5",value: fruit.grapes},
        {id: "i30",bid:"b8",value: fruit.cherry},
        {id: "i31",bid:"b3",value: fruit.pineapple},
        {id: "i32",bid:"b6",value: fruit.peach}
     ];
}
function CompleteWinPoint(pointId){
    var data;
    $.each(pointTable,function(Index,item){
        if(item.id ==pointId){
            data = item;
            return false;
        }
    });
    var count = $("#"+data.bid).text();
    var $source = $("#source");
    $source.val(parseFloat($source.val())+parseFloat(count)*data.value*data.value/10);
    $("#totalAmount").val(parseFloat($("#totalAmount").val()) + parseFloat(count)*data.value*data.value/10);
}

function CompleteAmount(){
    var $amount = $("#totalAmount");
    var $bet = $("#bet");
    var subtraction = parseFloat($amount.val())-parseFloat($bet.val());
    if( subtraction < 0 )
    {
        alert("你的錢不夠了");
    }
    else if($bet.val() == 0){
        alert("你需要下注!");
    }
    else
    {
        $amount.val(subtraction);
        Run();
    }
}