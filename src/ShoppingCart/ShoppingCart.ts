import config from "../config/CartConfig";

export class ShoppingCart {
  data: any = {
    items: [],
    totals: 0,
    formattedTotals: "",
  };

  constructor() {}

  public inCart(productId = 0) {
    let found = false;
    this.data.items.forEach((item) => {
      if (item.id === productId) {
        found = true;
      }
    });

    return found;
  }

  public calculateTotals() {
    this.data.totals = 0;

    this.data.items.forEach((item) => {
      let price = item.price;
      let quantity = item.quantity;
      let amount = price * quantity;

      this.data.totals += amount;
    });

    this.setFormattedTotals();
  }

  setFormattedTotals() {
    let format = new Intl.NumberFormat(config.locale.lang, {
      style: "currency",
      currency: config.locale.currency,
    });
    let totals = this.data.totals;
    this.data.formattedTotals = format.format(totals);
  }

  addToCart(product = null, quantity = 1) {
    if (!this.inCart(product.product_id)) {
      let format = new Intl.NumberFormat(config.locale.lang, {
        style: "currency",
        currency: config.locale.currency,
      });

      let prod = {
        id: product.product_id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image,
        formattedPrice: format.format(product.price),
      };

      this.data.items.push(prod);
      this.calculateTotals();
    }
  }

  saveCart(request) {
    if (request.session) {
      request.session.cart = this.data;
    }
  }

  removeFromCart(id = 0) {
    console.log(id);
    for (let i = 0; i < this.data.items.length; i++) {
      let item = this.data.items[i];
      if (item.id === id) {
        this.data.items.splice(i, 1);
        console.log(this.data);
        this.calculateTotals();
      }
    }
  }

  emptyCart(request) {
    this.data.items = [];
    this.data.totals = 0;
    this.data.formattedTotals = "";
    if (request.session) {
      request.session.cart.items = [];
      request.session.cart.totals = 0;
      request.session.cart.formattedTotals = "";
    }
  }

  updateCart(ids = [], qtys = []) {
    let map = [];
    let updated = false;

    ids.forEach((id) => {
      qtys.forEach((quantity) => {
        map.push({
          id: parseInt(id, 10),
          quantity: parseInt(quantity, 10),
        });
      });
    });

    map.forEach((obj) => {
      this.data.items.forEach((item) => {
        if (item.id === obj.id) {
          if (obj.quantity > 0 && obj.quantity !== item.quantity) {
            item.quantity = obj.quantity;
            updated = true;
          }
        }
      });
    });

    this.calculateTotals();
    if (updated) {
      this.calculateTotals();
    }
  }
}
