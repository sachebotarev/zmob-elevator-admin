sap.ui.define([
    "rusagro/elevator/admin/controller/Base.controller"
], function(BaseController) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.Menu", {
        onInit: function() {
            BaseController.prototype.onInit.apply(this, arguments);
        },

        handleNavToEntity: function (oEvent) {
            this.getRouter().navTo("entity", {}, true /*no history*/);
        },

        handleNavToUser: function (oEvent) {
            this.getRouter().navTo("user", {}, true /*no history*/);
        },

        handleNavToProperty: function (oEvent) {
            this.getRouter().navTo("property", {}, true /*no history*/);
        }

    });
});
