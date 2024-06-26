/*Os tooltips irão mostrar uma mensagem ao passar com o mouse em cima*/
export default function iniTooltips(){

}

const tooltips = document.querySelectorAll('[data-tooltip]')

tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseOver) //o evento mouseover é ativo quando o mouse passa por cima
})

function onMouseOver (event){
    const tooltipBox = createTooltipBox(this)

    this.addEventListener('mousemove', onMouseMove) //o evento mouseMove como diz o nome, é ativado quando o mouse se mover dentro do target. No objeto é declarado para seguir o cursor.
    onMouseMove.tooltipBox = tooltipBox
    
    onMouseLeave.tooltipBox = tooltipBox //atribuindo ao tooltipBox do objeto onMouseLeave a constante de dentro desta função
    this.addEventListener('mouseleave', onMouseLeave) //o evento mouseleave como diz o nome, é ativado quando o mouse sair do alvo
    onMouseLeave.element=this;

    //console.log(event)
}

const onMouseLeave = {
    
    handleEvent(){
        this.tooltipBox.remove(); //removendo o elemento div criado na função onMouseOver
        this.element.removeEventListener('mouseleave', onMouseLeave)// removendo o evento para nao aparecer na barra de ferramentass do desenvolvedor
       // this.element.removeEventListener('mousemove', onMouseMove)      
    }
}
const onMouseMove = {
    tooltipBox : '',
    handleEvent(event) {
        /* Aqui está pegando o valor de pageY e pageX de onde está o mouse
        e atribuindo ao style do tooltipBox. Fará com que apareça em cima do mouse. */
        this.tooltipBox.style.top = event.pageY + 20 + 'px'  //como o valor que irá puxar é do tipo float, tem que somar com pixel
        this.tooltipBox.style.left = event.pageX + 20 + 'px'
    }
 }



function createTooltipBox(element){
    const tooltipBox = document.createElement('div') //criando um elemento div
    const text = element.getAttribute('aria-label') //pegando o conteudo do aria-label

    tooltipBox.classList.add('tooltip') //adicionando a classe tooltips
    tooltipBox.innerText = text //pegando o que está na constante text e adicionando a tooltipbox

    //adicionando a tooltipbox ao final
    document.body.appendChild(tooltipBox)
    return tooltipBox
}