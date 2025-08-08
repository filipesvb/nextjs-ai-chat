import styles from './chatbubbleoption.module.css'

export const ChatBubbleOption = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={`${styles.button} relative cursor-pointer px-4 py-2 rounded-xs text-[#3c5466]`}>
            <div className={styles.background}></div>
            {children}
        </button>
    )
}