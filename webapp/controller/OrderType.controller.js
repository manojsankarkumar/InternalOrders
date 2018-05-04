sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
    "InternalOrders/model/formatter"
], function(Controller, MessageBox, formatter) {
	"use strict";

	return Controller.extend("InternalOrders.controller.OrderType", {
      	formatter : formatter,
			onInit: function(oEvent) {
		 this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
		 
		 var no =this.getView().byId("tel").getValue();
          if(no === ""){
              sap.m.MessageBox.alert("Please write your Phone Number");
              return false;
    }
          else if(no.length !== 10){
          sap.m.MessageBox.alert(" enter valid number");
          return false;
    }
    
    var nos =this.getView().byId("tele").getValue();
          if(nos === ""){
              sap.m.MessageBox.alert("Please write your Phone Number");
              return false;
    }
          else if(isNaN(no) || no.length === 10){
          sap.m.MessageBox.alert(" Enter valid number");
          return false;
    }
			},
			
			handleSave: function(oEvent){
					this.getOwnerComponent().getRouter().navTo("OrderType");
			},
			
			handleCancel: function(oEvent){
				
			},
			
			 ValueHelp: function(oEvent) {
		    this.inputId = oEvent.getSource().getId();
			var output = this.inputId.split("--");
			var fieldname = output[2]; 
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"InternalOrders.fragments.ValueHelp",
					this.getView().getController()
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			
			var fil = new sap.ui.model.Filter("FieldID", sap.ui.model.FilterOperator.EQ, fieldname);  
			this._valueHelpDialog.getBinding("items").filter([fil]);
			
			// open project select dialog 
	//		var selectDialog = this.byId("valuehelpfragment", "valueHelpSelectDialog");
	        
	        var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			this._valueHelpDialog.setTitle(formatter.getValueHelpTitle(resourceBundle, fieldname));
			this._valueHelpDialog.open();
			
			
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
		
		orderTypeUpdate: function(evt){
			var a = evt.getParameters();
			a = a.value;
			alert(a);
		}
		
		
});

});