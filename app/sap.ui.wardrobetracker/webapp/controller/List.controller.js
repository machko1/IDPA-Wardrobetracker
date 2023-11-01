sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox",
    'sap/f/library',
    "sap/ui/core/Fragment"

], function (BaseController, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary, Fragment) {
    "use strict";

    return BaseController.extend("sap.ui.wardrobetracker.controller.List", {
        onInit: function () {
            this.getRouter().getRoute("RouteList").attachMatched(this._onRouteMatched, this);
            this.oView = this.getView();
            this._bDescendingSort = false;
            this.oProductsTable = this.oView.byId("productsTable");
            
            this.oProductsTable.bindItems({
                path: "/Wardrobe",
                template: this.oView.byId("columnListTemplate"),
                sorter: new Sorter("brand")
            });
        },

        _onRouteMatched: function (oEvent){
            /*this.calculateTotalPrice();*/
			const oList = this.getView().byId("productsTable");
            oList.getBinding("items").refresh();   
        },

        onSearch: function (oEvent) {
            var oTableSearchState = [],
                sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
                oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
            }

            this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
        },

        onAdd: async function () {
            if (!this._oDialog) {
                this._oDialog = await Fragment.load({
                    id: "addEntry",
                    name: "sap.ui.wardrobetracker.view.fragments.AddEntry",
                    controller: this
                });
                this.getView().addDependent(this._oDialog);
            }
            // Clear input fields
            this._oDialog.open();
        },

        onSubmit: async function () {
            var oModel = this.getView().getModel();
            const oInputName = await Fragment.byId("addEntry", "inputName");
            //var oInputName = this._oDialog.byId("inputName");
            const oInputBrand = await Fragment.byId("addEntry", "inputBrand");
            //var oInputBrand = this.getView().byId("inputBrand");
            const oInputColor = await Fragment.byId("addEntry", "inputColor");
            //var oInputColor = this.getView().byId("inputColor");
            const oInputSize = await Fragment.byId("addEntry", "inputSize");
            const oInputPrice = await Fragment.byId("addEntry", "inputPrice");
            const oInputUrl = await Fragment.byId("addEntry", "inputUrl");
            const oInputDescription = await Fragment.byId("addEntry", "inputDescription");
            const oInputSeason = await Fragment.byId("addEntry", "inputSeason");
            const oInputDesigner = await Fragment.byId("addEntry", "inputDesigner");
            const oInputType = await Fragment.byId("addEntry", "selectType");


            var sName = oInputName.getValue();
            var sSelectedType = oInputType.getSelectedKey();
            var sBrand = oInputBrand.getValue();
            var sColor = oInputColor.getValue();
            var sSize = oInputSize.getValue();
            var sPrice = oInputPrice.getValue();
            var sUrl = oInputUrl.getValue();
            var sDescription = oInputDescription.getValue();
            var sDesigner = oInputDesigner.getValue();
            var sSeason = oInputSeason.getValue();

            if (!sName || !sSelectedType || !sBrand || !sColor || !sSize || !sPrice || !sDescription || !sDesigner || !sSeason || !sUrl) {
                sap.m.MessageBox.error("Please fill out all of the fields to add a new entry!", {
                    title: "Input Error",
                    actions: [sap.m.MessageBox.Action.OK]
                });
                return;
            }
            //Add Entry to List
            await oModel.bindList("/Wardrobe").create({
                name: sName,
                brand: sBrand,
                color: sColor,
                size: sSize,
                price: parseFloat(sPrice),
                season: sSeason,
                currency: "CHF",
                image: sUrl,
                type: sSelectedType,
                designer: sDesigner,
                description: sDescription
            });
            const oList = this.getView().byId("productsTable");
            oList.getBinding("items").refresh();
            this._oDialog.close();
            this._oDialog.destroy();
            this._oDialog = undefined;
        },

        onCancel: function () {
            this._oDialog.close();
        },

        onSort: function () {
            this._bDescendingSort = !this._bDescendingSort;
            var oBinding = this.oProductsTable.getBinding("items"),
                sSortField = "price";

            oBinding.sort(new Sorter(sSortField, this._bDescendingSort));
        },

        onListItemPress: function (oEvent) {
            var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

            var pressedId = oEvent.getSource().getBindingContext().getObject().ID;
            this.getRouter().navTo("RouteDetail", { id: pressedId });
        },

      /*  calculateTotalPrice: function () {
            const oModel = this.getView().getModel(); // Assuming you have a model bound to your view
            const aItems = oModel.getProperty("/Wardrobe"); // Assuming your items are in a collection called "Wardrobe"
        
            const totalPrice = aItems.reduce(function (total, item) {
                return total + item.price;
            }, 0);
        
            const sTotalPriceLabel = "Total Price: " + totalPrice + " CHF";
            this.byId("totalPriceLabel").setText(sTotalPriceLabel);
        }
*/
        
    });
});
