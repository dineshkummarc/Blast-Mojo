dojo.provide("helloworld.controller.RegistrationController");
dojo.declare("helloworld.controller.RegistrationController", mojo.controller.Controller, {
  addObservers: function() {
    console.log("Controller has been mapped");
  },
  addCommands: function() { },
  addIntercepts: function() { }
});