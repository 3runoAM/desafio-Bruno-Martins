class CaixaDaLanchonete {
    menu = {
        cafe: 3.00,
        chantily: 1.50,
        combo1: 9.50,
        combo2: 7.50,
        queijo: 2.00,
        salgado: 7.25,
        sanduiche: 6.50,
        suco: 6.20
    }
    paymentMethods = {
        debito: 0,
        dinheiro: 0.05,
        credito: 0.03
    }
    calcularValorDaCompra(metodoDePagamento, itens) {
        let cart = this.convertToCart(itens);
        try {
            this.validateEmptyCart(cart);
            this.validateCodeAndQuantity(cart);
            this.validateExtras(cart);
            this.validatePaymentMethod(metodoDePagamento);
            return this.calculateTotal(metodoDePagamento, cart);
        } catch (erro) {
            return erro;
        }
    }

    convertToCart(itens) {
        let cart = {};
        itens.forEach((item) => {
            let currentItemInfo = item.split(",");
            cart[currentItemInfo[0]] = currentItemInfo[1];
        })
        return cart;
    }

    validateEmptyCart(cart) {
        if (!Object.keys(cart).length) {
            throw "Não há itens no carrinho de compra!";
        }
    }

    validateCodes(code){
        if (!this.menu.hasOwnProperty(code)){
            throw "Item inválido!";
        }
    }

    validateQuantity(quantity){
        if (quantity <= 0){
            throw "Quantidade inválida!";
        }
    }

    validateCodeAndQuantity(cart) {
        for(const [code, quantity] of Object.entries(cart)){
            this.validateCodes(code);
            this.validateQuantity(quantity);
        }
    }

    validateExtras(cart){
        this.validateExtra('cafe', 'chantily', cart);
        this.validateExtra('sanduiche', 'queijo', cart);
    }

    validateExtra(prin, comp, cart){
        if (cart.hasOwnProperty(comp) && !cart.hasOwnProperty(prin)){
            throw 'Item extra não pode ser pedido sem o principal';
        }
    }

    validatePaymentMethod(paymentMethod){
        if (!this.paymentMethods.hasOwnProperty(paymentMethod)){
            throw 'Forma de pagamento inválida!';
        }
    }

    applyDiscountOrSurcharge(paymentMethod, total){
        if (paymentMethod === 'credito') {
            return total + total * this.paymentMethods[paymentMethod];
        }
        if (paymentMethod === 'dinheiro'){
            return total - total * this.paymentMethods[paymentMethod];
        }
        return total;
    }

    calculateTotal(paymentMethod, cart){
        let total = 0;
        for (const [code, quantity] of Object.entries(cart)){
            total += this.menu[code] * quantity;
        }
        total = this.applyDiscountOrSurcharge(paymentMethod, total);
        total = Number(total.toFixed(2));
        return total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
}
export { CaixaDaLanchonete };