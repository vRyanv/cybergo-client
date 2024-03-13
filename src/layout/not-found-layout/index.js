import style from './not-found.module.css'

export default function NotFoundLayout({children}){
    return (
        <div className={style.root}>{children}</div>
    )
}