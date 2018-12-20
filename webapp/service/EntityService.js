sap.ui.define([
        "sap/ui/base/Object"
    ],
    function(Object) {
        "use strict";
        return Object.extend("rusagro.elevator.admin.service.EntityService", {

            syncAll: function(){
                return new Promise(function (resolve, reject) {
                    jQuery.ajax({
                        dataType: "json",
                        type: "GET",
                        url: "/api/admin/entity?operation=sync",
                        success: function(data) { resolve(data);},
                        error: function (error) {
                            reject(error);
                        }
                    });
                });
            },

            syncOperation: function (entitySetName) {
                return new Promise(function (resolve, reject) {
                    jQuery.ajax({
                        dataType: "json",
                        type: "GET",
                        url: "/api/admin/entity/" + entitySetName + "?operation=sync",
                        success: function(data) { resolve(data);},
                        error: function (error) {
                            reject(error);
                        }
                    });
                });
            },

            clearOperation: function (entitySetName) {
                return new Promise(function (resolve, reject) {
                    jQuery.ajax({
                        dataType: "json",
                        type: "GET",
                        url: "/api/admin/entity/" + entitySetName + "?operation=clear",
                        success: function(data) { resolve(data);},
                        error: function (error) {
                            reject(error);
                        }
                    });
                });
            },

            infoOperation: function (entitySetName) {
                return new Promise(function (resolve, reject) {
                    jQuery.ajax({
                        dataType: "json",
                        type: "GET",
                        url: "/api/admin/entity/" + entitySetName + "?operation=info",
                        success: function(data) { resolve(data);},
                        error: function (error) {
                            reject(error);
                        }
                    });
                });
            },

            init: function () {
                return new Promise(function (resolve, reject) {
                    jQuery.ajax({
                        dataType: "json",
                        type: "POST",
                        url: "/api/admin/init",
                        success: function(data) { resolve(data);},
                        error: function (error) {
                            reject(error);
                        }
                    });
                });
            }
        });
    }
);