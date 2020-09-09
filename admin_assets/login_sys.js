function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//dont convert these into axios calls, or move inside vue
var token = getCookie('token')
if (!token) {
    window.location.href = 'admin-login.html';
} else {
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            stat = (JSON.parse(this.responseText)).verified;
            if (!stat) { window.location.href = 'admin-login.html' }
        }
    });
    xhr.open("GET", "http://unbottle.pythonanywhere.com/kumaran/is-user/");
    xhr.setRequestHeader("Authorization", `Token ${token}`);
    xhr.send();
}

function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = 'admin-login.html';
}
