var music1 = ""
var music2 = ""
var leftWristX = 0
var leftWristY = 0
var rightWristX = 0
var rightWristY = 0
var leftWristScore = 0
var rightWristScore = 0
var music1Status = ""
var music2Status = ""

function preload(){
    music1 = loadSound("music.mp3")
    music2 =  loadSound("music2.mp3")
}

function setup(){
    canvas = createCanvas(600, 600)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    modal = ml5.poseNet(video , modalLoaded)
    modal.on("pose", gotResults)
}

function draw(){
    image(video, 0,0, 600, 600)
        circle(leftWristX, leftWristY, 10)
        music1Status = music1.isPlaying()
        music2Status = music2.isPlaying()

        if(leftWristScore > 0.2){
            circle(leftWristX, leftWristY, 10)
            music1.stop()
            if(music2Status == false){
                music2.play()
                document.getElementById("song").innerHTML = "Playing Peter Pan Song"
            }
        }

        if(rightWristScore > 0.2){
            circle(rightWristX, rightWristY, 10)
            music2.stop()
            if(music1Status == false){
                music1.play()
                document.getElementById("song").innerHTML = "Playing Harry Potter Theme Song"
            }
        }
}

function modalLoaded(){
    console.log("Modal Loaded")
}

function gotResults(results){
    if(results.length > 0){
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        leftWristScore = results[0].pose.keypoints[9].score
        rightWristScore = results[0].pose.keypoints[10].score
    }
}