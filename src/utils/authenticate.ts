interface APIResponse extends Response {

}

export default async function authenticate(authUri: string, reqBody: any) {
    try {
        const response = await fetch(`/api/auth/${authUri}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        const result = await response.json();

        if (result.type === 'error') throw new Error(result.message.message);
        return result.message;

    } catch (err) {
        throw err;
    }
}