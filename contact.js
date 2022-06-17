
 
  var module =angular.module('myApp', [])
	module.controller('ContactController', ['$scope','$http','$timeout', function ($scope,$http,$timeout) {

    var uid = 0;
    $scope.contacts = [ ];
     
	  $scope.GetContactList = function () {
		  //Getting ContactList from API
		   $http.get("https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts")
			.then(function(response) {
				$scope.contacts = response.data;
				uid=$scope.contacts.length;
			});			
	  }
	  //Load ContactList on PageLoad
	$scope.GetContactList();		
			   
			   
    $scope.saveContact = function() {
		
        if(!$scope.ContactForm.$invalid)
		{		
			//if(newcontact.firstName=="" || newcontact.phone)
			if($scope.newcontact.id == null) {
				//if this is new contact
				$scope.newcontact.id = ++uid;
				$scope.contacts.push($scope.newcontact);
				$scope.lblmsg = 'Contact Add Successfully.';	
			} 
			//For Update the Existing contacts
			else {
				for(i in $scope.contacts) {
					if($scope.contacts[i].id == $scope.newcontact.id) {
					$scope.contacts[i] = $scope.newcontact;
					}
				} 
			$scope.lblmsg = 'Contact Update Successfully.';				
			}
			$scope.newcontact = {};// this will clear the form			
		}
		$scope.Msg();
    }
	     
    $scope.delete = function(id) {		
        //search contact with given id and delete it
        for(i in $scope.contacts) {
            if($scope.contacts[i].id == id) {
                $scope.contacts.splice(i,1);
                $scope.newcontact = {};
            }
        }
		$scope.lblmsg = 'Contact Deleted.';	
        $scope.Msg();
    }
     
    $scope.edit = function(id) {
    //search contact with given id and update it
        for(i in $scope.contacts) {
            if($scope.contacts[i].id == id) {
                //we use angular.copy() method to create 
                //copy of originial object
                $scope.newcontact = angular.copy($scope.contacts[i]);
            }
        }
    }
	
	$scope.Msg = function() {
		//display message
				$timeout(function () {
				  $scope.lblmsg = '';
				}, 5000);
			}
 }]);