'use strict';
var MapApp = angular.module('MapApp', ['ionic']);

/**
 * Routing table including associated controllers.
 */

MapApp.config([  
    '$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

MapApp.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
	
	$stateProvider
		.state('menu', {
			url: "/pozyczka", 
			abstract: true, 
			templateUrl: "templates/menu.html",
			})
		.state('menu.home', {
			url: '/home', 
			cache: true,
			views: {'menuContent': {templateUrl: 'templates/gpsView.html', controller: 'GpsCtrl',resolve: { payConfirmModal: function () { return false; }, 
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata();  } , citySlug: function() {	return '';  } , piny: function(loadsettingsService) { return loadsettingsService.promise; }
				} }, 'rightPanel': {templateUrl: 'templates/rightsidebarView.html', controller: 'RightPanelCtrl',resolve: {
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata();  }  , piny: function(loadsettingsService) { return loadsettingsService.promise; }
				} } }
			 })
		.state('menu.city', {
			url: '/:citySlug/pozyczki', 
			cache: true,
			controller: function($stateParams){
				$stateParams.citySlug  
			}, 
			views: {'menuContent': {templateUrl: 'templates/gpsView.html', controller: 'GpsCtrl',resolve: { payConfirmModal: function () { return false; }, 
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata();  } , citySlug: ['$stateParams', function($stateParams){
					return $stateParams.citySlug;
				}]   
				} }, 'rightPanel': {templateUrl: 'templates/rightsidebarView.html', controller: 'RightPanelCtrl',resolve: {
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata();  }   
				} } }
			 })	 
		.state('menu.settings', {
			url: '/settings', 
			views: {'menuContent': {templateUrl: 'templates/settingsView.html', controller: 'SettingsCtrl',resolve: {
				userdata: function(UserdataService) {	return UserdataService.getUserdata(); }  
				} } },
			})
 		.state('menu.personal', {
			url: '/personal', 
			views: {'menuContent': {templateUrl: 'templates/personalView.html', controller: 'PersonalCtrl',resolve: {  
				userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata(); }  
				}  } }
			})
		.state('menu.ordered', {
			url: '/ordered', 
			cache: false,
			views: {'menuContent': {templateUrl: 'templates/orderedView.html', cache:false, controller: 'OrderedCtrl',resolve: {  
				orderdata: function(OrderdataService) {	return OrderdataService.getOrderdata(); }  
				} }  } 
			})
		.state('menu.confirm', {
			url: '/confirm/:pointId',
			controller: function($stateParams){
				$stateParams.pointId  
			}, 
			cache: false,
			views: {'menuContent': {templateUrl: 'templates/confirmView.html?v=970', cache:false, controller: 'ConfirmCtrl',resolve: {  
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata(); } , pointId: ['$stateParams', function($stateParams){
					return $stateParams.pointId;
				}]
				} }  } 
			})
		.state('menu.tmobile', {
			url: '/tmobile/:pointId',
			controller: function($stateParams){
				$stateParams.pointId  
			}, 
			cache: false,
			views: {'menuContent': {templateUrl: 'templates/tmobileView.html', cache:false, controller: 'ConfirmCtrl',resolve: {  
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata(); } , pointId: ['$stateParams', function($stateParams){
					return $stateParams.pointId;
				}]
				} }  } 
			})
	
		.state('menu.point', {
			url: '/p/:pointSlug/:pointId',
			controller: function($stateParams){
				$stateParams.pointId  
			}, 
			cache: false,
			views: {'menuContent': {templateUrl: 'templates/pointView.html?v=970', cache:false, controller: 'PointCtrl', resolve: {  
				 pointId: ['$stateParams', function($stateParams){
					return $stateParams.pointId;
				}]
				} }  } 
			})	
		.state('menu.addpoint', {
			url: '/addpoint', 
			views: {'menuContent': {templateUrl: 'templates/addPointView.html', controller: 'AddPointCtrl',resolve: {
				userdata: function(UserdataService) {	return UserdataService.getUserdata(); } } }, 'rightPanel': {templateUrl: 'templates/rightaddpointView.html' }
				  },
			})	
		
		.state('menu.payFinal', {
			url: '/payFinal', 
			cache: true,
			views: {'menuContent': {templateUrl: 'templates/gpsView.html', controller: 'GpsCtrl',resolve: { payConfirmModal: function () { return true; } ,
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata();  }  
				} }, 'rightPanel': {templateUrl: 'templates/rightsidebarView.html', controller: 'RightPanelCtrl',resolve: {
				settings: function(UserdataService) {	return UserdataService.getUserdata(); }  , userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata();  }  
				} } }
			 }) 
		
		.state('menu.regulamin', {
			url: '/regulamin', 
			views: {'menuContent': {templateUrl: 'templates/regulaminView.html', controller: 'regulaminCtrl' }}
			})	
		

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/pozyczka/home');
	$ionicConfigProvider.views.maxCache(5);
	$ionicConfigProvider.backButton.text('Wróć');
}]);


/**
 * HEADER - handle menu toggle
 */
MapApp.controller('HeaderCtrl', function($scope) {
	// Main app controller, empty for the example

});
/**
 * MAIN CONTROLLER - handle inapp browser
 */
MapApp.controller('MainCtrl', 	function($scope, $ionicPlatform, $ionicSideMenuDelegate) {
	// check login code
	
	
	
});

MapApp.controller('regulaminCtrl', 	function($scope) {
	$scope.screenformheight=window.innerHeight-44;
});


