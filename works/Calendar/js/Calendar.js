var date = new Date();

function CrateTable() {
    document.getElementById("calendar-title").innerText = MonthTextChange(date.getMonth());
    document.getElementById("calendar-year").innerText = date.getFullYear();
    date.setDate(1);
    var NowMonth = date.getMonth();
    //日期初始化
    while (date.getDay() != 0) {
        date.setDate(date.getDate() - 1);
    }
    //印出月曆
    for (var i = 0; i < 6; i++) {
        $("#table_items").append(
            $("<tr>").css("height", "90px")
        );

        for (var j = 0; j < 7; j++) {
            //tr裡面新增td td的文字設定日期
            $("tr:eq(" + i + ")").append(
                $("<td>").text(date.getDate())
            );

            //如果不是本月份設定字為淡藍色
            if (date.getMonth() != NowMonth) {
                $("tr:eq(" + i + ") td:eq(" + j + ")").css("color", "#83c1ff");
            }
            //建立key值
            var key = date.getFullYear() +
                "-" +
                (date.getMonth()+1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
                "-" +
                (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
            // console.log(key);
            // console.log(JSON.parse(localStorage.getItem(key)));

            //建立當日內容
            if (JSON.parse(localStorage.getItem(key)) != null) {
                $("tr:eq(" + i + ") td:eq(" + j + ")").append(
                    $("<ul>").css({
                        "list-style-type": "none",
                        "padding": "0px",
                        "text-align": "left"
                    })
                );
                //次數
                var times = 0;
                for (var item of JSON.parse(localStorage.getItem(key)).schedules) {
                    $("tr:eq(" + i + ") td:eq(" + j + ") ul").append(
                        $("<li>").text(item.subject)
                        .css("color",item.color)
                        .attr("data-toggle","modal")
                        .attr("data-target","#modifyModal")
                        .attr("id",key+","+ times)
                        .on("click",function(){
                            var mkey = this.id.split(",");
                            var modifyData = JSON.parse(localStorage.getItem(mkey[0]));
                            $("#modifyEventName").val(modifyData.schedules[mkey[1]].subject);
                            $("#modifyDate").val(modifyData.key);
                            $("#modifyStartTime").val(modifyData.schedules[mkey[1]].fromHr);
                            $("#modifyEndTime").val(modifyData.schedules[mkey[1]].toHr);
                            $("#modifyColor").val(modifyData.schedules[mkey[1]].color);
                            $("#modifystore").attr("value",this.id);
                            $("#deletedata").attr("value",this.id);
                        })
                    );
                    times++;
                }
            }
            //日期加一天
            date.setDate(date.getDate() + 1);
        }
    }
    // var tbody = document.getElementById("table_items");
    // for (var i = 0; i < 6; i++) {
    //     var tr = document.createElement("tr");
    //     tr.style = "height:90px;";
    //     for (var j = 0; j < 7; j++) {
    //         var td = document.createElement("td");
    //         td.innerText = date.getDate();
    //         if (date.getMonth() != NowMonth) {
    //             td.style = "color:#83c1ff;";
    //         }

    //         var key = date.getFullYear()+
    //                     "-"+
    //                     (date.getMonth()<10?"0"+(date.getMonth()+1):(date.getMonth()+1))+
    //                     "-"+
    //                     (date.getDate()<10?"0"+date.getDate():date.getDate());
    //         console.log(key);
    //         console.log(JSON.parse(localStorage.getItem(key)));

    //         if(JSON.parse(localStorage.getItem(key)) != null)
    //         {
    //             var ul = document.createElement("ul");
    //             ul.style = "list-style-type: none;padding:0px;text-align:left;";
    //             for (var item of JSON.parse(localStorage.getItem(key)).schedules) 
    //             {
    //                 var li = document.createElement("li");
    //                 li.innerText = item.subject;
    //                 ul.appendChild(li);
    //             }
    //             td.appendChild(ul);
    //         }

    //         date.setDate(date.getDate() + 1);
    //         tr.appendChild(td);
    //     }
    //     tbody.appendChild(tr);
    // }
}

function MonthTextChange(month) {
    var monthArray = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    return monthArray[month];
}

function CleanTable() {
    date.setMonth(date.getMonth()-1);
    $("tbody").text("");
    // var tbody = document.querySelector("tbody");
    // while (tbody.hasChildNodes()) {
    //     tbody.removeChild(tbody.firstChild);
    // }
}

CrateTable();
$("#next").on("click", function () {
    date.setMonth(date.getMonth()+1);
    CleanTable();
    CrateTable();
});
$("#prev").on("click", function () {
    date.setMonth(date.getMonth() - 1);
    CleanTable();
    CrateTable();
});

$("#store").on("click", function () {
    var scheduleItem = {
        subject: $("#inputEventName").val(), //內容
        fromHr: $("#selectStartTime").val(), //起始時間
        toHr: $("#selectEndTime").val(), //結束時間
        color: $("#selectColor").val() //顏色
    };

    var monthly = {
        key: $("#selectDate").val(),
        schedules: []
    };

    if (localStorage.getItem($("#selectDate").val()) != null) {
        var data = JSON.parse(localStorage.getItem($("#selectDate").val()));
        data.schedules.push(scheduleItem);
        localStorage.setItem($("#selectDate").val(), JSON.stringify(data));
    } else {
        monthly.schedules.push(scheduleItem);
        localStorage.setItem($("#selectDate").val(), JSON.stringify(monthly));
    }
    CleanTable();
    CrateTable();

    $("#selectDate").val("");
    $("#inputEventName").val("");
    $("#selectStartTime").val("");
    $("#selectEndTime").val("");
    $("#selectColor").val("");
});

$("#modifystore").on("click",function(){
    var mkey = this.value.split(",");
    var modifyData = JSON.parse(localStorage.getItem(mkey[0]));
    modifyData.schedules.splice(mkey[1],1);
    localStorage.setItem(mkey[0], JSON.stringify(modifyData));

    var scheduleItem = {
        subject: $("#modifyEventName").val(), //內容
        fromHr: $("#modifyStartTime").val(), //起始時間
        toHr: $("#modifyEndTime").val(), //結束時間
        color: $("#modifyColor").val() //顏色
    };

    var monthly = {
        key: $("#modifyDate").val(),
        schedules: []
    };

    if (localStorage.getItem($("#modifyDate").val()) != null) {
        var data = JSON.parse(localStorage.getItem($("#modifyDate").val()));
        data.schedules.push(scheduleItem);
        localStorage.setItem($("#modifyDate").val(), JSON.stringify(data));
    } else {
        monthly.schedules.push(scheduleItem);
        localStorage.setItem($("#modifyDate").val(), JSON.stringify(monthly));
    }

    CleanTable();
    CrateTable();
});

$("#deletedata").on("click",function() {
    var mkey = this.value.split(",");
    var deleteData = JSON.parse(localStorage.getItem(mkey[0]));
    deleteData.schedules.splice(mkey[1],1);
    localStorage.setItem(mkey[0], JSON.stringify(deleteData));
    CleanTable();
    CrateTable();
});