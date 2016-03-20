/**
 * Created by Aditya on 2/28/2016.
 */
var app = angular.module('todoApp');

var BASE_URL = "http://localhost:3000/";

app.service("todosService", function ($http) {
    // get all todos
    this.getAllTodos = function() {
        return $http.get(BASE_URL + "todos");
    };

    // get todo for id
    this.getTodo = function(id) {
        return $http.get(BASE_URL + "todos/" + id);
    };

    // add new todo
    this.addTodo = function(todo) {
        return $http.post(BASE_URL + "todos", todo);
    };

    // update todo
    this.updateTodo = function(todo, id) {
        return $http.put(BASE_URL + "todos/" + id, todo);
    };

    // delete todo
    this.deleteTodo = function(id) {
      return $http.delete(BASE_URL + "todos/" + id);
    };
    this.deleteAll = function() {
        return $http.delete(BASE_URL + "todos" );
    };
    this.deleteCompleted = function() {
        return $http.delete(BASE_URL +"clearCompleted" );
    };

});