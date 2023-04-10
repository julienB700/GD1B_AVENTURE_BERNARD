class Player {
  constructor() {
    this.health = 9;
    this.isHit = false;
  }
  
  hit() {
    if (!this.isHit) {
      this.health -= 1;
      this.isHit = true;

      setTimeout(() => {
        this.isHit = false;
      }, 1000); // 1-second delay
    }
    }
  }