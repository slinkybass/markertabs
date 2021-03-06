angular.module('app')
    .factory('markertabsAPI', ['$q', '$http', 'urlBackend',
        function ($q, $http, urlBackend) {

            markertabsAPI = {};

            /** ====================== API CALLING ===================== **/
            markertabsAPI.api = function (endpoint, postdata, getdata, method) {
                getdata = getdata ? getdata : {};
                var defered = $q.defer();
                $http({
                    url: urlBackend + endpoint,
                    data: postdata,
                    params: getdata,
                    method: method ? method : 'GET',
                    withCredentials: true
                }).then(function successCallback(response) {
                    if (response.status === 200) {
                        defered.resolve(response.data);
                    } else {
                        defered.reject(response);
                    }
                }, function errorCallback(response) {
                    defered.reject(response);
                });
                return defered.promise;
            };

            markertabsAPI.getUser = function (id) {
                return markertabsAPI.api('/user/get/' + id);
            };
            markertabsAPI.verify = function (postdata) {
                return markertabsAPI.api('/user/verify', postdata, null, 'POST');
            };
            markertabsAPI.orderTab = function (id, postdata) {
                return markertabsAPI.api('/tab/order/' + id, postdata, null, 'POST');
            };
            markertabsAPI.orderLink = function (id, postdata) {
                return markertabsAPI.api('/link/order/' + id, postdata, null, 'POST');
            };

            return markertabsAPI;
        }
    ]);