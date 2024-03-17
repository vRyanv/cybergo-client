export default function UseNavIsClose(){
    const nav = document.getElementsByClassName('sidebar')
    if(nav.length && nav[0].classList.contains('open')){
        return true
    }
    return false
}