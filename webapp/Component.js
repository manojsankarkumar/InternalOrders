sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"InternalOrders/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("InternalOrders.Component", {

		metadata: {
			manifest: "json"
		},
		
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			var deviceModel = new sap.ui.model.json.JSONModel(
								{
									isTouch : sap.ui.Device.support.touch,
									isNoTouch : !sap.ui.Device.support.touch,
									isPhone : sap.ui.Device.system.phone,
									isNoPhone : !sap.ui.Device.system.phone,
									listMode : sap.ui.Device.system.phone ? "None"
											: "SingleSelectMaster",
									listItemType : sap.ui.Device.system.phone ? "Active"
											: "Inactive"
								});
						deviceModel.setDefaultBindingMode("OneWay");
						this.setModel(deviceModel, "device");
			this.setModel(models.createDeviceModel(), "device");
			
			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});