sap.ui.define([
	"rusagro/elevator/admin/controller/Base.controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController,JSONModel,MessageToast,MessageBox) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.User", {
        onInit: function() {
			BaseController.prototype.onInit.apply(this, arguments);

		},

		// Создание
		handleCreateUserPress: function(oEvent){
			var newUserModel = new JSONModel({
				Name: "",
				FullName: "",
				SapUserId: "",
				Password: "",
				Enabled: true,
				CreateBy: this.getGlobalModel().getProperty("/currentUser"),
				CreateAt: new Date(),
				ChangeBy: this.getGlobalModel().getProperty("/currentUser"),
				ChangeAt: new Date()
			});
			if (!this._oUserCreateDialog) {
				this._oUserCreateDialog = sap.ui.xmlfragment("create",
					"rusagro.elevator.admin.view.fragment.dialog.UserCreate",
					this
				);
				this.getView().addDependent(this._oUserCreateDialog);
			}
			this._oUserCreateDialog.setModel(newUserModel, "user");
			this._oUserCreateDialog.setModel(this.getView().getModel());
			this._oUserCreateDialog.open();
		},

		handleUserCreateDialogConfirm: function(oEvent){
			if (this._oUserCreateDialog){
				var oData = this._oUserCreateDialog.getModel("user").getData();
				if (!oData.Password || !oData.Name || !oData.SapUserId) {
					MessageBox.error(this.getResourceBundle().getText("message.user.required"));
					return;
				}
				this.getMainODataService().createAuthUser(oData)
					.then((oData) => {
						 MessageToast.show(this.getResourceBundle().getText("message.user.success.created"));
					 })
					.catch((oError) => {
						MessageBox.error(this.getResourceBundle().getText("message.user.failed.created"));
					});
				this._oUserCreateDialog.close();
			}
		},

		handleUserCreateDialogCancel: function(oEvent){
			if (this._oUserCreateDialog){
				this._oUserCreateDialog.close();
			}
		},

		// Именение
		handleUpdateUserPress: function(oEvent){
			var oSource =  oEvent.getSource();
			var oUser = oSource.getBindingContext().getObject();

			oUser.Password = "";
			oUser.ChangeBy = this.getGlobalModel().getProperty("/currentUser");
			oUser.ChangeAt = new Date();

			var newUserModel = new JSONModel(oUser);

			if (!this._oUserUpdateDialog) {
				this._oUserUpdateDialog = sap.ui.xmlfragment("update",
					"rusagro.elevator.admin.view.fragment.dialog.UserUpdate",
					this
				);
				this.getView().addDependent(this._oUserUpdateDialog);
			}
			this._oUserUpdateDialog.setModel(newUserModel, "user");
			this._oUserUpdateDialog.setModel(this.getView().getModel());
			this._oUserUpdateDialog.open();
		},

		handleUserUpdateDialogConfirm: function(oEvent){
			if (this._oUserUpdateDialog){
				var oData = this._oUserUpdateDialog.getModel("user").getData();
				if (!oData.Password || !oData.Name || !oData.SapUserId) {
					MessageBox.error(this.getResourceBundle().getText("message.user.required"));
					return;
				}
				this.getMainODataService().updateAuthUser(oData)
					.then((oData) => {
						 MessageToast.show(this.getResourceBundle().getText("message.user.success.update"));
					 })
					.catch((oError) => {
						MessageBox.error(this.getResourceBundle().getText("message.user.failed.update"));
					});
					this._oUserUpdateDialog.close();
			}
		},

		handleUserUpdateDialogCancel: function(oEvent){
			if (this._oUserUpdateDialog){
				this._oUserUpdateDialog.close();
			}
		},

		// Удаление
		handleDeleteUserPress: function(oEvent){
			var oUser = oEvent.getSource().getBindingContext().getObject();
			if (oUser  && oUser.Id) {
				MessageBox.show(
					this.getResourceBundle().getText("message.user.confirm.delete"),
					{
						icon: MessageBox.Icon.WARNING,
						title: this.getResourceBundle().getText("title.user.delete"),
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						onClose: this.handleDeleteUser.bind(this, oUser)
					}
			);
			}
		},

		handleDeleteUser: function(oData, oAction){
			if (oAction == MessageBox.Action.YES){
				this.getMainODataService().deleteAuthUser(oData.Id)
				.then((oData) => {
					 MessageToast.show(this.getResourceBundle().getText("message.user.success.delete"));
				 })
				.catch((oError) => {
					MessageBox.error(this.getResourceBundle().getText("message.user.failed.delete"));
				});
			}
		},

		handleSapUserChange: function(oEvent){
			var sKey = oEvent.getSource().getSelectedItem().getKey();
			var sText = oEvent.getSource().getSelectedItem().getText();
			if (!sap.ui.core.Fragment.byId("create", "user_name").getValue()){
				sap.ui.core.Fragment.byId("create","user_name").setValue(sKey);
			}
			if (!sap.ui.core.Fragment.byId("create","user_full_name").getValue()){
				sap.ui.core.Fragment.byId("create","user_full_name").setValue(sText);
			}
		}

    });
});
