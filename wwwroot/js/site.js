let progressBar;
let isActiveNotification = false;

function takePictureWay() {
	window.location.href = '/Photo';
}

function screenshotWay() {
	window.location.href = '/Screen';
}

function forward() {
	const diyas = document.querySelectorAll('.diya');

	diyas.forEach((diya) => {
		if (diya.classList.contains('zero')) {
			diya.classList.remove('zero');
			diya.classList.add('hundred');
		} else if (diya.classList.contains('hundred')) {
			diya.classList.remove('hundred');
			diya.classList.add('two-hundred');
		} else if (diya.classList.contains('two-hundred')) {
			diya.classList.remove('two-hundred');
			diya.classList.add('zero');
		}
	});
}

function backward() {
	const diyas = document.querySelectorAll('.diya');

	diyas.forEach((diya) => {
		if (diya.classList.contains('zero')) {
			diya.classList.remove('zero');
			diya.classList.add('two-hundred');
		} else if (diya.classList.contains('hundred')) {
			diya.classList.remove('hundred');
			diya.classList.add('zero');
		} else if (diya.classList.contains('two-hundred')) {
			diya.classList.remove('two-hundred');
			diya.classList.add('hundred');
		}
	});
}
function choosePhoto() {
	document.getElementById('photo-input').click();
}
function rechoosePhoto() {
	let counter = 0;

	for (let i = 1; i < 6; i++) {
		let info = document.getElementById(`info${i}`);
		if (info.style.display == "none") {
			console.log(`info${i}fail`);
			break

		} else {
			counter++;
			console.log(`info${i}success`);
		}
	}
	if (counter == 5) {
		document.getElementById('photo-input').click();
	} else {
		const notification = document.getElementById("notification");
		const notificationContent = document.getElementById("notification-content");
		if (!isActiveNotification) {
			isActiveNotification = true;
			notification.style.display = "block";
			setTimeout(() => {
				notification.classList.add("show");
				notificationContent.innerHTML = "Завершіть редагування!";
			}, 10);
			setTimeout(() => {
				closeNotification();
			}, 3000);
		}
	}
}

