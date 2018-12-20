sap.ui.define([
    "rusagro/elevator/admin/controller/Base.controller"
], function(BaseController) {
    "use strict";

    return BaseController.extend("rusagro.elevator.admin.controller.User", {
        onInit: function() {
            BaseController.prototype.onInit.apply(this, arguments);
        }
    });
});