MapApp.controller('AddPointCtrl', 	function($scope,$http) {
	$scope.screenformheight=window.innerHeight-44;
	$scope.mode=3;
	$scope.sobota=false;
	$scope.niedziela=false;
	$scope.contacttime=60;
	$scope.loanvaluefrom=200;
	$scope.loanvalueto=10000;
	$scope.maxcash=1000;
	$scope.maxeasy=1000;
	
	$scope.abomode = [
    { Id: 1, Name: "1 miesiąc", Price: "59 zł", Promo: 'Promocja "Satysfakcja gwarantowana"', PromoPrice: "19,99 zł" },
    { Id: 2, Name: "3 miesiące", Price: "149 zł", Save: "15" },
    { Id: 3, Name: "12 miesięcy", Price: "528 zł", Save: "25" }
	];
	
	$scope.abooption=1;

	
	$scope.goPayment = function(f) {
		var purl="";
		



	var newpointdata =
						{
							name:($("[name='pointname']").val()),
							network:($("[name='pointnetwork']").val()),
							city:($("[name='city']").val()),
							postcode:($("[name='postcode']").val()),
							street:($("[name='street']").val()),
							number:($("[name='number']").val()),
							locationinfo:($("[name='locationinfo']").val()),
							open1from:($("[name='open1from']").val()),
							open1to:($("[name='open1to']").val()),
							open2from:($("[name='open2from']").val()),
							open2to:($("[name='open2to']").val()),
							open3from:($("[name='open3from']").val()),
							open3to:($("[name='open3to']").val()),
							phone:($("[name='phone']").val()),
							email:($("[name='email']").val()),
							loanvaluefrom:($("[name='loanvaluefrom']").val()),
							loanvalueto:($("[name='loanvalueto']").val()),
							contacttime:($("[name='contacttime']").val()),
							maxcash:($("[name='maxcash']").val()),
							maxeasy:($("[name='maxeasy']").val()),
							description:($("[name='description']").val()),
							picurl:($("[name='picurl']").val()),
							abomode:(f),
							nip:($("[name='invoice_nip']").val()),
							nazwafaktura:($("[name='invoice_company']").val()),
							adresfaktura:($("[name='invoice_address']").val()),
						};
				
				var url = "https://bliskapozyczka.pl/newpointpreregister.php";
				
				
				
				
				var jsonString = JSON.stringify(newpointdata);
				console.log(jsonString);
				
				
				
				jQuery.support.cors = true;
				$.ajax({
											url: url,
											type: "POST",
											data: {data : jsonString},
											cache: false,
											success: function () {
												true;
											}
											
										});
										
	
	
	
		switch(f) {
			case 1: purl='https://ssl.dotpay.pl/t2/?pid=c4hq65vzosbdq0s5kej954wvrulcu95i'; break;
			case 2: purl='https://ssl.dotpay.pl/t2/?pid=yzxv5yh4li045m326fhcvzru9u9lrdi1'; break;
			case 3: purl='https://ssl.dotpay.pl/t2/?pid=ma8sf1a4pno5p06nywb2j4w4jaedk08z'; break;
		}

		if (purl.length)
		{
			window.location=purl;
		}
	}
	
});


MapApp.controller('RightPanelCtrl', 	function($scope, $ionicPlatform, $ionicPopup,$ionicSideMenuDelegate,$rootScope,userdata,settings,whoiswhereService) {
	$scope.user = userdata;	
	$scope.settings= settings;
	$scope.formHeight= window.innerHeight-88;
	
	
	
	$scope.nearPoints=[];
	
	$scope.orderLoan= function () {
				
				var chk=$("[name='confirm_chk']").prop('checked');
				if (chk==false)
				{
					$ionicPopup.alert({title:'Brak zgody',template:'Musisz wyrazić zgodę na przekazanie danych do umowy. Zaznacz odpowiednie pole formularza.'});
					return;
				}

				var userdata =
						{
							vorname:encodeURI($("[name='firstname']").val()),
							name:encodeURI($("[name='surname']").val()),
							email:encodeURI($("[name='email']").val()),
							phone:encodeURI($("[name='tel']").val()),
							dowod:encodeURI($("[name='dowod']").val()),
							pesel:encodeURI($("[name='pesel']").val()),
							loanvalue:$scope.settings.loanvalue,
							punkt:$scope.pointId,
							waittime:window.localStorage.getItem('waittime')
						};
				
				
				var url = "https://bliskapozyczka.pl/bliskaorder.php";
				
				var request= array2json(userdata);
				console.log(userdata);
				jQuery.support.cors = true;
				$.ajax({
											url: url,
											async: false,
											contentType: "text/html",
											data: { 'order': request },
											
											success: function () {
												$ionicPopup.alert({title:'Gratulacje!',template:'Twój wniosek został złożony w wybranym punkcie pożyczkowym. Udaj się tam, aby dopełnić formalności i odebrać pożyczkę. Szczegółowe dane o adresie i godzinach działania punktu pożyczkowego zostały wysłane na Twój adres e-mail.'});
												//window.location.hash="#!/pozyczka/ordered";
											},
											error:  function(jqXHR, textStatus, ex) {
												alert('Błąd sieci!');
												window.location.hash="#!/pozyczka/home";
											}
										});
										
										

			}
	
	$scope.listPointClick = function(id) {
					
		$rootScope.$broadcast('LIST_CLICK', id);
		$scope.pointId=id;
		$scope.$apply();
	}
	
	$scope.addPoint = function () {
		window.location.hash="#!/pozyczka/addpoint";
	}
	
	$scope.$on('PIN_CLICK', function(response,data) {
		
        $scope.pointId=data;
		if(!$ionicSideMenuDelegate.isOpenRight())
		{
			/*if(window.innerWidth>600)
				$ionicSideMenuDelegate.toggleRight();
			*/
		}
		else
		{
			if(window.innerWidth<=600)
			{
				$ionicSideMenuDelegate.toggleRight();
			}
		}
		
		//$scope.$apply();
	})
	
	$scope.$on('PIN_CLOSE', function(response,data) {
        $scope.pointId=false;
		$scope.$apply();
	})
	
	$scope.$on('DISTANCE_CALCULATED', function(response,data) {
		
        $scope.nearPoints=data;
		$scope.$apply();
		
		
		
	})
	
});



/**
 * A google map / GPS controller.
 */
 
