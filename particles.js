let cv = document.querySelector('canvas'),
    c  = cv.getContext('2d');


    cv.width  = window.innerWidth - 5;
    cv.height = window.innerHeight - 7.1;


window.addEventListener('resize' , function() {
    cv.width  = window.innerWidth - 5;
    cv.height = window.innerHeight - 7.1;
    init();
});


let mouse = {x: undefined , y: undefined},
    maxRadius = 40,
    minRadius = 2;
window.addEventListener('mousemove' , function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});



    function  Circle(x , y , r , dx , dy , color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.color = color;

        this.update = () => {
            if (this.x + this.r > innerWidth || this.x - this.r < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.r > innerHeight || this.y - this.r < 0) {
                this.dy = -this.dy;
            }
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
                && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {

                    if (this.r < maxRadius) {
                        this.r += 1;
                    }

                }else if (this.r > minRadius) {
                    this.r -= 1;
                }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }


        this.draw = () => {
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.x , this.y , this.r , 0 , Math.PI * 2);
            c.fill();
            c.closePath();
        }
    }


let particles,
        colorArray = [
            '#D74177',
            '#A890FE',
            '#D8B5FF',
            '#6FD6FF',
            '#CD295A',
            '#1BFFFF',
            '#15678D',
            '#130CB7',
        ];
    function init() {
        particles = [];
            for (let i = 0; i < 800 ; i += 1) {
        let r = Math.random() * 4,
            x = Math.random() * (innerWidth - r * 2) + r,
            y = Math.random() * (innerHeight - r * 2) + r,
            dx = (Math.random() * - .5) * 2,
            dy = (Math.random() * - .5) * 2,
            color = colorArray[Math.floor(Math.random() * colorArray.length)];
            particles.push(new Circle(x , y , r , dx, dy , color));
            }
    }



    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0 , 0 , innerWidth,  innerHeight);

        particles.forEach(particle => {
            particle.update()
        });
    };




    init();
    animate();