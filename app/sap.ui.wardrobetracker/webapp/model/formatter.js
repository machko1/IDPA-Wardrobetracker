sap.ui.define(function () {
    "use strict";

    var Formatter = {
        calculateTotalPrice: function (aItems) {
            let totalPrice = 0;
            aItems.forEach(function (item) {
                totalPrice += item.price;
            });
            return totalPrice;
        }
    };

    return Formatter;
}, true);