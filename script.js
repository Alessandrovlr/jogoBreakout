const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')


class Objetos{
    #gravidade
    constructor(x,y, largura, altura){
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.#gravidade = 0.6
    }

    att = function(){
        //modificar
    }

    desenha = function(ctx, cor){
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

    pontuacao = function(){
        //aa
    }

    getGrav = function(){
        return this.#gravidade
    }
}

class Raquete extends Objetos{
    #velocidadex
    constructor(x, y, largura, altura){
        super(x,y,largura,altura)
        this.#velocidadex = 0
    }

    moverEsquerda = function(){
        this.#velocidadex -= 5

    }

    moverDireita = function(){
        this.#velocidadex += 5
    }

    atualizar = function(){
        this.x += this.#velocidadex
        // if(this.x >= canvas.width -10){
        //     this.#velocidadex = 0
        // }
    }

}

document.addEventListener('keydown', (e) =>{
    switch (e.code) {
        case 'KeyA':
            personagem.moverEsquerda();
            console.log("a");
            break;
    
        case 'KeyD':
            personagem.moverDireita();
            console.log("d");
            break;
    }
})

const personagem = new Raquete (50,canvas.height-40, 70, 10)

function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    personagem.desenha(ctx, 'white')
    personagem.atualizar()
    requestAnimationFrame(loop)
}

loop()