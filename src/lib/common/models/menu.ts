export class MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    available: boolean;

    public constructor(
        id: string,
        name: string,
        description: string,
        price: number,
        image: string,
        category: string,
        available: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.available = available;
    }
}

export class MenuCategory {
    id: string;
    name: string;
    items: MenuItem[];

    public constructor(
        id: string,
        name: string,
        items: MenuItem[]
    ) {
        this.id = id;
        this.name = name;
        this.items = items;
    }
}
