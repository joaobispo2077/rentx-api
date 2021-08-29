import { v4 as uuid } from 'uuid';

class Specification {
  constructor(
    public name: string,
    public description: string,
    public created_at: Date,
    public id?: string,
  ) {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Specification };