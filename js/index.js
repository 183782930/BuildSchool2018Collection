function routeString(route,height)
{
    var str = "<iframe src="+ route +" width=\"100%\"; height=\""+ height +"\" frameborder=\"0\" scrolling=\"no\" ></iframe>";
    return str;
}

$("#shoppe").on("click",function(){
    route = "Shoppe/List_Shoppe.html";
    $("#PartView").html(routeString(route,"2600"));
});

$("#trello").on("click",function(){
    route = "Trello/List_Trello.html";
    $("#PartView").html(routeString(route,"600"));
});

$("#gianthello").on("click",function(){
    route = "GiantHello/List_GiantHello.html";
    $("#PartView").html(routeString(route,"800"));
});

$("#twitch").on("click",function(){
    route = "Twitch/List_Twith.html";
    $("#PartView").html(routeString(route,"600"));
});

$("#calender").on("click",function(){
    route = "Calendar/List_Calendar.html";
    $("#PartView").html(routeString(route,"600"));
});

$("#slot").on("click",function(){
    route = "Slot/List_Slot.html";
    $("#PartView").html(routeString(route,"600"));
});