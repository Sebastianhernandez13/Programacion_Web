var firebaseConfig = {
    apiKey: "AIzaSyAyIULhdSAYQWA4NPu49cx6c0WgmfEDfH0",
    authDomain: "javascript-y-firebase.firebaseapp.com",
    databaseURL: "https://javascript-y-firebase-default-rtdb.firebaseio.com",
    projectId: "javascript-y-firebase",
    storageBucket: "javascript-y-firebase.appspot.com",
    messagingSenderId: "172022073363",
    appId: "1:172022073363:web:7b5a55355a2cfadaba17e6",
    measurementId: "G-BGM2X7L3PD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").Value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='Selecciona Origen';
    document.getElementById("Input6").value='Selecciona Destino';
    document.getElementById("Input7").Value='dd/mm/aaaa --:-- -----';
    document.getElementById("Input8").Value='dd/mm/aaaa --:-- -----';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var NumID = document.getElementById("Input1").value;
    var Nombre = document.getElementById("Input2").value;
    var Apellido = document.getElementById("Input3").value;
    var CorreoElec = document.getElementById("Input4").value;
    var VueOrigen = document.getElementById("Input5").value;
    var VueDestino = document.getElementById("Input6").value;
    var FechaHoraSalida = document.getElementById("Input7").value;
    var FechaHoraRegreso = document.getElementById("Input8").value;

    //validaciones
    if (NumID.length > 0) {
        //creo un objeto que guarda los datos
        var DatosCliente = {
            NumID, //id
            Nombre,
            Apellido,
            CorreoElec,
            VueOrigen,
            VueDestino,
            FechaHoraSalida,
            FechaHoraRegreso,
        }

        //console.log(DatosCliente);

        firebase.database().ref('BoletosAvion/' + NumID).update(DatosCliente).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "¡Agregado correctamente!", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('BoletosAvion').push().key;
    //data[`BoletosAvion/${key}`]= DatosCliente;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('BoletosAvion');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(DatosCliente){
    
    if(DatosCliente!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);

        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = DatosCliente.NumID;
        cell2.innerHTML = DatosCliente.Nombre;
        cell3.innerHTML = DatosCliente.Apellido; 
        cell4.innerHTML = DatosCliente.CorreoElec;
        cell5.innerHTML = DatosCliente.VueOrigen;
        cell6.innerHTML = DatosCliente.VueDestino;
        cell7.innerHTML = DatosCliente.FechaHoraSalida;
        cell8.innerHTML = DatosCliente.FechaHoraRegreso;
        cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${DatosCliente.NumID})">Eliminar</button>`;
        cell10.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+DatosCliente.NumID+')">Modificar</button>';
    }
}

function deleteR(NumID){
    firebase.database().ref('BoletosAvion/' + NumID).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "¡Eliminado Correctamente!", "success");
    });
}

function seekR(NumID){
    var ref = firebase.database().ref('BoletosAvion/' + NumID);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(DatosCliente){
    if(DatosCliente!=null)
    {
        document.getElementById("Input1").value=DatosCliente.NumID;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=DatosCliente.Nombre;
        document.getElementById("Input3").value=DatosCliente.Apellido;
        document.getElementById("Input4").value=DatosCliente.CorreoElec;
        document.getElementById("Input5").value=DatosCliente.VueOrigen;
        document.getElementById("Input6").value=DatosCliente.VueDestino;
        document.getElementById("Input7").value=DatosCliente.FechaHoraSalida;
        document.getElementById("Input8").value=DatosCliente.FechaHoraRegreso;
    }
}


//Para consulta de Vuelo Origen
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("BoletosAvion");
    ref.orderByChild("VueOrigen").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(DatosCliente){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = DatosCliente.NumID;
    cell2.innerHTML = DatosCliente.Nombre; 
    cell3.innerHTML = DatosCliente.Apellido;
    cell4.innerHTML = DatosCliente.CorreoElec; 
    cell5.innerHTML = DatosCliente.VueOrigen; 
    cell6.innerHTML = DatosCliente.VueDestino;
    cell7.innerHTML = DatosCliente.FechaHoraSalida;
    cell8.innerHTML = DatosCliente.FechaHoraRegreso;
}