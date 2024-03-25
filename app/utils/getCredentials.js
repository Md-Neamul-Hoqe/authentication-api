import { jwt } from 'jsonwebtoken'
import { cookies } from "next/headers"

export async function login(formData) {
    const user = { email: formData.get('email'), name: formData.get('name') }

    const expires = new Date(Date.now() + 3600)
    const session = await encrypt({ user, expires })

    cookies().set('session', session, { expires, httpOnly: true })
}

export async function encrypt(payload) {
    return await new jwt.sign(payload, 'privateKey', { algorithm: 'RS256' }, function (err, token) {
        console.log(token);
    });
}
