sap.ui.define([
	"./BaseController",
	"sap/f/library",
	"sap/ui/core/Fragment"
], function (BaseController, fioriLibrary, Fragment) {
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
			// Clear input fields
			this._oDialog.open();
		},

		onCancel: function () {
			this._oDialog.close();
		},
		onSubmit: async function () {
			const oEditModel = this.getView().getModel("editValues");
			const oModel = this.getView().getModel();
			
			const oInputName = await Fragment.byId("editEntry", "inputName");
			const oInputBrand = await Fragment.byId("editEntry", "inputBrand");
			const oInputPrice = await Fragment.byId("editEntry", "inputPrice");
			const oInputSize = await Fragment.byId("editEntry", "inputSize");
			const oInputType = await Fragment.byId("editEntry", "inputType");
			const oInputDesigner = await Fragment.byId("editEntry", "inputDesigner");
			const oInputSeason = await Fragment.byId("editEntry", "inputSeason");
			const oInputDescription = await Fragment.byId("editEntry", "inputDescription");
			
			// var sInputName = oInputName.getValue();
			// var sInputBrand = oInputBrand.getValue();
			// var sInputPrice = oInputPrice.getValue();
			// var sInputSize = oInputSize.getValue();
			// var sInputType = oInputType.getValue();
			// var sInputDesigner = oInputDesigner.getValue();
			// var sInputSeason = oInputSeason.getValue();
			// var sInputDescription = oInputDescription.getValue();
			
			// selectedItemContext.setProperty("name", editedName);
			// selectedItemContext.setProperty("brand", editedBrand);
			// selectedItemContext.setProperty("name", editedName);
			// selectedItemContext.setProperty("name", editedName);



			// const selectedItemContext = this._getSelectedItemContext(); 
			//var sEditedName = this.



			this._oEditDialog.close();
			this._oEditDialog.destroy();
			this._oEditDialog = undefined;
			const oList = this.getView().byId("productsTable");
			oList.getBinding("items").refresh();
			this.calculateTotalPrice();

			
		}

	});
});