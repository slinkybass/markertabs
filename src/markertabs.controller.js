markertabs.controller('MainController', ['$state', '$auth', 'markertabsAPI', 'getErrorAPI', 'SweetAlert',
    function ($state, $auth, getErrorAPI, markertabsAPI, SweetAlert) {
        var vm = this;
        if (!$auth.getPayload()) {
            $state.go('login');
        } else {
            markertabsAPI.getUser($auth.getPayload().sub).then(function (data) {
                vm.loggeduser = data.data;
                $state.go('home');
            }).catch(function (data) {
                SweetAlert.swal("Error!", getErrorAPI(data), "error");
            });
        }
    }
]);
markertabs.controller('LoginController', ['$state', '$auth', 'getErrorAPI', 'SweetAlert',
    function ($state, $auth, getErrorAPI, SweetAlert) {
        var vm = this;
        vm.login = function () {
            $auth.login({
                username: vm.username,
                pass: vm.pass
            }).then(function () {
                $state.go('home');
            }).catch(function (data) {
                SweetAlert.swal("Error!", getErrorAPI(data), "error");
            });
        };
    }
]);
markertabs.controller('HomeController', ['$state', '$auth', 'ngDialog',
    function ($state, $auth, ngDialog) {
        var vm = this;
        vm.openedMenu = false;
        vm.showedHidden = false;
        vm.isHidden = function (isHidden) {
            return vm.showedHidden ? false : (isHidden ? true : false);
        };
        vm.toggleHidden = function () {
            vm.showedHidden = !vm.showedHidden;
            vm.openedMenu = false;
        };
        vm.options = function () {
            ngDialog.open({
                template: 'src/templates/options.tmpl.html',
                className: 'ngdialog-theme-default ngdialog-xl',
                controller: 'OptionsController',
                controllerAs: 'optionsCtrl'
            });
            vm.openedMenu = false;
        };
        vm.toggleFullscreen = function () {
            if (!document.fullscreenElement && // alternative standard method
                !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
            vm.openedMenu = false;
        }
        vm.logout = function () {
            $auth.logout().then(function () {
                vm.openedMenu = false;
                $state.go('login');
            });
        };
    }
]);
markertabs.controller('OptionsController', ['$state', '$auth',
    function ($state, $auth) {
        var vm = this;

    }
]);