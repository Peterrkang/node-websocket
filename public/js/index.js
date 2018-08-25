var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("New message", message);

  let li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
  let li = jQuery("<li></li>");
  let a = jQuery('<a target="_blank">My Current location</a>');
  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
});

$("#message-form").submit(function(event) {
  event.preventDefault();

  var messageTextbox = jQuery("[name=message]");
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextbox.val()
    },
    function(data) {
      messageTextbox.val();
    }
  );

  $("#message-form").trigger("reset");
});

$("#send-location").click(function(event) {
  const location = $("#send-location");
  if (!navigator.geolocation) {
    return alert("Geolocation not support by your browser");
  }
  location.attr("disabled", "disabled").text("Sending location...");
  navigator.geolocation.getCurrentPosition(
    function(position) {
      location.removeAttr("disabled").text("Send Location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      return alert("Unable to fetch location.");
    }
  );
});
