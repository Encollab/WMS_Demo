sap.ui.define([
    "yelcho/wmsdemo/BaseController"
], function(Controller) {
    "use strict";
    return Controller.extend("yelcho.wmsdemo.Dashboard", {
        onInit: function() {
            Controller.prototype.onInit.apply(this, arguments);
        },
        onPressTile: function(oEvent) {
            var oTile = oEvent.getSource();
            this.getRouter().navTo(oTile.data().routePattern);
        }
    });
});