MapApp.factory('whoiswhereService', function($http) {
  return {
    all: function() {
      // Return promise (async callback)
	  var url="https://bliskapozyczka.pl/p.php?mode=mobi";
	  //console.log(url);
      return $http.get(url);
    }
  };
})


MapApp.factory('FlightDataService', function($q, $timeout,$rootScope) {

    var searchAirlines = function(searchFilter) {

        var deferred = $q.defer();
	    var matches = $rootScope.cities.filter( function(city) {
	    	if(city.toLowerCase().indexOf(searchFilter.toLowerCase()) == 0 ) return true;
	    })

        $timeout( function(){
           deferred.resolve( matches );
        }, 100);

        return deferred.promise;
    };

    return {
        searchAirlines : searchAirlines
    }
})


 
MapApp.controller('GpsCtrl', 	function($scope, $ionicPlatform, $ionicSideMenuDelegate,$ionicPopup,$ionicModal,$ionicPopover,$ionicLoading,$location,$rootScope,userdata,settings,whoiswhereService,FlightDataService, payConfirmModal,citySlug,piny) {

	$scope.version='v. 0.970';
	$scope.mapHeight= window.innerHeight-88;
	$scope.modalHeight=$scope.mapHeight * 0.9;
	
	if (typeof(citySlug)!=='undefined' && citySlug.length>0) $scope.citySlug=citySlug;
	
	$scope.modalContentHeight = $scope.modalHeight-44;
	
	$scope.mapWidth= window.innerWidth;
	$scope.basel = { lat: 52.107885, lon: 17.038538 };  //domyślny środek mapy
	$scope.user = userdata;	
	$scope.settings= settings;
	$scope.pins = piny;
	
	console.log('PINY:');
	console.log($scope.pins);
	
	$scope.payConfirmModal=payConfirmModal;
	
	$scope.showHowTo=(window.innerWidth>600);
	$scope.showCert=(window.innerWidth>750);
		
	$scope.popupOn=false;
	
	$scope.modalgroups = [
	{name:"Podaj miasto ręcznie",  items: [ { type: 'input', name: 'miasto', placeholder: 'Miasto lub pełny adres', value: '' } ], type: 'normal' },
	{name:"Zobacz jak na stałe włączyć automatyczną lokalizację w przeglądarce",  items: [ { type: 'text' } ], type: 'info' }
  ];
	$scope.shownGroup = $scope.modalgroups[0];
	$scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
		
		return $scope.shownGroup === group;
    };
	
	$scope.regulamin = function () {
		window.location.hash="#!/pozyczka/regulamin";
	}
	$ionicModal.fromTemplateUrl('templates/modal.html?v=903', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  $scope.openModal = function() {
		if(typeof($scope.modal)!=='undefined') $scope.modal.show();
	  };
	  $scope.closeModal = function() {
		window.localStorage.setItem('defaultManualAddress','');
		$scope.modal.hide();
	  };
	  // Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		// Execute action
	  });
	  // Execute action on remove modal
	  $scope.$on('modal.removed', function() {
		// Execute action
	  });
	
	
	$ionicModal.fromTemplateUrl('templates/modal2.html', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal2 = modal;
	  });
	  $scope.openModal2 = function() {
		$scope.closePopover();
		$scope.modal2.show();
	  };
	  $scope.closeModal2 = function() {
		$scope.modal2.hide();
	  };
	  // Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal2.remove();
	  });
	  
	
	$ionicModal.fromTemplateUrl('templates/info.html?v=1', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal3 = modal;
		console.log('modal3 setup');
						
	  });
	  
	  $scope.openModal3 = function() {
		if (typeof($scope.popover)!=='undefined') $scope.closePopover();
		$scope.modal3.show();
	  };
	  $scope.closeModal3 = function() {
		$scope.modal3.hide();
	  };
	  // Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		$scope.modal3.remove();
	  });
 
	
	$ionicPopover.fromTemplateUrl('templates/popover.html?v=2', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

  
	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
	  //Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
	  // Execute action on hide popover
	$scope.$on('popover.hidden', function() {
		// Execute action
	});
	  // Execute action on remove popover
	$scope.$on('popover.removed', function() {
		// Execute action
	});
	
	$scope.data = { "cities" : [], "search" : window.localStorage.getItem('defaultManualAddress') };

    $scope.search = function() {

    	FlightDataService.searchAirlines($scope.data.search).then(
    		function(matches) {
    			$scope.data.cities = matches;
    		}
    	)
    }

	$scope.manualLocalization = function() {
		
		
		var geocoder = new google.maps.Geocoder();
		var address = $scope.data.search;
		
		$scope.closeModal();
		$scope.closeModal2();
		$scope.closeModal3();
		
		$ionicLoading.show({
			templateUrl:"templates/localizationinprogress.html"
		});
		
		geocoder.geocode( { 'address': address}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {
		
				window.localStorage.setItem('defaultManualAddress',address);
				
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				
				$scope.basel.lat=latitude;
				$scope.basel.lon=longitude;
				$scope.gotoLocation($scope.basel.lat, $scope.basel.lon); 
				var i;
				for(i=1;i<$scope.whoiswhere.length;i++)
				{
					$scope.whoiswhere[i].distance=getDistanceFromLatLonInKm($scope.basel.lat,$scope.basel.lon,parseFloat($scope.whoiswhere[i].lat),parseFloat($scope.whoiswhere[i].lon));
					if(parseFloat($scope.whoiswhere[i].lat)>0 && parseFloat($scope.whoiswhere[i].lon)>0 && $scope.whoiswhere[i].distance<0.1) 
						{
							$scope.whoiswhere[i].distance=0.1;
						}
					
				}
					
				$scope.whoiswhere.sort(function(a, b){return a.distance-b.distance});
				$rootScope.$broadcast('DISTANCE_CALCULATED', $scope.whoiswhere);	
				$ionicLoading.hide();		
			}
		else
		    {
			
			$ionicLoading.hide();
			
			$ionicPopup.alert({title:'Nie ma takiego adresu',template:'Nie ma takiego miasta '+address+'... jest Lądek, Lądek Zdrój. W tej sytuacji startujemy bez geolokalizacji, możesz ustawić miasto korzystając z opcji w aplikacji.'});

			}
		}); 
	}

	$scope.centerMe = function () {
	
				
				var geo_options = {
					  enableHighAccuracy: true, 
					  maximumAge        : 30000, 
					  timeout           : 27000
				};
				
				
				$ionicLoading.show({
					templateUrl:"templates/localizationinprogress.html"
				});
		
				
				
				navigator.geolocation.getCurrentPosition(function(position) {
					$scope.position=position;
					var c = position.coords;
					console.log('Current position:'+c.latitude+','+c.longitude);
					$scope.gotoLocation(c.latitude, c.longitude);
					
					var i;
					for(i=1;i<$scope.whoiswhere.length;i++)
					{
						$scope.whoiswhere[i].distance=getDistanceFromLatLonInKm(c.latitude,c.longitude,parseFloat($scope.whoiswhere[i].lat),parseFloat($scope.whoiswhere[i].lon));
						
						if(parseFloat($scope.whoiswhere[i].lat)>0 && parseFloat($scope.whoiswhere[i].lon)>0 && $scope.whoiswhere[i].distance<0.1) 
						{
							$scope.whoiswhere[i].distance=0.1;
						}
					}
					
					$scope.whoiswhere.sort(function(a, b){return a.distance-b.distance});
					//console.log($scope.whoiswhere);
					
					$rootScope.$broadcast('DISTANCE_CALCULATED', $scope.whoiswhere);	
					
					var howitworks= window.localStorage.getItem('BPinfomodal3');
						if (!howitworks && window.innerWidth>600)  
						{
							$scope.openModal3();
							window.localStorage.setItem('BPinfomodal3',1);
						}	
					$ionicLoading.hide();
					
				},function(e) { 
					
						$ionicLoading.hide();
						$scope.popupOn=true;
						
						
						//$scope.showConfirm();
						if(!$scope.payConfirmModal)
							$scope.openModal();  
					
						var howitworks= window.localStorage.getItem('BPinfomodal3');
						console.log(howitworks);
						if (!howitworks && window.innerWidth>600)  
						{
							$scope.openModal3();
							window.localStorage.setItem('BPinfomodal3',1);
						}	
					
					console.log("Error retrieving position " + e.code + " " + e.message); 
					$scope.gotoLocation($scope.basel.lat, $scope.basel.lon); 
					var i;
					if(typeof($scope.whoiswhere)!=='undefined')
					{
						for(i=1;i<$scope.whoiswhere.length;i++)
						{
							$scope.whoiswhere[i].distance=getDistanceFromLatLonInKm($scope.basel.lat,$scope.basel.lon,parseFloat($scope.whoiswhere[i].lat),parseFloat($scope.whoiswhere[i].lon));
							
							if(parseFloat($scope.whoiswhere[i].lat)>0 && parseFloat($scope.whoiswhere[i].lon)>0 && $scope.whoiswhere[i].distance<0.1) 
								$scope.whoiswhere[i].distance=0.1;
						}
								
						$scope.whoiswhere.sort(function(a, b){return a.distance-b.distance});
						$rootScope.$broadcast('DISTANCE_CALCULATED', $scope.whoiswhere);	
					}
					
				}, geo_options);
				
				
				$scope.gotoLocation = function (lat, lon) {
					
					if ($scope.lat != lat || $scope.lon != lon) 
					{
						$scope.basel = { lat: lat, lon: lon };
						//console.log("BASEL");
						//console.log($scope.basel);
						
					}
				};	
	};
	
	function deg2rad(deg) {
		return deg * (Math.PI/180)
	}
	
	function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d.toFixed(1);
	}

	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
	
  	if (typeof(Number.prototype.toRadians) === "undefined") {
			Number.prototype.toRadians = function() {
				return this * Math.PI / 180;
			}
	}
		
	function onDeviceReady() {
	
		$scope.centerMe();
		$scope.loading = false;
		
	
		
		whoiswhereService.all().then(function(p) {

		var i;
		var w;
		var cities=[];
		$scope.whoiswhere = [ 
			{ id: 1, 'name': 'Ja', 'type':'me', 'lat':  $scope.basel.lat, 'lon' : $scope.basel.lon}
			];
		for(i=0;i<p.data.length;i++)
		{
						
			if(p.data[i].pic=='') p.data[i].pic="img/bank.jpg";				
			w = { id: p.data[i].id, 'status':p.data[i].status, 'name': p.data[i].name, 'siec': p.data[i].siec, 'picture': p.data[i].pic, 'type':'point', 'priority':p.data[i].priority, 'city':p.data[i].city, 'address':p.data[i].address, 'tel':p.data[i].tel, 'lat': p.data[i].lat, 'lon' : p.data[i].lon, 'open':p.data[i].open, 'maxloan':p.data[i].maxloan, 'waittime':p.data[i].waittime, 'distance' : getDistanceFromLatLonInKm($scope.basel.lat,$scope.basel.lon,parseFloat(p.data[i].lat),parseFloat(p.data[i].lon))};
						//console.log(w);
			$scope.whoiswhere.push(w);
			
			if(cities.indexOf(p.data[i].city)==-1)
				{
					cities.push(p.data[i].city);
				}
				
		}
		
		$scope.whoiswhere.sort(function(a, b){return a.distance-b.distance});
		
		
		$rootScope.cities=cities;
		$scope.centerMe();
		});
	}	
	
	if($scope.payConfirmModal)
		{
			$ionicPopup.show({
														template: 'Twój Punkt został zgłoszony do dodania. W ciągu 24 godzin dokonamy weryfikacji zgłoszenia i zamieścimy punkt na mapie. O zamieszczeniu punktu powiadomimy Cię pocztą elektroniczną.',
														title: 'Gratulacje!',
														subTitle: 'Punkt został zgłoszony',
														buttons: [
														  { text: 'OK',
															type: 'button-positive' ,
														  }
														],
														
													  });
		}
});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
MapApp.controller('SettingsCtrl', function($scope,userdata) {
	$scope.user = userdata;
	$scope.saveSettings = function () {
		
		window.localStorage.setItem('loanvalue',$scope.user.loanvalue);
		window.localStorage.setItem('waittime',$scope.user.waittime);
		
		window.location.hash="#!/pozyczka/home";
	}
	
	
  
});


