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
    
    $scope.statePenang = "Penang";
    $scope.statePahang = "Pahang";
    $scope.statePerlis = "Perlis";
    $scope.statePerak = "Perak";
    $scope.stateSelangor = "Selangor";
    $scope.stateKL = "KL";
    $scope.stateJohor = "Johor";
    $scope.stateTerengganu = "Terengganu";
    $scope.stateKelantan = "Kelantan";
    $scope.stateSarawak = "Sarawak";
    $scope.stateSabah = "Sabah";
    $scope.stateMelaka = "Melaka";
    $scope.stateKedah = "Kedah";
    $scope.stateNegeriSembilan = "Negeri Sembilan";

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
          if (angular.equals(table.rows[0][0],"New York"))
          {
              $scope.testValue2 = table.rows[0][1];
              //$scope.valueColor = "green";
          }
          //end test code
          
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
