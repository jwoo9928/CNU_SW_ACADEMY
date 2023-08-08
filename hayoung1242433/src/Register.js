import { useRef, useState, useEffect } from "react"
// 세가지 링크 import 
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "./img/register-img.jpg"
import InputField from './InputField.js'

// vaildate userName, vaildate passwordName 
//정규표현식으로 user과 pwd 가 어떨 지 추정 
const USER_REGEX = /^[가-힣]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MOBILE_REGEX = /^\d{3}-\d{4}-\d{4}$/;


const Register = () => {
    const userRef = useRef(); // set the focus on the user input when the component loads 
    const errRef = useRef(); // if we get an error we need to put the focus on so it can be announced by a screen reader 
  
    // useState for the user field
    // 1) 이름 
    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false); // whether the name validates or not 
    const [userFocus, setUserFocus] = useState(false); // focus input field 
    // 2) 모바일 
    const [mobile, setMobile] = useState('')
    const [validMobile, setValidMobile]  = useState(false);
    const [mobileFocus, setMobileFocus]  = useState(false);

    // 2)비밀번호 
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false); // whether the name validates or not 
    const [pwdFocus, setPwdFocus] = useState(false);
    //) 이메일 칸 !!!
    const [email, setemail] = useState('')
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] =useState(false);
    //) 4) 비밀번호 확인란 
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // 4) 에러가 생성되었을 때 / 성공시 메세지가 떴나 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    // setting the focus when the component loads notice there`s nothing in the dependency array
    useEffect(() => {
        userRef.current.focus();
    }, [])    
    // applied to the user name and this is where we validate the username 
    //(userstate가 deopendency array에 있는 것 명심!) => 바뀔때마다 확인 가능 (result로 확인할 예정)
    useEffect( () => {
        const result = USER_REGEX.test(user); /*?*/
        console.log(result);
        console.log(user);
        setValidName(result); 
    }, [user])
    // 모바일 기종 
    useEffect ( () => {
        const result = MOBILE_REGEX.test(mobile);
        console.log(result);
        console.log(mobile);
        setValidMobile(result);
    } , [mobile])
    // email 
    useEffect( () => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
        
    } , [email])
    // checking the vaild password 
    useEffect( () => {
        const result = PWD_REGEX.test(pwd); /*?*/
        console.log(result);
        console.log(pwd);
        setValidPwd(result); 
        setValidMatch(pwd === matchPwd && result === true);
    }, [pwd , matchPwd]) // 하나 바뀌면 체크 들어감  
    // errmsg / change info change the one of state pieces (, 뒤에 있는 dependency array 안의 것  )
    // errmsg 읽고 changes 할 수 있게 


   
    useEffect( () => {
        setErrMsg('');
    }, [user, pwd,matchPwd,email,mobile]) // 하나 바뀌면 다른 것도 바뀜 

   

    // displayed top of the form
    return (
        <div className = 'flex-container'>
        <div className = "image-container">
        <img src = {Image} className = "image"></img>
             </div>
        <section className = "form-container">
        <p ref = {errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        
        <h1>로그인 페이지</h1>
        <form>
            <InputField id="username"
            label="이름"
            valid={validName}
            useryRef = {userRef}
            value={user}
            valueFocus = {userFocus}
            onChange={setUser}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}/>


            <InputField id = "userMobile"
            label = "모바일"
            valid = {validMobile}
            useryRef = {userRef}
            value ={mobile}
            valueFocus = {mobileFocus}
            onChange = {setMobile}
            required
            onFocus = { () => setMobileFocus(true)}
            onBlur = { () => setMobileFocus(false)} /> 

          <InputField
            id="userEmail"
            label="이메일"
            useryRef = {userRef}
            valid={validEmail}
            value={email}
            valueFocus = {emailFocus}
            onChange={setemail}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />

            <InputField 
             id = "userPassword"
             label = "비밀번호"
             useryRef = {userRef}
             valid = {validPwd}
             value = {pwd}
             valueFocus = {pwdFocus}
             onChange = {setPwd}
             required 
            onFocus = { () => setPwdFocus(true)}
            onBlur = { () => setPwdFocus(false)} /> 

          
          <InputField
             id = "confirm_pwd"
             label = "비밀번호 확인"
             useryRef = {userRef}
             valid = {validMatch}
             value = {matchPwd}
             valueFocus = {matchFocus}
             onChange = {setMatchPwd}
             required
             onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
                        />
                        
               
<label htmlFor="input">
입력창  
<p>                   
<select id = "input" name = "input">
      <option value="">선택하세요</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </select>
      
    </p> </label>
                        

                        
           


             
<button disabled = {!validName || !validPwd || !validEmail ? true : false}
          >submit</button>
            
        
        
        
        </form>

        </section> </div>
        // errMsg가 존재하면 errMsg가 추가 / 아니면 offscreen
        // arialive -assertive-> errref 가진 특성에 집중시 announced with a screen reader 
        // each input should have a label element 
        // htmlFor attribute that needs to match the id of the input
        // onBlur => leave it 
        // <p> 단락으로 => userFocus가 true이고 user가 존재할 경우
        // FontAwesomeIcon icon = {faInfoCircle}  => 어떤 icon을 쓸건지 
        // <span>을 이용한 icon 띄어주기 
        // 굳이 비밀번호 자체를 비교할 필요 없기 때문에 id확인 칸은 조금 단순한 편 

    )
}



export default Register
