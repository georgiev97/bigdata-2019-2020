var dbEmployee = {
  insert : function(document) {

    if(!document.firstName) {

      print('Property *firstName* is required');
     return; 
    }
    if(!document.lastName) {
      print('Property *lastName* is required')
      return;
    }
    if(!document.address) {
      print('Property *address* is required');
      return;
    }
    if(!document.phone) {
      print('Phone number must be 10 digits');
      return;
    }
    if(!document.email) {
      print('Property *email* is required');
      return;
    }
    if(!document.possition) {
      print('Property *possition* is required');
      return;
    }
    if(!document.department) {
      print('Property *department* is required');
      return;
    }

    db.employee.insert(document);
    db.employee.createIndex( { "email": 1 }, { unique: true } )
  }
};



var dbDepartment = {
  insert : function(document) {

    if(!document.name) {

      print('Property *name* is required');
     return; 
   }
    db.department.insert(document);
  }
};

var dbClientt = {
  insert : function(document) {

    if(!document.firstName) {

      print('Property *firstName* is required');
     return; 
    }
    if(!document.lastName) {
      print('Property *lastName* is required')
      return;
    }
    if(!document.address) {
      print('Property *address* is required');
      return;
    }
    if(!document.phone) {
      print('Phone number must be 10 digits');
      return;
    }
    if(!document.email) {
      print('Property *email* is required');
      return;
    }
    if(!document.account) {
      print('Property *account* is required');
      return;
    }

    db.client.insert(document);
  }
};



var fillEmployeeData = function(firstName,lastName,thirdName,address,phone,email,possition,departmentName,bossName,salary,startDate,
  is_Bulgarian,is_sacked,is_motherhood,is_changedDepartment,is_sick){

  dbEmployee.insert({ 
    firstName: firstName, lastName : lastName, thirdName : thirdName,
    address: address, phone: phone, email : email,
    possition: possition, department: {name:departmentName}, boss: {name: bossName},
    salary: salary, startDate: startDate, is_Bulgarian: is_Bulgarian,
    is_changedDepartment: is_changedDepartment, is_sacked: is_sacked,
    is_motherhood: is_motherhood, is_sick: is_sick
  });

};

fillEmployeeData('Ivan','Ivanov','Ivailov','Plovdiv',0982912341,'ivan.vanio@vanev.com','Support','Support','Pesho',2000, Date('2013-08-07'),
  true,false,false,true,false);

fillEmployeeData('Stefan','Georgiev','Georgiev','Sofia',0881234569,'stefcho@abv.bg','Developer','Developer','Pesho',3000, Date('2012-08-01'),
  true,false,false,true,false);

fillEmployeeData('Maria','Qnkova','Penkova','London',0988921945,'mariakote@gmail.com','Graphic Designer','Design','',2800, Date('2018-01-01'),
  true,false,true,false,false);

fillEmployeeData('John','Snow','','Sofia',0987432155,'johnSnowball@game.com','PM','Management','',5000, Date('2014-04-08'),
  false,false,false,true,false);

fillEmployeeData('Dany','Targaryen','','Varna',0987244123,'dany-sexy@game.com','PO','Management','',6000, Date('2015-07-15'),
  false,true,false,true,false);


var fillDemaprtmentData = function(departmentName,email){

  var employee = db.employee.find({ email : email});
  if (!employee) {
    return;
  }

  dbDepartment.insert({ 
    name: departmentName,
    employeeId: employee[0]._id
  });

};


fillDemaprtmentData('Support','ivan.vanio@vanev.com');
fillDemaprtmentData('Developer','gosheto@abv.bg');
fillDemaprtmentData('Design','mariakote@gmail.com');
fillDemaprtmentData('Management','johnSnowball@game.com');
fillDemaprtmentData('Management','dany-sexy@game.com');


var fillClientData = function(firstName,lastName,thirdName,address,phone,email,iban,amount,currency){

  dbClientt.insert({ 
    firstName: firstName, lastName : lastName, thirdName : thirdName,
    address: address, phone: phone, email : email,
    account: {
      iban: iban,
      amount: amount,
      currency: currency
    }
  });

};

fillClientData('Ivailo','Milkov','Trendafilov','Plovdiv',0987654321,'trendafko@mail.com','BG29IORT80948244427228',25000,'BGN');
fillClientData('Kaloqn','Dimitrov','Toshev','Sofia',0874212031,'kolo@mail.com','BG53IORT80949759751387',50000,'BGN');
fillClientData('Kristian','Angelov','Mihaelov','Burgas',0894321284,'kristian@mail.com','BG10RZBB91557773933457',0,'BGN');
fillClientData('Petq','Dimitrova','Yordanova','Varna',0887543721,'petq@mail.com','BG06RZBB91551768956566',60000,'EUR');
fillClientData('Maria','Georgieva','Stefanova','Veliko Turnovo',0987574732,'maria@mail.com','BG26RZBB91553872349699',10000,'EUR');



