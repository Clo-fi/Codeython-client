import React from 'react'
import styles from './LoginForm.module.scss'
const LoginForm = () => {
  return (
    <div className={styles.login_page__main_container}>
      <img className={styles.login_page__logo} src="/Imgs/CodeythonLogo_star.png" alt="codeythonLogo" />
      <div className={styles.login_page__login_container}>
        <form>
          <input />
          <input />
          <div>
            <button type="submit">회원가입</button>
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
