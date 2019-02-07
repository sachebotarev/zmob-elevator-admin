sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	return {
		SERVER_DELAY: 1000,

		init: function () {
			// create
			var oMockServer = new MockServer({
				rootUri: "/sap/opu/odata/sap/ZMOB002_ELEVATOR_WEIGHT_SRV/"
			});

			MockServer.config({
				autoRespond: true,
				autoRespondAfter: this.SERVER_DELAY
			});

			var sPath = jQuery.sap.getModulePath("rusagro.elevator.weight.localService");

			oMockServer.simulate(sPath + "/metadata.xml", {
				sMockdataBaseUrl: sPath + "/mockdata",
				bGenerateMissingMockData: true
			});

			// add custom request
			var aRequests = oMockServer.getRequests();
			oMockServer.setRequests(aRequests.concat(this.getRequests()));
			// start
			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		},

		getRequests: function () {
			return [
				this.__getWeightInfo(),
				this.__getTransportDependency(),
				this.__getCurrentUser(),
				this.__getWaybillId(),
				this.__getPhoto()
			];
		},

		__getWeightInfo: function () {
			return {
				method: "GET",
				path: new RegExp("GetWeight(.*)"),
				response: function (oXhr, sUrlParams) {

					var urlParams = new URLSearchParams(sUrlParams);
					var sWeightTermitalId = urlParams.get("WeightTerminalId");
					var headers = {
						"Content-Type": "application/json;charset=utf-8",
						"DataServiceVersion": "1.0"
					};
					var body = {
						d: {
							GetWeight: {
								Timestamp: new Date(),
								WeightValue: 20000.000 + Math.floor((Math.random() * 100) + 1),
								WeightTerminalId: sWeightTermitalId.substring(1, sWeightTermitalId.length - 2),
								LicenseNum: "М256ОР31"
							}
						}
					};
					oXhr.respondJSON(200, headers, JSON.stringify(body));
					return true;
				}
			};
		},

		__getWaybillId: function () {
			return {
				method: "GET",
				path: new RegExp("GetWaybillId(.*)"),
				response: function (oXhr, sUrlParams) {
					var urlParams = new URLSearchParams(sUrlParams);
					var sInstallationId = urlParams.get("InstallationId");
					var headers = {
						"Content-Type": "application/json;charset=utf-8",
						"DataServiceVersion": "1.0"
					};
					var body = {
						d: {
							GetWaybillId: {
								Id: sInstallationId.replace(/'/g, "") + "0000000001"
							}
						}
					};
					oXhr.respondJSON(200, headers, JSON.stringify(body));
					return true;
				}
			};
		},

		__getPhoto: function () {
			return {
				method: "GET",
				path: new RegExp("GetPhoto(.*)"),
				response: function (oXhr, sUrlParams) {
					var urlParams = new URLSearchParams(sUrlParams);
					var sCameraId = urlParams.get("CameraId");
					var headers = {
						"Content-Type": "application/json;charset=utf-8",
						"DataServiceVersion": "1.0"
					};
					var body = {
						d: {
							GetPhoto: {
								CameraId: sCameraId,
								URL: "https://goo.gl/fVUFu8",
								Timestamp: new Date()
							}
						}
					};
					oXhr.respondJSON(200, headers, JSON.stringify(body));
					return true;
				}
			};
		},

		__getCurrentUser: function () {
			return {
				method: "GET",
				path: new RegExp("GetCurrentUser"),
				response: function (oXhr, sUrlParams) {
					var headers = {
						"Content-Type": "application/json;charset=utf-8",
						"DataServiceVersion": "1.0"
					};
					var body = {
						d: {
							Id: "SCHEBOTAREV",
							Firstname: "Сергей",
							Surname: "Чеботарев",
							Name: "Сергей Александрович Чеботарев",
							PlantId: "3121",
							AllowManual: true,
							CreateAt: new Date(),
							CreateBy: "SCHEBOTAREV",
							ChangeBy: "SCHEBOTAREV",
							ChangeAt: new Date(),
							Etag: "12312312"
						}
					};
					oXhr.respondJSON(200, headers, JSON.stringify(body));
					return true;
				}
			};
		},

		__getTransportDependency: function () {
			return {
				method: "GET",
				path: new RegExp("GetTransportDependency(.*)"),
				response: function (oXhr, sUrlParams) {

					var urlParams = new URLSearchParams(sUrlParams);
					var sWeightTermitalId = urlParams.get("TransportId");
					var sLicenseNum = urlParams.get("LicenseNum");
					if (sLicenseNum) {
						sWeightTermitalId = '10002432';
					}
					var headers = {
						"Content-Type": "application/json;charset=utf-8",
						"DataServiceVersion": "1.0"
					};
					var body = {
						d: {
							GetTransportDependency: {
								TransportId: sWeightTermitalId,
								TrailerId: "10000009",
								DriverId: "00000004"

							}
						}
					};
					oXhr.respondJSON(200, headers, JSON.stringify(body));
					return true;
				}
			};
		}
	};

});
