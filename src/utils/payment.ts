// Web Crypto API is used for compatibility

export const generateEsewaSignature = async (secret: string, message: string) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const msgData = encoder.encode(message);

    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, msgData);
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
};

export const initiateEsewaPayment = async (data: any) => {
    const { amount, transaction_uuid, product_code, secret } = data;
    const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = await generateEsewaSignature(secret, message);
    return signature;
};
