sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"InternalOrders/model/formatter"
], function(Controller, MessageBox, formatter) {
	"use strict";

	return Controller.extend("InternalOrders.controller.OrderType", {
		formatter: formatter,
		onInit: function(oEvent) {
			this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");

			var oIconTab = this.getView().byId("idIconTabBarNoIcons");
			oIconTab.setVisible(false);
		},

		handleSave: function(oEvent) {
			var compcode = this.getView().byId("BUKRS").getValue();
			var plant = this.getView().byId("WERKS").getValue();
			var curr = this.getView().byId("WAERS").getValue();
			if (compcode === "") {
				MessageBox.warning("Please select Company Code");
				return true;
			} else if (plant === "") {
				MessageBox.warning("Please select plant");
				return true;
			} else if (curr === "") {
				MessageBox.warning("Please select currency under Control Data");
				return true;
			}

			this.getView().getModel().setDeferredGroups(["createGroup"]);
			this.createEntity();

			this.getView().getModel().submitChanges({
				groupId: "createGroup",
				success: function(oData, oResponse) {
					var data = oData.__batchResponses[0];
					data = data.__changeResponses[0];
					data = data.data;
					var order = data.Order;
					if (order === "") {
						sap.m.MessageBox.alert(data.Message);
					} else {
						sap.m.MessageBox.alert(order + "Order Created");
					}
				},
				error: function(oError, oResponse) {

					sap.m.MessageBox.alert("Failure");
				}
			});

		},

		onAfterRendering: function(oEvent) {
			var oModel = this.getView().getModel();
			oModel.attachMetadataLoaded(this.createEntity.bind(this));
		},

		createEntity: function(oEvent) {

			var oContext = this.getView().getModel().createEntry("/InternalOrderSet", {
				"groupId": "createGroup",
				properties: {
					"OrderType": this.getView().byId("AUART").getValue(),
					"Description": this.getView().byId("AUFTEXT").getValue(),
					"CompanyCode": this.getView().byId("BUKRS").getValue(),
					"BusinessArea": this.getView().byId("GSBER").getValue(),
					"Plant": this.getView().byId("WERKS").getValue(),
					"ProfitCenter": this.getView().byId("PRCTR").getValue(),
					"ResponsibleCCTR": this.getView().byId("KOSTL").getValue(),
					"UserResponsible": this.getView().byId("BNAME").getValue(),
					"WBSElement": this.getView().byId("PSPNR").getValue(),
					"RequestCCTR": this.getView().byId("REQUESTCCTR").getValue(),
					"RequestCode": this.getView().byId("REQCOD").getValue(),
					"RequestOrder": this.getView().byId("AUFNR").getValue(),
					// "SystemStatus": this.getView().byId().getValue(),
					// "UserStatus": this.getView().byId().getValue(),
					//   "StatusNumber": this.getView().byId().getValue(),
					"Currency": this.getView().byId("WAERS").getValue(),
					//     "OrderCategory": this.getView().byId().getValue(),
					"ActPosCCTR": this.getView().byId("ACTPOSCCTR").getValue(),
					//    "StatisOrder": this.getView().byId().getValue(),
					//    "PlanIntegOrder": this.getView().byId().getValue(),
					"ResultAnalysisKey": this.getView().byId("ABGSL").getValue(),
					"CostingSheet": this.getView().byId("KALSM").getValue(),
					"OverheadKey": this.getView().byId("ZSCHL").getValue(),
					"InterestProfile": this.getView().byId("ZSCHM").getValue(),
					"SettleCostElem": this.getView().byId("KSTAR").getValue(),
					"CostCenter": this.getView().byId("COSTCENTER").getValue(),
					"GLAccount": this.getView().byId("SAKNR").getValue(),
					// "Applicant": this.getView().byId().getValue(),
					// "Telephone1": this.getView().byId().getValue(),
					// "PersonResponsible": this.getView().byId().getValue(),
					// "Telephone2": this.getView().byId().getValue(),
					// "EstimatedCost": this.getView().byId().getValue(),
					"ProcessGroup": this.getView().byId("ABKRS").getValue(),
					// "ApplicationDate": this.getView().byId().getValue(),
					// "Department": this.getView().byId().getValue(),
					// "WorkStart": this.getView().byId().getValue(),
					// "EndWork": this.getView().byId().getValue(),
					"InvestProfile": this.getView().byId("IVPRO").getValue(),
					"Scale": this.getView().byId("SIZECL").getValue(),
					"InvestReason": this.getView().byId("IZWEK").getValue(),
					"EnvirInvestment": this.getView().byId("UMWKZ").getValue(),
					"InvestProgram": this.getView().byId("PRNAM").getValue(),
					// "PositionID": this.getView().byId().getValue(),
					"AssetClass": this.getView().byId("ANLKL").getValue()
						// "CapitalDate": this.getView().byId().getValue()

				}
			});
			this.getView().getModel().setRefreshAfterChange(false);
			this.getView().setBindingContext(oContext);
		},

		handleCancel: function(oEvent) {

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.confirm(
				"Are you sure you don't want to create?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
                      if(sap.m.MessageBox.Action.YES){
                      		window.history.go(-1);
                      }
					}
				});
	//		window.history.go(-1);
			return true;

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
			var output = this.inputId.split("--");
			var fieldname = output[2];
			if (fieldname === 'AUART') {
				this.toggleIconTabVisibility(oSelectedItem.getTitle());
			}
		},

		toggleIconTabVisibility: function(value) {
			var a = value.length;
			var oIconTab = this.getView().byId("idIconTabBarNoIcons");
			if (a > 0) {
				oIconTab.setVisible(true);
			} else {
				oIconTab.setVisible(false);
			}
		},

		orderTypeUpdate: function(evt) {
			var a = evt.getParameters();
			a = a.value;
			this.toggleIconTabVisibility(a);
		}

	});

});

/*List to make the app more smart*/
//Disabling the footer buttons initially