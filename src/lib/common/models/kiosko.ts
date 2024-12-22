export class KioskoItem {
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
    ){
        this.id = id,
        this.name = name,
        this.description = description,
        this.price = price,
        this.image = image,
        this.category = category,
        this.available =available
    }
}
  
export class KioskoCategory {
    id: string;
    name: string;
    items: KioskoItem[];

    public constructor(
        id: string,
        name: string,
        items: KioskoItem[]
    ) {
        this.id = id;
        this.name = name;
        this.items = items;
    }
}
