// in the name of cross
// link: https://www.codewars.com/kata/51fda2d95d6efda45e00004e/train/javascript
// it must support rank, progress and the incProgress(rank) method
function getDifference(currentRank, kataRank) {
  let factor = 0;
  if (currentRank < 0 && kataRank >= 0) factor = 1;
  if (kataRank < 0 && currentRank >= 0) factor = -1;
  return kataRank - currentRank - factor;
}
const OneOrManyLevelHigherRole = {
  isTrue: function isOneOrManyLevelHigher(currentRank, kataRank) {
    return getDifference(currentRank, kataRank) >= 1 ? true : false;
  },
  getThePoints: function getOneOrManyLevelHigherPoints(currentRank, kataRank) {
    const difference = getDifference(currentRank, kataRank);
    return 10 * difference * difference;
  },
};
const sameLevelRole = {
  isTrue: function isSameLevel(currentRank, kataRank) {
    return getDifference(currentRank, kataRank) == 0 ? true : false;
  },
  getThePoints: function getSameLevelPoints(currentRank, kataRank) {
    return 3;
  },
};
const oneLevelLowerRole = {
  isTrue: function isOneLevel(currentRank, kataRank) {
    return getDifference(currentRank, kataRank) == -1 ? true : false;
  },
  getThePoints: function getOneLevelPoints(currentRank, kataRank) {
    return 1;
  },
};
const twoOrMoreLevelLowerRole = {
  isTrue: function isTwoOrMoreLevelLower(currentRank, kataRank) {
    return getDifference(currentRank, kataRank) < -1 ? true : false;
  },
  getThePoints: function getTwoOrMoreLevelLowerPoints(currentRank, kataRank) {
    return 0;
  },
};
class User {
  rules = [
    OneOrManyLevelHigherRole,
    sameLevelRole,
    oneLevelLowerRole,
    twoOrMoreLevelLowerRole,
  ];
  rank = -8;
  progress = 0;
  incProgress(kataRank) {
    const maxRank = 8;
    const lowestRank = -8;
    const noSuchRank = 0;
    if (this.rank == maxRank) return;
    if (kataRank > maxRank || kataRank < lowestRank || kataRank == noSuchRank)
      return new Error();
    for (const Rule of this.rules) {
      if (Rule.isTrue(this.rank, kataRank)) {
        this.progress += Rule.getThePoints(this.rank, kataRank);
        this.checkProgress();
        break;
      }
    }
  }
  checkProgress() {
    const maxProgress = 100;
    if (this.progress > maxProgress) {
      const number = Math.floor(this.progress / maxProgress);
      this.progress -= 100 * number;
      this.incRankBy(number);
    }
  }
  incRankBy(number) {
    const maxRank = 8;
    if (this.rank == maxRank) return;
    const oldRank = this.rank;
    this.rank += number;
    if (oldRank < 0 && this.rank >= 0) this.rank++;

    if (this.rank >= maxRank) this.rank = 8;
    if (this.rank == 8) this.progress = 0;
  }
}

const firstUser = new User();

console.log(firstUser.incProgress(9));
console.log(firstUser.incProgress(-9));
console.log(firstUser.incProgress(0));
console.log(firstUser.rank);
console.log(firstUser.progress);
