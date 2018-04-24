export function FileUploadDirective($parse) {
    'ngInject'
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                //console.log($parse(attrs["ngModel"]));
                //attrs.ngModel = files[0].name;
                //console.log(attrs["ngModel"]);
                //console.log(files[0].size);
                var modelGetter = $parse(attrs['ngModel']);
                console.log(modelGetter(scope));

                // This returns a function that lets us set the value of the ng-model binding expression:
                var modelSetter = modelGetter.assign;

                // This is how you can use it to set the value 'bar' on the given scope.
                modelSetter(scope, files[0].name);

                console.log(modelGetter(scope));
            });
        }
    }
}