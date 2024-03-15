export default function NotificationItem({content, from}) {
    return (
        <a href="#">
            <div className="dropdown-item">
                <h6 className="mb-0">{content}</h6>
                <small>{from}</small>
            </div>
            <hr className="dropdown-divider"/>
        </a>
    )
}