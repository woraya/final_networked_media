var selectedElement;
var numberOfElements = 0;
var dragging = false;
var allElements = [];
var name_field;
var scene_field;
var sceneNum = 1;
var people;
var texture;
var material;
// var manualControl = false;


var apiKey = "RQ0-gkCuvL1jAAElJjap5DlSnNe6QbaY";
var db = "osc";
var coll = "osc_settings";
var camera3D;                        //be careful because p5.js might have something named camera
var scene ;                          //be careful because our sketch has something named scene
var renderer ;
var cube3D;

// backgrounds textures
// var panoArray   = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
var panoArray   = ["01.jpg"];
var panoNumber  = Math.floor(Math.random()*panoArray.length);


function setup(){
  htmlInterface();
  // listOfUsers();
  getScene();
  setUp3D();
  activatePanoControl();
}

function htmlInterface(){
  //moved most of these out into html file instead of creating them in p5js
  name_field = $("#name");
  name_field.val("Mint");
  scene_field = $("#sceneNum");
  scene_field.val(sceneNum);
  $("#previous").click(previous);
  $("#next").click(next);
}

function setUp3D(){
  scene = new THREE.Scene();
  camera3D = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000 );
  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true
  });
  renderer.setSize( 600, 400 );
  document.getElementById( 'container' ).appendChild( renderer.domElement );
  camera3D.position.z = 5;
  //create a sphere to put the panoramic video on
  var geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.scale( - 1, 1, 1 );
  material = new THREE.MeshBasicMaterial( {
    map: new THREE.TextureLoader().load(panoArray[panoNumber])
  } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
}

function draw(){                          //there is a more official way to do this in three js
  renderer.render(scene, camera3D);
}

function previous(){
  saveCamera();
  sceneNum = max(1,sceneNum -1);
  scene_field.val(sceneNum);
  getScene()
}

function next(){
  saveCamera();
  sceneNum++;
  scene_field.val(sceneNum);
  getScene()
}

// ==========================================================

function keyPressed(){
  //opportunity for you to change the background?
}


// ==========================================================

function saveCamera(){
  var dataUrl = renderer.domElement.toDataURL("image/png");
  // console.log(dataUrl);

  var myName =  name_field.val() ;
  var thisElementArray = {}; //make an array for sending
  thisElementArray.owner = myName;
  thisElementArray.type = "camera"
  thisElementArray.scene = sceneNum ;
  thisElementArray.material = panoArray[panoNumber];
  thisElementArray.camera = camera3D.matrix.toArray();
  thisElementArray.cameraFOV = camera3D.fov; //camera3D.fov;
  thisElementArray.dataUrl = dataUrl;
  var data = JSON.stringify(thisElementArray ) ;

  var query =  "q=" + JSON.stringify({type:"camera", material:panoArray[panoNumber], scene:sceneNum}) + "&";
  $.ajax( { url: "https://api.mlab.com/api/1/databases/"+ db +"/collections/"+coll+"/?" +  query + "u=true&apiKey=" + apiKey,
  data: data,
  type: "PUT",
  contentType: "application/json",
  success: function(data){
    console.log("saved camera" );
    console.log('mememememememe');

    $.ajax({
      method: 'GET',
      url: '/saved',
      success: function(res){
        console.log('fucking secondddd ajax')
        console.log(res.dataUrl);

        var image = new Image();
        image.src = res.dataUrl;
        image.style.width = '300px'
        image.style.height = '200px'
        document.getElementById('image').appendChild(image);
        // document.getElementById
      },
      error: function (err){
        //alert(err);
         console.log("err", err)
      }
    })
  },
  // failure: function(data){  console.log("didn't savecamera" );}
});
}



function getScene(){

  //get all the info for this user and this scene
  var myName = name_field.val() ;
  var query = JSON.stringify({owner:myName, material:panoArray[panoNumber], scene:sceneNum});

  $.ajax( { url: "https://api.mlab.com/api/1/databases/"+ db +"/collections/"+coll+"/?q=" + query +"&apiKey=" + apiKey,
  type: "GET",
  success: function (data){  //create the select ui element based on what came back from db
    $.each(data, function(index,obj){
      if(obj.type == "camera"){
        camera3D.matrix.fromArray(obj.camera); // set the camera using saved camera settings
        camera3D.matrix.decompose(camera3D.position,camera3D.quaternion,camera3D.scale);
        camera3D.fov = obj.cameraFOV;
        camera3D.updateProjectionMatrix();
      }else{
        //we will worry about elements next week
        //newElement(obj._id,obj.src,obj.x,obj.y,obj.width,obj.height);
      }
    })
  },
  contentType: "application/json" } );
}




// function listOfUsers(){
//   $.ajax( { url: "https://api.mlab.com/api/1/databases/"+ db + "/runCommand?apiKey=" + apiKey,
//   data: JSON.stringify( {"distinct": coll,"key": "owner"} ),
//   type: "POST",
//   contentType: "application/json",
//   success: function(msg) {
//     var allPeople =  msg.values;
//     for(var i = 0; i < allPeople.length; i++){
//       $("#other_people").append('<option>'+allPeople[i]+'</option>');
//     }
//     $("#other_people").change(pickedNewPerson);
//   } } )
// }


// function pickedNewPerson() {
//   var newName= $("#other_people").val();
//   name_field.val(newName);
//   sceneNum = 1;
//   getScene();
// }
