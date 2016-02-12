sap.ui.define([
    "yelcho/wmsdemo/util/formatter"
], function() {
    "use strict";
    return {
        Date: function(value) {
            if (value) {
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                    pattern: "E dd MMMM yyyy" //"dd-MM-yyyy"
                });
                return oDateFormat.format(new Date(value));
            } else {
                return value;
            }
        },
        Number: function(value) {
            return isNaN(value) ? value : this.formatter.Quantity(value);
        },
        MaxTwoDecimals: function(value) {
            try {
                return (value) ? Number(parseFloat(value).toFixed(2)).toString() : value;
            } catch (err) {
                return "Not-A-Number";
            }
        },
        GreaterThan: function(a,b) {
            return isNaN(a)||isNaN(b) ? false : Number(a) > Number(b);
        },
        Value: function(value) {
            try {
                return (value) ? '$' + parseFloat(value).toFixed(2) : value;
            } catch (err) {
                return "Not-A-Number";
            }
        },
        parseFloat: function(value) {
            return parseFloat(value);
        },
        exists: function(object) {
            return object ? true : false;
            //        return (object && object.length > 0);
        },
        arrayCount: function(oArray) {
            return jQuery.isArray(oArray) ? oArray.length === 0 ? null : oArray.length : 0;
        },
        arrayCountVisible: function(oArray) {
            if(!oArray) return;
            if(jQuery.isArray(oArray)) {
                return oArray.length === 0 ? false : true;
            } else {
                return false;
            }
        },
        Quantity: function(value) {
            try {
                return (value) ? parseFloat(value).toFixed(0) : value;
            } catch (err) {
                return "Not-A-Number";
            }
        },
        currencyValue: function(value) {
            return isNaN(value) ? parseFloat(value).toFixed(2) : value;
        },
        isInteger: function(value) {
            return !(isNaN(value) || value !== parseFloat(value).toFixed(0));
        },
        _statusStateMap: {
            "INP": "Error",
            "SUB": "Success"
        },
        SOStatusState: function(value) {
            return (value && this.formatter._statusStateMap[value]) ? this.formatter._statusStateMap[value] : "None";
        }
    };
});