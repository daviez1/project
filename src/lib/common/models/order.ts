export class OrderItem {
    menuItemId: string;
    name: string;
    quantity: number;
    notes?: string;

    public constructor(
        menuItemId: string,
        quantity: number,
        name: string,
        notes?: string
    ) {
        this.menuItemId = menuItemId;
        this.name = name;
        this.quantity = quantity;
        this.notes = notes;
    }
}

export class Order {
    id: string;
    items: OrderItem[];
    status: 'pending' | 'preparing' | 'ready' | 'completed';
    total: number;
    createdAt: Date;
    updatedAt: Date;

    public constructor(
        id: string,
        items: OrderItem[],
        status: 'pending' | 'preparing' | 'ready' | 'completed',
        total: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.items = items;
        this.status = status;
        this.total = total;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
