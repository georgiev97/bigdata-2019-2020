use stu_1601321008

// Задача 1
var dbVehicle = {
    insert : function(document) {
  
      if(!document.identifier) {
        print('Property *identifier* is required');
       return; 
      }
      if(!document.model) {
        print('Property *model* is required')
        return;
      }
      if(document.seats<2) {
        print('Min capacity of seats is 2')
        return;
      }
      db.vehicle.insert(document);
    }
  };

  var fillVehicleData = function(identifier,model,seats){
  
    dbVehicle.insert({ 
      identifier: identifier, model : model, seats: seats
    });
  
  };
  
  fillVehicleData(12345678,'BMW',4);
  fillVehicleData(76532141,'VW',6);
  fillVehicleData(56439801,'Volvo',4);
  fillVehicleData(98127634,'Mazda',2);
  fillVehicleData(12345672,'Audi',5);

  db.vehicle.find().pretty()

//   Задача 2
fillVehicleData(76542123,'Ford',4);
fillVehicleData(90807054,'BMW',1);

// Задача 3
var dbCargo = {
    insert : function(document) {
  
      if(!document.name) {
  
        print('Property *name* is required');
       return; 
      }
      if(!document.category) {
        print('Property *category* is required')
        return;
      }
      if(document.category=="fruits" || document.category=="vegetables" || document.category=="meat" || document.category=="milk and dairy"){
          print("Move to Priority Cargo");
          db.priorityCargo.insert(document);
          return;
      }
      if(!document.kg && document.kg<0) {
        print('Property *kg* is required')
        return;
      }
      db.cargo.insert(document);
    }
  };


var fillCargoData = function(name,category,kg,identifier){

    var vehicle = db.vehicle.find({ identifier : identifier});
    if (!vehicle) {
      return;
    }
  
    dbCargo.insert({ 
      name: name,
      category: category,
      kg: kg,
      vehicleId: vehicle[0]._id
    });
  };
  

fillCargoData("Banana","Fruits",500,12345678);

db.cargo.find().pretty()
  
// Задача 4
var showCargoPerVehicle = function() {

    db.vehicle.find().forEach(function(vehicleCargo) {
  
      var cargoElement = db.cargo.find({ vehicleId : vehicleCargo.identifier}).toArray();
  
      vehicleCargo.cargo_elements = cargoElement;
  
      db.cargoPerVehicle.insert(vehicleCargo);
    });
  }

db.cargoPerVehicle.find().pretty()

// Задача 5
var dbPriorityCargo = {
    insert : function(document) {
  
      if(!document.name) {
  
        print('Property *name* is required');
       return; 
      }
      if(!document.category) {
        print('Property *category* is required')
        return;
      }
      if(!document.kg && document.kg<0) {
        print('Property *kg* is required')
        return;
      }
      db.priorityCargo.insert(document);
    }
  };

  var fillPriorityCargoData = function(name,category,kg,identifier){

    var vehicle = db.vehicle.find({ identifier : identifier});
    if (!vehicle) {
      return;
    }
  
    dbCargo.insert({ 
      name: name,
      category: category,
      kg: kg,
      vehicleId: vehicle[0]._id
    });
  };

  
db.priorityCargo.find().pretty()
db.cargo.find().pretty()







  
  