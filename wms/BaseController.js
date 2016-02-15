/*global history */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "yelcho/wmsdemo/util/formatter"
], function(Controller, History, formatter) {
    "use strict";

    return Controller.extend("yelcho.wmsdemo.BaseController", {

        formatter: formatter,

        onInit: function() {

            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            this.getView().setBusyIndicatorDelay(0);

            // TODO Remove this later
            this.getOwnerComponent().getModel().setUseBatch(false);

        },
        getRouter: function() {
            return this.getOwnerComponent().getRouter();
        },

        getModel: function(sName) {
            return this.getView().getModel(sName);
        },

        setModel: function(oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        onHomePress: function(oEvent) {
            this.getRouter().navTo('default', {}, true);
        },
        onNavBack: function(route) {
            var sPreviousHash = History.getInstance().getPreviousHash();

            if (sPreviousHash !== undefined) {
                // The history contains a previous entry
                history.go(-1);
            } else {
                // Otherwise we go backwards with a forward history
                var bReplace = true;
                this.getRouter().navTo(route, {}, bReplace);
            }
        }
    });

});