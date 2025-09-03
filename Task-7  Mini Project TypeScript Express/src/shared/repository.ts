export class Repository<T extends { id: string }> {
  private items: T[] = [];

  findAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find(i => i.id === id);
  }

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  update(id: string, data: Partial<T>): T | null {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...data, updatedAt: new Date() };
    return this.items[idx];
  }

  delete(id: string): boolean {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }
}
