var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
});

socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
});

$("#message-form").submit(function(event) {
  event.preventDefault();

  var messageTextbox = $("[name=message]");
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextbox.val()
    },
    function() {
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
