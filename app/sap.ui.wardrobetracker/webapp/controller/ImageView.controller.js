sap.ui.define([
    "./BaseController",
	'sap/f/library'
], function (BaseController, fioriLibrary) {
	"use strict";

	return BaseController.extend("sap.ui.wardrobetracker.controller.ImageView", {
		onInit: function () {
			this.getRouter().getRoute("RouteDetail").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent){
			this.sNumber = oEvent.getParameter("arguments").id;
			this.getView().bindElement("/Wardrobe("+this.sNumber+")");
		}, 
		onBack: function (oEvent) {
			var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
			var pressedId = oEvent.getSource().getBindingContext().getObject().ID;
            this.getRouter().navTo("RouteDetail", { id: pressedId });
		}
	});
});