

	var container;

	var camera, scene, renderer;

	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;


	init();
	animate();


	function init() {

		container = document.createElement( 'div' );
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 0;

		// scene

		scene = new THREE.Scene();
		fogColor = new THREE.Color(0x000000);

scene.background = fogColor;
scene.fog = new THREE.Fog(fogColor, 2500, 5000);


		var ambientLight = new THREE.AmbientLight( 0xC40CE8, 0.5 );
		//scene.add( ambientLight );

		var pointLight = new THREE.PointLight( 0x29C7D5, 2 );
		camera.add( pointLight );
		scene.add( camera );

		// texture

		var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {

			console.log( item, loaded, total );

		};

						// Material
		firstChildMaterial = new THREE.MeshLambertMaterial({
		wireframe: true,
	});


		// model

		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) {
		};

		var loader = new THREE.OBJLoader( manager );
		loader.load( 'Jimmy.obj', function ( object ) {

			object.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					child.material = firstChildMaterial;

				}

			} )
			//object.scale.set(3,3,3);
			object.position.z = -39;
			object.position.y = -14;
			scene.add( object );
			object.scale.set(3.30955818181818, 3.30955818181818, 3.30955818181818);
			window.addEventListener('mousemove', function(e){
	var mouse3D = new THREE.Vector3(
		( event.clientX / window.innerWidth ) * 30 - 15,
		- ( event.clientY / window.innerHeight ) * 30 + 10, );

	object.lookAt(mouse3D);
	})


		}, onProgress, onError );



		//

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		//

		window.addEventListener( 'resize', onWindowResize, false );

	}


	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function onDocumentMouseMove( event ) {

		mouseX = ( event.clientX - windowHalfX ) / 2;
		mouseY = ( event.clientY - windowHalfY ) / 2;



	}

	//

	function animate() {

		requestAnimationFrame( animate );
		render();

	}


	function render() {

		camera.lookAt( scene.position );

		renderer.render( scene, camera );

	}
