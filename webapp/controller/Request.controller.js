sap.ui.define([
    "rusagro/elevator/admin/controller/Base.controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(BaseController,JSONModel, MessageToast) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.Request", {
        onInit: function() {
            BaseController.prototype.onInit.apply(this, arguments);
            this.__oViewModel = new JSONModel({
				url: window.location.origin + "/api/odata.svc/",
				req: "",
				res: "",
                busy: false,
				data: null,
				entity: "",
				type: {
					GET: true,
					POST: false,
					PUT: false,
					MERGE: false,
					DELETE: false
				}
            });
            this.getView().setModel(this.__oViewModel,"view");
		},

		handleSend: function(oEvent){
			var allTypes = this.__oViewModel.getProperty("/type");
			var currentType = "";
			for (var type in allTypes) {
				if (allTypes[type]){
					currentType = type;
					break;
				}
			}
			jQuery.ajax({
				dataType: "json",
				type: currentType,
				contentType: "application/json",
				data: (currentType == "GET") ? "" : this.__oViewModel.getProperty("/req"),
				url: this.__oViewModel.getProperty("/url"),
				success: (data) => {
					this.__oViewModel.setProperty("/res", JSON.stringify(data,null, 4));
				},
				error: (error) => {
					this.__oViewModel.setProperty("/res", JSON.stringify(error, null, 4));
				 }
			});
		}

    });
});
