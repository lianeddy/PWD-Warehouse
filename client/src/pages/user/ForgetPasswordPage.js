import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { authRegisteredCheck, authSecurityAnswerCheck, authChangePasswordEmailRequest } from "../../redux/actions/authAction"

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [answer, setAnswer] = useState("")

    const dispatch = useDispatch()
    const { changePermitted, security_question, isLoading, errorMessage, id} = useSelector(state => state.authReducer)

    if(changePermitted) {
        return (
            <Redirect to="/change-password" />
        )
    }
    
    if(id){
        return (
            <div style={styles.style1}>
                <div style={styles.style2}>
                    <div style={{margin: "0 0 3px 0"}}>
                        Security Question:
                    </div>
                    <div style={{margin: "0 0 10px 0"}}>
                        {security_question}
                    </div>
                    <input
                        type="text"
                        id="securityAnswer"
                        placeholder="Jawaban Anda"
                        onChange={(e) => setAnswer(e.target.value)}
                        style={{margin: "0 0 10px 0"}}
                    />
                    <div style={{margin: "0 0 10px 0"}}>
                        {errorMessage}
                    </div>
                    <button
                        onClick={() => dispatch(authSecurityAnswerCheck({
                            email,
                            answer,
                        }))}
                        style={{margin: "0 0 10px 0"}}
                    >
                        Confirm
                    </button>
                    <div>Lupa jawabannya? Klik&nbsp;
                        <a
                            onClick={() => dispatch(authChangePasswordEmailRequest({email}))}
                            style={{fontWeight: "bold"}}
                        >
                            disini
                        </a>
                    </div>
                    <div>{isLoading ? "Mengirim link ganti password ke email anda..." : null}</div>
                </div>
            </div>
        )
    }

    return (
        <div style={styles.style1}>
            <div style={styles.style2}>
                <div
                    style={{margin: "0 0 10px 0"}}
                >Masukkan email anda</div>
                <input
                    type="text" 
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{margin: "0 0 10px 0"}}
                />
                <div style={{textAlign: "center"}}>{errorMessage}</div>
                <button
                    onClick={() => dispatch(authRegisteredCheck({email}))}
                    style={{margin: "5px 0 0 0"}}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

const styles = {
    style1: {
        height: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    style2: {
        backgroundColor: "white",
        boxShadow: "2.5px 2.5px 10px rgba(0,0,0,0.2)",
        height: "400px",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
}

export default ForgetPasswordPage
