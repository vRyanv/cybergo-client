export default function UseLocalStorage(){
    const saveLocal = (key, value) => {
        localStorage.setItem(key, value);
    }
    const getLocal = (key) => {
        return localStorage.getItem(key)
    }
    return [getLocal, saveLocal]
}