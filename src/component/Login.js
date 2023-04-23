import React from 'react';
import axios from "axios";
import {toast} from 'react-toastify';

function Login(props) {
    function userLogin(e){
        e.preventDefault()
        let userName=e.target.userName.value;
        let password=e.target.password.value;
        let subDomain=e.target.subdomain.value;
        //va bularni kiritish shart bulish kerak inputda uning uchun required dib yozib quyamiza
        //va endi object yaratamiza, masalan _username buyoda usha post qilib bervoridigan datamiza ili parametr keylari usha docs.google.com da yozilgan
       let newObj={
            _username:userName,
            _password:password,
            _subdomain:subDomain
        };

        //yoki bulmasam formDatedan foydalanamiza tepadagi newObj ni urniga asosan input type file bulsa ishlatamiza, masalan rasim yuklash kerak bulib qolsa newObj ni urniga formDateni bervoramiza
        /*let formDate=new FormData();
        formDate.set("_username", userName);
        formDate.set("_password", password);
        formDate.set("_subdomain", subDomain);*/


        //1chi curly bracket butda data bulyapti, 2chi curly bracketda config bulyapti masalan cursorni olib kelsak xam shuni kursatadi, agar post bulmasdan get bulganda paqat config bulardi, shunda data da newObj bervoriladi, configda esa headerbervoramiza usha docs.google.dan olib
        axios.post(` https://${subDomain}.ox-sys.com/security/auth_check`,newObj,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then((res)=>{
            toast.success('Ok');

            localStorage.setItem("expires_at", res.data?.expires_at); //shunda biza console ochganimizada Application tanlaymiza Local storage, local hostni ichida saqlaydi
            localStorage.setItem("token", res.data?.token);
            props.history.push("/products");
            console.log(props)// index.js da bizada browser route ga appni olganmiza usha browser route propsiga bir nimala qushvoradi va ushandan biza props.history.push("/product");
        //ushanda agar muvoffaqiyatli utsa expires_at va token local storage saqlab quy va props.history.push("/product"); productga otvor

        }).catch((e)=>{
            toast.error(e.message)
        })

//endi bizaga ya'na bitta component kerak userni xaqiqatdan royxatdan utgan yoki utmaganligini tekshirish uchun va uni nomini ProtectedPath dib nomlab quyamiza, chunki agar biza http://localhost:3000/products dib yozsak va usha localstorage dan delete qilsak expires_at va token unda utib ketib qolishi mumkin registratsia bugan va bumagan userla. Ushaning uchun biza App.js ni ichida productsni ProtectedPathga ichiga tushirib quyamiza yani productni Protectedpathga o'ravolamiza, shunda agar ruyxatdan utmagan bulsa login utqizvoraman agar utgan bulsa Products ga utqizvoraman !!!App.jsga kirgin kurasan
    }
    return (<div className="row">
    <div className="col-xl-4 offset-4">
        <div className="card">
            <div className="card-header text-center">
                <h4>Login</h4>
            </div>
            <div className="card-body">
                <form onSubmit={userLogin}>
                    <label htmlFor="userName">UserName</label>
                    <input
                        required={true}
                        className="form-control mb-3"
                        name="userName"
                        id="userName"
                        type="text"/>

                    <label htmlFor="password">Password</label>
                    <input
                        required={true}
                        className="form-control mb-3"
                        name="password"
                        id="password"
                        type="password"/>

                    <label htmlFor="subdomain">Subdomain</label>
                    <input
                        required={true}
                        className="form-control mb-3"
                        name="subdomain"
                        id="subdomain"
                        type="text"/>
                        <button  type="submit" className="btn btn-dark w-100">login</button>
                </form>
            </div>
        </div>
    </div>
</div>
    );
}

export default Login;