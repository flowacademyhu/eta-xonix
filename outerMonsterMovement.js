let temporaryXDirection = 0;
let temporaryYDirection = 0;
const outerMonsterMovement = (outerMonster, gameBoard) => {
  if (outerMonster.xPosition === gameBoard.length - 1 || outerMonster.xPosition === 0 || gameBoard[outerMonster.xPosition - 1][outerMonster.yPosition] === 1 || gameBoard[outerMonster.xPosition + 1][outerMonster.yPosition] === 1 || gameBoard[outerMonster.xPosition - 1][outerMonster.yPosition] === 3 || gameBoard[outerMonster.xPosition + 1][outerMonster.yPosition] === 3) {
    outerMonster.xDirection *= -1;
  }
  if (outerMonster.yPosition === gameBoard[outerMonster.xPosition].length - 1 || outerMonster.yPosition === 0 || gameBoard[outerMonster.xPosition][outerMonster.yPosition - 1] === 1 || gameBoard[outerMonster.xPosition][outerMonster.yPosition + 1] === 1 || gameBoard[outerMonster.xPosition][outerMonster.yPosition - 1] === 3 || gameBoard[outerMonster.xPosition][outerMonster.yPosition + 1] === 3) {
    outerMonster.yDirection *= -1;
  }
  const temp = {
    x: outerMonster.xPosition,
    y: outerMonster.yPosition
  };

  outerMonster.xPosition += Number(outerMonster.xDirection);
  outerMonster.yPosition += Number(outerMonster.yDirection);
  gameBoard[outerMonster.xPosition][outerMonster.yPosition] = 4;
  gameBoard[temp.x][temp.y] = 0;
  if (outerMonster.xPosition === gameBoard.length - 1 || outerMonster.xPosition === 0 || gameBoard[outerMonster.xPosition - 1][outerMonster.yPosition] === 1 || gameBoard[outerMonster.xPosition + 1][outerMonster.yPosition] === 1) {
    temporaryXDirection = outerMonster.xDirection * -1;
  }
  if (outerMonster.yPosition === gameBoard[outerMonster.xPosition].length - 1 || outerMonster.yPosition === 0 || gameBoard[outerMonster.xPosition][outerMonster.yPosition - 1] === 1 || gameBoard[outerMonster.xPosition][outerMonster.yPosition + 1] === 1) {
    temporaryYDirection = outerMonster.yDirection * 1;
  }
  return gameBoard;
};

const directionExport = () => {
  return [temporaryXDirection, temporaryYDirection];
};

module.exports = {
  outerMonsterMovement: outerMonsterMovement,
  directionExport: directionExport
}
;
