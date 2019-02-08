sap.ui.define([
        "sap/ui/base/Object"
    ],
    function(Object) {
        "use strict";
        return Object.extend("rusagro.elevator.admin.service.MainODataService", {
            __oModel: null,
            constructor: function (oModel) {
                this.__oModel = oModel;
            },

            getProperties: function () {
                return new Promise((resolve, reject) => {
                    this.__oModel.callFunction("/GetProperties",{
                        method: "GET",
                        success: (data)=>{resolve(data);},
                        error:  (error)=>{reject(error);}
                    });
                });
            },

            getCurrentUser: function () {
                return new Promise((resolve, reject) => {
                    this.__oModel.callFunction("/GetCurrentUser",{
                        method: "GET",
                        success: (data)=>{resolve(data);},
                        error:  (error)=>{reject(error);}
                    });
                });
			},

			createAuthUser: function(oData) {
				return new Promise((resolve, reject) => {
					this.__oModel.create("/AuthUserSet", oData, {
						success: function (oData, responce) {
							resolve(oData);
						},
						error: function (oError) {
							reject(oError);
						}
					});
                });
			},

			updateAuthUser: function(oData) {
				return new Promise((resolve, reject) => {
					this.__oModel.update("/AuthUserSet('" + encodeURIComponent(oData.Id) + "')", oData, {
						success: function (oData, responce) {
							resolve(oData);
						},
						error: function (oError) {
							reject(oError);
						}
					});
                });
			},

			deleteAuthUser: function(sId) {
				return new Promise((resolve, reject) => {
					this.__oModel.remove("/AuthUserSet('" + encodeURIComponent(sId) + "')", {
						success: function (oData, responce) {
							resolve(oData);
						},
						error: function (oError) {
							reject(oError);
						}
					});
                });
			}
        });
    }
);
