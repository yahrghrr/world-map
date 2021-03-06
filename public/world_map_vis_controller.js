/* jshint esversion: 6 */

define(function (require) {
  let _ = require('lodash');
  //const module = require('ui/modules').get('world_map_vis');      
  var module = require('ui/modules').get('world_map_vis');     
  
  //module.controller('KbnWorldMapVisController', function ($scope, Private) {
  //module.controller('KbnWorldMapVisController', function ($scope) {
  module.controller('WorldMapVisController', function ($scope,Private) {            //necessary
    const tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));
    
    $scope.testValue2 = 500;
    $scope.testValue3 = 300;
    $scope.valueColor = "red";
    
    $scope.iconRed = "https://dl.dropboxusercontent.com/u/2548196/red.png";
    $scope.iconGreen = "https://dl.dropboxusercontent.com/u/2548196/green.png";
    $scope.iconStatus = $scope.iconGreen;
    
    $scope.stateTerengganu = $scope.iconGreen;
    $scope.statePenang = $scope.iconGreen;
    $scope.statePahang = $scope.iconGreen;
    $scope.statePerlis = $scope.iconGreen; 
    $scope.statePerak = $scope.iconGreen;
    $scope.stateSelangor = $scope.iconGreen;
    $scope.stateKL = $scope.iconGreen;
    $scope.stateJohor = $scope.iconGreen;
    $scope.stateMelaka = $scope.iconGreen;
    $scope.stateKedah = $scope.iconGreen;
    $scope.stateSarawak = $scope.iconGreen;
    $scope.stateSabah = $scope.iconGreen;
    $scope.stateKelantan = $scope.iconGreen;
    $scope.stateNegeriSembilan = $scope.iconGreen;
    

    metrics = $scope.metrics = [];

    function isInvalid(val) {
      return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
    }
    
    function getColor(val, visParams) {
      if (!visParams.invertScale) {
        if (val <= visParams.redThreshold) {
          return visParams.redColor;
        }
        else if (val < visParams.greenThreshold) {
          return visParams.yellowColor;
        }
        else {
          return visParams.greenColor;
        }
      }
      else {
          if (val <= visParams.greenThreshold) {
              return visParams.greenColor;
          }
          else if (val < visParams.redThreshold) {
              return visParams.yellowColor;
          }
          else {
              return visParams.redColor;
          }
      }
    }

    $scope.processTableGroups = function (tableGroups) {
      if (tableGroups.tables == null)
          {
            $scope.testValue2 = "blank";
            $scope.testValue3 = "blank";
            $scope.statePahang = $scope.iconGreen;
          }
      
      tableGroups.tables.forEach(function (table) {
        //table.columns.forEach(function (column, i) {
          /* const fieldFormatter = table.aggConfig(column).fieldFormatter();
          let value = table.rows[0][i];
          let formattedValue = isInvalid(value) ? '?' : fieldFormatter(value);
          let color = getColor(value, $scope.vis.params);*/
          
          //test code
          /*if (!angular.equals(table.rows[0][0],"x"))
          {
              $scope.testValue2 = table.rows[0][1];
              $scope.valueColor = "green";
          }*/
          //end test code
          
          //test code
          //$scope.testValue2 = table.rows[column][i];
          //$scope.testValue2 = table.rows[0][i];
          //$scope.testValue3 = table.rows[1][i];
          //$scope.testValue2 = table.rows[0][0];
          //$scope.testValue3 = table.rows[1][0];
          //$scope.testValue2 = table.rows[0].length;
          //$scope.testValue3 = table.rows.length;
        
          var x = 0;
          var y = 0;
          
          if (table.rows.length > 0){
            /*while (x < table.rows.length)
            {
              $scope.testValue2 = table.rows[x][1];
              x++;
            }*/
            for(x=0;x<table.rows.length;x++)
            {
              if (table.rows[x].length>1)
              {
                //$scope.testValue2 = table.rows[x][0];
                //$scope.testValue3 = table.rows[x][1];
                
                if (angular.equals(table.rows[x][0],"Pahang"))
                {
                    //$scope.testValue2 = table.rows[0][1];
                    //$scope.valueColor = "green";
                    //$scope.statePahang = $scope.iconRed;
                    if(table.rows[x][1] < 95){
                      $scope.statePahang = $scope.iconRed;
                    }else{
                      $scope.statePahang = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Penang"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.statePenang = $scope.iconRed;
                    }else{
                      $scope.statePenang = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Johor"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateJohor = $scope.iconRed;
                    }else{
                      $scope.stateJohor = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Kedah"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateKedah = $scope.iconRed;
                    }else{
                      $scope.stateKedah = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Kelantan"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateKelantan = $scope.iconRed;
                    }else{
                      $scope.stateKelantan = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Kuala Lumpur"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateKL = $scope.iconRed;
                    }else{
                      $scope.stateKL = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Putrajaya"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateKL = $scope.iconRed;
                    }else{
                      $scope.stateKL = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Langkawi"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateKedah = $scope.iconRed;
                    }else{
                      $scope.stateKedah = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Melaka"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateMelaka = $scope.iconRed;
                    }else{
                      $scope.stateMelaka = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Negeri Sembilan"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateNegeriSembilan = $scope.iconRed;
                    }else{
                      $scope.stateNegeriSembilan = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Perak"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.statePerak = $scope.iconRed;
                    }else{
                      $scope.statePerak = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Sabah"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateSabah = $scope.iconRed;
                    }else{
                      $scope.stateSabah = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Sarawak"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateSarawak = $scope.iconRed;
                    }else{
                      $scope.stateSarawak = $scope.iconGreen;
                    }
                }
                
                if (angular.equals(table.rows[x][0],"Terengganu"))
                {
                    if(table.rows[x][1] < 95){
                      $scope.stateTerengganu = $scope.iconRed;
                    }else{
                      $scope.stateTerengganu = $scope.iconGreen;
                    }
                }
                
              }
            }
          }
          
                 
          //end test code
          
          //prod code    
          /*
          if (angular.equals(table.rows[i][0],"Los Angeles"))
          {
              //$scope.testValue2 = table.rows[0][1];
              //$scope.valueColor = "green";
              $scope.statePahang = $scope.iconRed;
          }
          
          if (angular.equals(table.rows[i][0],"London"))
          {
              //$scope.testValue2 = table.rows[0][1];
              //$scope.valueColor = "green";
              $scope.stateTerengganu = $scope.iconRed;
          }
          
          if (angular.equals(table.rows[i][0],"San Francisco"))
          {
              //$scope.testValue2 = table.rows[0][1];
              //$scope.valueColor = "green";
              $scope.stateJohor = $scope.iconRed;
          }
          
          if (angular.equals(table.rows[i][0],"New York"))
          {
              //$scope.testValue2 = table.rows[0][1];
              //$scope.valueColor = "green";
              $scope.stateSarawak = $scope.iconRed;
          }
          */
          //end prod code
          
          metrics.push({
            //label: column.title,
            formattedValue: formattedValue,
            color: color,
            testValue3: $scope.testValue3,
            statePenang: $scope.statePenang,
            statePahang: $scope.statePahang
          });
        //});
      });
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      }
    });
  });
});
