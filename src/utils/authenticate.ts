interface APIResponse extends Response {

}

export default async function authenticate(authUri: string, reqBody: any) {
    try {
        let response = await fetch(`/api/auth/${authUri}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });

        response = await response.json();

        return response;

        // if (response.error) return response.error;
        // if (response.body.error) return response.body;
    } catch (err) {
        return err;
    }
}