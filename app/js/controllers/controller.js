var app = angular.module("todoApp");

app.controller("listController", function ($scope, $location, $mdDialog ,  todosService) {




    $scope.showSearch = false;
    $scope.close = false ;
    $scope.show = function(){
        $scope.close = true ;

    };
    $scope.hide = function(){
        $scope.close = false ;

    };

    // initialize
    $scope.init = function () {
        todosService.getAllTodos().success(function (todos) {
            // success
            console.log("All Todos: " + angular.toJson(todos));
            $scope.todos = todos;
        }).error(function () {
            // error
        });

    };
    $scope.deleteAll= function (ev){
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to clear all the tasks?')
            .targetEvent(ev)
            .ok('Clear All')
            .cancel('cancel');
        $mdDialog.show(confirm).then(function() {
            todosService.deleteAll().success(function (response) {
                console.log(response);
                $scope.init();
            }).error(function (e) {
                console.log(e);
            });
        });




    };

    $scope.deleteCompleted= function (ev){
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to clear all the completed tasks?')
            .targetEvent(ev)
            .ok('Clear All')
            .cancel('cancel');
        $mdDialog.show(confirm).then(function() {
            todosService.deleteCompleted().success(function (response) {
                console.log(response);
                $scope.init();
            }).error(function (e) {
                console.log(e);
            });
        });

    };

    // update task
    $scope.updateTask = function (id) {
        $location.path('/task/' + id);
    };

    // delete task
    $scope.deleteTask = function (id) {
        todosService.deleteTodo(id).success(function(response) {
            console.log(response);
            $scope.init();
        }).error(function(e) {
            console.log(e);
        });
    };

    // update status
    $scope.updateStatus = function (task, status) {
        task.status = status;
        // Update
        todosService.updateTodo(task, task._id).success(function(response) {
            console.log(response);
        }).error(function(e) {
            console.log(e);
        });
    };

});

app.controller("taskController", function ($scope, $location, $routeParams, todosService) {

    console.log("ID: " + $routeParams.taskId);
    var id = $routeParams.taskId;

    if (id == 0) {
        // Add new
        $scope.task = {};
        $scope.add= true ;
        $scope.update = false;
    } else {
        // Update
        $scope.add= false ;
        $scope.update = true;
        todosService.getTodo(id).success(function(response) {
            console.log(response);
            $scope.task = response;
        }).error(function(e) {
            console.log(e);
        });
    }

    $scope.saveTask = function (task) {
        if (id == 0) {
            // Add
            task.addedOn = Date.now();
            todosService.addTodo(task).success(function(response) {
                console.log(response);
                // go to home
                $location.path('/');
            }).error(function(e) {
                console.log(e);
            });
        } else {
            // Update
            todosService.updateTodo(task, id).success(function(response) {
                console.log(response);
                // go to home
                $location.path('/');
            }).error(function(e) {
                console.log(e);
            });
        }
        console.log("TASK: " + angular.toJson(task));
    };

    $scope.cancel = function () {
        // go to home
        $location.path('/');
    };
});