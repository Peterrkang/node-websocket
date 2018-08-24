var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

  // socket.emit("createEmail", {
  //   to: "jen@example.com",
  //   text: "Hey, this is Peter"
  // });
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

$("#message-form").submit(function(event) {
  event.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: this.message.value
    },
    function(data) {
      console.log("Got it", data);
    }
  );

  $("#message-form").trigger("reset");
});
