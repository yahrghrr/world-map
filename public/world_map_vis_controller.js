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
      tableGroups.tables.forEach(function (table) {
        table.columns.forEach(function (column, i) {
          const fieldFormatter = table.aggConfig(column).fieldFormatter();
          let value = table.rows[0][i];
          let formattedValue = isInvalid(value) ? '?' : fieldFormatter(value);
          let color = getColor(value, $scope.vis.params);
          //$scope.statePerlis = table.rows[0][i];
          
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
          $scope.testValue2 = table.rows[0].length;
          $scope.testValue3 = table.rows.length;
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
            label: column.title,
            formattedValue: formattedValue,
            color: color,
            testValue3: $scope.testValue3,
            statePenang: $scope.statePenang,
            statePahang: $scope.statePahang
          });
        });
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
