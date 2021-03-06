app.directive('modelUndefined', function(){
  return {
    require: 'ngModel',
    link: function(scope,elm,attrs,ngModel){
      ngModel.$parsers.push(function(val){
         return val === null ? undefined : val;
      });
    }
  }
});
