sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/UploadCollectionParameter",
	"sap/m/library",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/FileSizeFormat",
	"sap/ui/Device",
	"sap/m/MessageToast",
], function (Controller,UploadCollectionParameter, MobileLibrary, JSONModel, FileSizeFormat, Device, MessageToast) {
	"use strict";

	return Controller.extend("cg.pbs.org.DemoRefine.controller.LandingPage", {

		onInit: function() {
			this.oEventBus = sap.ui.getCore().getEventBus();
			this.oEventBus.subscribe("ViewChannel", "ShowMiddleLayout", this.showMiddleLayout, this);
			this.oEventBus.subscribe("ViewChannel", "ShowEndLayout", this.showDetailEndLayout, this);
			this.getView().setModel(new JSONModel);
		},

		showMiddleLayout: function(sEventChannel,sMethodName, oData) {
			var oFC = this.getView().byId("idFlexibleColumnLayout");
			if (!this.detailView) {
				this.detailView = sap.ui.view({
					id: "midView",
					viewName: "cg.pbs.org.DemoRefine.view.Detail",
					type: "XML"
				});
			}

			oFC.addMidColumnPage(this.detailView);
			oFC.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
			this.detailView.setBusy(true);
			this.callFileReport(oData);
		},

		showDetailEndLayout: function() {
			var oFC = this.getView().byId("idFlexibleColumnLayout");
			if (!this.detailEditView) {
				this.detailEditView = sap.ui.view({
					id: "endView",
					viewName: "cg.pbs.org.DemoRefine.view.DetailEdit",
					type: "XML"
				});
			}

			oFC.addEndColumnPage(this.detailEditView);
			oFC.setLayout(sap.f.LayoutType.ThreeColumnsEndExpanded);
			// this.detailEditView.setBusy(true);
			// this.callFileReport(oData);
		},

		callFileReport: function(oData) {
			var sURL = "https://camellia.ccss.capgemini.com:51062/report/"+ oData.fileDetails.fileId ;
			var _self = this;
			jQuery.ajax({
				url: sURL,
				crossDomain : true
			  }).done(function(data) {
				_self.oEventBus.publish("DataTransferChannel", "bindDetailReport",data);
			  }) .fail(function() {
				alert( "error" );
			  });

		}

	});
});