//+ in the name of cross
//# link: https://www.codewars.com/kata/51fda2d95d6efda45e00004e/train/javascript
// it must support rank, progress and the incProgress(rank) method
class User {
  User() {
    this.rank = -8;
    this.progress = 0;
  }

  incProgress(rank) {
    const maxProgress = 100;
    const maxRank = 8;
    const lowestRank = -8;
    const noSuchRank = 0;
    // if two level higher than user 10 * d * d (d difference between ranks)
    // if one level same as user 3 points
    // if the rank lower than the user by one 1 points
    // if the rank lower than user by 2 or more ignored;
    //if progress >= 100 (inc higher & reset progress to zero)
    //! Note: there is no ranking 0 it's -8, ...., -1, 1, ...., 8
    //! Note: if he reached rank 8 there is no more progress
    if (this.rank == maxRank) return;
    if (rank > maxRank || rank < lowestRank || rank == noSuchRank) return;
  }
}
