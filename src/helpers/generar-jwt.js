import jwt from 'jsonwebtoken';
export const generarJWT = (uid, exptoken) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ uid:uid }, process.env.PRIVATE_kEY, { expiresIn: exptoken }, (err,token) => {
            if(err){
                console.log(err);
                reject("No se pudo generar el Token");
            }
            else{
                resolve(token);
            }

    })
    });
}