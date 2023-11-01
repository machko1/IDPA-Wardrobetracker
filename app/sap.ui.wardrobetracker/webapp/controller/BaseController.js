sap.ui.define([

    "sap/ui/core/mvc/Controller",

    "sap/ui/core/routing/History"

], function (Controller, History) {

    "use strict";



    return Controller.extend("sap.ui.wardrobetracker.controller.BaseController", {

        /**

        * Convenience method for accessing the router in every controller of the application.

        * @public

        * @returns {sap.ui.core.routing.Router} the router for this component

        */

        getRouter: function () {

            return this.getOwnerComponent().getRouter();

        },



        /**

        * Convenience method for getting the view model by name in every controller of the application.

        * @public

        * @param {string} sName the model name

        * @returns {sap.ui.model.Model} the model instance

        */

        getModel: function (sName) {

            return this.getView().getModel(sName);

        },



        /**

         * Returns the default view model.

         * @returns {sap.ui.model.Model} The view model instance.

         */

        getViewModel: function () {

            return this.getView().getModel("viewModel");

        },



        /**

        * Returns the startup parameters, received over GET parameters.

        */

        getStartupData: function () {

            let sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());

            let oComponentData = sap.ui.component(sComponentId).getComponentData();



            if (oComponentData) { // Reading from the FLP

                let startupParams = oComponentData.startupParameters;



                let oData = {};



                for (let param in startupParams) {

                    oData[param] = startupParams[param][0];

                }



                return oData;

            } else { // Reading from the index.html

                const oParameters = new URLSearchParams(window.location.search);

                const aParams = {};

                for (let oEntry of oParameters.entries()) {

                    aParams[oEntry[0]] = oEntry[1];

                }

                return aParams;

            }

        },



        /**

         * Translates the strings on JS side.

         * @param {String} key The key of the translation

         * @param {Array} data Optional data for placeholders in the translation.

         */

        tl: function (key, data) {

            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            return oBundle.getText(key, data);

        },



        /**

        * Event handler for navigating back.

        * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history

        * If not, it will replace the current entry of the browser history with the master route.

        * @public

        */

        onNavBack: function () {

            var sPreviousHash = History.getInstance().getPreviousHash(),

                oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");



            if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {

                // eslint-disable-next-line sap-no-history-manipulation

                history.go(-1);

            } else {

                this.getRouter().navTo("master", {}, true);

            }

        }

    });

}); sap.ui.define([

    "sap/ui/core/mvc/Controller",

    "sap/ui/core/routing/History"

], function (Controller, History) {

    "use strict";



    return Controller.extend("ch.example.controller.BaseController", {

        /**

        * Convenience method for accessing the router in every controller of the application.

        * @public

        * @returns {sap.ui.core.routing.Router} the router for this component

        */

        getRouter: function () {

            return this.getOwnerComponent().getRouter();

        },



        /**

        * Convenience method for getting the view model by name in every controller of the application.

        * @public

        * @param {string} sName the model name

        * @returns {sap.ui.model.Model} the model instance

        */

        getModel: function (sName) {

            return this.getView().getModel(sName);

        },



        /**

         * Returns the default view model.

         * @returns {sap.ui.model.Model} The view model instance.

         */

        getViewModel: function () {

            return this.getView().getModel("viewModel");

        },



        /**

        * Returns the startup parameters, received over GET parameters.

        */

        getStartupData: function () {

            let sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());

            let oComponentData = sap.ui.component(sComponentId).getComponentData();



            if (oComponentData) { // Reading from the FLP

                let startupParams = oComponentData.startupParameters;



                let oData = {};



                for (let param in startupParams) {

                    oData[param] = startupParams[param][0];

                }



                return oData;

            } else { // Reading from the index.html

                const oParameters = new URLSearchParams(window.location.search);

                const aParams = {};

                for (let oEntry of oParameters.entries()) {

                    aParams[oEntry[0]] = oEntry[1];

                }

                return aParams;

            }

        },



        /**

         * Translates the strings on JS side.

         * @param {String} key The key of the translation

         * @param {Array} data Optional data for placeholders in the translation.

         */

        tl: function (key, data) {

            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            return oBundle.getText(key, data);

        },



        /**

        * Event handler for navigating back.

        * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history

        * If not, it will replace the current entry of the browser history with the master route.

        * @public

        */

        onNavBack: function () {

            var sPreviousHash = History.getInstance().getPreviousHash(),

                oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");



            if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {

                // eslint-disable-next-line sap-no-history-manipulation

                history.go(-1);

            } else {

                this.getRouter().navTo("master", {}, true);

            }

        }

    });

});