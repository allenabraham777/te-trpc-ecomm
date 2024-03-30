const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmailString = (email: string) => {
    return EMAIL_REGEX.test(email);
};

export const emailStringMasker = (email: string) => {
    if (!validateEmailString) throw new Error('Invalid email string');
    const [username, domain] = email.split('@');
    const shortUsername = username?.slice(0, 3);
    return `${shortUsername}***${domain}`;
};
