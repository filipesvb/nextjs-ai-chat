import styles from './chat.module.css'
import { IconSend } from "../Icons"

export const ChatForm = ({ input, handleInputChange, handleSubmit, disabled }) => {
    return (<form className={styles.form} onSubmit={handleSubmit}>
        <input 
            disabled={disabled}
            className={styles.input} 
            placeholder="Digite sua mensagem..."
            required
            onChange={handleInputChange}
            value={input}
        />
        <button disabled={disabled}  className={styles.btn}>
            <IconSend />
        </button>
    </form>)
}