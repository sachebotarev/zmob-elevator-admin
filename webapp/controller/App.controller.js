sap.ui.define([
    "rusagro/elevator/admin/controller/Base.controller"
], function(BaseController) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.App", {
        onInit: function() {
            BaseController.prototype.onInit.apply(this, arguments);
        },
        handlePressHome: function (oEvent) {
            this.getRouter().navTo("admin");
        },
        handleLogoffPress: function (oEvent) {
            window.location.replace("/logout");
        }
    });
});
