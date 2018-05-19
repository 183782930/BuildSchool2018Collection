var randomNumber,win,minNumber,maxNumber,times=0,lastTimes=8;
function strat() {
    randomNumber = Math.floor(Math.random() * 100);
    win =false;
    minNumber = 0;
    maxNumber = 100;
}
strat();

var buttons = document.getElementsByTagName("button");
for(var i=0;i<buttons.length;i++)
{
    var button = buttons[i];
    button.onclick = function () {
        var btn = event.srcElement;
        document.getElementById("inputprint").value += btn.innerText;
    };
}
document.getElementById("cmdClean").onclick = function()
{
    document.getElementById("inputprint").value = "";
};

document.getElementById("enter").onclick = function()
{  
    if(lastTimes!=0)
    {
        var num = parseInt(document.getElementById("inputprint").value);
        console.log(num);
        times++;
        document.getElementById("guessTimes").value = "猜測次數 " + times + " 次";

        if (num == randomNumber) {
            document.getElementById("outputprint").value = "猜對了";
        }
        else if (num > randomNumber) {
            maxNumber = (num < maxNumber)? num:maxNumber;
            document.getElementById("outputprint").value = minNumber + " 到 " + maxNumber;
        }
        else {
            minNumber = (num > minNumber)? num:minNumber;
            document.getElementById("outputprint").value = minNumber + " 到 " + maxNumber;
        }
        lastTimes--;
        document.getElementById("lastTimes").value = "剩餘次數 " + lastTimes + " 次";
        if(lastTimes==0)
        {
            document.getElementById("outputprint").value = "你輸了";
        }
    }
    document.getElementById("inputprint").value = "";
};
