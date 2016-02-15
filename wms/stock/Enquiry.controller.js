sap.ui.define([
    "yelcho/wmsdemo/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("yelcho.wmsdemo.stock.Enquiry", {
        onInit: function() {
            Controller.prototype.onInit.apply(this, arguments);
        },
        onSearchBins: function(evt) {
            var searchString = evt.getSource().getValue();

            if (searchString && searchString.length > 0) {
                this._performSearch(searchString);
            }
        },
        _performSearch: function(searchString) {
            var oList = this.getView().byId('binList');
            var filters = [];

            this.getView().setBusy(true);

            if (!this._oStockTemplate) {
                this._oStockTemplate = sap.ui.xmlfragment("yelcho.wmsdemo.stock.searchTemplate", this);
            }

            if (searchString.length > 0) {
                filters = [
                    new Filter("MaterialId", FilterOperator.Contains, searchString.toUpperCase()),
                ];
            }

            oList.bindItems({
                path: "/Materials",
                template: this._oStockTemplate,
                filters: new Filter(filters, false)
            });
        },
        onUpdateFinished: function(oEvent) {
            if(oEvent.getSource().getItems().length === 1) {
                this.getRouter().navTo("stockdetail", {
                    stockPath: oEvent.getSource().getItems()[0].getBindingContext().getPath().substr(1)
                });
            }
            this.getView().setBusy(false);
        },
        onPress: function(oEvent) {
            var oItem = oEvent.getSource();
            this.getRouter().navTo("stockdetail", {
                stockPath: oItem.getBindingContext().getPath().substr(1)
            });
        }
    });
});