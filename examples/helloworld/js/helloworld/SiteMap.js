dojo.provide("helloworld.SiteMap");
helloworld.SiteMap = [
  {
    pattern: ".mojoTemplate",
    controllers: [{ controller: "stdlib.controller.TemplateController"}]
  },
  {
    pattern: "#registration-form",
    controllers: [{ controller: "helloworld.controller.RegistrationController" }]
  }
];