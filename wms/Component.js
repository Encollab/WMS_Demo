sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function(UIComponent, JSONModel, InfoDialog, Device) {
    "use strict";
    return UIComponent.extend("yelcho.wmsdemo.Component", {
        metadata: {
            manifest: "json"
        },
        init: function() {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // set device model
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            this.getRouter().initialize();
        },
        getContentDensityClass: function() {
            if (!this._sContentDensityClass) {
                if (!sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });
});