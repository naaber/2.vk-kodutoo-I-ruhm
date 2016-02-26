(function(){
  "use strict";

  var Meelespea = function(){
    if(Meelespea.instance){
      return Meelespea.instance;
    }
    Meelespea.instance = this;

    this.clock_year = document.querySelector("#clock_year");
    this.clock_month = document.querySelector("#clock_month");
    this.clock_date = document.querySelector("#clock_date");
    this.clock_day = document.querySelector("#clock_day");
    this.clock_hour = document.querySelector("#clock_hour");
    this.clock_minute = document.querySelector("#clock_minute");
    this.clock_second = document.querySelector("#clock_second");

    this.routes = Meelespea.routes;
    this.currentRoute = null;
    this.init();
  };

  window.Meelespea = Meelespea;

  Meelespea.routes = {
    'home-view': {
      'render': function(){}
    },
    'insert-view': {
      'render': function(){}
    },
    'list-view': {
      'render': function(){}
    }
  };

  Meelespea.prototype = {

    init: function(){

      this.writeTime();
      window.setInterval(this.writeTime.bind(this), 1000);

      window.addEventListener('hashchange', this.routeChange.bind(this));

      if(!window.location.hash){
        window.location.hash = 'home-view';
      }else{
        this.routeChange();
      }

    },

    writeTime: function(){

      clock_year.innerHTML = "";
      clock_month.innerHTML = "";
      clock_date.innerHTML = "";
      clock_hour.innerHTML = "";
      clock_minute.innerHTML = "";
      clock_second.innerHTML = "";

      for(var i = 1; i < 13; i++){
        if(i%2 === 0){
          clock_month.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_month") + "<br>";
        }else{
          clock_month.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_month");
        }
      }

      for(i = 1; i < 37; i++){
        if(i > 31){
          clock_date.innerHTML += "00";
        }else if(i%6 === 0){
          clock_date.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_date") + "<br>";
        }else{
          clock_date.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_date");
        }
      }

      for(i = 1; i < 25; i++){
        if(i === 24){
          clock_year.innerHTML += this.showCurrentTime(2024, "select_year");
          clock_hour.innerHTML += this.showCurrentTime(this.setZeroBefore(0), "select_hour");
        }else if(i%4 === 0){
          clock_year.innerHTML += this.showCurrentTime(i + 2000, "select_year") + "<br>";
          clock_hour.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_hour") + "<br>";
        }else{
          clock_year.innerHTML += this.showCurrentTime(i + 2000, "select_year");
          clock_hour.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_hour");
        }
      }

      for(i = 1; i < 61; i++){
        if(i === 60){
          clock_minute.innerHTML += this.showCurrentTime(this.setZeroBefore(0), "select_minute");
          clock_second.innerHTML += this.showCurrentTime(this.setZeroBefore(0), "select_second");
        }else if(i%10 === 0){
          clock_minute.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_minute") + "<br>";
          clock_second.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_second") + "<br>";
        }else{
          clock_minute.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_minute");
          clock_second.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_second");
        }
      }
    },

    showCurrentTime: function(number, format){

      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var date = today.getDate();
      var day = today.getDay();
      var hour = today.getHours();
      var minute = today.getMinutes();
      var second = today.getSeconds();

      if(format === "select_year" && number === year){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_month" && number === this.setZeroBefore(month)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_date" && number === this.setZeroBefore(date)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_hour" && number === this.setZeroBefore(hour)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_minute" && number === this.setZeroBefore(minute)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_second" && number === this.setZeroBefore(second)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }
      return number;
    },

    setZeroBefore: function(number){
      if(number < 10){
        number = '0' + number;
      }
      return number;
    },

    routeChange: function(){
      this.currentRoute = location.hash.slice(1);
      if(this.routes[this.currentRoute]){
        this.updateMenu();
        this.routes[this.currentRoute].render();
      }
    },

    updateMenu: function(){
       document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');
       document.querySelector('.'+this.currentRoute).className += ' active-menu';
    }

  };

  window.onload = function(){
    var app = new Meelespea();
  };

})();