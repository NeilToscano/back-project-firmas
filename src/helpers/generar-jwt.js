import jwt from 'jsonwebtoken';
export const generarJWT = (uuid) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ uuid: "123"}, process.env.PRIVATE_kEY, { expiresIn: '1h' }, (err,token) => {
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