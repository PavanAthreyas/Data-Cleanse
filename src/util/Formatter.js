/*
 *    Util file to hanlde and manage changes on the Project/Task scope.
 *   central file to set/get/register changes made by the user
 */

sap.ui.define([], function() {
	"use strict";

	return {

		PercentageOfInvalid:function(noOfValid,noOfRecords){
            var sPercentage = noOfRecords*noOfValid/100;
            debugger;
            return sPercentage;
         }
        }

});