let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let types = ["C", "D", "H", "S"];
let deck = [];

//Δημιουργία όλων των τύπων χαρτιών της τράπουλας.
for (let i = 0; i < types.length; i++) {

    for (let j = 0; j < values.length; j++) {

        deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
    }
}

//Ανακάτεμα τράπουλας.
for (let i = 0; i < deck.length; i++) {

    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51)

    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
}

//Συνάρτηση για τον υπολογισμό πόντων. 
function calc_score(array) {

    let array_score = 0;

    for (n = 0; n < array.length; n++) {

        let data = array[n].split("-");

        //Εάν η τιμή του χαρτιού είναι ίση με 2 εώς και 10.
        if (parseInt(data[0]) >= 2 && parseInt(data[0]) <= 10) {

            array_score = array_score + parseInt(data[0]);
        }
        //Εάν το χαρτί είναι άσσος.
        else if (data[0] === "A") {

            array_score = array_score + 11;
        }
        //Αλλιώς (δλδ Εάν είναι Βασιλιάς, Βασσίλισα ή Βαλές).
        else {

            array_score = array_score + 10; 
        }
    }
    return array_score;
}

//Μοίρασμα χαρτιών στους παίκτες - Υπολογισμός πόντων.
//Player.
let player = [];
player[0] = deck.shift();
player[1] = deck.shift();

//Δημιουργία του αντικειμένου και του path της εικόνας.
//Προσθήκη στο div-αντικείμενο για τον player.
for (let i = 0; i < player.length; i++) {

    let cardImg = document.createElement("img");
    cardImg.src = "./img/" + player[i] + ".png";
    cardImg.classList.add("rotate_card");
    document.getElementById("player_cards").append(cardImg);
}
document.getElementById("player_pts").innerHTML = calc_score(player);

//Dealer.
let dealer = [];
dealer[0] = deck.shift();
dealer[1] = deck.shift();

//Δημιουργία του αντικειμένου και του path της εικόνας.
//Προσθήκη στο div-αντικείμενο για τον Dealer.
let cardImg = document.createElement("img");
cardImg.src = "./img/BACK.png";
cardImg.classList.add("rotate_card");
document.getElementById("dealer_cards").append(cardImg);

let cardImg2 = document.createElement("img");
cardImg2.src = "./img/" + dealer[1] + ".png";
cardImg2.classList.add("rotate_card");
document.getElementById("dealer_cards").append(cardImg2);

let data = dealer[1].split("-");
//Εάν η τιμή του χαρτιού είναι ίση με 2 εώς και 10.
if (parseInt(data[0]) >= 2 && parseInt(data[0]) <= 10) {
    //Εμάνισε ως score την αξία του χαρτιού.
    document.getElementById("dealer_pts").innerHTML = data[0];
}
//Εάν το χαρτί είναι άσσος.
else if (data[0] === "A") {
    //Εμάνισε ως score 11.
    document.getElementById("dealer_pts").innerHTML = 11;
}
//Αλλιώς (δλδ Εάν είναι Βασιλιάς, Βασσίλισα ή Βαλές).
else {
    //Εμάνισε ως score 10.  
    document.getElementById("dealer_pts").innerHTML = 10;
}

//Τραβάει χαρτί ο παίκτης(player).
function hit() {

    player[player.length] = deck.shift();
    document.getElementById("player_pts").innerHTML = calc_score(player);

    let cardImg = document.createElement("img");
    cardImg.src = "./img/" + player[player.length-1] + ".png";
    cardImg.classList.add("rotate_card");
    document.getElementById("player_cards").append(cardImg);
    
    let message = document.getElementById("message");

    if (calc_score(player) > 31) { 

        message.innerHTML = "You Lose!";    
        disable_btns();
    }
}

//Πάσο ή παίζει ο Dealer.
function stand() {

    disable_btns();

    cardImg.src = "./img/" + dealer[0] + ".png";
    cardImg.style.transition = "transform 1s"
    cardImg.style.transform = "rotateY(180deg)";
    cardImg.style.rotate = "y 180deg";
    
    document.getElementById("dealer_pts").innerHTML = calc_score(dealer);

    let autoplay = setInterval(() => {

        dealer[dealer.length] = deck.shift();
        document.getElementById("dealer_pts").innerHTML = calc_score(dealer);

        let cardImg = document.createElement("img");
        cardImg.src = "./img/" + dealer[dealer.length-1] + ".png";
        cardImg.classList.add("rotate_card");
        document.getElementById("dealer_cards").append(cardImg);

        let message = document.getElementById("message");

        if (calc_score(dealer) > 31) {  
            
            message.innerHTML = "You Win!!"; 
            clearInterval(autoplay);
        }

        if (calc_score(dealer) === 31 && calc_score(player) < 31) { 

            message.innerHTML = "You Lose!";  
            clearInterval(autoplay);
        }

        if (calc_score(dealer) > calc_score(player) && calc_score(dealer) < 31) {

            message.innerHTML = "You Lose!";   
            clearInterval(autoplay);
        }

        if (calc_score(dealer) === calc_score(player)) {

            message.innerHTML = "Draw";   
            clearInterval(autoplay);
        }

    }, 1600);
}

//Απενεργοποίηση των buttons.
function disable_btns() {

    let hit_btn = document.getElementById("hit_btn");
    hit_btn.disabled = true;
    hit_btn.style.backgroundColor = "#660708";
    hit_btn.style.opacity = "0.6";

    let stand_btn = document.getElementById("stand_btn");
    stand_btn.disabled = true;
    stand_btn.style.backgroundColor = "#660708";
    stand_btn.style.opacity = "0.6";
}

