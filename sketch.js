var myPaddle;

var balls = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    myPaddle = new Paddle(mouseX, mouseY, random(80, 150), random(50, 180), color(255, 0, 0));

    for (var i = 0; i < 6; i++) {
        balls[i] = new Ball(random(width), random(height), random(10, 50), random(10, 50), random(-6, 6), random(-6, 6), color(random(255), random(255), random(255)));
    }
}

function draw() {
    background(255);
    myPaddle.move();
    myPaddle.render();

    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].bounceWall();
        balls[i].bouncePaddle(myPaddle);
        balls[i].render();
    }
}

function mousePressed() {
    balls.push(new Ball(mouseX, mouseY, 40, 40, random(-6, 6), random(-6, 6), color(random(255), 0, 0)));
}

function keyPressed() {
    balls.splice(balls.length-1, 1);
}



class Ball {
    constructor(tempx, tempy, tempw, temph, tempxs, tempys, tempc) {
        this.x = tempx;
        this.y = tempy;
        this.w = tempw;
        this.h = temph;
        this.c = tempc;
        this.xs = tempxs;
        this.ys = tempys;
    }

    bouncePaddle(paddle) {
        if (this.ys > 0 && this.y + (this.h / 2) >= paddle.y - (paddle.h / 2) && this.x > paddle.x - (paddle.w / 2) && this.x <= paddle.x + (paddle.w / 2)) {
            this.ys = this.ys * -1;
        }

        if (this.ys < 0 && this.y - (this.h / 2) < paddle.y + (paddle.h / 2) && this.x > paddle.x - (paddle.w / 2) && this.x <= paddle.x + (paddle.w / 2)) {
            this.ys = this.ys * -1;
        }

        if (this.xs < 0 && this.x < paddle.y + (paddle.h / 2) && this.y > paddle.y - (paddle.h / 2) && this.y < paddle.y + (paddle.h / 2)) {
            this.xs = this.xs * -1;
        }

        if (this.xs > 0 && this.x > paddle.y - (paddle.h / 2) && this.y > paddle.y - (paddle.h / 2) && this.y < paddle.y + (paddle.h / 2)) {
            this.xs = this.xs * -1;
        }

    }


    // not working YET
    disappear() {
        setTimeout(function () {
            console.log("DISSAPPPPEEEARRRR");
            return true;
        }, 1000);
    }




    render() {
        fill(this.c);
        ellipse(this.x, this.y, this.w, this.h);
        fill(0);
        rect(this.x, this.y, this.w, this.h / 6);
    }

    move() {
        this.x = this.x + this.xs;
        this.y = this.y + this.ys;

    }

    bounceWall() {
        if (this.x > width || this.x < 0) {
            this.xs = this.xs * -1;
        }

        if (this.y > height || this.y < 0) {
            this.ys = this.ys * -1;
        }

    }

}


// paddle

class Paddle {
    constructor(tempx, tempy, tempw, temph, tempc) {
        this.x = tempx;
        this.y = tempy;
        this.w = tempw;
        this.h = temph;
        this.c = tempc;
    }

    render() {
        rectMode(CENTER);
        fill(this.c);
        rect(this.x, this.y, this.w, this.h);
    }

    move() {
        this.x = mouseX;
        this.y = mouseY;
    }


}
