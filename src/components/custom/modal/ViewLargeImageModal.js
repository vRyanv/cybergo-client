export default function ViewLargeImageModal() {
    return (<>
        <div className="modal fade" id="image_larger_modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg large-image-model" role="document">
                <div className="modal-content" style={{backgroundColor: 'transparent', border: 'none'}}>
                    <div className="modal-body">
                        <img className="rounded" src="#" alt="large-image"
                             id="large_image" style={{maxWidth: '100%'}}/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}