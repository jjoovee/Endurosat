var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    $("#output").html("");
}

function connect() {
    var socket = new SockJS('/endurosat-websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        setConnected(true);
        showMessage("Client started");
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showMessage(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient) {
        stompClient.disconnect();
    }
    setConnected(false);
    showMessage("Client disconnected");
}

function showMessage(message) {
    $("#output").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
});