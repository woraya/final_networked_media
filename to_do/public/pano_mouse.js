var 	onMouseDownMouseX     = 0, onMouseDownMouseY      = 0;
var   onPointerDownPointerX = 0 , onPointerDownPointerY  = 0;
var lon = 0, onMouseDownLon = 0, lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0;
var   isUserInteracting = false;

function activatePanoControl(){

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'wheel', onDocumentMouseWheel, false );

  camera3D.target = new THREE.Vector3( 0, 0, 0 );
  //camera3D.target = new THREE.Vector3( 0, 0, 0 );



}
function onDocumentMouseDown( event ) {
//  if (event.mouseY > 500){
//  event.preventDefault();
  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;
  onPointerDownLon = lon;
  onPointerDownLat = lat;
  isUserInteracting  = true;
//}
}
function onDocumentMouseMove( event ) {
  if(isUserInteracting ){
    lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
    lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
    computeCameraOrientation();
  }
}
function onDocumentMouseUp( event ) {
  // saveCamera();
  isUserInteracting = false;

  // pressing a key (actually releasing it) changes the texture map
document.onkeyup = function(event){

    panoNumber = (panoNumber + 1) % panoArray.length
    material.map = THREE.ImageUtils.loadTexture(panoArray[panoNumber])

    }
}
function onDocumentMouseWheel( event ) {
  camera3D.fov += event.deltaY * 0.05;
  camera3D.updateProjectionMatrix();
}

function computeCameraOrientation() {

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );
  camera3D.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
  camera3D.target.y = 500 * Math.cos( phi );
  camera3D.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
  camera3D.lookAt( camera3D.target );

}

 function animate() {

            requestAnimationFrame( animate );

            render();
            stats.update();

        }

        function render() {

            camera3D.position.x += ( mouseX - camera3D.position.x ) * 0.50;
            camera3D.position.y += ( - mouseY - camera3D.position.y ) * 0.50;
            camera3D.lookAt( scene.position );

            group.rotation.y -= 0.01;

            renderer.render( scene, camera3D );
        }
