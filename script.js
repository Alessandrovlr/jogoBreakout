const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let gameOver = false
let pontos= 0

// function congelaTela(){
//     document.getElementById('overlay').style.display = 'block'
// }

document.addEventListener("click", (e) =>{
    if(gameOver){
        location.reload()
    }
})

class Objetos{
    #gravidade
    constructor(x,y, largura, altura){
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.#gravidade = 0.6
    }

    desenha = function(ctx, cor){
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

    getGrav = function(){
        return this.#gravidade
    }

    


}

class Raquete extends Objetos{
    #velocidadex
    #saiuE
    #saiuD
    constructor(x, y, largura, altura){
        super(x,y,largura,altura)
        this.#velocidadex = 0
        this.#saiuE = false
        this.#saiuD = false
    }

    moverEsquerda = function(){
        if(this.#saiuE){
            this.#velocidadex = 0
            
        }else{
            this.#velocidadex -= 30
            this.#saiuD= false
        }
       
    }

    moverDireita = function(){
        if(this.#saiuD){
            this.#velocidadex = 0
            
        }else{
            this.#velocidadex += 30
            this.#saiuE = false
        }
    }

    atualizar = function(){
        this.x += this.#velocidadex
        this.#velocidadex = 0
        if(this.x == canvas.width - 70){
            this.#velocidadex = 0
            this.#saiuD = true
            console.log("saiu")
        }
        if(this.x <= 0){
            this.#velocidadex = 0
            this.#saiuE = true
            console.log("saiu")
        }
    }

}

class Bola extends Objetos{
    #velocidadex
    #velocidadey
    #raio

    constructor(x, y, raio) {
        super(x, y, raio * 2, raio * 2)
        this.#raio = raio
        this.#velocidadex = 2
        this.#velocidadey = 2
    }

    get raio() {
        return this.#raio
    }

    set raio(novoRaio) {
        if (novoRaio > 0) {
            this.#raio = novoRaio
            this.largura = novoRaio * 2
            this.altura = novoRaio * 2
        }
    }

    desenha = function(ctx, cor){
        ctx.beginPath()
        ctx.fillStyle = cor
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }


    mover (){
        this.x += this.#velocidadex
        this.y += this.#velocidadey
    }

    vColisaoParedes = function(){
        if (this.x <= 0 || this.x + this.largura >= canvas.width) {
            this.#velocidadex *= -1
        }

        if (this.y <= 0) {
            this.#velocidadey *= -1
        }
    }

    vColisaoRaquete = function(){
        if (
            this.y + this.altura >= personagem.y &&
            this.x + this.largura >= personagem.x &&
            this.x <= personagem.x + personagem.largura
        ) {
            this.#velocidadey *= -1
        }
    }

    vColisaoBlocos = function(){
        for (let i = 0; i < blocos.length; i++) {
            let bloco = blocos[i]
            if (
                this.x + this.largura > bloco.x &&
                this.x < bloco.x + bloco.largura &&
                this.y + this.altura > bloco.y &&
                this.y < bloco.y + bloco.altura
            ) {
                blocos.splice(i, 1)
                pontos += 1
                this.#velocidadey *= -1
                break
            }
        }
    }

    vBolaCaiu = function(){
        if (this.y >= canvas.height) {
           this.hGameOver()
        }
        
    }

    hGameOver = function(){
        this.#velocidadex = 0
        this.#velocidadey = 0
        ctx.fillStyle = 'red'
        ctx.fillRect((canvas.width/2)-200, (canvas.height/2)-50, 400, 100)
        ctx.fillStyle='black'
        ctx.font="50px Arial"
        ctx.fillText("Game Over", (canvas.width/2)-130, (canvas.height/2) +15)
        gameOver = true
        // congelaTela()
    }

    atualizar() {
        this.vColisaoParedes()
        this.vColisaoRaquete()
        this.vColisaoBlocos()
        this.vBolaCaiu()
        
    }

}

class Obstaculo extends Objetos{
    #destruido
    constructor(x, y, largura, altura){
        super(x,y,largura,altura)
        this.#destruido = false
    }

    desenha = function (ctx, cor){
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

    
}

document.addEventListener('keypress', (e) =>{
    switch (e.code) {
        case 'KeyA':
            personagem.moverEsquerda()
            console.log("a")
            break
    
        case 'KeyD':
            personagem.moverDireita()
            console.log("d")
            break
    }
})


const blocos = []
const largura = 75
const altura = 20
const linhas = 5
const colunas = 6
const espacamento = 10
const margemX = 50
const margemY = 50
for (let linha = 0; linha < linhas; linha++) {
    for (let coluna = 0; coluna < colunas; coluna++) {
        let x = coluna * (largura + espacamento) + margemX
        let y = linha * (altura + espacamento) + margemY
        
        blocos.push(new Obstaculo(x, y, largura, altura))
    }
}

function desenharBlocos(ctx) {
    blocos.forEach(bloco => bloco.desenha(ctx, 'yellow'))
}

const personagem = new Raquete (50,canvas.height-40, 70, 10)
const bolinha = new Bola(70,canvas.height -100, 7,7)

desenhaPontuacao = function(){
    ctx.fillStyle='white'
    ctx.font="20px Arial"
    ctx.fillText(`pontos: ${pontos}`,30,40)
}

function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    personagem.desenha(ctx, 'white')
    bolinha.desenha(ctx, 'red')
    desenharBlocos(ctx, 'yellow')
    personagem.atualizar()
    bolinha.mover()
    bolinha.atualizar()
    desenhaPontuacao()
    requestAnimationFrame(loop)
}

loop()