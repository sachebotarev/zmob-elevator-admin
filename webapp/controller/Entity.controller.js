sap.ui.define([
    "rusagro/elevator/admin/controller/Base.controller",
    "rusagro/elevator/admin/service/EntityService",
    "sap/m/MessageToast"
], function(BaseController,EntityService,MessageToast) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.Entity", {
        onInit: function() {
            BaseController.prototype.onInit.apply(this, arguments);
        },

        handleSyncAll: function(oEvent){
            var oView = this.getView();
            var that =  this;
            MessageToast.show("Sync started");
            oView.setBusy(true);
            this.getEntityService().syncAll()
                .then(function (data) {
                    oView.setBusy(false);
                    MessageToast.show("Sync success");
                    that.getModel().refresh();
                    jQuery.sap.log.info("Success");
                })
                .catch(function (reason) {
                    oView.setBusy(false);
                    MessageToast.show("Sync error");
                    jQuery.sap.log.error(reason);
                });
        },

        handleSyncOperation: function (oEvent) {
            var that =  this;
            var oSource =  oEvent.getSource();
            var oData = oSource.getBindingContext().getObject();
            this.getEntityService().syncOperation(oData.Name)
                .then(function (data) {
                    MessageToast.show("Sync success");
                    that.getModel().refresh();
                    //console.log(data);
                })
                .catch(function (reason) {
                    MessageToast.show("Sync error");
                   // console.error(reason);
                });
        },

        handleClearOperation: function (oEvent) {
            var that =  this;
            var oSource =  oEvent.getSource();
            var oData = oSource.getBindingContext().getObject();
            this.getEntityService().clearOperation(oData.Name)
                .then(function (data) {
                    MessageToast.show("Clear success");
                    that.getModel().refresh();
                   // console.log(data);
                })
                .catch(function (reason) {
                    MessageToast.show("Clear error");
                   // console.error(reason);
                });
        },

        handleInitPress: function (oEvent) {
            var oView = this.getView();
            var that = this;
            oView.setBusy(true);
            this.getEntityService().init()
                .then(function (data) {
                    MessageToast.show("Init success");
                    that.getModel().refresh();
                    oView.setBusy(false);
                   // console.log(data);
                })
                .catch(function (reason) {
                    MessageToast.show("Init error");
                    oView.setBusy(false);
                   // console.error(reason);
                });
        }


    });
});
