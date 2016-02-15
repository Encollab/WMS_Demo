/*global location*/
sap.ui.define([
    "yelcho/wmsdemo/BaseController",
    "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("yelcho.wmsdemo.bin.Detail", {


        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit: function() {
            // Model used to manipulate control states. The chosen values make sure,
            // detail page is busy indication immediately so there is no break in
            // between the busy indication for loading the view's meta data
            var iOriginalBusyDelay,
                oViewModel = new JSONModel({
                    busy: true,
                    delay: 0,
                    quantItemListTitle: this.getResourceBundle().getText("quantItemListTitle")
                });

            this.getRouter().getRoute("bindetail").attachPatternMatched(this._onObjectMatched, this);
            // Store original busy indicator delay, so it can be restored later on
            iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
            this.setModel(oViewModel, "detailView");
            this.getOwnerComponent().getModel().metadataLoaded().then(function() {
                // Restore original busy indicator delay for the object view
                oViewModel.setProperty("/delay", iOriginalBusyDelay);
            });
        },

        onQuantsUpdateFinished: function(oEvent) {
            var sTitle,
                iTotalItems = oEvent.getParameter("total"),
                oViewModel = this.getModel("detailView");

            // only update the counter if the length is final
            if (this.byId("quantItemsList").getBinding("items").isLengthFinal()) {
                if (iTotalItems) {
                    sTitle = this.getResourceBundle().getText("quantItemListTitleCount", [iTotalItems]);
                } else {
                    //Display 'Line Items' instead of 'Line items (0)'
                    sTitle = this.getResourceBundle().getText("quantItemListTitle");
                }
                oViewModel.setProperty("/quantItemListTitle", sTitle);
            }
        },
        onQuantPress: function(oEvent) {
            var oItem = oEvent.getParameter('listItem').getBindingContext().getObject();
            this.getRouter().navTo("stockdetail", {
                stockPath: "Materials('"+oItem.MaterialId+"')"
            });
        },
        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */
        /**
         * Binds the view to the object path.
         * @function
         * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
         * @private
         */
        _onObjectMatched: function(oEvent) {
            var sObjectId = oEvent.getParameter("arguments").binPath;
            this.getModel().metadataLoaded().then(function() {
                this._bindView("/" + sObjectId);
            }.bind(this));
        },

        /**
         * Binds the view to the object path.
         * @function
         * @param {string} sObjectPath path to the object to be bound
         * @private
         */
        _bindView: function(sObjectPath) {
            var oViewModel = this.getModel("detailView"),
                oDataModel = this.getModel();

            this.getView().bindElement({
                path: sObjectPath,
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function() {
                        oDataModel.metadataLoaded().then(function() {
                            // Busy indicator on view should only be set if metadata is loaded,
                            // otherwise there may be two busy indications next to each other on the
                            // screen. This happens because route matched handler already calls '_bindView'
                            // while metadata is loaded.
                            oViewModel.setProperty("/busy", true);
                        });
                    },
                    dataReceived: function() {
                        oViewModel.setProperty("/busy", false);
                    }
                }
            });
        },

        _onBindingChange: function(oEvent) {
            var oView = this.getView(),
                oViewModel = this.getModel("detailView"),
                oElementBinding = oView.getElementBinding();

            // No data for the binding
            if (!oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("objectNotFound");
                return;
            }

            var oResourceBundle = this.getResourceBundle(),
                oObject = oView.getBindingContext().getObject(),
                sObjectId = oObject.ObjectID,
                sObjectName = oObject.Name;

            // Everything went fine.
            oViewModel.setProperty("/busy", false);
            oViewModel.setProperty("/shareSendEmailSubject",
                oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
            oViewModel.setProperty("/shareSendEmailMessage",
                oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
        }

    });

});