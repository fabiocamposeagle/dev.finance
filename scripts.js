const Modal = {
    open(){
      document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
    },
    close(){
      document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
    }
}


const transactions = [
    {
        id: 1,
        description: "Luz",
        amount: -50001,
        data: "23/01/2021",
    },
    {
        id: 2,
        description: "Website",
        amount: 500000,
        data: "23/01/2021",
    },
    {
        id: 3,
        description: "Internet",
        amount: -20012,
        data: "23/01/2021",
    },
    {
        id: 4,
        description: "App",
        amount: 200000,
        data: "23/01/2021",
    },
]

const Transaction = {
    all: transactions,// fatoração, deixar um pouco mais claro ou expandir de alguma forma
    incomes() {
        let income = 0;
        // pegar todas as transação 
        // para cada transação,
        Transaction.all.forEach(transaction => {
            // se ela for maior que zero
            if( transaction.amount > 0) {
                // somar uma variavel e retorna a variavel
                income += transaction.amount;
            }
       })
        return income;
    },
    expenses() {
        let expense = 0;
        // pegar todas as transaçoes
        // para cada transação,
        Transaction.all.forEach(transaction => {
            // se ela for menor que zero
            if( transaction.amount < 0) {
                // somar uma variavel e retorna a variavel
                expense += transaction.amount;
            }
        })    
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}   
// Substituir os dados dp html com os dados JS
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addtransaction(transaction, index) {
        const  tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : 
        "expense"
    
        const amount = Utils.formaCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="data">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
      `

      return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formaCurrency(Transaction.incomes(
            ))
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formaCurrency(Transaction.expenses(
            ))
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formaCurrency(Transaction.total()
            )
    }
}


const Utils = {
    formaCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}


transactions.forEach(function(transaction) {
    DOM.addtransaction(transaction)
})

DOM.updateBalance()




