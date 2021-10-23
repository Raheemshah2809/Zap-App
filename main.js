const geolocate = function () {
    const $status = $("#status");
    const $latitude = $("#latitude");
    const $longitude = $("#longitude");
    const $heading = $("#heading");
    const $speed = $("#speed");
    const $altitude = $("#altitude");
    const $accuracy = $("#accuracy");
    const $altitudeAccuracy = $("#altitudeAccuracy");
    const $result = $(".result");
    const $trigger = $("#trigger");

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const speed = position.coords.speed ? position.coords.speed : "N/A";
        const heading = position.coords.heading ? position.coords.heading : "N/A";
        const altitude = position.coords.altitude ?
            position.coords.altitude :
            "N/A";
        const accuracy = (position.coords.accuracy / 1609).toFixed(3);
        const altitudeAccuracy = (position.coords.altitudeAccuracy / 1609).toFixed(3);

        $latitude.html(latitude + "&deg;");
        $longitude.html(longitude + "&deg;");
        $heading.html(heading);
        $speed.html(speed);
        $altitude.html(altitude);
        $accuracy.html(accuracy + " mile" + (accuracy > 1 ? "s" : ""));
        $altitudeAccuracy.html(altitudeAccuracy + " mile" + (altitudeAccuracy > 1 ? "s" : ""));

        $status.html("");

        $result.show();
        $status.hide();

        $trigger.html("Refresh location");

        console.log(position);
    };

    const error = () => {
        $status.html('Unable to retrieve your location. This may be due to your browser security settings or a known Chrome issue with embedded iframes, <a href="https://codepen.io/bmarshall511/full/rZMbey" target="_blank"><strong>try it directly on CodePen</strong></a>.').show();
        $trigger.html("Try directly on CodePen").click(function (e) {
            e.preventDefault();
            window.open('https://codepen.io/bmarshall511/full/rZMbey', '_blank');
        });
    };

    if (navigator.geolocation) {
        $status.html("Locating...").show();
        $trigger.html("Locating...");
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        $trigger.html("Not supported.");
        $status.html("Geolocation is not supported by your browser.").show();;
    }
};

$("#trigger").click(() => {
    geolocate();
});

var player = document.getElementById('player');
var snapshotCanvas = document.getElementById('snapshot');
var captureButton = document.getElementById('capture');

var handleSuccess = function (stream) {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
};

captureButton.addEventListener('click', function () {
    var context = snapshot.getContext('2d');
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, snapshotCanvas.width,
        snapshotCanvas.height);
    console.log(context.canvas.toDataURL());
});

navigator.mediaDevices.getUserMedia({
        video: true
    })
    .then(handleSuccess);