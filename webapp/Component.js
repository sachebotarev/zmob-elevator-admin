sap.ui.define([
    "sap/ui/core/UIComponent",
    "rusagro/elevator/admin/service/ApplicationService"

], function(UIComponent,ApplicationService){
    "use strict";

    return UIComponent.extend("rusagro.elevator.admin.Component",{
        metadata: {
            manifest: "json"
        },

        init: function(){
            UIComponent.prototype.init.apply(this, arguments);
            (new ApplicationService(this)).init();
        }
    });
});
