function routeString(route,height)
{
    var str = "<iframe src="+ route +" width=\"100%\"; height=\""+ height +"\" frameborder=\"0\" scrolling=\"no\" ></iframe>";
    return str;
}

$("#shoppe").on("click",function(){
    route = "Shoppe/List_Shoppe.html";
    $("#PartView").html(routeString(route,"2800"));
});

$("#trello").on("click",function(){
    route = "Trello/List_Trello.html";
    $("#PartView").html(routeString(route,"100%"));
});

$("#gianthello").on("click",function(){
    route = "GiantHello/List_GiantHello.html";
    $("#PartView").html(routeString(route,"800"));
});

$("#twitch").on("click",function(){
    route = "Twitch/List_Twith.html";
    $("#PartView").html(routeString(route,"100%"));
});