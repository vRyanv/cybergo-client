

function useLoading(is_show){
    const loading = document.getElementById('loader_bg')
    if(is_show){
        loading.style.display = 'block'
    } else {
        loading.style.display = 'none'
    }
}

export default useLoading