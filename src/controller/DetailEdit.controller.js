sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/library",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/FileSizeFormat",
	"sap/ui/Device",
	"sap/m/MessageToast",
	"../util/Formatter"
], function (Controller, MobileLibrary, JSONModel, MessageToast,Formatter) {
	"use strict";

	return Controller.extend("cg.pbs.org.DemoRefine.controller.DetailEdit", {

		formatter: Formatter,

		onInit: function() {
            this.oEventBus = sap.ui.getCore().getEventBus();
			// this.oEventBus.subscribe("DataTransferChannel", "bindDetailReport", this.bindDetailPage, this);
        },
        
       

		 


	});
});