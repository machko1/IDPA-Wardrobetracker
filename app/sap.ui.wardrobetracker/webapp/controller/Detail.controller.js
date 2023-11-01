sap.ui.define([
	"./BaseController",
	"sap/f/library"
], function (BaseController, fioriLibrary) {
	"use strict";

	return BaseController.extend("sap.ui.wardrobetracker.controller.Detail", {

		sNumber: 0,

		onEditToggleButtonPress: function () {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();
			
			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},
		onInit: function () {
			this.getRouter().getRoute("RouteDetail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent){
			this.sNumber = oEvent.getParameter("arguments").id;
			this.getView().bindElement("/Wardrobe("+this.sNumber+")");
		},
		onImagePress: function () {
            var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);
			
            this.getRouter().navTo("RouteImage", {id : this.sNumber});
        },
		onBack: function (oEvent) {
			var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(fioriLibrary.LayoutType.OneColumnMidExpanded);
            this.getRouter().navTo("RouteList");
		},

		onDelete: function (oEvent) {
			this.getView().getBindingContext().delete();
			var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(fioriLibrary.LayoutType.OneColumnMidExpanded);
            this.getRouter().navTo("RouteList");
		}
	});
});