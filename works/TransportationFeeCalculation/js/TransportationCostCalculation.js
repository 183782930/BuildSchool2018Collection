var map;
var marker = null;
var center = {lat: 24.7571075, lng: 120.952429};
var point1 = null,point2 = null;
var directionsService = null;
var directionsDisplay = null;

window.onload = function(){
    map = new google.maps.Map(
        document.getElementById('map'),{
            center:center,
            zoom:13
        }
    );

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);

    map.addListener("click",function(e){
        if(point1 != null && point2 != null)
        {
            point1 = null;
            $("#origin").text("0");
            point2 = null;
            $("#destination").text("0");
        }
        if(point1 == null)
        {
            point1 = e.latLng.lat() + ',' + e.latLng.lng();
            $("#origin").text(point1);
            return;
        }
        if(point2 == null)
        {
            point2 = e.latLng.lat() + ',' + e.latLng.lng();
            $("#destination").text(point2);
        }
        
        //開車
        document.getElementById("drive").onclick = function()
        {
            if(document.getElementById("print").hasChildNodes())
            {
                document.getElementById("print").removeChild(document.getElementById("print").firstChild);
            }
            if(point1 != null && point2!= null)
            {
                directionsService.route({
                origin: point1,//point1
                destination: point2,//point2
                travelMode:'DRIVING'
                },function (response,status) {
                    if(status === 'OK')
                    {
                        directionsDisplay.setDirections(response);
                    }
                    else
                    {
                        window.alert('Directions request failed due to ' + status);
                    }
                    var count = 0;
                    var p = document.createElement("p");
                    for(var item of response.routes["0"].legs["0"].steps)
                    {
                        if(item.instructions.match("收費路段") != null)
                        {
                            count += item.distance.value*(0.0012 +0.005);
                        }
                        else
                        {
                            count += item.distance.value*(0.005);
                        }
                    }
                    p.innerText = "開車: $" + Math.ceil(count);
                    document.getElementById("print").appendChild(p);
                });
            }
        };//開車End

        //計程車
        document.getElementById("taxi").onclick = function()
        {
            if(document.getElementById("print").hasChildNodes())
            {
                document.getElementById("print").removeChild(document.getElementById("print").firstChild);
            }
            if(point1 != null && point2!= null)
            {
                directionsService.route({
                origin: point1,//point1
                destination: point2,//point2
                travelMode:'DRIVING'
                },function (response,status) {
                    if(status === 'OK')
                    {
                        directionsDisplay.setDirections(response);
                    }
                    else
                    {
                        window.alert('Directions request failed due to ' + status);
                    }
                    var count = 0;
                    var p = document.createElement("p");
                    for(var item of response.routes["0"].legs["0"].steps)
                    {
                        if(item.instructions.match("收費路段") != null)
                        {
                            count += item.distance.value*(0.0012);
                        }
                    }

                    if(response.routes["0"].legs["0"].distance.value > 1500)
                    {
                        count += 85 + Math.floor((response.routes["0"].legs["0"].distance.value-1500)/250)*5;
                    }
                    else
                    {
                        count += 85;
                    }
                    p.innerText = "計程車: $" + Math.ceil(count);
                    document.getElementById("print").appendChild(p);
                });
            }
        };//計程車End

        //運輸工具
        document.getElementById("transportation").onclick = function()
        {
            if(document.getElementById("print").hasChildNodes())
            {
                document.getElementById("print").removeChild(document.getElementById("print").firstChild);
            }
            if(point1 != null && point2!= null)
            {
                directionsService.route({
                origin: point1,//point1
                destination: point2,//point2
                travelMode:'TRANSIT'
                },function (response,status) {
                    if(status === 'OK')
                    {
                        directionsDisplay.setDirections(response);
                    }
                    else
                    {
                        window.alert('由於' + status +"導致請求失敗");
                    }
                    var p = document.createElement("p");
                    p.innerText = "大眾運輸工具: " + response.routes["0"].fare.text;
                    document.getElementById("print").appendChild(p);
                });
            }
        };//運輸工具End
    });
};