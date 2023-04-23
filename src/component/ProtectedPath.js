import React from 'react';
import { Redirect } from 'react-router-dom';
function ProtectedPath({children}) {
    //token ovolamiza, tekshiramiza token bormi yoki yoqmi yoki tokeni voqti tugamaganmi va uni tekshirish uchun xozirgi voqtni ovolamiza va unga solishtiramiza agar expires_at kotta bulsa
    let date=new Date().getTime();
    let token=localStorage.getItem('token');
    let expires_at=localStorage.getItem('expires_at')
    expires_at=new Date(expires_at).getTime();//default xolatida 1970 yildan boshlab secundi beri lekin Date(expires_at)bervommiza xozirgi vaqtdan shu exprie buladigan vaqtgacham sekunda beradi, shunda xozirgi vaqt kichkina buladi
    //console.log(expires_at); 

    if(date>expires_at || !expires_at || !token)//date expires_at dan katta bulsa yoki expires_at bulmasa yoki token bulmasa login page utqizvor, shuni tekshirish uchun localstorage dan token bn exipires_at ni uchirib tashlaymiza, va endi browserni urlga yozsak http://localhost:3000/products deb bizani products page ga utqazmaydi
    {
        return <Redirect to ="/login"/>
    }

    {/*birnima shartlani bajaryapmiza va return children qilsa usha App.js ni ichida protectpathni ichidagi component ochildi ya'ni products, endi teppada tekshiramiza*/}
    return children
}

export default ProtectedPath;