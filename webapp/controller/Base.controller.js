sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
], function(Controller,History) {
    "use strict";

    return Controller.extend("rusagro.elevator.admin.controller.Base", {
        onInit: function(){
        },

        getMainODataService: function(){
            return this.getApplication().getMainODataService();
        },

        getEntityService: function(){
            return this.getApplication().getEntityService();
        },

        getRouter : function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        getModel: function(sName){
            return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
        },

        getGlobalModel: function() {
            return this.getOwnerComponent().getModel("global");
        },

        getApplication: function() {
            return this.getGlobalModel().getProperty("/application");
        },

        getResourceBundle: function() {
            return this.getApplication().getResourceBundle();
        },

        onNavBack: function (oEvent) {
            var oHistory = History.getInstance(),
                sPreviousHash =  oHistory.getPreviousHash();
            if(sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("admin", {}, true /*no history*/);
            }
        }
    });
});