MapApp.controller('PersonalCtrl', function($scope,userdata) {
	
	$scope.user = userdata;
	
	
	$scope.savePersonal = function ()
	{
		var vorname=$("[name='firstname']").val();
		var name=$("[name='surname']").val();
		var email=$("[name='email']").val();
		var phone=$("[name='tel']").val();
		var dowod=$("[name='dowod']").val();
		var pesel=$("[name='pesel']").val();
	
		window.localStorage.setItem('vorname',vorname);
		window.localStorage.setItem('name',name);
		window.localStorage.setItem('email',email);
		window.localStorage.setItem('phone',phone);
		window.localStorage.setItem('dowod',dowod);
		window.localStorage.setItem('pesel',pesel);
		
		window.location.hash="#!/pozyczka/home";
	}
  
});

MapApp.controller('OrderedCtrl', function($scope,orderdata) {
	
	$scope.order = orderdata;
	
});


MapApp.controller('PointCtrl', function($scope,$ionicPopup,$http,$timeout,pointId) {
	$scope.screenformheight=window.innerHeight-88;
	$scope.pointId = pointId;
	var uri="https://bliskapozyczka.pl/p.php?mode=mobi&p="+parseInt(pointId);	
	console.log(uri);
	$http.get(uri).then(function(response){
			$timeout(function() {
					console.log(response);
					if(response.data.zdjecie=='') response.data.zdjecie="img/bank.jpg";
					$scope.pointInfo=response;
					
			},0);
	});
});