function loadPhoto(event) {
	var file = event.target.files[0];

	if (file) {
		var formData = new FormData();
		formData.append('image', file);

		fetch('/Screen', {
			method: 'POST',
			body: formData
		})
			.then(response => {
				if (response.status === 200) {
					window.location.href = '/ScreenForm';
				} else {
					console.error('Ошибка fetch');
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}
}

function dropdownAction() {
	let welcomePage = document.getElementById("welcome-page");

	welcomePage.style.animation = "bigDown 1s ease-out";
	setTimeout(() => {
		welcomePage.style.transform = "translateY(0%)";
	}, 980);
}
function turnCameraOn() {
	// Phase 1 
	let ticketContainer = document.getElementById("ticket-container");
	let startingButton = document.getElementById('starting-button');
	// Phase 2			
	let patternContainer = document.getElementById('pattern-outer-container');
	let video = document.getElementById('video');
	let photoContainer = document.getElementById('photo-container');

	setTimeout(() => {
		startingButton.style.animation = "fading 0.3s ease-out";
		ticketContainer.style.animation = "fading 0.3s ease-out";
		setTimeout(() => {
			ticketContainer.style.display = "none";
			ticketContainer.style.animation = "none";
			startingButton.style.display = "none";
			startingButton.style.animation = "none";

			navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
				.then(function (stream) {
					patternContainer.style.display = "flex";
					photoContainer.style.display = "flex";
					video.style.display = "block";
					video.srcObject = stream;
					video.play();

					const track = stream.getVideoTracks()[0]; // Get the video track from the stream

					const lightButton = document.getElementById("light-button");
					const patternOuterContainer = document.getElementById("pattern-outer-container");
					let isFlashlightEnabled = false;
					patternOuterContainer.addEventListener('click', function (event) {
						const rect = lightButton.getBoundingClientRect();
						const isInLightButtonArea = event.clientX >= rect.left && event.clientX <= rect.right
							&& event.clientY >= rect.top && event.clientY <= rect.bottom;

						if (isInLightButtonArea) {
							if (track && typeof track.applyConstraints === 'function') {
								isFlashlightEnabled = !isFlashlightEnabled;
								const constraints = {
									advanced: [{ torch: isFlashlightEnabled }]
								};
								track.applyConstraints(constraints)
									.then(() => {
										if (isTorchEnabled) {
											console.log('Flashlight enabled');
										} else {
											console.log('Flashlight disabled');
										}
									})
									.catch(error => {
										console.log('Error toggling flashlight: ' + error);
									});
							} else {
								console.error('MediaStreamTrack.applyConstraints is not supported or track is unavailable');
							}
						}
					});
				})
				.catch(function (error) {
					alert('Перезагрузите страницу и разрешите использование камеры!');
				});

		}, 280);
	}, 600);
};

function takePicture() {
	let video = document.getElementById('video');
	video.pause();

	let retryButton = document.getElementById('retry-button');
	let readyButton = document.getElementById('ready-button');
	let snapButton = document.getElementById('snap-button');
	let retryImg = document.getElementById('retry-img');
	let readyImg = document.getElementById('ready-img');
	let snapImg = document.getElementById('snap-img');

	retryButton.style.animation = "enlarge-button 0.3s ease-out forwards";
	readyButton.style.animation = "enlarge-button 0.3s ease-out forwards";
	snapButton.style.animation = "shrink-button 0.3s ease-out forwards";
	retryImg.style.animation = "enlarge-img 0.3s ease-out forwards";
	readyImg.style.animation = "enlarge-img 0.3s ease-out forwards";
	snapImg.style.animation = "shrink-img 0.3s ease-out forwards";

	setTimeout(() => {
		retryButton.disabled = false;
		readyButton.disabled = false;
		snapButton.disabled = true;
	}, 280);
}

function retry() {
	let video = document.getElementById('video');
	video.play();

	let retryButton = document.getElementById('retry-button');
	let readyButton = document.getElementById('ready-button');
	let snapButton = document.getElementById('snap-button');
	let retryImg = document.getElementById('retry-img');
	let readyImg = document.getElementById('ready-img');
	let snapImg = document.getElementById('snap-img');

	retryButton.style.animation = "shrink-button 0.3s ease-out forwards";
	readyButton.style.animation = "shrink-button 0.3s ease-out forwards";
	snapButton.style.animation = "enlarge-button 0.3s ease-out forwards";
	retryImg.style.animation = "shrink-img 0.3s ease-out forwards";
	readyImg.style.animation = "shrink-img 0.3s ease-out forwards";;
	snapImg.style.animation = "enlarge-img 0.3s ease-out forwards";

	setTimeout(() => {
		retryButton.disabled = true;
		readyButton.disabled = true;
		snapButton.disabled = false;
	}, 280);
	
}

function goForward() {
	let video = document.getElementById('video');
	let videoContainer = document.getElementById('video-container');
	let patternImg = document.getElementById('pattern-img');

	let requiredHeight = patternImg.offsetHeight;
	let requiredWidth = requiredHeight / 1.61;

	let startX = video.offsetWidth / 2 - requiredWidth / 2;
	let startY = patternImg.offsetTop - videoContainer.offsetTop;

	html2canvas(video, {
		x: startX,
		y: startY,
		width: requiredWidth,
		height: requiredHeight,
		useCORS: true
	}).then(canvas => {
		canvas.toBlob(function (blob) {
			let formData = new FormData();
			formData.append('image', blob, 'image.jpg');

			fetch('/Photo', {
				method: 'POST',
				body: formData,
			})
				.then(response => {
					if (response.status === 200) {
						window.location.href = '/PhotoForm';
					} else {
						console.error('Ошибка fetch');
					}
				})
				.catch(error => {
					console.error('Ошибка:', error);
				});
		}, 'image/jpeg', 1);
	}); 
}

function collapse() {
	let welcomePage = document.getElementById("welcome-page");

	welcomePage.style.animation = "bigUp 2s ease-out";
	setTimeout(() => {
		welcomePage.style.transform = "translateY(-100%)";
	}, 980);
}

function remakePicture() {
	let counter = 0;

	for (let i = 1; i < 6; i++) {
		let info = document.getElementById(`info${i}`);
		if (info.style.display == "none") {
			console.log(`info${i}fail`);
			break
			
		} else {
			counter++;
			console.log(`info${i}success`);
		}
	}
	if (counter == 5) {
		
		// Phase 3
		let form = document.getElementById("form");
		let confirm = document.getElementById('remake-picture');
		let remake = document.getElementById('confirm-data');
		// Phase 2			
		let patternContainer = document.getElementById('pattern-outer-container');
		let video = document.getElementById('video');
		let photoContainer = document.getElementById('photo-container');

		form.style.animation = "fading 0.5s ease";
		confirm.style.animation = "fading 0.5s ease";
		remake.style.animation = "fading 0.5s ease";

		setTimeout(() => {
			form.style.display = "none";
			confirm.style.display = "none";
			remake.style.display = "none";

			navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
				.then(function (stream) {
					patternContainer.style.display = "flex";
					photoContainer.style.display = "flex";
					video.style.display = "block";
					// stream
					video.srcObject = stream;
					video.play();
				})
				.catch(function (error) {
					alert('Перезагрузите страницу и разрешите использование камеры!');
				});

		}, 480);

	} else { 
		callNotification("Завершіть редагування!");
	}
	
}

function edit(obj) {
	let index = obj.id.split('')[1];
	let info = document.querySelector(`#info${index}`);
	let textBox = document.querySelector(`#textBox${index}`);
	let eElement = document.querySelector(`#e${index}`);
	let cElement = document.querySelector(`#c${index}`);
	const formWidth = document.getElementById('form').clientWidth;
	let requirableWidth = formWidth * 0.94;

	if (info && textBox && eElement && cElement) {
		textBox.value = info.value.trim();
		textBox.style.width = requirableWidth + "px";
		info.style.display = "none";
		textBox.style.display = "inline-block";
		eElement.style.display = "none";
		cElement.style.display = "inline-block";
		let startY = textBox.offsetTop + textBox.offsetHeight / 2;
		let startX = textBox.offsetLeft + textBox.offsetWidth;
		cElement.style.top = startY + "px";
		cElement.style.left = startX + "px";
		obj.setAttribute('data-editing', 'true');
	}

	const allEditButtons = document.querySelectorAll('.edit');
	allEditButtons.forEach((button) => {
		button.disabled = true;
	});
}

function closeNotification() {
	const notification = document.getElementById("notification");
	notification.classList.remove("show");
	notification.classList.add("hide");
	if (progressBar) {
		setTimeout(() => {
			progressBar.style.width = "100%";
			notification.style.display = "none";
			isActiveNotification = false;
			enableConfirmationButtons();
		}, 500);
	} else {
		notification.style.display = "none";
		isActiveNotification = false;
	}
}

function confirmEditing(obj) {
	let index = obj.id.split('')[1];
	let info = document.getElementById(`info${index}`);
	let textBox = document.getElementById(`textBox${index}`);
	let eElement = document.getElementById(`e${index}`);
	let cElement = document.getElementById(`c${index}`);

	if (textBox.value == "" && isActiveNotification) {
		console.log(isActiveNotification);
	} else if (textBox.value == "" && !isActiveNotification) {
		callNotification("Заповніть поле!");
	} else {
		info.style.display = "inline-block";
		info.value = textBox.value;
		textBox.style.display = "none";
		cElement.style.display = "none";
		eElement.style.display = "inline-block";
	}

	const allEditButtons = document.querySelectorAll('.edit');
	allEditButtons.forEach((button) => {
		button.disabled = false;
	});
}

function callNotification(text) {
	const notification = document.getElementById("notification");
	const notificationContent = document.getElementById("notification-content");
	const progressBar = document.getElementById("progress-bar");

	if (!isActiveNotification) {
		isActiveNotification = true;
		notification.style.display = "block";
		setTimeout(() => {
			notification.classList.add("show");
			notificationContent.innerHTML = text;
		}, 10);
		setTimeout(() => {
			closeNotification();
		}, 3000);
	}
}

function openPopup() {
	let textInInfo = 0;
	for (let i = 1; i <= 5; i++) {
		let info = document.getElementById('info' + i);
		if (info.style.display == "none") {
			callNotification("Завершіть редагування!");
			break;
		}
		if (!info.value) {
			callNotification("Заповніть усі поля!");	
			break;
		} 
		textInInfo++;
	}
	if (textInInfo == 5) {
		document.getElementById('dropdown-button').disabled = true;
		document.getElementById('popup').style.display = 'block';
		document.getElementById('overlay').style.display = 'block';
	}
}

function closePopup() {
	document.getElementById('popup').style.display = 'none';
	document.getElementById('overlay').style.display = 'none';
	document.getElementById('dropdown-button').disabled = false;
}

class StudData {
	University;
	Number;
	FullName;
	Faculty;
	Group;
}

function confirmAndSend() {
	const data = new StudData();

	data.University = document.getElementById('info1').value;
	data.Number = document.getElementById('info2').value;
	data.FullName = document.getElementById('info3').value;
	data.Faculty = document.getElementById('info4').value;
	data.Group = document.getElementById('info5').value;

	const json = JSON.stringify(data);

	console.log(json);

	fetch('/End', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: json
	})
		.then(response => {
			console.log('Request was sent successfully.');
			window.location.href = '/End';
		})
		.catch(error => {
			console.error('Error', error);
		});
}