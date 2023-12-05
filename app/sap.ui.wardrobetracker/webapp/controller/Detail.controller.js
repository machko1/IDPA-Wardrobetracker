sap.ui.define([
	"./BaseController",
	"sap/f/library",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/ui/thirdparty/jquery"
], function (BaseController, fioriLibrary, Fragment, JSONModel, jquery) {
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
		_onRouteMatched: function (oEvent) {
			this.sNumber = oEvent.getParameter("arguments").id;
			this.getView().bindElement("/Wardrobe(" + this.sNumber + ")");
		},
		onImagePress: function () {
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);

			this.getRouter().navTo("RouteImage", { id: this.sNumber });
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
		},


		//Fragment starts here -----------------


		onEdit: async function () {
			if (!this._oDialog) {
				this._oDialog = await Fragment.load({
					id: "editEntry",
					name: "sap.ui.wardrobetracker.view.fragments.EditEntry",
					controller: this
				});
				this.getView().addDependent(this._oDialog);
			}
			const oBindingContext = this.getView().getBindingContext();
			const oEditModel = this.getView().getModel("editValues");

			const sName = oBindingContext.getProperty("name");
			oEditModel.setProperty("/",oBindingContext.getObject());
			console.log(oBindingContext.getObject());

			this._oDialog.open();
		},

		onCancel: function () {
			var oEditModel = this.getView().getModel("editValues");
			this._oDialog.close();
		},
		onSubmit: async function () {
			var oEditModel = this.getView().getModel("editValues")
			const oModel = this.getView().getModel();
			const oBindingContext = this.getView().getBindingContext();

			oBindingContext.setProperty("name",oEditModel.getProperty("/name"));
			oBindingContext.setProperty("brand",oEditModel.getProperty("/brand"));
			oBindingContext.setProperty("price",oEditModel.getProperty("/price"));
			oBindingContext.setProperty("size",oEditModel.getProperty("/size"));
			oBindingContext.setProperty("designer",oEditModel.getProperty("/designer"));
			oBindingContext.setProperty("designer",oEditModel.getProperty("/description"));

			this.oDialog.close();
			this.oDialog.destroy();
			this._oDialog = undefined;
			const oList = this.getView().byId("productsTable");
			oList.getBinding("items").refresh();
			this.calculateTotalPrice();

		}

	});
});