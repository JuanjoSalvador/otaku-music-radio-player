function startPoll() {
    pollId = setInterval(GetStreamingInfo, _pollDelay)
}
function stopPoll() {
    pollId && clearInterval(pollId)
}
function restartPoll() {
    stopPoll(),
    startPoll()
}
function jsonp(t, e, a, r) {
    t += t.indexOf("?") > -1 ? "&jsonp=" : "?jsonp=",
    t += a + "&",
    r && (t += encodeURIComponent(r) + "&"),
    t += (new Date).getTime().toString();
    var o = document.createElement("script");
    o.setAttribute("src", t),
    o.setAttribute("type", "text/javascript");
    var l = document.getElementsByTagName("head")[0];
    l && l.appendChild(o)
}
function GetStreamingInfo() {
    var t = "https://api.radionomy.com/currentsong.cfm?radiouid=" + radioUid + "&type=json&callmeback=yes&cover=yes";
    jsonp(t, "GetPlayInfo", "GetPlayInfo", "")
}
function GetPlayInfo(t) {
    _pollDelay = t.tracks.callmeback <= 0 ? 5e3 : 1 * t.tracks.callmeback,
    restartPoll(),
    jQuery("#Title").html(t.tracks.title), // Reemplazar por $scope?
    jQuery("#Artist").html(t.tracks.artists); // Reemplazar por $scope?
    var e = "";
    "" != t.tracks.cover ? (e = t.tracks.cover,
    e = e.replace(/^http:\/\//i, "https://")) : e = "../img/sincaratula.png",
    jQuery("#Caratula").attr("src", e)
}

jQuery.noConflict();
var pollId;
jQuery(document).ready(function() {
    GetStreamingInfo();
});