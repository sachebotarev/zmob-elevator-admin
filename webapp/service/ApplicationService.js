sap.ui.define([
        "sap/ui/base/Object",
        "sap/ui/model/json/JSONModel",
        "sap/ui/Device",
        "sap/ui/model/BindingMode",
        "rusagro/elevator/admin/service/MainODataService",
        "rusagro/elevator/admin/service/EntityService"
    ],
    function(Object, JSONModel,Device,BindingMode,MainODataService,EntityService) {
        "use strict";
        return Object.extend("rusagro.elevator.admin.service.ApplicationService", {
            __oGlobalModel: null,
            constructor: function (oComponent) {
                this._oComponent = oComponent;
            },

            init: function () {
                this._oRootView = this._oComponent.getAggregation("rootControl");
                this._oComponent.setModel(new JSONModel(Device), "device");
                this._oResourceBundle = this._oComponent.getModel("i18n").getResourceBundle();
                // Глобальные параметры приложения
                this._oGlobalProperties = {
                    application: this,
                    currentUser: "",
                    currentUserInfo: null,
                    currentPlant: "",
                    isBusy: false
                };

                this._oGlobalModel =  new JSONModel(this._oGlobalProperties);
                this._oGlobalModel.setDefaultBindingMode(BindingMode.TwoWay);
                this._oComponent.setModel(this._oGlobalModel, "global");
                this._mainOdataService = new MainODataService( this._oComponent.getModel());
                this._entityService = new EntityService();
                // Инициализация роутера
                this._oComponent.getRouter().initialize();

                this.__getCurrentUser();
            },

            getMainODataService: function () {
                return this._mainOdataService;
            },

            getEntityService: function () {
                return this._entityService;
            },

            getResourceBundle: function(){
                return this._oResourceBundle;
            },

            __getCurrentUser: function () {
                this.getMainODataService().getCurrentUser()
                    .then(data=>{
                        this._oGlobalModel.setProperty("/currentUser", data.Name);
                        this._oGlobalModel.setProperty("/currentUserInfo");
                    })
                    .catch(error=>{
                        jQuery.sap.log.error(error);
                    });
            }
        });
    }
);