sap.ui.define([
	"InternalOrders/controller/BaseController",
	"sap/ui/core/routing/History"
], function (BaseController, History) {
	"use strict";

	return BaseController.extend("InternalOrders.controller.App", {

		
			getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
			onInit: function () {
		
			jQuery.sap.log.setLevel(jQuery.sap.log.Level.INFO);

			},

		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
             var oRouter = this.getRouter();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("OrderType", {}, true /*no history*/);
			}
		}
		});

	});