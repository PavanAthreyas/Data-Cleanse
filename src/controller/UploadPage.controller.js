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

	return Controller.extend("cg.pbs.org.DemoRefine.controller.UploadPage", {

		onInit: function() {
			this.oEventBus = sap.ui.getCore().getEventBus();

			this.getView().setModel(new JSONModel({
				"maximumFilenameLength": 55,
				"maximumFileSize": 1,
				"mode": MobileLibrary.ListMode.SingleSelectMaster,
				"uploadEnabled": true,
				"uploadButtonVisible": true,
				"enableEdit": true,
				"enableDelete": true,
				"visibleEdit": true,
				"visibleDelete": true,
				"listSeparatorItems": [
					MobileLibrary.ListSeparators.All,
					MobileLibrary.ListSeparators.None
				],
				"showSeparators": MobileLibrary.ListSeparators.All
			}), "settings");

			this.getView().setModel(new JSONModel({
				"items": ["csv","xls"],
				"selected": ["csv","xls"]
			}), "fileTypes");
			
			// this.getView().setModel(new JSONModel({
			// 	"fileDetails" : []
			// }), "baseModel");
			
			var sURL = "https://camellia.ccss.capgemini.com:51058/uploadFile"
			var oUploadControl = this.byId("UploadCollection");
		oUploadControl.setUploadUrl(sURL);
			// Sets the text to the label
			// this.byId("UploadCollection").addEventDelegate({
			// 	onBeforeRendering: function() {
			// 		this.byId("attachmentTitle").setText(this.getAttachmentTitleText());
			// 	}.bind(this)
			// });

			this.getFileList();
		},

		onChange: function(oEvent) {
			var oUploadCollection = oEvent.getSource();
			// Header Token
			var oCustomerHeaderToken = new UploadCollectionParameter({
				name: "x-csrf-token",
				value: "securityTokenFromModel"
			});
			oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
		},

		getFileList:function() {
			var sURL = "https://camellia.ccss.capgemini.com:51058/filedetails";
			var _self = this;
			jQuery.ajax({
				url: sURL,
				crossDomain : true
			  }).done(function(data) {
				_self.getOwnerComponent().getModel("globalModel").setProperty("/fileDetails",data);
			  }) .fail(function() {
				alert( "error" );
			  });
		},

		onFileDeleted: function(oEvent) {
			this.deleteItemById(oEvent.getParameter("documentId"));
			MessageToast.show("FileDeleted event triggered.");
		},

		onBeforeUploadStarts: function(oEvent) {
			// Header Slug
			var oCustomerHeaderSlug = new UploadCollectionParameter({
				name: "slug",
				value: oEvent.getParameter("fileName")
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
		},

		onUploadTerminated: function() {
			/*
			// get parameter file name
			var sFileName = oEvent.getParameter("fileName");
			// get a header parameter (in case no parameter specified, the callback function getHeaderParameter returns all request headers)
			var oRequestHeaders = oEvent.getParameters().getHeaderParameter();
			*/
			alert("Here");
		},

		onStartUpload: function(oEvent) {
			var oUploadCollection = this.byId("UploadCollection");
			var cFiles = oUploadCollection.getItems().length;
			var uploadInfo = cFiles + " file(s)";
			if (cFiles > 0) {
				oUploadCollection.upload();
				MessageToast.show("Upload in Progress (" + uploadInfo + ")");
				oEvent.getSource().setBusyIndication (true);
				MessageBox.information("Uploaded " + uploadInfo);
			}
		},

		onFileTypeChange: function(oEvent) {
			this.byId("UploadCollection").setFileType(oEvent.getSource().getSelectedKeys());
		},
		
		onTypeMissmatch: function() {
			MessageToast.show("Please Upload only CSV or XLS File Format");
		},

		
		onUploadComplete: function(oEvent) {

			var oUploadCollection = this.byId("UploadCollection");
			// var oData = oUploadCollection.getModel().getData();
			MessageToast.show("Upload Successful");
			// oData.items.unshift({
			// 	"documentId": jQuery.now().toString(), // generate Id,
			// 	"fileName": oEvent.getParameter("files")[0].fileName,
			// 	"mimeType": "",
			// 	"thumbnailUrl": "",
			// 	"url": "",
			// 	"attributes": [
			// 		{
			// 			"title": "Uploaded By",
			// 			"text": "You",
			// 			"active": false
			// 		},
			// 		{
			// 			"title": "Uploaded On",
			// 			"text": new Date(jQuery.now()).toLocaleDateString(),
			// 			"active": false
			// 		},
			// 		{
			// 			"title": "File Size",
			// 			"text": "505000",
			// 			"active": false
			// 		}
			// 	],
			// 	"statuses": [
			// 		{
			// 			"title": "",
			// 			"text": "",
			// 			"state": "None"
			// 		}
			// 	],
			// 	"markers": [
			// 		{
			// 		}
			// 	],
			// 	"selected": false
			// });
		},

		statusAddressFormatter:function(status) {
				if(status) {
					return "Success";
				}
				else {
					return "Error";
				}
		},

		statusFeildFormatter:function(status) {
			if(status) {
				return "Success";
			}
			else {
				return "Error";
			}
	},

	onListItemPress: function(oEvent) {
			var oFileDetail = this.getOwnerComponent().getModel("globalModel").getProperty(oEvent.getSource().getBindingContextPath());
			this.oEventBus.publish("ViewChannel", "ShowMiddleLayout", {"fileDetails": oFileDetail});
	}

	});
});