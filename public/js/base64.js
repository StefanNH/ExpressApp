function encodeB64()
{
    var msg = document.getElementById("message4").value;
    var result = window.btoa(msg);
    document.getElementById("message4").value = result;
}

function decodeB64()
{
    var msg = document.getElementById("message4").value;
    var result = window.atob(msg);
    document.getElementById("message4").value = result;
}