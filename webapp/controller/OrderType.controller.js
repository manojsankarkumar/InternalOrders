sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("InternalOrders.controller.OrderType", {
       onInit: function() {
      this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
   },
   
   ValueHelp: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			var output = this.inputId.split("--");
			var fieldname = output[2]; 
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"InternalOrders.fragments.OrderType",
					this.getView().getController()
				);
				this.getView().addDependent(this._valueHelpDialog);
			} 
			
			this._valueHelpDialog.open();
			
			var auart = new sap.ui.model.Filter("FieldID", sap.ui.model.FilterOperator.EQ, fieldname);   
			this._valueHelpDialog.getBinding("items").filter([auart]);
		},

		//Close the project dialog box
		_handleValueHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.getView().byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
			}
		//	evt.sap.ui.getCore().byId("items");
		},
		
		onMasterData: function(){
			 //var no =this.getView().byId("orderTypeInput").getValue();
    //       if(no === ""){
    //           sap.m.MessageBox.error("This is your message");
    //           return false;
    // }
    //       else if(isNaN(no) || no.length === 10){
    //       	this.getOwnerComponent().getRouter().navTo("CreateInternalOrder");
    //       return false;
    // }
				this.getOwnerComponent().getRouter().navTo("CreateInternalOrder"); // By default it was here
		}
	});
});