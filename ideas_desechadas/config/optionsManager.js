function saveOptions() {
    
}

function initializeOptions() {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var options = xmlhttp.responseText + "";
            options.replace(/<&#91;^>&#93;*>/g, "");
            var optionsValues = options.split(',');

            for (var i = 0; i < optionsValues.length; i++) {
                var particularOption = optionsValues[i].split(':');
                switch (particularOption[0]) {
                    case "music":
                        document.getElementById("musicRange").value = particularOption[1];
                        break;
                }
            }
            
        }
    }

    xmlhttp.open("GET", "config/options.txt", true);
    xmlhttp.send();
}

initializeOptions();
