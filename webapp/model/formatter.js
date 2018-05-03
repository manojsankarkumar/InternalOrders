sap.ui.define([], function () {
	"use strict";
	return {
		getValueHelpTitle: function (resourceBundle, sInput) {
			switch (sInput) {
				case "AUART":
					return resourceBundle.getText("order_type");
				case "BUKRS":
					return resourceBundle.getText("company_code");
				case "GSBER":
					return resourceBundle.getText("business_area");
				case "WERKS":
					return resourceBundle.getText("plant");
				case "PRCTR":
					return resourceBundle.getText("profit_center");
			    case "KOSTL":
					return resourceBundle.getText("responsible_cctr");
				case "BNAME":
					return resourceBundle.getText("user_resp");
				case "PSPNR":
					return resourceBundle.getText("wbs");
				case "AUFNR":
					return resourceBundle.getText("request_order");
			    case "WAERS":
					return resourceBundle.getText("curr");
				case "ABGSL":
					return resourceBundle.getText("resul_analy_key");
				case "KALSM":
					return resourceBundle.getText("costi_sheet");
				case "ZSCHL":
					return resourceBundle.getText("overhead_key");
			    case "ZSCHM":
					return resourceBundle.getText("interest_profile");
				case "KSTAR":
					return resourceBundle.getText("settle_cost_elem");
				case "SAKNR":
					return resourceBundle.getText("glacc");
				case "ABKRS":
					return resourceBundle.getText("proce_grp");
			    case "IVPRO":
					return resourceBundle.getText("invest_profile");
				// case "":
				// 	return resourceBundle.getText("");
					
				default:
					return sInput;
			}
		}
	};
});