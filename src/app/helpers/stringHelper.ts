export const removePhoneMask = (phone: string) => {
    return phone.replace(/[^0-9+]/g, '');
}
