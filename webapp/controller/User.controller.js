sap.ui.define([
	"rusagro/elevator/admin/controller/Base.controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController,JSONModel,MessageToast) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.User", {
        onInit: function() {
			BaseController.prototype.onInit.apply(this, arguments);

		},

		handleNewPress: function(oEvent){
			var newUserModel = new JSONModel({
				Name: "",
				FullName: "",
				SapUserId: "",
				Password: "",
				Enabled: true
			});
			if (!this._oUserCreateDialog) {
				this._oUserCreateDialog = sap.ui.xmlfragment(
					"rusagro.elevator.admin.view.fragment.dialog.UserCreate",
					this
				);
				this.getView().addDependent(this._oUserCreateDialog);
			}
			this._oUserCreateDialog.setModel(newUserModel, "user");
			this._oUserCreateDialog.setModel(this.getView().getModel());
			this._oUserCreateDialog.open();
		},

		handleUserDialogConfirm: function(oEvent){
			if (this._oUserCreateDialog){
				var oData = this._oUserCreateDialog.getModel("user").getData();
				this.getMainODataService().createAuthUser(oData)
					.then((oData) => {
						 MessageToast.show("User create success");
					 })
					.catch((oError) => {
						MessageToast.show("User not created");
					});
				this._oUserCreateDialog.close();
			}
		},

		handleUserDialogCancel: function(oEvent){
			if (this._oUserCreateDialog){
				this._oUserCreateDialog.close();
			}
		}
    });
});
