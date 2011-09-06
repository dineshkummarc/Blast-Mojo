/*
Class: mojo
Note: These functions reside within the mojo.* namespace.
*/
var mojo = {
  version: "2.0",
  /*
  Function: evaluateClassPath

  Returns the variable denoted by a dot-separated classpath

  Parameters:
  classPath - {string}

  Returns:
  {Mixed} variable

  Example:
  (start code)
  // instantiate an object by classpath without using eval
  var myObjectClassPath = 'stdlib.controller.TemplateController';
  var myObjectInstance = new mojo.evaluateClassPath(myObjectClassPath)();
  (end)
  */
  evaluateClassPath: function(classPath) {
    var classPathParts = classPath.split('.');

    var variable = window;
    for (var len = classPathParts.length, i = 0; i < len; i++) {
      if (variable) {
        variable = variable[classPathParts[i]];
      }
    }
    return variable;
  },
  /* 
  Function: define

  A helper method for reducing the complexities and cruft associated with
  creating Mojo controllers, commands, behaviors.

  Parameters:
  name - {string} The name of the controller/command/behavior
  definition - {object} The controller/command/behavior definition

  Example:
  {start code}
  mojo.define('Application.controller.RegistrationController', {

  });
  {end}
  */
  define: function(name, definition) {
    //by convention, do not allow custom controllers inheriting from custom 
    //controllers
    var parent = function(type) {
      if (type.match(/Controller/gi)) return mojo.controller.Controller;
      if (type.match(/Command/gi)) return mojo.command.Command;
      if (type.match(/Behavior/gi)) return mojo.command.Behavior;
    } (name);

    mojo.provide(name);
    mojo.declare(name, parent, definition);
  },
  /*
  Function: query
  
  Retrieves a set of nodes based on a given CSS selector. Includes support for CSS3 selectors.
  
  Parameters:
  cssSelectors - {string}
  rootObj - {DOMElement}
  
  Returns:
  {Array of DOMElements} elementListObj

  Example:
  (start code)
  // get anchors on the page with a class name of "link"
  var links = mojo.query("a.link");

  // get all divs on the page
  var divs = mojo.query("div");

  // get all the nodes with a class name of "selected" inside a particular node 
  // container
  var container = mojo.queryFirst("#container");
  var nodes = mojo.query(".selected", container);
    
  (end)
  */
  query: function(cssSelectors, rootObj) {
    if (rootObj && (typeof rootObj == "string" || typeof rootObj == "object")) {
      var results = dojo.query(cssSelectors, rootObj);
    } else {
      if ((new RegExp(/^\#[a-zA-Z0-9\-\_]*$/)).test(cssSelectors)) {
        var tmpElm = document.getElementById(cssSelectors.substring(1));
        if (tmpElm) {
          var results = [tmpElm];
        } else {
          var results = [];
        }
      } else {
        var results = dojo.query(cssSelectors);
      }
    }
    return results;
  },
  /*
  Function: queryFirst

  Retrieves the first node of a set of nodes based on a given CSS selector. Includes support for CSS3 selectors.
  
  Parameters:
  cssSelectors - {string}
  rootObj - {DOMElement}
    
  Returns:
  {DOMElement} elementListObj
    
  Example:
  (start code)
  // get a node with an id of "container"
  var container = mojo.queryFirst("#container");
  (end)
  */
  queryFirst: function(cssSelectors, rootObj) {
    var results = mojo.query(cssSelectors, rootObj);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  },

  /*
  Function: queryMatch
  
  Checks whether or not a given element matches a given CSS selector, and returns either the matching element, null if no matches, or a matching parent of the given element (if checkParents is true).
  
  Parameters:
  elementObj - {DOMElement}
  cssSelectors - {string}
  rootObj - {DOMElement}
  checkParents - {Boolean}
    
  Returns:
  {DOMElement} matchedElementObj

  */
  queryMatch: function(elementObj, cssSelectors, rootObj, checkParents) {
    if (!elementObj || elementObj == rootObj) return null;
    var basicSelector = false;
    var results = [];
    if ((new RegExp(/^[\#|\.]?[a-zA-Z0-9\-\_]+$/)).test(cssSelectors)) {
      basicSelector = true;
    } else {
      results = mojo.query(cssSelectors, rootObj);
    }
    while (elementObj && elementObj != rootObj) {
      if (basicSelector) {
        if ((cssSelectors.indexOf("#") == 0 && elementObj.id == cssSelectors.substring(1)) ||
          (cssSelectors.indexOf(".") == 0 && dojo.hasClass(elementObj, cssSelectors.substring(1))) ||
          (elementObj["tagName"] && elementObj.tagName.toLowerCase() == cssSelectors.toLowerCase())) {
          return elementObj;
        }
      } else {
        for (var i = 0, len = results.length; i < len; i++) {
          if (results[i] == elementObj) return elementObj;
        }
      }
      if (checkParents) {
        elementObj = elementObj.parentNode;
      } else {
        break;
      }
    }
    return null;
  }
};