MapApp.controller('ConfirmCtrl', function($scope,$ionicPopup,$http,$timeout,settings,userdata,pointId) {
	
	$scope.screenformheight=window.innerHeight-88;

	//settings.loanvalue=settings.loanmax;
	$scope.settings = settings;
	console.log(settings);
	$scope.user = userdata;
	$scope.pointId = pointId;
	
	$http.get("https://bliskapozyczka.pl/p.php?mode=mobi&p="+parseInt(pointId)).then(function(response){
			$timeout(function() {
			
					console.log(response);
					$scope.settings.loanmax=parseInt(response.data.max_pozyczka);
					$scope.settings.loanmin=parseInt(response.data.min_pozyczka);
					
					console.log($scope.settings.loanvalue);
					if($scope.settings.loanvalue>$scope.settings.loanmax) $scope.settings.loanvalue=$scope.settings.loanmax;
					if($scope.settings.loanvalue<$scope.settings.loanmin) $scope.settings.loanvalue=$scope.settings.loanmin;
					$scope.$apply();
			
			},0);
	});
	
	/*	
	$scope.groups = [
	{name:"Adres zameldowania",  items: [ { type: 'text', name: 'adres', placeholder: 'Ulica i numer domu', value: '' } , { type: 'text', name: 'city', placeholder: 'Miasto', value: '' } , { type: 'text', name: 'postcode', placeholder: 'Kod pocztowy', value: '' } ] } ];
	
	$scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
		
		return $scope.shownGroup === group;
    };
	*/
	
	$scope.orderLoanOld= function () {
				var userdata =
						{
							vorname:encodeURIComponent($scope.user.vorname),
							name:encodeURIComponent($scope.user.name),
							email:$scope.user.email,
							phone:encodeURIComponent($scope.user.phone),
							dowod:encodeURIComponent($scope.user.dowod),
							pesel:encodeURIComponent($scope.user.pesel),
							loanvalue:encodeURIComponent($scope.settings.loanvalue),
							punkt:encodeURIComponent($scope.pointId),
							waittime:window.localStorage.getItem('waittime')
						};
				
				
				var url = "https://bliskapozyczka.pl/bliskaorder.php";
				
				var request= array2json(userdata);
				console.log(userdata);
				jQuery.support.cors = true;
				$.ajax({
											url: url,
											async: false,
											contentType: "text/html",
											data: { 'order': request },
											
											success: function () {
												
												$ionicPopup.show({
												template: 'Twój wniosek został złożony w wybranym punkcie pożyczkowym. Udaj się tam, aby dopełnić formalności i odebrać pożyczkę. Szczegółowe dane o adresie i godzinach działania punktu pożyczkowego zostały wysłane na Twój adres e-mail.',
												title: 'Gratulacje!',
												subTitle: 'Wniosek został złożony',
												buttons: [
												  { text: 'OK',
													type: 'button-positive' 
												  }
												]
											  });
											   window.location.hash="#!/pozyczka/home";
											},
											error:  function(jqXHR, textStatus, ex) {
												alert('Błąd sieci!');
												window.location.hash="#!/pozyczka/home";
											}
										});
										
										

			}
	
});

// formats a number as a latitude (e.g. 40.46... => "40°27'44"N")
MapApp.filter('lat', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? "N" : "S";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
});

// formats a number as a longitude (e.g. -80.02... => "80°1'24"W")
MapApp.filter('lon', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ew = input > 0 ? "E" : "W";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ew;
    }
});



MapApp.service('UserdataService', function($q) {

	var loanvalue = window.localStorage.getItem('loanvalue');
	var waittime = window.localStorage.getItem('waittime');
	
	if(!loanvalue) { loanvalue=2000; window.localStorage.setItem('loanvalue',loanvalue); }
	if(!waittime)  { waittime=45; window.localStorage.setItem('waittime',waittime); }
	
	
	return {
		userdata: 
			{
				loanmin: '200',
				loanmax: '3000',
				loanvalue: loanvalue,
				waittime: waittime,
				waittimemin: '15',
				waittimemax: '240'
			},
		getUserdata: function() {
			//console.log(this.userdata);
			return this.userdata;
		    }
	}
});



