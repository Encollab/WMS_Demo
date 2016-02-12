sap.ui.define([
    "yelcho/wmsdemo/BaseController"
], function(Controller) {
    "use strict";
    return Controller.extend("yelcho.wmsdemo.App", {

        onInit: function() {
            Controller.prototype.onInit.apply(this, arguments);
        }
    });
});