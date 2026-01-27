import "./styles.css";
import qrCodeImg from "../../assets/QRcode02.png";

export default function Login() {
  return (
    <div className="login-container">

      {/* LADO ESQUERDO */}
      <div className="login-left">
        <img src={qrCodeImg} alt="QR Presença" className="login-logo" />
        <h1>Bem-vindo ao<br />QR Presença</h1>
        <p>Faça login para continuar</p>
      </div>

      {/* LADO DIREITO */}
      <div className="login-right">
        <h2>Entrar</h2>

        <form className="login-form">
          <label>
            Email
            <input type="email" placeholder="seu@email.com" />
          </label>

          <label>
            Senha
            <input type="password" placeholder="••••••••" />
          </label>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Lembrar-me
            </label>

            <a href="#">Esqueci a senha</a>
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
      </div>

    </div>
  );
}
