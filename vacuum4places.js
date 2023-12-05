let robot;
let places = []
let display

let dirtyColor = 'red';
let cleanColor = 'white';

let robotDelayToNextPlace = 1000;
let robotCleanTime = 1000

class Robot{
    constructor(div){
        this.div = div;
        this.placeIndex = 0;

        this.checkPlaceStatus();
    }

    update(){

    }

    checkPlaceStatus(){
        let place = places[this.placeIndex];
        if(place.dirty){
            display.innerText = 'This place is dirty, time de clean!';
            setTimeout(()=>{
                place.clean();
                setTimeout(()=>this.goToNextPlace(), robotDelayToNextPlace); 
            }, robotCleanTime);
        }
        else{
            display.innerText = 'Its clean enough, next!';
            setTimeout(()=>this.goToNextPlace(), robotDelayToNextPlace); 
        }
    }

    goToNextPlace(){
        this.placeIndex = (this.placeIndex + 1) % places.length;
        let placeRect = places[this.placeIndex].div.getBoundingClientRect()
        let robotRect = this.div.getBoundingClientRect();
        this.div.style.left = placeRect.left + (placeRect.width - robotRect.width) / 2 + 'px';
        this.div.style.top = placeRect.top + (placeRect.height - robotRect.height) / 2 + 'px';
        this.checkPlaceStatus();
    }
}

class Place{
    constructor(div){
        this.div = div;
        this.dirty = false;
        console.log(div)

        this.div.addEventListener('click', (e)=>{
            this.dirty = !this.dirty;
        })
    }

    update(){
        this.color();
    }

    color(){
        this.div.style.backgroundColor = this.dirty ? dirtyColor : cleanColor; 
    }

    clean(){
        this.dirty = false;
    }
}

function startWorld(){
    document.querySelectorAll('.place').forEach(function(placeDiv){
        places.push(new Place(placeDiv));
    })
    display = document.querySelector('.display');
    robot = new Robot(document.querySelector('.robot'));
}

function updateWorld(){
    robot.update();
    places.forEach(function(place){
        place.update();
    })
}

startWorld();
setInterval(updateWorld, 1000/60);




