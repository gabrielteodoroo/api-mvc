export type ProductProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(readonly props: ProductProps) {}

  static create(name: string, price: number) {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      quantity: 0,
    });
  }

  static with(id: string, name: string, price: number, quantity: number) {
    return new Product({
      id,
      name,
      price,
      quantity,
    });
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  get quantity() {
    return this.props.quantity;
  }

  buy(amount: number) {
    this.props.quantity += amount;
  }

  sell(amount: number) {
    if (this.props.quantity < amount) {
      throw new Error("A quantidade do produto não é suficiente para a venda");
    }

    this.props.quantity -= amount;
  }
}
