const updateGame = (p1, p2, gameState) => {
    p1NameDiv.innerText = p1.name
    p2NameDiv.innerText = p2.name
  
    p1HealthDiv.innerText = p1.health
    p2HealthDiv.innerText = p2.health
  
    //Condition IF either player health is <=0 then set isOver to true and declareWinner()
    if (p1.health <= 0 || p2.health <= 0) {
      gameState = true
      game.isOver = gameState
      resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
  
      return gameState
    }
  }
  
  class Player {
    constructor(name, health, attackDamage) {
      this.name = name
      this.health = health
      this.attackDamage = attackDamage
    }
  
    strike(player, enemy, attackDmg) {
      //Get a random number between 1 - 10 and this is damageAmount
      let damageAmount = Math.ceil(Math.random() * attackDmg)
      //subtract the enemy health with the damageAmount
      enemy.health -= damageAmount
  
      //update the game and DOM with the updateGame()
      updateGame(p1, p2, game.isOver)
  
      //return the message of player name attacks enemy name for damageAmount
  
      return `${player.name} attacks ${enemy.name} for ${damageAmount} damage`
    }
  
  
    heal(player) {
      //Get a random number between 1-5 and store that in hpAmount
      let healthAmount = Math.ceil(Math.random() * 5)
  
      //Add the healthAmount to the players health
      player.health += healthAmount
  
      //Update the Game 
      updateGame(p1, p2, game.isOver)
  
      //Return a message of player name heals for healthAmount HP
      return `${player.name} heals for ${healthAmount} HP!`
    }
  }
  
  
  class Game {
    constructor() {
      this.isOver = false;
    }
  
    declareWinner(isOver, p1, p2) {
      //Create a message variable that will hold a message based on the condition
      let message 
  
      //If isOver is true and p1 health <=0 then update message vaiable to p2 Wins!
      if (isOver == true && p1.health <= 0) {
        message = `${p2.name} WINS!`
      } else if (isOver == true && p2.health <= 0) {
        message = `${p1.name} WINS!`
      }
      //play victory sound 
      document.getElementById('victory').play()
  
      return message
    }
  
    reset(p1, p2) {
      //set the health of both players equals to 100
      p1.health = 100
      p2.health = 100
      this.isOver = false
      resultDiv.innerText = ''
      updateGame(p1,p2,this.isOver)
    }
  
    // ** Simulate the whole match untill one player runs out of health **
    play(p1, p2) {
      //Reset to make sure players health is back to full before starting
      this.reset(p1,p2);
      while (!this.isOver) {
        //Make sure both the players get strike() and health() once each loop
        p1.strike(p1,p2,p1.attackDamage)
        p2.heal(p2)
        p2.strike(p2,p1,p2.attackDamage)
        p1.heal(p1)
        this.isOver = game.isOver
      }
  
      //Once isOver is TRUE run the declareWinner() method 
  
      return this.declareWinner(this.isOver, p1, p2)
    }
  
  }
  
  
  let playButton = document.getElementById('play')
  let resultDiv = document.getElementById('result')
  let p1NameDiv = document.getElementById('p1Name')
  let p2NameDiv = document.getElementById('p2Name')
  let p1HealthDiv = document.getElementById('p1Health')
  let p2HealthDiv = document.getElementById('p2Health')
  
  
  
  //create a two player 
  let player1 = new Player('Sonu', 100, 10)
  let player2 = new Player('Dhanjit', 100, 10)
  
  let p1 = player1
  let p2 = player2
  
  let game = new Game()
  
  //Player 1 Controls
  document.addEventListener('keydown', function(e) {
    //if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
    if (e.key == 'q' && game.isOver == false && p2.health > 0) {
      //After striking play the attack sound
      p1.strike(p1, p2, p1.attackDamage)
      document.getElementById('p1attack').play()
    }
  })
  
  document.addEventListener('keydown', function(e) {
    //if you press 'a' AND the player health is greater than 0 AND isOver is still false then heal()
    if (e.key == 'a' && p2.health > 0 && game.isOver == false) {
      p1.heal(p1)
      document.getElementById('p1heal').play()
    }
  })
  
  //player 2 control
  
  document.addEventListener('keydown', function(e) {
    //if you press P AND the enemy health is greate than 0 AND isOver is still false then strike()
    if (e.key == 'p' && game.isOver == false && p1.health > 0) {
      //After striking play the attack sound
      p2.strike(p2, p1, p2.attackDamage)
      document.getElementById('p2attack').play()
    }
  })
  
  document.addEventListener('keydown', function(e){
    //if you press L AND the player health is greater than 0 and isOver is still false
    if(e.key == 'l' && p1.health > 0){
      p2.heal(p2)
      //After healing play the sound
      document.getElementById('p2heal').play()
    }
  })
  
  // ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
  playButton.onclick = () => result.innerText = game.play(p1,p2)