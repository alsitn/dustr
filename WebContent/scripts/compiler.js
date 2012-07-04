/**!
 * Online DustJS compiler Angular controller script 
 * Written by Nicolas Laplante (nicolas.laplante@gmail.com)
 */ 
function DustrCtrl($scope)
{
	"use strict";
	
	// Input & output fields
	$.extend($scope, {
		source: null,
		name: null,
		output: null
	});
	
	// Events
	$scope.compile = function () {
		$scope.output = dust.compile($scope.source, $scope.name);
		
		
	};
	
	// Handler to clear the fields
	$scope.clear = function () {
		$scope.source = null;
		$scope.name = null;
		$scope.output = null;
	};
	
	// Handler to determine if compile and reset buttons should be enabled/disabled
	$scope.isUnchanged = function () {
		return $scope.source == null
			&& $scope.name == null;
	};
	
	// js_beautify() when setting the output
	$scope.$watch("output", function (newValue, oldValue) {
		if (newValue !== null) {
			$scope.output = js_beautify(newValue);
		}
	});
}


(function () {
	var dustr = angular.module("dustr", []);

	/**
	 * Select compiled template on output
	 */
	dustr.directive("ngWatchSelect", function () {
		return function (scope, element, attrs) {
			scope.$watch("output", function (newValue, oldValue) {
				if (newValue !== null) {
					element.select();
				}	
			});
		};
	});
	
	/**
	 * Track Google Analytics events
	 */
	dustr.directive("ngTrackGa", function () {
		return function (scope, element, attrs) {			
			$(element).on(attrs.ngTrackGa, function (e) {
				if (typeof (_gaq) !== "undefined") {
					_gaq.push(['_trackEvent', attrs.ngTrackGaCategory, attrs.ngTrackGaName]);
				}
			});
		};
	});
}());

