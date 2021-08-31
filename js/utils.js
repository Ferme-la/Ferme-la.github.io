
if(localStorage.getItem('dark') !== "0" && localStorage.getItem('dark') !== '1'){
    localStorage.setItem('dark','0')
}
if(localStorage.getItem('dark') ==='1'){
    document.body.classList.add('mdui-theme-layout-dark')
}
function openwin()

{window.open("page.html","","width=200,height=200")}

function get_cookie(Name)

{var search = Name + "="

var returnvalue = "";

if (documents.cookie.length > 0) {

offset = documents.cookie.indexOf(search)

if (offset != -1) {

offset += search.length

end =documents.cookie.indexOf(";", offset);

if (end == -1)

end = documents.cookie.length;

returnvalue=(documents.cookie.substring(offset,end))

}

}

return returnvalue;

}

function loadpopup(){

if(get_cookie("popped")==""){

openwin()

documents.cookie="popped=yes"

}

}
function loadjscssfile(filename, filetype){
    if (filetype==="js"){
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src",filename)
    } else if (filetype==="css"){
        var fileref=document.createElement("link")
        fileref.setAttribute("rel","stylesheet")
        fileref.setAttribute("type","text/css")
        fileref.setAttribute("href",filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
function triggerDayNight(){
    if(document.body.getAttribute('class').indexOf('mdui-theme-layout-dark')>-1){
        document.body.classList.remove('mdui-theme-layout-dark')
        localStorage.setItem('dark','0')
    }else{
        document.body.classList.add('mdui-theme-layout-dark')
        localStorage.setItem('dark','1')
    }
}
function ocdOptionsSave(a){
    if(a===false){
        ocdDialog.close();
        return;
    }
    const ocdEnableMusicCB = document.getElementById("ocdEnableMusicCB");
    const ocdEnableVisualEffectCB = document.getElementById("ocdEnableVisualEffectCB");
    const ocdEnablePointerPatternCB = document.getElementById("ocdEnablePointerPatternCB");
    const ocdEnableMusic = $(ocdEnableMusicCB).prop('checked');
    const ocdEnableVisualEffect = $(ocdEnableVisualEffectCB).prop('checked');
    const ocdEnablePointerPattern = $(ocdEnablePointerPatternCB).prop('checked');
    if(ocdEnableMusic === true){
        localStorage.setItem('ocdEnableMusic','1')
    }else{
        localStorage.setItem('ocdEnableMusic','0')
    }
    if(ocdEnableVisualEffect === true){
        localStorage.setItem('ocdEnableVisualEffect','1')
    }else{
        localStorage.setItem('ocdEnableVisualEffect','0')
    }
    if(ocdEnablePointerPattern === true){
        localStorage.setItem('ocdEnablePointerPattern','1')
    }else{
        localStorage.setItem('ocdEnablePointerPattern','0')
    }
    ocdDialog.close();
    
	


}
function ocdOptionsLoad(){
    if(localStorage.getItem('ocdEnableMusic') !== "0" && localStorage.getItem('ocdEnableMusic') !== '1'){
        localStorage.setItem('ocdEnableMusic','1')
    }
    if(localStorage.getItem('ocdEnableVisualEffect') !== "0" && localStorage.getItem('ocdEnableVisualEffect') !== '1'){
        localStorage.setItem('ocdEnableVisualEffect','1')
    }
    if(localStorage.getItem('ocdEnablePointerPattern') !== "0" && localStorage.getItem('ocdEnablePointerPattern') !== '1'){
        localStorage.setItem('ocdEnablePointerPattern','1')
    }
    const ocdEnableMusicCB = document.getElementById("ocdEnableMusicCB");
    const ocdEnableVisualEffectCB = document.getElementById("ocdEnableVisualEffectCB");
    const ocdEnablePointerPatternCB = document.getElementById("ocdEnablePointerPatternCB");
    if(localStorage.getItem('ocdEnableMusic')==="1"){
        $(ocdEnableMusicCB).prop('checked',true);
    }else{
        $(ocdEnableMusicCB).prop('checked',false);
    }
    if(localStorage.getItem('ocdEnablePointerPattern')==="1"){
        $(ocdEnablePointerPatternCB).prop('checked',true);
        loadjscssfile("css/default.css","css");
    }else{
        $(ocdEnablePointerPatternCB).prop('checked',false);
    }
    if(localStorage.getItem('ocdEnableVisualEffect')==="1"){
        $(ocdEnableVisualEffectCB).prop('checked',true);
    }else{
        $(ocdEnableVisualEffectCB).prop('checked',false);
    }
    
}
function initVisualEffect(){
    if(localStorage.getItem('ocdEnableVisualEffect')==="1"){
        // fun options!
        const PARTICLES_PER_FIREWORK = 150; // 100 - 400 or try 1000
        const FIREWORK_CHANCE = 0.02; // percentage, set to 0 and click instead
        const BASE_PARTICLE_SPEED = 0.6; // between 0-4, controls the size of the overall fireworks
        const FIREWORK_LIFESPAN = 600; // ms
        const PARTICLE_INITIAL_SPEED = 4.5; // 2-8

        // not so fun options =\
        const GRAVITY = 9.8;


        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        let particles = [];
        let disableAutoFireworks = false;
        let resetDisable = 0;

        let loop = () => {

            if (!disableAutoFireworks && Math.random() < FIREWORK_CHANCE) {
                createFirework();
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, i) => {
                particle.animate();
                particle.render();
                if (particle.y > canvas.height
                    || particle.x < 0
                    || particle.x > canvas.width
                    || particle.alpha <= 0
                ) {
                    particles.splice(i, 1);
                }
            });

            requestAnimationFrame(loop);

        };

        let createFirework = (
            x = Math.random() * canvas.width,
            y = Math.random() * canvas.height
        ) => {

            let speed = (Math.random() * 2) + BASE_PARTICLE_SPEED;
            let maxSpeed = speed;

            let red = ~~(Math.random() * 255);
            let green = ~~(Math.random() * 255);
            let blue = ~~(Math.random() * 255);

            // use brighter colours
            red = (red < 150 ? red + 150 : red);
            green = (green < 150 ? green + 150 : green);
            blue = (blue < 150 ? blue + 150 : blue);

            // inner firework
            for (let i = 0; i < PARTICLES_PER_FIREWORK; i++) {
                let particle = new Particle(x, y, red, green, blue, speed);
                particles.push(particle);

                maxSpeed = (speed > maxSpeed ? speed : maxSpeed);
            }

            // outer edge particles to make the firework appear more full
            for (let i = 0; i < 40; i++) {
                let particle = new Particle(x, y, red, green, blue, maxSpeed, true);
                particles.push(particle);
            }

        };

        class Particle {

            constructor(
                x = 0,
                y = 0,
                red = ~~(Math.random() * 255),
                green = ~~(Math.random() * 255),
                blue = ~~(Math.random() * 255),
                speed,
                isFixedSpeed
            ) {

                this.x = x;
                this.y = y;
                this.red = red;
                this.green = green;
                this.blue = blue;
                this.alpha = 0.05;
                this.radius = 1 + Math.random();
                this.angle = Math.random() * 360;
                this.speed = (Math.random() * speed) + 0.1;
                this.velocityX = Math.cos(this.angle) * this.speed;
                this.velocityY = Math.sin(this.angle) * this.speed;
                this.startTime = (new Date()).getTime();
                this.duration = Math.random() * 300 + FIREWORK_LIFESPAN;
                this.currentDiration = 0;
                this.dampening = 30; // slowing factor at the end

                this.colour = this.getColour();

                if (isFixedSpeed) {
                    this.speed = speed;
                    this.velocityY = Math.sin(this.angle) * this.speed;
                    this.velocityX = Math.cos(this.angle) * this.speed;
                }

                this.initialVelocityX = this.velocityX;
                this.initialVelocityY = this.velocityY;

            }

            animate() {

                this.currentDuration = (new Date()).getTime() - this.startTime;

                // initial speed kick
                if (this.currentDuration <= 200) {

                    this.x += this.initialVelocityX * PARTICLE_INITIAL_SPEED;
                    this.y += this.initialVelocityY * PARTICLE_INITIAL_SPEED;
                    this.alpha += 0.01;

                    this.colour = this.getColour(240, 240, 240, 0.9);

                } else {

                    // normal expansion
                    this.x += this.velocityX;
                    this.y += this.velocityY;
                    this.colour = this.getColour(this.red, this.green, this.blue, 0.4 + (Math.random() * 0.3));

                }

                this.velocityY += GRAVITY / 1000;

                // slow down particles at the end
                if (this.currentDuration >= this.duration) {
                    this.velocityX -= this.velocityX / this.dampening;
                    this.velocityY -= this.velocityY / this.dampening;
                }

                if (this.currentDuration >= this.duration + this.duration / 1.1) {

                    // fade out at the end
                    this.alpha -= 0.02;
                    this.colour = this.getColour();

                } else {

                    // fade in during expansion
                    if (this.alpha < 1) {
                        this.alpha += 0.03;
                    }

                }
            }

            render() {

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                ctx.lineWidth = this.lineWidth;
                ctx.fillStyle = this.colour;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.getColour(this.red + 150, this.green + 150, this.blue + 150, 1);
                ctx.fill();

            }

            getColour(red, green, blue, alpha) {

                return `rgba(${red || this.red}, ${green || this.green}, ${blue || this.blue}, ${alpha || this.alpha})`;

            }

        }

        let updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };


        // run it!

        updateCanvasSize();
        $(window).resize(updateCanvasSize);
        $(canvas).on('click', (e) => {

            createFirework(e.clientX, e.clientY);

            // stop fireworks when clicked, re-enable after short time
            disableAutoFireworks = true;
            clearTimeout(resetDisable);
            resetDisable = setTimeout(() => {
                disableAutoFireworks = false;
            }, 5000);

        });

        loop();
    }
}
function initMUsic(){
    if(localStorage.getItem('ocdEnableMusic')==="1"){
        document.addEventListener('click', function () {
            function audioAutoPlay() {
                const audio = document.getElementById('audio');
                if(localStorage.getItem('ocdEnableMusic')==="1"&&$.cookie("playedMusic")!=="1"){
                    audio.play();
                    $.cookie("playedMusic","1")
                }
            }
            audioAutoPlay();
        });
    }
}

var inst = new mdui.Drawer('#drawer');
function initDrawer(){
    
// method
    document.getElementById('toggle').addEventListener('mouseover', function () {
        inst.open();
    });

    document.getElementById('canvas').addEventListener('mouseover', function () {
        inst.close();
    });

    document.getElementById('drawer').addEventListener('mouseover', function () {
        inst.open();
    });

    document.getElementById('drawer').addEventListener('mouseout', function () {
        inst.close();
    });
// event
    var drawer = document.getElementById('drawer');
    drawer.addEventListener('open.mdui.drawer', function () {
        console.log('open');
    });
    drawer.addEventListener('opened.mdui.drawer', function () {
        console.log('opened');
    });
    drawer.addEventListener('close.mdui.drawer', function () {
        console.log('close');
    });
    drawer.addEventListener('closed.mdui.drawer', function () {
        console.log('closed');
    });
}

var ocdDialog = new mdui.Dialog('#OCD_Options');
document.getElementById('openOCDDialog').addEventListener('click', function () {
    ocdDialog.open();
});
$.cookie("playedMusic","0")
initDrawer()
ocdOptionsLoad()
initVisualEffect()
initMUsic()




