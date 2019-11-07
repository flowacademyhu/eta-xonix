const startGame = () => {
  const initGameBoard = require('./initGameBoard');
  const initPositionsOfCharacters = require('./initPositionsOfCharacters');
  const monsterMovement = require('./monsterMovement');
  const outerMonsterMovement = require('./outerMonsterMovement');
  const heroMovement = require('./heroMovement');
  const draw = require('./colorboard');
  const collision = require('./collision');
  const font = require('unifont');
  const center = require('align-text');
  const chalk = require('chalk');
  const score = require('./score');
  const percent = require('./percent');

  let actualLife = 3;
  let actualScore = 0;

  const stagelevel = 5;
  let gameBoard = initGameBoard.gameBoardGenerator(26, 63, 2);
  const arrayOfMonsters = initPositionsOfCharacters.spawnInnerBalls(gameBoard, stagelevel);
  const outerMonster = initPositionsOfCharacters.spawnOuterBall(gameBoard);
  let player = initPositionsOfCharacters.spawnPlayer(gameBoard);
  let lastPressedKey = '';
  const maxOfField = percent.maxOfFieldFunc(gameBoard);

  const moveDownInterval = () => {
    clearInterval(moveRightInterval);
    clearInterval(moveUpInterval);
    clearInterval(moveLeftInterval);
    if (player.xPosition !== 25) player = heroMovement.moveDown(player, gameBoard);
    lastPressedKey = 's';
    const firstSpaceToCut = heroMovement.findTheFirstSpace(gameBoard);
    const temporaryField = heroMovement.temporaryFieldAdder();
    if (temporaryField === 0 && firstSpaceToCut != null) {
      const firstOneToCut = heroMovement.checkingSidesDown(gameBoard, lastPressedKey, firstSpaceToCut);
      heroMovement.cuttingOutSpaces(gameBoard, lastPressedKey, firstSpaceToCut);
      if (firstOneToCut != null && firstOneToCut !== -1) heroMovement.cuttingOutOnes(gameBoard, lastPressedKey, firstOneToCut);
      actualScore += score.countScore(gameBoard);
    }
  };
  const moveUpInterval = () => {
    clearInterval(moveDownInterval);
    clearInterval(moveRightInterval);
    clearInterval(moveLeftInterval);
    if (player.xPosition !== 0) player = heroMovement.moveUp(player, gameBoard);
    lastPressedKey = 'w';
    const firstSpaceToCut = heroMovement.findTheFirstSpace(gameBoard);
    const temporaryField = heroMovement.temporaryFieldAdder();
    if (temporaryField === 0 && firstSpaceToCut != null) {
      const firstOneToCut = heroMovement.checkingSidesDown(gameBoard, lastPressedKey, firstSpaceToCut);
      heroMovement.cuttingOutSpaces(gameBoard, lastPressedKey, firstSpaceToCut);
      if (firstOneToCut != null && firstOneToCut !== -1) heroMovement.cuttingOutOnes(gameBoard, lastPressedKey, firstOneToCut);
      actualScore += score.countScore(gameBoard);
    }
  };

  const moveRightInterval = () => {
    clearInterval(moveDownInterval);
    clearInterval(moveUpInterval);
    clearInterval(moveLeftInterval);
    if (player.yPosition !== 62) player = heroMovement.moveRight(player, gameBoard);
    lastPressedKey = 'd';
    const firstSpaceToCut = heroMovement.findTheFirstSpace(gameBoard);
    const temporaryField = heroMovement.temporaryFieldAdder();
    if (temporaryField === 0 && firstSpaceToCut != null) {
      const firstOneToCut = heroMovement.checkingSidesDown(gameBoard, lastPressedKey, firstSpaceToCut);
      heroMovement.cuttingOutSpaces(gameBoard, lastPressedKey, firstSpaceToCut);
      if (firstOneToCut != null && firstOneToCut !== -1) { heroMovement.cuttingOutOnes(gameBoard, lastPressedKey, firstOneToCut); }
      actualScore += score.countScore(gameBoard);
    }
  };

  const moveLeftInterval = () => {
    clearInterval(moveDownInterval);
    clearInterval(moveUpInterval);
    clearInterval(moveRightInterval);
    if (player.yPosition !== 0) player = heroMovement.moveLeft(player, gameBoard);
    lastPressedKey = 'a';
    const firstSpaceToCut = heroMovement.findTheFirstSpace(gameBoard);
    const temporaryField = heroMovement.temporaryFieldAdder();
    if (temporaryField === 0 && firstSpaceToCut != null) {
      const firstOneToCut = heroMovement.checkingSidesDown(gameBoard, lastPressedKey, firstSpaceToCut);
      heroMovement.cuttingOutSpaces(gameBoard, lastPressedKey, firstSpaceToCut);
      if (firstOneToCut != null && firstOneToCut !== -1) { heroMovement.cuttingOutOnes(gameBoard, lastPressedKey, firstOneToCut); }
      actualScore += score.countScore(gameBoard);
    }
  };

  const putHeroBack = () => {
    player = {
      mark: 2,
      xPosition: 0,
      yPosition: Math.floor(gameBoard[0].length / 2)
    };
    for (let i = 1; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] === 5 || gameBoard[i][j] === 2) {
          gameBoard[i][j] = 1;
        }
      }
    }
    heroMovement.setTemporaryField();
  };

  const index = () => {
    gameBoard = monsterMovement.monsterMovement(arrayOfMonsters, gameBoard);
    gameBoard = outerMonsterMovement.outerMonsterMovement(outerMonster, gameBoard);
    const temporaryDirection = outerMonsterMovement.directionExport();
    // if (lastPressedKey === '') gameBoard[1][31] = 2;
    console.clear();
    draw.draw(gameBoard);
    console.log(actualScore);
    console.log(actualLife);
    collision.collision(arrayOfMonsters, temporaryDirection, outerMonster, gameBoard);
    const life = collision.lifeExport();
    if (actualLife > life) {
      putHeroBack();
      actualLife--;
      lastPressedKey = '';
    }
    const actualPercent = percent.actualPercentFunc(gameBoard);
    const isItLess = percent.lessThanTwentyFive(maxOfField, actualPercent);
    console.log(Math.ceil(actualPercent / maxOfField * 100, '%'));
    console.log('is it less? ', isItLess);

    // LIFE TEMPLATE
    const option = {
      font: 'BubbleFill'
    };
    const text = font('\n  Life    ' + actualLife.toString(), option);
    console.log(center(chalk.yellow(text), 65));

    if (lastPressedKey === 's') { moveDownInterval(); }
    if (lastPressedKey === 'w') { moveUpInterval(); }
    if (lastPressedKey === 'a') { moveLeftInterval(); }
    if (lastPressedKey === 'd') { moveRightInterval(); }
  }
;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  process.stdin.on('data', (key) => {
    if (key === 's') {
      lastPressedKey = 's';
    }
    if (key === 'w') {
      lastPressedKey = 'w';
    }
    if (key === 'd') {
      lastPressedKey = 'd';
    }
    if (key === 'a') {
      lastPressedKey = 'a';
    }
    if (key === 'q') {
      process.exit();
    }
  });

  /* let moveDownInterval = 0;
let moveUpInterval = 0;
let moveRightInterval = 0;
let moveLeftInterval = 0; */
  setInterval(index, 60);
};
startGame();
module.exports = {
  startGame: startGame
};
