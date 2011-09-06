dojo.registerModulePath("mojo", "../../src");
dojo.registerModulePath("helloworld", "../helloworld/js/helloworld");

mojo.require("helloworld.SiteMap");
//dojo.extend(mojo, dojo);
dojo.addOnLoad(function() {
  var ctrlIniter = mojo.controller.Map.getInstance();
  ctrlIniter.setSiteMap(helloworld.SiteMap);
  ctrlIniter.mapControllers(window.location.href);
});

