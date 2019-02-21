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
            MessageToast.show(this.getResourceBundle().getText("message.entity.start.sync"));
            oView.setBusy(true);
            this.getEntityService().syncAll()
                .then((data) => {
					MessageToast.show(this.getResourceBundle().getText("message.entity.success.sync"));
                    this.getModel().refresh();
                })
                .catch((reason) => {
                    MessageToast.show(this.getResourceBundle().getText("message.entity.filed.sync", reason.responseText));
				})
				.finally(() => {
					oView.setBusy(false);
				});
        },

        handleSyncOperation: function (oEvent) {
			var oSource =  oEvent.getSource();
			oSource.setBusy(true);
			MessageToast.show(this.getResourceBundle().getText("message.entity.start.sync"));
            var oData = oSource.getBindingContext().getObject();
            this.getEntityService().syncOperation(oData.Name)
                .then((data) => {
                    MessageToast.show(this.getResourceBundle().getText("message.entity.success.sync", oData.Name));
                    this.getModel().refresh();
                })
                .catch((reason) => {
					MessageToast.show(this.getResourceBundle().getText("message.entity.filed.sync", reason.responseText));
				})
				.finally(() => {
					oSource.setBusy(false);
				});
        },

        handleClearOperation: function (oEvent) {
			var oSource =  oEvent.getSource();
			oSource.setBusy(true);
			MessageToast.show(this.getResourceBundle().getText("message.entity.start.clear"));
            var oData = oSource.getBindingContext().getObject();
            this.getEntityService().clearOperation(oData.Name)
                .then((data) => {
					MessageToast.show(this.getResourceBundle().getText("message.entity.success.clear", oData.Name));
                    this.getModel().refresh();
                })
                .catch((reason) =>{
                    MessageToast.show(this.getResourceBundle().getText("message.entity.filed.clear", reason.responseText));
				})
				.finally(() => {
					oSource.setBusy(false);
				});
        },

        handleInitPress: function (oEvent) {
            var oView = this.getView();
            oView.setBusy(true);
            this.getEntityService().init()
                .then((data) => {
					MessageToast.show(this.getResourceBundle().getText("message.entity.success.init"));
                    this.getModel().refresh();
                })
                .catch((reason) => {
                    MessageToast.show(this.getResourceBundle().getText("message.entity.filed.init", reason.responseText));
				})
				.finally(() => {
					oView.setBusy(false);
				});
		},

		handleClearAll: function(oEvent){
            var oView = this.getView();
            MessageToast.show(this.getResourceBundle().getText("message.entity.start.clear"));
            oView.setBusy(true);
            this.getEntityService().syncAll()
                .then( (data) => {
                    MessageToast.show(this.getResourceBundle().getText("message.entity.success.clear"));
                    this.getModel().refresh();
                })
                .catch((reason) => {
                    MessageToast.show(this.getResourceBundle().getText("message.entity.filed.clear",reason.responseText));
				})
				.finally(() => {
					oView.setBusy(false);
				});
		},

		handleActivatePress: function(oEvent){
			var oView = this.getView();
			MessageToast.show(this.getResourceBundle().getText("message.entity.start.activation"));
			oView.setBusy(true);
			this.getEntityService().clearAll()
			.then( (data) => {
				return this.getEntityService().init();
			})
			.then( (data) => {
				return this.getEntityService().syncAll();
			})
			.then(() => {
				this.getModel().refresh();
				MessageToast.show(this.getResourceBundle().getText("message.entity.success.activation"));
			})
			.catch((reason) => {
				MessageToast.show(this.getResourceBundle().getText("message.entity.filed.activation", reason.responseText));
			})
			.finally(() => {
				oView.setBusy(false);
			});
		}
    });
});
