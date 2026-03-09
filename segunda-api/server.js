/*Cada endpoint deverá receber dados via query parameters 
ou JSON e retornar o resultado em formato JSON.*/

const express = require("express")
const app = express()

app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})


/*Endpoint 1: Somar números de um array.
 O endpoint deve receber um array por body e 
 somar todos os items do mesmo.
POST /utils/sum-array */

// ENDPOINT 1 - Somar array
app.post("/utils/sum-array", (req, res) => {

    const numbers = req.body.numbers
    const sum = numbers.reduce((acc, num) => acc + num, 0)
    res.json({ result: sum })

})

/*Endpoint 2: Encontrar o maior número do array. 
O endpoint deve receber um array e pesquisar qual é o 
maior número dentro dele.
POST /utils/max-number*/

// ENDPOINT 2 - Maior número
app.post("/utils/max-number", (req, res) => {

    const numbers = req.body.numbers
    const max = Math.max(...numbers)
    res.json({ result: max })

})

/*Endpoint 3: Calcular a média de um array. 
O endpoint deve receber um array de números por body 
e retornar a média dos valores.
POST /utils/average*/

// ENDPOINT 3 - Média
app.post("/utils/average", (req, res) => {

    const numbers = req.body.numbers
    const sum = numbers.reduce((acc, num) => acc + num, 0)
    const average = sum / numbers.length
    res.json({ result: average })

})

/*Endpoint 4: Ordenar um array. 
O endpoint deve receber um array de números por body 
e retornar o array ordenado em ordem crescente.
POST /utils/sort-array*/

// ENDPOINT 4 - Ordenar array
app.post("/utils/sort-array", (req, res) => {

    const numbers = req.body.numbers
    const sorted = numbers.sort((a,b)=>a-b)
    res.json({ result: sorted })

})

/*Endpoint 5: Remover números duplicados. 
O endpoint deve receber um array de números por body e
 retornar o array sem valores repetidos.
POST /utils/remove-duplicates*/

// ENDPOINT 5 - Remover duplicados
app.post("/utils/remove-duplicates", (req, res) => {

    const numbers = req.body.numbers
    const unique = [...new Set(numbers)]
    res.json({ result: unique })

})

/*Endpoint 6: Contar quantidade de elementos no array.
 O endpoint deve receber um array por body e retornar 
 quantos elementos existem nele.
POST /utils/count-items*/

// ENDPOINT 6 - Contar elementos
app.post("/utils/count-items", (req, res) => {

    const numbers = req.body.numbers
    res.json({ result: numbers.length })

})

/*Endpoint 7: Inverter uma string. 
O endpoint deve receber uma string e retornar a 
mesma string invertida.
GET /utils/reverse-string*/

// ENDPOINT 7 - Inverter string
app.get("/utils/reverse-string", (req, res) => {

    const text = req.query.text
    const reversed = text.split("").reverse().join("")
    res.json({ result: reversed })

})

/*Endpoint 8: Contar palavras de um texto. 
O endpoint deve receber uma string e retornar quantas 
palavras existem no texto.
POST /utils/count-words*/

// ENDPOINT 8 - Contar palavras
app.post("/utils/count-words", (req, res) => {

    const text = req.body.text
    const words = text.trim().split(/\s+/)
    res.json({ result: words.length })

})

/*Endpoint 9: Verificar se uma palavra é um palíndromo. 
O endpoint deve receber uma string e verificar se ela 
é igual quando lida de trás para frente.
GET /utils/palindrome*/

// ENDPOINT 9 - Palíndromo
app.get("/utils/palindrome", (req, res) => {

    const word = req.query.word
    const reversed = word.split("").reverse().join("")
    res.json({ result: word === reversed })

})

/*Endpoint 10: Converter texto para camelCase. 
O endpoint deve receber uma frase e converter o texto 
para o formato camelCase.
GET /utils/camelcase*/

// ENDPOINT 10 - CamelCase
app.get("/utils/camelcase", (req, res) => {

    const text = req.query.text
    const words = text.toLowerCase().split(" ")
    const camel = words.map((word,index)=>{
        if(index === 0) return word
        return word.charAt(0).toUpperCase() + word.slice(1)

    }).join("")

    res.json({ result: camel })

})

/* Endpoint 11: Calcular área de um círculo.
O endpoint deve receber o valor do raio e calcular a
área do círculo utilizando a fórmula matemática.
GET /utils/circle-area*/

// ENDPOINT 11 - Área do círculo
app.get("/utils/circle-area", (req, res) => {

    const radius = Number(req.query.radius)
    const area = Math.PI * radius * radius
    res.json({ result: area })

})

/*Endpoint 12: Gerar sequência de Fibonacci. 
O endpoint deve receber um número n e retornar 
os n primeiros números da sequência de Fibonacci.
GET /utils/fibonacci*/

// ENDPOINT 12 - Fibonacci
app.get("/utils/fibonacci", (req, res) => {

    const n = Number(req.query.n)
    const fib = [0,1]
    for(let i=2;i<n;i++){
        fib[i] = fib[i-1] + fib[i-2]
    }

    res.json({ result: fib.slice(0,n) })

})