MapApp.service('UserpersonalService', function($q) {

	return {
		userdata:
			{
				vorname:window.localStorage.getItem('vorname'),
				name:window.localStorage.getItem('name'),
				email:window.localStorage.getItem('email'),
				phone:window.localStorage.getItem('phone'),
				dowod:window.localStorage.getItem('dowod'),
				pesel:window.localStorage.getItem('pesel')
			},
		getUserdata: function () {
			console.log(this.userdata);
			return this.userdata;
		}
	}
});

MapApp.service('OrderdataService', function($q) {

	return {
		orderdata:
			{
				label:window.localStorage.getItem('orderlabel'),
				address:window.localStorage.getItem('orderaddress'),
			},
		getOrderdata: function () {
			return this.orderdata;
		}
	}
});

MapApp.service('loadsettingsService', function($http) {
	var pins=null;
	var promise = $http.get('https://bliskapozyczka.pl/p.php?mode=mobi&s=1').success(function (data) {
      pins = data;
    });
	return {
		promise: promise,
		getPins: function () {
			return pins;
		}
	}
});

		
/**
 * Handle Google Maps API V3+
 */
// - Documentation: https://developers.google.com/maps/documentation/
MapApp.directive("appMap", function ($window,$compile,$http,$rootScope,$ionicModal,$ionicPopup,$ionicSideMenuDelegate) {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        scope: {
            center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            markers: "=",       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
            width: "@",         // Map width in pixels.
            height: "@",        // Map height in pixels.
            zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            mapTypeId: "@",     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
            panControl: "@",    // Whether to show a pan control on the map.
            zoomControl: "@",   // Whether to show a zoom control on the map.
            scaleControl: "@",   // Whether to show scale control on the map.
			basel: "=",
			loading: "=",
			user: "=",
			settings: "=",
			
        },
        link: function (scope, element, attrs) {
            var toResize, toCenter;
            var map;
            var infowindow;
            var currentMarkers;
   	        var callbackName = 'InitMapCb';
			
			console.log(attrs);
			scope.mapHeight= window.innerHeight-88;
			scope.modalHeight=(window.innerHeight-88);
			scope.modalContentHeight = window.innerHeight-44;
	
			$ionicModal.fromTemplateUrl('templates/confirmmodal.html?v=970', {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                scope.cmodal = modal
            });
			
			$ionicModal.fromTemplateUrl('templates/tmobilemodal.html', {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                scope.tmmodal = modal
            });
			
			
			scope.orderLoan=function () {
				
				
				var userdata =
						{
							vorname:encodeURIComponent(scope.user.vorname),
							name:encodeURIComponent(scope.user.name),
							email:scope.user.email,
							phone:encodeURIComponent(scope.user.phone),
							dowod:encodeURIComponent(scope.user.dowod),
							pesel:encodeURIComponent(scope.user.pesel),
							loanvalue:encodeURIComponent(scope.settings.loanvalue),
							punkt:encodeURIComponent(scope.pointId),
							waittime:window.localStorage.getItem('waittime')
						};
				
				
				var url = "https://bliskapozyczka.pl/bliskaorder.php";
				
				var request= array2json(userdata);
				console.log(userdata);
				jQuery.support.cors = true;
				$.ajax({
											url: url,
											async: false,
											contentType: "text/html",
											data: { 'order': request },
											
											success: function () {
												scope.closeCModal();
												
												$ionicPopup.show({
												template: 'Twój wniosek został złożony w wybranym punkcie pożyczkowym. Udaj się tam, aby dopełnić formalności i odebrać pożyczkę. Szczegółowe dane o adresie i godzinach działania punktu pożyczkowego zostały wysłane na Twój adres e-mail.',
												title: 'Gratulacje!',
												subTitle: 'Wniosek został złożony',
												buttons: [
												  { text: 'OK',
													type: 'button-positive' 
												  }
												]
											  });
											
											},
											error:  function(jqXHR, textStatus, ex) {
												alert('Błąd sieci!');
												window.location.hash="#!/pozyczka/home";
											}
										});
										
										

			}
			
			scope.openCModal=function(id) {
				scope.cmodal.show();
			}
			
			scope.openTMobileModal=function(id) {
				scope.tmmodal.show();
			}

			
			
			scope.closeCModal=function() {
				scope.cmodal.hide();
			}
			
			scope.closeTMobileModal=function() {
				scope.tmmodal.hide();
			}

   			// callback when google maps is loaded
			$window[callbackName] = function() {
				
				console.log("map: init callback");
				createMap(parseInt(scope.zoom));
				//scope.getMarkers().then(function(markers) {
					updateMarkers(scope.markers);
				//});
				};

			if (!$window.google || !$window.google.maps ) {
				console.log("map: not available - load now gmap js");
				loadGMaps();
				}
			else
				{
				console.log("map: IS available - create only map now");
				createMap(parseInt(scope.zoom));
				}
			function loadGMaps() {
				console.log("map: start loading js gmaps");
				var script = $window.document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBIEecIPUB1CsLmJqahBKGODKHfmP1MUoY&callback=InitMapCb';
				$window.document.body.appendChild(script);
				}

			
			
			function createMap(zoompar) {
				console.log("map: create map start");
				console.log("map center: ");
				console.log(scope.center);
				var mapOptions = {
					zoom: zoompar,
					center: new google.maps.LatLng(scope.center.lat,scope.center.lon),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					panControl: true,
					zoomControl: true,
					zoomControlOptions: {
						position: google.maps.ControlPosition.LEFT_TOP
					},
					mapTypeControl: true,
					scaleControl: false,
					streetViewControl: true,
					streetViewControlOptions: {
						position: google.maps.ControlPosition.LEFT_TOP
					},
					navigationControl: true,
					disableDefaultUI: true,
					overviewMapControl: true
					};
				if (!(map instanceof google.maps.Map)) {
					console.log("map: create map now as not already available ");
					map = new google.maps.Map(element[0], mapOptions);
					  // EDIT Added this and it works on android now
					  // Stop the side bar from dragging when mousedown/tapdown on the map
					  google.maps.event.addDomListener(element[0], 'click', function(e) {
						e.preventDefault();
						return false;
						});
					infowindow = new google.maps.InfoWindow({pixelOffset: new google.maps.Size(0, -32)}); 
					}
				}
			
			scope.getMarkers = function() {
				var markers=[];
						
				console.log('getmarkers');
				console.log(scope.markers);
				return scope.markers;
				/*return $http.get("p.php").then(function(response){
					markers = response;
					
					return markers;
				});
				*/
			}
			
			

			scope.$watch('markers', function() {
				console.log('watch');
				//scope.getMarkers().then(function(markers) {
					updateMarkers(scope.markers);
				//});
			})
			
			scope.$watch('loading', function() {
				console.log('loading watch');
				console.log(scope.loading);
			})
				
			scope.$watch('center', function() {
				if (map)
				{
					var loc = new google.maps.LatLng(scope.center.lat, scope.center.lon);
					map.panTo(loc);
					
					currentMarkers[0].setPosition( loc);
				}
			})
			
			
			scope.$on('LIST_CLICK', function(response,id) {

				//console.log(currentMarkers);
				var i;
				//console.log(currentMarkers);
				
				for(i=0;i<currentMarkers.length;i++)
				{
					if(currentMarkers[i].id==id) 
					{	
						google.maps.event.trigger(currentMarkers[i], 'mousedown');
						i=scope.markers.length;
					}
				
				}
				
				
			})
			
			
			scope.confirmUserdata = function(id) {
				scope.pointId=id;
				scope.openCModal(id);
			
			}
			
			scope.tmobileForm = function(id) {
				scope.pointId=id;
				scope.openTMobileModal(id);
			
			}
			
			scope.pointInfo = function(slugname,id) {
				window.location.hash="#!/pozyczka/p/"+slugname+'/'+id;
			}
			
			function convertToSlug(Text)
			{
				var str = Text.replace(/^\s+|\s+$/g, ''); // trim
				str = str.toLowerCase();

				// remove accents, swap ñ for n, etc
				var from = "ąćęłńóśźżãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
				var to   = "acelnoszzaaaaaeeeeeiiiiooooouuuunc------";
				for (var i=0, l=from.length ; i<l ; i++) {
					str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
				}

				str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
					.replace(/\s+/g, '-') // collapse whitespace and replace by -
					.replace(/-+/g, '-'); // collapse dashes
	
			  return str;
			}
			

			// Info window trigger function 
			function onItemClick(pin, id, label, open, city, address, tel, waittime, priority,member) { 
							var contentString;
				
						if(member.status!=5)
						{
							if(window.innerWidth>430)
							{ 
								contentString = '<div id="infobox" style="width:420px;" >'+
							'<div style="float:left;width:50%;box-sizing:border-box;padding-right:10px;">'+
							'<img src="'+member.picture+'" alt="" style="width:100%;height:auto;background:#000;border-radius:5px;" />'+
							'<a ng-click="pointInfo(\''+convertToSlug(member.name)+'\','+id+')" style="display:block;background:#DFDFDF;text-align:center;border-radius:5px;padding:15px;margin-top:10px;">SZCZEGÓŁY</a>'+
							'</div><div style="float:right;width:50%;box-sizing:border-box;padding-left:10px;">'+
							'<h3 style="font-size:200%;color:#29BFAF;margin:10px 0 !important;">'+member.name+'</h3>'+
							'<dl>'+
							'<dt><b>Adres</b></dt>'+
                            '<dd>' + member.address +'</dd>'+
                            '<dt style="margin-top:8px;"><b>Godziny otwarcia</b></dt>'+
                            '<dd>' + member.open +'</dd>'+
                            '<dt style="margin-top:8px;"><b>Czas oczekiwania</b></dt>'+
                            '<dd>' + member.waittime +' minut</dd>'+
                            '<dt style="margin-top:8px;"><b>Maks. Pożyczka</b></dt>'+
                            '<dd>' + member.maxloan +' PLN</dd>'+
							'</dl>'+
							'<a ng-click="confirmUserdata('+id+')" style="display:block;background:#ef473a;color:#FFF;text-align:center;border-radius:5px;padding:15px;margin-top:10px;">ZAMÓW POŻYCZKĘ</a>'+
							'</div></div>';
							}
							else // telefony
							{
								contentString = '<div id="infobox" style="width:"'+window.innerWidth+'px;" >'+
							'<div style="float:none;width:100%;box-sizing:border-box;padding-right:10px;text-align:center">'+
							'<img src="'+member.picture+'" alt="" style="width:60%;height:auto;background:#000;border-radius:5px;" />'+
							'</div><div style="float:none;width:100%;box-sizing:border-box;padding-right:10px;">'+
							'<h3 style="font-size:140%;color:#29BFAF;margin:10px 0 !important;">'+member.name+'</h3>'+
							'<a ng-click="pointInfo(\''+convertToSlug(member.name)+'\','+id+')" style="display:block;background:#DFDFDF;text-align:center;border-radius:5px;padding:10px;margin-top:10px;">SZCZEGÓŁY</a>'+	
							'<a ng-click="confirmUserdata('+id+')" style="display:block;background:#ef473a;text-align:center;border-radius:5px;padding:10px;margin-top:10px;">ZAMÓW POŻYCZKĘ</a>'+
							'</div></div>';
							}
						}
							
						if(member.status==5)
						{
							if(window.innerWidth>430)
							{ 
								contentString = '<div id="infobox" style="width:420px;" >'+
							'<div style="float:left;width:50%;box-sizing:border-box;padding-right:10px;">'+
							'<img src="'+member.picture+'" alt="" style="width:100%;height:auto;background:#000;border-radius:5px;" />'+
							'<a ng-click="pointInfo(\''+convertToSlug(member.name)+'\','+id+')" style="display:block;background:#DFDFDF;text-align:center;border-radius:5px;padding:15px;margin-top:10px;">SZCZEGÓŁY</a>'+
							'</div><div style="float:right;width:50%;box-sizing:border-box;padding-left:10px;">'+
							'<h3 style="font-size:200%;color:#29BFAF;margin:10px 0 !important;">'+member.name+'</h3>'+
							'<dl>'+
							'<dt><b>Adres</b></dt>'+
                            '<dd>' + member.address +'</dd>'+
                            '<dt style="margin-top:8px;"><b>Godziny otwarcia</b></dt>'+
                            '<dd>' + member.open +'</dd>'+
                            '<dt style="margin-top:8px;"><b>Czas oczekiwania</b></dt>'+
                            '<dd>' + member.waittime +' minut</dd>'+
                            '<dt style="margin-top:8px;"><b>Maks. Pożyczka</b></dt>'+
                            '<dd>' + member.maxloan +' PLN</dd>'+
							'</dl>'+
							'<a ng-click="tmobileForm('+id+')" style="display:block;background:#ef473a;color:#FFF;text-align:center;border-radius:5px;padding:15px;margin-top:10px;">ZAMÓW POŻYCZKĘ</a>'+
							'</div></div>';
							}
							else // telefony
							{
								contentString = '<div id="infobox" style="width:"'+window.innerWidth+'px;" >'+
							'<div style="float:none;width:100%;box-sizing:border-box;padding-right:10px;text-align:center">'+
							'<img src="'+member.picture+'" alt="" style="width:60%;height:auto;background:#000;border-radius:5px;" />'+
							'</div><div style="float:none;width:100%;box-sizing:border-box;padding-right:10px;">'+
							'<h3 style="font-size:140%;color:#29BFAF;margin:10px 0 !important;">'+member.name+'</h3>'+
							'<a ng-click="pointInfo(\''+convertToSlug(member.name)+'\','+id+')" style="display:block;background:#DFDFDF;text-align:center;border-radius:5px;padding:10px;margin-top:10px;">SZCZEGÓŁY</a>'+	
							'<a ng-click="tmobileForm('+id+')" style="display:block;background:#ef473a;text-align:center;border-radius:5px;padding:10px;margin-top:10px;">ZAMÓW POŻYCZKĘ</a>'+
							'</div></div>';
							}
						}	
				
				// Replace our Info Window's content and position
				var compiled=$compile(contentString)(scope);
				infowindow.setContent(compiled[0]);
				infowindow.setPosition(pin.position);
				infowindow.open(map);
				google.maps.event.addListener(infowindow, 'closeclick', function() {
					//console.log("map: info windows close listener triggered ");
					infowindow.close();
					$rootScope.$broadcast('PIN_CLOSE');	
					});
				scope.pointId=id;	
				$rootScope.$broadcast('PIN_CLICK', id);	
				
			} 

			function markerCb(marker, member, location) {
				//console.log('markerCb');
			    return function() {
					//console.log("map: marker listener for " + member.name);
					var href="https://maps.apple.com/?q="+member.lat+","+member.lon;
					map.setCenter(location);
					onItemClick(marker, member.id, member.name, member.open, member.city, member.address,member.tel,member.waittime,member.priority,member);
						
					};
				}
				
				

			// update map markers to match scope marker collection
			function updateMarkers( markersparam ) {
				console.log('update markers');
				
				if(typeof(markersparam)!=='undefined' && markersparam.length)
				{
				   scope.markers=markersparam;
				}
				
				if (map && scope.markers) {
					// create new markers
					//console.log("map: make markers ");
					currentMarkers = [];
					
					
					
					var markers = scope.markers;
					if (angular.isString(markers)) markers = scope.$eval(scope.markers);
					for (var i = 0; i < markers.length; i++) {
						var m = markers[i];
					
						var loc = new google.maps.LatLng(m.lat, m.lon);
						
						if(m.type=='me')
						{
							var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, icon:'man.png' });
						}
						else
						{
							//console.log(m);
							if(m.status<=4)
								var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, id: m.id, icon:'img/pin_fines.png' });
							else if	(m.status==5)
								var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, id: m.id, icon:'img/pin_tmobile.png' });
							else if	(m.status==6)
								var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, id: m.id, icon:'img/pin_prometeusz.png' });
							else if	(m.status==7)
								var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, id: m.id, icon:'img/pin_GBS.png' });				
							else
								var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, id: m.id, icon:'img/pin_1.PNG' });
							
							google.maps.event.addListener(mm, 'mousedown', markerCb(mm, m, loc));
							//google.maps.event.addListener(mm, 'touchend', alert('touchend'));
							//google.maps.event.addListener(mm, 'touchend', markerCb(mm, m, loc));
						}
						currentMarkers.push(mm);
						}
					}
			}


			// convert current location to Google maps location
			function getLocation(loc) {
				if (loc == null) return new google.maps.LatLng(40, -73);
				if (angular.isString(loc)) loc = scope.$eval(loc);
				return new google.maps.LatLng(loc.lat, loc.lon);
				}

			} // end of link:
			
			
		}; // end of return
});





function array2json(arr) {
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');

    for(var key in arr) {
    	var value = arr[key];
        if(typeof value == "object") { //Custom handling for arrays
            if(is_list) parts.push(array2json(value)); /* :RECURSION: */
            else parts.push('"' + key + '":' + array2json(value)); /* :RECURSION: */
            //else parts[key] = array2json(value); /* :RECURSION: */
            
        } else {
            var str = "";
            if(!is_list) str = '"' + key + '":';

            //Custom handling for multiple data types
            if(typeof value == "number") str += value; //Numbers
            else if(value === false) str += 'false'; //The booleans
            else if(value === true) str += 'true';
            else str += '"' + value + '"'; //All other things
            // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)

            parts.push(str);
        }
    }
    var json = parts.join(",");
    
    if(is_list) return '[' + json + ']';//Return numerical JSON
    return '{' + json + '}';//Return associative JSON
}