db.employee.find().pretty()

// Бизнес заявки част 1
//1. Да се създаде листинг на имената на всички отдели в банката
db.department.find({},{name:1,_id:0}).pretty()

//2. Да се създаде листинга на месечните възнаграждения на всички служители, в листинга е
//необходимо да присъстват двете имена на служителя и неговата заплата
db.employee.find({},{firstName:1,lastName:1,salary:1,_id:0}).pretty()

//3. Да се създаде листинг на всички служители в банката в листинга трябва да присъстват
// двете имена на служителите и новогенерирани E-mail адреси, които да се състоят от
// конкатенирани първото и второ име на служителя разделени с точка. Имената на
// служителите трябва да бъдат с малки букни в мейла. Домейна на компанията е
// bankoftomarow.bg
db.employee.updateMany( {},[{"$set": {email: { "$toLower" : { "$concat": ["$firstName", ".", "$lastName", "@bankoftomarow.bg"]}} }}])
db.employee.find({},{firstName:1,lastName:1,email:1,_id:0}).pretty()

// 4. Намерете всички служители които банката дефинира като старши служители. Старши
// служители са всички които работят в компанията от 5 години.


var number = ISODate().getTime()-1826*1*24*60*60000;
var date = new Date(number);

db.employee.find({startDate:{$lte:date}}).pretty()

// 5. Намерете всички служители чиито първи имена започват с буквата S
db.employee.find({firstName: /^S/}).pretty()


// 6. Намерете всички чуждестранни служители. Чуждестранни са тези служители които не са
// родени в България.
db.employee.find({is_Bulgarian:false}).pretty()

// 7. Намерете всички служители чиите имена (първо / второ или допълнително съдържат
// буквата l)
db.employee.find({ $or : [ { firstName : /l/ }, {lastName: /l/ }, {thirdName: /l/} ] }).pretty()



// Бизнес заявки част 2
// 2. Да се рализират листинг на служителите, които са работили в повече от един отдел в
// рамките на последните два месеца
db.employee.find({ is_changedDepartment : true}).pretty()

// 3. Да се реализира листинг на служителите които са работили само в един отдел откакто са
// част от структурата на компанията.
db.employee.find({is_changedDepartment:false}).pretty()



// Бизнес заявки част 3

// 1. Да се реализира листинг показващ всички служители които са били уволнени от
// компанията
db.employee.find({is_sacked:true}).pretty()

// 2. Да се реализира листинг на всички служителки които са в майчинство в момента.
db.employee.find({is_motherhood:true}).pretty()

// 3. Да се реализира листинг на всички служители които са в отпуска / болничен в момента 
db.employee.find({is_sick:true}).pretty()

// 4. Намерете всички служитери които имат заплата в интервала 2000 – 3000
db.employee.find({ salary : { $gte :  2000, $lte : 3000}}).pretty()

// 5. Намерете всички служители които получават съответно 2500 / 3000 / 3500 / 5000
db.employee.find({salary:2500}).pretty()
db.employee.find({salary:3000}).pretty()
db.employee.find({salary:3500}).pretty()
db.employee.find({salary:5000}).pretty()

// 6. Намерете всички служители които нямат ръководител
db.employee.find({boss : {name:''}}).pretty()

// 7. Намерете всички старши служители които получават заплата по висока от 5000 лв.
// Подредете ги в обратен азбучен ред, като се има предвид тяхното първо име. 

var number = ISODate().getTime()-1826*1*24*60*60000;
var date = new Date(number);
db.employee.find({$and:[{ salary : { $gte :  5000}},{startDate:{$lte:date}} ]}).sort({firstName:-1}).pretty()


// Бизнес заявки част 4

// 1. Да се намерят всички клиенти които имат сметки във валута. ( различна от BGN )
db.client.find({'account.currency':{ $ne: 'BGN'} }).pretty()

// 2. Да се намерят всички клиенти които имат сметки с нулево парично салдо. Напълно празни. 
db.client.find({'account.amount' : {$lte : 0} }).pretty()

// 3. Да се добави название на сметката на всеки клиент. Названието на сметката му, е името на
// клиента последвано от думата сметка и валутата на сметката. Актуализирайте всички
// клиенти
db.client.updateMany( {},[{"$set": {name: { "$concat": ["$firstName", "Account", "$account.currency"]}}}])
db.client.find().pretty()