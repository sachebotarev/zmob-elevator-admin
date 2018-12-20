sap.ui.define([
    "rusagro/elevator/admin/controller/Base.controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(BaseController,JSONModel, MessageToast) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.Property", {
        onInit: function() {
            BaseController.prototype.onInit.apply(this, arguments);
            this.__oViewModel = new JSONModel({
                busy: false,
                data: null
            });
            this.getView().setModel(this.__oViewModel,"view");
            this.__getProperty();
        },

        handlerRefresh: function (oEvent) {
            this.__getProperty();
        },

        __getProperty: function () {
            this.getMainODataService().getProperties()
                .then(data=>{
                    this.__oViewModel.setProperty("/data", data["results"]);
                    this.__oViewModel.refresh();
                })
                .catch(error=>{
                    MessageToast.show(this.getResourceBundle().getText("properties.notload"));
                });
        }
    });
});
