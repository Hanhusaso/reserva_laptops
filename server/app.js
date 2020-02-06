const express = require('express');
const app = express();
const mqtt = require('mqtt');

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    
    socket.on('ENVIAR_RESERVA', function(data) {
        io.emit('MENSAJE_RESERVA', data)
        lockedDatosMqtt(data.id_laptop);
    });

    socket.on('LIBERAR_RESERVA', function(data) {
        io.emit('MENSAJE_LIBERAR', data)
        unlockedDatosMqtt(data.id_laptop);
    });

    socket.on('ENVIAR_ALUMNO',function(data){
        io.emit('AGREGAR_ALUMNO',data)

    });

    socket.on('LIBERAR_ALUMNO',function(data){
        io.emit('CAMBIAR_ALUMNO',data)
    });
});

//Credenciales MQTT
const options = {
    port:1883,
    host:'http://iotnerds.ga/',
    clientId:'acces_control_server_'+Math.round(Math.random() * (0- 1000)* -1 ),
    username:'admin',
    password:'public',
    keepalive:60,
    reconnectPeriod:1000,
    protocolId:'MQIsdp',
    protocolVersion:3,
    clean:true,
    encoding:'utf8'
};

var client = mqtt.connect("mqtt://iotnerds.ga",options);

//Se realiza la conexion
client.on('connect', function(){
      console.log("Conexion MQTT exitosa")
      client.subscribe('unlocked', function(err){
          console.log("Subscripcion exitosa en unlocked")
      });
})



//Envio de mensaje 
function unlockedDatosMqtt(dato){
    client.subscribe('unlocked', function (err) {
        if (!err) {
            client.publish('unlocked', dato)
            //console.log("Mensaje enviado")
        }
    })
}
function lockedDatosMqtt(dato){
    client.subscribe('locked', function (err) {
        if (!err) {
            client.publish('locked', dato)
            //console.log("Mensaje enviado")
        }
    })
}
function disconnectedMqtt(dato){
    client.subscribe('disconnected', function (err) {
        if (!err) {
            client.publish('disconnected', dato)
            //console.log("Mensaje enviado")
        }
    })
}

// function recibirDatos(){
//     var mensajes = [];
//     client.on('message', function(topic,message){
//         mensajes.push(message.toString());
//         io.sockets.emit('cargar_datos',mensajes);  
//         console.log("se envio al frontend")  
//     })
// }