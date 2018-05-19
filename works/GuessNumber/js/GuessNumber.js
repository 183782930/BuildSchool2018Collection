var GenerateFigures = function()
{
    var randomNumber;
    var arrays = [];
    //取得四位數
    this.GetFourNumber = function()
    {
        var times = 0;
        while(times!=4)
        {
            F_random();
            if(arrays.some(Compare) === false)
            {
                arrays.push(randomNumber);
                times++;
            }
        }
    };
    //產生亂數
    function F_random()
    {
        randomNumber = Math.floor(Math.random() * 10);
    }
    //比對是否一樣
    function Compare(x)
    {
        return x === randomNumber;
    }
    //取得陣列
    this.GetArray = function()
    {
        var s ="";
        arrays.forEach(function(element)
        {
            s+=element;
        });
        return s;
    };
    //判斷數字正確與否
    this.MatchingNumbers = function(input){
        var a = 0,b = 0,length = 4;
        var num = this.GetArray();
        for(var i=0;i<length;i++)
        {
            for(var j=0;j<length;j++)
            {
                if(num[i]===input[j])
                {
                    b++;
                }
            }
            if(num[i]===input[i])
            {
                b--;
                a++;
            }
        }
        return a+"A"+b+"B";
    };
    
};
var game = false;
var number;
//開始遊戲
document.getElementById("start").onclick = function()
{
    number = new GenerateFigures();
    number.GetFourNumber();
    game = true;
    alert("遊戲開始");
    console.log("答案為:" + number.GetArray());
};
//看答案
document.getElementById("lookAnswer").onclick = function()
{
    if(game == false)
    {
        alert("遊戲尚未開始");
    }
    else
    {
        alert("答案為:" + number.GetArray());
    }
};
//放棄重來
document.getElementById("restart").onclick = function()
{
    if(game == false)
    {
        alert("遊戲尚未開始");
    }
    else
    {
        game = false;
        DeleteListItem();
        alert("遊戲結束,請重新開始");
    }
};
//按鈕 猜!
document.getElementById("inputBtn").onclick = function()
{
    var input = document.getElementById("inputNumber").value;//輸入數字
    if(isNaN(input) || input.length!=4)
    {
        alert("請輸入4位數數字");
    }
    else
    {
        if(game == false)
        {
            alert("遊戲尚未開始");
        }
        else
        {   
            var countAandB = number.MatchingNumbers(input);//取得AB
            console.log(countAandB);
            CreateListItem(countAandB,input);//產生列表
        }
    }
    document.getElementById("inputNumber").value = "";//清空
};
//新增列表元素
function CreateListItem(countAandB,input)
{
    var list = document.querySelector(".list-group");
    
    var listItem = document.createElement("li"); 
    listItem.className = "list-group-item";

    var itemBadge = document.createElement("span");
    if(countAandB =="4A0B")
    {
        itemBadge.className = "badge badge-success";
    }
    else
    {
        itemBadge.className = "badge badge-danger";
    }
    itemBadge.innerHTML = countAandB;

    var text =  document.createTextNode(" "+input);
    listItem.appendChild(itemBadge);
    listItem.appendChild(text);
    list.appendChild(listItem);
}
//清空列表元素
function DeleteListItem()
{
    var list = document.querySelector(".list-group");
    while(list.hasChildNodes())
    {
        list.removeChild(list.firstChild);
    }
}

